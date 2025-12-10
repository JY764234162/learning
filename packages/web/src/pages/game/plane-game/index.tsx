import { useEffect, useRef, useCallback, useState } from 'react';
import styles from './styles.module.css';

// 类型定义
interface GameState {
  score: number;
  lives: number;
  gameOver: boolean;
  keys: Record<string, boolean>;
}

interface Player {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  color: string;
}

interface Bullet {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  color: string;
}

interface Enemy {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  color: string;
  health: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
}

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

// 计算适配屏幕的 canvas 尺寸
const getResponsiveCanvasSize = () => {
  const maxWidth = window.innerWidth - 60; // 减去 padding 和 border
  const maxHeight = window.innerHeight - 180; // 减去顶部导航等空间

  // 保持 4:3 的宽高比
  const aspectRatio = CANVAS_WIDTH / CANVAS_HEIGHT;
  let width = Math.min(CANVAS_WIDTH, maxWidth);
  let height = width / aspectRatio;

  if (height > maxHeight) {
    height = maxHeight;
    width = height * aspectRatio;
  }

  // 在移动端进一步缩小
  if (window.innerWidth <= 768) {
    const mobileMaxWidth = window.innerWidth - 30;
    const mobileMaxHeight = window.innerHeight - 120;
    width = Math.min(width, mobileMaxWidth);
    height = width / aspectRatio;
    
    if (height > mobileMaxHeight) {
      height = mobileMaxHeight;
      width = height * aspectRatio;
    }
  }

  return { width, height };
};

export const Component = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasSize, setCanvasSize] = useState(getResponsiveCanvasSize());
  const gameStateRef = useRef<GameState>({
    score: 0,
    lives: 3,
    gameOver: false,
    keys: {}
  });
  const playerRef = useRef<Player>({
    x: CANVAS_WIDTH / 2,
    y: CANVAS_HEIGHT - 80,
    width: 50,
    height: 50,
    speed: 5,
    color: '#00ff00'
  });
  const bulletsRef = useRef<Bullet[]>([]);
  const enemiesRef = useRef<Enemy[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const starsRef = useRef<Star[]>([]);
  const animationFrameRef = useRef<number>();
  
  const scoreRef = useRef<HTMLSpanElement>(null);
  const livesRef = useRef<HTMLSpanElement>(null);
  const gameOverRef = useRef<HTMLDivElement>(null);
  const finalScoreRef = useRef<HTMLSpanElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const lastShootTimeRef = useRef<number>(0);

  // 初始化星星背景
  const initStars = useCallback(() => {
    const stars: Star[] = [];
    for (let i = 0; i < 100; i++) {
      stars.push({
        x: Math.random() * CANVAS_WIDTH,
        y: Math.random() * CANVAS_HEIGHT,
        size: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.2
      });
    }
    starsRef.current = stars;
  }, []);

  // 发射子弹
  const shoot = useCallback(() => {
    bulletsRef.current.push({
      x: playerRef.current.x,
      y: playerRef.current.y,
      width: 4,
      height: 10,
      speed: 8,
      color: '#ffff00'
    });
  }, []);

  // 创建敌机
  const createEnemy = useCallback(() => {
    enemiesRef.current.push({
      x: Math.random() * (CANVAS_WIDTH - 40),
      y: -40,
      width: 40,
      height: 40,
      speed: Math.random() * 2 + 2,
      color: '#ff0000',
      health: 1
    });
  }, []);

  // 创建粒子效果
  const createParticles = useCallback((x: number, y: number, color: string) => {
    for (let i = 0; i < 15; i++) {
      particlesRef.current.push({
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        life: 30,
        maxLife: 30,
        size: Math.random() * 3 + 2,
        color: color
      });
    }
  }, []);

  // 碰撞检测
  const checkCollision = useCallback((rect1: { x: number; y: number; width: number; height: number }, rect2: { x: number; y: number; width: number; height: number }) => {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
  }, []);

  // 更新玩家位置
  const updatePlayer = useCallback(() => {
    const keys = gameStateRef.current.keys;
    const player = playerRef.current;

    if (keys['arrowleft'] || keys['a']) {
      player.x = Math.max(player.width / 2, player.x - player.speed);
    }
    if (keys['arrowright'] || keys['d']) {
      player.x = Math.min(CANVAS_WIDTH - player.width / 2, player.x + player.speed);
    }
    if (keys['arrowup'] || keys['w']) {
      player.y = Math.max(player.height / 2, player.y - player.speed);
    }
    if (keys['arrowdown'] || keys['s']) {
      player.y = Math.min(CANVAS_HEIGHT - player.height / 2, player.y + player.speed);
    }
  }, []);

  // 更新子弹
  const updateBullets = useCallback(() => {
    const bullets = bulletsRef.current;
    const enemies = enemiesRef.current;

    for (let i = bullets.length - 1; i >= 0; i--) {
      bullets[i].y -= bullets[i].speed;
      
      // 移除超出屏幕的子弹
      if (bullets[i].y < 0) {
        bullets.splice(i, 1);
        continue;
      }

      // 检测子弹与敌机的碰撞
      for (let j = enemies.length - 1; j >= 0; j--) {
        if (checkCollision(bullets[i], enemies[j])) {
          createParticles(
            enemies[j].x + enemies[j].width / 2,
            enemies[j].y + enemies[j].height / 2,
            enemies[j].color
          );
          gameStateRef.current.score += 10;
          if (scoreRef.current) {
            scoreRef.current.textContent = String(gameStateRef.current.score);
          }
          bullets.splice(i, 1);
          enemies.splice(j, 1);
          break;
        }
      }
    }
  }, [checkCollision, createParticles]);

  // 更新敌机
  const updateEnemies = useCallback(() => {
    const enemies = enemiesRef.current;
    const player = playerRef.current;

    for (let i = enemies.length - 1; i >= 0; i--) {
      enemies[i].y += enemies[i].speed;

      // 检测敌机与玩家的碰撞
      if (checkCollision(enemies[i], player)) {
        createParticles(player.x, player.y, player.color);
        gameStateRef.current.lives--;
        if (livesRef.current) {
          livesRef.current.textContent = String(gameStateRef.current.lives);
        }
        enemies.splice(i, 1);
        
        if (gameStateRef.current.lives <= 0) {
          gameStateRef.current.gameOver = true;
          if (gameOverRef.current) {
            gameOverRef.current.classList.remove(styles.gameOverHidden);
          }
          if (finalScoreRef.current) {
            finalScoreRef.current.textContent = String(gameStateRef.current.score);
          }
        }
        break;
      }

      // 移除超出屏幕的敌机
      if (enemies[i] && enemies[i].y > CANVAS_HEIGHT) {
        enemies.splice(i, 1);
      }
    }
  }, [checkCollision, createParticles]);

  // 更新粒子
  const updateParticles = useCallback(() => {
    const particles = particlesRef.current;

    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].x += particles[i].vx;
      particles[i].y += particles[i].vy;
      particles[i].life--;

      if (particles[i].life <= 0) {
        particles.splice(i, 1);
      }
    }
  }, []);

  // 更新星星背景
  const updateStars = useCallback(() => {
    for (const star of starsRef.current) {
      star.y += star.speed;
      if (star.y > CANVAS_HEIGHT) {
        star.y = 0;
        star.x = Math.random() * CANVAS_WIDTH;
      }
    }
  }, []);

  // 绘制玩家飞机
  const drawPlayer = useCallback((ctx: CanvasRenderingContext2D) => {
    const player = playerRef.current;

    ctx.save();
    ctx.translate(player.x, player.y);
    
    // 飞机主体
    ctx.fillStyle = player.color;
    ctx.beginPath();
    ctx.moveTo(0, -player.height / 2);
    ctx.lineTo(-player.width / 3, player.height / 2);
    ctx.lineTo(0, player.height / 3);
    ctx.lineTo(player.width / 3, player.height / 2);
    ctx.closePath();
    ctx.fill();
    
    // 飞机发光效果
    ctx.shadowBlur = 20;
    ctx.shadowColor = player.color;
    ctx.fill();
    
    // 机翼
    ctx.fillStyle = '#00cc00';
    ctx.beginPath();
    ctx.moveTo(-player.width / 2, 0);
    ctx.lineTo(-player.width / 4, player.height / 4);
    ctx.lineTo(-player.width / 6, 0);
    ctx.closePath();
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(player.width / 2, 0);
    ctx.lineTo(player.width / 4, player.height / 4);
    ctx.lineTo(player.width / 6, 0);
    ctx.closePath();
    ctx.fill();
    
    ctx.restore();
  }, []);

  // 绘制子弹
  const drawBullets = useCallback((ctx: CanvasRenderingContext2D) => {
    for (const bullet of bulletsRef.current) {
      ctx.save();
      ctx.fillStyle = bullet.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = bullet.color;
      ctx.fillRect(bullet.x - bullet.width / 2, bullet.y, bullet.width, bullet.height);
      ctx.restore();
    }
  }, []);

  // 绘制敌机
  const drawEnemies = useCallback((ctx: CanvasRenderingContext2D) => {
    for (const enemy of enemiesRef.current) {
      ctx.save();
      ctx.translate(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2);
      
      // 敌机主体
      ctx.fillStyle = enemy.color;
      ctx.shadowBlur = 15;
      ctx.shadowColor = enemy.color;
      ctx.beginPath();
      ctx.moveTo(0, enemy.height / 2);
      ctx.lineTo(-enemy.width / 3, -enemy.height / 2);
      ctx.lineTo(0, -enemy.height / 3);
      ctx.lineTo(enemy.width / 3, -enemy.height / 2);
      ctx.closePath();
      ctx.fill();
      
      // 敌机装饰
      ctx.fillStyle = '#cc0000';
      ctx.fillRect(-enemy.width / 4, -enemy.height / 4, enemy.width / 2, enemy.height / 4);
      
      ctx.restore();
    }
  }, []);

  // 绘制粒子
  const drawParticles = useCallback((ctx: CanvasRenderingContext2D) => {
    for (const particle of particlesRef.current) {
      const alpha = particle.life / particle.maxLife;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = particle.color;
      ctx.shadowBlur = 5;
      ctx.shadowColor = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }, []);

  // 绘制星星背景
  const drawStars = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = '#ffffff';
    for (const star of starsRef.current) {
      ctx.globalAlpha = Math.random() * 0.8 + 0.2;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }, []);

  // 游戏主循环
  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (!gameStateRef.current.gameOver) {
      // 清空画布
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // 更新和绘制背景
      updateStars();
      drawStars(ctx);

      // 更新游戏对象
      updatePlayer();
      updateBullets();
      updateEnemies();
      updateParticles();

      // 随机生成敌机
      if (Math.random() < 0.02) {
        createEnemy();
      }

      // 绘制游戏对象
      drawBullets(ctx);
      drawEnemies(ctx);
      drawParticles(ctx);
      drawPlayer(ctx);
    }

    animationFrameRef.current = requestAnimationFrame(gameLoop);
  }, [updateStars, drawStars, updatePlayer, updateBullets, updateEnemies, updateParticles, createEnemy, drawBullets, drawEnemies, drawParticles, drawPlayer]);

  // 重新开始游戏
  const restartGame = useCallback(() => {
    gameStateRef.current = {
      score: 0,
      lives: 3,
      gameOver: false,
      keys: gameStateRef.current.keys
    };
    
    playerRef.current.x = CANVAS_WIDTH / 2;
    playerRef.current.y = CANVAS_HEIGHT - 80;
    
    bulletsRef.current = [];
    enemiesRef.current = [];
    particlesRef.current = [];
    
    if (scoreRef.current) {
      scoreRef.current.textContent = '0';
    }
    if (livesRef.current) {
      livesRef.current.textContent = '3';
    }
    if (gameOverRef.current) {
      gameOverRef.current.classList.add(styles.gameOverHidden);
    }
  }, []);

  // 触摸事件处理
  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const touch = e.touches[0];
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = CANVAS_WIDTH / rect.width;
    const scaleY = CANVAS_HEIGHT / rect.height;

    touchStartRef.current = {
      x: (touch.clientX - rect.left) * scaleX,
      y: (touch.clientY - rect.top) * scaleY
    };
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const touch = e.touches[0];
    const canvas = canvasRef.current;
    if (!canvas || !touchStartRef.current) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = CANVAS_WIDTH / rect.width;
    const scaleY = CANVAS_HEIGHT / rect.height;

    const currentX = (touch.clientX - rect.left) * scaleX;
    const currentY = (touch.clientY - rect.top) * scaleY;

    const player = playerRef.current;
    player.x = Math.max(player.width / 2, Math.min(CANVAS_WIDTH - player.width / 2, currentX));
    player.y = Math.max(player.height / 2, Math.min(CANVAS_HEIGHT - player.height / 2, currentY));

    // 移动时自动射击（间隔控制）
    const now = Date.now();
    if (now - lastShootTimeRef.current > 200) { // 每200ms最多射击一次
      shoot();
      lastShootTimeRef.current = now;
    }
  }, [shoot]);

  const handleTouchEnd = useCallback(() => {
    touchStartRef.current = null;
  }, []);

  // 处理窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      setCanvasSize(getResponsiveCanvasSize());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 键盘事件处理
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      gameStateRef.current.keys[e.key.toLowerCase()] = true;
      if (e.key === ' ' && !gameStateRef.current.gameOver) {
        e.preventDefault();
        shoot();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      gameStateRef.current.keys[e.key.toLowerCase()] = false;
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [shoot]);

  // 初始化和启动游戏
  useEffect(() => {
    initStars();
    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [initStars, gameLoop]);

  return (
    <div className={styles.gameWrapper}>
      <div className={styles.gameContainer} style={{ width: canvasSize.width, height: canvasSize.height }}>
        <canvas
          ref={canvasRef}
          className={styles.gameCanvas}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          style={{ 
            width: `${canvasSize.width}px`, 
            height: `${canvasSize.height}px` 
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />
        <div className={styles.ui}>
          <div>分数: <span ref={scoreRef}>0</span></div>
          <div>生命: <span ref={livesRef}>3</span></div>
        </div>
        <div ref={gameOverRef} className={`${styles.gameOver} ${styles.gameOverHidden}`}>
          <h2 className={styles.gameOverTitle}>游戏结束</h2>
          <p className={styles.finalScore}>最终分数: <span ref={finalScoreRef}>0</span></p>
          <button className={styles.restartBtn} onClick={restartGame}>重新开始</button>
        </div>
        <div className={styles.instructions}>
          PC: 方向键/WASD移动 + 空格发射 | 移动端: 触摸屏幕控制
        </div>
      </div>
    </div>
  );
};
