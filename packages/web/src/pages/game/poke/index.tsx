import React, { useState, useEffect } from "react";
import "./index.css";
import { layoutSlice } from "@/store/slice/layout";
import { useSelector } from "react-redux";

// 花色类型
type Suit = "♠" | "♥" | "♦" | "♣";
// 点数类型
type Rank = "A" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K";

// 扑克牌接口
interface Card {
  suit: Suit;
  rank: Rank;
  id: string;
}

// 玩家接口
interface Player {
  id: number;
  name: string;
  cards: Card[];
  position: "top" | "right" | "bottom" | "left";
}

// 每个玩家选中的牌类型
type PlayerCardsMap = Record<number, Card[]>;

export const Component = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [isDealt, setIsDealt] = useState(false);
  const [showCardSelector, setShowCardSelector] = useState(false);
  const [availableCards, setAvailableCards] = useState<Card[]>([]);
  
  // 选牌相关状态 - 每个玩家分别选牌
  const [playerSelectedCards, setPlayerSelectedCards] = useState<PlayerCardsMap>({ 1: [], 2: [], 3: [], 4: [] });
  const [selectingPlayer, setSelectingPlayer] = useState<number>(1); // 当前正在为哪个玩家选牌
  const [lastPlayerSelectedCards, setLastPlayerSelectedCards] = useState<PlayerCardsMap>({ 1: [], 2: [], 3: [], 4: [] }); // 保存上次选中的牌
  
  // 出牌相关状态
  const [currentPlayer, setCurrentPlayer] = useState<number>(1); // 当前出牌玩家
  const [playingCards, setPlayingCards] = useState<Card[]>([]); // 当前玩家选中要出的牌
  const [lastPlayedCards, setLastPlayedCards] = useState<Card[]>([]); // 上一次出的牌（显示在中央）
  const [lastPlayedBy, setLastPlayedBy] = useState<number | null>(null); // 上一次出牌的玩家

  // 初始化扑克牌
  const initializeDeck = (): Card[] => {
    const suits: Suit[] = ["♠", "♥", "♦", "♣"];
    const ranks: Rank[] = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    const deck: Card[] = [];

    suits.forEach((suit) => {
      ranks.forEach((rank) => {
        deck.push({
          suit,
          rank,
          id: `${suit}-${rank}`,
        });
      });
    });

    return deck;
  };

  // 洗牌函数（Fisher-Yates算法）
  const shuffleDeck = (deck: Card[]): Card[] => {
    const shuffled = [...deck];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // 发牌
  const dealCards = () => {
    const deck = initializeDeck();
    const shuffled = shuffleDeck(deck);

    const newPlayers: Player[] = [
      { id: 1, name: "玩家1", cards: [], position: "bottom" }, // 底部
      { id: 2, name: "玩家2", cards: [], position: "right" }, // 右侧
      { id: 3, name: "玩家3", cards: [], position: "top" }, // 顶部
      { id: 4, name: "玩家4", cards: [], position: "left" }, // 左侧
    ];

    // 每人发13张牌
    shuffled.forEach((card, index) => {
      const playerIndex = index % 4;
      newPlayers[playerIndex].cards.push(card);
    });

    // 按点数排序：3-K、A、2
    newPlayers.forEach((player) => {
      player.cards.sort((a, b) => {
        const rankOrder: Record<Rank, number> = {
          "3": 1,
          "4": 2,
          "5": 3,
          "6": 4,
          "7": 5,
          "8": 6,
          "9": 7,
          "10": 8,
          J: 9,
          Q: 10,
          K: 11,
          A: 12,
          "2": 13,
        };
        return rankOrder[a.rank] - rankOrder[b.rank];
      });
    });

    setPlayers(newPlayers);
    setIsDealt(true);
  };

  // 重新发牌
  const resetGame = () => {
    setPlayers([]);
    setIsDealt(false);
    setPlayerSelectedCards({ 1: [], 2: [], 3: [], 4: [] });
    setSelectingPlayer(1);
    setShowCardSelector(false);
    setCurrentPlayer(1);
    setPlayingCards([]);
    setLastPlayedCards([]);
    setLastPlayedBy(null);
    // 注意：不清除 lastPlayerSelectedCards，保留在内存中
  };

  // 切换要出的牌的选中状态
  const togglePlayingCard = (card: Card, playerId: number) => {
    // 只有当前玩家才能选牌
    if (playerId !== currentPlayer) return;

    setPlayingCards((prev) => {
      const exists = prev.find((c) => c.id === card.id);
      if (exists) {
        return prev.filter((c) => c.id !== card.id);
      } else {
        return [...prev, card];
      }
    });
  };

  // 出牌
  const playCards = () => {
    if (playingCards.length === 0) {
      alert("请选择要出的牌！");
      return;
    }

    // 从当前玩家的手牌中移除选中的牌
    setPlayers((prevPlayers) => {
      return prevPlayers.map((player) => {
        if (player.id === currentPlayer) {
          return {
            ...player,
            cards: player.cards.filter((card) => !playingCards.find((c) => c.id === card.id)),
          };
        }
        return player;
      });
    });

    // 保存出的牌到中央显示
    setLastPlayedCards([...playingCards]);
    setLastPlayedBy(currentPlayer);

    // 清空选中的牌
    setPlayingCards([]);

    // 切换到下一个玩家（1->2->3->4->1循环）
    setCurrentPlayer((prev) => (prev % 4) + 1);
  };

  // 跳过（不出牌）
  const passPlay = () => {
    setPlayingCards([]);
    setCurrentPlayer((prev) => (prev % 4) + 1);
  };

  // 打开选牌界面
  const openCardSelector = () => {
    const deck = initializeDeck();

    // 按牌的数字大小排序，相同数字再按花色排序
    const sortedDeck = deck.sort((a, b) => {
      // 首先按点数排序：3-K、A、2
      const rankOrder: Record<Rank, number> = {
        "3": 1,
        "4": 2,
        "5": 3,
        "6": 4,
        "7": 5,
        "8": 6,
        "9": 7,
        "10": 8,
        J: 9,
        Q: 10,
        K: 11,
        A: 12,
        "2": 13,
      };

      const rankDiff = rankOrder[a.rank] - rankOrder[b.rank];
      if (rankDiff !== 0) {
        return rankDiff;
      }

      // 相同点数，按花色排序：♠、♥、♦、♣
      const suitOrder: Record<Suit, number> = {
        "♠": 1,
        "♥": 2,
        "♦": 3,
        "♣": 4,
      };

      return suitOrder[a.suit] - suitOrder[b.suit];
    });

    setAvailableCards(sortedDeck);

    // 恢复上次选中的牌（如果存在），并验证有效性
    const validLastSelected: PlayerCardsMap = { 1: [], 2: [], 3: [], 4: [] };
    for (let i = 1; i <= 4; i++) {
      validLastSelected[i] = lastPlayerSelectedCards[i].filter((savedCard) =>
        sortedDeck.find((card) => card.id === savedCard.id)
      );
    }
    setPlayerSelectedCards(validLastSelected);
    setSelectingPlayer(1);

    setShowCardSelector(true);
  };

  // 获取所有已选的牌（所有玩家）
  const getAllSelectedCards = (): Card[] => {
    return Object.values(playerSelectedCards).flat();
  };

  // 切换牌的选中状态
  const toggleCardSelection = (card: Card) => {
    const currentPlayerCards = playerSelectedCards[selectingPlayer];
    const allSelectedCards = getAllSelectedCards();

    // 检查当前玩家是否已选中此牌
    const isSelectedByCurrentPlayer = currentPlayerCards.find((c) => c.id === card.id);

    // 检查此牌是否被其他玩家选中
    const selectedByOtherPlayer = allSelectedCards.find((c) => c.id === card.id) && !isSelectedByCurrentPlayer;

    if (selectedByOtherPlayer) {
      alert("这张牌已被其他玩家选中！");
      return;
    }

    // 检查当前玩家是否已选13张
    if (currentPlayerCards.length >= 13 && !isSelectedByCurrentPlayer) {
      alert("当前玩家已选择13张牌！");
      return;
    }

    setPlayerSelectedCards((prev) => {
      const playerCards = prev[selectingPlayer];
      const exists = playerCards.find((c) => c.id === card.id);
      if (exists) {
        return {
          ...prev,
          [selectingPlayer]: playerCards.filter((c) => c.id !== card.id),
        };
      } else {
        return {
          ...prev,
          [selectingPlayer]: [...playerCards, card],
        };
      }
    });
  };

  // 确认选牌并分配
  const confirmCardSelection = () => {
    const allSelectedCards = getAllSelectedCards();

    // 获取剩余的牌
    const remainingCards = availableCards.filter((card) => !allSelectedCards.find((c) => c.id === card.id));

    // 洗牌剩余的牌
    const shuffled = shuffleDeck(remainingCards);

    // 创建玩家
    const newPlayers: Player[] = [
      { id: 1, name: "玩家1", cards: [...playerSelectedCards[1]], position: "bottom" },
      { id: 2, name: "玩家2", cards: [...playerSelectedCards[2]], position: "right" },
      { id: 3, name: "玩家3", cards: [...playerSelectedCards[3]], position: "top" },
      { id: 4, name: "玩家4", cards: [...playerSelectedCards[4]], position: "left" },
    ];

    // 找出需要补牌的玩家（手牌不足13张的）
    const playersNeedCards = newPlayers.filter((p) => p.cards.length < 13);

    // 随机分配剩余的牌给需要补牌的玩家
    let cardIndex = 0;
    while (cardIndex < shuffled.length) {
      for (const player of playersNeedCards) {
        if (player.cards.length < 13 && cardIndex < shuffled.length) {
          player.cards.push(shuffled[cardIndex]);
          cardIndex++;
        }
      }
    }

    // 按点数排序：3-K、A、2
    newPlayers.forEach((player) => {
      player.cards.sort((a, b) => {
        const rankOrder: Record<Rank, number> = {
          "3": 1,
          "4": 2,
          "5": 3,
          "6": 4,
          "7": 5,
          "8": 6,
          "9": 7,
          "10": 8,
          J: 9,
          Q: 10,
          K: 11,
          A: 12,
          "2": 13,
        };
        return rankOrder[a.rank] - rankOrder[b.rank];
      });
    });

    setPlayers(newPlayers);
    setIsDealt(true);
    setShowCardSelector(false);

    // 保存选中的牌到内存
    setLastPlayerSelectedCards({ ...playerSelectedCards });

    setPlayerSelectedCards({ 1: [], 2: [], 3: [], 4: [] });
  };

  // 检查是否有上次的选牌记录
  const hasLastSelection = (): boolean => {
    return Object.values(lastPlayerSelectedCards).some((cards) => cards.length > 0);
  };

  // 快速发牌：使用上次选中的牌直接发牌
  const quickDeal = () => {
    if (!hasLastSelection()) {
      alert("请先使用选牌功能选择牌！");
      return;
    }

    const deck = initializeDeck();

    // 获取所有上次选中的牌
    const allLastSelectedCards = Object.values(lastPlayerSelectedCards).flat();

    // 获取剩余的牌
    const remainingCards = deck.filter((card) => !allLastSelectedCards.find((c) => c.id === card.id));

    // 洗牌剩余的牌
    const shuffled = shuffleDeck(remainingCards);

    // 创建玩家，使用上次选中的牌
    const newPlayers: Player[] = [
      { id: 1, name: "玩家1", cards: [...lastPlayerSelectedCards[1]], position: "bottom" },
      { id: 2, name: "玩家2", cards: [...lastPlayerSelectedCards[2]], position: "right" },
      { id: 3, name: "玩家3", cards: [...lastPlayerSelectedCards[3]], position: "top" },
      { id: 4, name: "玩家4", cards: [...lastPlayerSelectedCards[4]], position: "left" },
    ];

    // 找出需要补牌的玩家（手牌不足13张的）
    const playersNeedCards = newPlayers.filter((p) => p.cards.length < 13);

    // 随机分配剩余的牌给需要补牌的玩家
    let cardIndex = 0;
    while (cardIndex < shuffled.length) {
      for (const player of playersNeedCards) {
        if (player.cards.length < 13 && cardIndex < shuffled.length) {
          player.cards.push(shuffled[cardIndex]);
          cardIndex++;
        }
      }
    }

    // 按点数排序：3-K、A、2
    newPlayers.forEach((player) => {
      player.cards.sort((a, b) => {
        const rankOrder: Record<Rank, number> = {
          "3": 1,
          "4": 2,
          "5": 3,
          "6": 4,
          "7": 5,
          "8": 6,
          "9": 7,
          "10": 8,
          J: 9,
          Q: 10,
          K: 11,
          A: 12,
          "2": 13,
        };
        return rankOrder[a.rank] - rankOrder[b.rank];
      });
    });

    setPlayers(newPlayers);
    setIsDealt(true);
  };

  return (
    <div className="poke-game-container">
      <div className="game-controls">
        <button onClick={dealCards} className="deal-button">
          发牌
        </button>
        <button onClick={openCardSelector} className="select-button">
          选牌
        </button>
        <button
          onClick={quickDeal}
          className="quick-deal-button"
          disabled={!hasLastSelection()}
          title={!hasLastSelection() ? "请先使用选牌功能选择牌" : "使用上次选中的牌快速发牌"}
        >
          快速发牌
        </button>
        <button onClick={resetGame} className="reset-button">
          重新开始
        </button>
      </div>

      {/* 选牌模态框 */}
      {showCardSelector && (
        <CardSelectorModal
          availableCards={availableCards}
          playerSelectedCards={playerSelectedCards}
          selectingPlayer={selectingPlayer}
          onSelectingPlayerChange={setSelectingPlayer}
          onToggleCard={toggleCardSelection}
          onConfirm={confirmCardSelection}
          onCancel={() => {
            setShowCardSelector(false);
            setPlayerSelectedCards({ 1: [], 2: [], 3: [], 4: [] });
          }}
        />
      )}
      {/* 中央区域 - 显示出的牌 */}
      {isDealt && lastPlayedCards.length > 0 && (
        <div className="center-played-cards">
          <div className="played-by">玩家{lastPlayedBy}出的牌</div>
          <div className="played-cards-container">
            {lastPlayedCards.map((card, index) => {
              const isRed = card.suit === "♥" || card.suit === "♦";
              return (
                <div
                  key={card.id}
                  className={`card played-card ${isRed ? "card-red" : "card-black"}`}
                  style={{ marginLeft: index === 0 ? 0 : "-25px", zIndex: index }}
                >
                  <div className="card-corner card-corner-top">
                    <div className="card-rank">{card.rank}</div>
                    <div className={`card-suit ${isRed ? "suit-red" : ""}`}>{card.suit}</div>
                  </div>
                  <div className="card-center">
                    <div className={`card-suit-large ${isRed ? "suit-red" : ""}`}>{card.suit}</div>
                  </div>
                  <div className="card-corner card-corner-bottom">
                    <div className="card-rank">{card.rank}</div>
                    <div className={`card-suit ${isRed ? "suit-red" : ""}`}>{card.suit}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="game-table">
        {/* 玩家1 - 底部，水平排列，可以换行 */}
        {players.find((p) => p.id === 1) && (
          <PlayerArea
            player={players.find((p) => p.id === 1)!}
            isCurrentPlayer={currentPlayer === 1}
            playingCards={playingCards}
            onCardClick={togglePlayingCard}
            onPlayCards={playCards}
            onPassPlay={passPlay}
          />
        )}

        {/* 玩家2 - 右侧，固定定位，垂直排列（相对于玩家1逆时针90度） */}
        {players.find((p) => p.id === 2) && (
          <PlayerArea
            player={players.find((p) => p.id === 2)!}
            isCurrentPlayer={currentPlayer === 2}
            playingCards={playingCards}
            onCardClick={togglePlayingCard}
            onPlayCards={playCards}
            onPassPlay={passPlay}
          />
        )}

        {/* 玩家3 - 顶部，水平排列（相对于玩家2逆时针90度，反向） */}
        {players.find((p) => p.id === 3) && (
          <PlayerArea
            player={players.find((p) => p.id === 3)!}
            isCurrentPlayer={currentPlayer === 3}
            playingCards={playingCards}
            onCardClick={togglePlayingCard}
            onPlayCards={playCards}
            onPassPlay={passPlay}
          />
        )}

        {/* 玩家4 - 左侧，固定定位，垂直排列（相对于玩家3逆时针90度，反向） */}
        {players.find((p) => p.id === 4) && (
          <PlayerArea
            player={players.find((p) => p.id === 4)!}
            isCurrentPlayer={currentPlayer === 4}
            playingCards={playingCards}
            onCardClick={togglePlayingCard}
            onPlayCards={playCards}
            onPassPlay={passPlay}
          />
        )}
      </div>
    </div>
  );
};

// 玩家区域组件
interface PlayerAreaProps {
  player: Player;
  isCurrentPlayer: boolean;
  playingCards: Card[];
  onCardClick: (card: Card, playerId: number) => void;
  onPlayCards: () => void;
  onPassPlay: () => void;
}

const PlayerArea: React.FC<PlayerAreaProps> = ({
  player,
  isCurrentPlayer,
  playingCards,
  onCardClick,
  onPlayCards,
  onPassPlay,
}) => {
  const selectedCount = playingCards.length;

  return (
    <div className={`player player-${player.id} ${isCurrentPlayer ? "current-player" : ""}`}>
      <div className="player-header">
        <div className="player-label">{player.name}</div>
        {/* 出牌按钮 - 只在当前玩家显示 */}
        {isCurrentPlayer && (
          <div className="player-actions">
            <button onClick={onPlayCards} className="play-button-small" disabled={selectedCount === 0}>
              出牌{selectedCount > 0 && ` (${selectedCount})`}
            </button>
            <button onClick={onPassPlay} className="pass-button-small">
              不出
            </button>
          </div>
        )}
      </div>
      <div
        className="cards-container"
        style={{ flexDirection: player.position === "left" || player.position === "right" ? "column" : "row" }}
      >
        {player.cards.map((card, index) => {
          const isSelected = playingCards.find((c) => c.id === card.id);
          return (
            <CardComponent
              key={card.id}
              card={card}
              index={index}
              playerId={player.id}
              isSelected={!!isSelected}
              isCurrentPlayer={isCurrentPlayer}
              onClick={() => onCardClick(card, player.id)}
            />
          );
        })}
      </div>
    </div>
  );
};

// 选牌模态框组件
interface CardSelectorModalProps {
  availableCards: Card[];
  playerSelectedCards: PlayerCardsMap;
  selectingPlayer: number;
  onSelectingPlayerChange: (playerId: number) => void;
  onToggleCard: (card: Card) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

const CardSelectorModal: React.FC<CardSelectorModalProps> = ({
  availableCards,
  playerSelectedCards,
  selectingPlayer,
  onSelectingPlayerChange,
  onToggleCard,
  onConfirm,
  onCancel,
}) => {
  // 获取所有已选的牌
  const allSelectedCards = Object.values(playerSelectedCards).flat();
  // 当前玩家选中的牌
  const currentPlayerCards = playerSelectedCards[selectingPlayer];
  // 总已选牌数
  const totalSelected = allSelectedCards.length;

  // 检查牌被哪个玩家选中
  const getCardOwner = (card: Card): number | null => {
    for (let i = 1; i <= 4; i++) {
      if (playerSelectedCards[i].find((c) => c.id === card.id)) {
        return i;
      }
    }
    return null;
  };

  return (
    <div className="card-selector-modal-overlay" onClick={onCancel}>
      <div className="card-selector-modal card-selector-modal-large" onClick={(e) => e.stopPropagation()}>
        <div className="card-selector-header">
          <h3>自由分配牌</h3>
          <div className="total-selected-count">已分配: {totalSelected} / 52</div>
        </div>

        {/* 玩家选择标签 */}
        <div className="player-tabs">
          {[1, 2, 3, 4].map((playerId) => (
            <button
              key={playerId}
              className={`player-tab ${selectingPlayer === playerId ? "active" : ""}`}
              onClick={() => onSelectingPlayerChange(playerId)}
            >
              玩家{playerId}
              <span className="tab-count">({playerSelectedCards[playerId].length}/13)</span>
            </button>
          ))}
        </div>

        {/* 各玩家已选牌预览 */}
        <div className="players-cards-preview">
          {[1, 2, 3, 4].map((playerId) => (
            <div key={playerId} className={`player-preview ${selectingPlayer === playerId ? "active" : ""}`}>
              <div className="preview-label">玩家{playerId}: {playerSelectedCards[playerId].length}张</div>
              <div className="preview-cards">
                {playerSelectedCards[playerId].length === 0 ? (
                  <span className="no-cards">未选牌</span>
                ) : (
                  playerSelectedCards[playerId].map((card) => {
                    const isRed = card.suit === "♥" || card.suit === "♦";
                    return (
                      <span key={card.id} className={`preview-card ${isRed ? "red" : "black"}`}>
                        {card.suit}{card.rank}
                      </span>
                    );
                  })
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="card-selector-content">
          <div className="current-selecting-info">
            正在为 <strong>玩家{selectingPlayer}</strong> 选牌 ({currentPlayerCards.length}/13)
          </div>
          <div className="available-cards-grid">
            {availableCards.map((card) => {
              const cardOwner = getCardOwner(card);
              const isSelectedByCurrentPlayer = cardOwner === selectingPlayer;
              const isSelectedByOther = cardOwner !== null && cardOwner !== selectingPlayer;
              const isRed = card.suit === "♥" || card.suit === "♦";
              return (
                <div
                  key={card.id}
                  className={`selectable-card ${isSelectedByCurrentPlayer ? "selected" : ""} ${isSelectedByOther ? "selected-by-other" : ""} ${isRed ? "card-red" : "card-black"}`}
                  onClick={() => onToggleCard(card)}
                >
                  <div className="card-corner card-corner-top">
                    <div className="card-rank">{card.rank}</div>
                    <div className={`card-suit ${isRed ? "suit-red" : ""}`}>{card.suit}</div>
                  </div>
                  <div className="card-center">
                    <div className={`card-suit-large ${isRed ? "suit-red" : ""}`}>{card.suit}</div>
                  </div>
                  <div className="card-corner card-corner-bottom">
                    <div className="card-rank">{card.rank}</div>
                    <div className={`card-suit ${isRed ? "suit-red" : ""}`}>{card.suit}</div>
                  </div>
                  {isSelectedByCurrentPlayer && <div className="selected-badge">✓</div>}
                  {isSelectedByOther && <div className="other-player-badge">P{cardOwner}</div>}
                </div>
              );
            })}
          </div>
        </div>
        <div className="card-selector-footer">
          <div className="footer-info">
            剩余 {52 - totalSelected} 张牌将随机分配
          </div>
          <button onClick={onCancel} className="cancel-button">
            取消
          </button>
          <button onClick={onConfirm} className="confirm-button">
            确认发牌
          </button>
        </div>
      </div>
    </div>
  );
};

// 单张扑克牌组件
interface CardComponentProps {
  card: Card;
  index: number;
  playerId: number;
  isSelected: boolean;
  isCurrentPlayer: boolean;
  onClick: () => void;
}

const CardComponent: React.FC<CardComponentProps> = ({ card, index, playerId, isSelected, isCurrentPlayer, onClick }) => {
  const isRed = card.suit === "♥" || card.suit === "♦";
  const isMobile = useSelector(layoutSlice.selectors.getIsMobile);

  // 根据玩家ID确定旋转角度和偏移方向
  let marginStyle: React.CSSProperties = {};

  if (playerId === 1) {
    // 玩家1：底部，水平排列，向右偏移
    marginStyle = {
      marginLeft: index === 0 ? 0 : isMobile ? "-50px" : "-25px",
      marginTop: 0,
    };
  } else if (playerId === 2) {
    // 玩家2：右侧，垂直排列（逆时针90度），向下偏移
    marginStyle = {
      marginTop: index === 0 ? 0 : isMobile ? "-80px" : "-50px",
      marginLeft: 0,
    };
  } else if (playerId === 3) {
    // 玩家3：顶部，水平排列（逆时针180度，反向），由于使用row-reverse，使用marginLeft
    marginStyle = {
      marginLeft: index === 0 ? 0 : isMobile ? "-50px" : "-25px",
      marginTop: 0,
    };
  } else if (playerId === 4) {
    // 玩家4：左侧，垂直排列（逆时针270度，反向），由于使用column-reverse，使用marginTop
    marginStyle = {
      marginTop: index === 0 ? 0 : isMobile ? "-80px" : "-50px",
      marginLeft: 0,
    };
  }

  // 选中时向上平移
  const translateY = isSelected ? "-15px" : "0";

  return (
    <div
      className={`card ${isRed ? "card-red" : "card-black"} ${isSelected ? "card-selected" : ""} ${isCurrentPlayer ? "card-clickable" : ""}`}
      style={{
        transform: `translateY(${translateY})`,
        zIndex: index, // 后面的牌z-index更大，叠在上面
        position: "relative",
        ...marginStyle,
      }}
      onClick={onClick}
    >
      <div className="card-corner card-corner-top">
        <div className="card-rank">{card.rank}</div>
        <div className={`card-suit ${isRed ? "suit-red" : ""}`}>{card.suit}</div>
      </div>
      <div className="card-center">
        <div className={`card-suit-large ${isRed ? "suit-red" : ""}`}>{card.suit}</div>
      </div>
      <div className="card-corner card-corner-bottom">
        <div className="card-rank">{card.rank}</div>
        <div className={`card-suit ${isRed ? "suit-red" : ""}`}>{card.suit}</div>
      </div>
    </div>
  );
};
