import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "@/providers/ThemeProvider";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";
import { ArrowLeft, Save, User, Bell, Shield, Palette, Volume2, Gamepad2 } from "lucide-react";
import { Link } from "react-router-dom";

type User = {
  name: string;
  email: string;
  isLoggedIn: boolean;
  avatar?: string;
};

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    avatar: "",
    notifications: {
      gameInvites: true,
      friendRequests: true,
      tournamentUpdates: true,
      marketingEmails: false,
    },
    preferences: {
      autoPromoteQueen: true,
      showValidMoves: true,
      showCoordinates: true,
      soundEffects: true,
      musicVolume: 50,
      sfxVolume: 70,
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: "30min",
    }
  });

  useEffect(() => {
    // Load user data from localStorage
    const storedUser = localStorage.getItem("chess-user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setFormData(prev => ({
          ...prev,
          name: parsedUser.name || "",
          email: parsedUser.email || "",
          avatar: parsedUser.avatar || "",
        }));
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    }
  }, []);

  const handleSaveProfile = () => {
    if (!user) return;

    // Update user in localStorage
    const updatedUser = {
      ...user,
      name: formData.name,
      email: formData.email,
      avatar: formData.avatar,
    };

    localStorage.setItem("chess-user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    toast.success("Profile updated successfully");
  };

  const handleSavePreferences = () => {
    toast.success("Preferences saved successfully");
  };

  const handleSaveNotifications = () => {
    toast.success("Notification settings saved");
  };

  const handleSaveSecurity = () => {
    toast.success("Security settings updated");
  };

  if (!user?.isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Settings</h1>
            <Card>
              <CardContent className="py-10">
                <p className="mb-4">You need to be logged in to access settings.</p>
                <Button asChild>
                  <Link to="/login">Login</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-20 px-4 pb-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6 gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">Settings</h1>
          </div>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Profile</span>
              </TabsTrigger>
              <TabsTrigger value="preferences" className="flex items-center gap-2">
                <Gamepad2 className="h-4 w-4" />
                <span className="hidden sm:inline">Game</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Security</span>
              </TabsTrigger>
            </TabsList>

            {/* Profile Settings */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>
                    Manage your personal information and account details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col sm:flex-row gap-6 items-start">
                    <div className="flex flex-col items-center gap-2">
                      <Avatar className="w-24 h-24">
                        <AvatarImage src={formData.avatar || ""} alt={formData.name} />
                        <AvatarFallback className="text-2xl">{formData.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm">Change Avatar</Button>
                    </div>

                    <div className="flex-1 space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Display Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Account Statistics</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="bg-muted/50 p-3 rounded-lg text-center">
                        <div className="text-2xl font-bold">45</div>
                        <div className="text-sm text-muted-foreground">Games Played</div>
                      </div>
                      <div className="bg-muted/50 p-3 rounded-lg text-center">
                        <div className="text-2xl font-bold">28</div>
                        <div className="text-sm text-muted-foreground">Wins</div>
                      </div>
                      <div className="bg-muted/50 p-3 rounded-lg text-center">
                        <div className="text-2xl font-bold">12</div>
                        <div className="text-sm text-muted-foreground">Losses</div>
                      </div>
                      <div className="bg-muted/50 p-3 rounded-lg text-center">
                        <div className="text-2xl font-bold">5</div>
                        <div className="text-sm text-muted-foreground">Draws</div>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button variant="ghost" size="sm" asChild>
                        <Link to="/profile">View detailed statistics</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveProfile} className="ml-auto">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Game Preferences */}
            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle>Game Preferences</CardTitle>
                  <CardDescription>
                    Customize your gameplay experience and appearance settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Gameplay</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="auto-promote" className="font-medium">Auto-promote to Queen</Label>
                          <p className="text-sm text-muted-foreground">Automatically promote pawns to queens</p>
                        </div>
                        <Switch
                          id="auto-promote"
                          checked={formData.preferences.autoPromoteQueen}
                          onCheckedChange={(checked) => setFormData({
                            ...formData,
                            preferences: {...formData.preferences, autoPromoteQueen: checked}
                          })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="show-moves" className="font-medium">Show Valid Moves</Label>
                          <p className="text-sm text-muted-foreground">Highlight valid moves when selecting a piece</p>
                        </div>
                        <Switch
                          id="show-moves"
                          checked={formData.preferences.showValidMoves}
                          onCheckedChange={(checked) => setFormData({
                            ...formData,
                            preferences: {...formData.preferences, showValidMoves: checked}
                          })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="show-coords" className="font-medium">Show Coordinates</Label>
                          <p className="text-sm text-muted-foreground">Display board coordinates (a-h, 1-8)</p>
                        </div>
                        <Switch
                          id="show-coords"
                          checked={formData.preferences.showCoordinates}
                          onCheckedChange={(checked) => setFormData({
                            ...formData,
                            preferences: {...formData.preferences, showCoordinates: checked}
                          })}
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Appearance</h3>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="theme">Theme</Label>
                        <Select
                          value={theme}
                          onValueChange={(value: any) => setTheme(value)}
                        >
                          <SelectTrigger id="theme" className="w-full">
                            <SelectValue placeholder="Select theme" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Sound</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="sound-effects" className="font-medium">Sound Effects</Label>
                          <p className="text-sm text-muted-foreground">Enable game sound effects</p>
                        </div>
                        <Switch
                          id="sound-effects"
                          checked={formData.preferences.soundEffects}
                          onCheckedChange={(checked) => setFormData({
                            ...formData,
                            preferences: {...formData.preferences, soundEffects: checked}
                          })}
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="music-volume">Music Volume</Label>
                          <span className="text-sm text-muted-foreground">{formData.preferences.musicVolume}%</span>
                        </div>
                        <Input
                          id="music-volume"
                          type="range"
                          min="0"
                          max="100"
                          value={formData.preferences.musicVolume}
                          onChange={(e) => setFormData({
                            ...formData,
                            preferences: {...formData.preferences, musicVolume: parseInt(e.target.value)}
                          })}
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="sfx-volume">SFX Volume</Label>
                          <span className="text-sm text-muted-foreground">{formData.preferences.sfxVolume}%</span>
                        </div>
                        <Input
                          id="sfx-volume"
                          type="range"
                          min="0"
                          max="100"
                          value={formData.preferences.sfxVolume}
                          onChange={(e) => setFormData({
                            ...formData,
                            preferences: {...formData.preferences, sfxVolume: parseInt(e.target.value)}
                          })}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Advanced Chess Settings</h3>
                    <div className="space-y-3">
                      <div className="grid gap-2">
                        <Label htmlFor="default-time-control">Default Time Control</Label>
                        <Select
                          defaultValue="10min"
                          onValueChange={(value) => {}}
                        >
                          <SelectTrigger id="default-time-control">
                            <SelectValue placeholder="Select time control" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1min">1 minute (Bullet)</SelectItem>
                            <SelectItem value="3min">3 minutes (Blitz)</SelectItem>
                            <SelectItem value="5min">5 minutes (Blitz)</SelectItem>
                            <SelectItem value="10min">10 minutes (Rapid)</SelectItem>
                            <SelectItem value="30min">30 minutes (Classical)</SelectItem>
                            <SelectItem value="unlimited">Unlimited</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="default-ai-difficulty">Default AI Difficulty</Label>
                        <Select
                          defaultValue="medium"
                          onValueChange={(value) => {}}
                        >
                          <SelectTrigger id="default-ai-difficulty">
                            <SelectValue placeholder="Select AI difficulty" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="easy">Easy</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="hard">Hard</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="premove" className="font-medium">Enable Premoves</Label>
                          <p className="text-sm text-muted-foreground">Queue your next move while opponent is thinking</p>
                        </div>
                        <Switch
                          id="premove"
                          defaultChecked={true}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="legal-moves-only" className="font-medium">Legal Moves Only</Label>
                          <p className="text-sm text-muted-foreground">Only allow legal chess moves</p>
                        </div>
                        <Switch
                          id="legal-moves-only"
                          defaultChecked={true}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSavePreferences} className="ml-auto">
                    <Save className="mr-2 h-4 w-4" />
                    Save Preferences
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Notification Settings */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>
                    Manage how and when you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="game-invites" className="font-medium">Game Invites</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications for game invitations</p>
                      </div>
                      <Switch
                        id="game-invites"
                        checked={formData.notifications.gameInvites}
                        onCheckedChange={(checked) => setFormData({
                          ...formData,
                          notifications: {...formData.notifications, gameInvites: checked}
                        })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="friend-requests" className="font-medium">Friend Requests</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications for friend requests</p>
                      </div>
                      <Switch
                        id="friend-requests"
                        checked={formData.notifications.friendRequests}
                        onCheckedChange={(checked) => setFormData({
                          ...formData,
                          notifications: {...formData.notifications, friendRequests: checked}
                        })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="tournament-updates" className="font-medium">Tournament Updates</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications for tournament updates</p>
                      </div>
                      <Switch
                        id="tournament-updates"
                        checked={formData.notifications.tournamentUpdates}
                        onCheckedChange={(checked) => setFormData({
                          ...formData,
                          notifications: {...formData.notifications, tournamentUpdates: checked}
                        })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="marketing-emails" className="font-medium">Marketing Emails</Label>
                        <p className="text-sm text-muted-foreground">Receive promotional emails and updates</p>
                      </div>
                      <Switch
                        id="marketing-emails"
                        checked={formData.notifications.marketingEmails}
                        onCheckedChange={(checked) => setFormData({
                          ...formData,
                          notifications: {...formData.notifications, marketingEmails: checked}
                        })}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveNotifications} className="ml-auto">
                    <Save className="mr-2 h-4 w-4" />
                    Save Notification Settings
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Security Settings */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your account security and privacy
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="two-factor" className="font-medium">Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                      </div>
                      <Switch
                        id="two-factor"
                        checked={formData.security.twoFactorAuth}
                        onCheckedChange={(checked) => setFormData({
                          ...formData,
                          security: {...formData.security, twoFactorAuth: checked}
                        })}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="session-timeout">Session Timeout</Label>
                      <Select
                        value={formData.security.sessionTimeout}
                        onValueChange={(value) => setFormData({
                          ...formData,
                          security: {...formData.security, sessionTimeout: value}
                        })}
                      >
                        <SelectTrigger id="session-timeout">
                          <SelectValue placeholder="Select timeout" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15min">15 minutes</SelectItem>
                          <SelectItem value="30min">30 minutes</SelectItem>
                          <SelectItem value="1hour">1 hour</SelectItem>
                          <SelectItem value="4hours">4 hours</SelectItem>
                          <SelectItem value="never">Never</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-muted-foreground">
                        Automatically log out after period of inactivity
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Account Actions</h3>
                    <div className="flex flex-col gap-2">
                      <Button variant="outline">Change Password</Button>
                      <Button variant="outline" className="text-destructive">Delete Account</Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveSecurity} className="ml-auto">
                    <Save className="mr-2 h-4 w-4" />
                    Save Security Settings
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Settings;
