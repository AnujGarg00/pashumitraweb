import React, { useState } from 'react';
import { Heart, Thermometer, AlertTriangle, Shield, CheckCircle, Stethoscope, Calendar, Bell } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { useLanguage } from './LanguageContext';

export function HealthInfo() {
  const { t, language } = useLanguage();
  const [selectedSymptom, setSelectedSymptom] = useState<string | null>(null);

  const commonDiseases = [
    {
      name: language === 'hi' ? 'बुखार (Fever)' : 'Fever',
      symptoms: language === 'hi' 
        ? ['तेज सांस', 'गर्म कान', 'भूख न लगना', 'सुस्ती']
        : ['Rapid breathing', 'Hot ears', 'Loss of appetite', 'Lethargy'],
      treatment: language === 'hi' 
        ? 'तुरंत डॉक्टर से संपर्क करें, ठंडा पानी दें, छाया में रखें'
        : 'Contact vet immediately, provide cool water, keep in shade',
      severity: 'high',
      icon: Thermometer
    },
    {
      name: language === 'hi' ? 'दस्त (Diarrhea)' : 'Diarrhea',
      symptoms: language === 'hi' 
        ? ['पतला मल', 'पानी की कमी', 'कमजोरी', 'पेट में दर्द']
        : ['Loose stool', 'Dehydration', 'Weakness', 'Abdominal pain'],
      treatment: language === 'hi' 
        ? 'ORS दें, साफ पानी, हल्का भोजन, डॉक्टर की सलाह'
        : 'Give ORS, clean water, light food, consult vet',
      severity: 'medium',
      icon: AlertTriangle
    },
    {
      name: language === 'hi' ? 'खुरपका-मुंहपका' : 'Foot & Mouth Disease',
      symptoms: language === 'hi' 
        ? ['मुंह में छाले', 'पैरों में घाव', 'लार गिरना', 'भूख न लगना']
        : ['Mouth blisters', 'Foot sores', 'Excessive salivation', 'Loss of appetite'],
      treatment: language === 'hi' 
        ? 'तुरंत अलग करें, डॉक्टर बुलाएं, टीकाकरण कराएं'
        : 'Isolate immediately, call vet, get vaccinated',
      severity: 'high',
      icon: Shield
    },
    {
      name: language === 'hi' ? 'मास्टाइटिस' : 'Mastitis',
      symptoms: language === 'hi' 
        ? ['थन में सूजन', 'गर्म थन', 'दूध में खून', 'दर्द']
        : ['Udder swelling', 'Hot udder', 'Blood in milk', 'Pain'],
      treatment: language === 'hi' 
        ? 'थन की सफाई, एंटीबायोटिक, दूध निकालना बंद न करें'
        : 'Clean udder, antibiotics, continue milking',
      severity: 'medium',
      icon: Heart
    }
  ];

  const vaccinationSchedule = [
    {
      vaccine: language === 'hi' ? 'FMD (खुरपका-मुंहपका)' : 'FMD (Foot & Mouth)',
      age: language === 'hi' ? '4-6 महीने' : '4-6 months',
      frequency: language === 'hi' ? 'हर 6 महीने' : 'Every 6 months',
      importance: 'high'
    },
    {
      vaccine: language === 'hi' ? 'HS (हेमोरेजिक सेप्टिसीमिया)' : 'HS (Hemorrhagic Septicemia)',
      age: language === 'hi' ? '6 महीने' : '6 months',
      frequency: language === 'hi' ? 'वार्षिक' : 'Annual',
      importance: 'high'
    },
    {
      vaccine: language === 'hi' ? 'BQ (ब्लैक क्वार्टर)' : 'BQ (Black Quarter)',
      age: language === 'hi' ? '6 महीने' : '6 months',
      frequency: language === 'hi' ? 'वार्षिक' : 'Annual',
      importance: 'medium'
    },
    {
      vaccine: language === 'hi' ? 'Anthrax (एंथ्रेक्स)' : 'Anthrax',
      age: language === 'hi' ? '6 महीने' : '6 months',
      frequency: language === 'hi' ? 'वार्षिक' : 'Annual',
      importance: 'medium'
    }
  ];

  const healthTips = [
    {
      title: language === 'hi' ? 'नियमित जांच' : 'Regular Checkup',
      description: language === 'hi' 
        ? 'महीने में एक बार पशु चिकित्सक से जांच कराएं'
        : 'Get veterinary checkup done monthly',
      icon: Stethoscope,
      color: 'bg-blue-100 text-blue-700'
    },
    {
      title: language === 'hi' ? 'साफ-सफाई' : 'Cleanliness',
      description: language === 'hi' 
        ? 'बाड़े की रोज सफाई, साफ पानी और भोजन दें'
        : 'Daily cleaning of shed, provide clean water and food',
      icon: Shield,
      color: 'bg-green-100 text-green-700'
    },
    {
      title: language === 'hi' ? 'टीकाकरण' : 'Vaccination',
      description: language === 'hi' 
        ? 'समय पर सभी टीके लगवाएं, रिकॉर्ड रखें'
        : 'Get all vaccines on time, maintain records',
      icon: Calendar,
      color: 'bg-purple-100 text-purple-700'
    },
    {
      title: language === 'hi' ? 'लक्षण पहचानें' : 'Identify Symptoms',
      description: language === 'hi' 
        ? 'बीमारी के शुरुआती लक्षणों को पहचानना सीखें'
        : 'Learn to identify early disease symptoms',
      icon: Bell,
      color: 'bg-red-100 text-red-700'
    }
  ];

  const emergencySignsData = language === 'hi' ? [
    'तेज बुखार (104°F से ज्यादा)',
    'सांस लेने में तकलीफ',
    'खून आना (मुंह, नाक, मल)',
    '24 घंटे से खाना न खाना',
    'चलने में असमर्थता',
    'तेज दर्द के लक्षण'
  ] : [
    'High fever (above 104°F)',
    'Breathing difficulty',
    'Bleeding (mouth, nose, stool)',
    'Not eating for 24 hours',
    'Unable to walk',
    'Signs of severe pain'
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Heart className="h-8 w-8 text-red-600" />
          <h1 className="text-3xl font-semibold text-green-800">{t('health')}</h1>
        </div>
        <p className="text-lg text-green-600">
          {language === 'hi' 
            ? 'आपके पशुओं के स्वास्थ्य की संपूर्ण जानकारी'
            : 'Complete health information for your livestock'
          }
        </p>
      </div>

      {/* Emergency Alert */}
      <Alert className="border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800">
          <strong>
            {language === 'hi' ? 'आपातकाल में:' : 'In Emergency:'}
          </strong>{' '}
          {language === 'hi' 
            ? 'तुरंत नजदीकी पशु चिकित्सक से संपर्क करें - 1962 (पशु हेल्पलाइन)'
            : 'Contact nearest veterinarian immediately - 1962 (Animal Helpline)'
          }
        </AlertDescription>
      </Alert>

      {/* Health Tips */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-green-800">
          {language === 'hi' ? 'स्वास्थ्य सुझाव' : 'Health Tips'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {healthTips.map((tip, index) => {
            const Icon = tip.icon;
            return (
              <Card key={index} className="border-green-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 rounded-full ${tip.color} flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold mb-2">{tip.title}</h3>
                  <p className="text-sm text-gray-600">{tip.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Common Diseases */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-green-800">
          {language === 'hi' ? 'सामान्य बीमारियां' : 'Common Diseases'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {commonDiseases.map((disease, index) => {
            const Icon = disease.icon;
            return (
              <Card key={index} className="border-green-200">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Icon className="h-6 w-6 text-gray-600" />
                    <div className="flex-1">
                      <CardTitle className="text-lg">{disease.name}</CardTitle>
                      <Badge 
                        variant={disease.severity === 'high' ? 'destructive' : 'secondary'}
                        className="mt-1"
                      >
                        {disease.severity === 'high' 
                          ? (language === 'hi' ? 'गंभीर' : 'Serious')
                          : (language === 'hi' ? 'मध्यम' : 'Moderate')
                        }
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium mb-2">
                      {language === 'hi' ? 'लक्षण:' : 'Symptoms:'}
                    </p>
                    <ul className="space-y-1">
                      {disease.symptoms.map((symptom, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <div className="h-1.5 w-1.5 bg-red-500 rounded-full"></div>
                          {symptom}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium mb-2">
                      {language === 'hi' ? 'उपचार:' : 'Treatment:'}
                    </p>
                    <p className="text-sm text-gray-700">{disease.treatment}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Vaccination Schedule */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-green-800 flex items-center gap-2">
            <Shield className="h-6 w-6" />
            {language === 'hi' ? 'टीकाकरण तालिका' : 'Vaccination Schedule'}
          </CardTitle>
          <CardDescription>
            {language === 'hi' 
              ? 'अपने पशुओं को बीमारियों से बचाने के लिए'
              : 'To protect your animals from diseases'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-green-200">
                  <th className="text-left py-3">
                    {language === 'hi' ? 'टीका' : 'Vaccine'}
                  </th>
                  <th className="text-left py-3">
                    {language === 'hi' ? 'पहली बार' : 'First Time'}
                  </th>
                  <th className="text-left py-3">
                    {language === 'hi' ? 'बार-बार' : 'Frequency'}
                  </th>
                  <th className="text-left py-3">
                    {language === 'hi' ? 'महत्व' : 'Priority'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {vaccinationSchedule.map((vaccine, index) => (
                  <tr key={index} className="border-b border-green-100">
                    <td className="py-3 font-medium">{vaccine.vaccine}</td>
                    <td className="py-3">{vaccine.age}</td>
                    <td className="py-3">{vaccine.frequency}</td>
                    <td className="py-3">
                      <Badge 
                        variant={vaccine.importance === 'high' ? 'destructive' : 'secondary'}
                      >
                        {vaccine.importance === 'high' 
                          ? (language === 'hi' ? 'उच्च' : 'High')
                          : (language === 'hi' ? 'मध्यम' : 'Medium')
                        }
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Signs */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-800 flex items-center gap-2">
            <AlertTriangle className="h-6 w-6" />
            {language === 'hi' ? 'आपातकालीन लक्षण' : 'Emergency Signs'}
          </CardTitle>
          <CardDescription className="text-red-700">
            {language === 'hi' 
              ? 'इन लक्षणों को देखते ही तुरंत डॉक्टर को बुलाएं'
              : 'Call vet immediately if you notice these symptoms'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {emergencySignsData.map((sign, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-red-200">
                <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0" />
                <span className="text-red-800">{sign}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-white rounded-lg border border-red-200">
            <p className="text-red-800">
              <strong>
                {language === 'hi' ? 'याद रखें:' : 'Remember:'}
              </strong>{' '}
              {language === 'hi' 
                ? 'जल्दी पहचान और इलाज से आपके पशु की जान बच सकती है'
                : 'Early detection and treatment can save your animal\'s life'
              }
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}