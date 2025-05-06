import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";
import { ArrowLeft, Settings, Trophy, Clock, Calendar, ChevronRight, BarChart3, Award, Target, Zap } from "lucide-react";

type User = {
  name: string;
  email: string;
  isLoggedIn: boolean;
  avatar?: string;
};

type GameHistory = {
  id: string;
  date: string;
  opponent: string;
  result: "win" | "loss" | "draw";
  mode: "ai" | "online" | "tournament";
  moves: number;
  time: string;
};

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState({
    rating: 1250,
    wins: 28,
    losses: 12,
    draws: 5,
    totalGames: 45,
    winRate: 62,
    achievements: 8,
    level: 4,
    xp: 75,
    nextLevelXp: 100,
    rank: "Intermediate",
    bestRating: 1320,
    tournamentWins: 1,
    streak: 3
  });
  
  const [gameHistory, setGameHistory] = useState<GameHistory[]>([
    {
      id: "game1",
      date: "2023-06-15",
      opponent: "AI (Medium)",
      result: "win",
      mode: "ai",
      moves: 32,
      time: "10:25"
    },
    {
      id: "game2",
      date: "2023-06-14",
      opponent: "ChessMaster99",
      result: "loss",
      mode: "online",
      moves: 41,
      time: "15:10"
    },
    {
      id: "game3",
      date: "2023-06-12",
      opponent: "AI (Hard)",
      result: "win",
      mode: "ai",
      moves: 28,
      time: "08:45"
    },
    {
      id: "game4",
      date: "2023-06-10",
      opponent: "KnightRider",
      result: "win",
      mode: "online",
      moves: 35,
      time: "12:30"
    },
    {
      id: "game5",
      date: "2023-06-08",
      opponent: "PawnStar",
      result: "draw",
      mode: "tournament",
      moves: 50,
      time: "20:15"
    },
    {
      id: "game6",
      date: "2023-06-05",
      opponent: "AI (Easy)",
      result: "win",
      mode: "ai",
      moves: 22,
      time: "05:30"
    },
    {
      id: "game7",
      date: "2023-06-03",
      opponent: "QueenGambit",
      result: "loss",
      mode: "online",
      moves: 38,
      time: "14:20"
    }
  ]);
  
  const [achievements, setAchievements] = useState([
    {
      id: "ach1",
      name: "First Victory",
      description: "Win your first game",
      icon: <Trophy className="h-5 w-5 text-yellow-500" />,
      completed: true,
      date: "2023-05-20"
    },
    {
      id: "ach2",
      name: "Quick Thinker",
      description: "Win a game in under 20 moves",
      icon: <Zap className="h-5 w-5 text-blue-500" />,
      completed: true,
      date: "2023-05-25"
    },
    {
      id: "ach3",
      name: "Strategist",
      description: "Win 5 games in a row",
      icon: <Target className="h-5 w-5 text-green-500" />,
      completed: false,
      progress: 3,
      total: 5
    },
    {
      id: "ach4",
      name: "Tournament Champion",
      description: "Win a tournament",
      icon: <Award className="h-5 w-5 text-purple-500" />,
      completed: true,
      date: "2023-06-01"
    },
    {
      id: "ach5",
      name: "Chess Master",
      description: "Reach a rating of 1500",
      icon: <BarChart3 className="h-5 w-5 text-red-500" />,
      completed: false,
      progress: 1250,
      total: 1500
    }
  ]);

  useEffect(() => {
    // Load user data from localStorage
    const storedUser = localStorage.getItem("chess-user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    }
  }, []);

  if (!user?.isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Profile</h1>
            <Card>
              <CardContent className="py-10">
                <p className="mb-4">You need to be logged in to view your profile.</p>
                <Button asChild>
                  <Link to="/login">Login</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20 px-4 pb-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" asChild>
                <Link to="/">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
              <h1 className="text-2xl font-bold">My Profile</h1>
            </div>
            <Button variant="outline" size="icon" asChild>
              <Link to="/settings">
                <Settings className="h-5 w-5" />
              </Link>
            </Button>
          </div>
          
          {/* Profile Header */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <Avatar className="w-24 h-24 border-4 border-primary/20">
                  <AvatarImage src={user.avatar || ""} alt={user.name} />
                  <AvatarFallback className="text-3xl bg-primary/10">{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                    <h2 className="text-2xl font-bold">{user.name}</h2>
                    <Badge variant="outline" className="self-center sm:self-auto">
                      {stats.rank}
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{user.email}</p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="flex flex-col items-center sm:items-start">
                      <span className="text-sm text-muted-foreground">Rating</span>
                      <span className="text-xl font-bold">{stats.rating}</span>
                    </div>
                    <div className="flex flex-col items-center sm:items-start">
                      <span className="text-sm text-muted-foreground">Win Rate</span>
                      <span className="text-xl font-bold">{stats.winRate}%</span>
                    </div>
                    <div className="flex flex-col items-center sm:items-start">
                      <span className="text-sm text-muted-foreground">Games</span>
                      <span className="text-xl font-bold">{stats.totalGames}</span>
                    </div>
                    <div className="flex flex-col items-center sm:items-start">
                      <span className="text-sm text-muted-foreground">Level</span>
                      <div className="flex items-center gap-1">
                        <span className="text-xl font-bold">{stats.level}</span>
                        <div className="flex flex-col w-16">
                          <span className="text-xs text-right text-muted-foreground">{stats.xp}/{stats.nextLevelXp}</span>
                          <Progress value={(stats.xp / stats.nextLevelXp) * 100} className="h-1.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Tabs defaultValue="stats" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="stats">Statistics</TabsTrigger>
              <TabsTrigger value="history">Game History</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>
            
            {/* Statistics Tab */}
            <TabsContent value="stats">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-primary" />
                      Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Current Rating</span>
                        <span className="font-bold">{stats.rating}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Best Rating</span>
                        <span className="font-bold">{stats.bestRating}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Current Streak</span>
                        <span className="font-bold">{stats.streak} wins</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Tournament Wins</span>
                        <span className="font-bold">{stats.tournamentWins}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-primary" />
                      Game Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Wins</span>
                          <span className="font-bold text-green-500">{stats.wins}</span>
                        </div>
                        <Progress value={(stats.wins / stats.totalGames) * 100} className="h-2 bg-muted" indicatorClassName="bg-green-500" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Losses</span>
                          <span className="font-bold text-red-500">{stats.losses}</span>
                        </div>
                        <Progress value={(stats.losses / stats.totalGames) * 100} className="h-2 bg-muted" indicatorClassName="bg-red-500" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Draws</span>
                          <span className="font-bold text-blue-500">{stats.draws}</span>
                        </div>
                        <Progress value={(stats.draws / stats.totalGames) * 100} className="h-2 bg-muted" indicatorClassName="bg-blue-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {gameHistory.slice(0, 3).map((game) => (
                        <div key={game.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-8 rounded-full ${
                              game.result === 'win' ? 'bg-green-500' : 
                              game.result === 'loss' ? 'bg-red-500' : 'bg-blue-500'
                            }`}></div>
                            <div>
                              <div className="font-medium">{game.opponent}</div>
                              <div className="text-sm text-muted-foreground flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(game.date).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium capitalize">{game.result}</div>
                            <div className="text-sm text-muted-foreground">{game.moves} moves</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm" className="ml-auto" asChild>
                      <Link to="#history">
                        View all games
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            {/* Game History Tab */}
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Game History</CardTitle>
                  <CardDescription>
                    Your recent games and results
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {gameHistory.map((game, index) => (
                      <div key={game.id}>
                        <div className="flex items-center py-3">
                          <div className={`w-2 h-8 rounded-full mr-3 ${
                            game.result === 'win' ? 'bg-green-500' : 
                            game.result === 'loss' ? 'bg-red-500' : 'bg-blue-500'
                          }`}></div>
                          
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <div className="font-medium">{game.opponent}</div>
                              <div className={`font-medium ${
                                game.result === 'win' ? 'text-green-500' : 
                                game.result === 'loss' ? 'text-red-500' : 'text-blue-500'
                              }`}>
                                {game.result.charAt(0).toUpperCase() + game.result.slice(1)}
                              </div>
                            </div>
                            
                            <div className="flex justify-between text-sm text-muted-foreground">
                              <div className="flex items-center gap-3">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {new Date(game.date).toLocaleDateString()}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {game.time}
                                </span>
                              </div>
                              <div>
                                {game.moves} moves
                              </div>
                            </div>
                          </div>
                          
                          <Button variant="ghost" size="sm" className="ml-2">
                            Review
                          </Button>
                        </div>
                        {index < gameHistory.length - 1 && <Separator />}
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Load More Games</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Achievements Tab */}
            <TabsContent value="achievements">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-primary" />
                    Achievements
                  </CardTitle>
                  <CardDescription>
                    You've unlocked {achievements.filter(a => a.completed).length} out of {achievements.length} achievements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {achievements.map((achievement, index) => (
                      <div key={achievement.id}>
                        <div className="flex items-center py-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                            achievement.completed ? 'bg-primary/10' : 'bg-muted'
                          }`}>
                            {achievement.icon}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <div className="font-medium">{achievement.name}</div>
                              {achievement.completed ? (
                                <Badge variant="outline" className="text-green-500 border-green-500">
                                  Completed
                                </Badge>
                              ) : (
                                <Badge variant="outline">
                                  In Progress
                                </Badge>
                              )}
                            </div>
                            
                            <div className="text-sm text-muted-foreground mb-1">
                              {achievement.description}
                            </div>
                            
                            {achievement.completed ? (
                              <div className="text-xs text-muted-foreground">
                                Completed on {new Date(achievement.date).toLocaleDateString()}
                              </div>
                            ) : (
                              <div className="w-full">
                                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                                  <span>Progress</span>
                                  <span>{achievement.progress} / {achievement.total}</span>
                                </div>
                                <Progress 
                                  value={(achievement.progress / achievement.total) * 100} 
                                  className="h-1.5" 
                                />
                              </div>
                            )}
                          </div>
                        </div>
                        {index < achievements.length - 1 && <Separator />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Profile;
