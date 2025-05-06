import React, { useState } from 'react';
import FeaturePageTemplate from '@/components/FeaturePageTemplate';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, CheckCircle, Clock, Gift, Coins, Award, RefreshCw, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { Progress } from "@/components/ui/progress";

const DailyMissions = () => {
  const [activeTab, setActiveTab] = useState('daily');

  // Current time for countdown
  const now = new Date();
  const hoursUntilReset = 23 - now.getHours();
  const minutesUntilReset = 59 - now.getMinutes();

  // Sample daily missions
  const dailyMissions = [
    { 
      id: 1, 
      title: "Win a Game", 
      description: "Win a game against any opponent", 
      reward: 50,
      rewardType: "coins",
      progress: 1,
      target: 1,
      completed: true
    },
    { 
      id: 2, 
      title: "Play 3 Games", 
      description: "Play 3 games in any mode", 
      reward: 75,
      rewardType: "coins",
      progress: 2,
      target: 3,
      completed: false
    },
    { 
      id: 3, 
      title: "Checkmate with a Knight", 
      description: "Deliver checkmate using a knight", 
      reward: 100,
      rewardType: "coins",
      progress: 0,
      target: 1,
      completed: false
    },
    { 
      id: 4, 
      title: "Capture 10 Pieces", 
      description: "Capture a total of 10 pieces across all games", 
      reward: 60,
      rewardType: "coins",
      progress: 7,
      target: 10,
      completed: false
    }
  ];

  // Sample weekly missions
  const weeklyMissions = [
    { 
      id: 101, 
      title: "Win 5 Games", 
      description: "Win 5 games against any opponent", 
      reward: 200,
      rewardType: "coins",
      progress: 3,
      target: 5,
      completed: false
    },
    { 
      id: 102, 
      title: "Play 10 Games", 
      description: "Play 10 games in any mode", 
      reward: 150,
      rewardType: "coins",
      progress: 5,
      target: 10,
      completed: false
    },
    { 
      id: 103, 
      title: "Win with 3 Different Openings", 
      description: "Win games using 3 different opening strategies", 
      reward: 250,
      rewardType: "coins",
      progress: 1,
      target: 3,
      completed: false
    },
    { 
      id: 104, 
      title: "Special Weekly Challenge", 
      description: "Win a game without losing any pawns", 
      reward: "Medieval Knight",
      rewardType: "badge",
      progress: 0,
      target: 1,
      completed: false
    }
  ];

  // Sample achievements
  const achievements = [
    { 
      id: 201, 
      title: "First Victory", 
      description: "Win your first game", 
      reward: 100,
      rewardType: "coins",
      completed: true,
      date: "Apr 28, 2023"
    },
    { 
      id: 202, 
      title: "Tactical Genius", 
      description: "Win a game with a discovered check", 
      reward: 150,
      rewardType: "coins",
      completed: true,
      date: "May 2, 2023"
    },
    { 
      id: 203, 
      title: "Opening Master", 
      description: "Win 10 games with the same opening", 
      reward: "Opening Expert",
      rewardType: "title",
      completed: false,
      progress: 6,
      target: 10
    },
    { 
      id: 204, 
      title: "Endgame Specialist", 
      description: "Win 5 games in the endgame with only king and pawn", 
      reward: "Endgame Badge",
      rewardType: "badge",
      completed: false,
      progress: 2,
      target: 5
    }
  ];

  // Calculate completion percentages
  const dailyCompletionRate = Math.round(
    (dailyMissions.filter(mission => mission.completed).length / dailyMissions.length) * 100
  );
  
  const weeklyCompletionRate = Math.round(
    (weeklyMissions.filter(mission => mission.completed).length / weeklyMissions.length) * 100
  );

  // Calculate total rewards
  const totalDailyRewards = dailyMissions
    .filter(mission => mission.completed)
    .reduce((sum, mission) => mission.rewardType === "coins" ? sum + mission.reward : sum, 0);
  
  const totalWeeklyRewards = weeklyMissions
    .filter(mission => mission.completed)
    .reduce((sum, mission) => mission.rewardType === "coins" ? sum + mission.reward : sum, 0);

  // Calculate potential rewards
  const potentialDailyRewards = dailyMissions
    .reduce((sum, mission) => mission.rewardType === "coins" ? sum + mission.reward : sum, 0);
  
  const potentialWeeklyRewards = weeklyMissions
    .reduce((sum, mission) => mission.rewardType === "coins" ? sum + mission.reward : sum, 0);

  return (
    <FeaturePageTemplate
      title="Daily Missions"
      description="Complete challenges to earn rewards"
      icon={<CalendarDays className="h-5 w-5 text-primary" />}
      bgGradient="from-green-500/5 via-background to-background"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-md border-border/60 overflow-hidden">
            <CardHeader className="bg-primary/5 border-b border-border/60">
              <div className="flex justify-between items-center">
                <CardTitle>Mission Board</CardTitle>
                <div className="flex items-center gap-1 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Resets in {hoursUntilReset}h {minutesUntilReset}m</span>
                </div>
              </div>
              <CardDescription>
                Complete missions to earn coins and special rewards
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Tabs defaultValue="daily" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="daily">Daily</TabsTrigger>
                  <TabsTrigger value="weekly">Weekly</TabsTrigger>
                  <TabsTrigger value="achievements">Achievements</TabsTrigger>
                </TabsList>

                <TabsContent value="daily" className="mt-0 space-y-4">
                  {dailyMissions.map((mission) => (
                    <motion.div
                      key={mission.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`
                        bg-muted/20 rounded-lg border border-border/60 overflow-hidden
                        ${mission.completed ? 'bg-primary/5' : ''}
                      `}
                    >
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-bold flex items-center gap-2">
                              {mission.title}
                              {mission.completed && (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              )}
                            </h3>
                            <p className="text-sm text-muted-foreground">{mission.description}</p>
                          </div>
                          <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full text-sm">
                            <Coins className="h-3 w-3 text-primary" />
                            <span>{mission.reward}</span>
                          </div>
                        </div>
                        
                        <div className="mt-3">
                          <div className="flex justify-between items-center text-xs text-muted-foreground mb-1">
                            <span>Progress</span>
                            <span>{mission.progress} / {mission.target}</span>
                          </div>
                          <Progress 
                            value={(mission.progress / mission.target) * 100} 
                            className={`h-2 ${mission.completed ? 'bg-green-500/20' : ''}`}
                          />
                        </div>
                        
                        {mission.completed ? (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full mt-3 bg-green-500/10 text-green-600 border-green-500/20"
                            disabled
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Completed
                          </Button>
                        ) : (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full mt-3"
                            onClick={() => {}}
                          >
                            Play Now
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </TabsContent>

                <TabsContent value="weekly" className="mt-0 space-y-4">
                  {weeklyMissions.map((mission) => (
                    <motion.div
                      key={mission.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`
                        bg-muted/20 rounded-lg border border-border/60 overflow-hidden
                        ${mission.completed ? 'bg-primary/5' : ''}
                      `}
                    >
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-bold flex items-center gap-2">
                              {mission.title}
                              {mission.completed && (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              )}
                            </h3>
                            <p className="text-sm text-muted-foreground">{mission.description}</p>
                          </div>
                          <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full text-sm">
                            {mission.rewardType === "coins" ? (
                              <>
                                <Coins className="h-3 w-3 text-primary" />
                                <span>{mission.reward}</span>
                              </>
                            ) : (
                              <>
                                <Award className="h-3 w-3 text-primary" />
                                <span>{mission.reward}</span>
                              </>
                            )}
                          </div>
                        </div>
                        
                        <div className="mt-3">
                          <div className="flex justify-between items-center text-xs text-muted-foreground mb-1">
                            <span>Progress</span>
                            <span>{mission.progress} / {mission.target}</span>
                          </div>
                          <Progress 
                            value={(mission.progress / mission.target) * 100} 
                            className={`h-2 ${mission.completed ? 'bg-green-500/20' : ''}`}
                          />
                        </div>
                        
                        {mission.completed ? (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full mt-3 bg-green-500/10 text-green-600 border-green-500/20"
                            disabled
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Completed
                          </Button>
                        ) : (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full mt-3"
                            onClick={() => {}}
                          >
                            Play Now
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </TabsContent>

                <TabsContent value="achievements" className="mt-0 space-y-4">
                  {achievements.map((achievement) => (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`
                        bg-muted/20 rounded-lg border border-border/60 overflow-hidden
                        ${achievement.completed ? 'bg-primary/5' : ''}
                      `}
                    >
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-bold flex items-center gap-2">
                              {achievement.title}
                              {achievement.completed && (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              )}
                            </h3>
                            <p className="text-sm text-muted-foreground">{achievement.description}</p>
                          </div>
                          <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full text-sm">
                            {achievement.rewardType === "coins" ? (
                              <>
                                <Coins className="h-3 w-3 text-primary" />
                                <span>{achievement.reward}</span>
                              </>
                            ) : (
                              <>
                                <Award className="h-3 w-3 text-primary" />
                                <span>{achievement.reward}</span>
                              </>
                            )}
                          </div>
                        </div>
                        
                        {achievement.completed ? (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-3">
                            <Calendar className="h-3 w-3" />
                            <span>Completed on {achievement.date}</span>
                          </div>
                        ) : (
                          <div className="mt-3">
                            <div className="flex justify-between items-center text-xs text-muted-foreground mb-1">
                              <span>Progress</span>
                              <span>{achievement.progress} / {achievement.target}</span>
                            </div>
                            <Progress 
                              value={(achievement.progress / achievement.target) * 100} 
                              className="h-2"
                            />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card className="shadow-md border-border/60">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Reward History</CardTitle>
              <CardDescription>Recent rewards you've earned from missions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-muted/20 p-3 rounded-md">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Coins className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">50 Coins</h3>
                      <p className="text-xs text-muted-foreground">Win a Game</p>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">Today</div>
                </div>
              </div>
              
              <div className="bg-muted/20 p-3 rounded-md">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Award className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Tactical Genius Badge</h3>
                      <p className="text-xs text-muted-foreground">Win with a discovered check</p>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">Yesterday</div>
                </div>
              </div>
              
              <div className="bg-muted/20 p-3 rounded-md">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Coins className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">150 Coins</h3>
                      <p className="text-xs text-muted-foreground">Weekly mission: Play 10 Games</p>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">3 days ago</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="shadow-md border-border/60">
            <CardHeader className="bg-primary/5 border-b border-border/60">
              <CardTitle className="flex items-center gap-2">
                <Gift className="h-4 w-4 text-primary" />
                Rewards Summary
              </CardTitle>
              <CardDescription>
                Track your mission progress and rewards
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="bg-muted/20 p-3 rounded-md">
                <h3 className="font-medium mb-2">Daily Missions</h3>
                <div className="flex justify-between items-center text-sm mb-1">
                  <span>Completion</span>
                  <span>{dailyCompletionRate}%</span>
                </div>
                <Progress value={dailyCompletionRate} className="h-2 mb-3" />
                
                <div className="flex justify-between items-center text-sm">
                  <span>Earned Rewards</span>
                  <div className="flex items-center gap-1">
                    <Coins className="h-3 w-3 text-primary" />
                    <span>{totalDailyRewards} / {potentialDailyRewards}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/20 p-3 rounded-md">
                <h3 className="font-medium mb-2">Weekly Missions</h3>
                <div className="flex justify-between items-center text-sm mb-1">
                  <span>Completion</span>
                  <span>{weeklyCompletionRate}%</span>
                </div>
                <Progress value={weeklyCompletionRate} className="h-2 mb-3" />
                
                <div className="flex justify-between items-center text-sm">
                  <span>Earned Rewards</span>
                  <div className="flex items-center gap-1">
                    <Coins className="h-3 w-3 text-primary" />
                    <span>{totalWeeklyRewards} / {potentialWeeklyRewards}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/20 p-3 rounded-md">
                <h3 className="font-medium mb-2">Total Balance</h3>
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Coins className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-2xl font-bold">1,250</div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Use coins to unlock new themes, pieces, and special features
                </p>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/20 border-t border-border/60 p-3">
              <Button variant="outline" size="sm" className="w-full text-xs">
                <RefreshCw className="h-3 w-3 mr-1" />
                Refresh Missions
              </Button>
            </CardFooter>
          </Card>

          <Card className="shadow-md border-border/60">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Mission Tips</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>
                Complete missions efficiently with these tips:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Daily missions reset at midnight local time</li>
                <li>Weekly missions reset every Monday</li>
                <li>Focus on missions with the highest coin rewards first</li>
                <li>Special badges and titles can be displayed on your profile</li>
                <li>Some achievements unlock special game features</li>
              </ul>
              <p className="text-muted-foreground italic mt-2">
                Check back daily for new missions and rewards!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </FeaturePageTemplate>
  );
};

export default DailyMissions;
