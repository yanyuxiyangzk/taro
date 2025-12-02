import { useEffect, useState } from 'react';

export default function CardDrawAnimationPage() {
  const [flipCard, setFlipCard] = useState(false);

  useEffect(() => {
    // 3秒后翻转卡牌
    const flipTimer = setTimeout(() => {
      setFlipCard(true);
    }, 3000);

    // 6秒后跳转
    const navigateTimer = setTimeout(() => {
      window.location.hash = '#card-reading-detail';
    }, 6000);

    return () => {
      clearTimeout(flipTimer);
      clearTimeout(navigateTimer);
    };
  }, []);

  // 飞过的卡牌配置
  const flyingCards = [
    { startY: -40, endY: -30, startRotate: -30, endRotate: 20, delay: 0, duration: 4 },
    { startY: -20, endY: -35, startRotate: 15, endRotate: -25, delay: 0.5, duration: 4.5 },
    { startY: 0, endY: -10, startRotate: -20, endRotate: 30, delay: 1, duration: 4 },
    { startY: 20, endY: 10, startRotate: 25, endRotate: -15, delay: 1.5, duration: 4.5 },
    { startY: -30, endY: 20, startRotate: -15, endRotate: 35, delay: 2, duration: 4 },
    { startY: 10, endY: -25, startRotate: 30, endRotate: -20, delay: 2.5, duration: 4.5 },
    { startY: -10, endY: 15, startRotate: -25, endRotate: 25, delay: 3, duration: 4 },
    { startY: 30, endY: -15, startRotate: 20, endRotate: -30, delay: 3.5, duration: 4.5 },
  ];

  return (
    <>
      <style>{`
        @keyframes fly-through {
          0% {
            transform: translate(-150vw, var(--start-y)) rotate(var(--start-rotate)) scale(0.6);
            opacity: 0;
          }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% {
            transform: translate(150vw, var(--end-y)) rotate(var(--end-rotate)) scale(0.6);
            opacity: 0;
          }
        }

        @keyframes sparkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.4); }
          50% { box-shadow: 0 0 60px rgba(59, 130, 246, 0.8); }
        }

        .fly-through {
          animation: fly-through 4s linear infinite;
        }

        .sparkle {
          animation: sparkle 2s ease-in-out infinite;
        }

        .glow-pulse {
          animation: glow-pulse 2s ease-in-out infinite;
        }
      `}</style>

      <div className="fixed inset-0 bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 overflow-hidden">
        {/* 星空背景 */}
        <div className="absolute inset-0">
          {[...Array(60)].map((_, i) => (
            <div
              key={`star-${i}`}
              className="absolute bg-white rounded-full sparkle"
              style={{
                width: Math.random() > 0.7 ? '3px' : '2px',
                height: Math.random() > 0.7 ? '3px' : '2px',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
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
                width: '100px',
                height: '150px',
              } as React.CSSProperties}
            >
              {/* 小卡牌背面 - 蓝色星星 */}
              <div className="w-full h-full bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-xl border-2 border-blue-300/50 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                {/* 弧线装饰 */}
                <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 150">
                  <ellipse cx="120" cy="75" rx="80" ry="100" fill="none" stroke="white" strokeWidth="1" />
                  <ellipse cx="-20" cy="75" rx="80" ry="100" fill="none" stroke="white" strokeWidth="1" />
                </svg>
                {/* 中心星星 */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-12 h-12 text-blue-200/60" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                </div>
                {/* 小星星装饰 */}
                {[...Array(6)].map((_, j) => (
                  <div
                    key={j}
                    className="absolute w-1 h-1 bg-white/50 rounded-full"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 中心大卡牌 */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: '2000px' }}>
          <div
            className="glow-pulse rounded-3xl"
            style={{
              width: '280px',
              height: '420px',
              transformStyle: 'preserve-3d',
              transform: flipCard ? 'rotateY(180deg)' : 'rotateY(0deg)',
              transition: 'transform 1.5s ease-in-out',
            }}
          >
            {/* 卡牌背面 - 蓝色星星 */}
            <div
              className="absolute inset-0"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            >
              <div className="w-full h-full bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-3xl border-4 border-blue-300/50 shadow-2xl relative overflow-hidden">
                {/* 光泽效果 */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent"></div>
                
                {/* 弧线装饰 */}
                <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 280 420">
                  <ellipse cx="350" cy="210" rx="200" ry="280" fill="none" stroke="white" strokeWidth="2" />
                  <ellipse cx="-70" cy="210" rx="200" ry="280" fill="none" stroke="white" strokeWidth="2" />
                </svg>
                
                {/* 中心星星 */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-24 h-24 text-blue-200/70" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                </div>
                
                {/* 小星星装饰 */}
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-white/40 rounded-full sparkle"
                    style={{
                      left: `${15 + Math.random() * 70}%`,
                      top: `${15 + Math.random() * 70}%`,
                      animationDelay: `${Math.random() * 2}s`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* 卡牌正面 - 仙子残影 */}
            <div
              className="absolute inset-0"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <div className="w-full h-full bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 rounded-3xl border-4 border-amber-400 shadow-2xl relative overflow-hidden">
                {/* 顶部标题栏 */}
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 py-3 px-4 flex justify-between items-center">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">3</div>
                  <span className="text-white font-bold text-lg">吉安娜的残影</span>
                  <div className="bg-blue-500 px-3 py-1 rounded-full text-white text-sm font-bold">稀有</div>
                </div>
                
                {/* 卡牌名称 */}
                <div className="absolute top-16 left-0 right-0 text-center">
                  <h2 className="text-3xl font-bold text-blue-800 mb-1">仙子残影</h2>
                  <p className="text-blue-600 italic text-lg">Ethereal Fairy</p>
                </div>
                
                {/* 仙子图像区域 */}
                <div className="absolute top-32 left-4 right-4 h-40 bg-gradient-to-br from-purple-200/50 via-pink-100/50 to-blue-200/50 rounded-xl flex items-center justify-center overflow-hidden">
                  <div className="text-8xl opacity-80">🧚‍♀️</div>
                  <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent"></div>
                </div>
                
                {/* 属性区域 */}
                <div className="absolute top-[280px] left-4 right-4 space-y-2">
                  <div className="flex justify-between items-center bg-white/60 rounded-lg px-3 py-2">
                    <span className="text-gray-700 font-medium">攻击力</span>
                    <div className="flex">
                      {'★★★★☆'.split('').map((s, i) => (
                        <span key={i} className={s === '★' ? 'text-blue-600' : 'text-gray-300'}>{s}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center bg-white/60 rounded-lg px-3 py-2">
                    <span className="text-gray-700 font-medium">防御力</span>
                    <div className="flex">
                      {'★★★☆☆'.split('').map((s, i) => (
                        <span key={i} className={s === '★' ? 'text-blue-600' : 'text-gray-300'}>{s}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center bg-white/60 rounded-lg px-3 py-2">
                    <span className="text-gray-700 font-medium">魔法力</span>
                    <div className="flex">
                      {'★★★★★'.split('').map((s, i) => (
                        <span key={i} className={s === '★' ? 'text-blue-600' : 'text-gray-300'}>{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* 底部信息 */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
                  <span className="text-gray-500 text-sm">传说卡牌 #732</span>
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
