import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PlaceCard, Place } from "@/components/cards/PlaceCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Heart, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://pakpetewdrnllukowjgc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBha3BldGV3ZHJubGx1a293amdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3ODA1NDYsImV4cCI6MjA2MjM1NjU0Nn0.L3sy3kkryCfdWFGUPNITAKsjvOcwpEjwbkysChsT4Zg';
const supabase = createClient(supabaseUrl, supabaseKey);

const categories = [
  { value: "all", label: "All Categories" },
  { value: "historical", label: "Historical" },
  { value: "religious", label: "Religious/Spiritual" },
  { value: "natural", label: "Natural Heritage" },
  { value: "architectural", label: "Architectural" },
  { value: "culinary", label: "Culinary" },
  { value: "festival", label: "Festival/Celebration" },
  { value: "art", label: "Art & Craft" },
  { value: "music", label: "Music & Dance" },
  { value: "cultural", label: "Cultural" },
  { value: "other", label: "Other" },
];

const sortOptions = [
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "az", label: "A-Z" },
  { value: "za", label: "Z-A" },
];

const ExplorePage = () => {
  const [allPlaces, setAllPlaces] = useState<Place[]>([]);
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [isLoading, setIsLoading] = useState(true);
  const { isLoggedIn, addToWishlist, isInWishlist } = useUser();
  const { toast } = useToast();

  // Fetch places from Supabase on component mount
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('addplace') // Your table name
          .select('*');
        
        if (error) {
          throw error;
        }

        // Add this before the formattedData mapping
        console.log('Raw data:', data);

        // Transform data to match your Place type if needed
        const formattedData = data.map(item => ({
          id: item.id?.toString() || '',
          name: item.name || '',
          description: item.description || '',
          location: item.location || '',
          category: item.category || 'other',
          rating: item.rating || 0,
          imageUrl: item.image_urls || '/placeholder.jpg',
          // Add other fields as needed
        }));

        setAllPlaces(formattedData);
        setFilteredPlaces(formattedData);
      } catch (error) {
        console.error('Error fetching places:', error);
        toast({
          title: "Error",
          description: "Failed to load places. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  // Filter and sort places based on user selections
  useEffect(() => {
    if (allPlaces.length === 0) return;

    setIsLoading(true);
    
    let filtered = [...allPlaces];
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        place => 
          place.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          place.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          place.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(place => place.category === selectedCategory);
    }
    
    // Sort places
    switch (sortBy) {
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      case "oldest":
        filtered.sort((a, b) => parseInt(a.id) - parseInt(b.id));
        break;
      case "az":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "za":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }
    
    setFilteredPlaces(filtered);
    setIsLoading(false);
  }, [searchTerm, selectedCategory, sortBy, allPlaces]);

  const handleAddToWishlist = (placeId: string, placeName: string) => {
    if (!isLoggedIn) {
      toast({
        title: "Login Required",
        description: "Please log in to add this place to your wishlist.",
        variant: "destructive",
      });
      return;
    }
    
    addToWishlist(placeId);
    toast({
      title: "Added to Wishlist",
      description: `${placeName} has been added to your wishlist.`,
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled by the useEffect
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container py-8">
        <div className="mb-12 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-serif font-medium mb-4">
            Explore Cultural Places
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Discover fascinating cultural sites, traditions, and heritage locations from around the world, shared and verified by our community.
          </p>
        </div>
        
        {/* Search and Filter Section */}
        <div className="bg-card rounded-lg shadow-sm border p-6 mb-10 animate-fade-in">
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input 
                    type="text"
                    placeholder="Search places, locations, or descriptions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="w-full md:w-48">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-full md:w-48">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button type="submit" className="md:w-auto">
                Search
              </Button>
            </div>
          </form>
        </div>
        
        {/* Results Section */}
        <div className="mb-8">
          <p className="text-muted-foreground mb-6">
            Showing {filteredPlaces.length} results
          </p>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <div 
                  key={i}
                  className="bg-muted h-72 rounded-md border"
                ></div>
              ))}
            </div>
          ) : filteredPlaces.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPlaces.map((place, index) => (
                <div key={place.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                  <PlaceCard 
                    place={place} 
                    actionButton={
                      <Button
                        variant="outline"
                        className={`w-full gap-2 ${isInWishlist(place.id) ? "bg-green-50" : ""}`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleAddToWishlist(place.id, place.name);
                        }}
                      >
                        <Heart className={isInWishlist(place.id) ? "fill-red-500 text-red-500" : ""} />
                        {isInWishlist(place.id) ? "Added to Wishlist" : "Add to Wishlist"}
                      </Button>
                    }
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 animate-fade-in">
              <h3 className="text-xl font-medium mb-2">No places found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ExplorePage;