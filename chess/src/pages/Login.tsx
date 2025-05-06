import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EyeIcon, EyeOffIcon, GithubIcon, FacebookIcon } from "lucide-react";
import Logo from "@/components/Logo";
import { useAuth } from "@/providers/AuthProvider";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

// Google icon component
const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="h-5 w-5">
    <path
      fill="#EA4335"
      d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
    />
    <path
      fill="#34A853"
      d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2970142 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
    />
    <path
      fill="#4A90E2"
      d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5818182 23.1272727,9.90909091 L12,9.90909091 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"
    />
    <path
      fill="#FBBC05"
      d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
    />
  </svg>
);

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { signIn, signUp, signInWithSocial, user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("login");

  // Login form state
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  // Register form state
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Form errors
  const [errors, setErrors] = useState({
    login: {
      email: "",
      password: "",
    },
    register: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    // If user is already logged in, redirect to home
    if (user) {
      navigate("/");
    }

    // Check if we should show the register tab
    const tab = searchParams.get("tab");
    if (tab === "register") {
      setActiveTab("register");
    }

    // Check for OAuth callback errors
    const errorDescription = searchParams.get('error_description');
    if (errorDescription) {
      toast.error("Authentication Error", {
        description: errorDescription,
      });
    }
  }, [user, navigate, searchParams]);

  // Handle social login
  const handleSocialLogin = async (provider: 'google' | 'facebook' | 'github') => {
    try {
      setSocialLoading(provider);
      const { error } = await signInWithSocial(provider);

      if (error) {
        console.error(`Error signing in with ${provider}:`, error);
        toast.error(`${provider} login failed`, {
          description: error.message,
        });
      }
    } catch (error) {
      console.error(`Error during ${provider} sign in:`, error);
      toast.error(`${provider} login failed`, {
        description: 'An unexpected error occurred',
      });
    } finally {
      setSocialLoading(null);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate form
    let valid = true;
    const newErrors = { ...errors };

    if (!loginForm.email) {
      newErrors.login.email = "Email is required";
      valid = false;
    }

    if (!loginForm.password) {
      newErrors.login.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);

    if (!valid) {
      setIsLoading(false);
      return;
    }

    try {
      console.log('Attempting login with email:', loginForm.email);

      // Attempt login with Supabase
      const { error } = await signIn(loginForm.email, loginForm.password);

      if (error) {
        console.error('Login error:', error);

        // Handle specific error cases
        if (error.message?.includes('Invalid login credentials')) {
          toast.error("Login failed", {
            description: "Invalid email or password. Please try again.",
          });
        } else if (error.message?.includes('Email not confirmed')) {
          toast.error("Email not verified", {
            description: "Please check your email to verify your account before logging in.",
          });
        } else {
          toast.error("Login failed", {
            description: error.message || "An unexpected error occurred",
          });
        }
      } else {
        // Login successful - redirect handled by useEffect
        console.log('Login successful');
        toast.success("Login successful", {
          description: "You are now logged in",
        });
      }
    } catch (err: any) {
      console.error('Unexpected login error:', err);
      toast.error("Login failed", {
        description: err?.message || "An unexpected error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate form
    let valid = true;
    const newErrors = { ...errors };

    if (!registerForm.name) {
      newErrors.register.name = "Name is required";
      valid = false;
    }

    if (!registerForm.email) {
      newErrors.register.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(registerForm.email)) {
      newErrors.register.email = "Email is invalid";
      valid = false;
    }

    if (!registerForm.password) {
      newErrors.register.password = "Password is required";
      valid = false;
    } else if (registerForm.password.length < 6) {
      newErrors.register.password = "Password must be at least 6 characters";
      valid = false;
    }

    if (!registerForm.confirmPassword) {
      newErrors.register.confirmPassword = "Please confirm your password";
      valid = false;
    } else if (registerForm.password !== registerForm.confirmPassword) {
      newErrors.register.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);

    if (!valid) {
      setIsLoading(false);
      return;
    }

    try {
      console.log('Attempting registration with email:', registerForm.email);

      // Generate a username from name and random number
      const username = registerForm.name.split(' ')[0].toLowerCase() + Math.floor(Math.random() * 1000);

      // Attempt registration with Supabase
      const { error } = await signUp(
        registerForm.email,
        registerForm.password,
        username,
        registerForm.name
      );

      if (error) {
        console.error('Registration error:', error);

        // Handle specific error cases
        if (error.message?.includes('already registered') || error.message?.includes('already exists')) {
          toast.error("Registration failed", {
            description: "This email is already registered. Please try logging in instead.",
          });
        } else {
          toast.error("Registration failed", {
            description: error.message || "An unexpected error occurred",
          });
        }
      } else {
        // Registration successful
        console.log('Registration successful');
        toast.success("Registration successful", {
          description: "Please check your email to verify your account.",
        });

        // Clear form and switch to login tab
        setRegisterForm({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        setActiveTab("login");
      }
    } catch (err: any) {
      console.error('Unexpected registration error:', err);
      toast.error("Registration failed", {
        description: err?.message || "An unexpected error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Logo size="large" />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                  Enter your email and password to access your account
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleLoginSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                    />
                    {errors.login.email && (
                      <p className="text-sm text-destructive">{errors.login.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
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
                    {errors.login.password && (
                      <p className="text-sm text-destructive">{errors.login.password}</p>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col space-y-4">
                  <Button className="w-full" type="submit" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>

                  <div className="relative my-2">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleSocialLogin('google')}
                      disabled={!!socialLoading}
                      className="w-full"
                    >
                      {socialLoading === 'google' ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                      ) : (
                        <GoogleIcon />
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleSocialLogin('facebook')}
                      disabled={!!socialLoading}
                      className="w-full"
                    >
                      {socialLoading === 'facebook' ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                      ) : (
                        <FacebookIcon className="h-5 w-5 text-blue-600" />
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleSocialLogin('github')}
                      disabled={!!socialLoading}
                      className="w-full"
                    >
                      {socialLoading === 'github' ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                      ) : (
                        <GithubIcon className="h-5 w-5" />
                      )}
                    </Button>
                  </div>

                  <Button
                    variant="link"
                    className="w-full p-0 h-auto font-normal text-sm text-muted-foreground"
                    type="button"
                    onClick={() => navigate("/reset-password")}
                  >
                    Forgot your password?
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>
                  Enter your details to create a new account
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleRegisterSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={registerForm.name}
                      onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})}
                    />
                    {errors.register.name && (
                      <p className="text-sm text-destructive">{errors.register.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={registerForm.email}
                      onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                    />
                    {errors.register.email && (
                      <p className="text-sm text-destructive">{errors.register.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="register-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={registerForm.password}
                        onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
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
                    {errors.register.password && (
                      <p className="text-sm text-destructive">{errors.register.password}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="••••••••"
                      value={registerForm.confirmPassword}
                      onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})}
                    />
                    {errors.register.confirmPassword && (
                      <p className="text-sm text-destructive">{errors.register.confirmPassword}</p>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col space-y-4">
                  <Button className="w-full" type="submit" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create account"}
                  </Button>

                  <div className="relative my-2">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">
                        Or sign up with
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleSocialLogin('google')}
                      disabled={!!socialLoading}
                      className="w-full"
                    >
                      {socialLoading === 'google' ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                      ) : (
                        <GoogleIcon />
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleSocialLogin('facebook')}
                      disabled={!!socialLoading}
                      className="w-full"
                    >
                      {socialLoading === 'facebook' ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                      ) : (
                        <FacebookIcon className="h-5 w-5 text-blue-600" />
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleSocialLogin('github')}
                      disabled={!!socialLoading}
                      className="w-full"
                    >
                      {socialLoading === 'github' ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                      ) : (
                        <GithubIcon className="h-5 w-5" />
                      )}
                    </Button>
                  </div>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;
