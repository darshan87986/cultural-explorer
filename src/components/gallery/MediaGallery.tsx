import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Image, Video, Youtube } from "lucide-react";

export interface MediaItem {
  id: string;
  type: "image" | "video" | "youtube";
  url: string;
  thumbnail?: string;
  title: string;
  placeId?: string;
  placeName?: string;
  submittedBy?: string;
}

interface MediaGalleryProps {
  items: MediaItem[];
}

export function MediaGallery({ items }: MediaGalleryProps) {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  
  const images = items.filter(item => item.type === "image");
  const videos = items.filter(item => item.type === "video" || item.type === "youtube");
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="all">All Media</TabsTrigger>
          <TabsTrigger value="images">
            <Image className="h-4 w-4 mr-2" /> Images
          </TabsTrigger>
          <TabsTrigger value="videos">
            <Video className="h-4 w-4 mr-2" /> Videos
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {items.map((item) => (
              <MediaCard key={item.id} item={item} onSelect={setSelectedMedia} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="images" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {images.map((item) => (
              <MediaCard key={item.id} item={item} onSelect={setSelectedMedia} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="videos" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {videos.map((item) => (
              <MediaCard key={item.id} item={item} onSelect={setSelectedMedia} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <Dialog>
        <DialogTrigger asChild>
          <div className="hidden">Open</div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-2xl">
          {selectedMedia && (
            <div className="space-y-4">
              {selectedMedia.type === "image" ? (
                <img 
                  src={selectedMedia.url} 
                  alt={selectedMedia.title} 
                  className="w-full h-auto rounded-md"
                />
              ) : selectedMedia.type === "youtube" ? (
                <div className="aspect-video w-full">
                  <iframe
                    src={`https://www.youtube.com/embed/${getYouTubeId(selectedMedia.url)}`}
                    className="w-full h-full rounded-md"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <video 
                  src={selectedMedia.url} 
                  controls 
                  className="w-full h-auto rounded-md"
                />
              )}
              <div>
                <h3 className="font-medium text-lg">{selectedMedia.title}</h3>
                {selectedMedia.placeName && (
                  <p className="text-sm text-muted-foreground">
                    Location: {selectedMedia.placeName}
                  </p>
                )}
                {selectedMedia.submittedBy && (
                  <p className="text-sm text-muted-foreground">
                    Submitted by: {selectedMedia.submittedBy}
                  </p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface MediaCardProps {
  item: MediaItem;
  onSelect: (item: MediaItem) => void;
}

function MediaCard({ item, onSelect }: MediaCardProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div 
          className="cursor-pointer group relative aspect-square overflow-hidden bg-muted rounded-md"
          onClick={() => onSelect(item)}
        >
          {item.type === "youtube" ? (
            <img 
              src={`https://img.youtube.com/vi/${getYouTubeId(item.url)}/hqdefault.jpg`} 
              alt={item.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <img 
              src={item.type === "image" ? item.url : (item.thumbnail || item.url)} 
              alt={item.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          )}
          {(item.type === "video" || item.type === "youtube") && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black/60 rounded-full p-3">
                {item.type === "youtube" ? (
                  <Youtube className="h-6 w-6 text-white" />
                ) : (
                  <Video className="h-6 w-6 text-white" />
                )}
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
            <p className="text-white text-sm font-medium line-clamp-2">{item.title}</p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <div className="space-y-4">
          {item.type === "image" ? (
            <img 
              src={item.url} 
              alt={item.title} 
              className="w-full h-auto rounded-md"
            />
          ) : item.type === "youtube" ? (
            <div className="aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/${getYouTubeId(item.url)}`}
                className="w-full h-full rounded-md"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <video 
              src={item.url} 
              controls 
              className="w-full h-auto rounded-md"
            />
          )}
          <div>
            <h3 className="font-medium text-lg">{item.title}</h3>
            {item.placeName && (
              <p className="text-sm text-muted-foreground">
                Location: {item.placeName}
              </p>
            )}
            {item.submittedBy && (
              <p className="text-sm text-muted-foreground">
                Submitted by: {item.submittedBy}
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Helper function to extract YouTube ID from URL
function getYouTubeId(url: string): string {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : '';
}