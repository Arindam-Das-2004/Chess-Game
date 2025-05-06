import React, { useState } from 'react';
import FeaturePageTemplate from '@/components/FeaturePageTemplate';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Medal, Star, Calendar, Lock, Share2, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { Progress } from "@/components/ui/progress";

const TrophyRoom = () => {
  const [activeTab, setActiveTab] = useState('achievements');

  // Sample achievements data
  const achievements = [
    { 
      id: 1, 
      name: "First Victory", 
      description: "Win your first game against the AI", 
      icon: "🏆", 
      unlocked: true, 
      date: "Apr 28, 2023",
      rarity: "Common"
    },
    { 
      id: 2, 
      name: "Quick Thinker", 
      description: "Win a game in under 15 moves", 
      icon: "⚡", 
      unlocked: true, 
      date: "May 2, 2023",
      rarity: "Uncommon"
    },
    { 
      id: 3, 
      name: "Checkmate Master", 
      description: "Win 10 games with checkmate", 
      icon: "👑", 
      unlocked: true, 
      date: "May 10, 2023",
      rarity: "Uncommon"
    },
    { 
      id: 4, 
      name: "Strategist", 
      description: "Win a game without losing any pieces", 
      icon: "🧠", 
      unlocked: false, 
      progress: 0,
      rarity: "Rare"
    },
    { 
      id: 5, 
      name: "Grandmaster", 
      description: "Reach a rating of 2000", 
      icon: "🌟", 
      unlocked: false, 
      progress: 65,
      rarity: "Epic"
    },
    { 
      id: 6, 
      name: "Comeback King", 
      description: "Win a game after being down by 15 points", 
      icon: "🔄", 
      unlocked: false, 
      progress: 30,
      rarity: "Rare"
    },
  ];

  // Sample badges data
  const badges = [
    { 
      id: 1, 
      name: "Beginner", 
      description: "Complete the tutorial", 
      icon: "🔰", 
      unlocked: true,
      rarity: "Common"
    },
    { 
      id: 2, 
      name: "Scholar's Mate", 
      description: "Win using the Scholar's Mate", 
      icon: "📚", 
      unlocked: true,
      rarity: "Uncommon"
    },
    { 
      id: 3, 
      name: "Knight's Tour", 
      description: "Move a knight to every square in practice mode", 
      icon: "♞", 
      unlocked: false,
      rarity: "Rare"
    },
    { 
      id: 4, 
      name: "Puzzle Master", 
      description: "Solve 50 puzzles", 
      icon: "🧩", 
      unlocked: false,
      progress: 28,
      rarity: "Uncommon"
    },
  ];

  // Sample titles data
  const titles = [
    { 
      id: 1, 
      name: "Novice", 
      description: "Default title for new players", 
      unlocked: true,
      active: false,
      rarity: "Common"
    },
    { 
      id: 2, 
      name: "Tactician", 
      description: "Win 5 games using tactical combinations", 
      unlocked: true,
      active: true,
      rarity: "Uncommon"
    },
    { 
      id: 3, 
      name: "Defensive Genius", 
      description: "Successfully defend against 10 checkmate attempts", 
      unlocked: false,
      active: false,
      rarity: "Rare"
    },
    { 
      id: 4, 
      name: "Legend", 
      description: "Reach the top 1% of players", 
      unlocked: false,
      active: false,
      rarity: "Legendary"
    },
  ];

  // Get the active title
  const activeTitle = titles.find(title => title.active);

  // Function to get rarity color
  const getRarityColor = (rarity: string) => {
    switch(rarity) {
      case 'Common': return 'bg-gray-500/10 text-gray-500';
      case 'Uncommon': return 'bg-green-500/10 text-green-500';
      case 'Rare': return 'bg-blue-500/10 text-blue-500';
      case 'Epic': return 'bg-purple-500/10 text-purple-500';
      case 'Legendary': return 'bg-yellow-500/10 text-yellow-500';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };

  return (
    <FeaturePageTemplate
      title="Trophy Room"
      description="Showcase your achievements and collectibles"
      icon={<Trophy className="h-5 w-5 text-primary" />}
      bgGradient="from-yellow-500/5 via-background to-background"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="shadow-md border-border/60 overflow-hidden">
            <CardHeader className="bg-primary/5 border-b border-border/60">
              <CardTitle>Your Showcase</CardTitle>
              <CardDescription>
                Display your most impressive achievements
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {achievements.filter(a => a.unlocked).slice(0, 3).map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gradient-to-br from-primary/5 to-background border border-border/60 rounded-lg p-4 flex flex-col items-center text-center"
                  >
                    <div className="text-4xl mb-2">{achievement.icon}</div>
                    <h3 className="font-bold mb-1">{achievement.name}</h3>
                    <p className="text-xs text-muted-foreground mb-2">{achievement.description}</p>
                    <div className={`text-xs px-2 py-0.5 rounded-full mt-auto ${getRarityColor(achievement.rarity)}`}>
                      {achievement.rarity}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-muted/20 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Medal className="h-5 w-5 text-primary" />
                    <h3 className="font-bold">Active Title</h3>
                  </div>
                  <Button variant="outline" size="sm">Change Title</Button>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">{activeTitle?.name || 'None'}</h4>
                    <p className="text-xs text-muted-foreground">{activeTitle?.description || 'No title selected'}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md border-border/60 mt-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Achievement Statistics</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-muted/20 p-3 rounded-md text-center">
                <div className="text-2xl font-bold text-primary">{achievements.filter(a => a.unlocked).length}</div>
                <div className="text-xs text-muted-foreground">Achievements Unlocked</div>
              </div>
              <div className="bg-muted/20 p-3 rounded-md text-center">
                <div className="text-2xl font-bold text-primary">{badges.filter(b => b.unlocked).length}</div>
                <div className="text-xs text-muted-foreground">Badges Earned</div>
              </div>
              <div className="bg-muted/20 p-3 rounded-md text-center">
                <div className="text-2xl font-bold text-primary">{titles.filter(t => t.unlocked).length}</div>
                <div className="text-xs text-muted-foreground">Titles Unlocked</div>
              </div>
              <div className="bg-muted/20 p-3 rounded-md text-center">
                <div className="text-2xl font-bold text-primary">
                  {Math.round((achievements.filter(a => a.unlocked).length / achievements.length) * 100)}%
                </div>
                <div className="text-xs text-muted-foreground">Completion Rate</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="shadow-md border-border/60">
            <CardHeader className="bg-primary/5 border-b border-border/60">
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-primary" />
                Collections
              </CardTitle>
              <CardDescription>
                Browse your achievements, badges, and titles
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <Tabs defaultValue="achievements" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="achievements">Achievements</TabsTrigger>
                  <TabsTrigger value="badges">Badges</TabsTrigger>
                  <TabsTrigger value="titles">Titles</TabsTrigger>
                </TabsList>

                <TabsContent value="achievements" className="mt-0 space-y-3 max-h-[400px] overflow-y-auto pr-2">
                  {achievements.map(achievement => (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`
                        bg-muted/20 p-3 rounded-md
                        ${!achievement.unlocked && 'opacity-70'}
                      `}
                    >
                      <div className="flex gap-3">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium">{achievement.name}</h3>
                            <div className={`text-xs px-2 py-0.5 rounded-full ${getRarityColor(achievement.rarity)}`}>
                              {achievement.rarity}
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">{achievement.description}</p>
                          
                          {achievement.unlocked ? (
                            <div className="flex items-center mt-2 text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3 mr-1" />
                              <span>Unlocked: {achievement.date}</span>
                            </div>
                          ) : (
                            <div className="mt-2">
                              <div className="flex justify-between items-center text-xs text-muted-foreground mb-1">
                                <span>Progress</span>
                                <span>{achievement.progress || 0}%</span>
                              </div>
                              <Progress value={achievement.progress || 0} className="h-1" />
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </TabsContent>

                <TabsContent value="badges" className="mt-0 space-y-3 max-h-[400px] overflow-y-auto pr-2">
                  {badges.map(badge => (
                    <motion.div
                      key={badge.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`
                        bg-muted/20 p-3 rounded-md
                        ${!badge.unlocked && 'opacity-70'}
                      `}
                    >
                      <div className="flex gap-3">
                        <div className="text-2xl">{badge.icon}</div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium">{badge.name}</h3>
                            <div className={`text-xs px-2 py-0.5 rounded-full ${getRarityColor(badge.rarity)}`}>
                              {badge.rarity}
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">{badge.description}</p>
                          
                          {!badge.unlocked && badge.progress !== undefined && (
                            <div className="mt-2">
                              <div className="flex justify-between items-center text-xs text-muted-foreground mb-1">
                                <span>Progress</span>
                                <span>{badge.progress}%</span>
                              </div>
                              <Progress value={badge.progress} className="h-1" />
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </TabsContent>

                <TabsContent value="titles" className="mt-0 space-y-3 max-h-[400px] overflow-y-auto pr-2">
                  {titles.map(title => (
                    <motion.div
                      key={title.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`
                        bg-muted/20 p-3 rounded-md
                        ${!title.unlocked && 'opacity-70'}
                        ${title.active && 'border border-primary'}
                      `}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{title.name}</h3>
                          <p className="text-xs text-muted-foreground">{title.description}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <div className={`text-xs px-2 py-0.5 rounded-full ${getRarityColor(title.rarity)}`}>
                            {title.rarity}
                          </div>
                          {title.active && (
                            <div className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                              Active
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {title.unlocked && !title.active && (
                        <Button variant="outline" size="sm" className="mt-2 w-full text-xs">
                          Set as Active
                        </Button>
                      )}
                      
                      {!title.unlocked && (
                        <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                          <Lock className="h-3 w-3" />
                          <span>Complete the requirements to unlock</span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="bg-muted/20 border-t border-border/60 p-3 flex justify-between">
              <Button variant="outline" size="sm" className="text-xs">
                <Share2 className="h-3 w-3 mr-1" />
                Share Profile
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                <Info className="h-3 w-3 mr-1" />
                Achievement Guide
              </Button>
            </CardFooter>
          </Card>

          <Card className="shadow-md border-border/60">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Upcoming Achievements</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>
                You're close to unlocking these achievements:
              </p>
              <div className="space-y-2">
                {achievements
                  .filter(a => !a.unlocked && (a.progress || 0) > 0)
                  .sort((a, b) => (b.progress || 0) - (a.progress || 0))
                  .slice(0, 3)
                  .map(achievement => (
                    <div key={achievement.id} className="bg-muted/30 p-2 rounded-md">
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center gap-1">
                          <span className="text-base">{achievement.icon}</span>
                          <span className="font-medium text-sm">{achievement.name}</span>
                        </div>
                        <span className="text-xs">{achievement.progress}%</span>
                      </div>
                      <Progress value={achievement.progress} className="h-1" />
                    </div>
                  ))
                }
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </FeaturePageTemplate>
  );
};

export default TrophyRoom;
