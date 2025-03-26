import { Platform } from 'react-native';

// In a real production app, you would NEVER store API keys directly in your code
// This is only for demonstration purposes
const API_KEY = "sk-92794b75267f49d49471fe122475f62f";
const API_URL = "https://api.deepseek.com/chat/completions";

type Message = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

export async function generatePickupLine(category: string, tone: string): Promise<string> {
  // Don't make real API calls on web for demo purposes
  if (Platform.OS === 'web') {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Return mock responses for web
    const mockResponses: Record<string, string[]> = {
      funny: [
        "Are you a parking ticket? Because you've got FINE written all over you.",
        "Do you have a name, or can I call you mine? Just kidding, I'd need your number first.",
        "I'm not a photographer, but I can definitely picture us together."
      ],
      cheesy: [
        "Are you made of copper and tellurium? Because you're Cu-Te.",
        "Do you have a map? I keep getting lost in your eyes.",
        "If you were a vegetable, you'd be a cute-cumber."
      ],
      clever: [
        "Are you a time traveler? Because I see you in my future.",
        "I'm not a mathematician, but I'm pretty good with numbers. For instance, I know yours is missing from my phone.",
        "Are you French? Because Eiffel for you."
      ],
      sweet: [
        "I must be a snowflake, because I've fallen for you.",
        "I'd never play hide and seek with you because someone like you is impossible to find.",
        "Your smile is like Expelliarmus. Simple but disarming."
      ],
      nerdy: [
        "According to the second law of thermodynamics, you're supposed to share your hotness with me.",
        "Are you made of beryllium, gold, and titanium? Because you are BeAuTi-ful.",
        "If you were a triangle, you'd be acute one."
      ],
      smooth: [
        "I must be in a museum, because you truly are a work of art.",
        "If beauty were time, you'd be an eternity.",
        "I'd say God bless you, but it looks like he already did."
      ]
    };
    
    // Get random response for the category or default to funny
    const responses = mockResponses[category] || mockResponses.funny;
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  // For native platforms, make the actual API call
  try {
    const systemPrompt = `You are an expert at creating ${category} pickup lines. Create a single, original ${tone} pickup line. Keep it concise, creative, and appropriate. Only respond with the pickup line text, nothing else.`;
    
    const messages: Message[] = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Create a ${category} pickup line with a ${tone} tone.` }
    ];
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: messages,
        stream: false
      })
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error generating pickup line:', error);
    throw error;
  }
}