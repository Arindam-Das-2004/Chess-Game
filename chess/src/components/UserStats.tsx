
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrophyIcon } from "lucide-react";

const UserStats: React.FC = () => {
  // Mock user data
  const userData = {
    username: "ChessMaster2000",
    level: 8,
    xp: 750,
    xpToNextLevel: 1000,
    wins: 42,
    losses: 15,
    draws: 7,
    rating: 1250,
    gems: 24,
    coins: 1850
  };

  const calculateWinRate = () => {
    const totalGames = userData.wins + userData.losses + userData.draws;
    return totalGames === 0 ? 0 : Math.round((userData.wins / totalGames) * 100);
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <span>{userData.username}</span>
          <TrophyIcon className="h-4 w-4 text-secondary" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Level {userData.level}</span>
              <span className="text-xs text-muted-foreground">
                {userData.xp}/{userData.xpToNextLevel} XP
              </span>
            </div>
            <Progress value={(userData.xp / userData.xpToNextLevel) * 100} className="h-2" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-muted p-2 text-center">
              <div className="text-2xl font-bold">{userData.rating}</div>
              <div className="text-xs text-muted-foreground">Rating</div>
            </div>
            <div className="rounded-lg bg-muted p-2 text-center">
              <div className="text-2xl font-bold">{calculateWinRate()}%</div>
              <div className="text-xs text-muted-foreground">Win Rate</div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="font-bold">{userData.wins}</div>
              <div className="text-xs text-muted-foreground">Wins</div>
            </div>
            <div>
              <div className="font-bold">{userData.losses}</div>
              <div className="text-xs text-muted-foreground">Losses</div>
            </div>
            <div>
              <div className="font-bold">{userData.draws}</div>
              <div className="text-xs text-muted-foreground">Draws</div>
            </div>
          </div>
          
          <div className="flex gap-4 pt-2">
            <div className="flex items-center gap-1">
              <div className="h-4 w-4 rounded-full bg-secondary animate-pulse-gold"></div>
              <span className="text-sm font-medium">{userData.coins}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-accent">💎</span>
              <span className="text-sm font-medium">{userData.gems}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserStats;
