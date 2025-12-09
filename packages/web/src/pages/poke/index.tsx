import React, { useState, useEffect } from "react";
import "./index.css";

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

export const Component = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [isDealt, setIsDealt] = useState(false);

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
  };

  return (
    <div className="poke-game-container">
      <div className="game-controls">
        <button onClick={dealCards} className="deal-button">
          发牌
        </button>
        <button onClick={resetGame} className="reset-button">
          重新开始
        </button>
      </div>

      <div className="game-table">
        {/* 中央区域 */}
        <div className="center-area">
          {!isDealt && (
            <div className="welcome-message">
              <h2>扑克牌游戏</h2>
              <p>点击"发牌"按钮开始游戏</p>
            </div>
          )}
        </div>

        {/* 玩家1 - 底部，水平排列，可以换行 */}
        {players.find((p) => p.id === 1) && <PlayerArea player={players.find((p) => p.id === 1)!} />}

        {/* 玩家2 - 右侧，固定定位，垂直排列（相对于玩家1逆时针90度） */}
        {players.find((p) => p.id === 2) && <PlayerArea player={players.find((p) => p.id === 2)!} />}

        {/* 玩家3 - 顶部，水平排列（相对于玩家2逆时针90度，反向） */}
        {players.find((p) => p.id === 3) && <PlayerArea player={players.find((p) => p.id === 3)!} />}

        {/* 玩家4 - 左侧，固定定位，垂直排列（相对于玩家3逆时针90度，反向） */}
        {players.find((p) => p.id === 4) && <PlayerArea player={players.find((p) => p.id === 4)!} />}
      </div>
    </div>
  );
};

// 玩家区域组件
const PlayerArea: React.FC<{ player: Player }> = ({ player }) => {
  return (
    <div className={`player player-${player.id}`}>
      <div className="cards-container">
        {player.cards.map((card, index) => (
          <CardComponent key={card.id} card={card} index={index} />
        ))}
      </div>
    </div>
  );
};

// 单张扑克牌组件
const CardComponent: React.FC<{ card: Card; index: number }> = ({ card, index }) => {
  const isRed = card.suit === "♥" || card.suit === "♦";

  // 根据玩家ID确定旋转角度和偏移方向
  let transform = "";

  return (
    <div
      className={`card ${isRed ? "card-red" : "card-black"} `}
      style={{
        transform,
        zIndex: index, // 后面的牌z-index更大，叠在上面
        position: "relative",
      }}
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
