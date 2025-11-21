import { useState, useEffect } from 'react';
import { Sparkles, Compass, Users, User } from 'lucide-react';
import { AuthProvider } from './contexts/AuthContext';
import DivinationPage from './components/DivinationPage';
import FengShuiPage from './components/FengShuiPage';
import CommunityPage from './components/CommunityPage';
import ProfilePage from './components/ProfilePage';
import TarotSpreadsPage from './components/TarotSpreadsPage';
import SpreadDetailPage from './components/SpreadDetailPage';
import TarotReadingPage from './components/TarotReadingPage';
import MysticBookPage from './components/MysticBookPage';
import WizardProphecyPage from './components/WizardProphecyPage';

type TabType = 'divination' | 'fengshui' | 'community' | 'profile';

function AppContent() {
  const [activeTab, setActiveTab] = useState<TabType>('divination');
  const [showTarotSpreads, setShowTarotSpreads] = useState(false);
  const [spreadDetailId, setSpreadDetailId] = useState<string | null>(null);
  const [readingSpreadId, setReadingSpreadId] = useState<string | null>(null);
  const [showMysticBook, setShowMysticBook] = useState(false);
  const [showWizardProphecy, setShowWizardProphecy] = useState(false); 

  const tabs = [
    { id: 'divination' as TabType, icon: Sparkles, label: '占卜' },
    { id: 'fengshui' as TabType, icon: Compass, label: '风水' },
    { id: 'community' as TabType, icon: Users, label: '社区' },
    { id: 'profile' as TabType, icon: User, label: '我的' },
  ];

  // Listen for hash changes to show tarot spreads page, detail page, or reading page
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      
      if (hash.startsWith('#reading/')) {
        const spreadId = hash.replace('#reading/', '');
        setReadingSpreadId(spreadId);
        setSpreadDetailId(null);
        setShowTarotSpreads(false);
        setShowMysticBook(false);
        setShowWizardProphecy(false);
      } else if (hash.startsWith('#spread-detail/')) {
        const spreadId = hash.replace('#spread-detail/', '');
        setSpreadDetailId(spreadId);
        setReadingSpreadId(null);
        setShowTarotSpreads(false);
        setShowMysticBook(false);
        setShowWizardProphecy(false);
      } else if (hash === '#tarot-spreads') {
        setShowTarotSpreads(true);
        setSpreadDetailId(null);
        setReadingSpreadId(null);
        setShowMysticBook(false);
        setShowWizardProphecy(false);
      } else if (hash === '#mystic-book') {
        setShowMysticBook(true);
        setShowTarotSpreads(false);
        setSpreadDetailId(null);
        setReadingSpreadId(null);
        setShowWizardProphecy(false);
      } else if (hash === '#wizard-prophecy') {
        setShowWizardProphecy(true);
        setShowMysticBook(false);
        setShowTarotSpreads(false);
        setSpreadDetailId(null);
        setReadingSpreadId(null);
      } else {
        setShowTarotSpreads(false);
        setSpreadDetailId(null);
        setReadingSpreadId(null);
        setShowMysticBook(false);
        setShowWizardProphecy(false);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    if (readingSpreadId) {
      return <TarotReadingPage spreadId={readingSpreadId} />;
    }
    
    if (spreadDetailId) {
      return <SpreadDetailPage spreadId={spreadDetailId} />;
    }
    
    if (showTarotSpreads) {
      return <TarotSpreadsPage />;
    }
    
    if (showMysticBook) {
      return <MysticBookPage />;
    }
    
    if (showWizardProphecy) {
      return <WizardProphecyPage />;
    }

    switch (activeTab) {
      case 'divination':
        return <DivinationPage />;
      case 'fengshui':
        return <FengShuiPage />;
      case 'community':
        return <CommunityPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <DivinationPage />;
    }
  };

  return (
    <div className="relative min-h-screen bg-black">
      {/* Background Effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 blur-[100px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/10 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-800/10 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative">
        {renderPage()}
      </div>

      {/* Bottom Navigation */}
      {!showTarotSpreads && !spreadDetailId && !readingSpreadId && !showMysticBook && !showWizardProphecy && (
        <nav className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-purple-500/30 z-50">
          <div className="max-w-md mx-auto px-4">
            <div className="flex items-center justify-around py-3">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex flex-col items-center gap-1 transition-all ${
                      isActive ? 'text-purple-300' : 'text-purple-500/50'
                    }`}
                  >
                    <div
                      className={`relative p-2 rounded-xl transition-all ${
                        isActive
                          ? 'bg-gradient-to-br from-purple-600/30 to-red-600/30 shadow-lg shadow-purple-500/30'
                          : ''
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 transition-all ${
                          isActive ? 'scale-110' : 'scale-100'
                        }`}
                      />
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-red-500/20 rounded-xl blur-md"></div>
                      )}
                    </div>
                    <span className={`text-xs ${isActive ? '' : 'font-normal'}`}>
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
