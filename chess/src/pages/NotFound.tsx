
import { Button } from "@/components/ui/button";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Logo from "@/components/Logo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="text-center max-w-md">
        <div className="inline-block mb-6 relative">
          <div className="absolute inset-0 bg-red-500/10 rounded-full blur-xl"></div>
          <Logo size="large" />
        </div>
        
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-lg text-muted-foreground mb-8">
          The chess piece you're looking for has been captured! The page you requested doesn't exist.
        </p>
        
        <div className="flex justify-center">
          <Button asChild size="lg">
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
