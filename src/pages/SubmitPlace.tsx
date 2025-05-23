import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormData {
  name: string;
  description: string;
  categories: string;
  location_url: string;
  image_urls: string[];
}

const SubmitPlacePage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    categories: "",
    location_url: "",
    image_urls: [""], // Initialize with one empty URL input
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUrlChange = (index: number, value: string) => {
    const newImageUrls = [...formData.image_urls];
    newImageUrls[index] = value;
    setFormData({ ...formData, image_urls: newImageUrls });
  };

  const addImageUrl = () => {
    setFormData({ ...formData, image_urls: [...formData.image_urls, ""] });
  };

  const removeImageUrl = (index: number) => {
    const newImageUrls = formData.image_urls.filter((_, i) => i !== index);
    setFormData({ ...formData, image_urls: newImageUrls });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Filter out empty URLs
      const finalFormData = {
        ...formData,
        image_urls: formData.image_urls.filter(url => url.trim() !== "")
      };

      const response = await fetch('https://pakpetewdrnllukowjgc.supabase.co/rest/v1/addplace', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBha3BldGV3ZHJubGx1a293amdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3ODA1NDYsImV4cCI6MjA2MjM1NjU0Nn0.L3sy3kkryCfdWFGUPNITAKsjvOcwpEjwbkysChsT4Zg`,
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBha3BldGV3ZHJubGx1a293amdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3ODA1NDYsImV4cCI6MjA2MjM1NjU0Nn0.L3sy3kkryCfdWFGUPNITAKsjvOcwpEjwbkysChsT4Zg'
        },
        body: JSON.stringify(finalFormData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit data');
      }

      // Reset form
      setFormData({
        name: "",
        description: "",
        categories: "",
        location_url: "",
        image_urls: [""],
      });
      alert('Successfully submitted!');

    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit data. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Submit a Place</h1>
        
        <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
          <div>
            <label className="block mb-2">Name</label>
            <Input
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block mb-2">Description</label>
            <Textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div>
            <label className="block mb-2">Category</label>
            <Select
              value={formData.categories}
              onValueChange={(value) => setFormData({ ...formData, categories: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="historical">Historical</SelectItem>
                <SelectItem value="cultural">Cultural</SelectItem>
                <SelectItem value="natural">Natural</SelectItem>
                <SelectItem value="religious">Religious</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block mb-2">Location URL</label>
            <Input
              required
              value={formData.location_url}
              onChange={(e) => setFormData({ ...formData, location_url: e.target.value })}
              placeholder="Enter Google Maps URL"
            />
          </div>

          <div>
            <label className="block mb-2">Image URLs</label>
            {formData.image_urls.map((url, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <Input
                  type="url"
                  placeholder="Enter image URL"
                  value={url}
                  onChange={(e) => handleImageUrlChange(index, e.target.value)}
                  className="flex-1"
                />
                {formData.image_urls.length > 1 && (
                  <Button 
                    type="button"
                    variant="destructive"
                    onClick={() => removeImageUrl(index)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addImageUrl}
              className="mt-2"
            >
              Add Another Image URL
            </Button>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Place'}
          </Button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default SubmitPlacePage;
