import { Navbar } from "@/components/layout/Navbar";
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader } from "@googlemaps/js-api-loader";

// Define types for our map and markers
type MapType = google.maps.Map;
type MarkerType = google.maps.Marker;
type LatLngLiteral = google.maps.LatLngLiteral;

// Define type for our cultural places
interface CulturalPlace {
  id: string;
  name: string;
  address: string;
  position: LatLngLiteral;
  type: 'museum' | 'landmark' | 'gallery' | 'historic' | 'theater';
  description: string;
  imageUrl?: string;
}

const MapPage = () => {
  const { toast } = useToast();
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<MapType | null>(null);
  const [markers, setMarkers] = useState<MarkerType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlace, setSelectedPlace] = useState<CulturalPlace | null>(null);
  const [culturalPlaces, setCulturalPlaces] = useState<CulturalPlace[]>([]);

  // Mock cultural places data
  const mockCulturalPlaces: CulturalPlace[] = [
    {
      id: '1',
      name: 'The Metropolitan Museum of Art',
      address: '1000 5th Ave, New York, NY 10028',
      position: { lat: 40.7794, lng: -73.9632 },
      type: 'museum',
      description: 'The largest art museum in the Western Hemisphere.',
      imageUrl: 'https://images.unsplash.com/photo-1581349485608-9469926a8e5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: '2',
      name: 'Statue of Liberty',
      address: 'Liberty Island, New York, NY 10004',
      position: { lat: 40.6892, lng: -74.0445 },
      type: 'landmark',
      description: 'A colossal neoclassical sculpture on Liberty Island in New York Harbor.',
      imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: '3',
      name: 'Broadway Theater District',
      address: 'Broadway, New York, NY',
      position: { lat: 40.7579, lng: -73.9855 },
      type: 'theater',
      description: 'Famous for its theatrical performances, particularly musicals.',
      imageUrl: 'https://images.unsplash.com/photo-1549310786-4e5e48ee239f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: '4',
      name: 'American Museum of Natural History',
      address: '200 Central Park West, New York, NY 10024',
      position: { lat: 40.7813, lng: -73.9740 },
      type: 'museum',
      description: 'One of the largest natural history museums in the world.',
      imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: '5',
      name: 'The Cloisters',
      address: '99 Margaret Corbin Dr, New York, NY 10040',
      position: { lat: 40.8649, lng: -73.9319 },
      type: 'museum',
      description: 'Museum dedicated to the art and architecture of medieval Europe.',
      imageUrl: 'https://images.unsplash.com/photo-1581349485608-9469926a8e5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    }
  ];

  // Initialize the map and add cultural places
  useEffect(() => {
    const loader = new Loader({
      apiKey: "AIzaSyD6eZpOFCBq6mLs6noBm1quvSTlyYFlCCM", // Replace with your actual API key
      version: "weekly",
      libraries: ["places"]
    });

    loader.load().then(() => {
      if (mapRef.current) {
        const initialMap = new google.maps.Map(mapRef.current, {
          center: { lat: 40.7128, lng: -74.0060 }, // Default to New York
          zoom: 12,
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
        });

        setMap(initialMap);
        setCulturalPlaces(mockCulturalPlaces);
        
        // Add markers for cultural places
        const newMarkers = mockCulturalPlaces.map(place => {
          const marker = new google.maps.Marker({
            position: place.position,
            map: initialMap,
            title: place.name,
            animation: google.maps.Animation.DROP,
            icon: getIconForType(place.type),
          });

          // Add info window for each marker
          const infoWindow = new google.maps.InfoWindow({
            content: `
              <div class="p-2 max-w-xs">
                <h3 class="font-bold text-lg">${place.name}</h3>
                <p class="text-sm mb-1">${place.address}</p>
                <p class="text-xs mb-2">${place.description}</p>
                ${place.imageUrl ? 
                  `<img src="${place.imageUrl}" 
                      alt="${place.name}" 
                      class="w-full h-auto rounded mb-2">` : ''}
                <button onclick="window.dispatchEvent(new CustomEvent('selectPlace', { detail: '${place.id}' }));"
                  class="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
                  View Details
                </button>
              </div>
            `,
          });

          marker.addListener("click", () => {
            infoWindow.open(initialMap, marker);
            setSelectedPlace(place);
          });

          return marker;
        });

        setMarkers(newMarkers);

        // Listen for custom event from info window buttons
        window.addEventListener('selectPlace', (e: any) => {
          const placeId = e.detail;
          const place = mockCulturalPlaces.find(p => p.id === placeId);
          if (place) {
            setSelectedPlace(place);
            initialMap.setCenter(place.position);
            initialMap.setZoom(15);
          }
        });

        toast({
          title: "Cultural Map",
          description: "Explore cultural locations in New York City.",
        });
      }
    }).catch(error => {
      console.error("Error loading Google Maps:", error);
      toast({
        title: "Map Error",
        description: "Failed to load Google Maps. Please try again later.",
        variant: "destructive",
      });
    });

    return () => {
      // Clean up markers when component unmounts
      markers.forEach(marker => marker.setMap(null));
      window.removeEventListener('selectPlace', () => {});
    };
  }, []);

  // Get appropriate icon for place type
  const getIconForType = (type: string) => {
    const baseUrl = 'https://maps.google.com/mapfiles/ms/icons/';
    switch(type) {
      case 'museum':
        return baseUrl + 'blue-dot.png';
      case 'landmark':
        return baseUrl + 'red-dot.png';
      case 'gallery':
        return baseUrl + 'purple-dot.png';
      case 'historic':
        return baseUrl + 'green-dot.png';
      case 'theater':
        return baseUrl + 'yellow-dot.png';
      default:
        return baseUrl + 'orange-dot.png';
    }
  };

  // Handle search functionality - now searches our mock data
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!map || !searchQuery.trim()) return;

    try {
      // Search our mock data
      const results = mockCulturalPlaces.filter(place => 
        place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.address.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (results.length === 0) {
        toast({
          title: "No results found",
          description: "Please try a different search term.",
          variant: "destructive",
        });
        return;
      }

      // Select the first result
      const place = results[0];
      setSelectedPlace(place);

      // Clear existing markers
      markers.forEach(marker => marker.setMap(null));
      setMarkers([]);

      // Create a new marker for the searched place
      const marker = new google.maps.Marker({
        position: place.position,
        map,
        title: place.name,
        animation: google.maps.Animation.BOUNCE,
        icon: getIconForType(place.type),
      });

      // Add info window with more details
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div class="p-2 max-w-xs">
            <h3 class="font-bold text-lg">${place.name}</h3>
            <p class="text-sm mb-1">${place.address}</p>
            <p class="text-xs mb-2">${place.description}</p>
            ${place.imageUrl ? 
              `<img src="${place.imageUrl}" 
                  alt="${place.name}" 
                  class="w-full h-auto rounded mb-2">` : ''}
          </div>
        `,
      });

      // Open info window immediately
      infoWindow.open(map, marker);
      
      // Also open on click
      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });

      setMarkers([marker]);

      // Center and zoom map on the place
      map.setCenter(place.position);
      map.setZoom(15);

      toast({
        title: "Location found",
        description: `Showing results for ${place.name}`,
      });

    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Search failed",
        description: "There was an error searching for this location.",
        variant: "destructive",
      });
    }
  };

  // Filter places by type
  const filterByType = (type: string) => {
    if (!map) return;
    
    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    
    if (type === 'all') {
      // Show all markers
      const newMarkers = mockCulturalPlaces.map(place => {
        const marker = new google.maps.Marker({
          position: place.position,
          map,
          title: place.name,
          icon: getIconForType(place.type),
        });
        return marker;
      });
      setMarkers(newMarkers);
    } else {
      // Show only markers of the selected type
      const filteredPlaces = mockCulturalPlaces.filter(place => place.type === type);
      const newMarkers = filteredPlaces.map(place => {
        const marker = new google.maps.Marker({
          position: place.position,
          map,
          title: place.name,
          icon: getIconForType(place.type),
        });
        return marker;
      });
      setMarkers(newMarkers);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 relative">
        {/* Map container */}
        <div ref={mapRef} className="absolute inset-0" />
        
        {/* Search overlay */}
        <div className="absolute top-4 left-4 z-10 bg-background/90 backdrop-blur-sm p-4 rounded-md shadow-md w-64">
          <form onSubmit={handleSearch} className="space-y-2">
            <div className="relative">
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cultural places..."
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm pl-8"
              />
              <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
            </div>
            <button 
              type="submit" 
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-3 rounded-md text-sm font-medium"
            >
              Search
            </button>
          </form>

          {/* Filter buttons */}
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Filter by type:</h3>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => filterByType('all')}
                className="text-xs bg-gray-200 hover:bg-gray-300 py-1 px-2 rounded"
              >
                All
              </button>
              <button 
                onClick={() => filterByType('museum')}
                className="text-xs bg-blue-100 hover:bg-blue-200 py-1 px-2 rounded"
              >
                Museums
              </button>
              <button 
                onClick={() => filterByType('landmark')}
                className="text-xs bg-red-100 hover:bg-red-200 py-1 px-2 rounded"
              >
                Landmarks
              </button>
              <button 
                onClick={() => filterByType('theater')}
                className="text-xs bg-yellow-100 hover:bg-yellow-200 py-1 px-2 rounded"
              >
                Theaters
              </button>
            </div>
          </div>
        </div>

        {/* Place details panel */}
        {selectedPlace && (
          <div className="absolute bottom-4 left-4 z-10 bg-background/90 backdrop-blur-sm p-4 rounded-md shadow-md w-64 max-h-64 overflow-y-auto">
            <h3 className="font-bold text-lg">{selectedPlace.name}</h3>
            <p className="text-sm text-muted-foreground">{selectedPlace.address}</p>
            <p className="text-sm mt-2">{selectedPlace.description}</p>
            <div className="mt-2">
              <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                selectedPlace.type === 'museum' ? 'bg-blue-100 text-blue-800' :
                selectedPlace.type === 'landmark' ? 'bg-red-100 text-red-800' :
                selectedPlace.type === 'theater' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {selectedPlace.type.charAt(0).toUpperCase() + selectedPlace.type.slice(1)}
              </span>
            </div>
            {selectedPlace.imageUrl && (
              <img 
                src={selectedPlace.imageUrl} 
                alt={selectedPlace.name} 
                className="w-full h-auto rounded mt-2"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MapPage;