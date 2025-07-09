import React, { useRef, useEffect, useState } from 'react';
import './Game.css';
import { getThemeForLevel } from '../themes';
const Game = ({ level, onGameOver, setLevel }) => {
  const theme = getThemeForLevel(level);
  const canvasRef = useRef(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const winningScore = 5;

  const gameSt = useRef({
    ballX: 0,
    ballY: 0,
    ballSpeedX: 0,
    ballSpeedY: 0,
    paddle1Y: 250,
    paddle2Y: 250,
    playerScore: 0,
    computerScore: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gameSt.current.ballX = canvas.width / 2;
      gameSt.current.ballY = canvas.height / 2;
      gameSt.current.ballSpeedX = 5 + (level * 0.3); // Reduced base speed and scaling
      gameSt.current.ballSpeedY = 2 + (level * 0.15); // Reduced base speed and scaling
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const paddleHeight = 100;
    const paddleWidth = 10;

    const drawRect = (x, y, w, h, color, style = 'solid') => {
      context.fillStyle = color;
      if (style === 'glow') {
        context.shadowBlur = 20;
        context.shadowColor = color;
      }
      if (style === 'striped') {
        for (let i = 0; i < h; i += 4) {
          context.fillRect(x, y + i, w, 2);
        }
      } else {
        context.fillRect(x, y, w, h);
      }
      context.shadowBlur = 0;
    };

    const drawCircle = (x, y, r, color) => {
      context.fillStyle = color;
      context.beginPath();
      context.arc(x, y, r, 0, Math.PI * 2, true);
      context.fill();
    };

    const computerAI = () => {
      const paddle2YCenter = gameSt.current.paddle2Y + paddleHeight / 2;
      const targetY = gameSt.current.ballY;
      const dy = targetY - paddle2YCenter;
      const aiSpeed = 0.05 + level * 0.01; // Reduced base speed and scaling
      gameSt.current.paddle2Y += dy * aiSpeed;
    };

    const moveEverything = () => {
      computerAI();
      gameSt.current.ballX += gameSt.current.ballSpeedX;
      gameSt.current.ballY += gameSt.current.ballSpeedY;

      if (gameSt.current.ballX < 0) {
        if (
          gameSt.current.ballY > gameSt.current.paddle1Y &&
          gameSt.current.ballY < gameSt.current.paddle1Y + paddleHeight
        ) {
          gameSt.current.ballSpeedX = -gameSt.current.ballSpeedX;
          let deltaY = gameSt.current.ballY - (gameSt.current.paddle1Y + paddleHeight / 2);
          if (deltaY > 10) deltaY = 10;
          if (deltaY < -10) deltaY = -10;
          gameSt.current.ballSpeedY = deltaY * 0.35;
        } else {
          gameSt.current.computerScore++;
          setComputerScore(gameSt.current.computerScore);
          ballReset();
        }
      }
      if (gameSt.current.ballX > canvas.width) {
        if (
          gameSt.current.ballY > gameSt.current.paddle2Y &&
          gameSt.current.ballY < gameSt.current.paddle2Y + paddleHeight
        ) {
          gameSt.current.ballSpeedX = -gameSt.current.ballSpeedX;
          let deltaY = gameSt.current.ballY - (gameSt.current.paddle2Y + paddleHeight / 2);
          if (deltaY > 10) deltaY = 10;
          if (deltaY < -10) deltaY = -10;
          gameSt.current.ballSpeedY = deltaY * 0.35;
        } else {
          gameSt.current.playerScore++;
          setPlayerScore(gameSt.current.playerScore);
          ballReset();
        }
      }
      if (gameSt.current.ballY < 0 || gameSt.current.ballY > canvas.height) {
        gameSt.current.ballSpeedY = -gameSt.current.ballSpeedY;
      }
    };

    const ballReset = () => {
      gameSt.current.ballX = canvas.width / 2;
      gameSt.current.ballY = canvas.height / 2;
      gameSt.current.ballSpeedX = -(5 + (level * 0.3)); // Reduced base speed and scaling
      gameSt.current.ballSpeedY = 2 + (level * 0.15); // Reduced base speed and scaling
    };

    const drawNet = () => {
      for (let i = 0; i < canvas.height; i += 40) {
        drawRect(canvas.width / 2 - 1, i, 2, 20, theme.netColor);
      }
    };

    const drawEverything = () => {
      // Themed background
      context.clearRect(0, 0, canvas.width, canvas.height);
      canvas.style.background = theme.background;

      context.fillStyle = theme.fontColor;
      context.font = '30px Arial';
      context.fillText(`Level: ${level}`, canvas.width / 2 - 50, 50);
      drawNet();
      drawRect(0, gameSt.current.paddle1Y, paddleWidth, paddleHeight, theme.paddleColor, theme.paddleStyle);
      drawRect(
        canvas.width - paddleWidth,
        gameSt.current.paddle2Y,
        paddleWidth,
        paddleHeight,
        theme.paddleColor,
        theme.paddleStyle
      );
      drawCircle(gameSt.current.ballX, gameSt.current.ballY, 10, theme.ballColor);
      context.fillText(gameSt.current.playerScore, 100, 100);
      context.fillText(gameSt.current.computerScore, canvas.width - 100, 100);
    };

    const gameLoop = () => {
      moveEverything();
      drawEverything();
      animationFrameId = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    const movePaddle = (e) => {
      const rect = canvas.getBoundingClientRect();
      const root = document.documentElement;
      let mouseY;
      if (e.type === 'touchmove') {
        mouseY = e.touches[0].clientY - rect.top - root.scrollTop;
      } else {
        mouseY = e.clientY - rect.top - root.scrollTop;
      }
      gameSt.current.paddle1Y = mouseY - paddleHeight / 2;
    };

    canvas.addEventListener('mousemove', movePaddle);
    canvas.addEventListener('touchmove', movePaddle);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', movePaddle);
      canvas.removeEventListener('touchmove', movePaddle);
    };
  }, [level, theme]);

  useEffect(() => {
    if (playerScore >= winningScore) {
      onGameOver(true, { player: playerScore, opponent: computerScore }); // Player won
    } else if (computerScore >= winningScore) {
      onGameOver(false, { player: playerScore, opponent: computerScore }); // Player lost
    }
  }, [playerScore, computerScore, onGameOver, winningScore]);

  return <canvas ref={canvasRef} />;
};

export default Game;
