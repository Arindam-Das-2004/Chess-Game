
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TrophyIcon, UserIcon, SettingsIcon, LogOutIcon, ChessIcon, ChevronDown } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logo from "./Logo";

type User = {
  name: string;
  email: string;
  isLoggedIn: boolean;
  avatar?: string;
};

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("chess-user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse user data:", error);
        localStorage.removeItem("chess-user");
      }
    }

    // Add scroll event listener
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const handleLogout = () => {
    localStorage.removeItem("chess-user");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className={`border-b py-3 px-4 md:px-8 flex items-center justify-between fixed top-0 left-0 right-0 z-10 transition-all duration-300 ${
      scrolled
        ? 'bg-background/80 backdrop-blur-md shadow-md'
        : 'bg-background/90 backdrop-blur-sm'
    }`}>
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center gap-2">
          <Logo size="small" />
          <span className="text-lg font-semibold hidden md:block">SmartChess</span>
        </Link>
      </div>

      {/* Navigation Links - Desktop */}
      <div className="hidden md:flex items-center gap-6 absolute left-1/2 transform -translate-x-1/2">
        <motion.div whileHover={{ scale: 1.05 }} className="relative">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors relative group">
            <motion.div
              whileHover={{ rotate: [0, -5, 5, -5, 0] }}
              transition={{ duration: 0.5 }}
              className="rounded-full px-3 py-1 hover:bg-primary/10"
            >
              Home
            </motion.div>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </Link>
        </motion.div>

        <div className="relative group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-sm font-medium hover:text-primary transition-colors cursor-pointer flex items-center gap-1"
          >
            <motion.div
              whileHover={{ rotate: [0, -5, 5, -5, 0] }}
              transition={{ duration: 0.5 }}
              className="rounded-full px-3 py-1 hover:bg-primary/10 flex items-center gap-1"
            >
              Play
              <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
            </motion.div>
          </motion.div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 w-48 bg-card rounded-md shadow-lg border border-border overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
            <div className="py-1">
              <Link to="/play/ai" className="block px-4 py-2 text-sm hover:bg-muted transition-colors">
                vs Computer
              </Link>
              <Link to="/play/local" className="block px-4 py-2 text-sm hover:bg-muted transition-colors">
                Local Multiplayer
              </Link>
              <Link to="/play/online" className="block px-4 py-2 text-sm hover:bg-muted transition-colors">
                Play Online
              </Link>
              <Link to="/play/practice" className="block px-4 py-2 text-sm hover:bg-muted transition-colors">
                Practice Mode
              </Link>
            </div>
          </div>
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
        </div>

        <motion.div whileHover={{ scale: 1.05 }} className="relative">
          <Link to="/learn" className="text-sm font-medium hover:text-primary transition-colors relative group">
            <motion.div
              whileHover={{ rotate: [0, -5, 5, -5, 0] }}
              transition={{ duration: 0.5 }}
              className="rounded-full px-3 py-1 hover:bg-primary/10"
            >
              Learn
            </motion.div>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </Link>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="relative">
          <Link to="/community" className="text-sm font-medium hover:text-primary transition-colors relative group">
            <motion.div
              whileHover={{ rotate: [0, -5, 5, -5, 0] }}
              transition={{ duration: 0.5 }}
              className="rounded-full px-3 py-1 hover:bg-primary/10"
            >
              Community
            </motion.div>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </Link>
        </motion.div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <ThemeToggle />

        {user?.isLoggedIn ? (
          <>
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-muted rounded-full">
              <div className="flex items-center gap-1">
                <span className="h-3 w-3 rounded-full bg-secondary animate-pulse-gold"></span>
                <span className="text-sm font-medium">1250</span>
              </div>
              <div className="h-4 w-px bg-border"></div>
              <div className="flex items-center gap-1">
                <motion.div
                  whileHover={{
                    rotate: 360,
                    transition: { duration: 0.6, ease: "easeInOut" }
                  }}
                >
                  <TrophyIcon className="h-4 w-4 text-secondary" />
                </motion.div>
                <span className="text-sm font-medium">8</span>
              </div>
            </div>

            <Button variant="ghost" size="icon" className="rounded-full" asChild>
              <Link to="/settings">
                <motion.div
                  whileHover={{
                    rotate: 360,
                    transition: { duration: 0.6, ease: "easeInOut" }
                  }}
                >
                  <SettingsIcon className="h-5 w-5" />
                </motion.div>
              </Link>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full overflow-hidden">
                  <Avatar className="h-8 w-8 border border-border">
                    <AvatarImage src={user.avatar || ""} alt={user.name} />
                    <AvatarFallback className="text-sm bg-primary/10">{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span>{user.name}</span>
                    <span className="text-xs text-muted-foreground">{user.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer">
                    <motion.div
                      whileHover={{
                        rotate: 360,
                        transition: { duration: 0.6, ease: "easeInOut" }
                      }}
                      className="inline-block mr-2"
                    >
                      <UserIcon className="h-4 w-4" />
                    </motion.div>
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="cursor-pointer">
                    <motion.div
                      whileHover={{
                        rotate: 360,
                        transition: { duration: 0.6, ease: "easeInOut" }
                      }}
                      className="inline-block mr-2"
                    >
                      <SettingsIcon className="h-4 w-4" />
                    </motion.div>
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer">
                  <motion.div
                    whileHover={{
                      rotate: 360,
                      transition: { duration: 0.6, ease: "easeInOut" }
                    }}
                    className="inline-block mr-2"
                  >
                    <LogOutIcon className="h-4 w-4" />
                  </motion.div>
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <motion.div whileHover={{ scale: 1.05 }}>
              <motion.div whileHover={{ rotate: [0, -5, 5, -5, 0] }} transition={{ duration: 0.5 }}>
                <Button
                  variant="ghost"
                  asChild
                  className="text-sm rounded-full"
                >
                  <Link to="/login">Login</Link>
                </Button>
              </motion.div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <motion.div whileHover={{ rotate: [0, -5, 5, -5, 0] }} transition={{ duration: 0.5 }}>
                <Button
                  asChild
                  className="text-sm bg-primary hover:bg-primary/90 rounded-full"
                >
                  <Link to="/login?tab=register">Sign Up</Link>
                </Button>
              </motion.div>
            </motion.div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
