import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Trophy, Calendar, Users, Medal, Clock, MapPin, DollarSign, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const NextTournament = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for registering! You will receive a confirmation email shortly.');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-4">Summer Chess Championship 2023</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join our biggest online tournament of the year and compete with players from around the world
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Tournament Details */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="border-2 border-primary/20 shadow-lg bg-gradient-to-br from-card to-card/80">
                <CardHeader className="border-b border-border/40 bg-muted/30">
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-6 w-6 text-primary" />
                    Tournament Details
                  </CardTitle>
                  <CardDescription>
                    Everything you need to know about the upcoming championship
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <Calendar className="h-6 w-6 text-primary shrink-0 mt-1" />
                      <div>
                        <h3 className="font-medium">Date & Time</h3>
                        <p className="text-sm text-muted-foreground">Saturday, June 10, 2023</p>
                        <p className="text-sm text-muted-foreground">Starting at 2:00 PM UTC</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <Clock className="h-6 w-6 text-primary shrink-0 mt-1" />
                      <div>
                        <h3 className="font-medium">Format</h3>
                        <p className="text-sm text-muted-foreground">Swiss System, 7 Rounds</p>
                        <p className="text-sm text-muted-foreground">Time Control: 15+10 (15 minutes with 10 second increment)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <Users className="h-6 w-6 text-primary shrink-0 mt-1" />
                      <div>
                        <h3 className="font-medium">Eligibility</h3>
                        <p className="text-sm text-muted-foreground">Open to all SmartChess members</p>
                        <p className="text-sm text-muted-foreground">Players of all ratings welcome</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <MapPin className="h-6 w-6 text-primary shrink-0 mt-1" />
                      <div>
                        <h3 className="font-medium">Platform</h3>
                        <p className="text-sm text-muted-foreground">All games will be played on the SmartChess platform</p>
                        <p className="text-sm text-muted-foreground">Players must be online 15 minutes before start time</p>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                      <div className="flex items-center gap-3 mb-2">
                        <DollarSign className="h-6 w-6 text-primary" />
                        <h3 className="font-medium">Prize Pool</h3>
                      </div>
                      <div className="pl-9">
                        <p className="text-xl font-bold text-primary mb-2">$5,000</p>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li className="flex items-center gap-2">
                            <Medal className="h-4 w-4 text-yellow-500" />
                            1st Place: $2,000
                          </li>
                          <li className="flex items-center gap-2">
                            <Medal className="h-4 w-4 text-gray-400" />
                            2nd Place: $1,000
                          </li>
                          <li className="flex items-center gap-2">
                            <Medal className="h-4 w-4 text-amber-700" />
                            3rd Place: $500
                          </li>
                          <li>Plus category prizes and special awards</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-medium">Tournament Rules</h3>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-primary shrink-0 mt-1" />
                          <span>All games will be played on the SmartChess platform</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-primary shrink-0 mt-1" />
                          <span>Players must be online and ready 15 minutes before the start time</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-primary shrink-0 mt-1" />
                          <span>Fair play monitoring will be in effect for all games</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-primary shrink-0 mt-1" />
                          <span>Tiebreaks: Buchholz, Sonneborn-Berger, Direct Encounter</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-primary shrink-0 mt-1" />
                          <span>Tournament Director's decisions are final</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="pt-2">
                      <div className="text-center p-3 bg-primary/5 rounded-lg border border-primary/10">
                        <div className="text-sm text-muted-foreground mb-1">Registration Closes In</div>
                        <div className="text-2xl font-bold text-primary">14 Days</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Registration Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="border border-border shadow-md">
                <CardHeader className="border-b border-border/40 bg-muted/30">
                  <CardTitle>Registration Form</CardTitle>
                  <CardDescription>
                    Fill out the form below to register for the tournament
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input id="fullName" placeholder="Enter your full name" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input id="email" type="email" placeholder="Enter your email address" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="username">SmartChess Username *</Label>
                      <Input id="username" placeholder="Enter your SmartChess username" required />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="rating">Current Rating (if known)</Label>
                        <Input id="rating" type="number" placeholder="e.g. 1500" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="country">Country *</Label>
                        <Select required>
                          <SelectTrigger id="country">
                            <SelectValue placeholder="Select your country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="us">United States</SelectItem>
                            <SelectItem value="ca">Canada</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                            <SelectItem value="in">India</SelectItem>
                            <SelectItem value="ru">Russia</SelectItem>
                            <SelectItem value="cn">China</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Chess Title (if any)</Label>
                        <Select>
                          <SelectTrigger id="title">
                            <SelectValue placeholder="None" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="cm">CM</SelectItem>
                            <SelectItem value="fm">FM</SelectItem>
                            <SelectItem value="im">IM</SelectItem>
                            <SelectItem value="gm">GM</SelectItem>
                            <SelectItem value="wfm">WFM</SelectItem>
                            <SelectItem value="wim">WIM</SelectItem>
                            <SelectItem value="wgm">WGM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="entryType">Entry Type *</Label>
                        <Select required>
                          <SelectTrigger id="entryType">
                            <SelectValue placeholder="Select entry type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="standard">Standard Entry ($15)</SelectItem>
                            <SelectItem value="premium">Premium Member ($10)</SelectItem>
                            <SelectItem value="titled">Titled Player (Free)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="comments">Additional Comments</Label>
                      <Textarea id="comments" placeholder="Any special requests or information" />
                    </div>
                    
                    <div className="flex items-start space-x-2 pt-2">
                      <Checkbox id="terms" required />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I agree to the tournament rules and fair play policy *
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <Checkbox id="notifications" />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="notifications"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Send me notifications about future tournaments
                        </label>
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full mt-6">Register Now</Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Have questions about the tournament? Contact us at <span className="text-primary">support@smartchess.com</span>
            </p>
            <Button variant="outline" asChild>
              <Link to="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </main>
      
      <footer className="bg-muted py-6 border-t">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; 2023 SmartChess. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default NextTournament;
