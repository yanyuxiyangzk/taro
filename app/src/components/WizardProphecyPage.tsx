import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Card } from './ui/card';

export default function WizardProphecyPage() {
  const [question, setQuestion] = useState('');
  const [prophecy, setProphecy] = useState('');
  const [isRevealing, setIsRevealing] = useState(false);

  const handleGetProphecy = () => {
    if (!question.trim()) return;
    
    setIsRevealing(true);
    
    // Simulate prophecy generation
    setTimeout(() => {
      const prophecies = [
        '命运的齿轮正在转动，你所寻求的答案将在三日内显现。保持内心的平静，机会会在你最意想不到的时刻降临。',
        '星辰的排列预示着变化即将到来。你的坚持将会得到回报，但需要耐心等待时机成熟。',
        '古老的魔法显示，你正站在人生的十字路口。相信你的直觉，它会引导你走向正确的方向。',
        '水晶球中映现出光明的未来。你所担心的问题将会迎刃而解，但需要你主动迈出第一步。',
        '魔法的力量感应到你内心的渴望。保持积极的心态，宇宙会为你安排最好的结果。'
      ];
      
      const randomProphecy = prophecies[Math.floor(Math.random() * prophecies.length)];
      setProphecy(randomProphecy);
      setIsRevealing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black pb-24">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-purple-500/30">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => window.history.back()}
            className="p-2 hover:bg-purple-900/30 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-purple-200" />
          </button>
          <h1 className="text-xl text-purple-100 font-bold">巫师预言</h1>
          <div className="w-10"></div>
        </div>
      </div>

      {/* Animated Wizard Section */}
      <div className="relative px-6 pt-8 pb-6">
        <Card className="bg-gradient-to-br from-purple-900/40 to-black/40 border-purple-500/40 backdrop-blur-sm overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 blur-2xl"></div>
          
          <div className="relative overflow-hidden">
            {/* Realistic Wizard Photo Container */}
            <div className="relative w-full h-96">
              {/* Wizard Photo with magical overlay */}
              <div className="absolute inset-0">
                <img 
                  src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80" 
                  alt="Wizard with magical staff"
                  className="w-full h-full object-cover"
                />
                {/* Dark overlay for better text visibility */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80"></div>
              </div>
              
              {/* Magical effects overlay */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Starry background */}
                <div className="absolute top-8 left-12 w-1 h-1 bg-white rounded-full animate-pulse"></div>
                <div className="absolute top-16 left-32 w-1 h-1 bg-white rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                <div className="absolute top-12 right-20 w-1 h-1 bg-white rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-24 right-40 w-1 h-1 bg-white rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
                <div className="absolute top-32 left-24 w-1 h-1 bg-white rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
                
                {/* Magic sparkles */}
                <div className="absolute top-1/3 right-1/4">
                  <div className="absolute top-0 left-0 text-yellow-300 text-2xl animate-ping opacity-60" style={{animationDuration: '1.2s'}}>✨</div>
                  <div className="absolute top-4 left-6 text-purple-300 text-xl animate-ping opacity-50" style={{animationDuration: '1.5s', animationDelay: '0.4s'}}>✨</div>
                  <div className="absolute top-8 left-2 text-blue-300 text-xl animate-ping opacity-50" style={{animationDuration: '1.7s', animationDelay: '0.7s'}}>✨</div>
                </div>
                
                {/* Floating mystical symbols */}
                <div className="absolute top-12 left-12 text-purple-300 text-4xl animate-pulse opacity-60" style={{animationDuration: '2.5s'}}>🔮</div>
                <div className="absolute bottom-20 left-16 text-yellow-300 text-3xl animate-pulse opacity-50" style={{animationDuration: '3s', animationDelay: '0.5s'}}>⭐</div>
                <div className="absolute top-20 right-16 text-blue-300 text-3xl animate-pulse opacity-50" style={{animationDuration: '2.8s', animationDelay: '1s'}}>✨</div>
                
                {/* Mystical glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 blur-2xl animate-pulse" style={{animationDuration: '3s'}}></div>
              </div>
              
              {/* Bottom text overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                <h2 className="text-purple-100 text-2xl mb-2 text-center font-bold drop-shadow-lg">神秘的巫师</h2>
                <p className="text-purple-300/90 text-sm text-center drop-shadow">
                  手持魔法权杖，洞察命运的奥秘
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Question Input Section */}
      <div className="px-6 mb-6">
        <Card className="bg-gradient-to-br from-purple-900/30 to-black/30 border-purple-500/30 backdrop-blur-sm">
          <div className="p-6">
            <h3 className="text-purple-100 mb-4 text-center">向巫师提问</h3>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="请输入你想要询问的问题..."
              className="w-full h-32 bg-black/50 border border-purple-500/30 rounded-lg p-4 text-purple-100 placeholder-purple-400/50 focus:outline-none focus:border-purple-400/50 resize-none"
            />
            
            <button
              onClick={handleGetProphecy}
              disabled={!question.trim() || isRevealing}
              className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-purple-900/50 disabled:to-blue-900/50 text-white py-3 px-6 rounded-full font-bold transition-all shadow-lg disabled:cursor-not-allowed"
            >
              {isRevealing ? '巫师正在预言中...' : '获取预言'}
            </button>
          </div>
        </Card>
      </div>

      {/* Prophecy Result */}
      {(prophecy || isRevealing) && (
        <div className="px-6">
          <Card className="bg-gradient-to-br from-purple-900/40 to-black/40 border-purple-500/40 backdrop-blur-sm overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 blur-xl"></div>
            
            <div className="relative p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="text-4xl">🔮</div>
              </div>
              
              <h3 className="text-purple-100 text-lg mb-4 text-center">巫师的预言</h3>
              
              {isRevealing ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="text-6xl mb-4 animate-spin">🌟</div>
                  <p className="text-purple-300/70 text-sm">魔法正在运转...</p>
                </div>
              ) : (
                <div className="bg-black/30 rounded-lg p-6 border border-purple-500/20">
                  <p className="text-purple-200 leading-relaxed text-center">
                    {prophecy}
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
