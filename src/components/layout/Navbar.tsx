
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserPlus, LogIn, Menu, X, Map, Star, Image, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser } from "@/contexts/UserContext";
import { UserProfileMenu } from "@/components/user/UserProfileMenu";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn } = useUser();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 font-serif text-2xl font-bold">
            <span className="text-heritage-highlight">Cultural</span>
            <span className="text-heritage-DEFAULT">Explorer</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            Home
          </Link>
          <Link to="/explore" className="text-muted-foreground hover:text-foreground transition-colors">
            Explore
          </Link>
          <Link to="/map" className="text-muted-foreground hover:text-foreground transition-colors">
            Map
          </Link>
          <Link to="/gallery" className="text-muted-foreground hover:text-foreground transition-colors">
            Gallery
          </Link>
          <Link to="/stories" className="text-muted-foreground hover:text-foreground transition-colors">
            Stories
          </Link>
          <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
            About
          </Link>
        </nav>
        
        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <Link to="/submit">
                <Button variant="outline">Submit Place</Button>
              </Link>
              <UserProfileMenu />
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" size="sm" className="gap-2">
                  <LogIn className="h-4 w-4" /> Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="gap-2">
                  <UserPlus className="h-4 w-4" /> Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
        
        {/* Mobile menu button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>
      
      {/* Mobile menu */}
      <div className={cn(
        "fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in md:hidden bg-background",
        isMenuOpen ? "slide-in-from-top-2" : "hidden"
      )}>
        <div className="relative z-20 grid gap-6 rounded-md p-4">
          <nav className="grid grid-flow-row auto-rows-max text-lg gap-4">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-foreground hover:text-heritage-DEFAULT transition-colors" 
              onClick={() => setIsMenuOpen(false)}
            >
              <Home className="h-5 w-5" /> Home
            </Link>
            <Link 
              to="/explore" 
              className="flex items-center gap-2 text-foreground hover:text-heritage-DEFAULT transition-colors" 
              onClick={() => setIsMenuOpen(false)}
            >
              <Star className="h-5 w-5" /> Explore
            </Link>
            <Link 
              to="/map" 
              className="flex items-center gap-2 text-foreground hover:text-heritage-DEFAULT transition-colors" 
              onClick={() => setIsMenuOpen(false)}
            >
              <Map className="h-5 w-5" /> Map
            </Link>
            <Link 
              to="/gallery" 
              className="flex items-center gap-2 text-foreground hover:text-heritage-DEFAULT transition-colors" 
              onClick={() => setIsMenuOpen(false)}
            >
              <Image className="h-5 w-5" /> Gallery
            </Link>
            <Link 
              to="/stories" 
              className="flex items-center gap-2 text-foreground hover:text-heritage-DEFAULT transition-colors" 
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="h-5 w-5">📝</span> Stories
            </Link>
            <Link 
              to="/about" 
              className="flex items-center gap-2 text-foreground hover:text-heritage-DEFAULT transition-colors" 
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="h-5 w-5">i</span> About
            </Link>
          </nav>
          
          <div className="flex flex-col gap-4 pt-4 border-t">
            {isLoggedIn ? (
              <Link to="/submit" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full">Submit Place</Button>
              </Link>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full gap-2">
                    <LogIn className="h-4 w-4" /> Login
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full gap-2">
                    <UserPlus className="h-4 w-4" /> Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
