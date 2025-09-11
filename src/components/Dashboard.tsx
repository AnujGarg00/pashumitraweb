import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Upload, Zap, Heart, Utensils } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { useLanguage } from './LanguageContext';
import { ImageWithFallback } from './figma/ImageWithFallback';
import pashumitraLogo from 'figma:asset/19a212fc1ff0d5bd064bd27c13c5e86eb36b54c4.png';

export function Dashboard() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [result, setResult] = useState<any>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      setSelectedImage(e.target?.result as string);
      setUploading(true);
      
      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('http://localhost:8000/predict', {
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
              name: 'Brahman Cattle',
              characteristics: [
                'Light gray to red or almost black color',
                'Loose skin and pronounced hump over shoulders',
                'Large drooping ears',
                'Heat tolerant',
                'Disease and parasite resistant'
              ],
              milkProduction: '2-10 liters/day (mainly used for draught and crossbreeding)',
              weight: '400-600 kg (cows), 600-800 kg (bulls)',
              origin: 'India (developed further in USA, Brazil, Australia)',
              description: 'Brahman cattle are primarily known for their hardiness, adaptability, and resistance, often used in crossbreeding for beef and draught power rather than high milk production.'
            },
            'brahman_cross': {
              name: 'Brahman Cross',
              characteristics: [
                'Mixed physical traits depending on cross',
                'Improved adaptability',
                'Higher growth rate compared to pure Brahman',
                'Better meat or milk yield depending on breed combination',
                'Hardy and disease resistant'
              ],
              milkProduction: 'Varies (5-12 liters/day depending on cross)',
              weight: '450-700 kg',
              origin: 'Crossbreeding of Brahman with local or exotic breeds',
              description: 'Brahman cross cattle are bred to combine the toughness and heat tolerance of Brahman with the productivity traits of other breeds, suitable for both milk and beef production.'
            },
            'fresian': {
              name: 'Friesian (Holstein Friesian)',
              characteristics: [
                'Black and white (sometimes red and white) coat',
                'Large body size',
                'High milk yield',
                'Straight back',
                'Docile temperament'
              ],
              milkProduction: '20-30 liters/day',
              weight: '550-650 kg (cows), 800-1000 kg (bulls)',
              origin: 'Netherlands (Holland)',
              description: 'Friesian cattle are the world’s highest milk-producing breed, widely used in commercial dairy farming.'
            },
            'fresian_cross': {
              name: 'Friesian Cross',
              characteristics: [
                'Mixed coat colors (black-white, brown, red)',
                'Better heat tolerance than pure Friesian',
                'Improved fertility and adaptability',
                'Moderate body size',
                'Balanced milk production and survivability'
              ],
              milkProduction: '10-18 liters/day',
              weight: '400-600 kg',
              origin: 'Crossbreeding Friesian with local breeds like Sahiwal, Gir, or Murrah',
              description: 'Friesian crosses are developed to maintain good milk production while improving adaptability to tropical climates.'
            },
            'sahiwal_cross': {
              name: 'Sahiwal Cross',
              characteristics: [
                'Mixed coat colors depending on cross',
                'Better adaptability to local climate',
                'Improved milk yield compared to indigenous',
                'Moderate body size',
                'Disease resistance'
              ],
              milkProduction: '10-15 liters/day',
              weight: '400-550 kg',
              origin: 'Crossbreeding Sahiwal with exotic breeds like Friesian or Jersey',
              description: 'Sahiwal cross cattle combine the disease resistance and adaptability of Sahiwal with the higher milk productivity of exotic breeds.'
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
            
            console.log(`Breed identified: ${details.name} (${Math.round(topPrediction.confidence * 100)}%)`);
          } else {
            setResult({
              breed: topPrediction.breed_name,
              confidence: Math.round(topPrediction.confidence * 100),
              characteristics: ['Breed details being updated'],
              milkProduction: 'Not specified',
              weight: 'Not specified',
              origin: 'India',
              description: `${topPrediction.breed_name} breed information is being updated.`,
              allPredictions: apiResult.predictions
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
            description: 'Please upload a clear image of a cow or buffalo from the supported breeds.'
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
          description: 'Could not connect to the AI service. Please check your connection and try again.'
        });
      } finally {
        setUploading(false);
      }
    };
    
    reader.readAsDataURL(file);
    
    setTimeout(() => {
      if (event.target) {
        event.target.value = '';
      }
    }, 100);
  };

  const resetUpload = () => {
    setSelectedImage('');
    setResult(null);
    setUploading(false);
  };

  const quickActions = [
    {
      title: t('breedify'),
      description: 'Identify breed from photo',
      icon: Camera,
      color: 'bg-green-100 text-green-700',
      action: () => navigate('/breedify')
    },
    {
      title: t('nutrition'),
      description: 'Feeding guidelines',
      icon: Utensils,
      color: 'bg-blue-100 text-blue-700',
      action: () => navigate('/nutrition')
    },
    {
      title: t('health'),
      description: 'Health monitoring',
      icon: Heart,
      color: 'bg-red-100 text-red-700',
      action: () => navigate('/health')
    }
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <img src={pashumitraLogo} alt="PashuMitra" className="h-12 w-12" />
          <h1 className="text-3xl font-semibold text-green-800">{t('welcome')}</h1>
        </div>
        <p className="text-lg text-green-600 max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      {/* Main Upload Section */}
      <Card className="border-2 border-dashed border-green-300 bg-green-50/50">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            <div className="relative w-full h-64 rounded-lg overflow-hidden bg-green-100">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Uploaded"
                  className="w-full h-full object-contain"
                />
              ) : (
                <>
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1620388952744-51681e244cc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBjYXR0bGUlMjBjb3clMjBidWZmYWxvJTIwZmFybXxlbnwxfHx8fDE3NTcyMzcyNjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Cattle and Buffalo"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-green-900/20 flex items-center justify-center">
                    <div className="text-white text-center">
                      <Camera className="h-12 w-12 mx-auto mb-2" />
                      <p className="text-lg">{t('uploadInstruction')}</p>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileUpload}
                className="hidden"
              />
              
              <Button
                onClick={() => document.getElementById('file-upload')?.click()}
                disabled={uploading}
                className="bg-green-600 hover:bg-green-700 px-8 py-3"
                size="lg"
              >
                {uploading ? (
                  <>
                    <Zap className="h-5 w-5 mr-2 animate-pulse" />
                    {t('analyzing')}
                  </>
                ) : (
                  <>
                    <Upload className="h-5 w-5 mr-2" />
                    {selectedImage ? 'Upload Another Photo' : t('uploadPhoto')}
                  </>
                )}
              </Button>

              {selectedImage && (
                <Button
                  onClick={resetUpload}
                  variant="outline"
                  className="px-6"
                >
                  Reset
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Section - Same as Breedify */}
      {result && (
        <div className="space-y-6">
          <Card className="border-green-300 bg-gradient-to-r from-green-50 to-emerald-50">
            <CardHeader>
              <CardTitle className="text-2xl text-green-800 flex items-center gap-2">
                <Camera className="h-7 w-7" />
                Classification Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column - Main Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-3xl font-bold mb-2 text-green-700">
                      {result.breed}
                    </h3>
                    <div className="flex items-center gap-3 mb-4">
                      <div 
                        className="px-4 py-2 rounded-full text-white font-semibold text-lg"
                        style={{
                          backgroundColor: result.confidence > 70 ? '#16a34a' : 
                                         result.confidence > 40 ? '#f59e0b' : '#dc2626'
                        }}
                      >
                        {result.confidence}% Confidence
                      </div>
                      <span className="text-lg text-gray-700 font-medium">{result.origin}</span>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-gray-800 mb-2">Description:</h4>
                    <p className="text-gray-700 leading-relaxed">{result.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2 mb-1">
                        <Utensils className="h-4 w-4 text-blue-600" />
                        <span className="font-semibold text-gray-800">Milk Production</span>
                      </div>
                      <p className="text-lg text-blue-700 font-medium">{result.milkProduction}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-gray-800 font-semibold">⚖️ Weight Range</span>
                      </div>
                      <p className="text-lg text-gray-700 font-medium">{result.weight}</p>
                    </div>
                  </div>
                </div>
                
                {/* Right Column - Characteristics */}
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <span>✨</span> Key Characteristics
                    </h4>
                    <div className="space-y-2">
                      {result.characteristics.map((char: string, index: number) => (
                        <div key={index} className="flex items-start gap-3">
                          <span className="text-green-600 mt-1 font-bold">•</span>
                          <span className="text-gray-700">{char}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Additional Predictions */}
                  {result.allPredictions && result.allPredictions.length > 1 && (
                    <div className="bg-white p-4 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-gray-800 mb-3">Other Possibilities:</h4>
                      <div className="space-y-2">
                        {result.allPredictions.slice(1, 3).map((pred: any, index: number) => (
                          <div key={index} className="flex justify-between items-center py-1">
                            <span className="text-gray-700">{pred.breed_name.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}</span>
                            <span 
                              className="px-3 py-1 rounded-full text-sm font-medium text-white"
                              style={{
                                backgroundColor: pred.confidence > 0.3 ? '#f59e0b' : '#6b7280'
                              }}
                            >
                              {Math.round(pred.confidence * 100)}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={action.action}>
              <CardHeader className="text-center">
                <div className={`w-16 h-16 rounded-full ${action.color} flex items-center justify-center mx-auto mb-4`}>
                  <Icon className="h-8 w-8" />
                </div>
                <CardTitle className="text-lg">{action.title}</CardTitle>
                <CardDescription>{action.description}</CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-green-800">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {result ? (
              <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                <Camera className="h-8 w-8 text-green-600" />
                <div>
                  <p className="font-medium">{result.breed} identified</p>
                  <p className="text-sm text-gray-600">Just now • {result.confidence}% confidence</p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                  <Camera className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="font-medium">Holstein Friesian identified</p>
                    <p className="text-sm text-gray-600">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                  <Utensils className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="font-medium">Nutrition plan updated</p>
                    <p className="text-sm text-gray-600">1 day ago</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}