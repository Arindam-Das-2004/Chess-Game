import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Lightbulb, RotateCcw, Share2, Save, Download } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Navbar from "@/components/Navbar";
import ChessBoard from "@/components/ChessBoard";
import GameRecorder from "@/components/GameRecorder";
import Logo from "@/components/Logo";

// Sample opening data
const openings = [
  {
    id: "ruy-lopez",
    name: "Ruy Lopez",
    description: "One of the oldest and most popular openings, known for its strategic depth.",
    moves: ["e4", "e5", "Nf3", "Nc6", "Bb5"],
    variations: [
      { name: "Berlin Defense", moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "Nf6"] },
      { name: "Morphy Defense", moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "a6"] },
      { name: "Classical Defense", moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "Bc5"] }
    ]
  },
  {
    id: "sicilian",
    name: "Sicilian Defense",
    description: "Aggressive counter-attacking opening, popular at all levels of play.",
    moves: ["e4", "c5"],
    variations: [
      { name: "Najdorf Variation", moves: ["e4", "c5", "Nf3", "d6", "d4", "cxd4", "Nxd4", "Nf6", "Nc3", "a6"] },
      { name: "Dragon Variation", moves: ["e4", "c5", "Nf3", "d6", "d4", "cxd4", "Nxd4", "Nf6", "Nc3", "g6"] },
      { name: "Scheveningen Variation", moves: ["e4", "c5", "Nf3", "d6", "d4", "cxd4", "Nxd4", "Nf6", "Nc3", "e6"] }
    ]
  },
  {
    id: "queens-gambit",
    name: "Queen's Gambit",
    description: "Solid opening for White that fights for the center immediately.",
    moves: ["d4", "d5", "c4"],
    variations: [
      { name: "Queen's Gambit Accepted", moves: ["d4", "d5", "c4", "dxc4"] },
      { name: "Queen's Gambit Declined", moves: ["d4", "d5", "c4", "e6"] },
      { name: "Slav Defense", moves: ["d4", "d5", "c4", "c6"] }
    ]
  }
];

// Sample endgame positions
const endgames = [
  {
    id: "king-pawn",
    name: "King and Pawn vs King",
    description: "Learn the key concepts of king and pawn endgames.",
    fen: "8/8/8/8/8/4k3/4P3/4K3 w - - 0 1",
    objective: "White to move and win by promoting the pawn."
  },
  {
    id: "lucena",
    name: "Lucena Position",
    description: "Classic rook endgame position where the stronger side can force a win.",
    fen: "3k4/3P4/3K4/8/8/8/8/3R4 w - - 0 1",
    objective: "White to move and win by promoting the pawn."
  },
  {
    id: "philidor",
    name: "Philidor Position",
    description: "Important defensive rook endgame position.",
    fen: "8/8/8/8/8/1k6/3r4/R3K3 w - - 0 1",
    objective: "White to move and draw by keeping the king in front of the pawn."
  }
];

// Sample tactical puzzles
const puzzles = [
  {
    id: "fork-1",
    name: "Knight Fork",
    description: "Find the knight fork to win material.",
    fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 1",
    solution: ["Nxe5", "Nxe5", "Qh5+", "g6", "Qxe5+"],
    difficulty: "easy"
  },
  {
    id: "pin-1",
    name: "Absolute Pin",
    description: "Use a pin to win material.",
    fen: "r1bqkbnr/ppp2ppp/2np4/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 1",
    solution: ["Bxf7+", "Kxf7", "Nxe5+", "Ke8", "Nxc6"],
    difficulty: "medium"
  },
  {
    id: "mate-1",
    name: "Checkmate in 3",
    description: "Find the forced checkmate sequence.",
    fen: "r1bqkb1r/pppp1Qpp/2n2n2/4p3/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 0 1",
    solution: ["Nxe4", "Qxf8+", "Kxf8", "Bh6#"],
    difficulty: "hard"
  }
];

const Practice = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<'classic' | 'blue' | 'green'>('classic');
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [selectedOpening, setSelectedOpening] = useState(openings[0]);
  const [selectedVariation, setSelectedVariation] = useState(openings[0].variations[0]);
  const [selectedEndgame, setSelectedEndgame] = useState(endgames[0]);
  const [selectedPuzzle, setSelectedPuzzle] = useState(puzzles[0]);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const chessBoardRef = useRef(null);

  const handleMove = (moveText: string) => {
    setMoveHistory(prev => [...prev, moveText]);
  };

  const handleOpeningSelect = (openingId: string) => {
    const opening = openings.find(o => o.id === openingId) || openings[0];
    setSelectedOpening(opening);
    setSelectedVariation(opening.variations[0]);
    setMoveHistory(opening.moves);
  };

  const handleVariationSelect = (variationName: string) => {
    const variation = selectedOpening.variations.find(v => v.name === variationName) || selectedOpening.variations[0];
    setSelectedVariation(variation);
    setMoveHistory(variation.moves);
  };

  const handleEndgameSelect = (endgameId: string) => {
    const endgame = endgames.find(e => e.id === endgameId) || endgames[0];
    setSelectedEndgame(endgame);
    setMoveHistory([]);
    setShowHint(false);
    setShowSolution(false);
  };

  const handlePuzzleSelect = (puzzleId: string) => {
    const puzzle = puzzles.find(p => p.id === puzzleId) || puzzles[0];
    setSelectedPuzzle(puzzle);
    setMoveHistory([]);
    setShowHint(false);
    setShowSolution(false);
  };

  const handleResetPosition = () => {
    window.location.reload(); // Simple way to reset the board
  };

  const handleShowHint = () => {
    setShowHint(true);
    toast.info("Hint: Look for forcing moves like checks, captures, and threats.");
  };

  const handleShowSolution = () => {
    setShowSolution(true);
    toast.success("Solution revealed!");
  };

  const handleSaveProgress = () => {
    toast.success("Progress saved!");
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
                <h1 className="text-2xl font-bold">Practice Mode</h1>
                <Badge variant="outline">
                  <BookOpen className="h-3.5 w-3.5 mr-1" />
                  Learn
                </Badge>
              </div>

              <Card className="overflow-hidden bg-gradient-to-tr from-card to-background shadow-lg border-2">
                <CardContent className="p-4 flex justify-center">
                  <ChessBoard
                    ref={chessBoardRef}
                    theme={theme}
                    size="large"
                    playMode="practice"
                    onMove={handleMove}
                  />
                </CardContent>
              </Card>

              {/* Current Study Info */}
              <Card className="mt-4">
                <CardContent className="p-4">
                  <Tabs defaultValue="openings">
                    <TabsList className="grid grid-cols-3 mb-4">
                      <TabsTrigger value="openings">Openings</TabsTrigger>
                      <TabsTrigger value="endgames">Endgames</TabsTrigger>
                      <TabsTrigger value="tactics">Tactics</TabsTrigger>
                    </TabsList>

                    <TabsContent value="openings" className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium">{selectedOpening.name}</h3>
                        <p className="text-sm text-muted-foreground">{selectedOpening.description}</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">Variation: {selectedVariation.name}</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedVariation.moves.map((move, index) => (
                            <Badge key={index} variant="outline">
                              {index % 2 === 0 ? `${Math.floor(index/2) + 1}.` : ''} {move}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button variant="outline" size="sm" onClick={handleResetPosition}>
                          <RotateCcw className="mr-2 h-4 w-4" />
                          Reset Position
                        </Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="endgames" className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium">{selectedEndgame.name}</h3>
                        <p className="text-sm text-muted-foreground">{selectedEndgame.description}</p>
                      </div>

                      <div className="bg-muted/30 p-3 rounded-md">
                        <h4 className="text-sm font-medium mb-1">Objective:</h4>
                        <p className="text-sm">{selectedEndgame.objective}</p>
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={handleShowHint}>
                          <Lightbulb className="mr-2 h-4 w-4" />
                          Hint
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleResetPosition}>
                          <RotateCcw className="mr-2 h-4 w-4" />
                          Reset Position
                        </Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="tactics" className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-medium">{selectedPuzzle.name}</h3>
                          <Badge>{selectedPuzzle.difficulty}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{selectedPuzzle.description}</p>
                      </div>

                      {showSolution ? (
                        <div className="bg-muted/30 p-3 rounded-md">
                          <h4 className="text-sm font-medium mb-1">Solution:</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedPuzzle.solution.map((move, index) => (
                              <Badge key={index} variant="outline">
                                {index % 2 === 0 ? `${Math.floor(index/2) + 1}.` : ''} {move}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ) : showHint ? (
                        <div className="bg-muted/30 p-3 rounded-md">
                          <h4 className="text-sm font-medium mb-1">Hint:</h4>
                          <p className="text-sm">Look for {selectedPuzzle.name.toLowerCase()} opportunities.</p>
                        </div>
                      ) : null}

                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={handleShowHint} disabled={showHint}>
                          <Lightbulb className="mr-2 h-4 w-4" />
                          Hint
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleShowSolution} disabled={showSolution}>
                          <Save className="mr-2 h-4 w-4" />
                          Solution
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleResetPosition}>
                          <RotateCcw className="mr-2 h-4 w-4" />
                          Reset
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Controls Section */}
            <div className="w-full md:w-80 space-y-4 sticky top-20">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Logo size="small" />
                    Study Options
                  </CardTitle>
                  <CardDescription>Choose what to practice</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Tabs defaultValue="openings">
                    <TabsList className="grid grid-cols-3 mb-4">
                      <TabsTrigger value="openings">Openings</TabsTrigger>
                      <TabsTrigger value="endgames">Endgames</TabsTrigger>
                      <TabsTrigger value="tactics">Tactics</TabsTrigger>
                    </TabsList>

                    <TabsContent value="openings" className="space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="opening-select">Opening</Label>
                        <Select
                          value={selectedOpening.id}
                          onValueChange={handleOpeningSelect}
                        >
                          <SelectTrigger id="opening-select">
                            <SelectValue placeholder="Select opening" />
                          </SelectTrigger>
                          <SelectContent>
                            {openings.map(opening => (
                              <SelectItem key={opening.id} value={opening.id}>
                                {opening.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="variation-select">Variation</Label>
                        <Select
                          value={selectedVariation.name}
                          onValueChange={handleVariationSelect}
                        >
                          <SelectTrigger id="variation-select">
                            <SelectValue placeholder="Select variation" />
                          </SelectTrigger>
                          <SelectContent>
                            {selectedOpening.variations.map(variation => (
                              <SelectItem key={variation.name} value={variation.name}>
                                {variation.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </TabsContent>

                    <TabsContent value="endgames" className="space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="endgame-select">Endgame Position</Label>
                        <Select
                          value={selectedEndgame.id}
                          onValueChange={handleEndgameSelect}
                        >
                          <SelectTrigger id="endgame-select">
                            <SelectValue placeholder="Select endgame" />
                          </SelectTrigger>
                          <SelectContent>
                            {endgames.map(endgame => (
                              <SelectItem key={endgame.id} value={endgame.id}>
                                {endgame.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </TabsContent>

                    <TabsContent value="tactics" className="space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="puzzle-select">Tactical Puzzle</Label>
                        <Select
                          value={selectedPuzzle.id}
                          onValueChange={handlePuzzleSelect}
                        >
                          <SelectTrigger id="puzzle-select">
                            <SelectValue placeholder="Select puzzle" />
                          </SelectTrigger>
                          <SelectContent>
                            {puzzles.map(puzzle => (
                              <SelectItem key={puzzle.id} value={puzzle.id}>
                                {puzzle.name} ({puzzle.difficulty})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </TabsContent>
                  </Tabs>

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

                  <Separator />

                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={handleSaveProgress}
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save Progress
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => toast.success("Position shared to clipboard!")}
                    >
                      <Share2 className="mr-2 h-4 w-4" />
                      Share Position
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => toast.success("PGN downloaded!")}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Export PGN
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
                  blackPlayer: "Practice",
                  date: new Date().toISOString().split('T')[0],
                  event: "Study Session"
                }}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Practice;
