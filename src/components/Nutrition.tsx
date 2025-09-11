import React, { useState } from 'react';
import { Utensils, Clock, Wheat, Droplets, AlertCircle, Calculator } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { useLanguage } from './LanguageContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Nutrition() {
  const { t } = useLanguage();
  const [animalType, setAnimalType] = useState('');
  const [weight, setWeight] = useState('');
  const [milkProduction, setMilkProduction] = useState('');
  const [nutritionPlan, setNutritionPlan] = useState<any>(null);

  const generatePlan = () => {
    const plan = {
      totalFeed: weight ? Math.round(Number(weight) * 0.03) : 15,
      feeds: [
        { name: 'Dry Fodder (भूसा)', amount: '8-10 kg', time: 'Morning & Evening', icon: Wheat },
        { name: 'Green Fodder (हरा चारा)', amount: '20-25 kg', time: 'Throughout day', icon: Wheat },
        { name: 'Concentrate (दाना मिश्रण)', amount: '4-5 kg', time: 'Morning & Evening', icon: Utensils },
        { name: 'Water (पानी)', amount: '80-100 L', time: 'Always available', icon: Droplets }
      ],
      schedule: [
        { time: '6:00 AM', activity: 'Morning feed + concentrate', amount: '50% of daily' },
        { time: '12:00 PM', activity: 'Green fodder + water', amount: 'Fresh supply' },
        { time: '6:00 PM', activity: 'Evening feed + concentrate', amount: '50% of daily' },
        { time: '9:00 PM', activity: 'Night fodder', amount: 'Light feeding' }
      ]
    };
    setNutritionPlan(plan);
  };

  const feedTypes = [
    {
      name: 'Green Fodder (हरा चारा)',
      description: 'Fresh grass, maize, sorghum',
      benefits: ['High fiber', 'Easy digestion', 'Cost effective'],
      image: 'https://images.unsplash.com/photo-1613408857068-6d231d0c6875?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwY2F0dGxlJTIwbnV0cml0aW9uJTIwZmVlZHxlbnwxfHx8fDE3NTcyMzcyNzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      name: 'Dry Fodder (भूसा)',
      description: 'Wheat straw, rice straw, hay',
      benefits: ['Bulk feeding', 'Fiber source', 'Available year-round'],
      image: 'https://images.unsplash.com/photo-1613408857068-6d231d0c6875?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwY2F0dGxlJTIwbnV0cml0aW9uJTIwZmVlZHxlbnwxfHx8fDE3NTcyMzcyNzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      name: 'Concentrate (दाना मिश्रण)',
      description: 'Grains, oil cakes, minerals',
      benefits: ['High energy', 'Protein rich', 'Better milk yield'],
      image: 'https://images.unsplash.com/photo-1613408857068-6d231d0c6875?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwY2F0dGxlJTIwbnV0cml0aW9uJTIwZmVlZHxlbnwxfHx8fDE3NTcyMzcyNzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ];

  const nutritionTips = [
    {
      title: 'Balanced Diet (संतुलित आहार)',
      tip: 'Mix different types of fodder for complete nutrition',
      icon: Utensils
    },
    {
      title: 'Fresh Water (स्वच्छ पानी)',
      tip: 'Ensure clean water is always available',
      icon: Droplets
    },
    {
      title: 'Regular Timing (नियमित समय)',
      tip: 'Feed at the same time daily for better digestion',
      icon: Clock
    },
    {
      title: 'Quality Check (गुणवत्ता जांच)',
      tip: 'Check fodder quality before feeding',
      icon: AlertCircle
    }
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-semibold text-green-800">{t('nutrition')}</h1>
        <p className="text-lg text-green-600">Get personalized nutrition recommendations for your cattle</p>
      </div>

      {/* Nutrition Calculator */}
      <Card className="border-green-200">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calculator className="h-6 w-6 text-green-600" />
            <CardTitle className="text-green-800">Nutrition Calculator</CardTitle>
          </div>
          <CardDescription>Enter your animal details for personalized feeding recommendations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="animal-type">Animal Type</Label>
              <Select value={animalType} onValueChange={setAnimalType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select animal type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cattle">Cattle (गाय)</SelectItem>
                  <SelectItem value="buffalo">Buffalo (भैंस)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="Enter weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="milk">Milk Production (L/day)</Label>
              <Input
                id="milk"
                type="number"
                placeholder="Daily milk production"
                value={milkProduction}
                onChange={(e) => setMilkProduction(e.target.value)}
              />
            </div>
          </div>
          <Button onClick={generatePlan} className="bg-green-600 hover:bg-green-700">
            Generate Nutrition Plan
          </Button>
        </CardContent>
      </Card>

      {/* Generated Plan */}
      {nutritionPlan && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-800">Daily Feed Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {nutritionPlan.feeds.map((feed: any, index: number) => {
                const Icon = feed.icon;
                return (
                  <div key={index} className="flex items-center gap-4 p-3 bg-white rounded-lg">
                    <Icon className="h-8 w-8 text-green-600" />
                    <div className="flex-1">
                      <p className="font-medium">{feed.name}</p>
                      <p className="text-sm text-gray-600">{feed.time}</p>
                    </div>
                    <Badge variant="secondary">{feed.amount}</Badge>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-blue-800">Feeding Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {nutritionPlan.schedule.map((item: any, index: number) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-white rounded-lg">
                  <Clock className="h-6 w-6 text-blue-600" />
                  <div className="flex-1">
                    <p className="font-medium">{item.time}</p>
                    <p className="text-sm text-gray-600">{item.activity}</p>
                  </div>
                  <Badge variant="outline">{item.amount}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Feed Types */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-green-800">Types of Feed</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {feedTypes.map((feed, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="h-48 bg-gray-200">
                <ImageWithFallback
                  src={feed.image}
                  alt={feed.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{feed.name}</CardTitle>
                <CardDescription>{feed.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {feed.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Nutrition Tips */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-green-800">Nutrition Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {nutritionTips.map((tip, index) => {
            const Icon = tip.icon;
            return (
              <Card key={index} className="border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Icon className="h-8 w-8 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">{tip.title}</h3>
                      <p className="text-gray-600">{tip.tip}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}