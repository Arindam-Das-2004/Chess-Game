import React, { useState } from 'react';
import FeaturePageTemplate from '@/components/FeaturePageTemplate';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Palette, Check, Lock, Coins, Star } from 'lucide-react';
import ChessBoard from '@/components/ChessBoard';
import { motion } from 'framer-motion';

const CustomBoards = () => {
  const [activeTab, setActiveTab] = useState('themes');
  const [selectedTheme, setSelectedTheme] = useState('classic');
  const [selectedPieceSet, setSelectedPieceSet] = useState('standard');

  // Sample board themes
  const boardThemes = [
    { id: 'classic', name: 'Classic', description: 'Traditional brown and cream board', unlocked: true },
    { id: 'blue', name: 'Ocean Blue', description: 'Calming blue tones', unlocked: true },
    { id: 'green', name: 'Forest Green', description: 'Relaxing green shades', unlocked: true },
    { id: 'red', name: 'Ruby Red', description: 'Bold red and white pattern', unlocked: false },
    { id: 'purple', name: 'Royal Purple', description: 'Elegant purple design', unlocked: false },
    { id: 'wood', name: 'Natural Wood', description: 'Realistic wooden texture', unlocked: false },
  ];

  // Sample piece sets
  const pieceSets = [
    { id: 'standard', name: 'Standard', description: 'Classic chess pieces', unlocked: true },
    { id: 'modern', name: 'Modern', description: 'Sleek, minimalist design', unlocked: true },
    { id: 'medieval', name: 'Medieval', description: 'Historical piece designs', unlocked: false },
    { id: 'abstract', name: 'Abstract', description: 'Artistic interpretation', unlocked: false },
    { id: 'pixel', name: 'Pixel Art', description: 'Retro 8-bit style', unlocked: false },
  ];

  return (
    <FeaturePageTemplate
      title="Custom Boards"
      description="Personalize your chess experience with beautiful themes"
      icon={<Palette className="h-5 w-5 text-primary" />}
      bgGradient="from-purple-500/5 via-background to-background"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="shadow-md border-border/60 overflow-hidden">
            <CardHeader className="bg-primary/5 border-b border-border/60">
              <CardTitle>Board Preview</CardTitle>
              <CardDescription>
                See how your selected theme and pieces look together
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 flex justify-center bg-gradient-to-br from-muted/30 to-background">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10 rounded-xl blur-xl opacity-50"></div>
                <div className="relative">
                  <ChessBoard
                    theme={selectedTheme as 'classic' | 'blue' | 'green'}
                    size="large"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/20 border-t border-border/60 p-4 flex justify-between">
              <div className="text-sm">
                <span className="font-medium">Current Theme:</span> {boardThemes.find(t => t.id === selectedTheme)?.name}
              </div>
              <div className="text-sm">
                <span className="font-medium">Piece Set:</span> {pieceSets.find(p => p.id === selectedPieceSet)?.name}
              </div>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="shadow-md border-border/60">
            <CardHeader className="bg-primary/5 border-b border-border/60">
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-4 w-4 text-primary" />
                Customization
              </CardTitle>
              <CardDescription>
                Select your preferred board style and pieces
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <Tabs defaultValue="themes" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-2 mb-4">
                  <TabsTrigger value="themes">Board Themes</TabsTrigger>
                  <TabsTrigger value="pieces">Piece Sets</TabsTrigger>
                </TabsList>

                <TabsContent value="themes" className="mt-0 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    {boardThemes.map(theme => (
                      <motion.div
                        key={theme.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        whileHover={{ scale: theme.unlocked ? 1.03 : 1 }}
                        className={`
                          relative rounded-md overflow-hidden border
                          ${theme.unlocked ? 'cursor-pointer' : 'opacity-70'}
                          ${selectedTheme === theme.id ? 'border-primary' : 'border-border'}
                        `}
                        onClick={() => theme.unlocked && setSelectedTheme(theme.id)}
                      >
                        <div className="h-20 bg-gradient-to-br from-muted to-background"></div>
                        <div className="p-2">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium text-sm">{theme.name}</h3>
                            {selectedTheme === theme.id && (
                              <Check className="h-4 w-4 text-primary" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">{theme.description}</p>
                        </div>
                        
                        {!theme.unlocked && (
                          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center">
                            <div className="bg-background/90 px-2 py-1 rounded-md flex items-center gap-1">
                              <Lock className="h-3 w-3" />
                              <span className="text-xs">Locked</span>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="pieces" className="mt-0 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    {pieceSets.map(pieceSet => (
                      <motion.div
                        key={pieceSet.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        whileHover={{ scale: pieceSet.unlocked ? 1.03 : 1 }}
                        className={`
                          relative rounded-md overflow-hidden border
                          ${pieceSet.unlocked ? 'cursor-pointer' : 'opacity-70'}
                          ${selectedPieceSet === pieceSet.id ? 'border-primary' : 'border-border'}
                        `}
                        onClick={() => pieceSet.unlocked && setSelectedPieceSet(pieceSet.id)}
                      >
                        <div className="h-20 bg-gradient-to-br from-muted to-background"></div>
                        <div className="p-2">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium text-sm">{pieceSet.name}</h3>
                            {selectedPieceSet === pieceSet.id && (
                              <Check className="h-4 w-4 text-primary" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">{pieceSet.description}</p>
                        </div>
                        
                        {!pieceSet.unlocked && (
                          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center">
                            <div className="bg-background/90 px-2 py-1 rounded-md flex items-center gap-1">
                              <Lock className="h-3 w-3" />
                              <span className="text-xs">Locked</span>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="bg-muted/20 border-t border-border/60 p-3">
              <div className="flex justify-between items-center w-full text-xs text-muted-foreground">
                <div className="flex items-center">
                  <Coins className="h-3 w-3 mr-1" />
                  <span>1,250 coins available</span>
                </div>
                <Button variant="outline" size="sm" className="text-xs">
                  <Star className="h-3 w-3 mr-1" />
                  Unlock More
                </Button>
              </div>
            </CardFooter>
          </Card>

          <Card className="shadow-md border-border/60">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">How to Unlock</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>
                Unlock additional board themes and piece sets by:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Winning games against AI or other players</li>
                <li>Completing daily challenges</li>
                <li>Solving chess puzzles</li>
                <li>Reaching new rating milestones</li>
              </ul>
              <p className="text-muted-foreground italic mt-2">
                Each victory earns you coins to spend on customizations!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </FeaturePageTemplate>
  );
};

export default CustomBoards;
