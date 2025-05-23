import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/contexts/UserContext";
import { places } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { MapPin, X, Calendar } from "lucide-react";

const ProfilePage = () => {
  const { userProfile, removeFromWishlist } = useUser();
  const { toast } = useToast();
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    // Load wishlist from localStorage
    const wishlistData = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const wishlistItems = places.filter(place => wishlistData.includes(place.id));
    setWishlist(wishlistItems);

    // Load bookings from localStorage
    const storedBookings = localStorage.getItem('bookings');
    if (storedBookings) {
      const bookings = JSON.parse(storedBookings);
      const confirmedBookings = bookings.filter(b => b.status === 'confirmed');
      setBookings(confirmedBookings);
    }
  }, []);

  const handleRemoveFromWishlist = (placeId: string) => {
    removeFromWishlist(placeId);
    // Update local state
    setWishlist(prev => prev.filter(place => place.id !== placeId));
    
    toast({
      title: "Removed from wishlist",
      description: "The place has been removed from your wishlist.",
    });
  };

  const handleCancelBooking = (bookingId: string) => {
    const updatedBookings = bookings.filter(b => b.id !== bookingId);
    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    
    toast({
      title: "Booking Cancelled",
      description: "Your money will be refunded within 4-5 working days. For any assistance, contact: +91 9876543210",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container py-8">
        <h1 className="text-3xl font-serif font-medium mb-8">My Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Info */}
          <Card className="md:col-span-1">
            <CardContent className="p-6">
              <h2 className="text-xl font-medium mb-4">Profile Details</h2>
              <div className="space-y-2">
                <p><strong>Name:</strong> {userProfile?.name}</p>
                <p><strong>Email:</strong> {userProfile?.email}</p>
              </div>
            </CardContent>
          </Card>

          {/* Bookings and Wishlist */}
          <div className="md:col-span-2">
            <Tabs defaultValue="bookings">
              <TabsList>
                <TabsTrigger value="bookings">Guide Bookings</TabsTrigger>
                <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
              </TabsList>

              <TabsContent value="bookings" className="mt-6">
                {bookings.length > 0 ? (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <Card key={booking.id}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{booking.placeName}</h3>
                              <div className="text-sm text-muted-foreground space-y-1">
                                <p>Guide: {booking.guideName}</p>
                                <p className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {booking.date}
                                </p>
                              </div>
                            </div>
                            <Button 
                              variant="destructive" 
                              onClick={() => handleCancelBooking(booking.id)}
                            >
                              Cancel Booking
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    No guide bookings found.
                  </p>
                )}
              </TabsContent>

              <TabsContent value="wishlist" className="mt-6">
                {wishlist.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {wishlist.map((place) => (
                      <Card key={place.id}>
                        <CardContent className="p-4 flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">{place.name}</h3>
                            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                              <MapPin className="h-4 w-4" />
                              {place.location}
                            </p>
                          </div>
                          <Button 
                            variant="destructive" 
                            onDoubleClick={() => handleRemoveFromWishlist(place.id)}
                          >
                            <X className="h-4 w-4 mr-2" />
                            Double-click to Remove
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    Your wishlist is empty.
                  </p>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;