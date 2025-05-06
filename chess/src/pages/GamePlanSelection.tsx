import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Bot, Users, Globe, BookOpen, Trophy, Sparkles, Clock, Zap, Brain } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Logo from "@/components/Logo";

const GamePlanSelection = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('play');
  
  const handleGameSelection = (path: string) => {
    navigate(path);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow pt-16 pb-8">
        <div className="max-w-6xl mx-auto p-4">
          <div className="flex items-center mb-6 space-x-2">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">Game Selection</h1>
          </div>
          
          <Tabs defaultValue="play" value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="play">Play</TabsTrigger>
              <TabsTrigger value="learn">Learn</TabsTrigger>
              <TabsTrigger value="compete">Compete</TabsTrigger>
            </TabsList>
            
            <TabsContent value="play" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="overflow-hidden border-2 hover:border-primary/50 transition-all hover:shadow-lg">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="flex items-center gap-2">
                        <div className="p-2 rounded-full bg-primary/10">
                          <Bot className="h-5 w-5 text-primary" />
                        </div>
                        Play vs Computer
                      </CardTitle>
                      <Badge variant="outline">AI</Badge>
                    </div>
                    <CardDescription>Challenge our AI at different difficulty levels</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Clock className="h-4 w-4" />
                      <span>5-30 min games</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Brain className="h-4 w-4" />
                      <span>Easy, Medium, Hard difficulties</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      onClick={() => handleGameSelection('/play/ai')}
                    >
                      Play Now
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="overflow-hidden border-2 hover:border-primary/50 transition-all hover:shadow-lg">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="flex items-center gap-2">
                        <div className="p-2 rounded-full bg-primary/10">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        Local Multiplayer
                      </CardTitle>
                      <Badge variant="outline">2 Players</Badge>
                    </div>
                    <CardDescription>Play against a friend on the same device</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Clock className="h-4 w-4" />
                      <span>Custom time controls</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Zap className="h-4 w-4" />
                      <span>Customizable player names</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      onClick={() => handleGameSelection('/play/local')}
                    >
                      Play Now
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="overflow-hidden border-2 hover:border-primary/50 transition-all hover:shadow-lg">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="flex items-center gap-2">
                        <div className="p-2 rounded-full bg-primary/10">
                          <Globe className="h-5 w-5 text-primary" />
                        </div>
                        Play Online
                      </CardTitle>
                      <Badge variant="outline">Global</Badge>
                    </div>
                    <CardDescription>Challenge players from around the world</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Clock className="h-4 w-4" />
                      <span>Bullet, Blitz, Rapid games</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Zap className="h-4 w-4" />
                      <span>Quick matchmaking</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      onClick={() => handleGameSelection('/play/online')}
                    >
                      Play Now
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="overflow-hidden border-2 hover:border-primary/50 transition-all hover:shadow-lg">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="flex items-center gap-2">
                        <div className="p-2 rounded-full bg-primary/10">
                          <BookOpen className="h-5 w-5 text-primary" />
                        </div>
                        Practice Mode
                      </CardTitle>
                      <Badge variant="outline">Learn</Badge>
                    </div>
                    <CardDescription>Study openings, endgames, and tactics</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Brain className="h-4 w-4" />
                      <span>Tactical puzzles</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Zap className="h-4 w-4" />
                      <span>Opening repertoire</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      onClick={() => handleGameSelection('/play/practice')}
                    >
                      Start Practice
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="learn" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="overflow-hidden border-2 hover:border-primary/50 transition-all hover:shadow-lg">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="flex items-center gap-2">
                        <div className="p-2 rounded-full bg-primary/10">
                          <BookOpen className="h-5 w-5 text-primary" />
                        </div>
                        Chess Lessons
                      </CardTitle>
                      <Badge variant="outline">Beginner</Badge>
                    </div>
                    <CardDescription>Learn chess fundamentals step by step</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Brain className="h-4 w-4" />
                      <span>Interactive tutorials</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Zap className="h-4 w-4" />
                      <span>Progress tracking</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      variant="outline"
                      onClick={() => handleGameSelection('/play/practice')}
                    >
                      Start Learning
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="overflow-hidden border-2 hover:border-primary/50 transition-all hover:shadow-lg">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="flex items-center gap-2">
                        <div className="p-2 rounded-full bg-primary/10">
                          <Sparkles className="h-5 w-5 text-primary" />
                        </div>
                        Puzzle Rush
                      </CardTitle>
                      <Badge variant="outline">All Levels</Badge>
                    </div>
                    <CardDescription>Solve as many puzzles as you can in 5 minutes</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Clock className="h-4 w-4" />
                      <span>Timed challenges</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Zap className="h-4 w-4" />
                      <span>Adaptive difficulty</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      variant="outline"
                      onClick={() => handleGameSelection('/play/practice')}
                    >
                      Start Puzzles
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="compete" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="overflow-hidden border-2 hover:border-primary/50 transition-all hover:shadow-lg">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="flex items-center gap-2">
                        <div className="p-2 rounded-full bg-primary/10">
                          <Trophy className="h-5 w-5 text-primary" />
                        </div>
                        Tournaments
                      </CardTitle>
                      <Badge variant="outline">Coming Soon</Badge>
                    </div>
                    <CardDescription>Compete in scheduled tournaments with prizes</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Clock className="h-4 w-4" />
                      <span>Daily & weekly events</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Zap className="h-4 w-4" />
                      <span>Leaderboards & rankings</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      variant="outline"
                      disabled
                    >
                      Coming Soon
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="overflow-hidden border-2 hover:border-primary/50 transition-all hover:shadow-lg">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="flex items-center gap-2">
                        <div className="p-2 rounded-full bg-primary/10">
                          <Sparkles className="h-5 w-5 text-primary" />
                        </div>
                        Ranked Matches
                      </CardTitle>
                      <Badge variant="outline">Coming Soon</Badge>
                    </div>
                    <CardDescription>Climb the leaderboard with competitive play</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Clock className="h-4 w-4" />
                      <span>Seasonal rankings</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Zap className="h-4 w-4" />
                      <span>Skill-based matchmaking</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      variant="outline"
                      disabled
                    >
                      Coming Soon
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default GamePlanSelection;
