
import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StoryCard, Story } from "@/components/cards/StoryCard";
import { stories } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

const StoriesPage = () => {
  const [filteredStories, setFilteredStories] = useState<Story[]>(stories);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [isLoading, setIsLoading] = useState(false);

  // Filter and sort stories based on user selections
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate network request
    setTimeout(() => {
      let filtered = [...stories];
      
      // Filter by search term
      if (searchTerm) {
        filtered = filtered.filter(
          story => 
            story.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
            story.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            story.placeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            story.authorName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      // Sort stories
      switch (sortBy) {
        case "newest":
          filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          break;
        case "oldest":
          filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
          break;
        case "az":
          filtered.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case "za":
          filtered.sort((a, b) => b.title.localeCompare(a.title));
          break;
      }
      
      setFilteredStories(filtered);
      setIsLoading(false);
    }, 300);
  }, [searchTerm, sortBy]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container py-8">
        <div className="mb-12 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-serif font-medium mb-4">
            Cultural Stories
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Discover personal stories and experiences shared by explorers who visited cultural heritage sites around the world.
          </p>
        </div>
        
        {/* Search and Filter Section */}
        <div className="bg-card rounded-lg shadow-sm border p-6 mb-10 animate-fade-in">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  type="text"
                  placeholder="Search stories, places, or authors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="w-full md:w-48">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="az">A-Z</SelectItem>
                  <SelectItem value="za">Z-A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* Results Section */}
        <div className="mb-8">
          <p className="text-muted-foreground mb-6">
            Showing {filteredStories.length} stories
          </p>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div 
                  key={i}
                  className="bg-muted h-72 rounded-md border"
                ></div>
              ))}
            </div>
          ) : filteredStories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredStories.map((story, index) => (
                <div key={story.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <StoryCard story={story} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 animate-fade-in">
              <h3 className="text-xl font-medium mb-2">No stories found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default StoriesPage;
