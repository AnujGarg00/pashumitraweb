import React from 'react';
import { Calendar, Heart, AlertTriangle, CheckCircle, Clock, Beef } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { useLanguage } from './LanguageContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function BreedingInfo() {
  const { t, language } = useLanguage();

  const breedingStages = [
    {
      stage: language === 'hi' ? 'प्रजनन तैयारी' : 'Breeding Preparation',
      duration: '1-2 months before',
      description: language === 'hi' 
        ? 'पशु को प्रजनन के लिए तैयार करना'
        : 'Preparing the animal for breeding',
      activities: language === 'hi' 
        ? ['संतुलित आहार', 'वजन बढ़ाना', 'स्वास्थ्य जांच', 'टीकाकरण']
        : ['Balanced nutrition', 'Weight gain', 'Health checkup', 'Vaccination'],
      icon: Heart,
      color: 'bg-pink-100 text-pink-700'
    },
    {
      stage: language === 'hi' ? 'गर्भधारण' : 'Conception',
      duration: '21-day cycle',
      description: language === 'hi' 
        ? 'सही समय पर कृत्रिम गर्भाधान'
        : 'Artificial insemination at right time',
      activities: language === 'hi' 
        ? ['हीट डिटेक्शन', 'AI टाइमिंग', 'रिकॉर्ड रखना', 'आराम देना']
        : ['Heat detection', 'AI timing', 'Record keeping', 'Provide rest'],
      icon: Beef,
      color: 'bg-blue-100 text-blue-700'
    },
    {
      stage: language === 'hi' ? 'गर्भावस्था' : 'Pregnancy',
      duration: '9 months',
      description: language === 'hi' 
        ? 'गर्भवती पशु की देखभाल'
        : 'Care during pregnancy period',
      activities: language === 'hi' 
        ? ['नियमित जांच', 'पोषण बढ़ाना', 'व्यायाम', 'तनाव कम करना']
        : ['Regular checkups', 'Enhanced nutrition', 'Exercise', 'Stress reduction'],
      icon: Calendar,
      color: 'bg-green-100 text-green-700'
    },
    {
      stage: language === 'hi' ? 'प्रसव' : 'Calving/Delivery',
      duration: '2-6 hours',
      description: language === 'hi' 
        ? 'बच्चे का जन्म और देखभाल'
        : 'Birth and immediate care',
      activities: language === 'hi' 
        ? ['साफ जगह', 'डॉक्टर तैयार', 'कोलोस्ट्रम', 'नवजात की देखभाल']
        : ['Clean place', 'Vet ready', 'Colostrum', 'Newborn care'],
      icon: CheckCircle,
      color: 'bg-emerald-100 text-emerald-700'
    }
  ];

  const breedingTips = [
    {
      title: language === 'hi' ? 'सही उम्र' : 'Right Age',
      description: language === 'hi' 
        ? 'गाय - 15-18 महीने, भैंस - 18-24 महीने'
        : 'Cattle - 15-18 months, Buffalo - 18-24 months',
      icon: Clock
    },
    {
      title: language === 'hi' ? 'हीट साइकल' : 'Heat Cycle',
      description: language === 'hi' 
        ? 'हर 21 दिन में आता है, 12-18 घंटे तक रहता है'
        : 'Occurs every 21 days, lasts 12-18 hours',
      icon: Calendar
    },
    {
      title: language === 'hi' ? 'स्वास्थ्य जरूरी' : 'Health Essential',
      description: language === 'hi' 
        ? 'प्रजनन से पहले पूरी स्वास्थ्य जांच'
        : 'Complete health checkup before breeding',
      icon: Heart
    },
    {
      title: language === 'hi' ? 'रिकॉर्ड रखें' : 'Keep Records',
      description: language === 'hi' 
        ? 'प्रजनन की तारीख, गर्भावस्था ट्रैक करें'
        : 'Track breeding dates, pregnancy progress',
      icon: AlertTriangle
    }
  ];

  const nutritionDuringPregnancy = [
    {
      month: language === 'hi' ? 'प्रारंभिक (1-6 महीने)' : 'Early (1-6 months)',
      feed: language === 'hi' ? 'सामान्य आहार + 10% अतिरिक्त' : 'Normal diet + 10% extra',
      focus: language === 'hi' ? 'गुणवत्तापूर्ण चारा' : 'Quality fodder'
    },
    {
      month: language === 'hi' ? 'मध्य (6-8 महीने)' : 'Mid (6-8 months)',
      feed: language === 'hi' ? 'सामान्य आहार + 25% अतिरिक्त' : 'Normal diet + 25% extra',
      focus: language === 'hi' ? 'प्रोटीन और मिनरल्स' : 'Protein and minerals'
    },
    {
      month: language === 'hi' ? 'अंतिम (8-9 महीने)' : 'Late (8-9 months)',
      feed: language === 'hi' ? 'सामान्य आहार + 40% अतिरिक्त' : 'Normal diet + 40% extra',
      focus: language === 'hi' ? 'कैल्शियम और विटामिन्स' : 'Calcium and vitamins'
    }
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Beef className="h-8 w-8 text-green-600" />
          <h1 className="text-3xl font-semibold text-green-800">{t('breeding')}</h1>
        </div>
        <p className="text-lg text-green-600">
          {language === 'hi' 
            ? 'सफल प्रजनन के लिए संपूर्ण गाइड'
            : 'Complete guide for successful breeding'
          }
        </p>
      </div>

      {/* Breeding Stages */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-green-800">
          {language === 'hi' ? 'प्रजनन के चरण' : 'Breeding Stages'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {breedingStages.map((stage, index) => {
            const Icon = stage.icon;
            return (
              <Card key={index} className="border-green-200">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-full ${stage.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{stage.stage}</CardTitle>
                      <CardDescription>{stage.duration}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700">{stage.description}</p>
                  <div className="space-y-2">
                    <p className="font-medium">
                      {language === 'hi' ? 'मुख्य गतिविधियां:' : 'Key Activities:'}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {stage.activities.map((activity, idx) => (
                        <Badge key={idx} variant="secondary" className="bg-green-100 text-green-800">
                          {activity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Breeding Tips */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-green-800">
          {language === 'hi' ? 'प्रजनन सुझाव' : 'Breeding Tips'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {breedingTips.map((tip, index) => {
            const Icon = tip.icon;
            return (
              <Card key={index} className="border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Icon className="h-8 w-8 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">{tip.title}</h3>
                      <p className="text-gray-600">{tip.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Pregnancy Nutrition */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-green-800">
            {language === 'hi' ? 'गर्भावस्था में पोषण' : 'Pregnancy Nutrition'}
          </CardTitle>
          <CardDescription>
            {language === 'hi' 
              ? 'गर्भावस्था के दौरान आहार आवश्यकताएं'
              : 'Nutritional requirements during pregnancy'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {nutritionDuringPregnancy.map((period, index) => (
              <div key={index} className="bg-white p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold mb-2">{period.month}</h4>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-gray-600">
                      {language === 'hi' ? 'आहार:' : 'Feed:'}
                    </span>
                    <p className="font-medium">{period.feed}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">
                      {language === 'hi' ? 'फोकस:' : 'Focus:'}
                    </span>
                    <p className="font-medium">{period.focus}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Visual Guide */}
      <Card>
        <CardHeader>
          <CardTitle className="text-green-800">
            {language === 'hi' ? 'प्रजनन चक्र' : 'Breeding Cycle'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1620388952744-51681e244cc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBjYXR0bGUlMjBjb3clMjBidWZmYWxvJTIwZmFybXxlbnwxfHx8fDE3NTcyMzcyNjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Breeding cycle"
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg flex items-end">
              <div className="p-6 text-white">
                <p className="text-lg">
                  {language === 'hi' 
                    ? 'सफल प्रजनन के लिए सही समय, पोषण और देखभाल जरूरी है'
                    : 'Successful breeding requires proper timing, nutrition and care'
                  }
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}