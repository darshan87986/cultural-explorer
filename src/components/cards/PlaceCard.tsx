import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin } from "lucide-react";
import { ReactNode } from "react";

export interface Place {
  id: string;
  name: string;
  description: string;
  location: string;
  category: string;
  rating: number;
  imageUrl: string;
  verified: boolean;
}

interface PlaceCardProps {
  place: Place;
  actionButton?: ReactNode;
}

export function PlaceCard({ place, actionButton }: PlaceCardProps) {
  const { id, name, description, location, category, rating, imageUrl, verified } = place;
  
  return (
    <Card className="overflow-hidden group h-full flex flex-col">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
        {verified && (
          <Badge className="absolute top-2 right-2 bg-heritage-accent/80 text-white">
            Verified
          </Badge>
        )}
      </div>
      <CardContent className="pt-4 flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-serif font-semibold text-lg">{name}</h3>
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-medium">{rating.toFixed(1)}</span>
          </div>
        </div>
        <Badge variant="outline" className="mb-2">
          {category}
        </Badge>
        <p className="text-muted-foreground text-sm line-clamp-3 mb-2">{description}</p>
        <div className="flex items-center gap-1 text-muted-foreground text-sm">
          <MapPin className="h-3 w-3" />
          <span>{location}</span>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 bg-muted/20">
        {actionButton ? (
          <div className="w-full space-y-2">
            {actionButton}
            <Link to={`/place/${id}`} className="w-full">
              <Button variant="outline" className="w-full">
                View Details
              </Button>
            </Link>
          </div>
        ) : (
          <Link to={`/place/${id}`} className="w-full">
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
