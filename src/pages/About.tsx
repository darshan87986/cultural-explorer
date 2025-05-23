import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star, Map, Image, MapPin, ChevronRight, Users, Globe, BookOpen, ArrowRight } from "lucide-react";

const AboutPage = () => {
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: <MapPin className="h-6 w-6 text-heritage-DEFAULT" />,
      title: "Discover Places",
      description: "Browse through our curated collection of cultural heritage sites, traditions, and hidden gems from around the world.",
      link: "/explore",
      linkText: "Explore Places"
    },
    {
      icon: <Map className="h-6 w-6 text-heritage-DEFAULT" />,
      title: "Interactive Map",
      description: "Find cultural hotspots near you or in places you plan to visit with our interactive map.",
      link: "/map",
      linkText: "Open Map"
    },
    {
      icon: <Image className="h-6 w-6 text-heritage-DEFAULT" />,
      title: "Media Gallery",
      description: "Browse images, videos, and stories from cultural sites, contributed by our community of explorers.",
      link: "/gallery",
      linkText: "View Gallery"
    },
    {
      icon: <Star className="h-6 w-6 text-heritage-DEFAULT" />,
      title: "Community Reviews",
      description: "Read authentic reviews and experiences from other cultural explorers to plan your own visits.",
      link: "/explore",
      linkText: "See Reviews"
    }
  ];

  const steps = [
    {
      number: 1,
      icon: <Globe className="h-5 w-5" />,
      title: "Discover",
      description: "Explore our database of cultural places and traditions, or use the map to find sites near you."
    },
    {
      number: 2,
      icon: <BookOpen className="h-5 w-5" />,
      title: "Contribute",
      description: "Sign up to submit new cultural places, share your experiences, or upload photos and videos."
    },
    {
      number: 3,
      icon: <Users className="h-5 w-5" />,
      title: "Connect",
      description: "Engage with other cultural enthusiasts through reviews, ratings, and shared stories."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      {/* Hero Section with Enhanced Parallax */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/30 z-10" />
        <motion.div 
          className="h-[60vh] min-h-[500px] bg-cover bg-center bg-fixed"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1522542550221-31fd19575a2d')",
            y: scrollY * 0.5
          }}
        >
          <div className="container relative z-20 h-full flex flex-col justify-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center mb-6 text-sm font-medium text-white/80">
                <span className="w-12 h-px bg-heritage-DEFAULT mr-3"></span>
                CULTURAL EXPLORER
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight">
                Discover <span className="text-heritage-DEFAULT">Cultural</span> Heritage
              </h1>
              <p className="text-xl md:text-2xl max-w-2xl text-white/90 mb-8">
                Our mission is to discover, preserve, and celebrate cultural heritage from around the world.
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.div 
                  whileHover={{ scale: 1.03 }} 
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Link to="/explore">
                    <Button 
                      size="lg" 
                      className="bg-transparent hover:bg-heritage-DEFAULT/10 border-2 border-white text-white backdrop-blur-sm"
                    >
                      Start Exploring <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.03 }} 
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Link to="/about">
                    <Button 
                      size="lg" 
                      variant="ghost" 
                      className="text-white hover:text-heritage-DEFAULT hover:bg-white/5"
                    >
                      Learn More
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>
      
      {/* Main Content */}
      <section className="container py-20 space-y-24">
        {/* Our Mission */}
        <motion.div 
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <motion.div 
                className="relative rounded-2xl overflow-hidden aspect-square"
                whileHover={{ scale: 0.98 }}
                transition={{ type: "spring" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-heritage-DEFAULT/20 to-heritage-accent/20 z-10" />
                <img 
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1" 
                  alt="Cultural heritage"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
            <div className="md:w-1/2">
              <div className="inline-block mb-4 px-4 py-2 bg-heritage-DEFAULT/10 rounded-full text-heritage-DEFAULT font-medium">
                Our Purpose
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-medium mb-6">Preserving Cultural Heritage</h2>
              <div className="space-y-5 text-muted-foreground">
                <p className="text-lg">
                  Cultural Explorer was created with a vision to document, preserve, and share the rich tapestry of human cultural heritage around the world.
                </p>
                <p className="text-lg">
                  We believe that cultural places and traditions are our shared inheritance, and by exploring them with respect and curiosity, we can foster greater cross-cultural understanding.
                </p>
                <motion.div 
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="pt-2"
                >
                  <Link to="/mission">
                    <Button 
                      variant="link" 
                      className="px-0 text-heritage-DEFAULT group text-lg"
                    >
                      Read our full mission statement
                      <ChevronRight className="ml-2 h-5 w-5 transition-all group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Features */}
        <div>
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center mb-4 text-sm font-medium text-heritage-DEFAULT">
              <span className="w-8 h-px bg-heritage-DEFAULT mr-3"></span>
              WHAT WE OFFER
              <span className="w-8 h-px bg-heritage-DEFAULT ml-3"></span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-medium mb-3">Explore Cultural Treasures</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Powerful tools to explore and contribute to cultural heritage preservation
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="flex flex-col p-8 bg-card rounded-2xl border hover:border-heritage-DEFAULT/30 transition-all duration-300 group relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                onMouseEnter={() => setIsHovered(index)}
                onMouseLeave={() => setIsHovered(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-heritage-DEFAULT/0 to-heritage-DEFAULT/0 group-hover:from-heritage-DEFAULT/5 group-hover:to-heritage-accent/5 transition-all duration-500 z-0" />
                <div className="relative z-10">
                  <div className="h-14 w-14 rounded-2xl bg-heritage-DEFAULT/10 flex items-center justify-center mb-6 group-hover:bg-heritage-DEFAULT/20 transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-4 group-hover:text-heritage-DEFAULT transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {feature.description}
                  </p>
                  <div className="mt-auto">
                    <Link to={feature.link}>
                      <Button 
                        variant="link" 
                        className="px-0 text-foreground group-hover:text-heritage-DEFAULT transition-colors"
                      >
                        {feature.linkText}
                        <motion.span
                          animate={{ 
                            x: isHovered === index ? 8 : 5
                          }}
                          transition={{ type: "spring", stiffness: 500 }}
                          className="inline-block ml-2"
                        >
                          <ArrowRight className="h-4 w-4 transition-all group-hover:translate-x-1" />
                        </motion.span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* How It Works */}
        <div className="bg-heritage-DEFAULT/3 rounded-3xl p-12">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block mb-4 px-6 py-2 bg-heritage-DEFAULT/10 rounded-full text-heritage-DEFAULT font-medium">
              Simple Steps
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-medium mb-3">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join our community in just a few simple steps
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                className="flex flex-col items-center text-center p-8 bg-background rounded-xl border hover:shadow-lg transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <motion.div 
                  className="h-20 w-20 rounded-full bg-heritage-DEFAULT/10 flex items-center justify-center mb-6 text-heritage-DEFAULT text-3xl font-bold relative group"
                  whileHover={{ scale: 1.05 }}
                >
                  {step.number}
                  <motion.div 
                    className="absolute -bottom-2 -right-2 bg-heritage-DEFAULT rounded-full p-2 text-white"
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                  >
                    {step.icon}
                  </motion.div>
                </motion.div>
                <h3 className="text-2xl font-medium mb-4 text-heritage-DEFAULT">{step.title}</h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          {[
            { value: "10K+", label: "Cultural Sites" },
            { value: "500+", label: "Countries" },
            { value: "50K+", label: "Community Members" },
            { value: "100+", label: "Languages" }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              className="text-center p-6 bg-card rounded-xl border hover:shadow-md transition-all"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.p 
                className="text-5xl font-bold text-heritage-DEFAULT mb-3"
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, delay: index * 0.1 }}
              >
                {stat.value}
              </motion.p>
              <p className="text-muted-foreground text-lg">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
        
        {/* CTA Section */}
        <motion.div 
          className="relative rounded-3xl overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-heritage-DEFAULT/70 to-heritage-accent/70 z-0" />
          <div className="absolute inset-0 opacity-20 z-0" style={{
            backgroundImage: "url('luca-bravo-O453M2Liufs-unsplash.jpg')"
          }} />
          <div className="relative z-10 p-12 md:p-16 text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-medium mb-6 text-black">
              Join Our Global Community
            </h2>
            <p className="text-xl text-black/90 mb-10 max-w-3xl mx-auto">
              Become part of a movement dedicated to preserving and celebrating cultural heritage worldwide.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Link to="/signup">
                  <Button 
                    size="xl" 
                    className="bg-white text-heritage-DEFAULT hover:bg-white/90 px-8 h-14 text-lg font-medium border-2 border-transparent hover:border-white/20"
                  >
                    Create an Account
                  </Button>
                </Link>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Link to="/explore">
                  <Button 
                    size="xl" 
                    variant="outline" 
                    className="text-black px-8 h-14 text-lg font-medium"
                  >
                    Start Exploring
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>
      
      <Footer />
    </div>
  );
};

export default AboutPage;