import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { places, reviews, mediaItems, stories } from "@/data/mockData";
import { Star, MapPin, ThumbsUp, Eye, Share2, Image, Video, MapIcon, Calendar } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { ReviewForm } from "@/components/reviews/ReviewForm";
import { useUser } from "@/contexts/UserContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PlaceDetailsPage = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const { isLoggedIn } = useUser();
  const [place, setPlace] = useState<any>(null);
  const [placeReviews, setPlaceReviews] = useState<any[]>([]);
  const [placeMedia, setPlaceMedia] = useState<any[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [date, setDate] = useState<Date>();
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Guide booking form fields
  const [bookingName, setBookingName] = useState("");
  const [bookingEmail, setBookingEmail] = useState("");
  const [bookingPartySize, setBookingPartySize] = useState("1");
  const [bookingNotes, setBookingNotes] = useState("");
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);

  const { isInWishlist, addToWishlist, removeFromWishlist } = useUser();

  const handleError = (error: any) => {
    console.error('Error loading place details:', error);
    toast({
      title: "Error",
      description: "Failed to load place details. Please try again later.",
      variant: "destructive",
    });
  };

  useEffect(() => {
    setLoading(true);

    // Simulate API request
    setTimeout(() => {
      const foundPlace = places.find(p => p.id === id);
      console.log('Looking for place with id:', id);
      console.log('Found place:', foundPlace);

      if (foundPlace) {
        setPlace(foundPlace);
        setPlaceReviews(reviews.filter(r => r.placeId === foundPlace.id));
        setPlaceMedia(mediaItems.filter(m => m.placeId === foundPlace.id));

        // If no media items exist for this place, add a default one
        if (!mediaItems.some(m => m.placeId === foundPlace.id)) {
          setPlaceMedia([{
            id: `default-${foundPlace.id}`,
            type: 'image',
            url: foundPlace.imageUrl,
            title: foundPlace.name,
            placeId: foundPlace.id,
            placeName: foundPlace.name,
            submittedBy: 'System'
          }]);
        }

        // If no reviews exist for this place, add a placeholder message
        if (!reviews.some(r => r.placeId === foundPlace.id)) {
          setPlaceReviews([]);
        }
      } else {
        console.error('Place not found:', id);
      }

      setLoading(false);
    }, 500);
  }, [id]);

  const handleReviewSubmitted = (newReview: any) => {
    setPlaceReviews(prevReviews => [newReview, ...prevReviews]);
    setShowReviewForm(false);
  };

  const handleBookGuide = (e: React.FormEvent) => {
    e.preventDefault();

    if (!date) {
      toast({
        title: "Select a date",
        description: "Please select a date for your guided tour",
        variant: "destructive",
      });
      return;
    }

    // Create booking object
    const bookingId = `booking-${Date.now()}`;
    const bookingDetails = {
      id: bookingId,
      placeId: id,
      placeName: place?.name,
      guideName: bookingPartySize,
      name: bookingName,
      email: bookingEmail,
      date: format(date, 'PPP'),
      notes: bookingNotes,
      status: "pending",
      amount: 75
    };

    // Store pending booking
    localStorage.setItem('pendingBooking', JSON.stringify(bookingDetails));
    
    // Open payment page in a new window
    const paymentWindow = window.open('/payment.html', '_blank');
    
    // Listen for payment completion message
    window.addEventListener('message', function(event) {
      if (event.data === 'paymentComplete') {
        // Update booking status and save to localStorage
        bookingDetails.status = 'confirmed';
        const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        const updatedBookings = [...existingBookings, bookingDetails];
        localStorage.setItem('bookings', JSON.stringify(updatedBookings));
        
        // Show success message
        toast({
          title: "Booking Confirmed!",
          description: "Payment successful! Your guide booking has been confirmed.",
        });

        setBookingDialogOpen(false);
        setFormSubmitted(true);
        
        // Remove pending booking
        localStorage.removeItem('pendingBooking');
      }
    });
  };

  // Add this function to check payment status when component mounts
  useEffect(() => {
    const paymentStatus = localStorage.getItem('paymentComplete');
    if (paymentStatus === 'true') {
      // Clear the payment status
      localStorage.removeItem('paymentComplete');

      // Show success message
      toast({
        title: "Booking Confirmed!",
        description: "Your guide booking has been confirmed. Thank you!",
      });

      // Clear the booking details
      localStorage.removeItem('pendingBooking');
      setBookingDialogOpen(false);
      setFormSubmitted(true);
    }
  }, []);

  const handleSubmitPlace = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    toast({
      title: "Place Submission Received",
      description: "Your submission is waiting for information verification.",
    });
  };

  const handleWishlistToggle = (placeId: string) => {
    if (isInWishlist(placeId)) {
      removeFromWishlist(placeId);
      toast({
        title: "Removed from wishlist",
        description: "The place has been removed from your wishlist",
      });
    } else {
      addToWishlist(placeId);
      toast({
        title: "Added to wishlist",
        description: "The place has been added to your wishlist",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container py-12 flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-4 border-heritage-DEFAULT border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading place details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!place) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container py-12 flex-1">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-3xl font-serif font-medium mb-4">Place Not Found</h1>
            <p className="text-muted-foreground mb-6">
              We couldn't find the place you're looking for. It may have been removed or the URL might be incorrect.
            </p>
            <Link to="/explore">
              <Button className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Back to Explore
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Image and Basic Info */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50 z-10" />
        <div
          className="h-[50vh] bg-cover bg-center"
          style={{ backgroundImage: `url(${place.imageUrl})` }}
        >
          <div className="container relative z-20 h-full flex flex-col justify-end pb-8 text-white">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <Badge className="bg-heritage-accent text-white">
                {place.category.charAt(0).toUpperCase() + place.category.slice(1)}
              </Badge>
              {place.verified && (
                <Badge variant="outline" className="text-white border-white">
                  Verified
                </Badge>
              )}
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-bold mb-2">
              {place.name}
            </h1>
            <div className="flex items-center gap-2 text-white/80 mb-4">
              <MapPin className="h-4 w-4" />
              <span>{place.location}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                <span className="font-medium">{place.rating.toFixed(1)}</span>
                <span className="text-white/70">({placeReviews.length} reviews)</span>
              </div>
              <Separator orientation="vertical" className="h-5 bg-white/30" />
              <div className="flex items-center gap-1 text-white/80">
                <Eye className="h-4 w-4" />
                <span>1,234 views</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Description and Media */}
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-serif font-medium mb-4">About</h2>
                <p className="text-muted-foreground whitespace-pre-line">
                  {place.description}
                </p>
              </CardContent>
            </Card>

            <div>
              <Tabs defaultValue="media" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="media">
                    <Image className="h-4 w-4 mr-2" /> Media
                  </TabsTrigger>
                  <TabsTrigger value="reviews">
                    <Star className="h-4 w-4 mr-2" /> Reviews
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="media" className="space-y-6">
                  {placeMedia.length > 0 ? (
                    <div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                        {placeMedia.map((media, index) => (
                          <div
                            key={media.id}
                            className={`
                              aspect-square bg-muted rounded-sm overflow-hidden cursor-pointer
                              ${activeImageIndex === index ? 'ring-2 ring-heritage-DEFAULT' : ''}
                            `}
                            onClick={() => setActiveImageIndex(index)}
                          >
                            <img
                              src={media.type === 'image' ? media.url : (media.thumbnail || media.url)}
                              alt={media.title}
                              className="w-full h-full object-cover"
                            />
                            {media.type === 'video' && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-black/60 rounded-full p-1">
                                  <Video className="h-4 w-4 text-white" />
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="aspect-video bg-muted rounded-md overflow-hidden">
                        {placeMedia[activeImageIndex].type === 'image' ? (
                          <img
                            src={placeMedia[activeImageIndex].url}
                            alt={placeMedia[activeImageIndex].title}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <video
                            src={placeMedia[activeImageIndex].url}
                            controls
                            className="w-full h-full"
                          />
                        )}
                      </div>

                      <div className="mt-3">
                        <h3 className="font-medium">{placeMedia[activeImageIndex].title}</h3>
                        <p className="text-sm text-muted-foreground">
                          Submitted by {placeMedia[activeImageIndex].submittedBy}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground py-8 text-center">
                      No media has been added for this place yet.
                    </p>
                  )}
                </TabsContent>

                <TabsContent value="reviews" className="space-y-6">
                  <div className="mb-8">
                    {!showReviewForm ? (
                      <Button
                        onClick={() => {
                          if (!isLoggedIn) {
                            toast({
                              title: "Login Required",
                              description: "Please login to write a review",
                            });
                          } else {
                            setShowReviewForm(true);
                          }
                        }}
                      >
                        Write Review
                      </Button>
                    ) : (
                      <Card>
                        <CardContent className="p-6">
                          <ReviewForm
                            placeId={place.id}
                            onReviewSubmitted={handleReviewSubmitted}
                            onCancel={() => setShowReviewForm(false)}
                          />
                        </CardContent>
                      </Card>
                    )}
                  </div>

                  {placeReviews.length > 0 ? (
                    <div className="space-y-6">
                      {placeReviews.map(review => (
                        <Card key={review.id} className="overflow-hidden">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex gap-3">
                                <Avatar>
                                  <AvatarImage src={review.userAvatar} alt={review.userName} />
                                  <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{review.userName}</p>
                                  <div className="flex items-center gap-2">
                                    <div className="flex">
                                      {[...Array(5)].map((_, i) => (
                                        <Star
                                          key={i}
                                          className={`h-4 w-4 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-muted'}`}
                                        />
                                      ))}
                                    </div>
                                    <span className="text-xs text-muted-foreground">
                                      {review.date}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <p className="my-4">{review.comment}</p>

                            {review.images && review.images.length > 0 && (
                              <div className="flex gap-2 my-4">
                                {review.images.map((img: string, i: number) => (
                                  <div key={i} className="h-20 w-20 rounded-md overflow-hidden">
                                    <img src={img} alt="Review" className="h-full w-full object-cover" />
                                  </div>
                                ))}
                              </div>
                            )}

                            <div className="flex items-center justify-between">
                              <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground">
                                <ThumbsUp className="h-4 w-4" />
                                Helpful ({review.helpful})
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground py-8 text-center">
                      No reviews have been added for this place yet.
                    </p>
                  )}
                </TabsContent>
              </Tabs>
            </div>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-serif font-medium mb-6">Book a Guide</h2>
                {formSubmitted ? (
                  <div className="text-center py-6">
                    <h3 className="text-xl font-medium mb-2 text-heritage-DEFAULT">Booking Request Sent!</h3>
                    <p className="text-muted-foreground mb-4">
                      Thank you for your interest in booking a guide. We will contact you shortly to confirm your reservation.
                    </p>
                    <Button onClick={() => setFormSubmitted(false)}>Book Another Tour</Button>
                  </div>
                ) : (
                  <Dialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="w-full sm:w-auto">
                        <Calendar className="mr-2 h-4 w-4" /> Book a Guide
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Book a Guide</DialogTitle>
                        <DialogDescription>
                          Book a local guide to explore {place.name}. Fill in the details below to submit your request.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleBookGuide} className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <label htmlFor="booking-name" className="text-sm font-medium">
                            Full Name
                          </label>
                          <Input
                            id="booking-name"
                            value={bookingName}
                            onChange={(e) => setBookingName(e.target.value)}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="booking-email" className="text-sm font-medium">
                            Email
                          </label>
                          <Input
                            id="booking-email"
                            type="email"
                            value={bookingEmail}
                            onChange={(e) => setBookingEmail(e.target.value)}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="booking-date" className="text-sm font-medium">
                            Preferred Date
                          </label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                id="booking-date"
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !date && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP") : "Select a date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <CalendarComponent
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                                disabled={(date) => date < new Date()}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="booking-party-size" className="text-sm font-medium">
                            Choose Guide
                          </label>
                          <Select value={bookingPartySize} onValueChange={setBookingPartySize}>
                            <SelectTrigger id="booking-party-size">
                              <SelectValue placeholder="Select a guide" />
                            </SelectTrigger>
                            <SelectContent>
                              {[
                                "Raj Mehta",
                                "Ak Sharma",
                                "Priya Desai",
                                "Ravi Kumar",
                                "Neha Verma",
                                "Anjali Singh",
                                "Karan Patel",
                                "Ayesha Khan",
                                "Vikram Rao",
                                "Simran Joshi",
                              ].map((name) => (
                                <SelectItem key={name} value={name}>
                                  {name}
                                </SelectItem>
                              ))}
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="booking-notes" className="text-sm font-medium">
                            Additional Notes (Optional)
                          </label>
                          <Textarea
                            id="booking-notes"
                            placeholder="Any special requirements or interests..."
                            value={bookingNotes}
                            onChange={(e) => setBookingNotes(e.target.value)}
                          />
                        </div>

                        <div className="pt-4 flex justify-end space-x-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setBookingDialogOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button type="submit">Submit Request</Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Actions and Details */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex gap-2">
                  <Button className="flex-1 gap-2" onClick={() => setShowReviewForm(true)}>
                    <Star className="h-4 w-4" /> Write Review
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Share2 className="h-4 w-4" /> Share
                  </Button>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-2">Location</h3>
                  <div className="aspect-video bg-muted rounded-md overflow-hidden relative mb-2">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <MapIcon className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {place.location}
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-2">Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Category</span>
                      <span className="font-medium">{place.category.charAt(0).toUpperCase() + place.category.slice(1)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Added</span>
                      <span className="font-medium">February 15, 2025</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Verified</span>
                      <span className="font-medium">{place.verified ? "Yes" : "No"}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium mb-4">Similar Places</h3>
                <div className="space-y-4">
                  {places
                    .filter(p => p.category === place.category && p.id !== place.id)
                    .slice(0, 3)
                    .map(p => (
                      <Link key={p.id} to={`/place/${p.id}`} className="block group">
                        <div className="flex gap-3">
                          <div className="w-20 h-20 bg-muted rounded-md overflow-hidden">
                            <img
                              src={p.imageUrl}
                              alt={p.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium group-hover:text-heritage-DEFAULT transition-colors">{p.name}</h4>
                            <p className="text-xs text-muted-foreground mb-1">{p.location}</p>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                              <span className="text-xs">{p.rating.toFixed(1)}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PlaceDetailsPage;
