
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { useState } from "react";

export interface Story {
  id: string;
  title: string;
  content: string;
  placeId: string;
  placeName: string;
  authorName: string;
  authorImage?: string;
  date: string;
  imageUrl?: string;
}

interface StoryCardProps {
  story: Story;
}

export function StoryCard({ story }: StoryCardProps) {
  const { title, content, authorName, authorImage, date, imageUrl, placeName, placeId } = story;
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <>
      <Card className="overflow-hidden h-full">
        {imageUrl && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={imageUrl}
              alt={title}
              className="object-cover w-full h-full"
            />
          </div>
        )}
        <CardContent className={`${imageUrl ? "pt-4" : "pt-6"} flex flex-col h-full`}>
          <div className="mb-3">
            <h3 className="font-serif font-semibold text-lg mb-1">{title}</h3>
            <p className="text-muted-foreground text-xs">
              Story about <span className="font-medium text-heritage-DEFAULT">{placeName}</span>
            </p>
          </div>
          <p className="text-muted-foreground text-sm line-clamp-4 mb-4">{content}</p>
          
          <Button 
            variant="outline" 
            className="mb-4 mt-auto animate-fade-in"
            onClick={() => setIsModalOpen(true)}
          >
            View Full Story
          </Button>
          
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={authorImage} alt={authorName} />
                <AvatarFallback>{authorName.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{authorName}</span>
            </div>
            <span className="text-xs text-muted-foreground">{date}</span>
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-serif">{title}</DialogTitle>
          </DialogHeader>
          
          {imageUrl && (
            <div className="rounded-md overflow-hidden mb-4 animate-fade-in">
              <img
                src={imageUrl}
                alt={title}
                className="w-full object-cover"
              />
            </div>
          )}
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={authorImage} alt={authorName} />
                  <AvatarFallback>{authorName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{authorName}</p>
                  <p className="text-xs text-muted-foreground">Published on {date}</p>
                </div>
              </div>
              
              <Link to={`/place/${placeId}`}>
                <Button variant="outline">View Destination</Button>
              </Link>
            </div>
            
            <p className="text-muted-foreground whitespace-pre-line animate-fade-in">{content}</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
