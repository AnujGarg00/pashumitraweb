import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Lightbulb, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { useLanguage } from './LanguageContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// Gemini API Configuration - Vercel compatible
const getApiKey = () => {
  // For local development
  if (typeof window === 'undefined') {
    return process.env.REACT_APP_GEMINI_API_KEY;
  }
  
  // For client-side (Vercel builds inject these at build time)
  return process.env.REACT_APP_GEMINI_API_KEY || 
         (window as any).__ENV__?.REACT_APP_GEMINI_API_KEY;
};

const GEMINI_API_KEY = getApiKey();
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

export function Chatbot() {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: language === 'hi' 
        ? 'नमस्ते! मैं पशुमित्र AI असिस्टेंट हूं। मैं आपके पशुओं के बारे में किसी भी प्रश्न में आपकी सहायता कर सकता हूं।'
        : 'Hello! I\'m PashuMitra AI Assistant. I can help you with any questions about your livestock.',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const createSystemPrompt = (userMessage: string) => {
    const basePrompt = language === 'hi' 
      ? `तुम एक विशेषज्ञ पशुपालन सलाहकार हो। तुम्हें केवल पशुपालन और कृषि पशुओं के बारे में बात करनी है।

         महत्वपूर्ण नियम:
         - तुम केवल पशुओं (गाय, भैंस, बकरी, भेड़, मुर्गी, सूअर आदि) के बारे में जवाब दोगे
         - अगर कोई प्रश्न पशुओं से संबंधित नहीं है, तो विनम्रता से मना कर दो
         - तुम्हारे विशेषज्ञता के क्षेत्र हैं:
           * पशुओं का स्वास्थ्य और बीमारियां
           * दूध/अंडा/मांस उत्पादन
           * चारा और पोषण
           * भारतीय नस्लों की पहचान
           * पशुपालन की तकनीकें
           * पशु आवास और देखभाल
           * टीकाकरण कार्यक्रम
         
         अगर कोई राजनीति, तकनीक, फिल्म, खेल या अन्य विषय पूछे तो कहना:
         "मैं केवल पशुपालन विशेषज्ञ हूं। कृपया अपने पशुओं से संबंधित प्रश्न पूछें।"
         
         हमेशा व्यावहारिक सलाह दो और गंभीर स्थिति में पशु चिकित्सक की सलाह लेने को कहो।
         
         प्रश्न: ${userMessage}`
      : `You are a LIVESTOCK AND ANIMAL FARMING expert. You ONLY discuss topics related to animals and farming.

         STRICT RULES:
         - ONLY answer questions about livestock, farm animals, and animal husbandry
         - If asked about anything else, politely decline and redirect to animal topics
         - Your expertise areas are:
           * Animal health and diseases
           * Milk/egg/meat production
           * Feed and nutrition
           * Indian/global breed identification
           * Animal husbandry techniques
           * Animal housing and care
           * Vaccination programs
           * Breeding and genetics
         
         If asked about politics, technology, movies, sports, or other non-animal topics, respond:
         "I'm specialized only in livestock and animal farming. Please ask me questions about your animals or farming."
         
         Always provide practical advice and recommend consulting a veterinarian for serious health issues.
         Keep responses helpful and focused on animals only.
         
         Question: ${userMessage}`;
    
    return basePrompt;
  };

  const callGeminiAPI = async (userMessage: string): Promise<string> => {
    try {
      // Debug: Log if API key exists (without exposing the key)
      console.log('API Key exists:', !!GEMINI_API_KEY);
      console.log('API Key length:', GEMINI_API_KEY?.length || 0);
      
      if (!GEMINI_API_KEY) {
        console.error('Gemini API key not found in environment variables');
        throw new Error('Gemini API key not configured');
      }

      const prompt = createSystemPrompt(userMessage);
      
      const response = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 1,
            topP: 1,
            maxOutputTokens: 512,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        }),
      });

      console.log('API Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`API request failed: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('API Response received:', !!data.candidates);
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        return data.candidates[0].content.parts[0].text;
      } else {
        console.error('Invalid API response structure:', data);
        throw new Error('Invalid response format from Gemini API');
      }
    } catch (error) {
      console.error('Gemini API Error Details:', error);
      
      // More specific error messages
      if (error instanceof Error) {
        if (error.message.includes('not configured')) {
          return language === 'hi' 
            ? '⚙️ API कॉन्फ़िगरेशन की समस्या है। कृपया डेवलपर से संपर्क करें।'
            : '⚙️ API configuration issue. Please contact the developer.';
        }
        if (error.message.includes('403') || error.message.includes('401')) {
          return language === 'hi' 
            ? '🔑 API key की समस्या है। कृपया डेवलपर से संपर्क करें।'
            : '🔑 API key issue. Please contact the developer.';
        }
        if (error.message.includes('429')) {
          return language === 'hi' 
            ? '⏱️ बहुत सारे अनुरोध हो गए हैं। कृपया थोड़ी देर बाद कोशिश करें।'
            : '⏱️ Too many requests. Please try again in a moment.';
        }
      }
      
      // Fallback response
      return language === 'hi' 
        ? '❌ तकनीकी समस्या हो रही है। कृपया थोड़ी देर बाद कोशिश करें। (Error logged to console)'
        : '❌ Technical issues right now. Please try again later. (Error logged to console)';
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    try {
      // Call Gemini API
      const botResponseText = await callGeminiAPI(currentMessage);
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponseText,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error getting bot response:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: language === 'hi' 
          ? 'क्षमा करें, कुछ गलत हुआ। कृपया दोबारा कोशिश करें।'
          : 'Sorry, something went wrong. Please try again.',
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickQuestions = language === 'hi' ? [
    'दूध उत्पादन कैसे बढ़ाएं?',
    'गाय की बीमारी के लक्षण क्या हैं?',
    'अच्छा चारा कौन सा है?',
    'भारतीय नस्ल की पहचान कैसे करें?'
  ] : [
    'How to increase milk production?',
    'What are signs of cattle disease?',
    'What is good feed for cattle?',
    'How to identify Indian breeds?'
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <MessageCircle className="h-8 w-8 text-green-600" />
          <h1 className="text-3xl font-semibold text-green-800">{t('chatbot')}</h1>
        </div>
        <p className="text-lg text-green-600">{t('chatWithAI')}</p>
      </div>

      {/* Quick Questions */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800 flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Quick Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {quickQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                className="text-left justify-start h-auto p-3 border-green-200 hover:bg-green-50"
                onClick={() => setInputMessage(question)}
              >
                {question}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card className="h-96">
        <CardContent className="p-0 h-full flex flex-col">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${
                    message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <div className={`p-2 rounded-full ${
                    message.sender === 'user' ? 'bg-green-600' : 'bg-gray-200'
                  }`}>
                    {message.sender === 'user' ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Bot className="h-4 w-4 text-gray-600" />
                    )}
                  </div>
                  <div className={`max-w-xs lg:max-w-md p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-green-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-gray-200">
                    <Bot className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder={t('askQuestion')}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-1"
              />
              <Button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-green-600 hover:bg-green-700"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">{t('send')}</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
