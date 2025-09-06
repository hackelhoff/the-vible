export const siteContent = {
  site: {
    name: "The Vible",
    tagline: "Love and goodwill are just a ✨Vibe✨",
    description: "A lifestyle philosophy centered around love and goodwill as a way of being"
  },
  
  navigation: {
    home: "Home",
    store: "Store",
    about: "About"
  },
  
  home: {
    hero: {
      title: "Love and goodwill are just a ✨Vibe✨",
      subtitle: "Embrace the energy that connects us all",
      description: "The Vible is more than a philosophy—it's a way of living that recognizes the profound impact of love and goodwill in our daily lives.",
      cta: "Explore the Vibe"
    },
    
    philosophy: {
      title: "The Philosophy",
      sections: [
        {
          title: "Love as Foundation",
          content: "Love isn't just an emotion—it's the fundamental energy that sustains all life. When we operate from a place of love, we create ripples of positive change that extend far beyond our immediate experience.",
          icon: "heart"
        },
        {
          title: "Goodwill in Action",
          content: "Goodwill is the practical expression of love. It's choosing kindness in every interaction, extending compassion to strangers, and finding ways to serve others without expectation of return.",
          icon: "handshake"
        },
        {
          title: "The Vibe Effect",
          content: "When love and goodwill become your default state, you naturally attract similar energy. This creates a positive feedback loop that transforms not just your life, but the lives of everyone around you.",
          icon: "sparkles"
        }
      ]
    },
    
    benefits: {
      title: "Why Choose This Vibe?",
      items: [
        {
          title: "Inner Peace",
          description: "Living from love and goodwill creates a deep sense of inner peace that external circumstances cannot easily disturb."
        },
        {
          title: "Better Relationships",
          description: "When you approach others with genuine goodwill, relationships naturally flourish and deepen."
        },
        {
          title: "Positive Impact",
          description: "Your energy influences everyone around you, creating a ripple effect of positivity in your community."
        },
        {
          title: "Authentic Joy",
          description: "True joy comes from living in alignment with your highest values and serving others."
        }
      ]
    },
    
    callToAction: {
      title: "Ready to Embrace the Vibe?",
      description: "Join our community of people committed to spreading love and goodwill in the world.",
      primary: "Shop the Vibe",
      secondary: "Join the Movement"
    }
  },
  
  store: {
    title: "The Vible Store",
    subtitle: "Wear your vibe, share your energy",
    description: "Our merchandise is designed to remind you and others of the power of love and goodwill. Every purchase supports our mission to spread positive energy.",
    
    categories: {
      clothing: "Wear your vibe with pride",
      accessories: "Everyday items with positive energy",
      books: "Tools for your spiritual journey",
      home: "Bring the vibe into your space"
    }
  },
  
  footer: {
    mission: "Spreading love and goodwill as a way of being",
    links: {
      home: "Home",
      store: "Store",
      about: "About"
    },
    social: {
      instagram: "Follow our journey",
      email: "Get in touch"
    }
  }
};

export const getContent = (path) => {
  const keys = path.split('.');
  let current = siteContent;
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return null;
    }
  }
  
  return current;
};
