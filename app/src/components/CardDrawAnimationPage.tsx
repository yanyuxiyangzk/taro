import { useEffect, useState, useRef } from 'react';

export default function CardDrawAnimationPage() {
  const [showCenterCard, setShowCenterCard] = useState(false);
  const [flipCard, setFlipCard] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null);
  const cardRef = useRef(null);

  // 塔罗牌数据
  const tarotCards = [
    { name: '命运之轮', meaning: '变化、机遇、命运轮回', emoji: '🔮', id: 1 },
    { name: '力量', meaning: '勇气、毅力、内在力量', emoji: '🦁', id: 2 },
    { name: '女祭司', meaning: '直觉、智慧、神秘', emoji: '🌙', id: 3 },
    { name: '魔术师', meaning: '创造力、意志力、技能', emoji: '✨', id: 4 },
    { name: '世界', meaning: '完成、成就、圆满', emoji: '🌍', id: 5 },
  ];

  // 随机选择一张卡牌
  const [randomCard, setRandomCard] = useState(null);

  useEffect(() => {
    // 随机选择一张卡牌
    const randomIndex = Math.floor(Math.random() * tarotCards.length);
    setRandomCard(tarotCards[randomIndex]);

    // 1.5秒后显示中心卡牌
    const showTimer = setTimeout(() => {
      setShowCenterCard(true);
    }, 1500);

    // 3.5秒后翻转卡牌
    const flipTimer = setTimeout(() => {
      setFlipCard(true);
    }, 3500);

    // 6.5秒后跳转
    const navigateTimer = setTimeout(() => {
      setIsAnimating(false);
      setTimeout(() => {
        window.location.hash = '#card-reading-detail';
      }, 300);
    }, 6500);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(flipTimer);
      clearTimeout(navigateTimer);
    };
  }, []);

  // 飞过的卡牌配置（优化为更适合手机的动画）
  const flyingCards = [
    { startY: -25, endY: -15, startRotate: -25, endRotate: 15, delay: 0, duration: 5 },
    { startY: -10, endY: -20, startRotate: 10, endRotate: -20, delay: 0.7, duration: 5.5 },
    { startY: 5, endY: 0, startRotate: -15, endRotate: 25, delay: 1.4, duration: 5 },
    { startY: 15, endY: 10, startRotate: 20, endRotate: -10, delay: 2.1, duration: 5.5 },
    { startY: -20, endY: 15, startRotate: -10, endRotate: 30, delay: 2.8, duration: 5 },
    { startY: 10, endY: -15, startRotate: 25, endRotate: -20, delay: 3.5, duration: 5.5 },
    { startY: -5, endY: 10, startRotate: -20, endRotate: 20, delay: 4.2, duration: 5 },
    { startY: 20, endY: -10, startRotate: 15, endRotate: -25, delay: 4.9, duration: 5.5 },
    { startY: -22, endY: 18, startRotate: -30, endRotate: 12, delay: 1.0, duration: 5 },
    { startY: 12, endY: -18, startRotate: 30, endRotate: -22, delay: 2.0, duration: 5.5 },
    { startY: -18, endY: 22, startRotate: -8, endRotate: 18, delay: 3.0, duration: 5 },
    { startY: 18, endY: -22, startRotate: 8, endRotate: -30, delay: 4.0, duration: 5.5 },
  ];

  // 手势处理
  const handleTouch = () => {
    if (showCenterCard && !flipCard) {
      setFlipCard(true);
    }
  };

  return (
    <>
      <style>{`
        @keyframes fly-through {
          0% {
            transform: translateX(-150vw) translateY(var(--start-y)) rotate(var(--start-rotate)) scale(0.6);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateX(150vw) translateY(var(--end-y)) rotate(var(--end-rotate)) scale(0.6);
            opacity: 0;
          }
        }

        @keyframes sparkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes glow-pulse {
          0%, 100% {
            box-shadow: 0 0 15px rgba(251, 191, 36, 0.3), 0 0 30px rgba(251, 191, 36, 0.2);
          }
          50% {
            box-shadow: 0 0 30px rgba(251, 191, 36, 0.6), 0 0 60px rgba(251, 191, 36, 0.4);
          }
        }

        @keyframes float-up {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes card-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }

        .fly-through {
          animation: fly-through 5s linear infinite;
        }

        .sparkle {
          animation: sparkle 2s ease-in-out infinite;
        }

        .rotate-slow {
          animation: rotate-slow 20s linear infinite;
        }

        .glow-pulse {
          animation: glow-pulse 2s ease-in-out infinite;
        }

        .float-up {
          animation: float-up 3s ease-in-out infinite;
        }

        .card-pulse {
          animation: card-pulse 4s ease-in-out infinite;
        }

        /* 优化移动端触摸体验 */
        .card-touch-area {
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        }
      `}</style>

      <div className="fixed inset-0 bg-gradient-to-b from-indigo-950 via-purple-900 to-black overflow-hidden">
        {/* 星空背景 */}
        <div className="absolute inset-0">
          {[...Array(60)].map((_, i) => (
            <div
              key={`star-${i}`}
              className="absolute bg-white rounded-full sparkle"
              style={{
                width: Math.random() > 0.7 ? '2px' : '1px',
                height: Math.random() > 0.7 ? '2px' : '1px',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        {/* 魔法阵背景 */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="w-[600px] h-[600px] border border-purple-300 rounded-full rotate-slow"></div>
          <div className="absolute w-[450px] h-[450px] border border-purple-400 rounded-full" style={{ animation: 'rotate-slow 15s linear infinite reverse' }}></div>
          <div className="absolute w-[300px] h-[300px] border-2 border-purple-500 rounded-full rotate-slow"></div>
        </div>

        {/* 中心水晶球光晕 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-48 h-48 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl glow-pulse"></div>
        </div>

        {/* 飞过的卡牌 */}
        <div className="absolute inset-0 overflow-hidden">
          {flyingCards.map((card, i) => (
            <div
              key={`flying-${i}`}
              className="absolute fly-through"
              style={{
                top: '50%',
                '--start-y': `${card.startY}vh`,
                '--end-y': `${card.endY}vh`,
                '--start-rotate': `${card.startRotate}deg`,
                '--end-rotate': `${card.endRotate}deg`,
                animationDelay: `${card.delay}s`,
                animationDuration: `${card.duration}s`,
                width: '60px',
                height: '90px',
              } as React.CSSProperties}
            >
              <div className="w-full h-full bg-gradient-to-br from-purple-300/80 to-purple-500/80 rounded-md border border-yellow-400/50 shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center text-lg opacity-70">🃏</div>
              </div>
            </div>
          ))}
        </div>

        {/* 中心大卡牌 */}
        <div 
          className="absolute inset-0 flex items-center justify-center card-touch-area"
          style={{ perspective: '2000px' }}
          onClick={handleTouch}
        >
          <div
            ref={cardRef}
            className={`transition-all duration-700 ${showCenterCard ? 'opacity-100 scale-100' : 'opacity-0 scale-90'} ${isAnimating ? 'card-pulse' : ''}`}
            style={{
              width: '240px',
              height: '360px',
              transformStyle: 'preserve-3d',
              transform: flipCard ? 'rotateY(180deg)' : 'rotateY(0deg)',
              transition: 'transform 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55), opacity 0.7s, scale 0.7s',
            }}
          >
            {/* 卡牌背面 */}
            <div
              className="absolute inset-0"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            >
              <div className="w-full h-full bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-900 rounded-3xl border-4 border-gradient-to-r from-yellow-400 to-amber-500 relative overflow-hidden shadow-2xl shadow-purple-500/30">
                {/* 发光效果 */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-transparent to-purple-600/20"></div>
                
                {/* 金色装饰边框 */}
                <div className="absolute top-4 left-4 right-4 bottom-4 border-2 border-yellow-400/40 rounded-2xl"></div>
                
                {/* 四角装饰 */}
                <div className="absolute top-3 left-3 text-yellow-400 text-lg">✦</div>
                <div className="absolute top-3 right-3 text-yellow-400 text-lg">✦</div>
                <div className="absolute bottom-3 left-3 text-yellow-400 text-lg">✦</div>
                <div className="absolute bottom-3 right-3 text-yellow-400 text-lg">✦</div>
                
                {/* 中心月亮和光芒 */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  {/* 光芒效果 */}
                  <div className="absolute w-36 h-36">
                    {[...Array(16)].map((_, i) => (
                      <div
                        key={`ray-${i}`}
                        className="absolute top-1/2 left-1/2 w-0.5 h-12 bg-gradient-to-t from-yellow-400/70 to-transparent"
                        style={{
                          transformOrigin: 'bottom',
                          transform: `rotate(${i * 22.5}deg) translateX(-50%)`,
                          opacity: 0.5,
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* 月亮符号 */}
                  <div className="relative z-10">
                    <div className="text-7xl mb-1 animate-pulse">🌙</div>
                    <div className="absolute inset-0 bg-yellow-400/40 blur-xl rounded-full animate-pulse"></div>
                  </div>
                  
                  {/* 装饰文字 */}
                  <div className="text-yellow-300 text-xl mt-2 font-serif">✧ ✧ ✧</div>
                </div>

                {/* 旋转的魔法圈 */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                  <svg className="w-48 h-48 rotate-slow" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-yellow-400" />
                    <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-yellow-400" />
                    <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-yellow-400" />
                  </svg>
                </div>
              </div>
            </div>

            {/* 卡牌正面 */}
            <div
              className="absolute inset-0"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <div className="w-full h-full bg-gradient-to-br from-amber-50/90 via-yellow-50/90 to-amber-100/90 rounded-3xl border-4 border-gradient-to-r from-yellow-500 to-amber-600 relative overflow-hidden shadow-2xl shadow-amber-500/30">
                {/* 光芒效果 */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/50 via-transparent to-amber-200/40"></div>
                
                {/* 金色装饰边框 */}
                <div className="absolute top-4 left-4 right-4 bottom-4 border-2 border-amber-600/50 rounded-2xl"></div>
                
                {/* 四角装饰 */}
                <div className="absolute top-3 left-3 text-amber-700 text-lg">✦</div>
                <div className="absolute top-3 right-3 text-amber-700 text-lg">✦</div>
                <div className="absolute bottom-3 left-3 text-amber-700 text-lg">✦</div>
                <div className="absolute bottom-3 right-3 text-amber-700 text-lg">✦</div>
                
                {/* 卡牌内容 */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                  <div className="text-amber-700 text-xl mb-4 font-serif">✧ ✧ ✧</div>
                  
                  {/* 水晶球 */}
                  <div className="relative mb-4">
                    <div className="text-7xl">{randomCard?.emoji}</div>
                    <div className="absolute inset-0 bg-purple-400/40 blur-2xl rounded-full"></div>
                  </div>
                  
                  {/* 标题 */}
                  <div className="text-amber-900 text-3xl font-bold mb-2 font-serif">{randomCard?.name}</div>
                  <div className="text-amber-700 text-base mb-3 font-medium">{randomCard?.meaning}</div>
                  <div className="text-amber-700 text-xl font-serif">✧</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 中心光环（卡牌显示后） */}
        {showCenterCard && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-80 h-80 border-2 border-purple-400/30 rounded-full rotate-slow" style={{ animation: 'rotate-slow 12s linear infinite' }}></div>
            <div className="absolute w-96 h-96 border-2 border-amber-400/20 rounded-full rotate-slow" style={{ animation: 'rotate-slow 10s linear infinite reverse' }}></div>
          </div>
        )}

        {/* 手势提示 */}
        {showCenterCard && !flipCard && (
          <div className="absolute bottom-24 left-0 right-0 flex justify-center pointer-events-none">
            <div className="bg-black/50 backdrop-blur-sm rounded-full px-6 py-3 flex items-center gap-2 text-purple-200 text-sm">
              <span>轻触卡牌</span>
              <div className="animate-bounce">👆</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
