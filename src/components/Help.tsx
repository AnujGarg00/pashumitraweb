import React, { useState } from 'react';
import { HelpCircle, Book, Video, Phone, Mail, MessageSquare, Search, ChevronDown, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { useLanguage } from './LanguageContext';

export function Help() {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [openFAQs, setOpenFAQs] = useState<number[]>([]);

  const toggleFAQ = (index: number) => {
    setOpenFAQs(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      question: language === 'hi' ? 'PashuMitra ऐप कैसे काम करता है?' : 'How does PashuMitra app work?',
      answer: language === 'hi' 
        ? 'PashuMitra AI तकनीक का उपयोग करके आपके पशु की फोटो से नस्ल की पहचान करता है। बस फोटो अपलोड करें और तुरंत परिणाम पाएं।'
        : 'PashuMitra uses AI technology to identify your livestock breed from photos. Simply upload a photo and get instant results.'
    },
    {
      question: language === 'hi' ? 'क्या यह ऐप फ्री है?' : 'Is this app free?',
      answer: language === 'hi' 
        ? 'हां, PashuMitra पूरी तरह से निःशुल्क है। सभी फीचर्स बिना किसी शुल्क के उपलब्ध हैं।'
        : 'Yes, PashuMitra is completely free. All features are available without any charges.'
    },
    {
      question: language === 'hi' ? 'फोटो की गुणवत्ता कैसी होनी चाहिए?' : 'What should be the photo quality?',
      answer: language === 'hi' 
        ? 'स्पष्ट और अच्छी रोशनी में ली गई फोटो सबसे अच्छे परिणाम देती है। पशु का पूरा चेहरा दिखना चाहिए।'
        : 'Clear photos taken in good lighting give the best results. The animal\'s full face should be visible.'
    },
    {
      question: language === 'hi' ? 'कितनी नस्लों की पहचान कर सकते हैं?' : 'How many breeds can be identified?',
      answer: language === 'hi' 
        ? 'वर्तमान में हम 15+ भारतीय गाय-भैंस की नस्लों की पहचान कर सकते हैं जैसे गिर, साहीवाल, रेड सिंधी, थारपारकर, कांकरेज और मुर्राह भैंस।'
        : 'Currently we can identify 15+ Indian cattle and buffalo breeds including Gir, Sahiwal, Red Sindhi, Tharparkar, Kankrej, and Murrah Buffalo.'
    },
    {
      question: language === 'hi' ? 'चैटबॉट कैसे काम करता है?' : 'How does the chatbot work?',
      answer: language === 'hi' 
        ? 'हमारा AI चैटबॉट पशुपालन के बारे में आपके सवालों का जवाब देता है। कोई भी प्रश्न पूछें और तुरंत सलाह पाएं।'
        : 'Our AI chatbot answers your questions about livestock farming. Ask any question and get instant advice.'
    },
    {
      question: language === 'hi' ? 'ऑफलाइन में काम करता है?' : 'Does it work offline?',
      answer: language === 'hi' 
        ? 'कुछ बेसिक जानकारी ऑफलाइन उपलब्ध है, लेकिन AI पहचान के लिए इंटरनेट कनेक्शन जरूरी है।'
        : 'Some basic information is available offline, but internet connection is required for AI identification.'
    }
  ];

  const helpCategories = [
    {
      title: language === 'hi' ? 'शुरुआत करें' : 'Getting Started',
      description: language === 'hi' ? 'ऐप का उपयोग करना सीखें' : 'Learn how to use the app',
      icon: Book,
      color: 'bg-blue-100 text-blue-700'
    },
    {
      title: language === 'hi' ? 'वीडियो ट्यूटोरियल' : 'Video Tutorials',
      description: language === 'hi' ? 'वीडियो के साथ सीखें' : 'Learn with video guides',
      icon: Video,
      color: 'bg-green-100 text-green-700'
    },
    {
      title: language === 'hi' ? 'फोन सपोर्ट' : 'Phone Support',
      description: language === 'hi' ? 'तुरंत सहायता पाएं' : 'Get immediate help',
      icon: Phone,
      color: 'bg-purple-100 text-purple-700'
    },
    {
      title: language === 'hi' ? 'ईमेल सपोर्ट' : 'Email Support',
      description: language === 'hi' ? 'विस्तृत सहायता के लिए' : 'For detailed assistance',
      icon: Mail,
      color: 'bg-orange-100 text-orange-700'
    }
  ];

  const tutorials = [
    {
      title: language === 'hi' ? 'नस्ल की पहचान कैसे करें' : 'How to Identify Breeds',
      duration: language === 'hi' ? '3 मिनट' : '3 minutes',
      steps: language === 'hi' 
        ? ['ऐप खोलें', 'Breedify पर जाएं', 'फोटो अपलोड करें', 'परिणाम देखें']
        : ['Open app', 'Go to Breedify', 'Upload photo', 'View results']
    },
    {
      title: language === 'hi' ? 'पोषण गाइड का उपयोग' : 'Using Nutrition Guide',
      duration: language === 'hi' ? '5 मिनट' : '5 minutes',
      steps: language === 'hi' 
        ? ['Nutrition सेक्शन खोलें', 'पशु की जानकारी दें', 'प्लान जेनरेट करें', 'सुझाव फॉलो करें']
        : ['Open Nutrition section', 'Enter animal details', 'Generate plan', 'Follow recommendations']
    },
    {
      title: language === 'hi' ? 'चैटबॉट का उपयोग' : 'Using Chatbot',
      duration: language === 'hi' ? '2 मिनट' : '2 minutes',
      steps: language === 'hi' 
        ? ['चैट सेक्शन खोलें', 'अपना प्रश्न टाइप करें', 'Send बटन दबाएं', 'जवाब पढ़ें']
        : ['Open Chat section', 'Type your question', 'Press Send button', 'Read the answer']
    }
  ];

  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <HelpCircle className="h-8 w-8 text-green-600" />
          <h1 className="text-3xl font-semibold text-green-800">{t('help')}</h1>
        </div>
        <p className="text-lg text-green-600">
          {language === 'hi' 
            ? 'PashuMitra का उपयोग करने में आपकी सहायता के लिए यहां हैं'
            : 'We\'re here to help you get the most out of PashuMitra'
          }
        </p>
      </div>

      {/* Search */}
      <Card className="border-green-200">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder={language === 'hi' ? 'अपना प्रश्न खोजें...' : 'Search your question...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Help Categories */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-green-800">
          {language === 'hi' ? 'सहायता श्रेणियां' : 'Help Categories'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {helpCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card key={index} className="border-green-200 hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold mb-2">{category.title}</h3>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Quick Tutorials */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-green-800">
          {language === 'hi' ? 'क्विक ट्यूटोरियल' : 'Quick Tutorials'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tutorials.map((tutorial, index) => (
            <Card key={index} className="border-green-200">
              <CardHeader>
                <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Video className="h-4 w-4" />
                  {tutorial.duration}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {tutorial.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-medium">
                        {stepIndex + 1}
                      </div>
                      <span className="text-sm">{step}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-green-800">
          {language === 'hi' ? 'अक्सर पूछे जाने वाले प्रश्न' : 'Frequently Asked Questions'}
        </h2>
        <div className="space-y-4">
          {filteredFAQs.map((faq, index) => (
            <Card key={index} className="border-green-200">
              <Collapsible>
                <CollapsibleTrigger 
                  className="w-full"
                  onClick={() => toggleFAQ(index)}
                >
                  <CardHeader className="hover:bg-green-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg text-left">{faq.question}</CardTitle>
                      {openFAQs.includes(index) ? (
                        <ChevronDown className="h-5 w-5 text-green-600" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-green-600" />
                      )}
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <p className="text-gray-700">{faq.answer}</p>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-green-800">
            {language === 'hi' ? 'अभी भी सहायता चाहिए?' : 'Still Need Help?'}
          </CardTitle>
          <CardDescription>
            {language === 'hi' 
              ? 'हमारी सपोर्ट टीम से सीधे संपर्क करें'
              : 'Contact our support team directly'
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">
                    {language === 'hi' ? 'फोन सपोर्ट' : 'Phone Support'}
                  </p>
                  <p className="text-sm text-gray-600">1800-123-PASHU</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">
                    {language === 'hi' ? 'ईमेल सपोर्ट' : 'Email Support'}
                  </p>
                  <p className="text-sm text-gray-600">support@pashumitra.com</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">
                    {language === 'hi' ? 'लाइव चैट' : 'Live Chat'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {language === 'hi' ? 'सोम-शुक्र 9AM-6PM' : 'Mon-Fri 9AM-6PM'}
                  </p>
                </div>
              </div>
              <Button className="bg-green-600 hover:bg-green-700">
                {language === 'hi' ? 'चैट शुरू करें' : 'Start Chat'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}