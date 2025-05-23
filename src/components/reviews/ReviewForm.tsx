
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useUser } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Star, Upload, X } from "lucide-react";

const reviewSchema = z.object({
  text: z.string().min(5, "Review must be at least 5 characters"),
  rating: z.number().min(1, "Rating required").max(5),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

interface ReviewFormProps {
  placeId: string;
  onReviewSubmitted: (review: any) => void;
  onCancel?: () => void;
}

export function ReviewForm({ placeId, onReviewSubmitted, onCancel }: ReviewFormProps) {
  const { toast } = useToast();
  const { isLoggedIn, userProfile } = useUser();
  const [hoveredStar, setHoveredStar] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  
  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      text: "",
      rating: 0,
    },
  });

  const rating = form.watch("rating");
  
  const handleStarClick = (value: number) => {
    form.setValue("rating", value, { shouldValidate: true });
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setSelectedImages(prev => [...prev, ...newFiles]);
      
      // Create preview URLs
      const newPreviewUrls = newFiles.map(file => URL.createObjectURL(file));
      setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
    }
  };
  
  const removeImage = (index: number) => {
    const newImages = [...selectedImages];
    const newPreviewUrls = [...previewUrls];
    
    // Revoke object URL to avoid memory leaks
    URL.revokeObjectURL(newPreviewUrls[index]);
    
    newImages.splice(index, 1);
    newPreviewUrls.splice(index, 1);
    
    setSelectedImages(newImages);
    setPreviewUrls(newPreviewUrls);
  };
  
  const onSubmit = async (values: ReviewFormValues) => {
    if (!isLoggedIn) {
      toast({
        title: "Login Required",
        description: "Please login to submit a review",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create new review object with form data
      const newReview = {
        id: `review-${Date.now()}`,
        placeId,
        rating: values.rating,
        comment: values.text,
        userName: userProfile?.name || "Anonymous",
        userAvatar: userProfile?.avatar,
        date: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        helpful: 0,
        images: previewUrls,
      };
      
      toast({
        title: "Review submitted",
        description: "Thank you for sharing your experience!",
      });
      
      onReviewSubmitted(newReview);
      
    } catch (error) {
      console.error("Error submitting review:", error);
      toast({
        title: "Error",
        description: "There was a problem submitting your review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Write a Review</h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Star Rating */}
          <div className="space-y-2">
            <FormLabel>Rating</FormLabel>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= (hoveredStar || rating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-muted"
                    } transition-colors`}
                  />
                </button>
              ))}
            </div>
            {form.formState.errors.rating && (
              <p className="text-sm font-medium text-destructive">
                {form.formState.errors.rating.message}
              </p>
            )}
          </div>
          
          {/* Review Text */}
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Review</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Share your experience here..." 
                    className="min-h-32 resize-y"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Image Upload */}
          <div className="space-y-2">
            <FormLabel>Add Photos (Optional)</FormLabel>
            <div className="border border-dashed border-input p-4 rounded-md">
              <label 
                htmlFor="image-upload" 
                className="flex flex-col items-center gap-2 cursor-pointer"
              >
                <Upload className="h-8 w-8 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Click to upload photos
                </span>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
            
            {/* Image Previews */}
            {previewUrls.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-2">
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative h-24 rounded-md overflow-hidden">
                    <img 
                      src={url} 
                      alt={`Preview ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-black/70 rounded-full p-1 text-white"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Submission Buttons */}
          <div className="flex justify-end gap-2 pt-2">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
