import React, { useState } from 'react';
import FeaturePageTemplate from '@/components/FeaturePageTemplate';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, BarChart, PieChart, TrendingUp, Medal, Calendar, Clock, Users, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const SkillRating = () => {
  const [activeTab, setActiveTab] = useState('rating');

  // Sample rating data
  const ratingData = {
    current: 1250,
    peak: 1320,
    startingRating: 1000,
    gamesPlayed: 42,
    winRate: 64,
    history: [
      { date: 'Apr 1', rating: 1000 },
      { date: 'Apr 5', rating: 1050 },
      { date: 'Apr 10', rating: 1120 },
      { date: 'Apr 15', rating: 1180 },
      { date: 'Apr 20', rating: 1150 },
      { date: 'Apr 25', rating: 1220 },
      { date: 'Apr 30', rating: 1280 },
      { date: 'May 5', rating: 1320 },
      { date: 'May 10', rating: 1290 },
      { date: 'May 15', rating: 1250 },
    ]
  };

  // Sample performance data
  const performanceData = {
    openings: {
      best: "Ruy Lopez",
      bestWinRate: 78,
      worst: "Sicilian Defense",
      worstWinRate: 42
    },
    timeControl: {
      bullet: { rating: 1180, gamesPlayed: 15 },
      blitz: { rating: 1250, gamesPlayed: 20 },
      rapid: { rating: 1320, gamesPlayed: 7 }
    },
    strengths: ["Opening preparation", "Endgame technique", "Pawn structure"],
    weaknesses: ["Tactical awareness", "Time management"]
  };

  // Sample ranking data
  const rankingData = {
    globalRank: 15420,
    percentile: 68,
    localRank: 342,
    tier: "Intermediate",
    nextTier: "Advanced",
    pointsToNextTier: 150
  };

  // Rating tiers
  const ratingTiers = [
    { name: "Beginner", min: 0, max: 1000, color: "bg-gray-500" },
    { name: "Intermediate", min: 1000, max: 1400, color: "bg-green-500" },
    { name: "Advanced", min: 1400, max: 1800, color: "bg-blue-500" },
    { name: "Expert", min: 1800, max: 2200, color: "bg-purple-500" },
    { name: "Master", min: 2200, max: 2500, color: "bg-yellow-500" },
    { name: "Grandmaster", min: 2500, max: 3000, color: "bg-red-500" }
  ];

  // Find current tier
  const currentTier = ratingTiers.find(tier => 
    ratingData.current >= tier.min && ratingData.current < tier.max
  );

  // Calculate progress in current tier
  const tierProgress = currentTier 
    ? Math.round(((ratingData.current - currentTier.min) / (currentTier.max - currentTier.min)) * 100)
    : 0;

  return (
    <FeaturePageTemplate
      title="Skill Rating"
      description="Track your progress with our ELO-based rating system"
      icon={<TrendingUp className="h-5 w-5 text-primary" />}
      bgGradient="from-blue-500/5 via-background to-background"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-md border-border/60 overflow-hidden">
            <CardHeader className="bg-primary/5 border-b border-border/60">
              <div className="flex justify-between items-center">
                <CardTitle>Rating Overview</CardTitle>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Current Rating:</span>
                  <span className="text-lg font-bold text-primary">{ratingData.current}</span>
                </div>
              </div>
              <CardDescription>
                Your rating history and progression
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {/* Rating Chart (Simplified representation) */}
              <div className="h-64 bg-muted/20 rounded-md p-4 mb-6 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-muted-foreground">Rating chart visualization would appear here</p>
                </div>
                
                {/* Sample chart line */}
                <div className="absolute bottom-4 left-4 right-4 h-32">
                  <div className="relative h-full">
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-border"></div>
                    <div className="absolute bottom-1/2 left-0 right-0 h-px bg-border opacity-50"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-primary/10 rounded-md"></div>
                    
                    <svg className="absolute bottom-0 left-0 right-0 h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                      <path 
                        d="M0,100 L10,90 L20,80 L30,70 L40,75 L50,60 L60,50 L70,40 L80,30 L90,35 L100,40" 
                        fill="none" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth="2"
                      />
                    </svg>
                    
                    {/* Data points */}
                    {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((pos, i) => (
                      <div 
                        key={i}
                        className="absolute bottom-0 w-2 h-2 bg-primary rounded-full transform -translate-x-1"
                        style={{ 
                          left: `${pos}%`, 
                          bottom: `${[100, 90, 80, 70, 75, 60, 50, 40, 30, 35, 40][i] / 2}%` 
                        }}
                      />
                    ))}
                  </div>
                </div>
                
                {/* X-axis labels */}
                <div className="absolute bottom-0 left-4 right-4 flex justify-between">
                  {ratingData.history.filter((_, i) => i % 3 === 0).map((point, i) => (
                    <div key={i} className="text-xs text-muted-foreground">{point.date}</div>
                  ))}
                </div>
              </div>
              
              {/* Rating Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-muted/20 p-3 rounded-md">
                  <div className="text-xs text-muted-foreground mb-1">Current Rating</div>
                  <div className="text-2xl font-bold text-primary">{ratingData.current}</div>
                </div>
                <div className="bg-muted/20 p-3 rounded-md">
                  <div className="text-xs text-muted-foreground mb-1">Peak Rating</div>
                  <div className="text-2xl font-bold text-primary">{ratingData.peak}</div>
                </div>
                <div className="bg-muted/20 p-3 rounded-md">
                  <div className="text-xs text-muted-foreground mb-1">Games Played</div>
                  <div className="text-2xl font-bold text-primary">{ratingData.gamesPlayed}</div>
                </div>
                <div className="bg-muted/20 p-3 rounded-md">
                  <div className="text-xs text-muted-foreground mb-1">Win Rate</div>
                  <div className="text-2xl font-bold text-primary">{ratingData.winRate}%</div>
                </div>
              </div>
              
              {/* Tier Progress */}
              <div className="mt-6 p-4 bg-muted/20 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <Medal className="h-5 w-5 text-primary" />
                    <h3 className="font-bold">Current Tier: <span className="text-primary">{currentTier?.name}</span></h3>
                  </div>
                  <div className="text-sm">{tierProgress}% to {ratingTiers[ratingTiers.indexOf(currentTier!) + 1]?.name}</div>
                </div>
                
                <div className="h-4 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${currentTier?.color}`}
                    style={{ width: `${tierProgress}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <div>{currentTier?.min}</div>
                  <div>{currentTier?.max}</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md border-border/60">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Performance Insights</CardTitle>
              <CardDescription>Analysis of your playing strengths and weaknesses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/20 p-3 rounded-md">
                  <h3 className="font-medium mb-2">Opening Performance</h3>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Best: {performanceData.openings.best}</span>
                        <span className="text-green-500">{performanceData.openings.bestWinRate}% win rate</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Worst: {performanceData.openings.worst}</span>
                        <span className="text-red-500">{performanceData.openings.worstWinRate}% win rate</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-muted/20 p-3 rounded-md">
                  <h3 className="font-medium mb-2">Time Control Ratings</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Bullet (≤ 3 min)</span>
                      <span>{performanceData.timeControl.bullet.rating}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Blitz (3-10 min)</span>
                      <span>{performanceData.timeControl.blitz.rating}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Rapid (10+ min)</span>
                      <span>{performanceData.timeControl.rapid.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/20 p-3 rounded-md">
                  <h3 className="font-medium mb-2">Strengths</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    {performanceData.strengths.map((strength, index) => (
                      <li key={index}>{strength}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-muted/20 p-3 rounded-md">
                  <h3 className="font-medium mb-2">Areas for Improvement</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    {performanceData.weaknesses.map((weakness, index) => (
                      <li key={index}>{weakness}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="shadow-md border-border/60">
            <CardHeader className="bg-primary/5 border-b border-border/60">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                Rating Analytics
              </CardTitle>
              <CardDescription>
                Detailed statistics and rankings
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <Tabs defaultValue="rating" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="rating">Rating</TabsTrigger>
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                  <TabsTrigger value="ranking">Ranking</TabsTrigger>
                </TabsList>

                <TabsContent value="rating" className="mt-0 space-y-3">
                  <div className="bg-muted/20 p-3 rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <LineChart className="h-4 w-4 text-primary" />
                      <h3 className="font-medium">Rating Progression</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Starting Rating</span>
                        <span>{ratingData.startingRating}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Current Rating</span>
                        <span className="font-medium">{ratingData.current}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rating Change</span>
                        <span className="text-green-500">+{ratingData.current - ratingData.startingRating}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Peak Rating</span>
                        <span>{ratingData.peak}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/20 p-3 rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <h3 className="font-medium">Recent Activity</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Last Game</span>
                        <span>Today, 2:30 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Last Rating Change</span>
                        <span className="text-red-500">-15</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Games This Week</span>
                        <span>12</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="performance" className="mt-0 space-y-3">
                  <div className="bg-muted/20 p-3 rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart className="h-4 w-4 text-primary" />
                      <h3 className="font-medium">Game Statistics</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Total Games</span>
                        <span>{ratingData.gamesPlayed}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Win Rate</span>
                        <span className="text-green-500">{ratingData.winRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Average Game Length</span>
                        <span>32 moves</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/20 p-3 rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <h3 className="font-medium">Time Control Performance</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Bullet (≤ 3 min)</span>
                        <span>{performanceData.timeControl.bullet.rating}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Blitz (3-10 min)</span>
                        <span>{performanceData.timeControl.blitz.rating}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rapid (10+ min)</span>
                        <span>{performanceData.timeControl.rapid.rating}</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="ranking" className="mt-0 space-y-3">
                  <div className="bg-muted/20 p-3 rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4 text-primary" />
                      <h3 className="font-medium">Global Ranking</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Global Rank</span>
                        <span>#{rankingData.globalRank}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Percentile</span>
                        <span>Top {100 - rankingData.percentile}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Local Rank</span>
                        <span>#{rankingData.localRank}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/20 p-3 rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <Medal className="h-4 w-4 text-primary" />
                      <h3 className="font-medium">Tier Information</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Current Tier</span>
                        <span>{rankingData.tier}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Next Tier</span>
                        <span>{rankingData.nextTier}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Points to Next Tier</span>
                        <span>{rankingData.pointsToNextTier}</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="bg-muted/20 border-t border-border/60 p-3">
              <Button variant="outline" size="sm" className="w-full text-xs">
                <Info className="h-3 w-3 mr-1" />
                How Ratings Work
              </Button>
            </CardFooter>
          </Card>

          <Card className="shadow-md border-border/60">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Rating Tiers</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-3">
              {ratingTiers.map((tier, index) => (
                <div 
                  key={index} 
                  className={`p-2 rounded-md flex justify-between items-center ${
                    currentTier?.name === tier.name 
                      ? 'bg-primary/10 border border-primary/30' 
                      : 'bg-muted/20'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${tier.color}`}></div>
                    <span className="font-medium">{tier.name}</span>
                  </div>
                  <span>{tier.min} - {tier.max}</span>
                </div>
              ))}
              
              <p className="text-muted-foreground italic mt-2">
                Ratings are based on the Elo rating system used in competitive chess.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </FeaturePageTemplate>
  );
};

export default SkillRating;
