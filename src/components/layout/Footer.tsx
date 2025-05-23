
import { Link } from "react-router-dom";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <Link to="/" className="inline-block mb-4">
              <div className="font-serif text-2xl font-bold">
                <span className="text-heritage-highlight">Cultural</span>
                <span className="text-heritage-DEFAULT">Explorer</span>
              </div>
            </Link>
            <p className="text-muted-foreground max-w-xs">
              Discover and explore local cultural places and traditions from around the world.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 md:col-span-2 md:grid-cols-3">
            <div>
              <h3 className="text-lg font-medium mb-4">Explore</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/map" className="text-muted-foreground hover:text-foreground transition-colors">
                    Map
                  </Link>
                </li>
                <li>
                  <Link to="/gallery" className="text-muted-foreground hover:text-foreground transition-colors">
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link to="/explore" className="text-muted-foreground hover:text-foreground transition-colors">
                    Recent Submissions
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Community</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/submit" className="text-muted-foreground hover:text-foreground transition-colors">
                    Submit Place
                  </Link>
                </li>
                <li>
                  <Link to="/guidelines" className="text-muted-foreground hover:text-foreground transition-colors">
                    Guidelines
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t flex flex-col md:flex-row justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Cultural Explorer. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Twitter
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Instagram
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
