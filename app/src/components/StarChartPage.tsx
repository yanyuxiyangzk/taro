import { useState } from 'react';

export default function StarChartPage() {
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    prediction: string;
    advice: string;
    luckyElement: string;
    avoidElement: string;
    bestTime: string;
    fortune: number;
  } | null>(null);

  // 预测问题类型
  const questionTypes = [
    { id: 'career', icon: '💼', label: '事业前程', desc: '工作发展' },
    { id: 'love', icon: '💕', label: '姻缘情感', desc: '感情运势' },
    { id: 'wealth', icon: '💰', label: '财运走向', desc: '财富机遇' },
    { id: 'health', icon: '🏥', label: '健康平安', desc: '身体状况' },
    { id: 'decision', icon: '🤔', label: '抉择指引', desc: '重大决定' },
    { id: 'travel', icon: '✈️', label: '出行吉凶', desc: '旅途平安' },
  ];

  // 星座数据
  const zodiacSigns = [
    { name: '白羊', symbol: '♈', angle: 0 },
    { name: '金牛', symbol: '♉', angle: 30 },
    { name: '双子', symbol: '♊', angle: 60 },
    { name: '巨蟹', symbol: '♋', angle: 90 },
    { name: '狮子', symbol: '♌', angle: 120 },
    { name: '处女', symbol: '♍', angle: 150 },
    { name: '天秤', symbol: '♎', angle: 180 },
    { name: '天蝎', symbol: '♏', angle: 210 },
    { name: '射手', symbol: '♐', angle: 240 },
    { name: '摩羯', symbol: '♑', angle: 270 },
    { name: '水瓶', symbol: '♒', angle: 300 },
    { name: '双鱼', symbol: '♓', angle: 330 },
  ];

  // 预测结果数据库
  const predictionDatabase: Record<string, {
    prediction: string;
    advice: string;
    luckyElement: string;
    avoidElement: string;
    bestTime: string;
    fortune: number;
  }> = {
    career: {
      prediction: '星图显示，木星正位于你的事业宫，这是一个极为有利的星象。近期将有贵人相助，事业上会迎来新的机遇。若有跳槽或创业的想法，此时是绝佳时机。',
      advice: '把握机会，主动出击。与上级保持良好沟通，展现你的能力。',
      luckyElement: '火元素',
      avoidElement: '水元素',
      bestTime: '上午9-11点',
      fortune: 88
    },
    love: {
      prediction: '金星与火星形成和谐相位，感情运势正在上升。单身者有望遇到心仪对象，已有伴侣者感情将更加甜蜜。星图暗示，真诚的表达将带来美好的回应。',
      advice: '敞开心扉，勇敢表达。多参加社交活动，缘分就在身边。',
      luckyElement: '水元素',
      avoidElement: '土元素',
      bestTime: '傍晚6-8点',
      fortune: 85
    },
    wealth: {
      prediction: '财星入命，偏财运势旺盛。星图显示近期可能有意外之财，但需谨慎投资。正财稳定，适合稳健理财。避免冲动消费，积少成多。',
      advice: '理性投资，稳健为主。可适当关注新兴领域的机会。',
      luckyElement: '金元素',
      avoidElement: '木元素',
      bestTime: '下午2-4点',
      fortune: 82
    },
    health: {
      prediction: '土星过境健康宫，提醒你注意身体状况。星图建议加强锻炼，保持规律作息。特别注意肠胃和睡眠质量，适当减压放松。',
      advice: '规律作息，适度运动。保持心情愉悦，注意饮食健康。',
      luckyElement: '木元素',
      avoidElement: '火元素',
      bestTime: '清晨6-8点',
      fortune: 75
    },
    decision: {
      prediction: '水星顺行，思维清晰，是做重大决定的好时机。星图显示，你的直觉力增强，相信内心的声音。但仍需收集足够信息，理性分析后再行动。',
      advice: '倾听内心，理性分析。与信任的人商议，但最终决定权在你。',
      luckyElement: '风元素',
      avoidElement: '水元素',
      bestTime: '上午10-12点',
      fortune: 80
    },
    travel: {
      prediction: '九宫飞星显示，东南方向大吉。出行顺利，旅途平安。星图建议选择阳光明媚的日子出发，避开阴雨天气。注意随身物品安全。',
      advice: '提前规划，准备充分。保持警惕，注意安全。',
      luckyElement: '火元素',
      avoidElement: '金元素',
      bestTime: '上午8-10点',
      fortune: 86
    }
  };

  const startPrediction = () => {
    if (!selectedQuestion) return;
    
    setIsAnalyzing(true);
    
    setTimeout(() => {
      setResult(predictionDatabase[selectedQuestion]);
      setIsAnalyzing(false);
    }, 3000);
  };

  const goBack = () => {
    window.location.hash = '#divination';
  };

  const resetPrediction = () => {
    setResult(null);
    setSelectedQuestion(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 text-white relative overflow-hidden">
      <style>{`
        @keyframes rotate-star-chart {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes rotate-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.4); }
          50% { box-shadow: 0 0 50px rgba(99, 102, 241, 0.8); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes shooting-star {
          0% { transform: translateX(0) translateY(0); opacity: 1; }
          100% { transform: translateX(-300px) translateY(300px); opacity: 0; }
        }
        
        .rotate-star-chart {
          animation: rotate-star-chart 60s linear infinite;
        }
        
        .rotate-reverse {
          animation: rotate-reverse 45s linear infinite;
        }
        
        .rotate-slow {
          animation: rotate-star-chart 90s linear infinite;
        }
        
        .twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
        
        .pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        
        .float {
          animation: float 3s ease-in-out infinite;
        }
        
        .shooting-star {
          animation: shooting-star 3s linear infinite;
        }
      `}</style>

      {/* 星空背景 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* 星星 */}
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white twinkle"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 3 + 's',
            }}
          />
        ))}
        
        {/* 流星 */}
        <div className="absolute top-10 right-20 w-1 h-1 bg-white rounded-full shooting-star" style={{ animationDelay: '0s' }} />
        <div className="absolute top-30 right-40 w-1 h-1 bg-white rounded-full shooting-star" style={{ animationDelay: '4s' }} />
        <div className="absolute top-20 right-60 w-1 h-1 bg-white rounded-full shooting-star" style={{ animationDelay: '8s' }} />
        
        {/* 星云效果 */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      {/* 顶部导航 */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-slate-950/95 via-indigo-950/90 to-slate-950/95 backdrop-blur-md border-b border-indigo-500/30">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={goBack} className="text-white p-2 hover:bg-indigo-800/30 rounded-full transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <span className="text-2xl">⭐</span>
            <span className="bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">星图预测</span>
          </h1>
          <div className="w-10"></div>
        </div>
      </div>

      <div className="relative z-10 p-4 space-y-6">
        {/* 星图区域 */}
        <div className="relative h-80 flex items-center justify-center overflow-visible">
          {/* 最外层 - 星座环 */}
          <svg className="absolute w-72 h-72 rotate-slow" viewBox="0 0 300 300">
            <defs>
              <linearGradient id="outerStarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#818cf8" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#6366f1" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            <circle cx="150" cy="150" r="145" fill="none" stroke="url(#outerStarGradient)" strokeWidth="1" strokeDasharray="8 4" />
            <circle cx="150" cy="150" r="140" fill="none" stroke="url(#outerStarGradient)" strokeWidth="2" />
            
            {/* 星座符号 */}
            {zodiacSigns.map((sign, i) => {
              const x = 150 + 125 * Math.cos(((sign.angle - 90) * Math.PI) / 180);
              const y = 150 + 125 * Math.sin(((sign.angle - 90) * Math.PI) / 180);
              return (
                <text
                  key={i}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#a5b4fc"
                  fontSize="16"
                  fontWeight="bold"
                >
                  {sign.symbol}
                </text>
              );
            })}
          </svg>
          
          {/* 中间层 - 逆时针 */}
          <svg className="absolute w-56 h-56 rotate-reverse" viewBox="0 0 250 250">
            <defs>
              <linearGradient id="middleStarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.5" />
                <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#d97706" stopOpacity="0.5" />
              </linearGradient>
            </defs>
            <circle cx="125" cy="125" r="115" fill="none" stroke="url(#middleStarGradient)" strokeWidth="1.5" strokeDasharray="6 3" />
            <circle cx="125" cy="125" r="108" fill="none" stroke="url(#middleStarGradient)" strokeWidth="2" />
            
            {/* 行星符号 */}
            {['☉', '☽', '☿', '♀', '♂', '♃', '♄', '⛢'].map((symbol, i) => {
              const angle = i * 45 - 90;
              const x = 125 + 95 * Math.cos((angle * Math.PI) / 180);
              const y = 125 + 95 * Math.sin((angle * Math.PI) / 180);
              return (
                <text
                  key={i}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#fbbf24"
                  fontSize="18"
                  fontWeight="bold"
                >
                  {symbol}
                </text>
              );
            })}
          </svg>
          
          {/* 内层星图 */}
          <svg className="absolute w-44 h-44 rotate-star-chart" viewBox="0 0 200 200">
            <defs>
              <linearGradient id="innerStarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c084fc" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
              <filter id="star-glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* 星图圆环 */}
            <circle cx="100" cy="100" r="95" fill="none" stroke="url(#innerStarGradient)" strokeWidth="2" />
            <circle cx="100" cy="100" r="85" fill="none" stroke="url(#innerStarGradient)" strokeWidth="1" opacity="0.6" />
            <circle cx="100" cy="100" r="75" fill="none" stroke="url(#innerStarGradient)" strokeWidth="2" />
            <circle cx="100" cy="100" r="65" fill="none" stroke="url(#innerStarGradient)" strokeWidth="1" opacity="0.6" />
            
            {/* 星图分隔线 */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
              <line
                key={i}
                x1={100 + 50 * Math.cos((angle * Math.PI) / 180)}
                y1={100 + 50 * Math.sin((angle * Math.PI) / 180)}
                x2={100 + 93 * Math.cos((angle * Math.PI) / 180)}
                y2={100 + 93 * Math.sin((angle * Math.PI) / 180)}
                stroke="url(#innerStarGradient)"
                strokeWidth="1"
                opacity="0.5"
              />
            ))}
            
            {/* 中心星星 */}
            <polygon
              points="100,55 108,80 135,80 113,95 121,120 100,105 79,120 87,95 65,80 92,80"
              fill="url(#innerStarGradient)"
              filter="url(#star-glow)"
              opacity="0.9"
            />
          </svg>
          
          {/* 中心图标 */}
          <div className="absolute flex flex-col items-center justify-center float z-10">
            <div className="text-5xl filter drop-shadow-lg">🌟</div>
          </div>
          
          {/* 光晕效果 */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl"></div>
          </div>
        </div>
        
        {/* 标题区域 */}
        <div className="text-center">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
            星图预测
          </h2>
          <p className="text-indigo-300/80 text-sm mt-1">观星象 · 测人事 · 断吉凶</p>
        </div>

        {!result ? (
          <>
            {/* 问题选择区域 */}
            <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 rounded-2xl p-5 border border-indigo-500/40 backdrop-blur-sm">
              <h3 className="text-yellow-400 font-bold mb-4 flex items-center gap-2">
                <span className="text-xl">🔮</span>
                <span>选择预测类型</span>
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {questionTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedQuestion(type.id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all border ${
                      selectedQuestion === type.id
                        ? 'bg-indigo-600/50 border-indigo-400 scale-105'
                        : 'bg-indigo-900/30 border-indigo-600/30 hover:bg-indigo-800/40 hover:border-indigo-500/50'
                    }`}
                  >
                    <span className="text-3xl">{type.icon}</span>
                    <span className="text-sm text-white font-medium">{type.label}</span>
                    <span className="text-xs text-indigo-300/70">{type.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 开始预测按钮 */}
            <button
              onClick={startPrediction}
              disabled={!selectedQuestion || isAnalyzing}
              className={`w-full py-4 rounded-xl font-bold transition-all ${
                selectedQuestion && !isAnalyzing
                  ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-700 hover:via-purple-700 hover:to-indigo-700 text-white shadow-lg shadow-indigo-500/30'
                  : 'bg-indigo-800/50 text-indigo-400 cursor-not-allowed'
              }`}
            >
              {isAnalyzing ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  星图解析中...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <span>⭐</span>
                  <span>开始预测</span>
                </span>
              )}
            </button>

            {/* 功能说明 */}
            <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-2xl p-5 border border-indigo-500/30">
              <h3 className="text-indigo-300 font-bold mb-3 flex items-center gap-2">
                <span>📜</span>
                <span>星图预测说明</span>
              </h3>
              <div className="space-y-2 text-sm text-indigo-200/80">
                <p>• 星图预测源自古老的占星术，通过观察星象变化预测吉凶</p>
                <p>• 每个星座、行星的位置都蕴含着独特的能量和信息</p>
                <p>• 选择你关心的问题类型，星图将为你揭示答案</p>
                <p>• 预测结果仅供参考，命运掌握在自己手中</p>
              </div>
            </div>
          </>
        ) : (
          /* 预测结果 */
          <div className="space-y-4 animate-fadeIn">
            {/* 运势评分 */}
            <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 rounded-2xl p-6 border border-indigo-500/40 text-center">
              <div className="text-6xl mb-3">⭐</div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">{result.fortune}分</div>
              <div className="text-indigo-200">综合运势评分</div>
              <div className="mt-3 h-2 bg-indigo-900/50 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full transition-all duration-1000"
                  style={{ width: `${result.fortune}%` }}
                />
              </div>
            </div>

            {/* 星图解读 */}
            <div className="bg-gradient-to-br from-purple-900/40 to-violet-900/40 rounded-2xl p-5 border border-purple-500/40">
              <h3 className="text-purple-300 font-bold mb-3 flex items-center gap-2">
                <span>🔮</span>
                <span>星图解读</span>
              </h3>
              <p className="text-purple-100 leading-relaxed text-sm">{result.prediction}</p>
            </div>

            {/* 吉凶信息 */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-xl p-4 border border-green-500/30">
                <div className="text-2xl mb-2">✨</div>
                <div className="text-xs text-green-300/70 mb-1">吉利元素</div>
                <div className="text-green-200 font-bold">{result.luckyElement}</div>
              </div>
              <div className="bg-gradient-to-br from-red-900/30 to-orange-900/30 rounded-xl p-4 border border-red-500/30">
                <div className="text-2xl mb-2">⚠️</div>
                <div className="text-xs text-red-300/70 mb-1">规避元素</div>
                <div className="text-red-200 font-bold">{result.avoidElement}</div>
              </div>
            </div>

            {/* 最佳时机 */}
            <div className="bg-gradient-to-br from-amber-900/30 to-yellow-900/30 rounded-2xl p-5 border border-amber-500/40">
              <h3 className="text-amber-400 font-bold mb-3 flex items-center gap-2">
                <span>⏰</span>
                <span>最佳时机</span>
              </h3>
              <p className="text-amber-100 text-lg font-medium">{result.bestTime}</p>
            </div>

            {/* 星图建议 */}
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-5 border border-blue-500/40">
              <h3 className="text-blue-400 font-bold mb-3 flex items-center gap-2">
                <span>💡</span>
                <span>星图建议</span>
              </h3>
              <p className="text-blue-100">{result.advice}</p>
            </div>

            {/* 操作按钮 */}
            <div className="flex gap-3">
              <button
                onClick={resetPrediction}
                className="flex-1 py-3 bg-indigo-800/50 hover:bg-indigo-700/50 rounded-xl text-indigo-200 font-medium transition-all flex items-center justify-center gap-2"
              >
                <span>🔄</span>
                <span>重新预测</span>
              </button>
              <button
                className="flex-1 py-3 bg-gradient-to-r from-amber-600/80 to-orange-600/80 hover:from-amber-700 hover:to-orange-700 rounded-xl text-white font-medium transition-all flex items-center justify-center gap-2"
              >
                <span>📤</span>
                <span>分享结果</span>
              </button>
            </div>
          </div>
        )}

        {/* 底部间距 */}
        <div className="h-8"></div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
