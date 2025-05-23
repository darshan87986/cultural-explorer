import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PlaceCard, Place } from "@/components/cards/PlaceCard";
import { StoryCard, Story } from "@/components/cards/StoryCard";
import { places, stories } from "@/data/mockData";
import { MapPin, Search, Star, ImagePlus } from "lucide-react";

const HomePage = () => {
  const [featuredPlaces, setFeaturedPlaces] = useState<Place[]>([]);
  const [featuredStories, setFeaturedStories] = useState<Story[]>([]);
  
  useEffect(() => {
    // Simulate getting featured places
    setFeaturedPlaces(places.slice(0, 4));
    
    // Simulate getting featured stories
    setFeaturedStories(stories.slice(0, 3));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative animate-fade-in">
        <div className="absolute inset-0 bg-black/70 z-10" />
        <div 
          className="h-[80vh] bg-cover bg-center"
          style={{ backgroundImage: "url('luca-bravo-O453M2Liufs-unsplash.jpg')" }}
        >
          <div className="container relative z-20 h-full flex flex-col justify-center items-center text-center text-white space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold max-w-3xl animate-fade-in">
              Discover and Explore Local Cultural Treasures
            </h1>
            <p className="text-lg md:text-xl max-w-2xl text-white/90 animate-fade-in">
              Join our community to explore, share, and preserve cultural heritage from around the world.
            </p>
            <div className="flex flex-wrap gap-4 justify-center animate-slide-in">
              <Link to="/explore">
                <Button size="lg" className="gap-2">
                  <Star className="h-5 w-5" /> Explore Places
                </Button>
              </Link>
              <Link to="/map">
                <Button size="lg" variant="secondary" className="gap-2">
                  <MapPin className="h-5 w-5" /> Open Map
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 md:py-24 bg-muted/30 animate-fade-in">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-center mb-12">
            Explore Cultural Heritage Your Way
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-6">
              <div className="h-16 w-16 rounded-full bg-heritage-DEFAULT/10 flex items-center justify-center mb-4">
                <MapPin className="h-8 w-8 text-heritage-DEFAULT" />
              </div>
              <h3 className="text-xl font-medium mb-2">Discover Places</h3>
              <p className="text-muted-foreground">
                Explore cultural sites and hidden gems submitted by our global community.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6">
              <div className="h-16 w-16 rounded-full bg-heritage-DEFAULT/10 flex items-center justify-center mb-4">
                <ImagePlus className="h-8 w-8 text-heritage-DEFAULT" />
              </div>
              <h3 className="text-xl font-medium mb-2">Share Stories</h3>
              <p className="text-muted-foreground">
                Submit your own cultural places and stories to preserve traditions.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6">
              <div className="h-16 w-16 rounded-full bg-heritage-DEFAULT/10 flex items-center justify-center mb-4">
                <Star className="h-8 w-8 text-heritage-DEFAULT" />
              </div>
              <h3 className="text-xl font-medium mb-2">Rate & Review</h3>
              <p className="text-muted-foreground">
                Help others discover authentic experiences through your ratings.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6">
              <div className="h-16 w-16 rounded-full bg-heritage-DEFAULT/10 flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-heritage-DEFAULT" />
              </div>
              <h3 className="text-xl font-medium mb-2">Map Navigation</h3>
              <p className="text-muted-foreground">
                Find cultural hotspots near you with our interactive map.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Places Section */}
      <section className="py-16 md:py-24 animate-fade-in">
        <div className="container">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-medium">
              Featured Cultural Places
            </h2>
            <Link to="/explore">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPlaces.map(place => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Heritage Stories Section */}
      <section className="py-16 md:py-24 bg-heritage-pattern-bg animate-fade-in">
        <div className="container">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-medium">
              Cultural Heritage Stories
            </h2>
            <Link to="/stories">
              <Button variant="outline">More Stories</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredStories.map(story => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-heritage-highlight text-white animate-fade-in">
        <div className="container text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-serif font-medium">
            Join Our Community of Cultural Explorers
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-white/90">
            Sign up today to share your own discoveries, connect with other explorers, 
            and help preserve our global cultural heritage.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Link to="/signup">
              <Button size="lg" variant="secondary" className="text-heritage-highlight">
                Create an Account
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="text-[#ea384c] border-white hover:bg-white/10">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default HomePage;
