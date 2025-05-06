import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import ChessBoard from "@/components/ChessBoard";
import GameModeCard from "@/components/GameModeCard";
import UserStats from "@/components/UserStats";
import Logo from "@/components/Logo";
import AnimatedBanner from "@/components/AnimatedBanner";
import AnimatedTransformBanner from "@/components/AnimatedTransformBanner";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { UserIcon, Users, Bot, Trophy, Book, ChevronDown, Sparkles, Globe, Swords, Zap, Check } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [showGameOptions, setShowGameOptions] = useState(false);
  const [animatedText, setAnimatedText] = useState("");

  // Continuous typewriter effect for the hero text
  useEffect(() => {
    const text = "Chess Master";
    let currentIndex = 0;
    let isDeleting = false;
    let timer: NodeJS.Timeout;

    const typeNextChar = () => {
      // If we're deleting, remove a character
      if (isDeleting) {
        setAnimatedText(text.substring(0, currentIndex));
        currentIndex--;
      } else {
        // If we're typing, add a character
        setAnimatedText(text.substring(0, currentIndex + 1));
        currentIndex++;
      }

      // Determine the delay for the next character
      let delay = isDeleting ? 50 : 100;

      // If we've reached the end of the word, start deleting after a pause
      if (!isDeleting && currentIndex === text.length) {
        delay = 1500; // Pause at the end
        isDeleting = true;
      } else if (isDeleting && currentIndex === 0) {
        // If we've deleted the whole word, start typing again
        delay = 500; // Pause before retyping
        isDeleting = false;
      }

      timer = setTimeout(typeNextChar, delay);
    };

    typeNextChar();

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <AnimatedBanner />

      <main className="flex-grow">
        {/* Hero Section with Animated Transform Banner */}
        <div className="relative pt-20 md:pt-24">
          <AnimatedTransformBanner />

          {/* Overlay text with animated typing effect - Fixed positioning */}
          <div className="absolute top-[120px] md:top-[150px] left-0 right-0 flex items-center justify-center z-20 pointer-events-none">
            <motion.div
              className="text-center px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-chess-blue to-secondary">
                {animatedText}
                <span className="inline-block w-[3px] h-6 md:h-10 bg-primary animate-blink"></span>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Experience chess like never before with advanced AI, multiplayer modes, and personalized training.
              </p>
            </motion.div>
          </div>
        </div>

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
                bgImage="/assets/images/ai-chess.jpg"
                bgColor="from-blue-500/10 via-transparent to-blue-700/10"
              />
              <GameModeCard
                title="Local Multiplayer"
                description="Play against a friend on the same device with customizable settings"
                icon={Users}
                path="/play/local"
                bgImage="/assets/images/local-chess.jpg"
                bgColor="from-green-500/10 via-transparent to-green-700/10"
              />
              <GameModeCard
                title="Play Online"
                description="Challenge players from around the world in real-time matches"
                icon={Globe}
                path="/play/online"
                bgImage="/assets/images/online-chess.jpg"
                bgColor="from-purple-500/10 via-transparent to-purple-700/10"
              />
              <GameModeCard
                title="Practice Mode"
                description="Study openings, solve puzzles, and improve your endgame skills"
                icon={Book}
                path="/play/practice"
                bgImage="/assets/images/practice-chess.jpg"
                bgColor="from-amber-500/10 via-transparent to-amber-700/10"
              />
              <GameModeCard
                title="1vs1 Mode"
                description="Challenge a friend in a direct head-to-head match with custom rules"
                icon={Swords}
                path="/play/local"
                bgImage="/assets/images/duel-chess.jpg"
                bgColor="from-red-500/10 via-transparent to-red-700/10"
              />
              <GameModeCard
                title="Hyper Mode"
                description="Test your skills against our most challenging AI with advanced strategies"
                icon={Zap}
                path="/play/ai"
                bgImage="/assets/images/hyper-chess.jpg"
                bgColor="from-indigo-500/10 via-transparent to-indigo-700/10"
                onClick={() => {
                  // Store the difficulty preference in localStorage
                  localStorage.setItem('chess-ai-difficulty', 'hard');
                }}
              />
            </div>
          </motion.div>
        </section>

        {/* Features Preview */}
        <section className="py-20 px-4 bg-gradient-to-b from-background via-muted/30 to-background">
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
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
                Game Preview
                <motion.span
                  className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                ></motion.span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Experience our beautiful interface and powerful features
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <motion.div
                className="lg:col-span-2 flex justify-center"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 via-transparent to-secondary/20 rounded-xl blur-xl opacity-50"></div>
                  <div className="relative">
                    <ChessBoard size="large" theme="blue" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
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
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Chess News Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-primary/5 via-background to-secondary/5">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4 inline-block relative">
                Chess News & Updates
                <motion.span
                  className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-gradient-to-r from-secondary/0 via-secondary to-secondary/0"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                ></motion.span>
              </h2>
              <p className="text-muted-foreground mb-4 max-w-2xl mx-auto">
                Stay updated with the latest chess tournaments, strategies, and community events
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <motion.div
                className="bg-card rounded-lg overflow-hidden shadow-md border border-border/50"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                  <span className="text-6xl">♔</span>
                </div>
                <div className="p-5">
                  <div className="text-xs text-muted-foreground mb-2">May 15, 2023</div>
                  <h3 className="font-bold text-lg mb-2">World Chess Championship 2023</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Follow the exciting matches between the world's top grandmasters competing for the championship title.
                  </p>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <a href="/static/news/world-championship-2023.html" target="_blank" rel="noopener noreferrer">Read More</a>
                  </Button>
                </div>
              </motion.div>

              <motion.div
                className="bg-card rounded-lg overflow-hidden shadow-md border border-border/50"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="h-48 bg-gradient-to-br from-secondary/10 to-primary/10 flex items-center justify-center">
                  <span className="text-6xl">♕</span>
                </div>
                <div className="p-5">
                  <div className="text-xs text-muted-foreground mb-2">May 10, 2023</div>
                  <h3 className="font-bold text-lg mb-2">New Opening Strategies for 2023</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Discover the latest opening innovations being used by top players in recent tournaments.
                  </p>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <a href="/static/news/opening-strategies-2023.html" target="_blank" rel="noopener noreferrer">Read More</a>
                  </Button>
                </div>
              </motion.div>

              <motion.div
                className="bg-card rounded-lg overflow-hidden shadow-md border border-border/50"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                  <span className="text-6xl">♘</span>
                </div>
                <div className="p-5">
                  <div className="text-xs text-muted-foreground mb-2">May 5, 2023</div>
                  <h3 className="font-bold text-lg mb-2">Chess AI Breakthrough</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our new AI engine has reached unprecedented levels of play, challenging even the strongest grandmasters.
                  </p>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <a href="/static/news/chess-ai-breakthrough.html" target="_blank" rel="noopener noreferrer">Read More</a>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <motion.div
            className="max-w-6xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
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
                Smart Features
                <motion.span
                  className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-gradient-to-r from-secondary/0 via-secondary to-secondary/0"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                ></motion.span>
              </h2>
              <p className="text-muted-foreground mb-4 max-w-2xl mx-auto">
                Experience chess with powerful tools that enhance your gameplay and learning
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Move Suggestions",
                  description: "Get intelligent hints when you're stuck, powered by advanced chess AI",
                  icon: "💡",
                  path: "/features/move-suggestions"
                },
                {
                  title: "Game Replays",
                  description: "Review your past games and learn from your mistakes",
                  icon: "🔄",
                  path: "/features/game-replays"
                },
                {
                  title: "Custom Boards",
                  description: "Unlock beautiful chess boards and piece sets with in-game currency",
                  icon: "🎨",
                  path: "/features/custom-boards"
                },
                {
                  title: "Trophy Room",
                  description: "Showcase your achievements and rare collectibles",
                  icon: "🏆",
                  path: "/features/trophy-room"
                },
                {
                  title: "Skill Rating",
                  description: "Track your progress with our ELO-based rating system",
                  icon: "📈",
                  path: "/features/skill-rating"
                },
                {
                  title: "Daily Missions",
                  description: "Complete tasks to earn rewards and improve your skills",
                  icon: "✅",
                  path: "/features/daily-missions"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link to={feature.path}>
                    <Card className="text-left p-6 hover:shadow-lg transition-all border border-border/50 bg-gradient-to-br from-card to-background hover:bg-gradient-to-br hover:from-primary/5 hover:to-background group relative overflow-hidden">
                      {/* Background Image */}
                      <div
                        className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300 bg-no-repeat bg-right-bottom bg-contain"
                        style={{
                          backgroundImage: `url(/images/features/${feature.title.toLowerCase().replace(/\s+/g, '-')}.png)`,
                          backgroundSize: '40%'
                        }}
                      ></div>

                      {/* Content */}
                      <div className="flex items-start gap-3 relative z-10">
                        <div className="text-2xl group-hover:scale-110 group-hover:rotate-[360deg] transition-all duration-700">{feature.icon}</div>
                        <div>
                          <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                          <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-16 flex flex-col gap-4 items-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
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
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Playing Now
              </Button>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/test">Test Page</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/features/move-suggestions">Move Suggestions</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/features/daily-missions">Daily Missions</Link>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Chess Community Section */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4">Join Our Chess Community</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Connect with players from around the world, participate in tournaments, and improve together
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <motion.div
                className="order-2 md:order-1"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold mb-4">Why Join Our Community?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Weekly Tournaments</p>
                      <p className="text-sm text-muted-foreground">Compete in regular tournaments with players at your skill level</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Learning Resources</p>
                      <p className="text-sm text-muted-foreground">Access exclusive tutorials, puzzles, and strategy guides</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Coaching Sessions</p>
                      <p className="text-sm text-muted-foreground">Get feedback and advice from experienced players and coaches</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Global Leaderboards</p>
                      <p className="text-sm text-muted-foreground">Track your progress and compete for top positions</p>
                    </div>
                  </li>
                </ul>

                <div className="mt-6">
                  <Button className="mr-3" asChild>
                    <Link to="/community">Join Now</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/learn">Learn More</Link>
                  </Button>
                </div>
              </motion.div>

              <motion.div
                className="order-1 md:order-2 bg-card p-6 rounded-lg shadow-lg border border-border/50"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold mb-4">Community Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/30 p-4 rounded-md text-center">
                    <div className="text-3xl font-bold text-primary">50K+</div>
                    <div className="text-sm text-muted-foreground">Active Players</div>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-md text-center">
                    <div className="text-3xl font-bold text-primary">120+</div>
                    <div className="text-sm text-muted-foreground">Countries</div>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-md text-center">
                    <div className="text-3xl font-bold text-primary">500+</div>
                    <div className="text-sm text-muted-foreground">Daily Tournaments</div>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-md text-center">
                    <div className="text-3xl font-bold text-primary">1M+</div>
                    <div className="text-sm text-muted-foreground">Games Played</div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-primary/5 rounded-md">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <Trophy className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Next Tournament</h4>
                      <p className="text-xs text-muted-foreground">Saturday, June 10 at 2:00 PM</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link to="/play/tournament">Register Now</Link>
                  </Button>
                </div>
              </motion.div>
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
                <li><Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link></li>
                <li><Link to="/play" className="text-muted-foreground hover:text-foreground">Play</Link></li>
                <li><Link to="/learn" className="text-muted-foreground hover:text-foreground">Learn</Link></li>
                <li><Link to="/learn/more" className="text-muted-foreground hover:text-foreground">About</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/features/move-suggestions" className="text-muted-foreground hover:text-foreground">Move Suggestions</Link></li>
                <li><Link to="/features/game-replays" className="text-muted-foreground hover:text-foreground">Game Replays</Link></li>
                <li><Link to="/features/trophy-room" className="text-muted-foreground hover:text-foreground">Trophy Room</Link></li>
                <li><Link to="/features/daily-missions" className="text-muted-foreground hover:text-foreground">Daily Missions</Link></li>
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
