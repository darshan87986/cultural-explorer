
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ImagePlus, MapPin } from "lucide-react";

const placeCategories = [
  { value: "historical", label: "Historical Site" },
  { value: "religious", label: "Religious/Spiritual" },
  { value: "natural", label: "Natural Heritage" },
  { value: "architectural", label: "Architectural" },
  { value: "culinary", label: "Culinary Tradition" },
  { value: "festival", label: "Festival/Celebration" },
  { value: "art", label: "Art & Craft" },
  { value: "music", label: "Music & Dance" },
  { value: "other", label: "Other" },
];

const placeFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").max(100),
  description: z.string().min(20, "Description must be at least 20 characters."),
  location: z.string().min(3, "Location must be at least 3 characters."),
  category: z.string().min(1, "Please select a category."),
  coordinates: z.string().optional(),
});

type PlaceFormValues = z.infer<typeof placeFormSchema>;

// Add the onSubmit prop to the component's props type definition
interface PlaceSubmissionFormProps {
  onSubmit?: (formData: PlaceFormValues) => void | Promise<void>;
  isSubmitting: boolean;
}

export function PlaceSubmissionForm({ onSubmit }: PlaceSubmissionFormProps) {
  const { toast } = useToast();
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<PlaceFormValues>({
    resolver: zodResolver(placeFormSchema),
    defaultValues: {
      name: "",
      description: "",
      location: "",
      category: "",
      coordinates: "",
    },
  });

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;

    const newImages: File[] = [];
    const newImageUrls: string[] = [];

    Array.from(fileList).forEach(file => {
      if (file.type.startsWith("image/")) {
        newImages.push(file);
        newImageUrls.push(URL.createObjectURL(file));
      }
    });

    setImages(prev => [...prev, ...newImages]);
    setImagePreviewUrls(prev => [...prev, ...newImageUrls]);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviewUrls(prev => {
      // Revoke object URL to avoid memory leaks
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async (values: PlaceFormValues) => {
    setIsSubmitting(true);
    
    try {
      // This would be replaced with an actual API call
      console.log("Form values:", values);
      console.log("Images:", images);
      
      // Simulate an API request delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Place submitted successfully!",
        description: "Your submission will be reviewed by our team.",
      });
      
      // Reset form
      form.reset();
      setImages([]);
      setImagePreviewUrls([]);
      
      // Call the onSubmit callback if provided
      if (onSubmit) {
        onSubmit(values);
      }
      
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "There was a problem submitting your place. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name of Place</FormLabel>
              <FormControl>
                <Input placeholder="Enter the name of the cultural place" {...field} />
              </FormControl>
              <FormDescription>
                Provide the common or official name of this cultural site.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {placeCategories.map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Choose the category that best describes this place.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe the cultural significance of this place..." 
                  className="min-h-32 resize-y"
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Include details about its cultural significance, history, and why people should visit.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <Input placeholder="City, Region, Country" {...field} />
                </div>
              </FormControl>
              <FormDescription>
                Enter the general location of this cultural place.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="coordinates"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Map Coordinates (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Latitude, Longitude (e.g., 40.7128, -74.0060)" {...field} />
              </FormControl>
              <FormDescription>
                For precise location on the map. You can find coordinates on Google Maps.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div>
          <FormLabel>Images</FormLabel>
          <div className="mt-2 space-y-4">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {imagePreviewUrls.map((url, index) => (
                <div key={index} className="relative group aspect-square bg-muted rounded-md overflow-hidden">
                  <img 
                    src={url} 
                    alt={`Preview ${index + 1}`} 
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  >
                    <span className="text-white text-sm font-medium">Remove</span>
                  </button>
                </div>
              ))}
              <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-md border border-dashed bg-muted hover:bg-muted/70 transition-colors">
                <ImagePlus className="h-8 w-8 text-muted-foreground" />
                <span className="mt-2 text-sm font-medium text-muted-foreground">
                  Add Image
                </span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="sr-only"
                  onChange={handleImagesChange}
                />
              </label>
            </div>
            <FormDescription>
              Upload images of this cultural place. You can add multiple images.
            </FormDescription>
          </div>
        </div>
        
        <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Place"}
        </Button>
      </form>
    </Form>
  );
}
