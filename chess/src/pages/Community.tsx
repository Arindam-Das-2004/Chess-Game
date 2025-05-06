import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/providers/AuthProvider";
import { useSocket } from "@/providers/SocketProvider";
import supabase from "@/config/SupabaseClient";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import {
  MessageSquare, Users, Trophy, Calendar, Heart,
  MessageCircle, Share2, Bookmark, ThumbsUp,
  Search, Filter, Clock, TrendingUp,
  Award, UserPlus, Globe, Zap, Sparkles, Bell,
  Settings, LogOut, User, Mail, Image, Link,
  Smile, PlusCircle, Send, MoreHorizontal, Edit,
  Trash2, Flag, Eye, EyeOff, Lock, Unlock,
  CheckCircle, XCircle, AlertCircle, Info,
  ChevronDown, Upload, Download, Camera, Video,
  FileText, AtSign, Hash, Gift, Star, Coffee
} from "lucide-react";

const Community = () => {
  const { user, profile } = useAuth();
  const { socket, isConnected, onlineUsers, sendMessage, joinRoom } = useSocket();

  const [activeTab, setActiveTab] = useState("discussions");
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: "all",
    timeFrame: "all",
    sortBy: "recent",
    onlyFollowing: false
  });
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newPost, setNewPost] = useState({
    content: "",
    category: "general",
    tags: "",
    isPublic: true,
    attachments: []
  });
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const [notifications, setNotifications] = useState([]);
  const [discussions, setDiscussions] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [communityHighlights, setCommunityHighlights] = useState({
    topPlayers: [],
    upcomingEvents: [],
    trendingTopics: []
  });

  // Use the profile from auth context or fallback to default
  const userProfile = profile || {
    username: "Guest",
    full_name: "Guest User",
    rating: 1200,
    games_played: 0,
    wins: 0,
    losses: 0,
    draws: 0,
    created_at: new Date().toISOString(),
    last_seen: new Date().toISOString(),
    badges: [],
    friends: 0,
    status: "online"
  };

  const { toast } = useToast();

  // Handler for sending chat messages
  const handleSendMessage = () => {
    if (!chatMessage.trim() || !isConnected) return;

    // Create a new message
    const newMessage = {
      user: userProfile.username,
      message: chatMessage,
      time: "Just now",
      avatar: userProfile.username.charAt(0).toUpperCase(),
      isCurrentUser: true
    };

    // Add to chat messages
    setChatMessages([...chatMessages, newMessage]);

    // Send message via socket if connected
    if (socket && isConnected) {
      sendMessage('community', chatMessage);
    }

    // Clear input
    setChatMessage("");
  };

  // Handler for AI assistant
  const handleAiAssistant = () => {
    if (!aiPrompt.trim() || aiLoading) return;

    // Set loading state
    setAiLoading(true);

    // Store the prompt
    const prompt = aiPrompt;

    // Clear input
    setAiPrompt("");

    // Simulate AI response
    setTimeout(() => {
      let response = "";

      if (prompt.toLowerCase().includes("sicilian")) {
        response = "The Sicilian Defense is one of the most popular and complex chess openings. It begins with the moves 1.e4 c5.\n\nKey points about the Sicilian Defense:\n\n1. It's an aggressive counter to White's 1.e4, immediately fighting for the center\n2. Black aims for an asymmetrical position with imbalances that create winning chances\n3. There are many variations including the Najdorf, Dragon, Classical, and Scheveningen\n4. It's favored by players who enjoy tactical complications and are willing to take calculated risks\n\nThe main line often continues with 2.Nf3 d6 3.d4 cxd4 4.Nxd4, after which Black has several strong options.";
      } else if (prompt.toLowerCase().includes("endgame")) {
        response = "Improving your endgame skills is crucial for chess mastery. Here are some tips:\n\n1. Study essential theoretical positions (King and pawn vs King, Lucena position, Philidor position)\n2. Practice opposition concepts and king activity\n3. Remember the rule of the square for pawn races\n4. Study rook endgames thoroughly - they're the most common\n5. Work on calculation precision - endgames require exact moves\n6. Analyze your own endgames with an engine\n7. Solve endgame studies and puzzles regularly\n\nRemember that endgame knowledge is cumulative and practical application is key to improvement.";
      } else if (prompt.toLowerCase().includes("queen's gambit")) {
        response = "The Queen's Gambit is a solid opening that begins with 1.d4 d5 2.c4, where White offers a pawn sacrifice for better development and center control.\n\nBest responses to the Queen's Gambit include:\n\n1. Queen's Gambit Accepted (2...dxc4) - Taking the pawn but needing careful defense\n2. Queen's Gambit Declined (2...e6) - Solid but slightly passive\n3. Slav Defense (2...c6) - Protecting the d5 pawn while maintaining flexibility\n4. Semi-Slav (2...e6 followed by ...c6) - Combining elements of QGD and Slav\n5. Albin Counter Gambit (2...e5) - Aggressive counter-gambit\n\nThe choice depends on your playing style and strategic preferences.";
      } else if (prompt.toLowerCase().includes("analyze") && prompt.toLowerCase().includes("position")) {
        response = "Analysis of position 1.e4 e5 2.Nf3 Nc6 3.Bb5 (Ruy Lopez/Spanish Opening):\n\nThis is the famous Ruy Lopez or Spanish Opening, one of the oldest and most respected chess openings.\n\nKey features:\n- White develops naturally while attacking the knight that defends the e5 pawn\n- White prepares to control the center with potential d4\n- The bishop on b5 creates pressure and potential weaknesses in Black's position\n\nMain continuations include:\n1. 3...a6 (Morphy Defense) - Most popular, questioning the bishop's placement\n2. 3...Nf6 (Berlin Defense) - Solid option leading to endgame positions\n3. 3...f5 (Schliemann Defense) - Aggressive counter-attack\n\nThe position is slightly better for White, but Black has many resources to equalize.";
      } else {
        response = "I'd be happy to help with your chess question! As a chess assistant, I can provide information about:\n\n- Opening theory and variations\n- Middlegame strategies and tactics\n- Endgame techniques\n- Position analysis\n- Training methods\n- Chess history\n\nCould you provide more specific details about what you'd like to know?";
      }

      // Set response
      setAiResponse(response);

      // End loading state
      setAiLoading(false);
    }, 1500);
  };

  // Fetch discussions from Supabase
  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        // If we're in development and don't have a proper Supabase connection,
        // use mock data instead of trying to fetch from Supabase
        if (process.env.NODE_ENV !== 'production' && !user) {
          // Mock discussions data
          const mockDiscussions = [
            {
              id: 1,
              title: "Best response to the Sicilian Defense?",
              author: "ChessMaster42",
              avatar: "C",
              time: "2 hours ago",
              replies: 24,
              likes: 18,
              tags: ["Openings", "Strategy"],
              content: "I've been struggling against the Sicilian Defense lately. What are your favorite lines against it?"
            },
            {
              id: 2,
              title: "Analysis of my recent tournament game - need feedback",
              author: "GrandmasterInTraining",
              avatar: "G",
              time: "5 hours ago",
              replies: 12,
              likes: 32,
              tags: ["Analysis", "Tournaments"],
              content: "Just played in a local tournament and wanted to share this game for analysis. I think I missed some tactical opportunities in the middlegame."
            },
            {
              id: 3,
              title: "How to improve calculation skills?",
              author: "TacticalGenius",
              avatar: "T",
              time: "Yesterday",
              replies: 45,
              likes: 76,
              tags: ["Tactics", "Improvement"],
              content: "What are your favorite exercises or methods to improve calculation abilities? I find myself missing tactics in complex positions."
            },
            {
              id: 4,
              title: "Queen's Gambit Declined - Modern Variation Analysis",
              author: "OpeningExpert",
              avatar: "O",
              time: "2 days ago",
              replies: 18,
              likes: 41,
              tags: ["Openings", "Analysis"],
              content: "I've prepared a detailed analysis of the Queen's Gambit Declined, Modern Variation. Here are some key positions and ideas to consider."
            },
            {
              id: 5,
              title: "Endgame puzzle collection - Test your skills!",
              author: "EndgameWizard",
              avatar: "E",
              time: "3 days ago",
              replies: 32,
              likes: 89,
              tags: ["Endgame", "Puzzles"],
              content: "I've compiled some challenging endgame puzzles from my recent studies. See if you can solve them!"
            },
            {
              id: 6,
              title: "Chess psychology: Handling pressure in critical positions",
              author: "MindMaster",
              avatar: "M",
              time: "4 days ago",
              replies: 27,
              likes: 63,
              tags: ["Psychology", "Strategy"],
              content: "How do you handle the psychological pressure during crucial moments in a game? I've been working on some mental techniques."
            }
          ];

          // Apply search filter to mock data if needed
          let filteredDiscussions = [...mockDiscussions];
          if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filteredDiscussions = filteredDiscussions.filter(d =>
              d.title.toLowerCase().includes(query) ||
              d.content.toLowerCase().includes(query) ||
              d.tags.some(tag => tag.toLowerCase().includes(query))
            );
          }

          // Apply category filter
          if (filters.category !== 'all') {
            filteredDiscussions = filteredDiscussions.filter(d =>
              d.tags.some(tag => tag.toLowerCase() === filters.category.toLowerCase())
            );
          }

          // Apply sorting
          switch (filters.sortBy) {
            case 'popular':
              filteredDiscussions.sort((a, b) => b.likes - a.likes);
              break;
            case 'replies':
              filteredDiscussions.sort((a, b) => b.replies - a.replies);
              break;
            case 'likes':
              filteredDiscussions.sort((a, b) => b.likes - a.likes);
              break;
            // For 'recent', we use the default order of the mock data
          }

          setDiscussions(filteredDiscussions);
          return;
        }

        // Real Supabase query for production
        let query = supabase
          .from('discussions')
          .select('*, profiles(username, avatar_url)')
          .order('created_at', { ascending: false });

        // Apply filters if set
        if (filters.category !== 'all') {
          query = query.eq('category', filters.category);
        }

        if (filters.timeFrame !== 'all') {
          const now = new Date();
          let timeAgo;

          switch (filters.timeFrame) {
            case 'today':
              timeAgo = new Date(now.setDate(now.getDate() - 1)).toISOString();
              break;
            case 'week':
              timeAgo = new Date(now.setDate(now.getDate() - 7)).toISOString();
              break;
            case 'month':
              timeAgo = new Date(now.setMonth(now.getMonth() - 1)).toISOString();
              break;
            case 'year':
              timeAgo = new Date(now.setFullYear(now.getFullYear() - 1)).toISOString();
              break;
          }

          if (timeAgo) {
            query = query.gte('created_at', timeAgo);
          }
        }

        if (filters.onlyFollowing && user) {
          // Get user's following list
          const { data: followingData } = await supabase
            .from('follows')
            .select('following_id')
            .eq('follower_id', user.id);

          if (followingData && followingData.length > 0) {
            const followingIds = followingData.map(f => f.following_id);
            query = query.in('user_id', followingIds);
          }
        }

        // Apply search if present
        if (searchQuery) {
          query = query.or(`title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%,tags.cs.{${searchQuery}}`);
        }

        // Apply sorting
        switch (filters.sortBy) {
          case 'popular':
            query = query.order('likes', { ascending: false });
            break;
          case 'replies':
            query = query.order('replies', { ascending: false });
            break;
          case 'likes':
            query = query.order('likes', { ascending: false });
            break;
          default:
            query = query.order('created_at', { ascending: false });
        }

        // Limit to 20 discussions
        query = query.limit(20);

        const { data, error } = await query;

        if (error) {
          console.error('Error fetching discussions:', error);
          toast({
            title: "Error",
            description: "Failed to load discussions. Please try again.",
            variant: "destructive",
          });
        } else if (data) {
          // Format the discussions
          const formattedDiscussions = data.map(discussion => ({
            id: discussion.id,
            title: discussion.title,
            author: discussion.profiles.username,
            avatar: discussion.profiles.avatar_url || discussion.profiles.username.charAt(0).toUpperCase(),
            time: formatTimeAgo(new Date(discussion.created_at)),
            replies: discussion.replies_count || 0,
            likes: discussion.likes_count || 0,
            tags: discussion.tags || [],
            content: discussion.content
          }));

          setDiscussions(formattedDiscussions);
        }
      } catch (error) {
        console.error('Error fetching discussions:', error);
        // Use mock data as fallback in case of error
        setDiscussions([
          {
            id: 1,
            title: "Best response to the Sicilian Defense?",
            author: "ChessMaster42",
            avatar: "C",
            time: "2 hours ago",
            replies: 24,
            likes: 18,
            tags: ["Openings", "Strategy"],
            content: "I've been struggling against the Sicilian Defense lately. What are your favorite lines against it?"
          },
          {
            id: 2,
            title: "Analysis of my recent tournament game - need feedback",
            author: "GrandmasterInTraining",
            avatar: "G",
            time: "5 hours ago",
            replies: 12,
            likes: 32,
            tags: ["Analysis", "Tournaments"],
            content: "Just played in a local tournament and wanted to share this game for analysis. I think I missed some tactical opportunities in the middlegame."
          }
        ]);
      }
    };

    fetchDiscussions();

    // Set up real-time subscription for new discussions
    try {
      const discussionsSubscription = supabase
        .channel('public:discussions')
        .on('postgres_changes', {
          event: 'INSERT',
          schema: 'public',
          table: 'discussions'
        }, payload => {
          // Fetch the new discussion with author info
          supabase
            .from('discussions')
            .select('*, profiles(username, avatar_url)')
            .eq('id', payload.new.id)
            .single()
            .then(({ data, error }) => {
              if (!error && data) {
                const newDiscussion = {
                  id: data.id,
                  title: data.title,
                  author: data.profiles.username,
                  avatar: data.profiles.avatar_url || data.profiles.username.charAt(0).toUpperCase(),
                  time: 'Just now',
                  replies: 0,
                  likes: 0,
                  tags: data.tags || [],
                  content: data.content
                };

                setDiscussions(prev => [newDiscussion, ...prev]);

                toast({
                  title: "New Discussion",
                  description: `${data.profiles.username} started a new discussion`,
                });
              }
            });
        })
        .subscribe();

      return () => {
        try {
          supabase.removeChannel(discussionsSubscription);
        } catch (error) {
          console.error('Error removing channel:', error);
        }
      };
    } catch (error) {
      console.error('Error setting up real-time subscription:', error);
      // No cleanup needed if subscription failed
      return () => {};
    }
  }, [filters, searchQuery, user, toast]);

  // Fetch notifications from Supabase
  useEffect(() => {
    // If no user or in development without proper Supabase connection, use mock data
    if (!user || (process.env.NODE_ENV !== 'production' && !user.id)) {
      // Set mock notifications
      setNotifications([
        {
          id: 1,
          type: "mention",
          content: "ChessMaster42 mentioned you in a discussion",
          time: "5 minutes ago",
          read: false
        },
        {
          id: 2,
          type: "like",
          content: "GrandmasterInTraining liked your post",
          time: "2 hours ago",
          read: false
        },
        {
          id: 3,
          type: "tournament",
          content: "Weekend Blitz Tournament starts in 2 days",
          time: "1 day ago",
          read: true
        }
      ]);

      // Simulate receiving a new notification after 5 seconds in development
      if (process.env.NODE_ENV !== 'production') {
        const timer = setTimeout(() => {
          const newNotification = {
            id: 4,
            type: "friend",
            content: "TacticalGenius sent you a friend request",
            time: "Just now",
            read: false
          };

          setNotifications(prev => [newNotification, ...prev]);

          toast({
            title: "New Notification",
            description: newNotification.content,
          });
        }, 5000);

        return () => clearTimeout(timer);
      }

      return;
    }

    // Real Supabase query for production with authenticated user
    const fetchNotifications = async () => {
      try {
        const { data, error } = await supabase
          .from('notifications')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(10);

        if (error) {
          console.error('Error fetching notifications:', error);
          throw error;
        } else if (data) {
          const formattedNotifications = data.map(notification => ({
            id: notification.id,
            type: notification.type,
            content: notification.content,
            time: formatTimeAgo(new Date(notification.created_at)),
            read: notification.read
          }));

          setNotifications(formattedNotifications);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
        // Use mock data as fallback
        setNotifications([
          {
            id: 1,
            type: "mention",
            content: "ChessMaster42 mentioned you in a discussion",
            time: "5 minutes ago",
            read: false
          },
          {
            id: 2,
            type: "like",
            content: "GrandmasterInTraining liked your post",
            time: "2 hours ago",
            read: false
          }
        ]);
      }
    };

    fetchNotifications();

    // Set up real-time subscription for new notifications
    try {
      const notificationsSubscription = supabase
        .channel(`user-notifications:${user.id}`)
        .on('postgres_changes', {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`
        }, payload => {
          const newNotification = {
            id: payload.new.id,
            type: payload.new.type,
            content: payload.new.content,
            time: 'Just now',
            read: false
          };

          setNotifications(prev => [newNotification, ...prev]);

          toast({
            title: "New Notification",
            description: payload.new.content,
          });
        })
        .subscribe();

      return () => {
        try {
          supabase.removeChannel(notificationsSubscription);
        } catch (error) {
          console.error('Error removing notifications channel:', error);
        }
      };
    } catch (error) {
      console.error('Error setting up notifications subscription:', error);
      return () => {};
    }
  }, [user, toast]);

  // Fetch community highlights from Supabase
  useEffect(() => {
    const fetchCommunityHighlights = async () => {
      try {
        // If we're in development and don't have a proper Supabase connection,
        // use mock data instead of trying to fetch from Supabase
        if (process.env.NODE_ENV !== 'production' && !user) {
          // Mock community highlights data
          setCommunityHighlights({
            topPlayers: [
              { name: "Magnus A.", rating: 2840, avatar: "M", recentAchievement: "Won Grand Chess Tour" },
              { name: "Hikaru N.", rating: 2790, avatar: "H", recentAchievement: "Blitz Champion" },
              { name: "Fabiano C.", rating: 2780, avatar: "F", recentAchievement: "US Championship Winner" },
            ],
            upcomingEvents: [
              { name: "Weekend Blitz Tournament", date: "Sat, 10 Dec", participants: 64, registrationOpen: true },
              { name: "Beginner's Workshop", date: "Sun, 11 Dec", participants: 32, registrationOpen: true },
              { name: "Master Class with GM David", date: "Wed, 14 Dec", participants: 20, registrationOpen: false },
            ],
            trendingTopics: ["Candidates Tournament", "Queen's Gambit", "Chess960", "Puzzle Rush"]
          });
          return;
        }

        // Fetch top players
        const { data: topPlayersData, error: topPlayersError } = await supabase
          .from('profiles')
          .select('id, username, rating, avatar_url')
          .order('rating', { ascending: false })
          .limit(3);

        if (topPlayersError) {
          console.error('Error fetching top players:', topPlayersError);
          throw topPlayersError;
        }

        const topPlayers = topPlayersData ? topPlayersData.map(player => ({
          name: player.username,
          rating: player.rating,
          avatar: player.avatar_url || player.username.charAt(0).toUpperCase(),
          recentAchievement: "Active Player" // This would come from achievements table in a real app
        })) : [];

        // Fetch upcoming events
        const { data: eventsData, error: eventsError } = await supabase
          .from('events')
          .select('*')
          .gte('event_date', new Date().toISOString())
          .order('event_date', { ascending: true })
          .limit(3);

        if (eventsError) {
          console.error('Error fetching events:', eventsError);
          throw eventsError;
        }

        const upcomingEvents = eventsData ? eventsData.map(event => ({
          name: event.title,
          date: new Date(event.event_date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' }),
          participants: event.participants_count || 0,
          registrationOpen: new Date(event.registration_end_date) > new Date()
        })) : [];

        // Fetch trending topics
        const { data: tagsData, error: tagsError } = await supabase
          .rpc('get_trending_tags', { limit_count: 4 });

        if (tagsError) {
          console.error('Error fetching trending tags:', tagsError);
          throw tagsError;
        }

        const trendingTopics = tagsData || ["Openings", "Tactics", "Endgame", "Analysis"];

        setCommunityHighlights({
          topPlayers,
          upcomingEvents,
          trendingTopics
        });
      } catch (error) {
        console.error('Error fetching community highlights:', error);

        // Use mock data as fallback in case of error
        setCommunityHighlights({
          topPlayers: [
            { name: "Magnus A.", rating: 2840, avatar: "M", recentAchievement: "Won Grand Chess Tour" },
            { name: "Hikaru N.", rating: 2790, avatar: "H", recentAchievement: "Blitz Champion" },
            { name: "Fabiano C.", rating: 2780, avatar: "F", recentAchievement: "US Championship Winner" },
          ],
          upcomingEvents: [
            { name: "Weekend Blitz Tournament", date: "Sat, 10 Dec", participants: 64, registrationOpen: true },
            { name: "Beginner's Workshop", date: "Sun, 11 Dec", participants: 32, registrationOpen: true },
            { name: "Master Class with GM David", date: "Wed, 14 Dec", participants: 20, registrationOpen: false },
          ],
          trendingTopics: ["Candidates Tournament", "Queen's Gambit", "Chess960", "Puzzle Rush"]
        });
      }
    };

    fetchCommunityHighlights();

    // Refresh community highlights every 5 minutes
    const interval = setInterval(fetchCommunityHighlights, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [user]);

  // Handle socket connection for chat
  useEffect(() => {
    if (socket && isConnected) {
      // Join the community chat room
      joinRoom('community');

      // Listen for chat messages
      socket.on('chat_message', (data) => {
        // Only add messages from others (our own messages are added directly)
        if (data.sender !== userProfile.username) {
          const newMessage = {
            user: data.sender,
            message: data.message,
            time: formatTimeAgo(new Date(data.timestamp)),
            avatar: data.sender.charAt(0).toUpperCase(),
            isCurrentUser: false
          };

          setChatMessages(prev => [...prev, newMessage]);
        }
      });

      // Listen for chat history
      socket.on('chat_history', (messages) => {
        const formattedMessages = messages.map(msg => ({
          user: msg.sender,
          message: msg.message,
          time: formatTimeAgo(new Date(msg.timestamp)),
          avatar: msg.sender.charAt(0).toUpperCase(),
          isCurrentUser: msg.sender === userProfile.username
        }));

        setChatMessages(formattedMessages);
      });

      return () => {
        socket.off('chat_message');
        socket.off('chat_history');
      };
    }
  }, [socket, isConnected, userProfile.username, joinRoom]);

  // Helper function to format time ago
  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) {
      return 'Just now';
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return diffInDays === 1 ? 'Yesterday' : `${diffInDays}d ago`;
    }

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">ChessMaster</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6">
              <a href="/" className="text-sm font-medium hover:text-primary transition-colors">Home</a>
              <a href="/play" className="text-sm font-medium hover:text-primary transition-colors">Play</a>
              <a href="/learn" className="text-sm font-medium hover:text-primary transition-colors">Learn</a>
              <a href="/community" className="text-sm font-medium text-primary">Community</a>
            </div>

            <div className="flex items-center gap-3">
              {/* Notifications */}
              <Popover open={showNotifications} onOpenChange={setShowNotifications}>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {notifications.filter(n => !n.read).length > 0 && (
                      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="end">
                  <div className="p-3 border-b border-border/40 flex items-center justify-between">
                    <h3 className="font-medium">Notifications</h3>
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                      Mark all as read
                    </Button>
                  </div>
                  <ScrollArea className="h-80">
                    <div className="divide-y">
                      {notifications.map(notification => (
                        <div
                          key={notification.id}
                          className={`p-3 hover:bg-muted/30 ${notification.read ? 'opacity-70' : ''}`}
                        >
                          <div className="flex gap-3">
                            <div className="mt-0.5">
                              {notification.type === "mention" && (
                                <AtSign className="h-5 w-5 text-blue-500" />
                              )}
                              {notification.type === "like" && (
                                <Heart className="h-5 w-5 text-red-500" />
                              )}
                              {notification.type === "tournament" && (
                                <Trophy className="h-5 w-5 text-amber-500" />
                              )}
                              {notification.type === "friend" && (
                                <UserPlus className="h-5 w-5 text-green-500" />
                              )}
                            </div>
                            <div>
                              <p className="text-sm">{notification.content}</p>
                              <p className="text-xs text-muted-foreground">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <div className="p-3 border-t border-border/40 text-center">
                    <Button variant="ghost" size="sm" className="w-full text-xs">
                      View all notifications
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>

              {/* User Profile */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {userProfile.username.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="p-2 border-b border-border/40">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {userProfile.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{userProfile.username}</p>
                        <p className="text-xs text-muted-foreground">Rating: {userProfile.rating}</p>
                      </div>
                    </div>
                  </div>
                  <DropdownMenuItem className="cursor-pointer">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Trophy className="h-4 w-4 mr-2" />
                    My Tournaments
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Users className="h-4 w-4 mr-2" />
                    Friends
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer text-red-500"
                    onClick={() => {
                      if (user) {
                        supabase.auth.signOut().then(() => {
                          toast({
                            title: "Logged out",
                            description: "You have been logged out successfully",
                          });
                        });
                      } else {
                        window.location.href = "/login";
                      }
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    {user ? "Logout" : "Login"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-grow pt-16 pb-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Hero Section */}
          <section className="py-10 mb-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-chess-blue to-secondary">
                Chess Master Community
              </h1>
              <p className="text-muted-foreground mb-6">
                Connect with chess enthusiasts, share your games, participate in discussions, and stay updated with the latest tournaments and events.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button className="gap-2">
                  <UserPlus size={16} />
                  Join Community
                </Button>
                <Button variant="outline" className="gap-2">
                  <Globe size={16} />
                  Browse Events
                </Button>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-card to-background">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <Users className="h-8 w-8 mb-2 text-primary" />
                  <h3 className="text-2xl font-bold">12,450+</h3>
                  <p className="text-sm text-muted-foreground">Active Members</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-card to-background">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <MessageSquare className="h-8 w-8 mb-2 text-primary" />
                  <h3 className="text-2xl font-bold">5,280+</h3>
                  <p className="text-sm text-muted-foreground">Discussions</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-card to-background">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <Trophy className="h-8 w-8 mb-2 text-primary" />
                  <h3 className="text-2xl font-bold">320+</h3>
                  <p className="text-sm text-muted-foreground">Tournaments</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-card to-background">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <Calendar className="h-8 w-8 mb-2 text-primary" />
                  <h3 className="text-2xl font-bold">45+</h3>
                  <p className="text-sm text-muted-foreground">Events This Month</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* User Profile Card */}
              <Card className="overflow-hidden">
                <div className="h-24 bg-gradient-to-r from-primary/20 to-secondary/20"></div>
                <div className="px-6 pb-6">
                  <div className="flex justify-center -mt-12">
                    <Avatar className="h-24 w-24 border-4 border-background">
                      <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                        {userProfile.username.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="text-center mt-3">
                    <h2 className="text-xl font-bold">{userProfile.username}</h2>
                    <p className="text-sm text-muted-foreground">{userProfile.fullName}</p>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <Badge variant="secondary">{userProfile.rating} ELO</Badge>
                      <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                        {userProfile.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-6 text-center">
                    <div>
                      <p className="text-lg font-bold">{userProfile.gamesPlayed}</p>
                      <p className="text-xs text-muted-foreground">Games</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold">{userProfile.winRate}%</p>
                      <p className="text-xs text-muted-foreground">Win Rate</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold">{userProfile.friends}</p>
                      <p className="text-xs text-muted-foreground">Friends</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-sm font-medium mb-2">Badges</h3>
                    <div className="flex flex-wrap gap-2">
                      {userProfile.badges.map((badge, index) => (
                        <Badge key={index} variant="outline" className="bg-primary/5">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex gap-2">
                    <Button className="w-full" size="sm">Edit Profile</Button>
                    <Button variant="outline" size="sm" className="w-full">Share Profile</Button>
                  </div>
                </div>
              </Card>

              {/* Friends List */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Friends</CardTitle>
                      <CardDescription>Your chess connections</CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <UserPlus className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[250px]">
                    <div className="divide-y">
                      {[
                        { name: "Magnus A.", status: "online", lastActive: "Now", avatar: "M" },
                        { name: "Hikaru N.", status: "online", lastActive: "Now", avatar: "H" },
                        { name: "Fabiano C.", status: "offline", lastActive: "2h ago", avatar: "F" },
                        { name: "Wesley S.", status: "offline", lastActive: "5h ago", avatar: "W" },
                        { name: "Anish G.", status: "online", lastActive: "Now", avatar: "A" },
                        { name: "Levon A.", status: "offline", lastActive: "1d ago", avatar: "L" },
                      ].map((friend, index) => (
                        <div key={index} className="flex items-center justify-between p-3 hover:bg-muted/30">
                          <div className="flex items-center gap-2">
                            <div className="relative">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-primary/10 text-primary">{friend.avatar}</AvatarFallback>
                              </Avatar>
                              <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-background ${friend.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                            </div>
                            <div>
                              <p className="text-sm font-medium">{friend.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {friend.status === 'online' ? 'Online' : `Last seen ${friend.lastActive}`}
                              </p>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Zap className="h-4 w-4 mr-2" />
                                Challenge
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <MessageCircle className="h-4 w-4 mr-2" />
                                Message
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <User className="h-4 w-4 mr-2" />
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-500">
                                <XCircle className="h-4 w-4 mr-2" />
                                Remove Friend
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
                <CardFooter className="border-t border-border/40 p-3">
                  <Button variant="ghost" size="sm" className="w-full text-xs">View All Friends</Button>
                </CardFooter>
              </Card>

              {/* Community Highlights */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Community Highlights</CardTitle>
                  <CardDescription>Top contributors and events</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2 flex items-center">
                      <Award className="h-4 w-4 mr-1 text-amber-500" />
                      Top Players This Week
                    </h3>
                    <div className="space-y-3">
                      {communityHighlights.topPlayers.map((player, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-primary/10 text-primary">{player.avatar}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{player.name}</p>
                              <div className="flex items-center">
                                <p className="text-xs text-muted-foreground">Rating: {player.rating}</p>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1">
                                      <Info className="h-3 w-3 text-muted-foreground" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="text-xs">{player.recentAchievement}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-xs">#{index + 1}</Badge>
                        </div>
                      ))}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full text-xs mt-2"
                        onClick={() => {
                          toast({
                            title: "Leaderboard",
                            description: "Full leaderboard will be available soon!",
                            duration: 3000,
                          });
                        }}
                      >
                        View Full Leaderboard
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-sm font-medium mb-2 flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-blue-500" />
                      Upcoming Events
                    </h3>
                    <div className="space-y-3">
                      {communityHighlights.upcomingEvents.map((event, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">{event.name}</p>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Clock className="h-3 w-3 mr-1" />
                              {event.date}
                              <span className="mx-1">•</span>
                              <Users className="h-3 w-3 mr-1" />
                              {event.participants}
                            </div>
                          </div>
                          <Button
                            variant={event.registrationOpen ? "default" : "outline"}
                            size="sm"
                            className="h-7 text-xs"
                            onClick={() => {
                              if (event.registrationOpen) {
                                window.location.href = "/play/tournament";
                              } else {
                                toast({
                                  title: "Registration Closed",
                                  description: "Registration for this event is currently closed.",
                                  duration: 3000,
                                });
                              }
                            }}
                          >
                            {event.registrationOpen ? "Register" : "Closed"}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-sm font-medium mb-2 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
                      Trending Topics
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {communityHighlights.trendingTopics.map((topic, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="cursor-pointer hover:bg-secondary/20"
                          onClick={() => {
                            setSearchQuery(topic);
                            toast({
                              title: "Search Applied",
                              description: `Showing results for "${topic}"`,
                              duration: 3000,
                            });
                          }}
                        >
                          #{topic.replace(/\s+/g, '')}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      toast({
                        title: "Community Hub",
                        description: "Full community hub will be available soon!",
                        duration: 3000,
                      });
                    }}
                  >
                    View All
                  </Button>
                </CardFooter>
              </Card>

              {/* Popular Tags */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Popular Tags</CardTitle>
                  <CardDescription>Trending topics in the community</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Openings", "Endgame", "Tactics", "Strategy",
                      "Puzzles", "Analysis", "Tournaments", "Beginner",
                      "Intermediate", "Advanced", "Chess960", "Blitz"
                    ].map((tag, index) => (
                      <Badge key={index} variant="secondary" className="cursor-pointer hover:bg-secondary/20">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search discussions, events, or members..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        toast({
                          title: "Search Results",
                          description: `Showing results for "${searchQuery}"`,
                          duration: 3000,
                        });
                      }
                    }}
                  />
                  {searchQuery && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
                      onClick={() => setSearchQuery("")}
                    >
                      <XCircle className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <Popover open={showFilters} onOpenChange={setShowFilters}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-4">
                      <h3 className="font-medium">Filter Options</h3>

                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={filters.category}
                          onValueChange={(value) => setFilters({...filters, category: value})}
                        >
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            <SelectItem value="openings">Openings</SelectItem>
                            <SelectItem value="middlegame">Middlegame</SelectItem>
                            <SelectItem value="endgame">Endgame</SelectItem>
                            <SelectItem value="tactics">Tactics</SelectItem>
                            <SelectItem value="strategy">Strategy</SelectItem>
                            <SelectItem value="analysis">Analysis</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="timeFrame">Time Frame</Label>
                        <Select
                          value={filters.timeFrame}
                          onValueChange={(value) => setFilters({...filters, timeFrame: value})}
                        >
                          <SelectTrigger id="timeFrame">
                            <SelectValue placeholder="Select time frame" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Time</SelectItem>
                            <SelectItem value="today">Today</SelectItem>
                            <SelectItem value="week">This Week</SelectItem>
                            <SelectItem value="month">This Month</SelectItem>
                            <SelectItem value="year">This Year</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="sortBy">Sort By</Label>
                        <Select
                          value={filters.sortBy}
                          onValueChange={(value) => setFilters({...filters, sortBy: value})}
                        >
                          <SelectTrigger id="sortBy">
                            <SelectValue placeholder="Sort by" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="recent">Most Recent</SelectItem>
                            <SelectItem value="popular">Most Popular</SelectItem>
                            <SelectItem value="replies">Most Replies</SelectItem>
                            <SelectItem value="likes">Most Likes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="onlyFollowing"
                          checked={filters.onlyFollowing}
                          onCheckedChange={(checked) => setFilters({...filters, onlyFollowing: checked})}
                        />
                        <Label htmlFor="onlyFollowing">Only show posts from people I follow</Label>
                      </div>

                      <div className="flex justify-between pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setFilters({
                              category: "all",
                              timeFrame: "all",
                              sortBy: "recent",
                              onlyFollowing: false
                            });
                          }}
                        >
                          Reset
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => {
                            setShowFilters(false);
                            toast({
                              title: "Filters Applied",
                              description: "Your filter settings have been applied.",
                              duration: 3000,
                            });
                          }}
                        >
                          Apply Filters
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              <Tabs defaultValue="discussions" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-4 mb-6">
                  <TabsTrigger value="discussions" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    <span className="hidden sm:inline">Discussions</span>
                  </TabsTrigger>
                  <TabsTrigger value="games" className="flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    <span className="hidden sm:inline">Games</span>
                  </TabsTrigger>
                  <TabsTrigger value="tournaments" className="flex items-center gap-2">
                    <Trophy className="h-4 w-4" />
                    <span className="hidden sm:inline">Tournaments</span>
                  </TabsTrigger>
                  <TabsTrigger value="learn" className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    <span className="hidden sm:inline">Learn</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="discussions" className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Recent Discussions</h2>
                    <Button>New Post</Button>
                  </div>

                  <Card>
                    <CardContent className="p-0">
                      <ScrollArea className="h-[600px]">
                        <div className="divide-y">
                          {[
                            {
                              title: "Best response to the Sicilian Defense?",
                              author: "ChessMaster42",
                              avatar: "C",
                              time: "2 hours ago",
                              replies: 24,
                              likes: 18,
                              tags: ["Openings", "Strategy"]
                            },
                            {
                              title: "Analysis of my recent tournament game - need feedback",
                              author: "GrandmasterInTraining",
                              avatar: "G",
                              time: "5 hours ago",
                              replies: 12,
                              likes: 32,
                              tags: ["Analysis", "Tournaments"]
                            },
                            {
                              title: "How to improve calculation skills?",
                              author: "TacticalGenius",
                              avatar: "T",
                              time: "Yesterday",
                              replies: 45,
                              likes: 76,
                              tags: ["Tactics", "Improvement"]
                            },
                            {
                              title: "Queen's Gambit Declined - Modern Variation Analysis",
                              author: "OpeningExpert",
                              avatar: "O",
                              time: "2 days ago",
                              replies: 18,
                              likes: 41,
                              tags: ["Openings", "Analysis"]
                            },
                            {
                              title: "Endgame puzzle collection - Test your skills!",
                              author: "EndgameWizard",
                              avatar: "E",
                              time: "3 days ago",
                              replies: 32,
                              likes: 89,
                              tags: ["Endgame", "Puzzles"]
                            },
                            {
                              title: "Chess psychology: Handling pressure in critical positions",
                              author: "MindMaster",
                              avatar: "M",
                              time: "4 days ago",
                              replies: 27,
                              likes: 63,
                              tags: ["Psychology", "Strategy"]
                            }
                          ].map((post, index) => (
                            <div key={index} className="p-4 hover:bg-muted/30">
                              <div className="flex gap-4">
                                <Avatar>
                                  <AvatarFallback className="bg-primary/10 text-primary">{post.avatar}</AvatarFallback>
                                </Avatar>
                                <div className="flex-grow">
                                  <h3 className="font-medium mb-1">{post.title}</h3>
                                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                                    <span>{post.author}</span>
                                    <span className="mx-1">•</span>
                                    <span>{post.time}</span>
                                  </div>
                                  <div className="flex flex-wrap gap-2 mb-3">
                                    {post.tags.map((tag, tagIndex) => (
                                      <Badge key={tagIndex} variant="outline" className="text-xs">
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                  <div className="flex gap-4">
                                    <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground">
                                      <MessageCircle className="h-4 w-4 mr-1" />
                                      {post.replies}
                                    </Button>
                                    <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground">
                                      <ThumbsUp className="h-4 w-4 mr-1" />
                                      {post.likes}
                                    </Button>
                                    <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground">
                                      <Bookmark className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground">
                                      <Share2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="games" className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Recent Games</h2>
                    <Button>Share Game</Button>
                  </div>

                  <Card>
                    <CardContent className="p-0">
                      <div className="divide-y">
                        {[
                          {
                            white: "Magnus A.",
                            black: "Hikaru N.",
                            result: "1-0",
                            moves: 42,
                            time: "3 days ago",
                            opening: "Ruy Lopez, Berlin Defense"
                          },
                          {
                            white: "Fabiano C.",
                            black: "Wesley S.",
                            result: "½-½",
                            moves: 67,
                            time: "4 days ago",
                            opening: "Queen's Gambit Declined"
                          },
                          {
                            white: "Anish G.",
                            black: "Levon A.",
                            result: "0-1",
                            moves: 38,
                            time: "5 days ago",
                            opening: "Sicilian Defense, Najdorf"
                          }
                        ].map((game, index) => (
                          <div key={index} className="p-4 hover:bg-muted/30">
                            <div className="flex justify-between items-center mb-2">
                              <div>
                                <h3 className="font-medium">{game.white} vs {game.black}</h3>
                                <p className="text-sm text-muted-foreground">{game.opening}</p>
                              </div>
                              <Badge>{game.result}</Badge>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <span>{game.moves} moves</span>
                              <span className="mx-1">•</span>
                              <span>{game.time}</span>
                            </div>
                            <div className="flex gap-2 mt-3">
                              <Button variant="outline" size="sm">View Game</Button>
                              <Button variant="ghost" size="sm">Analysis</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="tournaments" className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Tournaments & Events</h2>
                    <Button>Create Event</Button>
                  </div>

                  <Card>
                    <CardContent className="p-0">
                      <div className="divide-y">
                        {[
                          {
                            name: "Weekend Blitz Championship",
                            date: "Dec 10-11, 2023",
                            participants: 64,
                            status: "Registration Open",
                            prize: "$500"
                          },
                          {
                            name: "Monthly Classical Tournament",
                            date: "Dec 17-18, 2023",
                            participants: 32,
                            status: "Registration Open",
                            prize: "$1,000"
                          },
                          {
                            name: "Beginner's Arena",
                            date: "Dec 24, 2023",
                            participants: 128,
                            status: "Registration Open",
                            prize: "Membership & Coaching"
                          }
                        ].map((tournament, index) => (
                          <div key={index} className="p-4 hover:bg-muted/30">
                            <div className="flex justify-between items-center mb-2">
                              <h3 className="font-medium">{tournament.name}</h3>
                              <Badge variant="outline" className={
                                tournament.status === "Registration Open"
                                  ? "text-green-500 border-green-500/20 bg-green-500/10"
                                  : ""
                              }>
                                {tournament.status}
                              </Badge>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground mb-2">
                              <Calendar className="h-3 w-3 mr-1" />
                              <span>{tournament.date}</span>
                              <span className="mx-1">•</span>
                              <Users className="h-3 w-3 mr-1" />
                              <span>{tournament.participants} participants</span>
                              <span className="mx-1">•</span>
                              <Trophy className="h-3 w-3 mr-1" />
                              <span>Prize: {tournament.prize}</span>
                            </div>
                            <div className="flex gap-2 mt-3">
                              <Button size="sm">Register</Button>
                              <Button variant="outline" size="sm">Details</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="learn" className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Learning Resources</h2>
                    <Button>Submit Resource</Button>
                  </div>

                  <Card>
                    <CardContent className="p-0">
                      <div className="divide-y">
                        {[
                          {
                            title: "Mastering Chess Openings",
                            author: "GM John Doe",
                            type: "Video Course",
                            level: "Intermediate",
                            rating: 4.8,
                            reviews: 124
                          },
                          {
                            title: "Endgame Essentials",
                            author: "IM Jane Smith",
                            type: "eBook",
                            level: "All Levels",
                            rating: 4.9,
                            reviews: 89
                          },
                          {
                            title: "Tactical Patterns Every Player Should Know",
                            author: "FM Robert Johnson",
                            type: "Article Series",
                            level: "Beginner to Advanced",
                            rating: 4.7,
                            reviews: 56
                          }
                        ].map((resource, index) => (
                          <div key={index} className="p-4 hover:bg-muted/30">
                            <div className="flex justify-between items-center mb-2">
                              <h3 className="font-medium">{resource.title}</h3>
                              <Badge>{resource.type}</Badge>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground mb-2">
                              <span>By {resource.author}</span>
                              <span className="mx-1">•</span>
                              <span>{resource.level}</span>
                            </div>
                            <div className="flex items-center text-sm mb-3">
                              <div className="flex text-amber-500 mr-1">
                                {Array(5).fill(0).map((_, i) => (
                                  <span key={i}>{i < Math.floor(resource.rating) ? "★" : "☆"}</span>
                                ))}
                              </div>
                              <span>{resource.rating} ({resource.reviews} reviews)</span>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm">View Resource</Button>
                              <Button variant="outline" size="sm">Save for Later</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {activeTab === "discussions" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Join the Conversation</CardTitle>
                    <CardDescription>Share your thoughts or ask a question</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-3 mb-4">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {userProfile.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-grow">
                        <Textarea
                          placeholder="What's on your mind?"
                          className="mb-3 resize-none"
                          rows={3}
                          value={newPost.content}
                          onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                        />

                        <div className="flex flex-wrap gap-2 mb-3">
                          <Select
                            value={newPost.category}
                            onValueChange={(value) => setNewPost({...newPost, category: value})}
                          >
                            <SelectTrigger className="w-[140px]">
                              <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="general">General</SelectItem>
                              <SelectItem value="strategy">Strategy</SelectItem>
                              <SelectItem value="openings">Openings</SelectItem>
                              <SelectItem value="endgame">Endgame</SelectItem>
                              <SelectItem value="tournaments">Tournaments</SelectItem>
                              <SelectItem value="analysis">Analysis</SelectItem>
                            </SelectContent>
                          </Select>

                          <Input
                            placeholder="Add tags (comma separated)"
                            className="flex-grow"
                            value={newPost.tags}
                            onChange={(e) => setNewPost({...newPost, tags: e.target.value})}
                          />
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex gap-2">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-9 w-9 p-0"
                                    onClick={() => {
                                      toast({
                                        title: "Image Upload",
                                        description: "Image upload functionality is coming soon!",
                                        duration: 3000,
                                      });
                                    }}
                                  >
                                    <Image className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Add Image</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-9 w-9 p-0"
                                    onClick={() => {
                                      const url = prompt("Enter URL:");
                                      if (url) {
                                        setNewPost({
                                          ...newPost,
                                          content: newPost.content + `\n\n${url}`
                                        });
                                      }
                                    }}
                                  >
                                    <Link className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Add Link</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-9 w-9 p-0"
                                    onClick={() => {
                                      const pgn = prompt("Enter PGN notation:");
                                      if (pgn) {
                                        setNewPost({
                                          ...newPost,
                                          content: newPost.content + `\n\n\`\`\`pgn\n${pgn}\n\`\`\``
                                        });
                                      }
                                    }}
                                  >
                                    <FileText className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Add PGN</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-9 w-9 p-0"
                                    onClick={() => {
                                      const username = prompt("Enter username to mention:");
                                      if (username) {
                                        setNewPost({
                                          ...newPost,
                                          content: newPost.content + ` @${username}`
                                        });
                                      }
                                    }}
                                  >
                                    <AtSign className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Mention User</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-9 w-9 p-0"
                                    onClick={() => {
                                      toast({
                                        title: "Emoji Picker",
                                        description: "Emoji picker is coming soon!",
                                        duration: 3000,
                                      });
                                    }}
                                  >
                                    <Smile className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Add Emoji</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <Switch
                                id="public"
                                checked={newPost.isPublic}
                                onCheckedChange={(checked) => setNewPost({...newPost, isPublic: checked})}
                              />
                              <Label htmlFor="public" className="text-xs">Public</Label>
                            </div>
                            <Button
                              onClick={async () => {
                                if (!newPost.content.trim()) {
                                  toast({
                                    title: "Error",
                                    description: "Please enter some content for your post.",
                                    variant: "destructive",
                                  });
                                  return;
                                }

                                if (!user) {
                                  toast({
                                    title: "Authentication Required",
                                    description: "Please log in to create a post.",
                                    variant: "destructive",
                                  });
                                  return;
                                }

                                try {
                                  // Extract title from first line of content
                                  const title = newPost.content.split('\n')[0].substring(0, 100);
                                  const tags = newPost.tags.split(',').map(tag => tag.trim()).filter(tag => tag);

                                  // Create post in Supabase
                                  const { data, error } = await supabase
                                    .from('discussions')
                                    .insert({
                                      title,
                                      content: newPost.content,
                                      user_id: user.id,
                                      category: newPost.category,
                                      tags,
                                      is_public: newPost.isPublic,
                                    })
                                    .select();

                                  if (error) {
                                    console.error('Error creating post:', error);
                                    toast({
                                      title: "Error",
                                      description: "Failed to create post. Please try again.",
                                      variant: "destructive",
                                    });
                                    return;
                                  }

                                  // Reset form
                                  setNewPost({
                                    content: "",
                                    category: "general",
                                    tags: "",
                                    isPublic: true,
                                    attachments: []
                                  });

                                  toast({
                                    title: "Success",
                                    description: "Your post has been published!",
                                  });

                                  // The new post will be added via the real-time subscription
                                } catch (error) {
                                  console.error('Error creating post:', error);
                                  toast({
                                    title: "Error",
                                    description: "An unexpected error occurred. Please try again.",
                                    variant: "destructive",
                                  });
                                }
                              }}
                            >
                              Post
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border border-border p-4 bg-muted/30">
                      <h3 className="text-sm font-medium mb-2">Posting Guidelines</h3>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-0.5" />
                          <span>Be respectful and constructive in your discussions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-0.5" />
                          <span>Use appropriate categories and tags for better visibility</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-0.5" />
                          <span>Include PGN notation when sharing games for analysis</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <XCircle className="h-3 w-3 text-red-500 mt-0.5" />
                          <span>Avoid spam, self-promotion, or offensive content</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Gemini AI Assistant */}
      <div className="fixed bottom-4 left-4 z-40">
        <Dialog open={aiAssistantOpen} onOpenChange={setAiAssistantOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-full h-14 w-14 shadow-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600" size="icon">
              <Sparkles className="h-6 w-6" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-500" />
                Gemini Chess Assistant
              </DialogTitle>
              <DialogDescription>
                Ask anything about chess strategy, openings, or get game analysis
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 my-4">
              <ScrollArea className="h-[300px] pr-4">
                {aiResponse && (
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                          AI
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-muted p-3 rounded-lg text-sm">
                        <p className="font-medium text-xs text-muted-foreground mb-1">Gemini Chess Assistant</p>
                        <div className="prose prose-sm dark:prose-invert">
                          {aiResponse.split('\n').map((line, i) => (
                            <p key={i}>{line}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </ScrollArea>

              <div className="relative">
                <Textarea
                  placeholder="Ask about chess strategy, openings, or get game analysis..."
                  className="resize-none pr-12"
                  rows={3}
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleAiAssistant();
                    }
                  }}
                />
                <Button
                  size="icon"
                  className="absolute bottom-2 right-2 h-8 w-8"
                  onClick={handleAiAssistant}
                  disabled={aiLoading || !aiPrompt.trim()}
                >
                  {aiLoading ? (
                    <div className="h-4 w-4 border-2 border-current border-r-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>

              <div className="text-xs text-muted-foreground">
                <p>Example prompts:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {[
                    "Explain the Sicilian Defense",
                    "Analyze this position: 1.e4 e5 2.Nf3 Nc6 3.Bb5",
                    "How to improve my endgame?",
                    "What's the best response to the Queen's Gambit?",
                  ].map((prompt, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="h-auto py-1 text-xs"
                      onClick={() => {
                        setAiPrompt(prompt);
                      }}
                    >
                      {prompt}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <DialogFooter className="flex items-center justify-between">
              <div className="text-xs text-muted-foreground">
                Powered by Gemini AI
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setAiPrompt("");
                  setAiResponse("");
                }}
              >
                Clear Chat
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Live Chat */}
      <div className="fixed bottom-4 right-4 z-40">
        <Popover open={chatOpen} onOpenChange={setChatOpen}>
          <PopoverTrigger asChild>
            <Button className="rounded-full h-14 w-14 shadow-lg" size="icon">
              <MessageCircle className="h-6 w-6" />
              <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="border-b border-border/40 p-3 flex items-center justify-between">
              <h3 className="font-medium">Live Chat</h3>
              <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                12 Online
              </Badge>
            </div>
            <ScrollArea className="h-80">
              <div className="p-3 space-y-4">
                {chatMessages.map((message, index) => (
                  <div key={index} className={`flex gap-2 ${message.isCurrentUser ? 'flex-row-reverse' : ''}`}>
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarFallback className={message.isCurrentUser ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"}>
                        {message.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`max-w-[80%] ${message.isCurrentUser ? 'text-right' : ''}`}>
                      <div className={`rounded-lg p-2 ${message.isCurrentUser ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                        <p className="text-sm">{message.message}</p>
                      </div>
                      <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                        {!message.isCurrentUser && <span>{message.user}</span>}
                        <span>{message.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="border-t border-border/40 p-3">
              <div className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  className="flex-grow"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage();
                    }
                  }}
                />
                <Button
                  size="icon"
                  className="h-9 w-9 p-0"
                  onClick={handleSendMessage}
                  disabled={!chatMessage.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex justify-between items-center mt-2">
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 p-0"
                    onClick={() => {
                      toast({
                        title: "Emoji Picker",
                        description: "Emoji picker is coming soon!",
                        duration: 3000,
                      });
                    }}
                  >
                    <Smile className="h-4 w-4 text-muted-foreground" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 p-0"
                    onClick={() => {
                      toast({
                        title: "Image Upload",
                        description: "Image upload functionality is coming soon!",
                        duration: 3000,
                      });
                    }}
                  >
                    <Image className="h-4 w-4 text-muted-foreground" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 p-0"
                    onClick={() => {
                      const pgn = prompt("Enter PGN notation:");
                      if (pgn) {
                        setChatMessage(chatMessage + `\n\n${pgn}`);
                      }
                    }}
                  >
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground">
                  Press Enter to send
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Toast Provider */}
      <Toaster />
    </div>
  );
};

export default Community;
