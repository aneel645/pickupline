export type PickupLineCategory = {
  id: string;
  name: string;
  icon: string;
  description: string;
};

export type PickupLine = {
  id: string;
  text: string;
  categoryId: string;
  rating: number;
  isFeatured?: boolean;
};

export const categories: PickupLineCategory[] = [
  {
    id: 'funny',
    name: 'Funny',
    icon: 'laugh',
    description: 'Lines that will make them laugh',
  },
  {
    id: 'cheesy',
    name: 'Cheesy',
    icon: 'heart',
    description: 'So cheesy they might just work',
  },
  {
    id: 'clever',
    name: 'Clever',
    icon: 'brain',
    description: 'Show off your wit',
  },
  {
    id: 'sweet',
    name: 'Sweet',
    icon: 'heart',
    description: 'Genuinely nice compliments',
  },
  {
    id: 'nerdy',
    name: 'Nerdy',
    icon: 'glasses',
    description: 'For the intellectually inclined',
  },
  {
    id: 'smooth',
    name: 'Smooth',
    icon: 'sparkles',
    description: 'Subtle and sophisticated',
  },
];

export const pickupLines: PickupLine[] = [
  {
    id: '1',
    text: "Are you a magician? Because whenever I look at you, everyone else disappears.",
    categoryId: 'cheesy',
    rating: 4.2,
    isFeatured: true,
  },
  {
    id: '2',
    text: "Do you have a map? I keep getting lost in your eyes.",
    categoryId: 'cheesy',
    rating: 3.8,
  },
  {
    id: '3',
    text: "If you were a vegetable, you'd be a cute-cumber.",
    categoryId: 'funny',
    rating: 4.1,
  },
  {
    id: '4',
    text: "Are you made of copper and tellurium? Because you're Cu-Te.",
    categoryId: 'nerdy',
    rating: 4.5,
    isFeatured: true,
  },
  {
    id: '5',
    text: "I'm not a photographer, but I can picture us together.",
    categoryId: 'cheesy',
    rating: 3.5,
  },
  {
    id: '6',
    text: "Are you a parking ticket? Because you've got FINE written all over you.",
    categoryId: 'funny',
    rating: 4.0,
  },
  {
    id: '7',
    text: "I must be a snowflake, because I've fallen for you.",
    categoryId: 'sweet',
    rating: 4.3,
  },
  {
    id: '8',
    text: "According to the second law of thermodynamics, you're supposed to share your hotness with me.",
    categoryId: 'nerdy',
    rating: 4.2,
  },
  {
    id: '9',
    text: "Your smile is like Expelliarmus. Simple but disarming.",
    categoryId: 'nerdy',
    rating: 4.7,
    isFeatured: true,
  },
  {
    id: '10',
    text: "I'd never play hide and seek with you because someone like you is impossible to find.",
    categoryId: 'sweet',
    rating: 4.4,
  },
  {
    id: '11',
    text: "Are you a time traveler? Because I see you in my future.",
    categoryId: 'clever',
    rating: 4.1,
  },
  {
    id: '12',
    text: "If you were a triangle, you'd be acute one.",
    categoryId: 'nerdy',
    rating: 3.9,
  },
  {
    id: '13',
    text: "Do you like Star Wars? Because Yoda one for me.",
    categoryId: 'nerdy',
    rating: 4.0,
  },
  {
    id: '14',
    text: "I'm not a mathematician, but I'm pretty good with numbers. For instance, I know yours is missing from my phone.",
    categoryId: 'clever',
    rating: 4.5,
    isFeatured: true,
  },
  {
    id: '15',
    text: "I must be in a museum, because you truly are a work of art.",
    categoryId: 'smooth',
    rating: 4.3,
  },
  {
    id: '16',
    text: "If you were a fruit, you'd be a fine-apple.",
    categoryId: 'funny',
    rating: 3.7,
  },
  {
    id: '17',
    text: "I'm learning about important dates in history. Wanna be one of them?",
    categoryId: 'clever',
    rating: 4.2,
  },
  {
    id: '18',
    text: "Are you a campfire? Because you're hot and I want s'more.",
    categoryId: 'funny',
    rating: 3.8,
  },
  {
    id: '19',
    text: "I'd say God bless you, but it looks like he already did.",
    categoryId: 'smooth',
    rating: 4.1,
  },
  {
    id: '20',
    text: "Your eyes are like the ocean; I could swim in them all day.",
    categoryId: 'sweet',
    rating: 4.0,
  },
  {
    id: '21',
    text: "If beauty were time, you'd be an eternity.",
    categoryId: 'smooth',
    rating: 4.4,
    isFeatured: true,
  },
  {
    id: '22',
    text: "Do you have a name, or can I call you mine?",
    categoryId: 'smooth',
    rating: 3.9,
  },
  {
    id: '23',
    text: "I'm not a dentist, but I could give you a filling.",
    categoryId: 'funny',
    rating: 3.5,
  },
  {
    id: '24',
    text: "Are you French? Because Eiffel for you.",
    categoryId: 'cheesy',
    rating: 3.7,
  },
  {
    id: '25',
    text: "I'm writing a phone book. Can I get your number?",
    categoryId: 'clever',
    rating: 3.8,
  },
  {
    id: '26',
    text: "Is your name Google? Because you have everything I've been searching for.",
    categoryId: 'clever',
    rating: 4.0,
  },
  {
    id: '27',
    text: "If you were a vegetable, you'd be a 'cute-cumber'!",
    categoryId: 'funny',
    rating: 3.6,
  },
  {
    id: '28',
    text: "I'm no mathematician, but I'm pretty good with numbers. Tell you what, give me yours and watch what I can do with it.",
    categoryId: 'clever',
    rating: 4.2,
  },
  {
    id: '29',
    text: "Do you believe in love at first sight, or should I walk by again?",
    categoryId: 'cheesy',
    rating: 3.9,
  },
  {
    id: '30',
    text: "I seem to have lost my phone number. Can I have yours?",
    categoryId: 'cheesy',
    rating: 3.5,
  },
  {
    id: '31',
    text: "Are you a Wi-Fi signal? Because I'm feeling a connection.",
    categoryId: 'nerdy',
    rating: 4.1,
  },
  {
    id: '32',
    text: "Is your name Ariel? Because we mermaid for each other.",
    categoryId: 'cheesy',
    rating: 3.7,
  },
  {
    id: '33',
    text: "Do you like science? Because I've got my ion you.",
    categoryId: 'nerdy',
    rating: 4.0,
  },
  {
    id: '34',
    text: "Are you a camera? Because every time I look at you, I smile.",
    categoryId: 'sweet',
    rating: 4.2,
  },
  {
    id: '35',
    text: "I'm not a hoarder, but I really want to keep you forever.",
    categoryId: 'sweet',
    rating: 3.9,
  },
  {
    id: '36',
    text: "Is your dad a boxer? Because you're a knockout!",
    categoryId: 'funny',
    rating: 3.6,
  },
  {
    id: '37',
    text: "Are you a bank loan? Because you have my interest.",
    categoryId: 'clever',
    rating: 4.3,
    isFeatured: true,
  },
  {
    id: '38',
    text: "Do you have a Band-Aid? Because I just scraped my knee falling for you.",
    categoryId: 'cheesy',
    rating: 3.5,
  },
  {
    id: '39',
    text: "Are you a cat? Because you're purr-fect.",
    categoryId: 'funny',
    rating: 3.8,
  },
  {
    id: '40',
    text: "Is your name Waldo? Because someone like you is hard to find.",
    categoryId: 'sweet',
    rating: 4.1,
  },
  {
    id: '41',
    text: "Are you made of grapes? Because you're fine as wine.",
    categoryId: 'smooth',
    rating: 4.0,
  },
  {
    id: '42',
    text: "Do you like raisins? How about a date?",
    categoryId: 'cheesy',
    rating: 3.7,
  },
  {
    id: '43',
    text: "Are you a dictionary? Because you add meaning to my life.",
    categoryId: 'sweet',
    rating: 4.4,
    isFeatured: true,
  },
  {
    id: '44',
    text: "Is your name Google? Because you're everything I've been searching for.",
    categoryId: 'nerdy',
    rating: 3.9,
  },
  {
    id: '45',
    text: "Do you have a pencil? Because I want to erase your past and write our future.",
    categoryId: 'smooth',
    rating: 4.2,
  },
  {
    id: '46',
    text: "Are you a keyboard? Because you're just my type.",
    categoryId: 'nerdy',
    rating: 4.3,
  },
  {
    id: '47',
    text: "Is your name Wifi? Because I'm really feeling a connection.",
    categoryId: 'nerdy',
    rating: 3.8,
  },
  {
    id: '48',
    text: "Do you have a map? I just got lost in your eyes.",
    categoryId: 'sweet',
    rating: 3.6,
  },
  {
    id: '49',
    text: "Are you a parking ticket? Because you've got 'fine' written all over you.",
    categoryId: 'funny',
    rating: 3.9,
  },
  {
    id: '50',
    text: "Is your dad a baker? Because you're a cutie pie.",
    categoryId: 'cheesy',
    rating: 3.7,
  },
  {
    id: '51',
    text: "Do you like math? Because I want to add you to my life, subtract the distance, multiply the love, and divide the sorrow.",
    categoryId: 'nerdy',
    rating: 4.5,
    isFeatured: true,
  },
  {
    id: '52',
    text: "Are you a campfire? Because you're hot and I want s'more.",
    categoryId: 'funny',
    rating: 3.8,
  },
  {
    id: '53',
    text: "Is your name Ariel? Because we were mermaid for each other.",
    categoryId: 'cheesy',
    rating: 3.6,
  },
  {
    id: '54',
    text: "Do you have a name, or can I call you mine?",
    categoryId: 'smooth',
    rating: 4.0,
  },
  {
    id: '55',
    text: "Are you a time traveler? Because I can see you in my future.",
    categoryId: 'clever',
    rating: 4.2,
  },
  {
    id: '56',
    text: "Is your name Cinderella? Because when I saw you, time stopped.",
    categoryId: 'sweet',
    rating: 4.1,
  },
  {
    id: '57',
    text: "Do you have a sunburn, or are you always this hot?",
    categoryId: 'funny',
    rating: 3.5,
  },
  {
    id: '58',
    text: "Are you a magician? Every time I look at you, everyone else disappears.",
    categoryId: 'smooth',
    rating: 4.3,
  },
  {
    id: '59',
    text: "Is your name Spotify? Because you're the hottest single right now.",
    categoryId: 'clever',
    rating: 4.0,
  },
  {
    id: '60',
    text: "Do you play soccer? Because you're a keeper.",
    categoryId: 'funny',
    rating: 3.9,
  },
  {
    id: '61',
    text: "Are you a bank loan? Because you have my interest.",
    categoryId: 'clever',
    rating: 3.8,
  },
  {
    id: '62',
    text: "Is your name Winter? Because you'll be coming soon.",
    categoryId: 'cheesy',
    rating: 3.5,
  },
  {
    id: '63',
    text: "Do you have a Band-Aid? Because I just scraped my knee falling for you.",
    categoryId: 'cheesy',
    rating: 3.7,
  },
  {
    id: '64',
    text: "Are you a camera? Because every time I look at you, I smile.",
    categoryId: 'sweet',
    rating: 4.4,
    isFeatured: true,
  },
  {
    id: '65',
    text: "Is your name Google? Because you have everything I've been searching for.",
    categoryId: 'nerdy',
    rating: 4.1,
  },
  {
    id: '66',
    text: "Do you like science? Because I've got my ion you.",
    categoryId: 'nerdy',
    rating: 4.2,
  },
  {
    id: '67',
    text: "Are you a dictionary? Because you add meaning to my life.",
    categoryId: 'sweet',
    rating: 4.3,
  },
  {
    id: '68',
    text: "Is your name Wi-Fi? Because I'm feeling a connection.",
    categoryId: 'nerdy',
    rating: 3.9,
  },
  {
    id: '69',
    text: "Do you have a map? I keep getting lost in your eyes.",
    categoryId: 'sweet',
    rating: 4.0,
  },
  {
    id: '70',
    text: "Are you a parking ticket? Because you've got 'fine' written all over you.",
    categoryId: 'funny',
    rating: 3.6,
  },
  {
    id: '71',
    text: "Is your dad a boxer? Because you're a knockout!",
    categoryId: 'funny',
    rating: 3.8,
  },
  {
    id: '72',
    text: "Do you have a pencil? Because I want to erase your past and write our future.",
    categoryId: 'smooth',
    rating: 4.2,
  },
  {
    id: '73',
    text: "Are you a keyboard? Because you're just my type.",
    categoryId: 'nerdy',
    rating: 4.1,
  },
  {
    id: '74',
    text: "Is your name Ariel? Because we mermaid for each other.",
    categoryId: 'cheesy',
    rating: 3.7,
  },
  {
    id: '75',
    text: "Do you like math? Because I want to add you to my life, subtract the distance, multiply the love, and divide the sorrow.",
    categoryId: 'nerdy',
    rating: 4.4,
  },
  {
    id: '76',
    text: "Are you a campfire? Because you're hot and I want s'more.",
    categoryId: 'funny',
    rating: 3.9,
  },
  {
    id: '77',
    text: "Is your name Cinderella? Because when I saw you, time stopped.",
    categoryId: 'sweet',
    rating: 4.3,
    isFeatured: true,
  },
  {
    id: '78',
    text: "Do you have a sunburn, or are you always this hot?",
    categoryId: 'funny',
    rating: 3.6,
  },
  {
    id: '79',
    text: "Are you a magician? Every time I look at you, everyone else disappears.",
    categoryId: 'smooth',
    rating: 4.0,
  },
  {
    id: '80',
    text: "Is your name Spotify? Because you're the hottest single right now.",
    categoryId: 'clever',
    rating: 4.2,
  },
];

export const getLinesByCategory = (categoryId: string): PickupLine[] => {
  return pickupLines.filter(line => line.categoryId === categoryId);
};

export const getFeaturedLines = (): PickupLine[] => {
  return pickupLines.filter(line => line.isFeatured);
};

export const getRandomLine = (): PickupLine => {
  return pickupLines[Math.floor(Math.random() * pickupLines.length)];
};

export const getLineOfTheDay = (): PickupLine => {
  // Use the current date as a seed for pseudo-random selection
  // This ensures the same line is shown all day
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const index = seed % pickupLines.length;
  return pickupLines[index];
};