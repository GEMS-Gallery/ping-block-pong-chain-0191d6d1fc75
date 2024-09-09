import React, { useState, useEffect, useRef } from 'react';
import { Container, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import { backend } from 'declarations/backend';

interface LeaderboardEntry {
  playerName: string;
  score: bigint;
}

const App: React.FC = () => {
  const [playerName, setPlayerName] = useState('');
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const result = await backend.getLeaderboard();
      setLeaderboard(result);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
    setLoading(false);
  };

  const startGame = () => {
    if (playerName.trim() === '') {
      alert('Please enter your name');
      return;
    }
    setGameStarted(true);
    setScore(0);
    initGame();
  };

  const initGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const paddleHeight = 10;
    const paddleWidth = 75;
    let paddleX = (canvas.width - paddleWidth) / 2;
    let ballX = canvas.width / 2;
    let ballY = canvas.height - 30;
    let ballDX = 2;
    let ballDY = -2;
    const ballRadius = 10;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw ball
      ctx.beginPath();
      ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#0095DD';
      ctx.fill();
      ctx.closePath();

      // Draw paddle
      ctx.beginPath();
      ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
      ctx.fillStyle = '#0095DD';
      ctx.fill();
      ctx.closePath();

      // Move ball
      ballX += ballDX;
      ballY += ballDY;

      // Bounce off walls
      if (ballX + ballDX > canvas.width - ballRadius || ballX + ballDX < ballRadius) {
        ballDX = -ballDX;
      }
      if (ballY + ballDY < ballRadius) {
        ballDY = -ballDY;
      } else if (ballY + ballDY > canvas.height - ballRadius) {
        if (ballX > paddleX && ballX < paddleX + paddleWidth) {
          ballDY = -ballDY;
          setScore(prevScore => prevScore + 1);
        } else {
          // Game over
          setGameStarted(false);
          return;
        }
      }

      // Move paddle
      canvas.addEventListener('mousemove', (e) => {
        const relativeX = e.clientX - canvas.offsetLeft;
        if (relativeX > 0 && relativeX < canvas.width) {
          paddleX = relativeX - paddleWidth / 2;
        }
      });

      requestAnimationFrame(draw);
    };

    draw();
  };

  const submitScore = async () => {
    setLoading(true);
    try {
      await backend.submitScore(playerName, BigInt(score));
      await fetchLeaderboard();
    } catch (error) {
      console.error('Error submitting score:', error);
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Ping Pong Game
      </Typography>
      {!gameStarted ? (
        <>
          <TextField
            label="Your Name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={startGame}>
            Start Game
          </Button>
        </>
      ) : (
        <>
          <Typography variant="h6">Score: {score}</Typography>
          <canvas ref={canvasRef} width={480} height={320} style={{ border: '1px solid #000' }} />
        </>
      )}
      {!gameStarted && score > 0 && (
        <Button variant="contained" color="secondary" onClick={submitScore} disabled={loading}>
          Submit Score
        </Button>
      )}
      <Typography variant="h5" component="h2" gutterBottom style={{ marginTop: '2rem' }}>
        Leaderboard
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Rank</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaderboard.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{entry.playerName}</TableCell>
                  <TableCell>{entry.score.toString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default App;
