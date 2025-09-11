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

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (language === 'hi') {
      if (lowerMessage.includes('दूध') || lowerMessage.includes('milk')) {
        return 'दूध उत्पादन बढ़ाने के लिए: 1) संतुलित आहार दें 2) साफ पानी उपलब्ध कराएं 3) नियमित दूध निकालें 4) गाय को तनाव से बचाएं। क्या आप किसी विशेष नस्ल के बारे में जानना चाहते हैं?';
      }
      if (lowerMessage.includes('बीमारी') || lowerMessage.includes('health')) {
        return 'पशु स्वास्थ्य के लिए: 1) नियमित टीकाकरण कराएं 2) साफ-सफाई रखें 3) बुखार, दस्त या खांसी के लक्षण दिखें तो तुरंत डॉक्टर से संपर्क करें। क्या कोई विशेष लक्षण है?';
      }
      if (lowerMessage.includes('चारा') || lowerMessage.includes('feed')) {
        return 'अच्छा चारा: 1) 60% हरा चारा 2) 30% भूसा 3) 10% दाना मिश्रण। गर्मी में अधिक पानी दें और शाम-सुबह खिलाएं।';
      }
      return 'यह एक अच्छा सवाल है! मैं आपकी गायों और भैंसों के पोषण, स्वास्थ्य, नस्ल की पहचान, और देखभाल में मदद कर सकता हूं। कृपया अधिक विस्तार से बताएं कि आप क्या जानना चाहते हैं।';
    } else {
      if (lowerMessage.includes('milk') || lowerMessage.includes('production')) {
        return 'To increase milk production: 1) Provide balanced diet 2) Ensure clean water availability 3) Regular milking schedule 4) Reduce stress. Which breed are you working with?';
      }
      if (lowerMessage.includes('disease') || lowerMessage.includes('sick') || lowerMessage.includes('health')) {
        return 'For animal health: 1) Regular vaccination 2) Maintain hygiene 3) Watch for symptoms like fever, diarrhea, coughing 4) Consult vet immediately if symptoms appear. What specific symptoms are you observing?';
      }
      if (lowerMessage.includes('feed') || lowerMessage.includes('nutrition') || lowerMessage.includes('food')) {
        return 'Ideal feed composition: 1) 60% green fodder 2) 30% dry fodder 3) 10% concentrate mix. Provide more water in summer and feed during cooler hours.';
      }
      if (lowerMessage.includes('breed') || lowerMessage.includes('identify')) {
        return 'I can help identify Indian cattle and buffalo breeds! You can upload a photo using the Breedify feature. Popular Indian breeds include Gir, Sahiwal, Red Sindhi, Tharparkar, Kankrej, and Murrah Buffalo. What would you like to know about these breeds?';
      }
      return 'That\'s a great question! I can help you with cattle and buffalo nutrition, health, breed identification, and care. Please provide more details about what you\'d like to know.';
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
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
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
                    <p className="text-sm">{message.text}</p>
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