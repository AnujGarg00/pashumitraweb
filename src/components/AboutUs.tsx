import React from "react";
import {
  Users,
  Target,
  Award,
  Heart,
  Smartphone,
  TestTube,
  Paperclip,
  Info,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useLanguage } from "./LanguageContext";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import pashumitraLogo from "figma:asset/19a212fc1ff0d5bd064bd27c13c5e86eb36b54c4.png";

export function AboutUs() {
  const { t, language } = useLanguage();

  const features = [
    {
      icon: Smartphone,
      title:
        language === "hi"
          ? "AI-संचालित पहचान"
          : "AI-Powered Identification",
      description:
        language === "hi"
          ? "उन्नत कृत्रिम बुद्धिमत्ता से तुरंत नस्ल की पहचान"
          : "Advanced artificial intelligence for instant breed identification.",
    },
    {
      icon: TestTube,
      title:
        language === "hi"
          ? "क्रॉस-ब्रीड पहचान"
          : "Cross-Breed Detection",
      description:
        language === "hi"
          ? "मिश्रित नस्लों के लिए संभावित प्रतिशत अनुमान"
          : "Provides possible mixture percentage estimates for crossbreeds.",
    },
    {
      icon: Heart,
      title:
        language === "hi"
          ? "संपूर्ण स्वास्थ्य गाइड"
          : "Complete Health Guide",
      description:
        language === "hi"
          ? "पशुओं के स्वास्थ्य की संपूर्ण जानकारी और सुझाव"
          : "Comprehensive health information and recommendations.",
    },
    {
      icon: Users,
      title:
        language === "hi" ? "विशेषज्ञ सलाह" : "Expert Advice",
      description:
        language === "hi"
          ? "पशु चिकित्सकों और विशेषज्ञों की सलाह"
          : "Advice from veterinarians and livestock experts.",
    },
    {
      icon: Paperclip,
      title:
        language === "hi"
          ? "भारतीय नस्लों पर केंद्रित"
          : "Indian Breed Database",
      description:
        language === "hi"
          ? "भारतीय गाय और भैंस की नस्लों की विशेष जानकारी"
          : "Access to detailed information of major Indian cattle and buffalo breeds.",
    },
    {
      icon: Info,
      title:
        language === "hi"
          ? "ऑफलाइन मोड"
          : "Offline Mode",
      description:
        language === "hi"
          ? "इंटरनेट के बिना भी काम करता है, दूर-दराज के गांवों में आसानी से उपलब्ध"
          : "Works without internet, making it easily accessible in remote villages.",
    },
  ];

  const teamMembers = [
    {
      name:
        language === "hi" ? "मिष्टी गौतम" : "Mishthi Gautam",
      role:
        language === "hi" ? "फ्रंटेंड लीड" : "Frontend Lead",
      course: language === "hi" ? "बीटेक सीएसई" : "BTech CSE",
    },
    {
      name: language === "hi" ? "अनुज गर्ग" : "Anuj Garg",
      role:
        language === "hi"
          ? "बैकेंड/एपीआई लीड"
          : "Backend/API Lead",
      course: language === "hi" ? "बीटेक सीएसई" : "BTech CSE",
    },
    {
      name:
        language === "hi" ? "काशिका शर्मा" : "Kashika Sharma",
      role:
        language === "hi"
          ? "रिसर्च और पिच लीड"
          : "Research and Pitch Lead",
      course:
        language === "hi" ? "बीटेक वीएलएसआई" : "BTech VLSI",
    },
    {
      name: language === "hi" ? "हरशित वर्मा" : "Harshit Verma",
      role:
        language === "hi" ? "डेटा/डीबी लीड" : "Data/DB Lead",
      course:
        language === "hi"
          ? "बीटेक सीएसई"
          : "BTech CSE-CS",
    },
    {
      name: language === "hi" ? "आस्था सिक्का" : "Aastha Sikka",
      role:
        language === "hi"
          ? "डिज़ाइन और यूएक्स"
          : "Design and UX",
      course: language === "hi" ? "बीटेक सीएसई" : "BTech CSE",
    },
    {
      name:
        language === "hi"
          ? "कार्तिक वी नायर"
          : "Karthik V Nair",
      role:
        language === "hi"
          ? "रिसर्च और पिच लीड"
          : "Research and Pitch Lead",
      course:
        language === "hi"
          ? "बीटेक सीएसई"
          : "BTech CSE-CS",
    },
  ];

  const stats = [
    {
      number: "50,000+",
      label: language === "hi" ? "खुश किसान" : "Happy Farmers",
      icon: Users,
    },
    {
      number: "15+",
      label:
        language === "hi"
          ? "भारतीय नस्लों की पहचान"
          : "Indian Breeds Identified",
      icon: Target,
    },
    {
      number: "95%",
      label: language === "hi" ? "सटीकता दर" : "Accuracy Rate",
      icon: Award,
    },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <img
            src={pashumitraLogo}
            alt="PashuMitra"
            className="h-8 w-8"
          />
          <h1 className="text-3xl font-semibold text-green-800">
            {t("about")}
          </h1>
        </div>
        <p className="text-lg text-green-600 max-w-3xl mx-auto">
          {language === "hi"
            ? "पशुमित्र भारतीय किसानों के लिए बनाया गया एक उन्नत डिजिटल साथी है जो कृत्रिम बुद्धिमत्ता की शक्ति से आपके पशुपालन को बेहतर बनाता है।"
            : "PashuMitra is an AI-powered platform that helps farmers, veterinarians, and field workers to accurately identify cattle and buffalo breeds with just a photo. In a country like India, where indigenous and crossbred animals are highly diverse, correct breed recognition plays a crucial role in animal health management, nutrition planning and breeding programs."}
        </p>
      </div>

      {/* Hero Image */}
      <div className="relative rounded-xl overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1620388952744-51681e244cc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBjYXR0bGUlMjBjb3clMjBidWZmYWxvJTIwZmFybXxlbnwxfHx8fDE3NTcyMzcyNjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Indian cattle farming"
          className="w-full h-64 md:h-80 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 to-transparent flex items-center">
          <div className="p-8 text-white max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              {language === "hi" ? "हमारा मिशन" : "Our Mission"}
            </h2>
            <p className="text-lg">
              {language === "hi"
                ? "प्रत्येक भारतीय किसान को आधुनिक तकनीक के साथ सशक्त बनाना और पशुपालन को अधिक लाभकारी एवं टिकाऊ बनाना।"
                : "To empower farmers and livestock workers with simple, smart, and reliable tools that can improve animal care, health, and productivity while preserving India's rich indigenous cattle and buffalo heritage."}
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="text-center border-green-200 bg-green-50"
            >
              <CardContent className="p-6">
                <Icon className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-green-800 mb-2">
                  {stat.number}
                </div>
                <div className="text-green-600">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Features */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-green-800 text-center">
          {language === "hi"
            ? "हमारी विशेषताएं"
            : "Our Features"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="border-green-200 hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <Icon className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Story */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-green-800">
            {language === "hi" ? "हमारी कहानी" : "Our Story"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">
            {language === "hi"
              ? "पशुमित्र की शुरुआत एक सामान्य समस्या से हुई - भारतीय किसानों को अपने पशुओं की सही नस्ल की पहचान करने में कठिनाई होती थी। हमारी टीम ने देखा कि कैसे गलत जानकारी के कारण किसान सही देखभाल नहीं कर पाते थे।"
              : "The idea of PashuMitra was born after realizing how often field workers misidentify breeds during livestock surveys. This affects government planning, farmer benefits, and animal care. Our team of technologists and animal science enthusiasts came together to create a solution that combines Artificial Intelligence with traditional wisdom."}
          </p>
          <p className="text-gray-700">
            {language === "hi"
              ? "इसी समस्या का समाधान करने के लिए, हमने कृत्रिम बुद्धिमत्ता और पशु विशेषज्ञों के ज्ञान को मिलाकर एक ऐसा प्लेटफॉर्म बनाया जो किसानों को सटीक जानकारी और व्यक्तिगत सुझाव देता है।"
              : "To solve this problem, we combined artificial intelligence with veterinary expertise to create a platform that provides accurate information and personalized recommendations to farmers. Today, PashuMitra is on a mission to become the trusted friend of every farmer and livestock worker."}
          </p>
        </CardContent>
      </Card>

      {/* Team */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-green-800 text-center">
          {language === "hi" ? "हमारी टीम" : "Our Team"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="border-green-200 text-center"
            >
              <CardContent className="p-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-1">
                  {member.name}
                </h3>
                <p className="text-green-600 mb-2">
                  {member.role}
                </p>
                <p className="text-sm text-gray-600">
                  {member.course}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Contact Info */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-green-800">
            {language === "hi" ? "संपर्क करें" : "Contact Us"}
          </CardTitle>
          <CardDescription>
            {language === "hi"
              ? "हमसे जुड़ें और अपने सुझाव साझा करें"
              : "Connect with us and share your feedback"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">
                {language === "hi" ? "ईमेल" : "Email"}
              </h4>
              <p className="text-gray-600">
                support@pashumitra.com
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">
                {language === "hi" ? "हेल्पलाइन" : "Helpline"}
              </h4>
              <p className="text-gray-600">
                1800-123-PASHU (72748)
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">
                {language === "hi" ? "पता" : "Address"}
              </h4>
              <p className="text-gray-600">
                {language === "hi"
                  ? "कृषि भवन, नई दिल्ली - 110001"
                  : "Krishi Bhawan, New Delhi - 110001"}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">
                {language === "hi" ? "समय" : "Hours"}
              </h4>
              <p className="text-gray-600">
                {language === "hi"
                  ? "सोमवार - शुक्रवार: 9:00 AM - 6:00 PM"
                  : "Monday - Friday: 9:00 AM - 6:00 PM"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
