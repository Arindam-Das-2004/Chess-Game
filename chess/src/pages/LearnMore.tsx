import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";
import {
  ArrowLeft, Monitor, Smartphone, Gamepad2,
  Settings, Users, Bot, Palette, RotateCw,
  MousePointer, Keyboard, HelpCircle, Info,
  ChevronRight, CheckCircle2, XCircle, AlertCircle,
  Globe
} from "lucide-react";

const LearnMore = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-grow pt-16 pb-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <section className="py-6 mb-8">
            <div className="flex items-center gap-2 mb-6">
              <Button variant="ghost" size="icon" asChild>
                <Link to="/learn">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
              <h1 className="text-2xl md:text-3xl font-bold">Learn More About Chess Master</h1>
            </div>
            <p className="text-muted-foreground max-w-3xl">
              Discover how to get the most out of Chess Master with our comprehensive guide to the app's features, interface, and functionality.
            </p>
          </section>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardHeader className="pb-3">
                  <CardTitle>Guide Contents</CardTitle>
                  <CardDescription>Navigate through the sections</CardDescription>
                </CardHeader>
                <CardContent className="space-y-1 p-3">
                  {[
                    { title: "Getting Started", icon: <Info size={16} /> },
                    { title: "User Interface", icon: <Monitor size={16} /> },
                    { title: "Game Modes", icon: <Gamepad2 size={16} /> },
                    { title: "Customization", icon: <Palette size={16} /> },
                    { title: "Mobile Features", icon: <Smartphone size={16} /> },
                    { title: "Multiplayer", icon: <Users size={16} /> },
                    { title: "AI Opponents", icon: <Bot size={16} /> },
                    { title: "Settings", icon: <Settings size={16} /> },
                    { title: "FAQ", icon: <HelpCircle size={16} /> }
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-2 rounded-md hover:bg-muted cursor-pointer transition-colors"
                      onClick={() => document.getElementById(item.title.toLowerCase().replace(/\s+/g, '-'))?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      <span className="text-primary">{item.icon}</span>
                      <span className="text-sm font-medium">{item.title}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-10">
              {/* Getting Started */}
              <section id="getting-started" className="space-y-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Info className="h-6 w-6 text-primary" />
                  Getting Started
                </h2>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <p>
                      Welcome to Chess Master! This guide will help you navigate the app and make the most of its features.
                      Chess Master is designed for players of all skill levels, from beginners learning the basics to advanced
                      players looking for challenging opponents.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <Card className="border border-border/50">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">For New Players</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                            <p>Start with the "Learn" section to understand the rules and basic strategies</p>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                            <p>Practice against the AI on the easiest setting to build confidence</p>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                            <p>Use the "Hint" feature during games to understand good moves</p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border border-border/50">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">For Experienced Players</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                            <p>Challenge the AI at higher difficulty levels for a stronger opponent</p>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                            <p>Join tournaments to compete against other players</p>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                            <p>Analyze your games to identify strengths and weaknesses</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* User Interface */}
              <section id="user-interface" className="space-y-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Monitor className="h-6 w-6 text-primary" />
                  User Interface
                </h2>
                <Card>
                  <CardContent className="p-6 space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Main Dashboard</h3>
                      <p className="mb-4">The main dashboard is your starting point, providing quick access to all features:</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <span className="bg-primary/10 text-primary font-medium rounded-full h-5 w-5 flex items-center justify-center text-xs">1</span>
                            <div>
                              <p className="font-medium">Navigation Bar</p>
                              <p className="text-sm text-muted-foreground">Access all sections of the app</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="bg-primary/10 text-primary font-medium rounded-full h-5 w-5 flex items-center justify-center text-xs">2</span>
                            <div>
                              <p className="font-medium">Game Modes</p>
                              <p className="text-sm text-muted-foreground">Choose how you want to play</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="bg-primary/10 text-primary font-medium rounded-full h-5 w-5 flex items-center justify-center text-xs">3</span>
                            <div>
                              <p className="font-medium">Stats & Progress</p>
                              <p className="text-sm text-muted-foreground">Track your performance</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-muted rounded-lg h-40 flex items-center justify-center">
                          <p className="text-muted-foreground">Dashboard Preview</p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-2">Game Interface</h3>
                      <p className="mb-4">During a game, you'll see the following elements:</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <span className="bg-primary/10 text-primary font-medium rounded-full h-5 w-5 flex items-center justify-center text-xs">1</span>
                            <div>
                              <p className="font-medium">Chess Board</p>
                              <p className="text-sm text-muted-foreground">The main playing area</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="bg-primary/10 text-primary font-medium rounded-full h-5 w-5 flex items-center justify-center text-xs">2</span>
                            <div>
                              <p className="font-medium">Move History</p>
                              <p className="text-sm text-muted-foreground">Record of all moves played</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="bg-primary/10 text-primary font-medium rounded-full h-5 w-5 flex items-center justify-center text-xs">3</span>
                            <div>
                              <p className="font-medium">Game Controls</p>
                              <p className="text-sm text-muted-foreground">Options like undo, hint, and resign</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="bg-primary/10 text-primary font-medium rounded-full h-5 w-5 flex items-center justify-center text-xs">4</span>
                            <div>
                              <p className="font-medium">Player Information</p>
                              <p className="text-sm text-muted-foreground">Names, ratings, and time remaining</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-muted rounded-lg h-60 flex items-center justify-center">
                          <p className="text-muted-foreground">Game Interface Preview</p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-2">Controls & Interactions</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium flex items-center gap-2 mb-2">
                            <MousePointer className="h-4 w-4 text-primary" />
                            Mouse Controls
                          </h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                              <span className="text-primary font-medium">Click & Drag:</span>
                              <span className="text-muted-foreground">Move pieces on the board</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-primary font-medium">Click:</span>
                              <span className="text-muted-foreground">Select a piece, then click destination</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-primary font-medium">Right-Click:</span>
                              <span className="text-muted-foreground">Open context menu for additional options</span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium flex items-center gap-2 mb-2">
                            <Keyboard className="h-4 w-4 text-primary" />
                            Keyboard Shortcuts
                          </h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                              <span className="text-primary font-medium">Ctrl+Z:</span>
                              <span className="text-muted-foreground">Undo last move</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-primary font-medium">Spacebar:</span>
                              <span className="text-muted-foreground">Pause/resume game</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-primary font-medium">H:</span>
                              <span className="text-muted-foreground">Request a hint</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Game Modes */}
              <section id="game-modes" className="space-y-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Gamepad2 className="h-6 w-6 text-primary" />
                  Game Modes
                </h2>
                <Card>
                  <CardContent className="p-6">
                    <p className="mb-4">Chess Master offers several ways to play, catering to different preferences and skill levels:</p>

                    <div className="space-y-6">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="md:w-1/4 flex justify-center">
                          <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                            <Bot className="h-10 w-10 text-primary" />
                          </div>
                        </div>
                        <div className="md:w-3/4">
                          <h3 className="text-lg font-medium mb-1">Play vs AI</h3>
                          <p className="text-muted-foreground mb-2">Challenge the computer at various difficulty levels</p>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">Easy</Badge>
                              <span className="text-sm text-muted-foreground">- Perfect for beginners</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">Medium</Badge>
                              <span className="text-sm text-muted-foreground">- For intermediate players</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">Hard</Badge>
                              <span className="text-sm text-muted-foreground">- Challenging for advanced players</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="md:w-1/4 flex justify-center">
                          <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                            <Users className="h-10 w-10 text-primary" />
                          </div>
                        </div>
                        <div className="md:w-3/4">
                          <h3 className="text-lg font-medium mb-1">Local Multiplayer</h3>
                          <p className="text-muted-foreground mb-2">Play against a friend on the same device</p>
                          <ul className="space-y-1 text-sm">
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                              <span>Take turns making moves on the same board</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                              <span>Optional timer settings for timed games</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                              <span>Save and resume games later</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <Separator />

                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="md:w-1/4 flex justify-center">
                          <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                            <Globe className="h-10 w-10 text-primary" />
                          </div>
                        </div>
                        <div className="md:w-3/4">
                          <h3 className="text-lg font-medium mb-1">Online Multiplayer</h3>
                          <p className="text-muted-foreground mb-2">Play against opponents from around the world</p>
                          <ul className="space-y-1 text-sm">
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                              <span>Matchmaking based on skill level</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                              <span>Ranked games that affect your rating</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                              <span>Chat with opponents during games</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Customization */}
              <section id="customization" className="space-y-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Palette className="h-6 w-6 text-primary" />
                  Customization
                </h2>
                <Card>
                  <CardContent className="p-6">
                    <p className="mb-4">Personalize your Chess Master experience with these customization options:</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h3 className="text-lg font-medium">Board Themes</h3>
                        <p className="text-sm text-muted-foreground">Choose from various board designs:</p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline">Classic</Badge>
                          <Badge variant="outline">Wood</Badge>
                          <Badge variant="outline">Marble</Badge>
                          <Badge variant="outline">Modern</Badge>
                          <Badge variant="outline">Tournament</Badge>
                        </div>
                        <div className="h-24 bg-muted rounded-md flex items-center justify-center">
                          <p className="text-sm text-muted-foreground">Board Preview</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h3 className="text-lg font-medium">Piece Sets</h3>
                        <p className="text-sm text-muted-foreground">Select your preferred chess pieces:</p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline">Standard</Badge>
                          <Badge variant="outline">Classic</Badge>
                          <Badge variant="outline">Minimalist</Badge>
                          <Badge variant="outline">Fantasy</Badge>
                          <Badge variant="outline">3D</Badge>
                        </div>
                        <div className="h-24 bg-muted rounded-md flex items-center justify-center">
                          <p className="text-sm text-muted-foreground">Pieces Preview</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h3 className="text-lg font-medium">Board Rotation</h3>
                        <p className="text-sm text-muted-foreground">Adjust the board orientation:</p>
                        <div className="flex items-center gap-4">
                          <Button variant="outline" size="sm" className="gap-2">
                            <RotateCw className="h-4 w-4" />
                            Rotate Board
                          </Button>
                          <span className="text-sm text-muted-foreground">Current: White at bottom</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h3 className="text-lg font-medium">Theme Settings</h3>
                        <p className="text-sm text-muted-foreground">Choose your preferred app theme:</p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Light</Button>
                          <Button variant="outline" size="sm">Dark</Button>
                          <Button variant="outline" size="sm">System</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* FAQ Section */}
              <section id="faq" className="space-y-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <HelpCircle className="h-6 w-6 text-primary" />
                  Frequently Asked Questions
                </h2>
                <Card>
                  <CardContent className="p-6">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>How do I create an account?</AccordionTrigger>
                        <AccordionContent>
                          <p className="text-muted-foreground">
                            To create an account, click on the "Sign Up" button in the top right corner of the app.
                            Fill in your email address, create a password, and complete the registration form.
                            You'll receive a verification email to activate your account.
                          </p>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="item-2">
                        <AccordionTrigger>Can I play offline?</AccordionTrigger>
                        <AccordionContent>
                          <p className="text-muted-foreground">
                            Yes! Chess Master offers offline play options. You can play against the AI or use the
                            local multiplayer mode to play with a friend on the same device without an internet connection.
                          </p>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="item-3">
                        <AccordionTrigger>How is my rating calculated?</AccordionTrigger>
                        <AccordionContent>
                          <p className="text-muted-foreground">
                            Your rating is calculated using an Elo-based system. When you win a game, your rating increases,
                            and when you lose, it decreases. The amount of change depends on the rating difference between
                            you and your opponent. Beating higher-rated players earns you more points.
                          </p>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="item-4">
                        <AccordionTrigger>Can I analyze my games?</AccordionTrigger>
                        <AccordionContent>
                          <p className="text-muted-foreground">
                            Yes, Chess Master includes a powerful analysis tool. After completing a game, click on the
                            "Analyze" button to review your moves, see alternative options, and identify mistakes.
                            You can also save analyses to review later.
                          </p>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="item-5">
                        <AccordionTrigger>How do I report a bug or suggest a feature?</AccordionTrigger>
                        <AccordionContent>
                          <p className="text-muted-foreground">
                            We welcome your feedback! To report a bug or suggest a feature, go to Settings &gt; Help &amp; Support &gt;
                            Feedback. Provide as much detail as possible about the issue or your suggestion, and our team
                            will review it.
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </section>

              {/* Support Section */}
              <section className="space-y-4">
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      <div className="md:w-1/4 flex justify-center">
                        <HelpCircle className="h-16 w-16 text-primary" />
                      </div>
                      <div className="md:w-3/4 text-center md:text-left">
                        <h3 className="text-xl font-bold mb-2">Need More Help?</h3>
                        <p className="text-muted-foreground mb-4">
                          If you couldn't find the information you were looking for, our support team is here to help.
                        </p>
                        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                          <Button>Contact Support</Button>
                          <Button variant="outline">Visit Help Center</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LearnMore;
