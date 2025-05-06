import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, RefreshCw, Flag, Timer, Users, RotateCcw, Zap, MessageCircle, Clock } from "lucide-react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import Navbar from "@/components/Navbar";
import ChessBoard from "@/components/ChessBoard";
import GameRecorder from "@/components/GameRecorder";
import Logo from "@/components/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const LocalMultiplayerGame = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  // Get game settings from URL params or use defaults
  const [theme, setTheme] = useState<'classic' | 'blue' | 'green'>(
    (queryParams.get('theme') as 'classic' | 'blue' | 'green') || 'classic'
  );
  const [player1Name, setPlayer1Name] = useState(queryParams.get('player1') || "Player 1");
  const [player2Name, setPlayer2Name] = useState(queryParams.get('player2') || "Player 2");
  const [useTimer, setUseTimer] = useState(queryParams.get('timer') === 'true');
  const [timeControl, setTimeControl] = useState({
    minutes: parseInt(queryParams.get('minutes') || '10'),
    increment: parseInt(queryParams.get('increment') || '5')
  });
  
  // Game state
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [isGameActive, setIsGameActive] = useState(true);
  const [player1Time, setPlayer1Time] = useState(timeControl.minutes * 60);
  const [player2Time, setPlayer2Time] = useState(timeControl.minutes * 60);
  const [activePlayer, setActivePlayer] = useState<1 | 2>(1);
  const [boardRotated, setBoardRotated] = useState(queryParams.get('rotated') === 'true');
  const [viewingAs, setViewingAs] = useState<'player1' | 'player2'>(
    queryParams.get('viewAs') === 'player2' ? 'player2' : 'player1'
  );
  const [capturedPieces, setCapturedPieces] = useState({
    white: [] as string[],
    black: [] as string[]
  });
  const [gameResult, setGameResult] = useState<string | null>(null);
  const [lastMove, setLastMove] = useState<string | null>(null);
  const [moveCount, setMoveCount] = useState(0);
  const [gameStartTime, setGameStartTime] = useState<Date>(new Date());
  const [gameElapsedTime, setGameElapsedTime] = useState(0);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<{sender: string, message: string, time: string}[]>([]);
  const [chatInput, setChatInput] = useState("");
  
  const chessBoardRef = useRef(null);
  const chatInputRef = useRef<HTMLInputElement>(null);

  // Handle a move made on the board
  const handleMove = (moveText: string, capturedPiece?: string) => {
    setMoveHistory(prev => [...prev, moveText]);
    setLastMove(moveText);
    setMoveCount(prev => prev + 1);
    
    // Update captured pieces if any
    if (capturedPiece) {
      if (activePlayer === 1) {
        setCapturedPieces(prev => ({
          ...prev,
          black: [...prev.black, capturedPiece]
        }));
      } else {
        setCapturedPieces(prev => ({
          ...prev,
          white: [...prev.white, capturedPiece]
        }));
      }
    }

    // Switch active player for timer
    setActivePlayer(prev => prev === 1 ? 2 : 1);

    // Add increment if timer is active
    if (useTimer) {
      if (activePlayer === 1) {
        setPlayer1Time(prev => prev + timeControl.increment);
      } else {
        setPlayer2Time(prev => prev + timeControl.increment);
      }
    }
  };

  // Handle player resignation
  const handleResign = (player: 1 | 2) => {
    if (!isGameActive) return;

    const winner = player === 1 ? player2Name : player1Name;
    setGameResult(`${winner} wins by resignation`);
    toast.info(`${player === 1 ? player1Name : player2Name} resigned. ${winner} wins!`);
    setIsGameActive(false);
  };

  // Restart the game
  const handleRestart = () => {
    // Reset the game
    setMoveHistory([]);
    setIsGameActive(true);
    setPlayer1Time(timeControl.minutes * 60);
    setPlayer2Time(timeControl.minutes * 60);
    setActivePlayer(1);
    setCapturedPieces({ white: [], black: [] });
    setGameResult(null);
    setLastMove(null);
    setMoveCount(0);
    setGameStartTime(new Date());
    setGameElapsedTime(0);
    window.location.reload(); // Simple way to reset the board
  };

  // Send a chat message
  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    
    const newMessage = {
      sender: activePlayer === 1 ? player1Name : player2Name,
      message: chatInput.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatMessages(prev => [...prev, newMessage]);
    setChatInput("");
    
    if (chatInputRef.current) {
      chatInputRef.current.focus();
    }
  };

  // Format time for display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (useTimer && isGameActive) {
      timer = setInterval(() => {
        if (activePlayer === 1) {
          setPlayer1Time(prev => {
            if (prev <= 0) {
              clearInterval(timer);
              setIsGameActive(false);
              setGameResult(`${player2Name} wins on time`);
              toast.info(`Time's up! ${player2Name} wins!`);
              return 0;
            }
            return prev - 1;
          });
        } else {
          setPlayer2Time(prev => {
            if (prev <= 0) {
              clearInterval(timer);
              setIsGameActive(false);
              setGameResult(`${player1Name} wins on time`);
              toast.info(`Time's up! ${player1Name} wins!`);
              return 0;
            }
            return prev - 1;
          });
        }
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [useTimer, isGameActive, activePlayer, player1Name, player2Name]);

  // Game elapsed time effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isGameActive) {
      timer = setInterval(() => {
        const elapsed = Math.floor((new Date().getTime() - gameStartTime.getTime()) / 1000);
        setGameElapsedTime(elapsed);
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isGameActive, gameStartTime]);

  // Format elapsed time
  const formatElapsedTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-grow pt-16 pb-8">
        <div className="max-w-6xl mx-auto p-4">
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Game Board Section */}
            <div className="flex-1 w-full">
              <div className="flex items-center mb-4 space-x-2">
                <Button variant="ghost" size="icon" asChild>
                  <Link to="/play/local">
                    <ArrowLeft className="h-5 w-5" />
                  </Link>
                </Button>
                <h1 className="text-2xl font-bold">Local Multiplayer</h1>
                <Badge variant="outline">
                  <Users className="h-3.5 w-3.5 mr-1" />
                  1 vs 1
                </Badge>
                {gameResult && (
                  <Badge variant="secondary" className="ml-auto">
                    {gameResult}
                  </Badge>
                )}
              </div>

              <Card className="overflow-hidden bg-gradient-to-tr from-card to-background shadow-lg border-2">
                <CardContent className="p-4 flex justify-center">
                  <ChessBoard
                    ref={chessBoardRef}
                    theme={theme}
                    size="large"
                    playMode="local"
                    onMove={handleMove}
                    boardRotated={boardRotated}
                    playerColor={viewingAs === 'player1' ? 'white' : 'black'}
                  />
                </CardContent>
              </Card>

              {/* Player Info and Timers */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <Card className={`border-2 ${activePlayer === 1 ? 'border-primary' : 'border-transparent'}`}>
                  <CardContent className="p-3 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {player1Name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{player1Name}</h3>
                        <p className="text-xs text-muted-foreground">White</p>
                      </div>
                    </div>
                    {useTimer && (
                      <div className={`text-xl font-mono ${player1Time < 30 ? 'text-red-500' : ''}`}>
                        {formatTime(player1Time)}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className={`border-2 ${activePlayer === 2 ? 'border-primary' : 'border-transparent'}`}>
                  <CardContent className="p-3 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {player2Name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{player2Name}</h3>
                        <p className="text-xs text-muted-foreground">Black</p>
                      </div>
                    </div>
                    {useTimer && (
                      <div className={`text-xl font-mono ${player2Time < 30 ? 'text-red-500' : ''}`}>
                        {formatTime(player2Time)}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Captured Pieces */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <Card>
                  <CardContent className="p-3">
                    <h3 className="text-sm font-medium mb-2">Captured by White</h3>
                    <div className="flex flex-wrap gap-1">
                      {capturedPieces.black.map((piece, index) => (
                        <div key={index} className="w-6 h-6 flex items-center justify-center bg-muted rounded-sm">
                          {piece}
                        </div>
                      ))}
                      {capturedPieces.black.length === 0 && (
                        <p className="text-xs text-muted-foreground">No pieces captured yet</p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-3">
                    <h3 className="text-sm font-medium mb-2">Captured by Black</h3>
                    <div className="flex flex-wrap gap-1">
                      {capturedPieces.white.map((piece, index) => (
                        <div key={index} className="w-6 h-6 flex items-center justify-center bg-muted rounded-sm">
                          {piece}
                        </div>
                      ))}
                      {capturedPieces.white.length === 0 && (
                        <p className="text-xs text-muted-foreground">No pieces captured yet</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Game Controls Section */}
            <div className="w-full md:w-80 space-y-4 sticky top-20">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Logo size="small" />
                    Game Controls
                  </CardTitle>
                  <CardDescription>
                    Manage your current game
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted/30 p-4 rounded-md mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Players:</span>
                      <span className="text-sm">{player1Name} vs {player2Name}</span>
                    </div>
                    {useTimer && (
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Time Control:</span>
                        <span className="text-sm">{timeControl.minutes}m + {timeControl.increment}s</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Game Time:</span>
                      <span className="text-sm">{formatElapsedTime(gameElapsedTime)}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={handleRestart}
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      New Game
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => setBoardRotated(!boardRotated)}
                    >
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Rotate Board
                    </Button>

                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="justify-start text-destructive"
                        onClick={() => handleResign(1)}
                        disabled={!isGameActive}
                      >
                        <Flag className="mr-2 h-4 w-4" />
                        P1 Resign
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        className="justify-start text-destructive"
                        onClick={() => handleResign(2)}
                        disabled={!isGameActive}
                      >
                        <Flag className="mr-2 h-4 w-4" />
                        P2 Resign
                      </Button>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => setShowChat(!showChat)}
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      {showChat ? "Hide Chat" : "Show Chat"}
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start mt-2"
                      onClick={() => navigate('/')}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Quit to Main Menu
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {showChat && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Game Chat</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="h-48 overflow-y-auto p-3 bg-muted/20">
                      {chatMessages.length === 0 ? (
                        <p className="text-center text-sm text-muted-foreground py-4">
                          No messages yet. Start the conversation!
                        </p>
                      ) : (
                        <div className="space-y-3">
                          {chatMessages.map((msg, index) => (
                            <div key={index} className="flex flex-col">
                              <div className="flex items-center gap-1">
                                <span className="font-medium text-sm">{msg.sender}</span>
                                <span className="text-xs text-muted-foreground">{msg.time}</span>
                              </div>
                              <p className="text-sm">{msg.message}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="p-3 flex gap-2">
                      <input
                        ref={chatInputRef}
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Type a message..."
                        className="flex-grow px-3 py-1 text-sm rounded-md border bg-background"
                      />
                      <Button size="sm" onClick={handleSendMessage}>Send</Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              <GameRecorder
                moveHistory={moveHistory}
                gameMetadata={{
                  whitePlayer: player1Name,
                  blackPlayer: player2Name,
                  date: new Date().toISOString().split('T')[0],
                  result: gameResult || "In progress"
                }}
              />

              {lastMove && (
                <Card>
                  <CardContent className="p-3">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium">Last Move</h3>
                      <Badge variant="outline" className="text-xs">
                        Move {Math.ceil(moveCount / 2)}
                      </Badge>
                    </div>
                    <p className="text-lg font-mono mt-1">{lastMove}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {activePlayer === 1 ? "White" : "Black"} to move
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LocalMultiplayerGame;
