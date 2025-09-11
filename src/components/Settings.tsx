import React, { useState } from 'react';
import { Settings as SettingsIcon, Globe, Bell, Moon, Sun, User, Shield, Database, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { useLanguage } from './LanguageContext';

export function Settings() {
  const { t, language, setLanguage } = useLanguage();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoSync, setAutoSync] = useState(true);

  const settingSections = [
    {
      title: language === 'hi' ? 'सामान्य सेटिंग्स' : 'General Settings',
      icon: SettingsIcon,
      settings: [
        {
          id: 'language',
          label: language === 'hi' ? 'भाषा' : 'Language',
          description: language === 'hi' ? 'ऐप की भाषा चुनें' : 'Choose app language',
          type: 'select',
          value: language,
          options: [
            { value: 'hi', label: 'हिंदी' },
            { value: 'en', label: 'English' }
          ],
          onChange: setLanguage
        },
        {
          id: 'darkMode',
          label: language === 'hi' ? 'डार्क मोड' : 'Dark Mode',
          description: language === 'hi' ? 'डार्क थीम का उपयोग करें' : 'Use dark theme',
          type: 'switch',
          value: darkMode,
          onChange: setDarkMode
        }
      ]
    },
    {
      title: language === 'hi' ? 'नोटिफिकेशन' : 'Notifications',
      icon: Bell,
      settings: [
        {
          id: 'notifications',
          label: language === 'hi' ? 'पुश नोटिफिकेशन' : 'Push Notifications',
          description: language === 'hi' ? 'महत्वपूर्ण अपडेट प्राप्त करें' : 'Receive important updates',
          type: 'switch',
          value: notifications,
          onChange: setNotifications
        },
        {
          id: 'sound',
          label: language === 'hi' ? 'साउंड' : 'Sound',
          description: language === 'hi' ? 'नोटिफिकेशन साउंड' : 'Notification sound',
          type: 'switch',
          value: soundEnabled,
          onChange: setSoundEnabled
        }
      ]
    },
    {
      title: language === 'hi' ? 'डेटा और प्राइवेसी' : 'Data & Privacy',
      icon: Shield,
      settings: [
        {
          id: 'autoSync',
          label: language === 'hi' ? 'ऑटो सिंक' : 'Auto Sync',
          description: language === 'hi' ? 'डेटा को ऑटो सिंक करें' : 'Automatically sync data',
          type: 'switch',
          value: autoSync,
          onChange: setAutoSync
        }
      ]
    }
  ];

  const accountInfo = {
    version: '1.2.3',
    buildNumber: '2024.01.15',
    storage: language === 'hi' ? '2.5 MB उपयोग में' : '2.5 MB used',
    lastSync: language === 'hi' ? '5 मिनट पहले' : '5 minutes ago'
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <SettingsIcon className="h-8 w-8 text-green-600" />
          <h1 className="text-3xl font-semibold text-green-800">{t('settings')}</h1>
        </div>
        <p className="text-lg text-green-600">
          {language === 'hi' 
            ? 'अपने PashuMitra अनुभव को व्यक्तिगत बनाएं'
            : 'Customize your PashuMitra experience'
          }
        </p>
      </div>

      {/* Settings Sections */}
      {settingSections.map((section, sectionIndex) => {
        const SectionIcon = section.icon;
        return (
          <Card key={sectionIndex} className="border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-green-800">
                <SectionIcon className="h-6 w-6" />
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {section.settings.map((setting, settingIndex) => (
                <div key={setting.id}>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor={setting.id} className="text-base">
                        {setting.label}
                      </Label>
                      <p className="text-sm text-gray-600">
                        {setting.description}
                      </p>
                    </div>
                    
                    <div className="ml-4">
                      {setting.type === 'switch' && (
                        <Switch
                          id={setting.id}
                          checked={setting.value as boolean}
                          onCheckedChange={setting.onChange}
                        />
                      )}
                      
                      {setting.type === 'select' && (
                        <Select value={setting.value as string} onValueChange={setting.onChange}>
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {setting.options?.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  </div>
                  
                  {settingIndex < section.settings.length - 1 && (
                    <Separator className="mt-6" />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        );
      })}

      {/* Account Actions */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-green-800">
            <User className="h-6 w-6" />
            {language === 'hi' ? 'अकाउंट एक्शन' : 'Account Actions'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="border-green-200 hover:bg-green-50">
              {language === 'hi' ? 'डेटा एक्सपोर्ट करें' : 'Export Data'}
            </Button>
            <Button variant="outline" className="border-green-200 hover:bg-green-50">
              {language === 'hi' ? 'कैश क्लियर करें' : 'Clear Cache'}
            </Button>
            <Button variant="outline" className="border-green-200 hover:bg-green-50">
              {language === 'hi' ? 'बैकअप बनाएं' : 'Create Backup'}
            </Button>
            <Button variant="outline" className="border-green-200 hover:bg-green-50">
              {language === 'hi' ? 'सेटिंग्स रीसेट करें' : 'Reset Settings'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* App Info */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-green-800">
            <Info className="h-6 w-6" />
            {language === 'hi' ? 'ऐप की जानकारी' : 'App Information'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">
                  {language === 'hi' ? 'ऐप वर्जन:' : 'App Version:'}
                </span>
                <span className="font-medium">{accountInfo.version}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">
                  {language === 'hi' ? 'बिल्ड नंबर:' : 'Build Number:'}
                </span>
                <span className="font-medium">{accountInfo.buildNumber}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">
                  {language === 'hi' ? 'स्टोरेज:' : 'Storage:'}
                </span>
                <span className="font-medium">{accountInfo.storage}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">
                  {language === 'hi' ? 'अंतिम सिंक:' : 'Last Sync:'}
                </span>
                <span className="font-medium">{accountInfo.lastSync}</span>
              </div>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">
              {language === 'hi' 
                ? '© 2024 PashuMitra. सभी अधिकार सुरक्षित।'
                : '© 2024 PashuMitra. All rights reserved.'
              }
            </p>
            <div className="flex justify-center space-x-4 text-sm">
              <Button variant="link" className="p-0 h-auto text-green-600">
                {language === 'hi' ? 'प्राइवेसी पॉलिसी' : 'Privacy Policy'}
              </Button>
              <Button variant="link" className="p-0 h-auto text-green-600">
                {language === 'hi' ? 'सेवा की शर्तें' : 'Terms of Service'}
              </Button>
              <Button variant="link" className="p-0 h-auto text-green-600">
                {language === 'hi' ? 'सहायता' : 'Support'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feedback */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800">
            {language === 'hi' ? 'फीडबैक दें' : 'Give Feedback'}
          </CardTitle>
          <CardDescription>
            {language === 'hi' 
              ? 'हमें बताएं कि हम PashuMitra को कैसे बेहतर बना सकते हैं'
              : 'Tell us how we can make PashuMitra better'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-green-600 hover:bg-green-700">
              {language === 'hi' ? 'रेटिंग दें' : 'Rate App'}
            </Button>
            <Button variant="outline" className="border-green-200 hover:bg-green-50">
              {language === 'hi' ? 'फीडबैक भेजें' : 'Send Feedback'}
            </Button>
            <Button variant="outline" className="border-green-200 hover:bg-green-50">
              {language === 'hi' ? 'बग रिपोर्ट करें' : 'Report Bug'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}