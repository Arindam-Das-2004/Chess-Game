import { Moon, Sun, Laptop } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/providers/ThemeProvider";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.div whileHover={{ scale: 1.05 }}>
          <motion.div whileHover={{ rotate: [0, -5, 5, -5, 0] }} transition={{ duration: 0.5 }}>
            <Button variant="ghost" size="icon" className="rounded-full">
              {theme === 'light' && <Sun className="h-[1.2rem] w-[1.2rem]" />}
              {theme === 'dark' && <Moon className="h-[1.2rem] w-[1.2rem]" />}
              {theme === 'system' && <Laptop className="h-[1.2rem] w-[1.2rem]" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </motion.div>
        </motion.div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
            <Sun className="h-4 w-4" />
          </motion.div>
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
            <Moon className="h-4 w-4" />
          </motion.div>
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
            <Laptop className="h-4 w-4" />
          </motion.div>
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
