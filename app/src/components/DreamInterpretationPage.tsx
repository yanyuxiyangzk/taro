import { useState, useEffect } from 'react';

export default function DreamInterpretationPage() {
  const [dreamInput, setDreamInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showStars, setShowStars] = useState(true);
  const [analyzeProgress, setAnalyzeProgress] = useState(0);
  const [result, setResult] = useState<{
    proverb: string;
    interpretation: string;
    advice: string;
    fortune: string;
    dreamImage: string;
    luckyColor: string;
    luckyNumber: string;
    luckyDirection: string;
    dreamType: string;
  } | null>(null);

  // 生成星星背景
  useEffect(() => {
    const interval = setInterval(() => {
      setShowStars(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // 梦境解析数据库 - 扩展版
  const dreamDatabase = [
    {
      keywords: ['水', '河', '海', '游泳', '溺水', '洪水', '雨'],
      proverb: '水能载舟，亦能覆舟',
      interpretation: '梦见水象征着情感和潜意识。清澈的水代表内心平静，浑浊的水则暗示情绪困扰。若梦见游泳，表示你正在努力应对生活中的挑战。洪水则预示着情感的爆发或重大变化即将来临。',
      advice: '近期宜静心思考，处理好人际关系中的情感问题。',
      fortune: '财运平稳，感情运势上升',
      dreamImage: '💧',
      luckyColor: '蓝色',
      luckyNumber: '6',
      luckyDirection: '北方',
      dreamType: '吉梦'
    },
    {
      keywords: ['飞', '天空', '云', '鸟', '翅膀'],
      proverb: '鹏程万里，志在青云',
      interpretation: '梦见飞翔代表着对自由的渴望和对更高目标的追求。这是一个吉祥的梦，预示着你将突破现有的限制，获得新的发展机会。若飞得很高，说明你的志向远大。',
      advice: '把握机遇，勇敢追求心中的理想。',
      fortune: '事业运势大吉，贵人相助',
      dreamImage: '🕊️',
      luckyColor: '白色',
      luckyNumber: '9',
      luckyDirection: '东方',
      dreamType: '大吉'
    },
    {
      keywords: ['蛇', '龙', '虎', '动物', '狮子'],
      proverb: '龙行虎步，气吞山河',
      interpretation: '梦见蛇或龙等神秘动物，在周公解梦中是大吉之兆。蛇代表智慧和财富，龙象征权力和尊贵。此梦预示着好运即将降临，可能会有意外的收获。',
      advice: '近期可大胆行事，把握投资机会。',
      fortune: '财运亨通，事业有成',
      dreamImage: '🐉',
      luckyColor: '金色',
      luckyNumber: '8',
      luckyDirection: '东南',
      dreamType: '大吉'
    },
    {
      keywords: ['死', '亡', '棺材', '葬礼', '坟墓'],
      proverb: '否极泰来，枯木逢春',
      interpretation: '梦见死亡并非凶兆，反而象征着旧事物的结束和新生活的开始。这预示着你将告别过去，迎来人生的新篇章。是重生和转变的象征。',
      advice: '放下过去的包袱，勇敢迎接新的开始。',
      fortune: '转运之兆，困境将解',
      dreamImage: '🌅',
      luckyColor: '紫色',
      luckyNumber: '7',
      luckyDirection: '西方',
      dreamType: '转运'
    },
    {
      keywords: ['钱', '金', '银', '财', '宝', '捡钱', '发财'],
      proverb: '财源广进，日进斗金',
      interpretation: '梦见金钱或财宝，反映了你对物质生活的关注。若梦见捡到钱，预示着意外之财；若梦见丢钱，则提醒你注意理财。金银珠宝则象征着即将到来的好运。',
      advice: '理性消费，稳健投资，财运自来。',
      fortune: '偏财运佳，正财稳定',
      dreamImage: '💰',
      luckyColor: '金色',
      luckyNumber: '8',
      luckyDirection: '西南',
      dreamType: '财运'
    },
    {
      keywords: ['考试', '学校', '老师', '学习', '毕业'],
      proverb: '学海无涯，勤能补拙',
      interpretation: '梦见考试或学校场景，反映了你对自我能力的担忧或对某种评判的焦虑。这提醒你要对自己有信心，同时也要不断学习进步。',
      advice: '保持学习心态，相信自己的能力。',
      fortune: '学业运势上升，考试顺利',
      dreamImage: '📚',
      luckyColor: '绿色',
      luckyNumber: '3',
      luckyDirection: '东方',
      dreamType: '吉梦'
    },
    {
      keywords: ['房子', '家', '门', '窗', '搬家'],
      proverb: '安居乐业，家和万事兴',
      interpretation: '梦见房屋代表着你的内心世界和安全感。新房预示新生活，旧房代表回忆，房屋倒塌则暗示需要重建某些方面。',
      advice: '关注家庭和谐，营造温馨的生活环境。',
      fortune: '家庭运势良好，置业有望',
      dreamImage: '🏠',
      luckyColor: '棕色',
      luckyNumber: '4',
      luckyDirection: '中央',
      dreamType: '吉梦'
    },
    {
      keywords: ['花', '树', '草', '植物', '森林', '花园'],
      proverb: '春华秋实，厚积薄发',
      interpretation: '梦见花草树木象征着生命力和成长。盛开的花朵预示好运，枯萎的植物提醒你注意健康。绿色植物代表希望和新生。',
      advice: '保持积极心态，静待花开。',
      fortune: '健康运势良好，心情愉悦',
      dreamImage: '🌸',
      luckyColor: '绿色',
      luckyNumber: '5',
      luckyDirection: '东方',
      dreamType: '吉梦'
    },
    {
      keywords: ['结婚', '婚礼', '新娘', '新郎', '爱情', '恋人'],
      proverb: '百年好合，天作之合',
      interpretation: '梦见结婚或婚礼场景，象征着新的开始和承诺。若你单身，可能预示着即将遇到心仪的对象；若已婚，则代表感情的升华。',
      advice: '珍惜身边人，用心经营感情。',
      fortune: '桃花运旺盛，感情甜蜜',
      dreamImage: '💒',
      luckyColor: '粉色',
      luckyNumber: '2',
      luckyDirection: '南方',
      dreamType: '桃花'
    },
    {
      keywords: ['追', '逃跑', '被追', '奔跑', '逃避'],
      proverb: '退一步海阔天空',
      interpretation: '梦见被追赶或逃跑，反映了你在现实中可能正在逃避某些问题或压力。这个梦提醒你要勇敢面对困难，而不是一味逃避。',
      advice: '正视问题，勇敢面对挑战。',
      fortune: '压力将解，柳暗花明',
      dreamImage: '🏃',
      luckyColor: '红色',
      luckyNumber: '1',
      luckyDirection: '南方',
      dreamType: '警示'
    },
    {
      keywords: ['牙', '掉牙', '牙齿', '拔牙'],
      proverb: '居安思危，未雨绸缪',
      interpretation: '梦见掉牙在周公解梦中有多重含义。可能预示着家中长辈的健康需要关注，也可能象征着你正在经历某种失去或改变。',
      advice: '多关心家人健康，注意自身状态。',
      fortune: '需注意健康，家庭运势平稳',
      dreamImage: '🦷',
      luckyColor: '白色',
      luckyNumber: '6',
      luckyDirection: '西方',
      dreamType: '警示'
    },
    {
      keywords: ['怀孕', '孩子', '婴儿', '生孩子', '宝宝'],
      proverb: '瓜熟蒂落，水到渠成',
      interpretation: '梦见怀孕或婴儿，象征着新的计划、创意或项目即将诞生。这是一个充满希望的梦，预示着你的努力即将结出果实。',
      advice: '耐心等待，好事将近。',
      fortune: '创造力旺盛，新机遇来临',
      dreamImage: '👶',
      luckyColor: '粉色',
      luckyNumber: '9',
      luckyDirection: '东南',
      dreamType: '大吉'
    }
  ];

  const analyzeDream = () => {
    if (!dreamInput.trim()) return;
    
    setIsAnalyzing(true);
    setAnalyzeProgress(0);
    
    // 模拟分析进度
    const progressInterval = setInterval(() => {
      setAnalyzeProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
    
    // 模拟分析过程
    setTimeout(() => {
      clearInterval(progressInterval);
      setAnalyzeProgress(100);
      
      // 查找匹配的梦境解析
      let matchedDream = dreamDatabase.find(dream => 
        dream.keywords.some(keyword => dreamInput.includes(keyword))
      );
      
      // 如果没有匹配，使用默认解析
      const defaultDream = {
        proverb: '天机不可泄露，命运掌握在自己手中',
        interpretation: '此梦境较为特殊，周公认为这是你潜意识的独特表达。梦境反映了你近期的心理状态和内心渴望，需要结合实际情况深入理解。每个人的梦境都是独一无二的，它承载着你内心深处的声音。',
        advice: '保持平常心，顺其自然，相信自己的直觉。',
        fortune: '运势平稳，宜静观其变',
        dreamImage: '🔮',
        luckyColor: '紫色',
        luckyNumber: '7',
        luckyDirection: '中央',
        dreamType: '神秘'
      };
      
      const resultDream = matchedDream || defaultDream;
      
      setTimeout(() => {
        setResult({
          proverb: resultDream.proverb,
          interpretation: resultDream.interpretation,
          advice: resultDream.advice,
          fortune: resultDream.fortune,
          dreamImage: resultDream.dreamImage,
          luckyColor: resultDream.luckyColor,
          luckyNumber: resultDream.luckyNumber,
          luckyDirection: resultDream.luckyDirection,
          dreamType: resultDream.dreamType
        });
        setIsAnalyzing(false);
      }, 300);
    }, 2500);
  };

  const goBack = () => {
    window.location.hash = '#divination';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-950 to-slate-900 text-white relative overflow-hidden">
      <style>{`
        @keyframes rotate-bagua {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.4); }
          50% { box-shadow: 0 0 40px rgba(168, 85, 247, 0.8); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes shooting-star {
          0% { transform: translateX(0) translateY(0); opacity: 1; }
          100% { transform: translateX(-200px) translateY(200px); opacity: 0; }
        }
        
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 0.4; }
          100% { transform: scale(0.8); opacity: 0.8; }
        }
        
        @keyframes dream-wave {
          0%, 100% { transform: translateX(-50%) scaleY(1); }
          50% { transform: translateX(-50%) scaleY(1.1); }
        }
        
        @keyframes rotate-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        @keyframes energy-flow {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -100; }
        }
        
        .rotate-bagua {
          animation: rotate-bagua 20s linear infinite;
        }
        
        .rotate-reverse {
          animation: rotate-reverse 15s linear infinite;
        }
        
        .rotate-slow {
          animation: rotate-bagua 30s linear infinite;
        }
        
        .energy-flow {
          animation: energy-flow 3s linear infinite;
        }
        
        .float {
          animation: float 3s ease-in-out infinite;
        }
        
        .glow {
          animation: glow 2s ease-in-out infinite;
        }
        
        .twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
        
        .shooting-star {
          animation: shooting-star 2s linear infinite;
        }
        
        .pulse-ring {
          animation: pulse-ring 3s ease-in-out infinite;
        }
        
        .dream-wave {
          animation: dream-wave 4s ease-in-out infinite;
        }
      `}</style>

      {/* 星空背景 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* 星星 */}
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white twinkle"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 3 + 's',
              opacity: showStars ? 0.8 : 0.3
            }}
          />
        ))}
        
        {/* 流星 */}
        <div className="absolute top-20 right-10 w-1 h-1 bg-white rounded-full shooting-star" style={{ animationDelay: '0s' }} />
        <div className="absolute top-40 right-40 w-1 h-1 bg-white rounded-full shooting-star" style={{ animationDelay: '3s' }} />
        <div className="absolute top-10 right-60 w-1 h-1 bg-white rounded-full shooting-star" style={{ animationDelay: '6s' }} />
        
        {/* 梦幻光晕 */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pulse-ring" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pulse-ring" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* 顶部导航 */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-slate-900/95 via-purple-900/90 to-slate-900/95 backdrop-blur-md border-b border-purple-500/30">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={goBack} className="text-white p-2 hover:bg-purple-800/30 rounded-full transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <span className="text-2xl">🌙</span>
            <span className="bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent">周公解梦</span>
          </h1>
          <div className="w-10"></div>
        </div>
      </div>

      <div className="relative z-10 p-4 space-y-8">
        {/* 主视觉区域 - 八卦轮回图 */}
        <div className="relative h-96 flex items-center justify-center overflow-visible mb-4">
          {/* 最外层能量环 - 顺时针 */}
          <svg className="absolute w-72 h-72 rotate-slow" viewBox="0 0 300 300">
            <defs>
              <linearGradient id="outerRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f472b6" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#a855f7" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            <circle cx="150" cy="150" r="145" fill="none" stroke="url(#outerRingGradient)" strokeWidth="2" strokeDasharray="8 4" className="energy-flow" />
            <circle cx="150" cy="150" r="140" fill="none" stroke="url(#outerRingGradient)" strokeWidth="1" opacity="0.5" />
            {/* 外圈轮回符号 */}
            {['生', '老', '病', '死', '爱', '恨', '离', '别', '求', '得', '怨', '憎'].map((char, i) => {
              const angle = i * 30 - 90;
              const x = 150 + 130 * Math.cos((angle * Math.PI) / 180);
              const y = 150 + 130 * Math.sin((angle * Math.PI) / 180);
              return (
                <text
                  key={i}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#c084fc"
                  fontSize="12"
                  opacity="0.7"
                >
                  {char}
                </text>
              );
            })}
          </svg>
          
          {/* 第二层 - 逆时针旋转 */}
          <svg className="absolute w-60 h-60 rotate-reverse" viewBox="0 0 250 250">
            <defs>
              <linearGradient id="middleRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.5" />
                <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#d97706" stopOpacity="0.5" />
              </linearGradient>
            </defs>
            <circle cx="125" cy="125" r="120" fill="none" stroke="url(#middleRingGradient)" strokeWidth="1.5" strokeDasharray="6 3" />
            <circle cx="125" cy="125" r="115" fill="none" stroke="url(#middleRingGradient)" strokeWidth="2" />
            {/* 天干地支 */}
            {['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'].map((char, i) => {
              const angle = i * 30 - 90;
              const x = 125 + 105 * Math.cos((angle * Math.PI) / 180);
              const y = 125 + 105 * Math.sin((angle * Math.PI) / 180);
              return (
                <text
                  key={i}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#fbbf24"
                  fontSize="14"
                  fontWeight="bold"
                  opacity="0.8"
                >
                  {char}
                </text>
              );
            })}
          </svg>
          
          {/* 主八卦轮 - 顺时针 */}
          <svg className="absolute w-52 h-52 rotate-bagua" viewBox="0 0 200 200">
            <defs>
              <linearGradient id="baguaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c084fc" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
              <filter id="glow-filter">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* 外圈装饰 */}
            <circle cx="100" cy="100" r="98" fill="none" stroke="url(#baguaGradient)" strokeWidth="2" strokeDasharray="4 4" />
            <circle cx="100" cy="100" r="94" fill="none" stroke="url(#baguaGradient)" strokeWidth="3" />
            <circle cx="100" cy="100" r="88" fill="none" stroke="url(#baguaGradient)" strokeWidth="1" opacity="0.6" />
            <circle cx="100" cy="100" r="82" fill="none" stroke="url(#baguaGradient)" strokeWidth="2" />
            
            {/* 八卦分隔线 */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <line
                key={i}
                x1={100 + 45 * Math.cos((angle * Math.PI) / 180)}
                y1={100 + 45 * Math.sin((angle * Math.PI) / 180)}
                x2={100 + 92 * Math.cos((angle * Math.PI) / 180)}
                y2={100 + 92 * Math.sin((angle * Math.PI) / 180)}
                stroke="url(#baguaGradient)"
                strokeWidth="2"
                opacity="0.8"
              />
            ))}
            
            {/* 八卦符号 - 更大更清晰 */}
            {['☰', '☱', '☲', '☳', '☴', '☵', '☶', '☷'].map((symbol, i) => {
              const angle = i * 45 - 90;
              const x = 100 + 68 * Math.cos((angle * Math.PI) / 180);
              const y = 100 + 68 * Math.sin((angle * Math.PI) / 180);
              return (
                <text
                  key={i}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="url(#baguaGradient)"
                  fontSize="22"
                  fontWeight="bold"
                  filter="url(#glow-filter)"
                >
                  {symbol}
                </text>
              );
            })}
            
            {/* 八卦名称 */}
            {['乾', '兑', '离', '震', '巽', '坎', '艮', '坤'].map((name, i) => {
              const angle = i * 45 - 90;
              const x = 100 + 52 * Math.cos((angle * Math.PI) / 180);
              const y = 100 + 52 * Math.sin((angle * Math.PI) / 180);
              return (
                <text
                  key={i}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#e9d5ff"
                  fontSize="10"
                  opacity="0.9"
                >
                  {name}
                </text>
              );
            })}
            
            {/* 阴阳鱼 - 更精致 */}
            <circle cx="100" cy="100" r="40" fill="none" stroke="url(#baguaGradient)" strokeWidth="2" />
            <path d="M100 60 A40 40 0 0 1 100 140 A20 20 0 0 1 100 100 A20 20 0 0 0 100 60" fill="white" opacity="0.95" />
            <path d="M100 140 A40 40 0 0 1 100 60 A20 20 0 0 0 100 100 A20 20 0 0 1 100 140" fill="#1e1b4b" opacity="0.98" />
            <circle cx="100" cy="80" r="7" fill="#1e1b4b" />
            <circle cx="100" cy="120" r="7" fill="white" />
            {/* 阴阳鱼中心点 */}
            <circle cx="100" cy="80" r="2" fill="white" />
            <circle cx="100" cy="120" r="2" fill="#1e1b4b" />
          </svg>
          
          {/* 中心周公形象 */}
          <div className="absolute flex flex-col items-center justify-center float z-10">
            <div className="text-6xl filter drop-shadow-lg">🧙‍♂️</div>
          </div>
          
          {/* 光晕效果 */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="absolute w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl pulse-ring"></div>
          </div>
          
          {/* 外层脉冲光环 */}
          <div className="absolute w-72 h-72 rounded-full border border-purple-400/20 pulse-ring" />
          <div className="absolute w-80 h-80 rounded-full border border-purple-500/10 pulse-ring" style={{ animationDelay: '1s' }} />
        </div>
        
        {/* 标题区域 */}
        <div className="text-center mt-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 bg-clip-text text-transparent">
            周公解梦
          </h2>
          <p className="text-purple-300/80 text-sm mt-1">探索梦境奥秘 · 预知吉凶祸福</p>
        </div>

        {/* 梦境输入区域 */}
        <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 rounded-2xl p-5 border border-purple-500/40 glow backdrop-blur-sm">
          <h3 className="text-yellow-400 font-bold mb-3 flex items-center gap-2">
            <span className="text-xl">💭</span>
            <span>描述你的梦境</span>
          </h3>
          <div className="relative">
            <textarea
              value={dreamInput}
              onChange={(e) => setDreamInput(e.target.value)}
              placeholder="请详细描述你的梦境内容，例如：我梦见自己在水中游泳..."
              className="w-full h-36 bg-slate-900/60 border border-purple-500/40 rounded-xl p-4 text-white placeholder-purple-400/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30 resize-none transition-all"
            />
            {/* 字数统计 */}
            <div className="absolute bottom-3 right-3 text-xs text-purple-400/60">
              {dreamInput.length}/500
            </div>
          </div>
          
          {/* 分析按钮 */}
          <button
            onClick={analyzeDream}
            disabled={!dreamInput.trim() || isAnalyzing}
            className={`w-full mt-4 py-4 rounded-xl font-bold transition-all relative overflow-hidden ${
              dreamInput.trim() && !isAnalyzing
                ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-700 hover:via-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-purple-500/30'
                : 'bg-purple-800/50 text-purple-400 cursor-not-allowed'
            }`}
          >
            {isAnalyzing ? (
              <div className="flex flex-col items-center gap-2">
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  周公正在解梦...
                </span>
                {/* 进度条 */}
                <div className="w-full h-1 bg-purple-900/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 transition-all duration-300"
                    style={{ width: `${Math.min(analyzeProgress, 100)}%` }}
                  />
                </div>
              </div>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <span>🔮</span>
                <span>开始解梦</span>
              </span>
            )}
          </button>
        </div>

        {/* 解梦结果 */}
        {result && (
          <div className="space-y-4 animate-fadeIn">
            {/* 梦境图示与类型 */}
            <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 rounded-2xl p-6 border border-purple-500/40 text-center relative overflow-hidden">
              {/* 背景装饰 */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-1/4 w-20 h-20 bg-purple-400 rounded-full blur-2xl" />
                <div className="absolute bottom-0 right-1/4 w-16 h-16 bg-indigo-400 rounded-full blur-2xl" />
              </div>
              
              <div className="relative">
                <div className="text-8xl mb-3 filter drop-shadow-lg">{result.dreamImage}</div>
                <div className={`inline-block px-4 py-1 rounded-full text-sm font-bold mb-2 ${
                  result.dreamType === '大吉' ? 'bg-yellow-500/30 text-yellow-300 border border-yellow-500/50' :
                  result.dreamType === '吉梦' ? 'bg-green-500/30 text-green-300 border border-green-500/50' :
                  result.dreamType === '财运' ? 'bg-amber-500/30 text-amber-300 border border-amber-500/50' :
                  result.dreamType === '桃花' ? 'bg-pink-500/30 text-pink-300 border border-pink-500/50' :
                  result.dreamType === '转运' ? 'bg-purple-500/30 text-purple-300 border border-purple-500/50' :
                  result.dreamType === '警示' ? 'bg-orange-500/30 text-orange-300 border border-orange-500/50' :
                  'bg-indigo-500/30 text-indigo-300 border border-indigo-500/50'
                }`}>
                  {result.dreamType}
                </div>
                <h3 className="text-xl font-bold text-yellow-400">梦境图示</h3>
              </div>
            </div>

            {/* 谏语 */}
            <div className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 rounded-2xl p-5 border border-amber-500/40 relative overflow-hidden">
              <div className="absolute top-2 right-2 text-4xl opacity-10">📜</div>
              <h3 className="text-amber-400 font-bold mb-3 flex items-center gap-2">
                <span>📜</span>
                <span>周公谏语</span>
              </h3>
              <p className="text-amber-100 text-lg font-medium italic text-center py-3 border-t border-b border-amber-500/20">
                「{result.proverb}」
              </p>
            </div>

            {/* 梦境解析 */}
            <div className="bg-gradient-to-br from-purple-900/40 to-violet-900/40 rounded-2xl p-5 border border-purple-500/40">
              <h3 className="text-purple-300 font-bold mb-3 flex items-center gap-2">
                <span>🔮</span>
                <span>梦境解析</span>
              </h3>
              <p className="text-purple-100 leading-relaxed text-sm">{result.interpretation}</p>
            </div>

            {/* 吉祥信息 - 三列布局 */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gradient-to-br from-red-900/30 to-pink-900/30 rounded-xl p-4 border border-red-500/30 text-center">
                <div className="text-2xl mb-1">🎨</div>
                <div className="text-xs text-red-300/70 mb-1">幸运颜色</div>
                <div className="text-red-200 font-bold">{result.luckyColor}</div>
              </div>
              <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl p-4 border border-blue-500/30 text-center">
                <div className="text-2xl mb-1">🔢</div>
                <div className="text-xs text-blue-300/70 mb-1">幸运数字</div>
                <div className="text-blue-200 font-bold">{result.luckyNumber}</div>
              </div>
              <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-xl p-4 border border-green-500/30 text-center">
                <div className="text-2xl mb-1">🧭</div>
                <div className="text-xs text-green-300/70 mb-1">吉利方位</div>
                <div className="text-green-200 font-bold">{result.luckyDirection}</div>
              </div>
            </div>

            {/* 运势预测 */}
            <div className="bg-gradient-to-br from-emerald-900/30 to-teal-900/30 rounded-2xl p-5 border border-emerald-500/40">
              <h3 className="text-emerald-400 font-bold mb-3 flex items-center gap-2">
                <span>🍀</span>
                <span>运势预测</span>
              </h3>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-emerald-900/50 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-400 to-green-400 w-4/5 rounded-full" />
                </div>
                <span className="text-emerald-300 text-sm font-medium">80%</span>
              </div>
              <p className="text-emerald-100 mt-3">{result.fortune}</p>
            </div>

            {/* 周公建议 */}
            <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 rounded-2xl p-5 border border-blue-500/40">
              <h3 className="text-blue-400 font-bold mb-3 flex items-center gap-2">
                <span>💡</span>
                <span>周公建议</span>
              </h3>
              <p className="text-blue-100">{result.advice}</p>
            </div>

            {/* 操作按钮 */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setResult(null);
                  setDreamInput('');
                }}
                className="flex-1 py-3 bg-purple-800/50 hover:bg-purple-700/50 rounded-xl text-purple-200 font-medium transition-all flex items-center justify-center gap-2"
              >
                <span>🔄</span>
                <span>重新解梦</span>
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

        {/* 热门梦境分类 */}
        {!result && (
          <div className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 rounded-2xl p-5 border border-purple-500/30 backdrop-blur-sm">
            <h3 className="text-purple-300 font-bold mb-4 flex items-center gap-2">
              <span>🌟</span>
              <span>热门梦境分类</span>
            </h3>
            <div className="grid grid-cols-4 gap-3">
              {[
                { icon: '💧', label: '梦见水', desc: '情感' },
                { icon: '🐉', label: '梦见龙', desc: '权贵' },
                { icon: '🏠', label: '梦见房', desc: '安全' },
                { icon: '💰', label: '梦见钱', desc: '财运' },
                { icon: '🕊️', label: '梦见飞', desc: '自由' },
                { icon: '🌸', label: '梦见花', desc: '希望' },
                { icon: '📚', label: '梦见考', desc: '焦虑' },
                { icon: '🐍', label: '梦见蛇', desc: '智慧' },
                { icon: '💒', label: '梦见婚', desc: '姻缘' },
                { icon: '🏃', label: '梦见追', desc: '压力' },
                { icon: '🦷', label: '梦见牙', desc: '健康' },
                { icon: '👶', label: '梦见孕', desc: '新生' },
              ].map((item, i) => (
                <button
                  key={i}
                  onClick={() => setDreamInput(`我梦见${item.label.replace('梦见', '')}...`)}
                  className="flex flex-col items-center gap-1 p-3 bg-purple-800/30 hover:bg-purple-600/40 rounded-xl transition-all border border-purple-600/20 hover:border-purple-500/40 hover:scale-105 active:scale-95"
                >
                  <span className="text-2xl filter drop-shadow">{item.icon}</span>
                  <span className="text-xs text-purple-200 font-medium">{item.label}</span>
                  <span className="text-[10px] text-purple-400/70">{item.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 解梦小贴士 */}
        {!result && (
          <div className="bg-gradient-to-br from-amber-900/20 to-yellow-900/20 rounded-2xl p-4 border border-amber-500/30">
            <h3 className="text-amber-400 font-bold mb-3 flex items-center gap-2 text-sm">
              <span>💡</span>
              <span>解梦小贴士</span>
            </h3>
            <div className="space-y-2 text-xs text-amber-200/80">
              <p>• 梦境描述越详细，解析越准确</p>
              <p>• 注意梦中的情绪和感受</p>
              <p>• 记录梦境中出现的人物和场景</p>
              <p>• 醒来后尽快记录，避免遗忘</p>
            </div>
          </div>
        )}

        {/* 周公解梦说明 */}
        <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 rounded-2xl p-5 border border-purple-500/30 relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 text-8xl opacity-5">☯️</div>
          <h3 className="text-yellow-400 font-bold mb-3 flex items-center gap-2">
            <span>📖</span>
            <span>关于周公解梦</span>
          </h3>
          <p className="text-purple-200/80 text-sm leading-relaxed">
            周公解梦是中国古代流传下来的解梦方法，相传为周公旦所创。通过分析梦境中的意象和符号，
            预测现实生活中的吉凶祸福。梦境是潜意识的表达，周公解梦帮助我们理解内心深处的声音。
          </p>
          <div className="mt-4 flex items-center gap-4 text-xs text-purple-400/70">
            <span className="flex items-center gap-1">
              <span>📅</span>
              <span>传承三千年</span>
            </span>
            <span className="flex items-center gap-1">
              <span>📚</span>
              <span>收录万种梦境</span>
            </span>
          </div>
        </div>

        {/* 底部安全间距 */}
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
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideUp {
          animation: slideUp 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
