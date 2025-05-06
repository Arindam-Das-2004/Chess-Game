import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, RefreshCw, Flag, Timer, Users } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Navbar from "@/components/Navbar";
import ChessBoard from "@/components/ChessBoard";
import GameRecorder from "@/components/GameRecorder";
import Logo from "@/components/Logo";

const PlayLocal = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<'classic' | 'blue' | 'green'>('classic');
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [isGameActive, setIsGameActive] = useState(true);
  const [player1Name, setPlayer1Name] = useState("Player 1");
  const [player2Name, setPlayer2Name] = useState("Player 2");
  const [useTimer, setUseTimer] = useState(false);
  const [timeControl, setTimeControl] = useState({ minutes: 10, increment: 5 });
  const [player1Time, setPlayer1Time] = useState(timeControl.minutes * 60);
  const [player2Time, setPlayer2Time] = useState(timeControl.minutes * 60);
  const [activePlayer, setActivePlayer] = useState<1 | 2>(1);
  const [boardRotated, setBoardRotated] = useState(false);
  const [viewingAs, setViewingAs] = useState<'player1' | 'player2'>('player1');
  const chessBoardRef = useRef(null);

  const handleMove = (moveText: string) => {
    setMoveHistory(prev => [...prev, moveText]);

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

  const handleResign = (player: 1 | 2) => {
    if (!isGameActive) return;

    toast.info(`${player === 1 ? player1Name : player2Name} resigned. ${player === 1 ? player2Name : player1Name} wins!`);
    setIsGameActive(false);
  };

  const handleRestart = () => {
    // Reset the game
    setMoveHistory([]);
    setIsGameActive(true);
    setPlayer1Time(timeControl.minutes * 60);
    setPlayer2Time(timeControl.minutes * 60);
    setActivePlayer(1);
    window.location.reload(); // Simple way to reset the board
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
                  <Link to="/">
                    <ArrowLeft className="h-5 w-5" />
                  </Link>
                </Button>
                <h1 className="text-2xl font-bold">Local Multiplayer</h1>
                <Badge variant="outline">
                  <Users className="h-3.5 w-3.5 mr-1" />
                  1 vs 1
                </Badge>
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
                    <div>
                      <h3 className="font-medium">{player1Name}</h3>
                      <p className="text-xs text-muted-foreground">White</p>
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
                    <div>
                      <h3 className="font-medium">{player2Name}</h3>
                      <p className="text-xs text-muted-foreground">Black</p>
                    </div>
                    {useTimer && (
                      <div className={`text-xl font-mono ${player2Time < 30 ? 'text-red-500' : ''}`}>
                        {formatTime(player2Time)}
                      </div>
                    )}
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
                    {moveHistory.length === 0 ? "Game Setup" : "Game Controls"}
                  </CardTitle>
                  <CardDescription>
                    {moveHistory.length === 0 ? "Configure your local game" : "Manage your current game"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {moveHistory.length === 0 ? (
                    // Game setup options (only shown before game starts)
                    <>
                      <div>
                        <h3 className="text-sm font-medium mb-2">Player Names</h3>
                        <div className="space-y-2">
                          <div className="grid gap-1.5">
                            <Label htmlFor="player1">Player 1 (White)</Label>
                            <Input
                              id="player1"
                              value={player1Name}
                              onChange={(e) => setPlayer1Name(e.target.value)}
                              placeholder="Player 1"
                            />
                          </div>
                          <div className="grid gap-1.5">
                            <Label htmlFor="player2">Player 2 (Black)</Label>
                            <Input
                              id="player2"
                              value={player2Name}
                              onChange={(e) => setPlayer2Name(e.target.value)}
                              placeholder="Player 2"
                            />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-sm font-medium mb-2">Board Theme</h3>
                        <div className="flex gap-2">
                          <Button
                            variant={theme === 'classic' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setTheme('classic')}
                            className="flex-1"
                          >
                            Classic
                          </Button>
                          <Button
                            variant={theme === 'blue' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setTheme('blue')}
                            className="flex-1"
                          >
                            Blue
                          </Button>
                          <Button
                            variant={theme === 'green' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setTheme('green')}
                            className="flex-1"
                          >
                            Green
                          </Button>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium mb-2">View Board As</h3>
                        <div className="flex gap-2">
                          <Button
                            variant={viewingAs === 'player1' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => {
                              setViewingAs('player1');
                              setBoardRotated(false);
                            }}
                            className="flex-1 relative overflow-hidden"
                          >
                            <span className="relative z-10">{player1Name}</span>
                            <div className="absolute inset-0 opacity-10 bg-white"></div>
                          </Button>
                          <Button
                            variant={viewingAs === 'player2' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => {
                              setViewingAs('player2');
                              setBoardRotated(true);
                            }}
                            className="flex-1 relative overflow-hidden"
                          >
                            <span className="relative z-10">{player2Name}</span>
                            <div className="absolute inset-0 opacity-10 bg-black"></div>
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="rotate-board" className="font-medium">Rotate Board</Label>
                          <p className="text-xs text-muted-foreground">Flip the board view</p>
                        </div>
                        <Switch
                          id="rotate-board"
                          checked={boardRotated}
                          onCheckedChange={setBoardRotated}
                        />
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="use-timer" className="font-medium">Use Timer</Label>
                            <p className="text-xs text-muted-foreground">Enable time control</p>
                          </div>
                          <Switch
                            id="use-timer"
                            checked={useTimer}
                            onCheckedChange={setUseTimer}
                          />
                        </div>

                        {useTimer && (
                          <div className="grid grid-cols-2 gap-2 pt-2">
                            <div className="grid gap-1.5">
                              <Label htmlFor="time-minutes">Minutes</Label>
                              <Input
                                id="time-minutes"
                                type="number"
                                min="1"
                                max="60"
                                value={timeControl.minutes}
                                onChange={(e) => setTimeControl({...timeControl, minutes: parseInt(e.target.value) || 10})}
                              />
                            </div>
                            <div className="grid gap-1.5">
                              <Label htmlFor="time-increment">Increment (sec)</Label>
                              <Input
                                id="time-increment"
                                type="number"
                                min="0"
                                max="60"
                                value={timeControl.increment}
                                onChange={(e) => setTimeControl({...timeControl, increment: parseInt(e.target.value) || 0})}
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      <Button
                        variant="default"
                        size="sm"
                        className="w-full mt-4"
                        onClick={() => {
                          // Navigate to the game page with settings as URL parameters
                          const params = new URLSearchParams({
                            player1: player1Name,
                            player2: player2Name,
                            theme: theme,
                            timer: useTimer.toString(),
                            minutes: timeControl.minutes.toString(),
                            increment: timeControl.increment.toString(),
                            rotated: boardRotated.toString(),
                            viewAs: viewingAs
                          });

                          navigate(`/play/local/game?${params.toString()}`);
                        }}
                      >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Start Game
                      </Button>
                    </>
                  ) : (
                    // Game is in progress - show game controls
                    <>
                      <div className="bg-muted/30 p-4 rounded-md mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Players:</span>
                          <span className="text-sm">{player1Name} vs {player2Name}</span>
                        </div>
                        {useTimer && (
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Time Control:</span>
                            <span className="text-sm">{timeControl.minutes}m + {timeControl.increment}s</span>
                          </div>
                        )}
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
                          className="w-full justify-start mt-2"
                          onClick={() => navigate('/')}
                        >
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          Quit to Main Menu
                        </Button>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              <GameRecorder
                moveHistory={moveHistory}
                gameMetadata={{
                  whitePlayer: player1Name,
                  blackPlayer: player2Name,
                  date: new Date().toISOString().split('T')[0],
                }}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PlayLocal;
