import { useState, useEffect } from 'react';
import { ArrowLeft, Sparkles, Star } from 'lucide-react';

interface TarotReadingPageProps {
  spreadId: string;
}

type ReadingPhase = 'shuffling' | 'selecting' | 'result';

interface TarotCard {
  id: number;
  name: string;
  position: string;
  isRevealed: boolean;
}

const spreadInfo: Record<string, { name: string; cardCount: number; positions: string[] }> = {
  'time-flow': { name: '时间流', cardCount: 3, positions: ['过去', '现在', '未来'] },
  'tower-bridge': { name: '塔罗之桥', cardCount: 3, positions: ['情况', '阻碍', '结果'] },
  'choice': { name: '二择一', cardCount: 3, positions: ['选择A', '决定因素', '选择B'] },
  'celtic-cross': { name: '荷鲁斯之眼', cardCount: 3, positions: ['情况', '建议', '结果'] }
};

export default function TarotReadingPage({ spreadId }: TarotReadingPageProps) {
  const [phase, setPhase] = useState<ReadingPhase>('shuffling');
  const [cards, setCards] = useState<TarotCard[]>([]);
  const [selectedCount, setSelectedCount] = useState(0);

  const currentSpread = spreadInfo[spreadId] || spreadInfo['time-flow'];

  useEffect(() => {
    const initialCards: TarotCard[] = Array.from({ length: currentSpread.cardCount }, (_, i) => ({
      id: i,
      name: `塔罗牌 ${i + 1}`,
      position: currentSpread.positions[i],
      isRevealed: false
    }));
    setCards(initialCards);

    const shuffleTimer = setTimeout(() => {
      setPhase('selecting');
    }, 5000);

    return () => clearTimeout(shuffleTimer);
  }, [spreadId]);

  const handleBack = () => {
    window.location.hash = `#spread-detail/${spreadId}`;
  };

  const handleCardSelect = (cardId: number) => {
    if (phase !== 'selecting') return;
    
    setCards(prev => prev.map(card => 
      card.id === cardId ? { ...card, isRevealed: true } : card
    ));
    
    const newCount = selectedCount + 1;
    setSelectedCount(newCount);
    
    if (newCount === currentSpread.cardCount) {
      setTimeout(() => setPhase('result'), 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-950 to-black overflow-hidden">
      {/* Magical Background */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-purple-400/30"
            style={{
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `floatParticle ${4 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/20 blur-[100px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-600/20 blur-[100px] rounded-full animate-pulse" 
             style={{ animationDelay: '1s' }} />
      </div>

      {/* Header */}
      <div className="relative z-20 flex items-center justify-between p-6">
        <button onClick={handleBack} className="text-purple-200 hover:text-white transition-colors p-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-white text-xl font-bold flex items-center gap-2">
          <Star className="w-5 h-5 text-purple-400" />
          {currentSpread.name}
        </h1>
        <div className="w-10"></div>
      </div>

      {/* Main Content - Centered Container */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-100px)]">
        
        {/* Shuffling Phase */}
        {phase === 'shuffling' && (
          <div className="flex flex-col items-center w-full px-4">
            {/* Top icon */}
            <div className="mb-6 relative w-20 h-20 flex items-center justify-center">
              <div className="absolute inset-0 bg-purple-600/20 rounded-full blur-xl animate-pulse" />
              <Sparkles className="w-12 h-12 text-purple-400 relative animate-pulse" />
            </div>
            
            <h2 className="text-white text-3xl font-bold mb-2">正在洗牌...</h2>
            <p className="text-purple-200/80 text-base mb-10">请专注于你的问题，感受宇宙的能量</p>
            
            {/* Circular Card Animation - Fully Centered */}
            <div className="flex items-center justify-center" style={{ width: '100%', height: '380px' }}>
              <div className="relative" style={{ width: '340px', height: '340px' }}>
                {/* Center glow */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-purple-600/30 rounded-full blur-3xl animate-pulse" />
                
                {/* Rotating circle */}
                <div 
                  className="absolute left-1/2 top-1/2 w-full h-full"
                  style={{
                    animation: 'rotateCircle 12s linear infinite',
                    transformOrigin: 'center'
                  }}
                >
                  {[...Array(12)].map((_, i) => {
                    const angle = (i * 30) * (Math.PI / 180);
                    const radius = 140;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    
                    return (
                      <div
                        key={i}
                        className="absolute"
                        style={{
                          left: `calc(50% + ${x}px)`,
                          top: `calc(50% + ${y}px)`,
                          transform: `translate(-50%, -50%) rotate(${-i * 30}deg)`,
                          transformOrigin: 'center'
                        }}
                      >
                        <div 
                          className="w-16 h-24 rounded-lg shadow-2xl"
                          style={{
                            background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)',
                            border: '2px solid rgba(168, 85, 247, 0.6)',
                            boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)'
                          }}
                        >
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <div className="text-2xl mb-1">🌙</div>
                            <div className="flex gap-0.5">
                              <Star className="w-2 h-2 text-purple-300 fill-purple-300" />
                              <Star className="w-2 h-2 text-purple-300 fill-purple-300" />
                              <Star className="w-2 h-2 text-purple-300 fill-purple-300" />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Center sparkle */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="text-4xl animate-pulse">✨</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Selecting Phase */}
        {phase === 'selecting' && (
          <div className="w-full max-w-2xl px-4">
            <div className="text-center">
              <h2 className="text-white text-3xl font-bold mb-3">选择你的命运之牌</h2>
              <p className="text-purple-200/80 text-base mb-8">
                已选择 <span className="text-purple-400 font-bold text-xl">{selectedCount}</span> / {currentSpread.cardCount} 张
              </p>
              <div className="flex flex-wrap justify-center gap-8">
                {cards.map((card, index) => (
                  <button
                    key={card.id}
                    onClick={() => handleCardSelect(card.id)}
                    disabled={card.isRevealed}
                    className={`relative transition-all duration-700 ${
                      card.isRevealed
                        ? 'opacity-40 scale-90'
                        : 'hover:scale-110 hover:-translate-y-4 cursor-pointer'
                    }`}
                    style={{
                      animation: card.isRevealed ? 'none' : `cardFloat 3s ease-in-out infinite`,
                      animationDelay: `${index * 0.2}s`
                    }}
                  >
                    <div className="w-32 h-48 rounded-2xl shadow-2xl relative"
                      style={{
                        background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)',
                        border: '3px solid rgba(168, 85, 247, 0.6)',
                        boxShadow: card.isRevealed ? 'none' : '0 0 30px rgba(168, 85, 247, 0.4)'
                      }}
                    >
                      {!card.isRevealed && (
                        <div className="absolute inset-0 rounded-2xl animate-pulse"
                             style={{
                               background: 'radial-gradient(circle at center, rgba(168, 85, 247, 0.3) 0%, transparent 70%)'
                             }} />
                      )}
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        {card.isRevealed ? (
                          <Sparkles className="w-12 h-12 text-purple-400 animate-spin" />
                        ) : (
                          <>
                            <div className="text-5xl mb-3">🌙</div>
                            <div className="flex gap-1.5">
                              <Star className="w-3 h-3 text-purple-300 fill-purple-300" />
                              <Star className="w-3 h-3 text-purple-300 fill-purple-300" />
                              <Star className="w-3 h-3 text-purple-300 fill-purple-300" />
                            </div>
                          </>
                        )}
                      </div>
                      <div className="absolute top-2 left-2 text-purple-300 text-sm">✦</div>
                      <div className="absolute top-2 right-2 text-purple-300 text-sm">✦</div>
                      <div className="absolute bottom-2 left-2 text-purple-300 text-sm">✦</div>
                      <div className="absolute bottom-2 right-2 text-purple-300 text-sm">✦</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Result Phase */}
        {phase === 'result' && (
          <div className="w-full max-w-4xl px-4">
            <div className="text-center">
              <div className="mb-10">
                <Sparkles className="w-14 h-14 text-purple-400 mx-auto mb-4 animate-pulse" />
                <h2 className="text-white text-4xl font-bold mb-3">你的占卜结果</h2>
                <p className="text-purple-200 text-lg">命运的指引已经显现</p>
              </div>
              <div className="space-y-6">
                {cards.map((card, index) => (
                  <div
                    key={card.id}
                    className="bg-gradient-to-br from-purple-800/80 to-purple-900/80 border-2 border-purple-400/70 rounded-3xl p-6 backdrop-blur-sm shadow-2xl"
                    style={{
                      animation: 'slideUp 0.6s ease-out forwards',
                      animationDelay: `${index * 0.2}s`,
                      opacity: 0
                    }}
                  >
                    {/* Left-Right Layout */}
                    <div className="flex items-start gap-6">
                      {/* Left: Card Image */}
                      <div className="flex-shrink-0 relative">
                        <div 
                          className="w-36 h-52 rounded-2xl shadow-2xl relative overflow-visible"
                          style={{
                            background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)',
                            border: '3px solid rgba(168, 85, 247, 0.9)',
                            boxShadow: '0 0 30px rgba(168, 85, 247, 0.7)'
                          }}
                        >
                          {/* Number Badge on Card */}
                          <div className="absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-xl z-20 border-3 border-purple-200">
                            {index + 1}
                          </div>
                          
                          {/* Card Content */}
                          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 rounded-2xl">
                            <div className="text-6xl mb-3">🌙</div>
                            <div className="flex gap-2 mb-2">
                              <Star className="w-3.5 h-3.5 text-purple-200 fill-purple-200" />
                              <Star className="w-3.5 h-3.5 text-purple-200 fill-purple-200" />
                              <Star className="w-3.5 h-3.5 text-purple-200 fill-purple-200" />
                            </div>
                          </div>
                          
                          {/* Corner Decorations */}
                          <div className="absolute top-3 left-3 text-purple-200 text-sm z-10">✦</div>
                          <div className="absolute top-3 right-3 text-purple-200 text-sm z-10">✦</div>
                          <div className="absolute bottom-3 left-3 text-purple-200 text-sm z-10">✦</div>
                          <div className="absolute bottom-3 right-3 text-purple-200 text-sm z-10">✦</div>
                        </div>
                      </div>
                      
                      {/* Right: Text Content */}
                      <div className="flex-1 text-left pt-2">
                        <h3 className="text-white text-3xl font-bold mb-2">{card.position}</h3>
                        <p className="text-purple-200 text-lg mb-4 font-semibold">{card.name}</p>
                        <div className="w-20 h-0.5 bg-gradient-to-r from-purple-400 to-transparent mb-4"></div>
                        <p className="text-purple-100 text-base leading-relaxed">
                          这张牌揭示了{card.position}的神秘能量。它代表着宇宙对你的指引，
                          请用心感受其中的深意，它将为你的人生道路带来启示。
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={handleBack}
                className="mt-12 px-16 py-5 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white rounded-full text-xl font-bold transition-all shadow-2xl hover:shadow-purple-400/80 hover:scale-105 border-2 border-purple-300/50"
              >
                返回详情
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes rotateCircle {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes floatParticle {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.4; }
          50% { transform: translateY(-30px) translateX(10px); opacity: 0.8; }
        }
        @keyframes cardFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
