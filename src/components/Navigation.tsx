
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import { Earth } from "lucide-react";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export function Navigation() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { label: "Dashboard", path: "/" },
    { label: "World Map", path: "/world-map" },
    { label: "Insights", path: "/insights" }
  ];

  // Close mobile menu when navigating
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Earth className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg hidden md:inline-block">Planetary Health</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.label}>
                  <Link to={item.path}>
                    <NavigationMenuLink className={cn(
                      navigationMenuTriggerStyle(),
                      location.pathname === item.path && "bg-accent text-accent-foreground"
                    )}>
                      {item.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            onClick={toggleTheme}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t px-4 py-2 bg-background">
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium",
                  location.pathname === item.path 
                    ? "bg-accent text-accent-foreground" 
                    : "hover:bg-muted"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
