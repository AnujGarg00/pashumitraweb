import React, { useState } from 'react';
import { Camera, Upload, CheckCircle, Info, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { useLanguage } from './LanguageContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Breedify() {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  // Add this function to your component
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async (e) => {
    setSelectedImage(e.target?.result as string);
    setAnalyzing(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('https://web-production-bb6cb.up.railway.app/predict', {
        method: 'POST',
        body: formData,
      });

      const apiResult = await response.json();
      
      if (apiResult.success && apiResult.predictions.length > 0) {
        const topPrediction = apiResult.predictions[0];
        
        const breedDetails = {
          'gir': {
            name: 'Gir',
            characteristics: [
              'White with red/brown spots',
              'Drooping ears',
              'Prominent forehead hump',
              'Heat resistant',
              'Docile temperament'
            ],
            milkProduction: '10-15 liters/day',
            weight: '385-500 kg',
            origin: 'Gujarat, India',
            description: 'Gir is one of the principal Zebu breeds originating from Gujarat. Known for excellent heat tolerance and good milk production with high butterfat content.'
          },
          'jaffarabadi': {
            name: 'Jaffarabadi Buffalo',
            characteristics: [
              'Jet black color',
              'Very large size',
              'Broad forehead',
              'Drooping horns',
              'Massive build'
            ],
            milkProduction: '12-18 liters/day',
            weight: '500-800 kg',
            origin: 'Gujarat, India',
            description: 'Jaffarabadi is the largest buffalo breed in India, known for high milk yield and massive body structure.'
          },
          'kankrej': {
            name: 'Kankrej',
            characteristics: [
              'Silver-grey to iron-grey color',
              'Large body size',
              'Prominent hump',
              'Long face',
              'Hardy nature'
            ],
            milkProduction: '8-12 liters/day',
            weight: '400-600 kg',
            origin: 'Gujarat-Rajasthan border, India',
            description: 'Kankrej is a dual-purpose breed excellent for both milk and draught work. Known for heat tolerance.'
          },
          'murrah': {
            name: 'Murrah Buffalo',
            characteristics: [
              'Jet black color',
              'Coiled horns',
              'Large size',
              'Well-developed udder',
              'High milk production'
            ],
            milkProduction: '15-25 liters/day',
            weight: '450-650 kg',
            origin: 'Haryana, India',
            description: 'Murrah is considered the best dairy buffalo breed in India, famous for highest milk production.'
          },
          'sahiwal': {
            name: 'Sahiwal',
            characteristics: [
              'Reddish-brown to dark brown',
              'Loose skin with dewlap',
              'Medium-sized hump',
              'Well-developed udder',
              'Heat tolerant'
            ],
            milkProduction: '10-16 liters/day',
            weight: '400-500 kg',
            origin: 'Punjab, India',
            description: 'Sahiwal is one of the best indigenous dairy breeds, known for high milk fat content and heat tolerance.'
          },
                    'brahman': {
            name: 'Brahman',
            characteristics: [
              'Light grey, red, or black color',
              'Loose skin with hump',
              'Large drooping ears',
              'Heat tolerant',
              'Disease resistant'
            ],
            milkProduction: '2-10 liters/day',
            weight: '400-600 kg',
            origin: 'India (developed further in USA, Brazil, Australia)',
            description: 'Brahman is primarily known for hardiness, adaptability, and resistance, mainly used for draught and crossbreeding rather than high milk yield.'
          },
          'brahman_cross': {
            name: 'Brahman Cross',
            characteristics: [
              'Mixed coat colors',
              'Improved adaptability',
              'Higher growth rate',
              'Hardy and disease resistant',
              'Better productivity than pure Brahman'
            ],
            milkProduction: '5-12 liters/day',
            weight: '450-700 kg',
            origin: 'Cross of Brahman with local or exotic breeds',
            description: 'Brahman Cross combines toughness and adaptability of Brahman with productivity traits of other breeds, used for milk or beef depending on cross.'
          },
          'fresian': {
            name: 'Friesian (Holstein Friesian)',
            characteristics: [
              'Black and white coat',
              'Large body size',
              'High milk yield',
              'Straight back',
              'Docile temperament'
            ],
            milkProduction: '20-30 liters/day',
            weight: '550-650 kg (cows), 800-1000 kg (bulls)',
            origin: 'Netherlands (Holland)',
            description: 'Friesian is the world’s top dairy breed, widely used in commercial farming for highest milk production.'
          },
          'fresian_cross': {
            name: 'Friesian Cross',
            characteristics: [
              'Mixed coat colors',
              'Better heat tolerance',
              'Improved fertility',
              'Moderate body size',
              'Balanced milk and adaptability'
            ],
            milkProduction: '10-18 liters/day',
            weight: '400-600 kg',
            origin: 'Cross of Friesian with local breeds like Sahiwal, Gir, or Murrah',
            description: 'Friesian Cross is developed to retain good milk yield while improving adaptability to tropical climates.'
          },
          'sahiwal_cross': {
            name: 'Sahiwal Cross',
            characteristics: [
              'Varied coat colors',
              'Heat and disease resistant',
              'Improved milk yield',
              'Moderate body size',
              'Adaptable to local conditions'
            ],
            milkProduction: '10-16 liters/day',
            weight: '400-550 kg',
            origin: 'Cross of Sahiwal with exotic breeds like Friesian or Jersey',
            description: 'Sahiwal Cross combines disease resistance and adaptability of Sahiwal with higher milk yield of exotic breeds.'
          }
        };

        const breedKey = topPrediction.breed_name.toLowerCase();
        const details = breedDetails[breedKey];

        if (details) {
          setResult({
            breed: details.name,
            confidence: Math.round(topPrediction.confidence * 100),
            characteristics: details.characteristics,
            milkProduction: details.milkProduction,
            weight: details.weight,
            origin: details.origin,
            description: details.description,
            allPredictions: apiResult.predictions
          });
        } else {
          setResult({
            breed: topPrediction.breed_name,
            confidence: Math.round(topPrediction.confidence * 100),
            characteristics: ['Breed details being updated'],
            milkProduction: 'Not specified',
            weight: 'Not specified',
            origin: 'India',
            description: `${topPrediction.breed_name} breed information is being updated.`
          });
        }
        
      } else {
        setResult({
          breed: 'Unknown',
          confidence: 0,
          characteristics: ['Could not identify the breed'],
          milkProduction: 'Unknown',
          weight: 'Unknown',
          origin: 'Unknown',
          description: 'Please upload a clear image of a cow or buffalo.'
        });
      }
      
    } catch (error) {
      console.error('Prediction error:', error);
      setResult({
        breed: 'Error',
        confidence: 0,
        characteristics: ['Connection error occurred'],
        milkProduction: 'Unknown',
        weight: 'Unknown',
        origin: 'Unknown',
        description: 'Could not connect to the AI service. Please try again.'
      });
    } finally {
      setAnalyzing(false);
    }
  };
  
  reader.readAsDataURL(file);
  
  // 🔧 FIX: Reset the file input after processing
  // This ensures upload works every time
  setTimeout(() => {
    if (event.target) {
      event.target.value = '';
    }
  }, 100);
};


  const breeds = [
    {
      name: 'Gir Cow',
      image: 'https://cpimg.tistatic.com/09599896/b/4/Dairy-Gir-Cow.jpg',
      origin: 'Gujarat, India',
      milk: '10-15 L/day'
    },
    {
      name: 'Sahiwal Cow',
      image: 'https://t3.ftcdn.net/jpg/13/66/23/68/360_F_1366236815_HpAkMrjFZvIZjewc4o1QBVoWTE4l04Jf.jpg',
      origin: 'Punjab, India',
      milk: '12-16 L/day'
    },
    {
      name: 'Kankrej Cow',
      image: 'https://images.pexels.com/photos/21377981/pexels-photo-21377981/free-photo-of-photo-of-a-hariana-cow-standing-on-a-road.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      origin: 'Gujarat-Rajasthan border, India',
      milk: '8-12 L/day'
    },
    {
      name: 'Jaffarabadi Buffalo',
      image: 'https://4.imimg.com/data4/HJ/YQ/ANDROID-54944911/product.jpeg',
      origin: 'Gujarat, India',
      milk: '12-18 L/day'
    },
    {
      name: 'Surti Buffalo',
      image: 'https://www.dairyknowledge.in/dkp/sites/default/files/styles/medium_large/public/surti-buffalo.jpg?itok=MHkDFB1Q',
      origin: 'Gujarat, India',
      milk: '8-14 L/day'
    },
    {
      name: 'Murrah Buffalo',
      image: 'https://www.shutterstock.com/image-photo/buffalo-isolated-on-white-background-600nw-553738969.jpg',
      origin: 'Haryana, India',
      milk: '15-25 L/day'
    }
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-semibold text-green-800">{t('breedify')}</h1>
        <p className="text-lg text-green-600">Upload a photo to identify the breed of your cattle or buffalo</p>
      </div>

      {/* Upload Section */}
      <Card className="border-2 border-dashed border-green-300">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            {selectedImage ? (
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Uploaded"
                  className="max-w-full h-64 mx-auto rounded-lg object-cover"
                />
                {analyzing && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                    <div className="text-white text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                      <p>{t('analyzing')}</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <Camera className="h-16 w-16 text-green-500 mx-auto" />
                <p className="text-gray-600">{t('uploadInstruction')}</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                id="breed-upload"
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileUpload}
                className="hidden"
              />
              
              <Button
                onClick={() => document.getElementById('breed-upload')?.click()}
                disabled={analyzing}
                className="bg-green-600 hover:bg-green-700"
              >
                <Upload className="h-4 w-4 mr-2" />
                {selectedImage ? 'Upload Another' : t('selectImage')}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <CardTitle className="text-green-800">{t('breedIdentified')}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">{result.breed}</h3>
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {result.confidence}% Confidence
                  </Badge>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{result.description}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Origin:</span>
                    <span>{result.origin}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Milk Production:</span>
                    <span>{result.milkProduction}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Average Weight:</span>
                    <span>{result.weight}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Key Characteristics:</h4>
                <ul className="space-y-2">
                  {result.characteristics.map((char: string, index: number) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                      <span>{char}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Popular Indian Breeds */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-green-800">Popular Indian Breeds</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {breeds.map((breed, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-64 bg-gray-200">
                <ImageWithFallback
                  src={breed.image}
                  alt={breed.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{breed.name}</CardTitle>
                <CardDescription>
                  Origin: {breed.origin} • Milk: {breed.milk}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
