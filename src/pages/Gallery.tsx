
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MediaGallery } from "@/components/gallery/MediaGallery";
import { mediaItems } from "@/data/mockData";

const GalleryPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-medium mb-4">
            Media Gallery
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Explore images, videos, and stories from cultural places around the world, submitted and shared by our community of explorers.
          </p>
        </div>
        
        <MediaGallery items={mediaItems} />
      </div>
      
      <Footer />
    </div>
  );
};

export default GalleryPage;
