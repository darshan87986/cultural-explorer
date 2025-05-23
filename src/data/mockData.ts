// Mock data for development purposes

// Places data
export const places = [
  {
    id: "1",
    name: "Ancient Temple of Serenity",
    description: "A 12th-century temple known for its intricate carvings and peaceful ambiance...",
    location: "Kyoto, Japan",
    category: "religious",
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1592906209472-a36b1f3782ef",
    verified: true,
    coordinates: [35.0116, 135.7681],
  },
  {
    id: "2",
    name: "Heritage Village Market",
    description: "This 300-year-old market showcases traditional crafts, local cuisine, and cultural performances. It's a living museum where artisans demonstrate techniques passed down through generations. Visitors can participate in workshops to learn traditional crafts.",
    location: "Marrakech, Morocco",
    category: "cultural",
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1495562569060-2eec283d3391",
    verified: true,
    coordinates: [31.6295, -7.9811],
  },
  {
    id: "3",
    name: "Old Town Square",
    description: "A medieval square surrounded by colorful baroque buildings, featuring an astronomical clock that dates back to 1410. Every hour, the clock performs a mechanical show with figures of the Apostles and other moving sculptures.",
    location: "Prague, Czech Republic",
    category: "historical",
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1592906209472-a36b1f3782ef",
    verified: true,
    coordinates: [50.0873, 14.4213],
  },
  {
    id: "4",
    name: "Sacred Mountain Trails",
    description: "Ancient pilgrimage routes winding through mountains dotted with small shrines and offering stunning views. These trails have been used by spiritual seekers for over 1,000 years and feature meditation spots at key energy points.",
    location: "Cusco Region, Peru",
    category: "natural",
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800",
    verified: false,
    coordinates: [-13.1631, -72.5450],
  },
  {
    id: "5",
    name: "Traditional Folk Music Hall",
    description: "A venue dedicated to preserving and showcasing indigenous musical traditions, hosting regular performances by local musicians. The hall was built using traditional techniques and materials to create perfect acoustics for folk instruments.",
    location: "Dublin, Ireland",
    category: "music",
    rating: 4.3,
    imageUrl: "https://images.unsplash.com/photo-1511192336575-5a79af67a629",
    verified: true,
    coordinates: [53.3498, -6.2603],
  },
  {
    id: "6",
    name: "Ancient Rock Art Caves",
    description: "Cave systems featuring prehistoric paintings dating back 15,000 years, depicting hunting scenes and spiritual rituals. The natural pigments used have remarkably survived millennia, providing insight into ancient human culture.",
    location: "Lascaux, France",
    category: "historical",
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1534304746010-e7a03c6e3281",
    verified: true,
    coordinates: [45.0485, 1.1781],
  },
  {
    id: "7",
    name: "Floating Market",
    description: "A vibrant market held on traditional wooden boats, where locals sell fresh produce, handcrafted items, and traditional foods. Some vendor families have been selling from the same boats for five generations.",
    location: "Bangkok, Thailand",
    category: "culinary",
    rating: 4.4,
    imageUrl: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a",
    verified: false,
    coordinates: [13.7563, 100.5018],
  },
  {
    id: "8",
    name: "Cultural Dance Theater",
    description: "A historic venue showcasing traditional dance performances that tell stories of local myths and legends. Each performance includes handmade costumes that take months to create, following designs passed down for centuries.",
    location: "Bali, Indonesia",
    category: "art",
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1508626745482-a93e676e86eb",
    verified: true,
    coordinates: [-8.4095, 115.1889],
  },
  {
    id: "mysore",
    name: "Mysore Palace",
    description: "The Mysore Palace, also known as Amba Vilas Palace, is a historical palace and a royal residence...",
    location: "Mysore, Karnataka",
    category: "historical",
    rating: 4.9,
    imageUrl: "https://rb.gy/ykjckw",
    verified: true,
    coordinates: [12.3052, 76.6552],
  },
  {
    id: "hampi",
    name: "Hampi",
    description: "Hampi is an ancient village in Karnataka, featuring numerous ruined temple complexes from the Vijayanagara Empire...",
    location: "Hampi, Karnataka",
    category: "historical",
    rating: 4.7,
    imageUrl: "https://rb.gy/9a5dly",
    verified: true,
    coordinates: [15.3350, 76.4600],
  }
];

// Stories data
export const stories = [
  {
    id: "1",
    title: "Finding Peace in Ancient Rituals",
    content: "My visit to the Ancient Temple of Serenity changed my perspective on spiritual practices. Witnessing the evening prayer ceremony, with hundreds of candles reflecting on the temple pond, created a sense of timelessness. An elderly monk shared stories of how the temple survived through centuries of change while maintaining its spiritual essence.",
    placeId: "1",
    placeName: "Ancient Temple of Serenity",
    authorName: "Emma Wilson",
    authorImage: "https://i.pravatar.cc/150?img=1",
    date: "May 12, 2025",
    imageUrl: "https://images.unsplash.com/photo-1470115636492-6d2b56f9146d"
  },
  {
    id: "2",
    title: "Tastes and Traditions at the Heritage Market",
    content: "The aromas at Heritage Village Market tell stories of centuries-old cooking techniques. I learned to make traditional bread with a family who has been baking in the same spot for seven generations. The grandmother showed me a secret ingredient that makes their bread unique - a wild herb that only grows in the nearby mountains during spring.",
    placeId: "2",
    placeName: "Heritage Village Market",
    authorName: "Michael Chen",
    authorImage: "https://i.pravatar.cc/150?img=2",
    date: "April 23, 2025",
    imageUrl: "https://images.unsplash.com/photo-1506929562872-bb421503ef21"
  },
  {
    id: "3",
    title: "Echoes of History in Prague",
    content: "Standing in Old Town Square as the astronomical clock chimed was like stepping back in time. I learned that during WWII, locals disassembled parts of the clock and hid them throughout the city to prevent it from being destroyed. The pieces were only reunited and restored after the war ended, symbolizing the resilience of the city's cultural heritage.",
    placeId: "3",
    placeName: "Old Town Square",
    authorName: "Sarah Johnson",
    authorImage: "https://i.pravatar.cc/150?img=3",
    date: "March 5, 2025",
    imageUrl: "https://images.unsplash.com/photo-1573455494060-c5595004fb6c"
  },

 
];

// Media gallery data
// Media gallery data
export const mediaItems = [
  {
    id: "1",
    type: "image" as const,
    url: "https://rb.gy/ykjckw",
    title: "Mysore",
    placeId: "1",
    placeName: "Mysore Palace",
  },
  {
    id: "2",
    type: "image" as const,
    url: "https://rb.gy/ku10u1",
    title: "Iskcon",
    placeId: "2",
    placeName: "Iscon Temple",
    submittedBy: "Sofia Martinez"
  },
{
    id: "3",
    type: "youtube",
    url: "https://www.youtube.com/watch?v=k2I5fi-zGDY",
    title: "ಕಪ್ಪತ ಗುಡ್ಡ । ಗದಗ । Kannada Vlog ",
    placeName: "Kappata Gudda"
  },
  {
    id: "4",
    type: "image" as const,
    url: "https://rb.gy/9a5dly",
    title: "Hampi",
    placeId: "3",
    placeName: "Hampi",
    submittedBy: "Martin Novak"
  },
  {
    id: "5",
    type: "image" as const,
    url: "https://images.unsplash.com/photo-1710612198146-77512950a4b7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29vcmd8ZW58MHx8MHx8fDA%3D",
    title: "Coorg",
    placeId: "4",
    placeName: "Coorg",
    submittedBy: "Carolina Reyes"
  },
 {
    id: "6",
    type: "youtube",
    url: "https://www.youtube.com/watch?v=q6QgQooLDYY",
    title: "chikmagalur tourism",
    placeName: "chikmagalur"
  },
  {
    id: "7",
    type: "image" as const,
    url: "https://images.unsplash.com/photo-1576440742053-8820cffa7bae?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNoaWttYWdhbHVyfGVufDB8fDB8fHww",
    title: "Chikmagalur",
    placeId: "6",
    placeName: "Chikmagalur",
    submittedBy: "Jean Dupont"
  },
  {
    id: "9",
    type: "image" as const,
    url: "https://images.unsplash.com/photo-1707572527520-c6446b3d7fbd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bmFuZGklMjBoaWxsc3xlbnwwfHwwfHx8MA%3D%3D",
    title: "Nandi Hills",
    placeId: "7",
    placeName: "Nandi Hills",
    submittedBy: "Somchai Jaidee"
  },
 {
    id: "10",
    type: "youtube",
    url: "https://www.youtube.com/watch?v=qU-5Z8OC_ZU",
    title: "Gokak falls A Film By Ys Photography and Films ",
    placeName: "Gokak Falls"
  },
  {
    id: "11",
    type: "image" as const,
    url: "https://images.unsplash.com/photo-1591885587747-bee871855d92?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJhZGFtaXxlbnwwfHwwfHx8MA%3D%3D",
    title: "Badami",
    placeId: "4",
    placeName: "Badami",
    submittedBy: "Miguel Herrera"
  },
  {
    id: "12",
    type: "image" as const,
    url: "https://media.istockphoto.com/id/477349724/photo/wild-elephant.webp?a=1&b=1&s=612x612&w=0&k=20&c=a-_WOq92S0wPllrCRgFdpepnyOw3vTFP-dMHfFY3dLk=",
    title: "Bandipur national park",
    placeId: "8",
    placeName: "Bandipur National Park",
    submittedBy: "Ketut Subiyanto"
  }
];

// Reviews data
export const reviews = [
  {
    id: "1",
    placeId: "1",
    userId: "101",
    userName: "Alex Johnson",
    userAvatar: "https://i.pravatar.cc/150?img=10",
    rating: 5,
    comment: "An incredible spiritual experience. The temple's atmosphere is serene and the architecture is breathtaking. Don't miss the sunset ceremony!",
    date: "April 15, 2025",
    helpful: 24
  },
  {
    id: "2",
    placeId: "1",
    userId: "102",
    userName: "Maria Garcia",
    userAvatar: "https://i.pravatar.cc/150?img=11",
    rating: 4,
    comment: "Beautiful place with rich history. The guided tour was informative, though it was quite crowded when we visited.",
    date: "April 2, 2025",
    helpful: 17
  },
  {
    id: "3",
    placeId: "2",
    userId: "103",
    userName: "David Kim",
    userAvatar: "https://i.pravatar.cc/150?img=12",
    rating: 5,
    comment: "The market is a sensory delight! Try the traditional pastries from the stall near the entrance - they're made with a recipe that's over 200 years old.",
    date: "March 27, 2025",
    helpful: 32
  },
  {
    id: "4",
    placeId: "3",
    userId: "104",
    userName: "Anna Novakova",
    userAvatar: "https://i.pravatar.cc/150?img=13",
    rating: 5,
    comment: "Standing in this square feels like stepping back in time. The astronomical clock is even more impressive in person than in photos.",
    date: "March 15, 2025",
    helpful: 29
  },
  {
    id: "5",
    placeId: "4",
    userId: "105",
    userName: "Carlos Mendoza",
    userAvatar: "https://i.pravatar.cc/150?img=14",
    rating: 4,
    comment: "The trails offer breathtaking views, but some sections are challenging. Bring proper hiking gear and start early to avoid afternoon crowds.",
    date: "March 10, 2025",
    helpful: 21
  }
];

// Map markers data (used for the map view)
export const mapMarkers = places.map(place => ({
  id: place.id,
  name: place.name,
  coordinates: place.coordinates,
  category: place.category,
  rating: place.rating,
  imageUrl: place.imageUrl,
  verified: place.verified
}));

// Add these to your existing mock data
export const bookedGuides = [
  {
    id: "booking1",
    placeId: "1",
    guideName: "Raj Mehta",
    bookingDate: "2025-05-15",
    status: "confirmed",
    amount: 75
  }
];
