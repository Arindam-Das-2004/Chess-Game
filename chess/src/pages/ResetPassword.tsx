import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Logo from "@/components/Logo";
import { useAuth } from "@/providers/AuthProvider";
import { toast } from "sonner";
import supabase from "@/config/SupabaseClient";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { resetPassword } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);
  
  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Form errors
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    // Check if we have a hash fragment in the URL (from password reset email)
    const hash = location.hash;
    if (hash && hash.includes('type=recovery')) {
      setIsResetMode(true);
    }
  }, [location]);

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validate form
    let valid = true;
    const newErrors = { ...errors };
    
    if (!email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }
    
    setErrors(newErrors);
    
    if (!valid) {
      setIsLoading(false);
      return;
    }
    
    // Send reset password email
    const { error } = await resetPassword(email);
    
    setIsLoading(false);
    
    if (error) {
      toast.error("Error sending reset email", {
        description: error.message,
      });
    } else {
      toast.success("Reset email sent", {
        description: "Please check your email for the reset link",
      });
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validate form
    let valid = true;
    const newErrors = { ...errors };
    
    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      valid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }
    
    setErrors(newErrors);
    
    if (!valid) {
      setIsLoading(false);
      return;
    }
    
    // Update password
    const { error } = await supabase.auth.updateUser({
      password: password
    });
    
    setIsLoading(false);
    
    if (error) {
      toast.error("Error resetting password", {
        description: error.message,
      });
    } else {
      toast.success("Password updated successfully", {
        description: "You can now log in with your new password",
      });
      
      // Redirect to login page after a short delay
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Logo size="large" />
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>{isResetMode ? "Set New Password" : "Reset Password"}</CardTitle>
            <CardDescription>
              {isResetMode 
                ? "Enter your new password below" 
                : "Enter your email and we'll send you a reset link"}
            </CardDescription>
          </CardHeader>
          
          {isResetMode ? (
            <form onSubmit={handlePasswordReset}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">New Password</Label>
                  <div className="relative">
                    <Input 
                      id="password" 
                      type={showPassword ? "text" : "password"} 
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button 
                      type="button"
                      variant="ghost" 
                      size="icon" 
                      className="absolute right-0 top-0 h-full"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                    </Button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-destructive">{errors.password}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input 
                    id="confirm-password" 
                    type="password" 
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {errors.confirmPassword && (
                    <p className="text-sm text-destructive">{errors.confirmPassword}</p>
                  )}
                </div>
              </CardContent>
              
              <CardFooter>
                <Button className="w-full" type="submit" disabled={isLoading}>
                  {isLoading ? "Updating password..." : "Update Password"}
                </Button>
              </CardFooter>
            </form>
          ) : (
            <form onSubmit={handleResetRequest}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-2">
                <Button className="w-full" type="submit" disabled={isLoading}>
                  {isLoading ? "Sending reset link..." : "Send Reset Link"}
                </Button>
                <Button 
                  variant="ghost" 
                  type="button" 
                  className="w-full"
                  onClick={() => navigate("/login")}
                >
                  Back to Login
                </Button>
              </CardFooter>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
