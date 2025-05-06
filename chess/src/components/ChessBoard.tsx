
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface ChessBoardProps {
  theme?: 'classic' | 'blue' | 'green';
  size?: 'small' | 'medium' | 'large';
  playAgainstAI?: boolean;
  aiDifficulty?: 'easy' | 'medium' | 'hard';
  onMove?: (moveText: string) => void;
  roomId?: string;
  playMode?: 'ai' | 'local' | 'online' | 'practice';
  playerColor?: 'white' | 'black';
  boardRotated?: boolean;
}

type Piece = {
  type: 'p' | 'r' | 'n' | 'b' | 'q' | 'k' | 'P' | 'R' | 'N' | 'B' | 'Q' | 'K' | '';
  color: 'white' | 'black' | null;
};

type Position = {
  row: number;
  col: number;
};

const ChessBoard: React.FC<ChessBoardProps> = ({
  theme = 'classic',
  size = 'medium',
  playAgainstAI = false,
  aiDifficulty = 'medium',
  onMove,
  roomId,
  playMode = 'ai',
  playerColor = 'white',
  boardRotated = false
}) => {
  // Board size based on prop
  const boardSizes = {
    small: 'w-full max-w-[320px]',
    medium: 'w-full max-w-[480px]',
    large: 'w-full max-w-[640px]',
  };

  // Theme colors
  const themeClasses = {
    classic: {
      light: 'bg-chess-light',
      dark: 'bg-chess-dark',
    },
    blue: {
      light: 'bg-blue-200',
      dark: 'bg-blue-700',
    },
    green: {
      light: 'bg-emerald-100',
      dark: 'bg-emerald-800',
    }
  };

  // Initial board setup
  const initializeBoard = () => {
    const board: Piece[][] = Array(8).fill(null).map(() => Array(8).fill({ type: '', color: null }));

    // Set pawns
    for (let col = 0; col < 8; col++) {
      board[1][col] = { type: 'p', color: 'black' };
      board[6][col] = { type: 'P', color: 'white' };
    }

    // Set rooks
    board[0][0] = { type: 'r', color: 'black' };
    board[0][7] = { type: 'r', color: 'black' };
    board[7][0] = { type: 'R', color: 'white' };
    board[7][7] = { type: 'R', color: 'white' };

    // Set knights
    board[0][1] = { type: 'n', color: 'black' };
    board[0][6] = { type: 'n', color: 'black' };
    board[7][1] = { type: 'N', color: 'white' };
    board[7][6] = { type: 'N', color: 'white' };

    // Set bishops
    board[0][2] = { type: 'b', color: 'black' };
    board[0][5] = { type: 'b', color: 'black' };
    board[7][2] = { type: 'B', color: 'white' };
    board[7][5] = { type: 'B', color: 'white' };

    // Set queens
    board[0][3] = { type: 'q', color: 'black' };
    board[7][3] = { type: 'Q', color: 'white' };

    // Set kings
    board[0][4] = { type: 'k', color: 'black' };
    board[7][4] = { type: 'K', color: 'white' };

    return board;
  };

  const [board, setBoard] = useState<Piece[][]>(initializeBoard());
  const [selectedPiece, setSelectedPiece] = useState<Position | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<'white' | 'black'>('white');
  const [validMoves, setValidMoves] = useState<Position[]>([]);
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [gameStatus, setGameStatus] = useState<string>('');
  const [isAIThinking, setIsAIThinking] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<'white' | 'black' | null>(null);

  // Map pieces to their Unicode chess symbols
  const getPieceSymbol = (piece: Piece) => {
    if (!piece.type) return '';

    const pieceSymbols: {[key: string]: string} = {
      'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚', 'p': '♟',
      'R': '♖', 'N': '♘', 'B': '♗', 'Q': '♕', 'K': '♔', 'P': '♙',
    };
    return pieceSymbols[piece.type] || '';
  };

  // Check if position is on the board
  const isOnBoard = (row: number, col: number): boolean => {
    return row >= 0 && row < 8 && col >= 0 && col < 8;
  };

  // Get piece color from type
  const getPieceColor = (piece: Piece): 'white' | 'black' | null => {
    return piece.color;
  };

  // Calculate valid moves for a selected piece
  const calculateValidMoves = (piece: Piece, row: number, col: number): Position[] => {
    const moves: Position[] = [];
    const pieceColor = getPieceColor(piece);

    if (!piece.type || !pieceColor) return moves;

    // Pawn moves
    if (piece.type.toLowerCase() === 'p') {
      const direction = pieceColor === 'white' ? -1 : 1;
      const startRow = pieceColor === 'white' ? 6 : 1;

      // Move forward one square
      if (isOnBoard(row + direction, col) && !board[row + direction][col].type) {
        moves.push({ row: row + direction, col });

        // Move forward two squares from starting position
        if (row === startRow && !board[row + direction][col].type && !board[row + 2 * direction][col].type) {
          moves.push({ row: row + 2 * direction, col });
        }
      }

      // Capture diagonally
      for (const diag of [col - 1, col + 1]) {
        if (isOnBoard(row + direction, diag) &&
            board[row + direction][diag].type &&
            getPieceColor(board[row + direction][diag]) !== pieceColor) {
          moves.push({ row: row + direction, col: diag });
        }
      }
    }

    // Knight moves
    if (piece.type.toLowerCase() === 'n') {
      const knightMoves = [
        { row: row - 2, col: col - 1 }, { row: row - 2, col: col + 1 },
        { row: row - 1, col: col - 2 }, { row: row - 1, col: col + 2 },
        { row: row + 1, col: col - 2 }, { row: row + 1, col: col + 2 },
        { row: row + 2, col: col - 1 }, { row: row + 2, col: col + 1 }
      ];

      for (const move of knightMoves) {
        if (isOnBoard(move.row, move.col)) {
          if (!board[move.row][move.col].type || getPieceColor(board[move.row][move.col]) !== pieceColor) {
            moves.push(move);
          }
        }
      }
    }

    // Rook moves (horizontal and vertical)
    if (piece.type.toLowerCase() === 'r') {
      // Horizontal moves (left and right)
      for (let c = col - 1; c >= 0; c--) {
        if (!board[row][c].type) {
          moves.push({ row, col: c });
        } else {
          if (getPieceColor(board[row][c]) !== pieceColor) {
            moves.push({ row, col: c });
          }
          break;
        }
      }

      for (let c = col + 1; c < 8; c++) {
        if (!board[row][c].type) {
          moves.push({ row, col: c });
        } else {
          if (getPieceColor(board[row][c]) !== pieceColor) {
            moves.push({ row, col: c });
          }
          break;
        }
      }

      // Vertical moves (up and down)
      for (let r = row - 1; r >= 0; r--) {
        if (!board[r][col].type) {
          moves.push({ row: r, col });
        } else {
          if (getPieceColor(board[r][col]) !== pieceColor) {
            moves.push({ row: r, col });
          }
          break;
        }
      }

      for (let r = row + 1; r < 8; r++) {
        if (!board[r][col].type) {
          moves.push({ row: r, col });
        } else {
          if (getPieceColor(board[r][col]) !== pieceColor) {
            moves.push({ row: r, col });
          }
          break;
        }
      }
    }

    // Bishop moves (diagonals)
    if (piece.type.toLowerCase() === 'b') {
      // Top-left diagonal
      for (let r = row - 1, c = col - 1; r >= 0 && c >= 0; r--, c--) {
        if (!board[r][c].type) {
          moves.push({ row: r, col: c });
        } else {
          if (getPieceColor(board[r][c]) !== pieceColor) {
            moves.push({ row: r, col: c });
          }
          break;
        }
      }

      // Top-right diagonal
      for (let r = row - 1, c = col + 1; r >= 0 && c < 8; r--, c++) {
        if (!board[r][c].type) {
          moves.push({ row: r, col: c });
        } else {
          if (getPieceColor(board[r][c]) !== pieceColor) {
            moves.push({ row: r, col: c });
          }
          break;
        }
      }

      // Bottom-left diagonal
      for (let r = row + 1, c = col - 1; r < 8 && c >= 0; r++, c--) {
        if (!board[r][c].type) {
          moves.push({ row: r, col: c });
        } else {
          if (getPieceColor(board[r][c]) !== pieceColor) {
            moves.push({ row: r, col: c });
          }
          break;
        }
      }

      // Bottom-right diagonal
      for (let r = row + 1, c = col + 1; r < 8 && c < 8; r++, c++) {
        if (!board[r][c].type) {
          moves.push({ row: r, col: c });
        } else {
          if (getPieceColor(board[r][c]) !== pieceColor) {
            moves.push({ row: r, col: c });
          }
          break;
        }
      }
    }

    // Queen moves (combination of rook and bishop)
    if (piece.type.toLowerCase() === 'q') {
      // Horizontal moves (left and right) - like rook
      for (let c = col - 1; c >= 0; c--) {
        if (!board[row][c].type) {
          moves.push({ row, col: c });
        } else {
          if (getPieceColor(board[row][c]) !== pieceColor) {
            moves.push({ row, col: c });
          }
          break;
        }
      }

      for (let c = col + 1; c < 8; c++) {
        if (!board[row][c].type) {
          moves.push({ row, col: c });
        } else {
          if (getPieceColor(board[row][c]) !== pieceColor) {
            moves.push({ row, col: c });
          }
          break;
        }
      }

      // Vertical moves (up and down) - like rook
      for (let r = row - 1; r >= 0; r--) {
        if (!board[r][col].type) {
          moves.push({ row: r, col });
        } else {
          if (getPieceColor(board[r][col]) !== pieceColor) {
            moves.push({ row: r, col });
          }
          break;
        }
      }

      for (let r = row + 1; r < 8; r++) {
        if (!board[r][col].type) {
          moves.push({ row: r, col });
        } else {
          if (getPieceColor(board[r][col]) !== pieceColor) {
            moves.push({ row: r, col });
          }
          break;
        }
      }

      // Diagonal moves - like bishop
      // Top-left diagonal
      for (let r = row - 1, c = col - 1; r >= 0 && c >= 0; r--, c--) {
        if (!board[r][c].type) {
          moves.push({ row: r, col: c });
        } else {
          if (getPieceColor(board[r][c]) !== pieceColor) {
            moves.push({ row: r, col: c });
          }
          break;
        }
      }

      // Top-right diagonal
      for (let r = row - 1, c = col + 1; r >= 0 && c < 8; r--, c++) {
        if (!board[r][c].type) {
          moves.push({ row: r, col: c });
        } else {
          if (getPieceColor(board[r][c]) !== pieceColor) {
            moves.push({ row: r, col: c });
          }
          break;
        }
      }

      // Bottom-left diagonal
      for (let r = row + 1, c = col - 1; r < 8 && c >= 0; r++, c--) {
        if (!board[r][c].type) {
          moves.push({ row: r, col: c });
        } else {
          if (getPieceColor(board[r][c]) !== pieceColor) {
            moves.push({ row: r, col: c });
          }
          break;
        }
      }

      // Bottom-right diagonal
      for (let r = row + 1, c = col + 1; r < 8 && c < 8; r++, c++) {
        if (!board[r][c].type) {
          moves.push({ row: r, col: c });
        } else {
          if (getPieceColor(board[r][c]) !== pieceColor) {
            moves.push({ row: r, col: c });
          }
          break;
        }
      }
    }

    // King moves (one square in any direction)
    if (piece.type.toLowerCase() === 'k') {
      const kingMoves = [
        { row: row - 1, col: col - 1 }, { row: row - 1, col }, { row: row - 1, col: col + 1 },
        { row, col: col - 1 }, { row, col: col + 1 },
        { row: row + 1, col: col - 1 }, { row: row + 1, col }, { row: row + 1, col: col + 1 }
      ];

      for (const move of kingMoves) {
        if (isOnBoard(move.row, move.col)) {
          if (!board[move.row][move.col].type || getPieceColor(board[move.row][move.col]) !== pieceColor) {
            moves.push(move);
          }
        }
      }

      // Castling logic could be added here
    }

    return moves;
  };

  // Check if a move is valid
  const isMoveValid = (fromRow: number, fromCol: number, toRow: number, toCol: number): boolean => {
    if (selectedPiece === null) return false;

    return validMoves.some(move => move.row === toRow && move.col === toCol);
  };

  // Check if a king is captured
  const checkForKingCapture = (boardState: Piece[][]): { captured: boolean, color: 'white' | 'black' | null } => {
    let whiteKingFound = false;
    let blackKingFound = false;

    // Search for kings on the board
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = boardState[r][c];
        if (piece.type === 'K') whiteKingFound = true;
        if (piece.type === 'k') blackKingFound = true;
      }
    }

    if (!whiteKingFound) return { captured: true, color: 'white' };
    if (!blackKingFound) return { captured: true, color: 'black' };

    return { captured: false, color: null };
  };

  // Handle square click
  const handleSquareClick = (row: number, col: number) => {
    // If game is over, don't allow more moves
    if (gameOver) {
      toast.info("Game is over! Start a new game to continue playing.");
      return;
    }

    // If no piece is selected, select a piece if it belongs to the current player
    if (!selectedPiece) {
      const piece = board[row][col];
      if (piece.type && piece.color === currentPlayer) {
        setSelectedPiece({ row, col });
        const moves = calculateValidMoves(piece, row, col);
        setValidMoves(moves);
      }
    } else {
      // If a piece is already selected, try to move it
      const fromRow = selectedPiece.row;
      const fromCol = selectedPiece.col;

      if (fromRow === row && fromCol === col) {
        // Clicked on the same piece, deselect it
        setSelectedPiece(null);
        setValidMoves([]);
      } else if (isMoveValid(fromRow, fromCol, row, col)) {
        // Make the move
        const newBoard = JSON.parse(JSON.stringify(board));

        // Check if this is a capture and what piece is being captured
        const capturedPiece = newBoard[row][col].type;

        // Execute the move
        newBoard[row][col] = newBoard[fromRow][fromCol];
        newBoard[fromRow][fromCol] = { type: '', color: null };

        // Record move in algebraic notation (simplified)
        const pieceType = board[fromRow][fromCol].type.toUpperCase();
        const fromSquare = String.fromCharCode(97 + fromCol) + (8 - fromRow);
        const toSquare = String.fromCharCode(97 + col) + (8 - row);
        const isCapture = board[row][col].type !== '';

        const moveText = pieceType === 'P'
          ? (isCapture ? fromSquare.charAt(0) + "x" + toSquare : toSquare)
          : pieceType + (isCapture ? "x" : "") + toSquare;

        setMoveHistory([...moveHistory, moveText]);

        // Check if a king was captured
        const kingStatus = checkForKingCapture(newBoard);

        if (kingStatus.captured) {
          // Game over - king captured
          const winningColor = kingStatus.color === 'white' ? 'black' : 'white';
          setGameOver(true);
          setWinner(winningColor);
          setGameStatus(`Checkmate! ${winningColor.charAt(0).toUpperCase() + winningColor.slice(1)} wins!`);

          // Show game over message
          toast.success(`Checkmate! ${winningColor.charAt(0).toUpperCase() + winningColor.slice(1)} wins!`, {
            duration: 5000,
            position: 'top-center',
          });

          // Update the board with the final position
          setBoard(newBoard);
        } else {
          // Continue the game
          setBoard(newBoard);
          setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
          toast.success(`Move: ${moveText}`);
        }

        setSelectedPiece(null);
        setValidMoves([]);

        // Call the onMove callback if provided
        if (onMove) {
          onMove(moveText);
        }
      } else {
        // Invalid move, show toast and deselect
        toast.error("Invalid move!");
        setSelectedPiece(null);
        setValidMoves([]);
      }
    }
  };

  // AI move logic
  const makeAIMove = () => {
    if (!playAgainstAI || currentPlayer !== 'black' || isAIThinking || gameOver) return;

    setIsAIThinking(true);

    // Simulate AI thinking time based on difficulty
    const thinkingTime =
      aiDifficulty === 'easy' ? 500 :
      aiDifficulty === 'medium' ? 1000 :
      1500;

    setTimeout(() => {
      // Get all possible moves for AI (black pieces)
      const allPossibleMoves: { from: Position; to: Position; piece: Piece }[] = [];

      // Find all black pieces and their possible moves
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          const piece = board[row][col];
          if (piece.color === 'black') {
            const moves = calculateValidMoves(piece, row, col);
            moves.forEach(move => {
              allPossibleMoves.push({
                from: { row, col },
                to: move,
                piece
              });
            });
          }
        }
      }

      if (allPossibleMoves.length === 0) {
        setGameStatus('Checkmate! White wins.');
        setGameOver(true);
        setWinner('white');
        toast.success('Checkmate! White wins.', {
          duration: 5000,
          position: 'top-center',
        });
        setIsAIThinking(false);
        return;
      }

      // Select a move based on difficulty
      let selectedMove;

      if (aiDifficulty === 'easy') {
        // Random move for easy difficulty
        selectedMove = allPossibleMoves[Math.floor(Math.random() * allPossibleMoves.length)];
      } else {
        // For medium and hard, prioritize captures and check
        const captureMoves = allPossibleMoves.filter(move =>
          board[move.to.row][move.to.col].type !== ''
        );

        if (captureMoves.length > 0 && (aiDifficulty === 'hard' || Math.random() > 0.5)) {
          // Sort captures by piece value for hard difficulty
          if (aiDifficulty === 'hard') {
            captureMoves.sort((a, b) => {
              const getPieceValue = (piece: Piece) => {
                if (!piece.type) return 0;
                const type = piece.type.toLowerCase();
                if (type === 'p') return 1;
                if (type === 'n' || type === 'b') return 3;
                if (type === 'r') return 5;
                if (type === 'q') return 9;
                if (type === 'k') return 100; // Prioritize king capture
                return 0;
              };

              return getPieceValue(board[b.to.row][b.to.col]) - getPieceValue(board[a.to.row][a.to.col]);
            });
          }

          selectedMove = captureMoves[0];
        } else {
          // Otherwise make a random move
          selectedMove = allPossibleMoves[Math.floor(Math.random() * allPossibleMoves.length)];
        }
      }

      // Execute the selected move
      const { from, to } = selectedMove;
      const newBoard = JSON.parse(JSON.stringify(board));

      // Check if this is a capture and what piece is being captured
      const capturedPiece = newBoard[to.row][to.col].type;
      const isKingCapture = capturedPiece === 'K';

      // Execute the move
      newBoard[to.row][to.col] = newBoard[from.row][from.col];
      newBoard[from.row][from.col] = { type: '', color: null };

      // Record move in algebraic notation
      const pieceType = board[from.row][from.col].type.toUpperCase();
      const fromSquare = String.fromCharCode(97 + from.col) + (8 - from.row);
      const toSquare = String.fromCharCode(97 + to.col) + (8 - to.row);
      const isCapture = board[to.row][to.col].type !== '';

      const moveText = pieceType === 'P'
        ? (isCapture ? fromSquare.charAt(0) + "x" + toSquare : toSquare)
        : pieceType + (isCapture ? "x" : "") + toSquare;

      const newMoveHistory = [...moveHistory, moveText];
      setMoveHistory(newMoveHistory);

      // Check if a king was captured
      const kingStatus = checkForKingCapture(newBoard);

      if (kingStatus.captured) {
        // Game over - king captured
        const winningColor = kingStatus.color === 'white' ? 'black' : 'white';
        setGameOver(true);
        setWinner(winningColor);
        setGameStatus(`Checkmate! ${winningColor.charAt(0).toUpperCase() + winningColor.slice(1)} wins!`);

        // Show game over message
        toast.success(`Checkmate! ${winningColor.charAt(0).toUpperCase() + winningColor.slice(1)} wins!`, {
          duration: 5000,
          position: 'top-center',
        });

        // Update the board with the final position
        setBoard(newBoard);
      } else {
        // Continue the game
        setBoard(newBoard);
        setCurrentPlayer('white');
        toast.info(`AI moved: ${moveText}`);
      }

      setIsAIThinking(false);

      // Call the onMove callback if provided
      if (onMove) {
        onMove(moveText);
      }
    }, thinkingTime);
  };

  // Effect to trigger AI move when it's AI's turn
  useEffect(() => {
    if (playAgainstAI && currentPlayer === 'black') {
      makeAIMove();
    }
  }, [currentPlayer, playAgainstAI]);

  // Determine if a square is light or dark
  const isLightSquare = (row: number, col: number) => {
    return (row + col) % 2 === 0;
  };

  // Determine if we need to rotate the board
  const shouldRotateBoard = boardRotated || playerColor === 'black';

  // Find row and column labels with rotation support
  const getColumnLabel = (col: number) => {
    const adjustedCol = shouldRotateBoard ? 7 - col : col;
    return String.fromCharCode(97 + adjustedCol);
  };

  const getRowLabel = (row: number) => {
    const adjustedRow = shouldRotateBoard ? row + 1 : 8 - row;
    return adjustedRow;
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`${boardSizes[size]} aspect-square border-4 border-chess-dark rounded-md overflow-hidden shadow-xl relative bg-chess-dark/10`}>
        {/* Chess board container with labels */}
        <div className="relative w-full h-full p-2">
          {/* Column labels - top */}
          <div className="absolute top-0 left-8 right-2 flex justify-around">
            {Array(8).fill(0).map((_, col) => (
              <div key={`top-${col}`} className="text-xs font-semibold text-muted-foreground">
                {getColumnLabel(col)}
              </div>
            ))}
          </div>

          {/* Row labels - left */}
          <div className="absolute top-8 bottom-2 left-0 flex flex-col justify-around">
            {Array(8).fill(0).map((_, row) => (
              <div key={`left-${row}`} className="text-xs font-semibold text-muted-foreground w-6 text-center">
                {getRowLabel(row)}
              </div>
            ))}
          </div>

          {/* Chessboard grid */}
          <div className="chess-grid h-[calc(100%-24px)] w-[calc(100%-24px)] ml-6 mt-6">
            {/* Create arrays for rows and columns that can be reversed for board rotation */}
            {Array(8).fill(0).map((_, displayRowIndex) => {
              // Convert display row index to actual board row index based on rotation
              const rowIndex = shouldRotateBoard ? 7 - displayRowIndex : displayRowIndex;

              return Array(8).fill(0).map((_, displayColIndex) => {
                // Convert display column index to actual board column index based on rotation
                const colIndex = shouldRotateBoard ? 7 - displayColIndex : displayColIndex;
                const piece = board[rowIndex][colIndex];

                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`
                      ${isLightSquare(rowIndex, colIndex) ? themeClasses[theme].light : themeClasses[theme].dark}
                      ${selectedPiece?.row === rowIndex && selectedPiece?.col === colIndex
                        ? 'ring-2 ring-secondary shadow-inner' : ''}
                      ${validMoves.some(move => move.row === rowIndex && move.col === colIndex)
                        ? 'ring-2 ring-secondary ring-opacity-50' : ''}
                      relative aspect-square
                    `}
                    onClick={() => handleSquareClick(rowIndex, colIndex)}
                  >
                    {validMoves.some(move => move.row === rowIndex && move.col === colIndex) && (
                      <div className="absolute inset-0 bg-secondary opacity-30 rounded-full transform scale-50"></div>
                    )}
                    <div className="chess-piece">
                      <span className={`
                        ${piece.color === 'black' ? 'text-gray-900' : 'text-white'}
                        text-3xl font-bold drop-shadow-md
                      `}>
                        {getPieceSymbol(piece)}
                      </span>
                    </div>
                  </div>
                );
              });
            })}
          </div>
        </div>
      </div>

      {/* Game status and player turn indicator */}
      <div className="mt-4 flex flex-col items-center gap-2">
        {gameOver ? (
          <div className="flex flex-col items-center">
            <div className={`px-4 py-2 rounded-md ${winner === 'white' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'} font-medium text-center`}>
              {gameStatus}
            </div>
            <button
              onClick={() => {
                setBoard(initializeBoard());
                setCurrentPlayer('white');
                setSelectedPiece(null);
                setValidMoves([]);
                setMoveHistory([]);
                setGameStatus('');
                setGameOver(false);
                setWinner(null);
              }}
              className="mt-2 px-4 py-1 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90 transition-colors"
            >
              Play Again
            </button>
          </div>
        ) : (
          <div className="flex gap-2 items-center">
            <div className={`h-4 w-4 rounded-full ${currentPlayer === 'white' ? 'bg-white border border-gray-400' : 'bg-gray-800'}`}></div>
            <span className="text-sm font-medium">{currentPlayer === 'white' ? 'White' : 'Black'} to move</span>
            {isAIThinking && <span className="text-xs text-muted-foreground animate-pulse ml-2">AI is thinking...</span>}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChessBoard;
