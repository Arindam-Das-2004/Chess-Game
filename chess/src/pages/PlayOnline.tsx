import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, RefreshCw, Flag, Timer, Users, Copy, Globe, Clock, UserPlus, Zap, Trophy } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Navbar from "@/components/Navbar";
import ChessBoard from "@/components/ChessBoard";
import GameRecorder from "@/components/GameRecorder";
import Logo from "@/components/Logo";

// Sample active games data
const activeGames = [
  { id: "game1", player: "ChessMaster99", rating: 1450, timeControl: "10+5", started: "2 min ago" },
  { id: "game2", player: "KnightRider", rating: 1320, timeControl: "5+3", started: "5 min ago" },
  { id: "game3", player: "QueenGambit", rating: 1680, timeControl: "15+10", started: "12 min ago" }
];

// Sample online players
const onlinePlayers = [
  { id: "player1", name: "GrandMaster42", rating: 1890, status: "playing" },
  { id: "player2", name: "BishopMove", rating: 1340, status: "online" },
  { id: "player3", name: "PawnStar", rating: 1250, status: "online" },
  { id: "player4", name: "RookiePlayer", rating: 980, status: "online" },
  { id: "player5", name: "CheckMate101", rating: 1560, status: "online" }
];

const PlayOnline = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<'classic' | 'blue' | 'green'>('classic');
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [isGameActive, setIsGameActive] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [generatedRoomId, setGeneratedRoomId] = useState("");
  const [opponent, setOpponent] = useState({ name: "", rating: 0 });
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [timeControl, setTimeControl] = useState("10+5");
  const chessBoardRef = useRef(null);

  // Generate a random room ID when component mounts
  useEffect(() => {
    const generateRoomId = () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let result = '';
      for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    };

    setGeneratedRoomId(generateRoomId());
  }, []);

  const handleMove = (moveText: string) => {
    setMoveHistory(prev => [...prev, moveText]);
  };

  const handleJoinRoom = () => {
    if (!roomId) {
      toast.error("Please enter a room ID");
      return;
    }

    // In a real app, this would connect to a server
    toast.success(`Joining room ${roomId}...`);
    setIsGameActive(true);
    setOpponent({ name: "Guest Player", rating: 1200 });
  };

  const handleCreateRoom = () => {
    // In a real app, this would create a room on the server
    toast.success(`Room created! ID: ${generatedRoomId}`);
    setRoomId(generatedRoomId);
    setIsGameActive(true);
    setOpponent({ name: "Waiting for opponent...", rating: 0 });
  };

  const handleCopyRoomId = () => {
    navigator.clipboard.writeText(generatedRoomId);
    toast.success("Room ID copied to clipboard!");
  };

  const handleQuickMatch = () => {
    toast.success("Looking for an opponent...");

    // Simulate finding a match after 2 seconds
    setTimeout(() => {
      const randomPlayer = onlinePlayers[Math.floor(Math.random() * onlinePlayers.length)];
      setOpponent({ name: randomPlayer.name, rating: randomPlayer.rating });
      setIsGameActive(true);
      toast.success(`Matched with ${randomPlayer.name}!`);
    }, 2000);
  };

  const handleSendInvite = () => {
    if (!inviteEmail) {
      toast.error("Please enter an email address");
      return;
    }

    // In a real app, this would send an email or notification
    toast.success(`Invitation sent to ${inviteEmail}`);
    setShowInviteDialog(false);
  };

  const handleResign = () => {
    if (!isGameActive) return;

    toast.info("You resigned the game.");
    setIsGameActive(false);
  };

  const handleRestart = () => {
    // Reset the game
    setMoveHistory([]);
    setIsGameActive(false);
    setOpponent({ name: "", rating: 0 });
    setRoomId("");
    window.location.reload(); // Simple way to reset the board
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
                  <Link to="/">
                    <ArrowLeft className="h-5 w-5" />
                  </Link>
                </Button>
                <h1 className="text-2xl font-bold">Play Online</h1>
                <Badge variant="outline">
                  <Globe className="h-3.5 w-3.5 mr-1" />
                  Global
                </Badge>
              </div>

              {isGameActive ? (
                <>
                  <Card className="overflow-hidden bg-gradient-to-tr from-card to-background shadow-lg border-2">
                    <CardContent className="p-4 flex justify-center">
                      <ChessBoard
                        ref={chessBoardRef}
                        theme={theme}
                        size="large"
                        playMode="online"
                        roomId={roomId}
                        onMove={handleMove}
                      />
                    </CardContent>
                  </Card>

                  {/* Player Info */}
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <Card className="border-2 border-primary">
                      <CardContent className="p-3 flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">You</h3>
                          <p className="text-xs text-muted-foreground">White</p>
                        </div>
                        <Badge variant="outline">
                          <Clock className="h-3 w-3 mr-1" />
                          {timeControl}
                        </Badge>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-transparent">
                      <CardContent className="p-3 flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">{opponent.name}</h3>
                          <p className="text-xs text-muted-foreground">Black</p>
                        </div>
                        {opponent.rating > 0 && (
                          <Badge variant="outline">{opponent.rating}</Badge>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </>
              ) : (
                <Card className="overflow-hidden bg-gradient-to-tr from-card to-background shadow-lg border-2">
                  <CardHeader>
                    <CardTitle>Play Chess Online</CardTitle>
                    <CardDescription>
                      Play against opponents from around the world
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Tabs defaultValue="quick" className="w-full">
                      <TabsList className="grid grid-cols-3 mb-4">
                        <TabsTrigger value="quick">Quick Match</TabsTrigger>
                        <TabsTrigger value="create">Create Room</TabsTrigger>
                        <TabsTrigger value="join">Join Room</TabsTrigger>
                      </TabsList>

                      <TabsContent value="quick" className="space-y-4">
                        <div className="text-center p-6">
                          <Globe className="h-16 w-16 mx-auto mb-4 text-primary opacity-80" />
                          <h3 className="text-xl font-bold mb-2">Quick Match</h3>
                          <p className="text-muted-foreground mb-6">
                            Find an opponent at your skill level instantly
                          </p>

                          <div className="grid grid-cols-3 gap-2 mb-6">
                            <Button
                              variant="outline"
                              className={timeControl === "3+2" ? "border-primary" : ""}
                              onClick={() => setTimeControl("3+2")}
                            >
                              3+2
                              <span className="text-xs block text-muted-foreground">Bullet</span>
                            </Button>
                            <Button
                              variant="outline"
                              className={timeControl === "10+5" ? "border-primary" : ""}
                              onClick={() => setTimeControl("10+5")}
                            >
                              10+5
                              <span className="text-xs block text-muted-foreground">Rapid</span>
                            </Button>
                            <Button
                              variant="outline"
                              className={timeControl === "30+0" ? "border-primary" : ""}
                              onClick={() => setTimeControl("30+0")}
                            >
                              30+0
                              <span className="text-xs block text-muted-foreground">Classical</span>
                            </Button>
                          </div>

                          <Button onClick={handleQuickMatch} className="w-full">
                            <Zap className="mr-2 h-4 w-4" />
                            Find Match
                          </Button>
                        </div>
                      </TabsContent>

                      <TabsContent value="create" className="space-y-4">
                        <div className="text-center p-6">
                          <Users className="h-16 w-16 mx-auto mb-4 text-primary opacity-80" />
                          <h3 className="text-xl font-bold mb-2">Create a Room</h3>
                          <p className="text-muted-foreground mb-6">
                            Create a private room and invite friends to play
                          </p>

                          <div className="flex items-center justify-center gap-2 mb-6">
                            <div className="bg-muted p-3 rounded-md font-mono text-lg">
                              {generatedRoomId}
                            </div>
                            <Button variant="outline" size="icon" onClick={handleCopyRoomId}>
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="grid grid-cols-3 gap-2 mb-6">
                            <Button
                              variant="outline"
                              className={timeControl === "5+3" ? "border-primary" : ""}
                              onClick={() => setTimeControl("5+3")}
                            >
                              5+3
                              <span className="text-xs block text-muted-foreground">Blitz</span>
                            </Button>
                            <Button
                              variant="outline"
                              className={timeControl === "10+5" ? "border-primary" : ""}
                              onClick={() => setTimeControl("10+5")}
                            >
                              10+5
                              <span className="text-xs block text-muted-foreground">Rapid</span>
                            </Button>
                            <Button
                              variant="outline"
                              className={timeControl === "15+10" ? "border-primary" : ""}
                              onClick={() => setTimeControl("15+10")}
                            >
                              15+10
                              <span className="text-xs block text-muted-foreground">Classical</span>
                            </Button>
                          </div>

                          <div className="flex gap-2">
                            <Button onClick={handleCreateRoom} className="flex-1">
                              Create Room
                            </Button>
                            <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
                              <DialogTrigger asChild>
                                <Button variant="outline">
                                  <UserPlus className="mr-2 h-4 w-4" />
                                  Invite
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Invite a Friend</DialogTitle>
                                  <DialogDescription>
                                    Send an invitation to play chess together.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid gap-2">
                                    <Label htmlFor="email">Email address</Label>
                                    <Input
                                      id="email"
                                      type="email"
                                      placeholder="friend@example.com"
                                      value={inviteEmail}
                                      onChange={(e) => setInviteEmail(e.target.value)}
                                    />
                                  </div>
                                  <div>
                                    <Label>Room ID</Label>
                                    <div className="flex items-center gap-2 mt-1">
                                      <div className="bg-muted p-2 rounded-md font-mono flex-1 text-center">
                                        {generatedRoomId}
                                      </div>
                                      <Button variant="outline" size="icon" onClick={handleCopyRoomId}>
                                        <Copy className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button onClick={handleSendInvite}>Send Invitation</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="join" className="space-y-4">
                        <div className="text-center p-6">
                          <Trophy className="h-16 w-16 mx-auto mb-4 text-primary opacity-80" />
                          <h3 className="text-xl font-bold mb-2">Join a Room</h3>
                          <p className="text-muted-foreground mb-6">
                            Enter a room ID to join a private game
                          </p>

                          <div className="grid gap-4 mb-6">
                            <div className="grid gap-2">
                              <Label htmlFor="room-id">Room ID</Label>
                              <Input
                                id="room-id"
                                placeholder="Enter 6-digit code"
                                value={roomId}
                                onChange={(e) => setRoomId(e.target.value.toUpperCase())}
                                className="text-center font-mono text-lg"
                                maxLength={6}
                              />
                            </div>
                          </div>

                          <Button onClick={handleJoinRoom} className="w-full">
                            Join Game
                          </Button>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Game Controls Section */}
            <div className="w-full md:w-80 space-y-4 sticky top-20">
              {isGameActive ? (
                <>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2">
                        <Logo size="small" />
                        Game Controls
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-muted/30 p-4 rounded-md mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Opponent:</span>
                          <span className="text-sm">{opponent.name}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Time Control:</span>
                          <span className="text-sm">{timeControl}</span>
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

                      <Separator />

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
                          className="w-full justify-start text-destructive"
                          onClick={handleResign}
                          disabled={!isGameActive}
                        >
                          <Flag className="mr-2 h-4 w-4" />
                          Resign Game
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

                  <GameRecorder
                    moveHistory={moveHistory}
                    gameMetadata={{
                      whitePlayer: "You",
                      blackPlayer: opponent.name,
                      date: new Date().toISOString().split('T')[0],
                    }}
                  />
                </>
              ) : (
                <>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        Online Players
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="max-h-64 overflow-y-auto">
                        {onlinePlayers.map((player) => (
                          <div
                            key={player.id}
                            className="flex items-center justify-between p-3 hover:bg-muted/50 transition-colors border-b last:border-0"
                          >
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${
                                player.status === 'online' ? 'bg-green-500' : 'bg-amber-500'
                              }`}></div>
                              <span className="font-medium">{player.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{player.rating}</Badge>
                              {player.status === 'online' && (
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <UserPlus className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-primary" />
                        Active Games
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="max-h-64 overflow-y-auto">
                        {activeGames.map((game) => (
                          <div
                            key={game.id}
                            className="flex items-center justify-between p-3 hover:bg-muted/50 transition-colors border-b last:border-0"
                          >
                            <div>
                              <div className="font-medium">{game.player}</div>
                              <div className="text-xs text-muted-foreground">Started {game.started}</div>
                            </div>
                            <div className="flex flex-col items-end">
                              <Badge variant="outline">{game.rating}</Badge>
                              <span className="text-xs text-muted-foreground">{game.timeControl}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button variant="ghost" size="sm" className="w-full">
                        View All Games
                      </Button>
                    </CardFooter>
                  </Card>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PlayOnline;
