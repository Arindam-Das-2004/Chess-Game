import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Download, Save, Share2, Play, Pause, SkipBack, SkipForward, Clock } from "lucide-react";

interface GameRecorderProps {
  moveHistory: string[];
  gameMetadata?: {
    whitePlayer: string;
    blackPlayer: string;
    date: string;
    result?: string;
    event?: string;
  };
  onExport?: (pgnString: string) => void;
}

const GameRecorder: React.FC<GameRecorderProps> = ({
  moveHistory,
  gameMetadata = {
    whitePlayer: "Player",
    blackPlayer: "Opponent",
    date: new Date().toISOString().split('T')[0],
  },
  onExport
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [savedGames, setSavedGames] = useState<any[]>([]);
  const [currentReplayMove, setCurrentReplayMove] = useState(0);
  const [isReplaying, setIsReplaying] = useState(false);
  const [replaySpeed, setReplaySpeed] = useState(1000); // ms between moves

  useEffect(() => {
    // Load saved games from localStorage
    const loadSavedGames = () => {
      const games = localStorage.getItem('chess-saved-games');
      if (games) {
        try {
          setSavedGames(JSON.parse(games));
        } catch (error) {
          console.error('Failed to parse saved games:', error);
        }
      }
    };

    loadSavedGames();
  }, []);

  // Format moves for display (pair white and black moves)
  const formattedMoves = [];
  for (let i = 0; i < moveHistory.length; i += 2) {
    const moveNumber = Math.floor(i / 2) + 1;
    const whiteMove = moveHistory[i];
    const blackMove = moveHistory[i + 1] || '';
    
    formattedMoves.push({
      moveNumber,
      white: whiteMove,
      black: blackMove
    });
  }

  // Generate PGN (Portable Game Notation) string
  const generatePGN = () => {
    let pgn = '';
    
    // Add metadata
    pgn += `[Event "${gameMetadata.event || 'Casual Game'}"]\\n`;
    pgn += `[Date "${gameMetadata.date}"]\\n`;
    pgn += `[White "${gameMetadata.whitePlayer}"]\\n`;
    pgn += `[Black "${gameMetadata.blackPlayer}"]\\n`;
    pgn += `[Result "${gameMetadata.result || '*'}"]\\n\\n`;
    
    // Add moves
    let moveText = '';
    for (let i = 0; i < formattedMoves.length; i++) {
      const { moveNumber, white, black } = formattedMoves[i];
      moveText += `${moveNumber}. ${white} ${black} `;
      
      // Add newline every 5 move pairs for readability
      if ((i + 1) % 5 === 0) {
        moveText += '\\n';
      }
    }
    
    // Add result
    moveText += ` ${gameMetadata.result || '*'}`;
    
    pgn += moveText;
    return pgn;
  };

  const handleSaveGame = () => {
    const gameToSave = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      metadata: gameMetadata,
      moves: moveHistory,
      pgn: generatePGN()
    };
    
    const updatedGames = [...savedGames, gameToSave];
    localStorage.setItem('chess-saved-games', JSON.stringify(updatedGames));
    setSavedGames(updatedGames);
    
    toast.success('Game saved successfully!');
  };

  const handleExportPGN = () => {
    const pgn = generatePGN();
    
    if (onExport) {
      onExport(pgn);
    } else {
      // Create a blob and download it
      const blob = new Blob([pgn], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `chess-game-${new Date().toISOString().split('T')[0]}.pgn`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success('PGN file downloaded');
    }
  };

  const handleShareGame = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Chess Game',
        text: `Check out my chess game: ${gameMetadata.whitePlayer} vs ${gameMetadata.blackPlayer}`,
        url: window.location.href
      })
      .then(() => toast.success('Game shared successfully'))
      .catch((error) => toast.error(`Error sharing: ${error}`));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href)
        .then(() => toast.success('Game URL copied to clipboard'))
        .catch(() => toast.error('Failed to copy URL'));
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    toast.info(isRecording ? 'Recording paused' : 'Recording started');
  };

  const handleReplayControl = (action: 'play' | 'pause' | 'back' | 'forward' | 'reset') => {
    switch (action) {
      case 'play':
        setIsReplaying(true);
        break;
      case 'pause':
        setIsReplaying(false);
        break;
      case 'back':
        setCurrentReplayMove(Math.max(0, currentReplayMove - 1));
        break;
      case 'forward':
        setCurrentReplayMove(Math.min(moveHistory.length - 1, currentReplayMove + 1));
        break;
      case 'reset':
        setCurrentReplayMove(0);
        setIsReplaying(false);
        break;
    }
  };

  // Auto-advance replay when playing
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isReplaying && currentReplayMove < moveHistory.length - 1) {
      timer = setTimeout(() => {
        setCurrentReplayMove(prev => prev + 1);
      }, replaySpeed);
    } else if (isReplaying && currentReplayMove >= moveHistory.length - 1) {
      setIsReplaying(false);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isReplaying, currentReplayMove, moveHistory.length, replaySpeed]);

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Game Recorder</CardTitle>
          <Badge variant={isRecording ? "default" : "outline"} className="ml-2">
            {isRecording ? "Recording" : "Ready"}
          </Badge>
        </div>
        <CardDescription>
          Record, save and analyze your games
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm">
            <span className="font-medium">{gameMetadata.whitePlayer}</span>
            <span className="mx-2 text-muted-foreground">vs</span>
            <span className="font-medium">{gameMetadata.blackPlayer}</span>
          </div>
          <div className="text-xs text-muted-foreground flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {gameMetadata.date}
          </div>
        </div>
        
        <Separator />
        
        <div className="h-48 overflow-y-auto bg-muted/30 rounded-md p-2 text-sm">
          {formattedMoves.length > 0 ? (
            <div className="space-y-1">
              {formattedMoves.map((move, index) => (
                <div 
                  key={move.moveNumber} 
                  className={`flex justify-between ${
                    index === Math.floor(currentReplayMove / 2) ? 'bg-primary/10 rounded px-1' : ''
                  }`}
                >
                  <div className="flex gap-2">
                    <span className="text-muted-foreground">{move.moveNumber}.</span>
                    <span>{move.white}</span>
                  </div>
                  <span>{move.black}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              No moves recorded yet
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex space-x-1">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => handleReplayControl('back')}
              disabled={currentReplayMove === 0}
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            
            {isReplaying ? (
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => handleReplayControl('pause')}
              >
                <Pause className="h-4 w-4" />
              </Button>
            ) : (
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => handleReplayControl('play')}
                disabled={moveHistory.length === 0 || currentReplayMove >= moveHistory.length - 1}
              >
                <Play className="h-4 w-4" />
              </Button>
            )}
            
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => handleReplayControl('forward')}
              disabled={currentReplayMove >= moveHistory.length - 1}
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="text-xs text-muted-foreground">
            {currentReplayMove + 1}/{Math.max(1, moveHistory.length)} moves
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between pt-0">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={toggleRecording}
        >
          {isRecording ? (
            <>
              <Pause className="mr-2 h-4 w-4" />
              Pause
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" />
              Record
            </>
          )}
        </Button>
        
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleSaveGame}
            disabled={moveHistory.length === 0}
          >
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleExportPGN}
            disabled={moveHistory.length === 0}
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleShareGame}
            disabled={moveHistory.length === 0}
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default GameRecorder;
