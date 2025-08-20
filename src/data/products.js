export const products = [
  {
    id: "product-1",
    name: "Vibe T-Shirt",
    description: "Spread love and goodwill with this comfortable, high-quality cotton tee featuring The Vible logo",
    price: 29.99,
    image: "/images/vibe-tshirt.jpg",
    category: "clothing",
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    featured: true
  },
  {
    id: "product-2",
    name: "Cloudy Sky Hoodie",
    description: "Embrace the calming energy with this soft, cozy hoodie in our signature cloudy blue sky color",
    price: 49.99,
    image: "/images/cloudy-sky-hoodie.jpg",
    category: "clothing",
    sizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true,
    featured: true
  },
  {
    id: "product-3",
    name: "Vibe Sticker Pack",
    description: "Decorate your world with love and goodwill. Set of 5 high-quality vinyl stickers",
    price: 9.99,
    image: "/images/vibe-stickers.jpg",
    category: "accessories",
    sizes: [],
    inStock: true,
    featured: false
  },
  {
    id: "product-4",
    name: "Mindfulness Journal",
    description: "A beautiful journal to document your journey toward love and goodwill. 120 pages with guided prompts",
    price: 19.99,
    image: "/images/mindfulness-journal.jpg",
    category: "books",
    sizes: [],
    inStock: true,
    featured: false
  },
  {
    id: "product-5",
    name: "Vibe Water Bottle",
    description: "Stay hydrated while spreading positive energy. 32oz stainless steel bottle with The Vible design",
    price: 24.99,
    image: "/images/vibe-water-bottle.jpg",
    category: "accessories",
    sizes: [],
    inStock: true,
    featured: false
  },
  {
    id: "product-6",
    name: "Love & Goodwill Poster",
    description: "Beautiful wall art featuring our core message. 18x24 inch high-quality print",
    price: 14.99,
    image: "/images/love-goodwill-poster.jpg",
    category: "home",
    sizes: [],
    inStock: true,
    featured: false
  }
];

export const categories = [
  { id: "clothing", name: "Clothing", description: "Wear your vibe with pride" },
  { id: "accessories", name: "Accessories", description: "Everyday items with positive energy" },
  { id: "books", name: "Books & Journals", description: "Tools for your spiritual journey" },
  { id: "home", name: "Home & Decor", description: "Bring the vibe into your space" }
];

export const getProductsByCategory = (categoryId) => {
  if (!categoryId) return products;
  return products.filter(product => product.category === categoryId);
};

export const getFeaturedProducts = () => {
  return products.filter(product => product.featured);
};

export const getProductById = (id) => {
  return products.find(product => product.id === id);
};
