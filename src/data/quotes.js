export const quotes = [
  {
    id: "quote-1",
    text: "Love and goodwill are the foundation of all spiritual growth",
    author: "Thich Nhat Hanh",
    category: "mindfulness",
    inspiration: 5
  },
  {
    id: "quote-2",
    text: "The greatest gift you can give someone is your presence",
    author: "Thich Nhat Hanh",
    category: "mindfulness",
    inspiration: 5
  },
  {
    id: "quote-3",
    text: "Be the change you wish to see in the world",
    author: "Mahatma Gandhi",
    category: "action",
    inspiration: 5
  },
  {
    id: "quote-4",
    text: "In the midst of movement and chaos, keep stillness inside of you",
    author: "Deepak Chopra",
    category: "peace",
    inspiration: 4
  },
  {
    id: "quote-5",
    text: "Love is not something you give or get; it is something that you are",
    author: "Marianne Williamson",
    category: "love",
    inspiration: 5
  },
  {
    id: "quote-6",
    text: "The way to get started is to quit talking and begin doing",
    author: "Walt Disney",
    category: "action",
    inspiration: 4
  },
  {
    id: "quote-7",
    text: "Peace comes from within. Do not seek it without",
    author: "Buddha",
    category: "peace",
    inspiration: 5
  },
  {
    id: "quote-8",
    text: "When you do things from your soul, you feel a river moving in you, a joy",
    author: "Rumi",
    category: "joy",
    inspiration: 5
  },
  {
    id: "quote-9",
    text: "The only way to do great work is to love what you do",
    author: "Steve Jobs",
    category: "passion",
    inspiration: 4
  },
  {
    id: "quote-10",
    text: "Happiness is not something ready-made. It comes from your own actions",
    author: "Dalai Lama",
    category: "happiness",
    inspiration: 5
  },
  {
    id: "quote-11",
    text: "Every moment is a fresh beginning",
    author: "T.S. Eliot",
    category: "renewal",
    inspiration: 4
  },
  {
    id: "quote-12",
    text: "The present moment is filled with joy and happiness. If you are attentive, you will see it",
    author: "Thich Nhat Hanh",
    category: "mindfulness",
    inspiration: 5
  },
  {
    id: "quote-13",
    text: "Love is the bridge between you and everything",
    author: "Rumi",
    category: "love",
    inspiration: 5
  },
  {
    id: "quote-14",
    text: "Your task is not to seek for love, but merely to seek and find all the barriers within yourself that you have built against it",
    author: "Rumi",
    category: "love",
    inspiration: 5
  },
  {
    id: "quote-15",
    text: "The greatest glory in living lies not in never falling, but in rising every time we fall",
    author: "Nelson Mandela",
    category: "resilience",
    inspiration: 5
  }
];

export const quoteCategories = [
  { id: "mindfulness", name: "Mindfulness", color: "sky-medium" },
  { id: "love", name: "Love", color: "sky-dark" },
  { id: "peace", name: "Peace", color: "sky-light" },
  { id: "action", name: "Action", color: "text-primary" },
  { id: "joy", name: "Joy", color: "sky-medium" },
  { id: "passion", name: "Passion", color: "sky-dark" },
  { id: "happiness", name: "Happiness", color: "sky-light" },
  { id: "renewal", name: "Renewal", color: "text-primary" },
  { id: "resilience", name: "Resilience", color: "sky-medium" }
];

export const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};

export const getQuoteByCategory = (categoryId) => {
  if (!categoryId) return getRandomQuote();
  const categoryQuotes = quotes.filter(quote => quote.category === categoryId);
  if (categoryQuotes.length === 0) return getRandomQuote();
  const randomIndex = Math.floor(Math.random() * categoryQuotes.length);
  return categoryQuotes[randomIndex];
};

export const getHighInspirationQuotes = (minInspiration = 4) => {
  return quotes.filter(quote => quote.inspiration >= minInspiration);
};

export const getQuoteById = (id) => {
  return quotes.find(quote => quote.id === id);
};
