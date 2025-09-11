import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Breedify } from './components/Breedify';
import { Nutrition } from './components/Nutrition';
import { BreedingInfo } from './components/BreedingInfo';
import { HealthInfo } from './components/HealthInfo';
import { Chatbot } from './components/Chatbot';
import { AboutUs } from './components/AboutUs';
import { Help } from './components/Help';
import { Settings } from './components/Settings';
import { LanguageProvider } from './components/LanguageContext';
import { Toaster } from './components/ui/sonner';

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      
      <main className="lg:ml-64 min-h-screen">
        <div className="p-4 lg:p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/breedify" element={<Breedify />} />
            <Route path="/nutrition" element={<Nutrition />} />
            <Route path="/breeding" element={<BreedingInfo />} />
            <Route path="/health" element={<HealthInfo />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/help" element={<Help />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </main>
      
      <Toaster position="top-right" />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </LanguageProvider>
  );
}