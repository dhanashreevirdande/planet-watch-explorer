
import { Button } from "@/components/ui/button";
import { Earth } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";

const NotFound = () => {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center max-w-md">
        <div className="mb-6 flex justify-center">
          <Earth className="h-24 w-24 text-primary animate-pulse" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-xl text-muted-foreground mb-8">
          The planetary coordinates you're looking for seem to be in another galaxy.
        </p>
        <div className="space-y-4">
          <Button asChild size="lg" className="w-full">
            <Link to="/">
              Return to Dashboard
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full">
            <Link to="/world-map">
              Explore World Map
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
