import { useEffect, useState } from 'react';

export default function CardDrawAnimationPage() {
  const [showCenterCard, setShowCenterCard] = useState(false);
  const [flipCard, setFlipCard] = useState(false);

  useEffect(() => {
    // 1秒后显示中心卡牌
    const showTimer = setTimeout(() => {
      setShowCenterCard(true);
    }, 1000);

    // 3秒后翻转卡牌
    const flipTimer = setTimeout(() => {
      setFlipCard(true);
    }, 3000);

    // 6秒后跳转
    const navigateTimer = setTimeout(() => {
      window.location.hash = '#card-reading-detail';
    }, 6000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(flipTimer);
      clearTimeout(navigateTimer);
    };
  }, []);

  // 飞过的卡牌配置（12张卡牌持续飞过）
  const flyingCards = [
    { startY: -40, endY: -30, startRotate: -30, endRotate: 20, delay: 0, duration: 4 },
    { startY: -20, endY: -35, startRotate: 15, endRotate: -25, delay: 0.5, duration: 4.5 },
    { startY: 0, endY: -10, startRotate: -20, endRotate: 30, delay: 1, duration: 4 },
    { startY: 20, endY: 10, startRotate: 25, endRotate: -15, delay: 1.5, duration: 4.5 },
    { startY: -30, endY: 20, startRotate: -15, endRotate: 35, delay: 2, duration: 4 },
    { startY: 10, endY: -25, startRotate: 30, endRotate: -20, delay: 2.5, duration: 4.5 },
    { startY: -10, endY: 15, startRotate: -25, endRotate: 25, delay: 3, duration: 4 },
    { startY: 30, endY: -15, startRotate: 20, endRotate: -30, delay: 3.5, duration: 4.5 },
    { startY: -35, endY: 25, startRotate: -35, endRotate: 15, delay: 0.8, duration: 4 },
    { startY: 15, endY: -20, startRotate: 35, endRotate: -25, delay: 1.8, duration: 4.5 },
    { startY: -25, endY: 30, startRotate: -10, endRotate: 20, delay: 2.8, duration: 4 },
    { startY: 25, endY: -30, startRotate: 10, endRotate: -35, delay: 3.3, duration: 4.5 },
  ];

  return (
    <>
      <style>{`
        @keyframes fly-through {
          0% {
            transform: translate(-150vw, var(--start-y)) rotate(var(--start-rotate)) scale(0.8);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate(150vw, var(--end-y)) rotate(var(--end-rotate)) scale(0.8);
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
            box-shadow: 0 0 20px rgba(251, 191, 36, 0.3), 0 0 40px rgba(251, 191, 36, 0.2);
          }
          50% {
            box-shadow: 0 0 40px rgba(251, 191, 36, 0.6), 0 0 80px rgba(251, 191, 36, 0.4);
          }
        }

        .fly-through {
          animation: fly-through 4s linear infinite;
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
      `}</style>

      <div className="fixed inset-0 bg-gradient-to-b from-purple-950 via-purple-900 to-purple-950 overflow-hidden">
        {/* 星空背景 */}
        <div className="absolute inset-0">
          {[...Array(80)].map((_, i) => (
            <div
              key={`star-${i}`}
              className="absolute bg-white rounded-full sparkle"
              style={{
                width: Math.random() > 0.5 ? '2px' : '1px',
                height: Math.random() > 0.5 ? '2px' : '1px',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* 魔法阵背景 */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="w-[800px] h-[800px] border border-purple-300 rounded-full rotate-slow"></div>
          <div className="absolute w-[600px] h-[600px] border border-purple-400 rounded-full" style={{ animation: 'rotate-slow 15s linear infinite reverse' }}></div>
          <div className="absolute w-[400px] h-[400px] border-2 border-purple-500 rounded-full rotate-slow"></div>
        </div>

        {/* 中心水晶球光晕 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-64 h-64 bg-purple-500/20 rounded-full blur-3xl glow-pulse"></div>
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
                width: '80px',
                height: '120px',
              } as React.CSSProperties}
            >
              <div className="w-full h-full bg-gradient-to-br from-purple-200 to-purple-400 rounded-lg border-2 border-yellow-400 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-60">🌙</div>
              </div>
            </div>
          ))}
        </div>

        {/* 中心大卡牌 */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: '2000px' }}>
          <div
            className={`transition-all duration-1000 ${showCenterCard ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
            style={{
              width: '280px',
              height: '420px',
              transformStyle: 'preserve-3d',
              transform: flipCard ? 'rotateY(180deg)' : 'rotateY(0deg)',
              transition: 'transform 1.5s ease-in-out',
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
              <div className="w-full h-full bg-gradient-to-br from-purple-800 via-purple-700 to-purple-900 rounded-3xl border-4 border-yellow-500 relative overflow-hidden shadow-2xl">
                {/* 发光效果 */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/30 via-transparent to-purple-600/30"></div>
                
                {/* 金色装饰边框 */}
                <div className="absolute top-6 left-6 right-6 bottom-6 border-2 border-yellow-400/50 rounded-2xl"></div>
                
                {/* 四角装饰 */}
                <svg className="absolute top-4 left-4 w-8 h-8 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" />
                </svg>
                <svg className="absolute top-4 right-4 w-8 h-8 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" />
                </svg>
                <svg className="absolute bottom-4 left-4 w-8 h-8 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" />
                </svg>
                <svg className="absolute bottom-4 right-4 w-8 h-8 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" />
                </svg>
                
                {/* 中心月亮和光芒 */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  {/* 光芒效果 */}
                  <div className="absolute w-48 h-48">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={`ray-${i}`}
                        className="absolute top-1/2 left-1/2 w-1 bg-gradient-to-t from-yellow-400 to-transparent"
                        style={{
                          height: '60px',
                          transformOrigin: 'bottom',
                          transform: `rotate(${i * 30}deg) translateX(-50%)`,
                          opacity: 0.6,
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* 月亮符号 */}
                  <div className="relative z-10">
                    <div className="text-9xl mb-2">🌙</div>
                    <div className="absolute inset-0 bg-yellow-400/30 blur-2xl rounded-full"></div>
                  </div>
                  
                  {/* 装饰文字 */}
                  <div className="text-yellow-400 text-2xl mt-4 font-serif">✧ ✧ ✧</div>
                </div>

                {/* 旋转的魔法圈 */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <svg className="w-64 h-64 rotate-slow" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="1" className="text-yellow-400" />
                    <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="1" className="text-yellow-400" />
                    <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="1" className="text-yellow-400" />
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
              <div className="w-full h-full bg-gradient-to-br from-amber-50 via-purple-50 to-purple-100 rounded-3xl border-4 border-yellow-500 relative overflow-hidden shadow-2xl">
                {/* 光芒效果 */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/60 via-transparent to-purple-200/40"></div>
                
                {/* 金色装饰边框 */}
                <div className="absolute top-6 left-6 right-6 bottom-6 border-2 border-yellow-600/50 rounded-2xl"></div>
                
                {/* 四角装饰 */}
                <svg className="absolute top-4 left-4 w-8 h-8 text-purple-700" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" />
                </svg>
                <svg className="absolute top-4 right-4 w-8 h-8 text-purple-700" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" />
                </svg>
                <svg className="absolute bottom-4 left-4 w-8 h-8 text-purple-700" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" />
                </svg>
                <svg className="absolute bottom-4 right-4 w-8 h-8 text-purple-700" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" />
                </svg>
                
                {/* 卡牌内容 */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                  <div className="text-purple-700 text-2xl mb-6 font-serif">✧ ✧ ✧</div>
                  
                  {/* 水晶球 */}
                  <div className="relative mb-6">
                    <div className="text-9xl">🔮</div>
                    <div className="absolute inset-0 bg-purple-400/30 blur-3xl rounded-full"></div>
                  </div>
                  
                  {/* 标题 */}
                  <div className="text-purple-900 text-4xl font-bold mb-3 font-serif">命运之轮</div>
                  <div className="text-purple-700 text-lg mb-4">The Wheel of Fortune</div>
                  <div className="text-purple-700 text-2xl font-serif">✧</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 中心光环（卡牌显示后） */}
        {showCenterCard && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[500px] h-[500px] border-2 border-purple-400/30 rounded-full" style={{ animation: 'rotate-slow 10s linear infinite' }}></div>
            <div className="absolute w-[600px] h-[600px] border-2 border-yellow-400/20 rounded-full" style={{ animation: 'rotate-slow 8s linear infinite reverse' }}></div>
          </div>
        )}
      </div>
    </>
  );
}
