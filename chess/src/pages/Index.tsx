
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import ChessBoard from "@/components/ChessBoard";
import GameModeCard from "@/components/GameModeCard";
import UserStats from "@/components/UserStats";
import Logo from "@/components/Logo";
import AnimatedBanner from "@/components/AnimatedBanner";
import AnimatedHeroBanner from "@/components/AnimatedHeroBanner";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { UserIcon, Users, Bot, Trophy, Book, ChevronDown, Sparkles, Globe } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [showGameOptions, setShowGameOptions] = useState(false);
  const [animatedText, setAnimatedText] = useState("");
  const fullText = "Smart Chess";

  // Text animation effect
  useEffect(() => {
    if (animatedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setAnimatedText(fullText.slice(0, animatedText.length + 1));
      }, 150);

      return () => clearTimeout(timeout);
    }
  }, [animatedText]);

  useEffect(() => {
    // Start the animation after component mounts
    setAnimatedText("");

    // Show game options if URL has a query parameter
    const params = new URLSearchParams(window.location.search);
    if (params.get('play') === 'true') {
      setShowGameOptions(true);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <AnimatedBanner />

      <main className="flex-grow">
        {/* Hero Section with Animated 3D Banner */}
        <AnimatedHeroBanner />

        {/* Call to Action Section */}
        <section className="py-16 px-4 relative">
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col items-center text-center">
              <motion.div
                className="mb-6 relative"
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Logo size="large" />
                <div className="absolute -top-2 -right-2 text-secondary animate-pulse-gold">
                  <Sparkles className="h-6 w-6" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
                  Ready to challenge your mind?
                </h2>

                <p className="text-lg text-muted-foreground max-w-2xl mb-8">
                  Join thousands of players worldwide and experience chess like never before with advanced AI,
                  multiplayer modes, and personalized training.
                </p>
              </motion.div>

              <motion.div
                className="flex flex-wrap gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Button
                  className="text-lg h-12 px-8 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all"
                  onClick={() => {
                    // On mobile, redirect to game plan selection page
                    if (window.innerWidth < 768) {
                      navigate('/play');
                    } else {
                      // On desktop, scroll to game options
                      const gamesSection = document.getElementById('game-options');
                      if (gamesSection) {
                        gamesSection.scrollIntoView({ behavior: 'smooth' });
                        setShowGameOptions(true);
                      }
                    }
                  }}
                >
                  Play Now
                </Button>
                <Button
                  variant="outline"
                  className="text-lg h-12 px-8 border-2 hover:bg-secondary/10 transition-all"
                  onClick={() => navigate("/learn")}
                >
                  Learn More
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
                className="mt-12"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="animate-bounce"
                  onClick={() => {
                    const gamesSection = document.getElementById('game-options');
                    if (gamesSection) {
                      gamesSection.scrollIntoView({ behavior: 'smooth' });
                      setShowGameOptions(true);
                    }
                  }}
                >
                  <ChevronDown className="h-8 w-8 text-muted-foreground" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Game Options Section */}
        <section id="game-options" className={`py-16 px-4 ${showGameOptions ? 'animate-slide-in' : 'hidden'}`}>
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4 inline-block relative">
                Choose Your Game Mode
                <motion.span
                  className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-gradient-to-r from-secondary/0 via-secondary to-secondary/0"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                ></motion.span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Select how you want to play and challenge yourself with different game modes
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <GameModeCard
                title="Player vs Computer"
                description="Challenge our AI at different difficulty levels and improve your skills"
                icon={Bot}
                path="/play/ai"
              />
              <GameModeCard
                title="Local Multiplayer"
                description="Play against a friend on the same device with customizable settings"
                icon={Users}
                path="/play/local"
              />
              <GameModeCard
                title="Play Online"
                description="Challenge players from around the world in real-time matches"
                icon={Globe}
                path="/play/online"
              />
              <GameModeCard
                title="Practice Mode"
                description="Study openings, solve puzzles, and improve your endgame skills"
                icon={Book}
                path="/play/practice"
              />
              <GameModeCard
                title="Tournament"
                description="Compete in bracket-style tournaments against multiple players"
                icon={Trophy}
                disabled={true}
              />
              <div className="relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow-lg transition-all hover:shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10"></div>
                <div className="relative p-6 flex flex-col h-full">
                  <div className="mb-2 p-2 rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>

                  <h3 className="text-lg font-bold mb-2">Coming Soon</h3>
                  <p className="text-sm text-muted-foreground mb-6 flex-grow">
                    More exciting game modes are being developed. Stay tuned for updates!
                  </p>

                  <Button
                    disabled={true}
                    variant="outline"
                    className="w-full"
                  >
                    Stay Tuned
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Preview */}
        <section className="py-20 px-4 bg-gradient-to-b from-background via-muted/30 to-background">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 inline-block relative">
                Game Preview
                <span className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0"></span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Experience our beautiful interface and powerful features
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2 flex justify-center">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 via-transparent to-secondary/20 rounded-xl blur-xl opacity-50"></div>
                  <div className="relative">
                    <ChessBoard size="large" theme="blue" />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <UserStats />

                <Card className="shadow-md border border-border/60 overflow-hidden">
                  <div className="bg-primary/5 px-4 py-2 border-b border-border/60">
                    <h3 className="font-medium">Game Controls</h3>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" className="border-primary/20 bg-primary/5 hover:bg-primary/10">
                        Hint
                      </Button>
                      <Button variant="outline" size="sm" className="border-primary/20 bg-primary/5 hover:bg-primary/10">
                        Undo
                      </Button>
                      <Button variant="outline" size="sm" className="border-primary/20 bg-primary/5 hover:bg-primary/10">
                        Resign
                      </Button>
                      <Button variant="outline" size="sm" className="border-primary/20 bg-primary/5 hover:bg-primary/10">
                        Offer Draw
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-md border border-border/60 overflow-hidden">
                  <div className="bg-primary/5 px-4 py-2 border-b border-border/60">
                    <h3 className="font-medium">Recent Moves</h3>
                  </div>
                  <CardContent className="p-0">
                    <div className="h-40 overflow-y-auto">
                      <div className="text-sm divide-y">
                        <div className="flex justify-between p-2 hover:bg-muted/30">
                          <span className="font-medium">1. e4</span>
                          <span>e5</span>
                        </div>
                        <div className="flex justify-between p-2 hover:bg-muted/30">
                          <span className="font-medium">2. Nf3</span>
                          <span>Nc6</span>
                        </div>
                        <div className="flex justify-between p-2 hover:bg-muted/30">
                          <span className="font-medium">3. Bb5</span>
                          <span>a6</span>
                        </div>
                        <div className="flex justify-between p-2 hover:bg-muted/30">
                          <span className="font-medium">4. Ba4</span>
                          <span>Nf6</span>
                        </div>
                        <div className="flex justify-between p-2 hover:bg-muted/30">
                          <span className="font-medium">5. O-O</span>
                          <span>Be7</span>
                        </div>
                        <div className="flex justify-between p-2 hover:bg-muted/30">
                          <span className="font-medium">6. Re1</span>
                          <span>b5</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 inline-block relative">
                Smart Features
                <span className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-gradient-to-r from-secondary/0 via-secondary to-secondary/0"></span>
              </h2>
              <p className="text-muted-foreground mb-4 max-w-2xl mx-auto">
                Experience chess with powerful tools that enhance your gameplay and learning
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Move Suggestions",
                  description: "Get intelligent hints when you're stuck, powered by advanced chess AI",
                  icon: "💡"
                },
                {
                  title: "Game Replays",
                  description: "Review your past games and learn from your mistakes",
                  icon: "🔄"
                },
                {
                  title: "Custom Boards",
                  description: "Unlock beautiful chess boards and piece sets with in-game currency",
                  icon: "🎨"
                },
                {
                  title: "Trophy Room",
                  description: "Showcase your achievements and rare collectibles",
                  icon: "🏆"
                },
                {
                  title: "Skill Rating",
                  description: "Track your progress with our ELO-based rating system",
                  icon: "📈"
                },
                {
                  title: "Daily Missions",
                  description: "Complete tasks to earn rewards and improve your skills",
                  icon: "✅"
                }
              ].map((feature, index) => (
                <Card key={index} className="text-left p-6 hover:shadow-lg transition-all border border-border/50 bg-gradient-to-br from-card to-background">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{feature.icon}</div>
                    <div>
                      <h3 className="font-bold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-16">
              <Button
                className="text-lg h-12 px-8 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all"
                onClick={() => {
                  // On mobile, redirect to game plan selection page
                  if (window.innerWidth < 768) {
                    navigate('/play');
                  } else {
                    // On desktop, scroll to game options
                    const gamesSection = document.getElementById('game-options');
                    if (gamesSection) {
                      gamesSection.scrollIntoView({ behavior: 'smooth' });
                      setShowGameOptions(true);
                    }
                  }
                }}
              >
                Start Playing Now
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-muted py-10 border-t">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Logo size="small" />
                <span className="font-semibold text-lg">SmartChess</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-md">
                Experience chess like never before with our modern platform. Play against AI, challenge friends, and improve your skills.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/" className="text-muted-foreground hover:text-foreground">Home</a></li>
                <li><a href="/play" className="text-muted-foreground hover:text-foreground">Play</a></li>
                <li><a href="/learn" className="text-muted-foreground hover:text-foreground">Learn</a></li>
                <li><a href="/learn/more" className="text-muted-foreground hover:text-foreground">About</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Twitter</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Discord</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">GitHub</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-muted-foreground mb-4 md:mb-0">
              &copy; 2025 SmartChess. All rights reserved.
            </div>

            <div className="flex gap-4">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

