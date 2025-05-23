import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  wishlist: string[]; // Array of place IDs
  visitedPlaces: string[]; // Array of place IDs
}

interface UserContextType {
  isLoggedIn: boolean;
  userProfile: UserProfile | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  addToWishlist: (placeId: string) => void;
  removeFromWishlist: (placeId: string) => void;
  addToVisited: (placeId: string) => void;
  removeFromVisited: (placeId: string) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  isInWishlist: (placeId: string) => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Sample user data for demonstration
const sampleUser: UserProfile = {
  id: "user1",
  name: "John Doe",
  email: "john@example.com",
  phone: "+1 (555) 123-4567",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  wishlist: [],
  visitedPlaces: ["place3"]
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Load user data from localStorage on component mount
  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(isLoggedIn);

    // Load user profile and wishlist
    if (isLoggedIn) {
      const storedProfile = localStorage.getItem('userProfile');
      const storedWishlist = localStorage.getItem('wishlist');
      
      if (storedProfile) {
        const profile = JSON.parse(storedProfile);
        setUserProfile(profile);
      }
      
      if (!storedWishlist) {
        localStorage.setItem('wishlist', '[]');
      }
    }
  }, []);

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    if (isLoggedIn && userProfile) {
      localStorage.setItem('userProfile', JSON.stringify(userProfile));
      localStorage.setItem('isLoggedIn', 'true');
    } else if (!isLoggedIn) {
      localStorage.removeItem('userProfile');
      localStorage.setItem('isLoggedIn', 'false');
    }
  }, [isLoggedIn, userProfile]);

  const login = async (email: string, password: string) => {
    try {
      // This would be an actual API call in a real app
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, any credentials work
      // Check if there's a stored user profile
      const storedUser = localStorage.getItem('userProfile');
      if (storedUser) {
        setUserProfile(JSON.parse(storedUser));
      } else {
        // Initialize with sample user if no stored profile
        setUserProfile({
          ...sampleUser,
          email: email, // Use the provided email
          wishlist: [] // Initialize with empty wishlist
        });
      }
      
      setIsLoggedIn(true);
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserProfile(null);
    localStorage.removeItem('userProfile');
    localStorage.setItem('isLoggedIn', 'false');
  };

  const addToWishlist = (placeId: string) => {
    if (!userProfile) return;
    
    // Get current wishlist from localStorage
    const wishlistData = JSON.parse(localStorage.getItem('wishlist') || '[]');
    
    if (!wishlistData.includes(placeId)) {
      const updatedWishlist = [...wishlistData, placeId];
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      
      const updatedProfile = {
        ...userProfile,
        wishlist: updatedWishlist
      };
      setUserProfile(updatedProfile);
      localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
    }
  };

  const removeFromWishlist = (placeId: string) => {
    if (!userProfile) return;
    
    // Get current wishlist from localStorage
    const wishlistData = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const updatedWishlist = wishlistData.filter((id: string) => id !== placeId);
    
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    
    const updatedProfile = {
      ...userProfile,
      wishlist: updatedWishlist
    };
    setUserProfile(updatedProfile);
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
  };

  const isInWishlist = (placeId: string) => {
    // Check wishlist in localStorage
    const wishlistData = JSON.parse(localStorage.getItem('wishlist') || '[]');
    return wishlistData.includes(placeId);
  };

  const addToVisited = (placeId: string) => {
    if (!userProfile) return;
    
    if (!userProfile.visitedPlaces.includes(placeId)) {
      const updatedProfile = {
        ...userProfile,
        visitedPlaces: [...userProfile.visitedPlaces, placeId]
      };
      setUserProfile(updatedProfile);
      
      // Update localStorage
      localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
    }
  };

  const removeFromVisited = (placeId: string) => {
    if (!userProfile) return;
    
    const updatedProfile = {
      ...userProfile,
      visitedPlaces: userProfile.visitedPlaces.filter(id => id !== placeId)
    };
    setUserProfile(updatedProfile);
    
    // Update localStorage
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!userProfile) return;
    
    const updatedProfile = {
      ...userProfile,
      ...updates
    };
    setUserProfile(updatedProfile);
    
    // Update localStorage
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
  };

  return (
    <UserContext.Provider 
      value={{ 
        isLoggedIn, 
        userProfile, 
        login, 
        logout,
        addToWishlist,
        removeFromWishlist,
        addToVisited,
        removeFromVisited,
        updateProfile,
        isInWishlist
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
