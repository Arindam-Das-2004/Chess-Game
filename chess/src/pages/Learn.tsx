import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";
import {
  BookOpen, Lightbulb, Target,
  Trophy, Zap, ArrowRight, Play,
  Clock, BookMarked,
  GraduationCap, Star, Puzzle, Brain
} from "lucide-react";

const Learn = () => {
  const [activeTab, setActiveTab] = useState("basics");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-grow pt-16 pb-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Hero Section */}
          <section className="py-10 mb-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-chess.blue to-secondary">
                Learn Chess
              </h1>
              <p className="text-muted-foreground mb-6">
                Master the game of kings with our comprehensive learning resources, from basic rules to advanced strategies.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button className="gap-2">
                  <GraduationCap size={16} />
                  Start Learning
                </Button>
                <Button variant="outline" className="gap-2" asChild>
                  <Link to="/learn/more">
                    <BookOpen size={16} />
                    Learn More About App
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Featured Section */}
          <section className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gradient-to-br from-card to-background md:col-span-3">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="md:w-1/2">
                      <Badge className="mb-2">Featured</Badge>
                      <h2 className="text-2xl font-bold mb-2">Chess Fundamentals</h2>
                      <p className="text-muted-foreground mb-4">
                        Learn the essential principles that will improve your game, from opening principles to endgame techniques.
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="outline">Beginner Friendly</Badge>
                        <Badge variant="outline">Video Lessons</Badge>
                        <Badge variant="outline">Interactive</Badge>
                      </div>
                      <Button className="gap-2">
                        <Play size={16} />
                        Start Course
                      </Button>
                    </div>
                    <div className="md:w-1/2 flex justify-center">
                      <div className="relative w-64 h-64 bg-muted rounded-lg flex items-center justify-center">
                        <BookMarked size={80} className="text-primary opacity-80" />
                        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent rounded-lg"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Learning Paths</CardTitle>
                  <CardDescription>Structured courses for all levels</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "Beginner's Journey", lessons: 12, icon: <GraduationCap size={16} /> },
                    { name: "Tactical Mastery", lessons: 24, icon: <Target size={16} /> },
                    { name: "Strategic Thinking", lessons: 18, icon: <Brain size={16} /> },
                    { name: "Endgame Essentials", lessons: 15, icon: <Trophy size={16} /> },
                    { name: "Opening Repertoire", lessons: 20, icon: <BookMarked size={16} /> }
                  ].map((path, index) => (
                    <div key={index} className="flex items-center justify-between group cursor-pointer hover:bg-muted/50 p-2 rounded-md transition-colors">
                      <div className="flex items-center gap-2">
                        <div className="text-primary">{path.icon}</div>
                        <div>
                          <p className="text-sm font-medium">{path.name}</p>
                          <p className="text-xs text-muted-foreground">{path.lessons} lessons</p>
                        </div>
                      </div>
                      <ArrowRight size={16} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full">View All Paths</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Your Progress</CardTitle>
                  <CardDescription>Track your learning journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Overall Completion</span>
                        <span className="font-medium">32%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: "32%" }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Puzzles Solved</span>
                        <span className="font-medium">145/500</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: "29%" }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Lessons Completed</span>
                        <span className="font-medium">24/75</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: "32%" }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-6">
              <Tabs defaultValue="basics" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-4 mb-6">
                  <TabsTrigger value="basics" className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    <span className="hidden sm:inline">Basics</span>
                  </TabsTrigger>
                  <TabsTrigger value="tactics" className="flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    <span className="hidden sm:inline">Tactics</span>
                  </TabsTrigger>
                  <TabsTrigger value="strategy" className="flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    <span className="hidden sm:inline">Strategy</span>
                  </TabsTrigger>
                  <TabsTrigger value="puzzles" className="flex items-center gap-2">
                    <Puzzle className="h-4 w-4" />
                    <span className="hidden sm:inline">Puzzles</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="basics" className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Chess Basics</h2>
                    <Button variant="outline">Filter</Button>
                  </div>

                  <Card>
                    <CardContent className="p-0">
                      <ScrollArea className="h-[600px]">
                        <div className="divide-y">
                          {[
                            {
                              title: "How Chess Pieces Move",
                              level: "Beginner",
                              duration: "10 min",
                              description: "Learn the basic movements of each chess piece on the board."
                            },
                            {
                              title: "Understanding Check and Checkmate",
                              level: "Beginner",
                              duration: "15 min",
                              description: "Master the concepts of check, checkmate, and stalemate."
                            },
                            {
                              title: "Special Moves: Castling and En Passant",
                              level: "Beginner",
                              duration: "12 min",
                              description: "Discover the special moves that can give you an advantage."
                            },
                            {
                              title: "Basic Opening Principles",
                              level: "Beginner-Intermediate",
                              duration: "20 min",
                              description: "Learn the fundamental principles for starting a chess game strong."
                            },
                            {
                              title: "Pawn Structure Fundamentals",
                              level: "Intermediate",
                              duration: "25 min",
                              description: "Understand how pawns form the backbone of your position."
                            },
                            {
                              title: "Basic Endgame Techniques",
                              level: "Intermediate",
                              duration: "30 min",
                              description: "Master essential endgame patterns and techniques."
                            }
                          ].map((lesson, index) => (
                            <div key={index} className="p-4 hover:bg-muted/30">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-medium mb-1">{lesson.title}</h3>
                                  <p className="text-sm text-muted-foreground mb-2">{lesson.description}</p>
                                  <div className="flex items-center text-xs text-muted-foreground">
                                    <Badge variant="outline" className="mr-2">{lesson.level}</Badge>
                                    <Clock className="h-3 w-3 mr-1" />
                                    <span>{lesson.duration}</span>
                                  </div>
                                </div>
                                <Button size="sm" className="shrink-0">
                                  Start
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="tactics" className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Tactical Patterns</h2>
                    <Button variant="outline">Filter</Button>
                  </div>

                  <Card>
                    <CardContent className="p-0">
                      <div className="divide-y">
                        {[
                          {
                            title: "Pins and Skewers",
                            level: "Intermediate",
                            difficulty: "Medium",
                            exercises: 15
                          },
                          {
                            title: "Forks and Double Attacks",
                            level: "Intermediate",
                            difficulty: "Medium",
                            exercises: 20
                          },
                          {
                            title: "Discovered Attacks",
                            level: "Intermediate",
                            difficulty: "Hard",
                            exercises: 12
                          },
                          {
                            title: "Removing the Defender",
                            level: "Advanced",
                            difficulty: "Hard",
                            exercises: 10
                          }
                        ].map((tactic, index) => (
                          <div key={index} className="p-4 hover:bg-muted/30">
                            <div className="flex justify-between items-center mb-2">
                              <h3 className="font-medium">{tactic.title}</h3>
                              <Badge variant={
                                tactic.difficulty === "Easy" ? "outline" :
                                tactic.difficulty === "Medium" ? "secondary" : "destructive"
                              }>
                                {tactic.difficulty}
                              </Badge>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground mb-3">
                              <span>{tactic.level}</span>
                              <span className="mx-1">•</span>
                              <span>{tactic.exercises} exercises</span>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm">Practice</Button>
                              <Button variant="outline" size="sm">Learn More</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="strategy" className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Strategic Concepts</h2>
                    <Button variant="outline">Filter</Button>
                  </div>

                  <Card>
                    <CardContent className="p-0">
                      <div className="divide-y">
                        {[
                          {
                            title: "Pawn Structure Strategies",
                            level: "Intermediate",
                            chapters: 5,
                            rating: 4.8
                          },
                          {
                            title: "Piece Coordination",
                            level: "Intermediate",
                            chapters: 4,
                            rating: 4.7
                          },
                          {
                            title: "Attacking the King",
                            level: "Advanced",
                            chapters: 6,
                            rating: 4.9
                          },
                          {
                            title: "Positional Sacrifices",
                            level: "Advanced",
                            chapters: 3,
                            rating: 4.6
                          }
                        ].map((strategy, index) => (
                          <div key={index} className="p-4 hover:bg-muted/30">
                            <div className="flex justify-between items-center mb-2">
                              <h3 className="font-medium">{strategy.title}</h3>
                              <div className="flex items-center">
                                {Array(5).fill(0).map((_, i) => (
                                  <Star key={i} size={14} className={i < Math.floor(strategy.rating) ? "text-amber-500 fill-amber-500" : "text-muted"} />
                                ))}
                                <span className="ml-1 text-xs">{strategy.rating}</span>
                              </div>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground mb-3">
                              <span>{strategy.level}</span>
                              <span className="mx-1">•</span>
                              <span>{strategy.chapters} chapters</span>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm">Start Learning</Button>
                              <Button variant="outline" size="sm">Preview</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="puzzles" className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Chess Puzzles</h2>
                    <Button variant="outline">Filter</Button>
                  </div>

                  <Card>
                    <CardContent className="p-0">
                      <div className="divide-y">
                        {[
                          {
                            title: "Daily Puzzle Challenge",
                            difficulty: "Varies",
                            type: "Mixed",
                            puzzles: "New daily"
                          },
                          {
                            title: "Checkmate in 2",
                            difficulty: "Medium",
                            type: "Mate",
                            puzzles: 50
                          },
                          {
                            title: "Tactical Combinations",
                            difficulty: "Hard",
                            type: "Tactics",
                            puzzles: 100
                          },
                          {
                            title: "Endgame Studies",
                            difficulty: "Expert",
                            type: "Endgame",
                            puzzles: 30
                          }
                        ].map((puzzle, index) => (
                          <div key={index} className="p-4 hover:bg-muted/30">
                            <div className="flex justify-between items-center mb-2">
                              <h3 className="font-medium">{puzzle.title}</h3>
                              <Badge>{puzzle.difficulty}</Badge>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground mb-3">
                              <span>Type: {puzzle.type}</span>
                              <span className="mx-1">•</span>
                              <span>{puzzle.puzzles} puzzles</span>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm">Solve Puzzles</Button>
                              <Button variant="outline" size="sm">View Collection</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <Card>
                <CardHeader>
                  <CardTitle>Recommended for You</CardTitle>
                  <CardDescription>Based on your progress and interests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        title: "Improve Your Calculation",
                        description: "Enhance your ability to calculate variations accurately",
                        icon: <Brain className="h-8 w-8 text-primary" />,
                        badge: "Recommended"
                      },
                      {
                        title: "Master the Endgame",
                        description: "Essential endgame techniques every player should know",
                        icon: <Trophy className="h-8 w-8 text-primary" />,
                        badge: "Popular"
                      }
                    ].map((item, index) => (
                      <Card key={index} className="border border-border/50">
                        <CardContent className="p-4 flex gap-4">
                          <div className="shrink-0">
                            {item.icon}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium">{item.title}</h3>
                              <Badge variant="outline" className="text-xs">{item.badge}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                            <Button variant="link" className="p-0 h-auto mt-2 text-sm">
                              Start Learning
                              <ArrowRight className="ml-1 h-3 w-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Learn;
