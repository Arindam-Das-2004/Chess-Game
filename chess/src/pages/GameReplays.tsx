import React, { useState } from 'react';
import FeaturePageTemplate from '@/components/FeaturePageTemplate';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Repeat, ChevronLeft, ChevronRight, Play, Pause, SkipBack, SkipForward, Calendar, User, Clock } from 'lucide-react';
import ChessBoard from '@/components/ChessBoard';
import { motion } from 'framer-motion';
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

const GameReplays = () => {
  const [activeTab, setActiveTab] = useState('recent');
  const [isPlaying, setIsPlaying] = useState(false);
  const [moveIndex, setMoveIndex] = useState(0);

  // Sample game data
  const games = [
    {
      id: 1,
      title: "Victory vs AI (Medium)",
      date: "Today, 2:30 PM",
      opponent: "AI (Medium)",
      result: "Win",
      moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "a6", "Ba4", "Nf6", "O-O", "Be7", "Re1", "b5", "Bb3", "d6", "c3", "O-O"],
      duration: "15 minutes"
    },
    {
      id: 2,
      title: "Online Match #1342",
      date: "Yesterday, 7:15 PM",
      opponent: "ChessMaster99",
      result: "Loss",
      moves: ["d4", "Nf6", "c4", "e6", "Nc3", "Bb4", "e3", "O-O", "Bd3", "d5", "cxd5", "exd5"],
      duration: "22 minutes"
    },
    {
      id: 3,
      title: "Local Multiplayer Game",
      date: "Apr 28, 2023",
      opponent: "Friend",
      result: "Draw",
      moves: ["e4", "c5", "Nf3", "d6", "d4", "cxd4", "Nxd4", "Nf6", "Nc3", "a6", "Be3", "e5", "Nb3", "Be6"],
      duration: "30 minutes"
    }
  ];

  const currentGame = games[0];
  const totalMoves = currentGame.moves.length;

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrevMove = () => {
    if (moveIndex > 0) {
      setMoveIndex(moveIndex - 1);
    }
  };

  const handleNextMove = () => {
    if (moveIndex < totalMoves - 1) {
      setMoveIndex(moveIndex + 1);
    } else {
      setIsPlaying(false);
    }
  };

  const handleSliderChange = (value: number[]) => {
    setMoveIndex(value[0]);
  };

  const handleReset = () => {
    setMoveIndex(0);
    setIsPlaying(false);
  };

  // Auto-advance when playing
  React.useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying) {
      interval = setInterval(() => {
        if (moveIndex < totalMoves - 1) {
          setMoveIndex(prev => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, 1500);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, moveIndex, totalMoves]);

  return (
    <FeaturePageTemplate
      title="Game Replays"
      description="Review your past games and learn from your moves"
      icon={<Repeat className="h-5 w-5 text-primary" />}
      bgGradient="from-blue-500/5 via-background to-background"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card className="shadow-md border-border/60 overflow-hidden">
            <CardHeader className="bg-primary/5 border-b border-border/60">
              <div className="flex justify-between items-center">
                <CardTitle>{currentGame.title}</CardTitle>
                <Badge variant="outline" className={
                  currentGame.result === "Win" ? "bg-green-500/10 text-green-600" :
                  currentGame.result === "Loss" ? "bg-red-500/10 text-red-600" :
                  "bg-yellow-500/10 text-yellow-600"
                }>
                  {currentGame.result}
                </Badge>
              </div>
              <CardDescription className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> {currentGame.date}
                </span>
                <span className="flex items-center gap-1">
                  <User className="h-3 w-3" /> vs {currentGame.opponent}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {currentGame.duration}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 flex justify-center">
              <ChessBoard
                theme="blue"
                size="large"
              />
            </CardContent>
            <CardFooter className="bg-muted/20 border-t border-border/60 p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between w-full">
                <div className="text-sm">
                  Move {moveIndex + 1} of {totalMoves}
                </div>
                <div className="text-sm font-medium">
                  {moveIndex % 2 === 0 ? "White" : "Black"}: {currentGame.moves[moveIndex]}
                </div>
              </div>

              <Slider
                value={[moveIndex]}
                max={totalMoves - 1}
                step={1}
                onValueChange={handleSliderChange}
                className="w-full"
              />

              <div className="flex justify-center gap-2">
                <Button variant="outline" size="icon" onClick={handleReset}>
                  <SkipBack className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handlePrevMove} disabled={moveIndex === 0}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="default" size="icon" onClick={handlePlayPause}>
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button variant="outline" size="icon" onClick={handleNextMove} disabled={moveIndex === totalMoves - 1}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => setMoveIndex(totalMoves - 1)}>
                  <SkipForward className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>

          <Card className="shadow-md border-border/60">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Game Analysis</CardTitle>
              <CardDescription>Key moments and insights from this game</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-muted/30 p-3 rounded-md">
                <h3 className="font-medium mb-1">Opening (Moves 1-6)</h3>
                <p className="text-sm">
                  You played the Ruy Lopez opening, developing pieces efficiently and controlling the center.
                  The knight development to f3 was particularly strong, putting pressure on the e5 pawn.
                </p>
              </div>

              <div className="bg-muted/30 p-3 rounded-md">
                <h3 className="font-medium mb-1">Middle Game (Moves 7-12)</h3>
                <p className="text-sm">
                  Good castling timing provided king safety. The bishop retreat to b3 maintained pressure on the f7 square.
                  Consider developing the queen's side pieces earlier in future games.
                </p>
              </div>

              <div className="bg-muted/30 p-3 rounded-md">
                <h3 className="font-medium mb-1">End Game (Moves 13-16)</h3>
                <p className="text-sm">
                  Solid pawn structure maintained throughout the game. The c3 move provided good support for the d4 advance.
                  Your opponent's castling was a good defensive move.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="shadow-md border-border/60">
            <CardHeader className="bg-primary/5 border-b border-border/60">
              <CardTitle className="flex items-center gap-2">
                <Repeat className="h-4 w-4 text-primary" />
                Your Games
              </CardTitle>
              <CardDescription>
                Browse through your game history
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <Tabs defaultValue="recent" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="recent">Recent</TabsTrigger>
                  <TabsTrigger value="wins">Wins</TabsTrigger>
                  <TabsTrigger value="losses">Losses</TabsTrigger>
                </TabsList>

                <TabsContent value="recent" className="mt-0 space-y-2">
                  {games.map(game => (
                    <motion.div
                      key={game.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-muted/30 p-3 rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="font-medium">{game.title}</h3>
                        <Badge variant="outline" className={
                          game.result === "Win" ? "bg-green-500/10 text-green-600" :
                          game.result === "Loss" ? "bg-red-500/10 text-red-600" :
                          "bg-yellow-500/10 text-yellow-600"
                        }>
                          {game.result}
                        </Badge>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>vs {game.opponent}</span>
                        <span>{game.date}</span>
                      </div>
                    </motion.div>
                  ))}
                </TabsContent>

                <TabsContent value="wins" className="mt-0 space-y-2">
                  {games.filter(game => game.result === "Win").map(game => (
                    <motion.div
                      key={game.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-muted/30 p-3 rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="font-medium">{game.title}</h3>
                        <Badge variant="outline" className="bg-green-500/10 text-green-600">
                          {game.result}
                        </Badge>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>vs {game.opponent}</span>
                        <span>{game.date}</span>
                      </div>
                    </motion.div>
                  ))}
                </TabsContent>

                <TabsContent value="losses" className="mt-0 space-y-2">
                  {games.filter(game => game.result === "Loss").map(game => (
                    <motion.div
                      key={game.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-muted/30 p-3 rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="font-medium">{game.title}</h3>
                        <Badge variant="outline" className="bg-red-500/10 text-red-600">
                          {game.result}
                        </Badge>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>vs {game.opponent}</span>
                        <span>{game.date}</span>
                      </div>
                    </motion.div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="bg-muted/20 border-t border-border/60 p-3">
              <Button variant="outline" size="sm" className="w-full">
                View All Games
              </Button>
            </CardFooter>
          </Card>

          <Card className="shadow-md border-border/60">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Learning Points</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>
                Based on your recent games, here are some areas to focus on:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Develop pieces more efficiently in the opening</li>
                <li>Watch for tactical opportunities in the middle game</li>
                <li>Improve pawn structure awareness</li>
                <li>Practice endgame techniques</li>
              </ul>
              <p className="text-muted-foreground italic mt-2">
                Reviewing your games is one of the best ways to improve!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </FeaturePageTemplate>
  );
};



export default GameReplays;
