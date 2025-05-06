
import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import ChessBoard from "@/components/ChessBoard";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Undo, Flag, HelpCircle, RefreshCw, RotateCcw, Zap } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import Logo from "@/components/Logo";
import { toast } from 'sonner';

const PlayAI = () => {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [theme, setTheme] = useState<'classic' | 'blue' | 'green'>('classic');
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [isGameActive, setIsGameActive] = useState(true);
  const [playerColor, setPlayerColor] = useState<'white' | 'black'>('white');
  const [boardRotated, setBoardRotated] = useState(false);
  const [isHyperMode, setIsHyperMode] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState<'white' | 'black'>('white');
  const chessBoardRef = useRef(null);

  // Check if user came from Hyper Mode selection
  useEffect(() => {
    const savedDifficulty = localStorage.getItem('chess-ai-difficulty');
    if (savedDifficulty === 'hard') {
      setDifficulty('hard');
      setIsHyperMode(true);
      // Clear the storage to not affect future games
      localStorage.removeItem('chess-ai-difficulty');

      // Show toast notification
      toast.success("Hyper Mode activated! Prepare for a challenge!", {
        icon: <Zap className="h-4 w-4" />,
        duration: 3000
      });
    }
  }, []);

  const handleMove = (moveText: string) => {
    setMoveHistory(prev => [...prev, moveText]);
    // Toggle current player after each move
    setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
  };

  const handleResign = () => {
    if (!isGameActive) return;

    toast.info("You resigned the game. AI wins!");
    setIsGameActive(false);
  };

  const handleRestart = () => {
    // Reset the game
    setMoveHistory([]);
    setIsGameActive(true);
    window.location.reload(); // Simple way to reset the board
  };

  // Format move history for display
  const formattedMoveHistory = [];
  for (let i = 0; i < moveHistory.length; i += 2) {
    const moveNumber = Math.floor(i / 2) + 1;
    const whiteMove = moveHistory[i];
    const blackMove = moveHistory[i + 1] || '';

    formattedMoveHistory.push({
      moveNumber,
      white: whiteMove,
      black: blackMove
    });
  }

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
                <h1 className="text-2xl font-bold">Playing Against AI</h1>
                {isHyperMode ? (
                  <Badge variant="destructive" className="animate-pulse">
                    <Zap className="h-3 w-3 mr-1" /> Hyper Mode
                  </Badge>
                ) : (
                  <Badge variant={difficulty === 'easy' ? 'outline' : difficulty === 'medium' ? 'default' : 'secondary'}>
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </Badge>
                )}
              </div>

              <Card className="overflow-hidden bg-gradient-to-tr from-card to-background shadow-lg border-2">
                <CardContent className="p-4 flex justify-center">
                  <ChessBoard
                    ref={chessBoardRef}
                    theme={theme}
                    size="large"
                    playAgainstAI={true}
                    aiDifficulty={difficulty}
                    playerColor={playerColor}
                    boardRotated={boardRotated}
                    onMove={handleMove}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Game Controls Section */}
            <div className="w-full md:w-80 space-y-4 sticky top-20">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Logo size="small" />
                    {moveHistory.length === 0 ? "Game Settings" : "Game Controls"}
                  </CardTitle>
                  <CardDescription>
                    {moveHistory.length === 0 ? "Configure your game" : "Manage your current game"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {moveHistory.length === 0 ? (
                    // Game settings (only shown before game starts)
                    <>
                      <div>
                        <h3 className="text-sm font-medium mb-2">AI Difficulty</h3>
                        <div className="flex gap-2">
                          <Button
                            variant={difficulty === 'easy' && !isHyperMode ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => {
                              setDifficulty('easy');
                              setIsHyperMode(false);
                            }}
                            className="flex-1"
                            disabled={isHyperMode}
                          >
                            Easy
                          </Button>
                          <Button
                            variant={difficulty === 'medium' && !isHyperMode ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => {
                              setDifficulty('medium');
                              setIsHyperMode(false);
                            }}
                            className="flex-1"
                            disabled={isHyperMode}
                          >
                            Medium
                          </Button>
                          {isHyperMode ? (
                            <Button
                              variant="destructive"
                              size="sm"
                              className="flex-1 relative overflow-hidden"
                              onClick={() => setIsHyperMode(false)}
                            >
                              <Zap className="h-3 w-3 mr-1 animate-pulse" />
                              Hyper
                            </Button>
                          ) : (
                            <Button
                              variant={difficulty === 'hard' ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => setDifficulty('hard')}
                              className="flex-1"
                            >
                              Hard
                            </Button>
                          )}
                        </div>
                      </div>

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
                        <h3 className="text-sm font-medium mb-2">Play As</h3>
                        <div className="flex gap-2">
                          <Button
                            variant={playerColor === 'white' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => {
                              setPlayerColor('white');
                              setBoardRotated(false);
                            }}
                            className="flex-1 relative overflow-hidden"
                          >
                            <span className="relative z-10">White</span>
                            <div className="absolute inset-0 opacity-10 bg-white"></div>
                          </Button>
                          <Button
                            variant={playerColor === 'black' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => {
                              setPlayerColor('black');
                              setBoardRotated(true);
                            }}
                            className="flex-1 relative overflow-hidden"
                          >
                            <span className="relative z-10">Black</span>
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
                    </>
                  ) : (
                    // Game is in progress - show game status
                    <div className="bg-muted/30 p-4 rounded-md mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Difficulty:</span>
                        <Badge variant={
                          difficulty === 'easy' ? 'outline' :
                          difficulty === 'medium' ? 'default' : 'secondary'
                        }>
                          {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Current Turn:</span>
                        <Badge variant="outline" className={currentPlayer === 'white' ? 'bg-white text-black' : 'bg-black text-white'}>
                          {currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  )}

                  <Separator />

                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={handleRestart}
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      {moveHistory.length === 0 ? "Start Game" : "New Game"}
                    </Button>

                    {moveHistory.length > 0 && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full justify-start"
                          disabled={!isGameActive || moveHistory.length === 0}
                        >
                          <HelpCircle className="mr-2 h-4 w-4" />
                          Get Hint
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full justify-start text-destructive"
                          onClick={handleResign}
                          disabled={!isGameActive}
                        >
                          <Flag className="mr-2 h-4 w-4" />
                          Resign Game
                        </Button>
                      </>
                    )}

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => navigate('/')}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Quit to Main Menu
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Move History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 overflow-y-auto bg-muted/30 rounded-md p-2 text-sm">
                    <div className="space-y-1">
                      {formattedMoveHistory.length > 0 ? (
                        formattedMoveHistory.map((move) => (
                          <div key={move.moveNumber} className="flex justify-between">
                            <span>{move.moveNumber}. {move.white}</span>
                            <span>{move.black}</span>
                          </div>
                        ))
                      ) : (
                        <div className="text-center text-muted-foreground py-4">
                          No moves yet
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <div className="text-xs text-muted-foreground">
                    Playing as White
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PlayAI;
