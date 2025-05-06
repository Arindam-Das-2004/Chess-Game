import React, { useState } from 'react';
import FeaturePageTemplate from '@/components/FeaturePageTemplate';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lightbulb, ChevronRight, Star, Trophy, Clock } from 'lucide-react';
import ChessBoard from '@/components/ChessBoard';
import { motion } from 'framer-motion';

const MoveSuggestions = () => {
  const [activeTab, setActiveTab] = useState('beginner');
  const [showSuggestion, setShowSuggestion] = useState(false);

  // Sample suggestion data
  const suggestions = {
    beginner: {
      move: 'e4',
      explanation: 'Opening with e4 controls the center and opens lines for your bishop and queen.',
      followUp: 'If your opponent responds with e5, consider Nf3 to develop your knight and attack the e5 pawn.'
    },
    intermediate: {
      move: 'Nf3',
      explanation: 'The knight develops to a good square, controls the center, and prepares for kingside castling.',
      followUp: 'Follow up with g3 and Bg2 for a solid fianchetto setup.'
    },
    advanced: {
      move: 'c4',
      explanation: 'The English Opening gives you flexibility and avoids immediate theoretical battles.',
      followUp: 'You can transpose into various openings depending on your opponent\'s response.'
    }
  };

  const currentSuggestion = suggestions[activeTab as keyof typeof suggestions];

  return (
    <FeaturePageTemplate
      title="Move Suggestions"
      description="Get intelligent hints when you're stuck"
      icon={<Lightbulb className="h-5 w-5 text-primary" />}
      bgGradient="from-yellow-500/5 via-background to-background"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="shadow-md border-border/60 overflow-hidden">
            <CardHeader className="bg-primary/5 border-b border-border/60">
              <CardTitle>Interactive Board</CardTitle>
              <CardDescription>
                Explore suggested moves on this interactive board
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 flex justify-center">
              <ChessBoard
                theme="blue"
                size="large"
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="shadow-md border-border/60">
            <CardHeader className="bg-primary/5 border-b border-border/60">
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-primary" />
                Suggested Moves
              </CardTitle>
              <CardDescription>
                Select your skill level to see appropriate suggestions
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <Tabs defaultValue="beginner" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="beginner">Beginner</TabsTrigger>
                  <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>

                <TabsContent value="beginner" className="mt-0">
                  <div className="bg-muted/30 p-4 rounded-md">
                    <p className="text-sm text-muted-foreground mb-4">
                      Simple, straightforward suggestions focused on basic principles.
                    </p>
                    {showSuggestion ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-3"
                      >
                        <div className="bg-primary/10 p-3 rounded-md">
                          <div className="font-bold mb-1 flex items-center">
                            <ChevronRight className="h-4 w-4 mr-1 text-primary" />
                            Suggested Move: {currentSuggestion.move}
                          </div>
                          <p className="text-sm">{currentSuggestion.explanation}</p>
                        </div>
                        <div className="bg-secondary/10 p-3 rounded-md">
                          <div className="font-bold mb-1 flex items-center">
                            <Star className="h-4 w-4 mr-1 text-secondary" />
                            Follow-up Strategy
                          </div>
                          <p className="text-sm">{currentSuggestion.followUp}</p>
                        </div>
                      </motion.div>
                    ) : (
                      <Button 
                        onClick={() => setShowSuggestion(true)}
                        className="w-full"
                      >
                        <Lightbulb className="mr-2 h-4 w-4" />
                        Get Suggestion
                      </Button>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="intermediate" className="mt-0">
                  <div className="bg-muted/30 p-4 rounded-md">
                    <p className="text-sm text-muted-foreground mb-4">
                      Tactical suggestions with positional considerations.
                    </p>
                    {showSuggestion ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-3"
                      >
                        <div className="bg-primary/10 p-3 rounded-md">
                          <div className="font-bold mb-1 flex items-center">
                            <ChevronRight className="h-4 w-4 mr-1 text-primary" />
                            Suggested Move: {currentSuggestion.move}
                          </div>
                          <p className="text-sm">{currentSuggestion.explanation}</p>
                        </div>
                        <div className="bg-secondary/10 p-3 rounded-md">
                          <div className="font-bold mb-1 flex items-center">
                            <Star className="h-4 w-4 mr-1 text-secondary" />
                            Follow-up Strategy
                          </div>
                          <p className="text-sm">{currentSuggestion.followUp}</p>
                        </div>
                      </motion.div>
                    ) : (
                      <Button 
                        onClick={() => setShowSuggestion(true)}
                        className="w-full"
                      >
                        <Lightbulb className="mr-2 h-4 w-4" />
                        Get Suggestion
                      </Button>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="advanced" className="mt-0">
                  <div className="bg-muted/30 p-4 rounded-md">
                    <p className="text-sm text-muted-foreground mb-4">
                      Advanced strategic suggestions with deep positional analysis.
                    </p>
                    {showSuggestion ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-3"
                      >
                        <div className="bg-primary/10 p-3 rounded-md">
                          <div className="font-bold mb-1 flex items-center">
                            <ChevronRight className="h-4 w-4 mr-1 text-primary" />
                            Suggested Move: {currentSuggestion.move}
                          </div>
                          <p className="text-sm">{currentSuggestion.explanation}</p>
                        </div>
                        <div className="bg-secondary/10 p-3 rounded-md">
                          <div className="font-bold mb-1 flex items-center">
                            <Star className="h-4 w-4 mr-1 text-secondary" />
                            Follow-up Strategy
                          </div>
                          <p className="text-sm">{currentSuggestion.followUp}</p>
                        </div>
                      </motion.div>
                    ) : (
                      <Button 
                        onClick={() => setShowSuggestion(true)}
                        className="w-full"
                      >
                        <Lightbulb className="mr-2 h-4 w-4" />
                        Get Suggestion
                      </Button>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="bg-muted/20 border-t border-border/60 p-3">
              <div className="flex justify-between items-center w-full text-xs text-muted-foreground">
                <div className="flex items-center">
                  <Trophy className="h-3 w-3 mr-1" />
                  <span>Premium feature</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>3 hints remaining today</span>
                </div>
              </div>
            </CardFooter>
          </Card>

          <Card className="shadow-md border-border/60">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">How It Works</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>
                Our move suggestion system analyzes the current board position and provides intelligent recommendations based on:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Opening theory and principles</li>
                <li>Tactical opportunities</li>
                <li>Positional considerations</li>
                <li>Your skill level and playing style</li>
              </ul>
              <p className="text-muted-foreground italic mt-2">
                Use suggestions to learn and improve, not just to win!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </FeaturePageTemplate>
  );
};

export default MoveSuggestions;
