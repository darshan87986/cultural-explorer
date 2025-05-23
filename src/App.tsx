import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import HomePage from "./pages/Index";
import ExplorePage from "./pages/Explore";
import PlaceDetailsPage from "./pages/PlaceDetails";
import MapPage from "./pages/Map";
import GalleryPage from "./pages/Gallery";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import SubmitPlacePage from "./pages/SubmitPlace";
import AboutPage from "./pages/About";
import StoriesPage from "./pages/Stories";
import NotFound from "./pages/NotFound";
import ProfilePage from "./pages/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <UserProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/place/:id" element={<PlaceDetailsPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/submit" element={<SubmitPlacePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/stories" element={<StoriesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
