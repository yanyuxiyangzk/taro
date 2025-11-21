import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import ZodiacSelectionModal from './ZodiacSelectionModal';

const bannerImages = [
  'https://images.unsplash.com/photo-1671013033034-5ea58e9c5008?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXJvdCUyMGNhcmRzJTIwbXlzdGljYWx8ZW58MXx8fHwxNzYyNzczMzIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1682566737262-4ee52c933e5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6b2RpYWMlMjBhc3Ryb2xvZ3klMjBteXN0aWNhbHxlbnwxfHx8fDE3NjI3ODU1MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1753797782254-4ef6719c7bcd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3J0dW5lJTIwdGVsbGluZyUyMG1hZ2ljfGVufDF8fHx8MTc2Mjc4NTUyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
];

const fortuneStats = [
  { label: '健康', value: 86, color: 'from-green-500 to-emerald-500' },
  { label: '爱情', value: 81, color: 'from-pink-500 to-rose-500' },
  { label: '事业', value: 83, color: 'from-blue-500 to-cyan-500' },
  { label: '财富', value: 80, color: 'from-yellow-500 to-amber-500' },
];

const divinationCards = [
  { 
    title: '卡牌问答', 
    desc: '100w+ 回答', 
    icon: '🎴', 
    bg: 'https://images.unsplash.com/photo-1671013033034-5ea58e9c5008?w=400' 
  },
  { 
    title: '星图单图', 
    desc: '专业达人解答', 
    icon: '⭐', 
    bg: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400' // 星空图片
  },
  { 
    title: '骰子问答', 
    desc: '趣味占卜', 
    icon: '🎲', 
    bg: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400' // 骰子图片
  },
  { 
    title: '星图合图', 
    desc: '深度解析', 
    icon: '🌟', 
    bg: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400' // 星座星图
  },
  { 
    title: '梦境详解', 
    desc: '专业达人解答', 
    icon: '💭', 
    bg: 'https://images.unsplash.com/photo-1559466851-47d3cc0872ba?w=400' 
  },
  { 
    title: '手相问答', 
    desc: '专业达人解答', 
    icon: '✋', 
    bg: 'https://images.unsplash.com/photo-1607824972522-2821fba071f5?w=400' 
  },
  { 
    title: '神秘之书', 
    desc: '命运的启示', 
    icon: '📖', 
    bg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
    link: '#mystic-book'
  },
  { 
    title: '巫师预言', 
    desc: '神秘的预知', 
    icon: '🔮', 
    bg: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=400', // 水晶球图片
    link: '#wizard-prophecy'
  },
];



export default function DivinationPage() {
  const [selectedZodiac, setSelectedZodiac] = useState('摩羯座');
  const [showZodiacSelect, setShowZodiacSelect] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [overallScore] = useState(85);

  // Auto-rotate banner
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannerImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Zodiac Selection Modal */}
      <ZodiacSelectionModal
        isOpen={showZodiacSelect}
        onClose={() => setShowZodiacSelect(false)}
        selectedZodiac={selectedZodiac}
        onSelect={setSelectedZodiac}
      />

      <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black pb-24">
        {/* Header with Zodiac Selector */}
        <div className="p-6 pb-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-purple-200">妙瞳</h2>
            <button
              onClick={() => setShowZodiacSelect(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-200 hover:bg-purple-900/60 transition-all backdrop-blur-sm"
            >
              <span>{selectedZodiac}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

      {/* Banner Carousel */}
      <div className="px-6 mb-6">
        <div className="relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-red-500/20 blur-3xl z-0"></div>
          <Card className="relative bg-black/50 border-purple-500/30 overflow-hidden">
            <div className="relative h-44">
              {bannerImages.map((img, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    currentBanner === index ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <ImageWithFallback
                    src={img}
                    alt={`Banner ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-center">
                    <div className="text-purple-100 mb-1">解锁命运密码</div>
                    <div className="inline-block px-4 py-1 bg-yellow-600/80 rounded-full text-white text-sm">
                      立即查看运势
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Indicator Dots */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {bannerImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentBanner(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentBanner === index
                        ? 'bg-purple-400 w-6'
                        : 'bg-purple-400/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Today's Fortune */}
      <div className="px-6 mb-6">
        <Card className="bg-gradient-to-br from-purple-900/40 to-black/40 border-purple-500/40 backdrop-blur-sm overflow-hidden relative">
          <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 blur-3xl rounded-full"></div>
          
          <div className="relative p-5">
            <h3 className="text-purple-200 mb-4">今日运势</h3>
            
            <div className="flex items-center gap-6">
              {/* Overall Score Circle */}
              <div className="relative flex-shrink-0">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-900/50 to-purple-950/50 border-4 border-purple-500/30 flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent"></div>
                  <div className="relative">
                    <div className="text-3xl text-purple-100">{overallScore}</div>
                    <div className="text-xs text-purple-300/70">综合评分</div>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-full border-2 border-purple-400/20 animate-ping" style={{ animationDuration: '3s' }}></div>
              </div>

              {/* Stats Bars */}
              <div className="flex-1 space-y-3">
                {fortuneStats.map((stat, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-purple-200 text-sm w-12">{stat.label}</span>
                    <div className="flex-1 h-2 bg-purple-950/50 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${stat.color} rounded-full transition-all duration-1000 relative overflow-hidden`}
                        style={{ width: `${stat.value}%` }}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                      </div>
                    </div>
                    <span className="text-purple-100 text-sm w-8">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Fortune Description */}
            <div className="mt-4 pt-4 border-t border-purple-500/20">
              <p className="text-purple-200/80 text-sm leading-relaxed">
                今日的感情运势显示，你与伴侣之间的情感将愈发醇厚深沉。共同参与一场刺激的...
                <span className="text-purple-400">更多 {'>>>'}</span>
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Divination Cards Grid */}
      <div className="px-6">
        <div className="grid grid-cols-2 gap-3">
          {divinationCards.map((card, index) => (
            <Card
              key={index}
              onClick={() => {
                if (card.link) {
                  window.location.hash = card.link;
                }
              }}
              className={`relative overflow-hidden border-purple-500/30 backdrop-blur-sm hover:border-purple-400/50 transition-all cursor-pointer group ${
                index === 0 || index === 4 || index === 5 ? 'h-40' : 'h-32'
              }`}
            >
              {card.bg ? (
                <>
                  <ImageWithFallback
                    src={card.bg}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                </>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-black/60"></div>
              )}
              
              <div className="relative p-4 h-full flex flex-col justify-end">
                <div className="text-3xl mb-2">{card.icon}</div>
                <h4 className="text-purple-100 mb-1">{card.title}</h4>
                <p className="text-purple-300/70 text-xs">{card.desc}</p>
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/10 transition-all"></div>
            </Card>
          ))}
        </div>
      </div>

      {/* Tarot Spreads Section */}
      <div className="px-6 mt-6">
        {/* Introduction Text */}
        <Card className="bg-gradient-to-br from-purple-900/40 to-black/40 border-purple-500/40 backdrop-blur-sm mb-4">
          <div className="p-5 text-center">
            <p className="text-purple-200/90 text-sm leading-relaxed">
              这是传统的高阶牌阵，是每位高阶达人必备的牌阵技巧。
              <br />
              开启此套牌阵能够帮助你解决绝大多数问题。
            </p>
          </div>
        </Card>

        {/* Fire Effect Button - ONLY FLAMES, HUGE & BURNING */}
        <div className="flex justify-center mb-8">
          <button className="relative group w-40 h-40 rounded-full transition-all overflow-visible">
            {/* Outer glow - massive burning effect */}
            <div className="absolute -inset-12 bg-gradient-to-t from-red-600 via-orange-500 to-yellow-400 opacity-50 group-hover:opacity-80 blur-3xl transition-opacity animate-pulse" style={{animationDuration: '1.5s'}}></div>
            
            {/* Middle glow layer */}
            <div className="absolute -inset-8 bg-gradient-to-t from-orange-600 via-yellow-500 to-yellow-300 opacity-60 group-hover:opacity-90 blur-2xl transition-opacity animate-pulse" style={{animationDuration: '2s', animationDelay: '0.3s'}}></div>
            
            {/* Inner core */}
            <div className="absolute inset-0 bg-gradient-to-t from-red-700 via-orange-600 to-yellow-500 rounded-full shadow-2xl animate-pulse" style={{animationDuration: '1.8s'}}></div>
            
            {/* Animated fire particles - HUGE */}
            <div className="absolute inset-0 overflow-visible">
              {/* Bottom layer - large flames */}
              <div className="absolute bottom-2 left-1/4 w-8 h-8 bg-yellow-400 rounded-full animate-ping opacity-80" style={{animationDuration: '1.3s'}}></div>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-orange-400 rounded-full animate-ping opacity-80" style={{animationDuration: '1.5s', animationDelay: '0.2s'}}></div>
              <div className="absolute bottom-2 right-1/4 w-8 h-8 bg-red-400 rounded-full animate-ping opacity-80" style={{animationDuration: '1.4s', animationDelay: '0.4s'}}></div>
              
              {/* Middle layer - medium flames */}
              <div className="absolute bottom-8 left-1/3 w-6 h-6 bg-yellow-300 rounded-full animate-ping opacity-70" style={{animationDuration: '1.6s', animationDelay: '0.1s'}}></div>
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-6 h-6 bg-orange-300 rounded-full animate-ping opacity-70" style={{animationDuration: '1.7s', animationDelay: '0.3s'}}></div>
              <div className="absolute bottom-8 right-1/3 w-6 h-6 bg-red-300 rounded-full animate-ping opacity-70" style={{animationDuration: '1.5s', animationDelay: '0.5s'}}></div>
              
              {/* Top layer - small flames */}
              <div className="absolute bottom-14 left-1/4 w-4 h-4 bg-yellow-200 rounded-full animate-ping opacity-60" style={{animationDuration: '1.8s', animationDelay: '0.2s'}}></div>
              <div className="absolute bottom-14 left-1/2 -translate-x-1/2 w-4 h-4 bg-orange-200 rounded-full animate-ping opacity-60" style={{animationDuration: '1.9s', animationDelay: '0.4s'}}></div>
              <div className="absolute bottom-14 right-1/4 w-4 h-4 bg-red-200 rounded-full animate-ping opacity-60" style={{animationDuration: '1.7s', animationDelay: '0.6s'}}></div>
              
              {/* Spark effects */}
              <div className="absolute top-4 left-1/3 w-2 h-2 bg-yellow-100 rounded-full animate-ping opacity-50" style={{animationDuration: '2s', animationDelay: '0.3s'}}></div>
              <div className="absolute top-4 right-1/3 w-2 h-2 bg-orange-100 rounded-full animate-ping opacity-50" style={{animationDuration: '2.1s', animationDelay: '0.5s'}}></div>
            </div>
            
            {/* Center fire emoji - MASSIVE */}
            <div className="relative z-10 flex items-center justify-center h-full">
              <span className="animate-pulse drop-shadow-2xl" style={{fontSize: '120px', animationDuration: '1.2s'}}>🔥</span>
            </div>
          </button>
        </div>

        {/* Title with "View All" link */}
        <div className="mb-6">
          <h3 className="text-purple-100 text-2xl font-bold text-center mb-2">
            塔罗牌阵
          </h3>
          <div className="flex justify-center">
            <button
              onClick={() => window.location.hash = '#tarot-spreads'}
              className="flex items-center justify-center gap-2 text-purple-300/70 text-sm hover:text-purple-200 transition-colors"
            >
              <span>全部牌阵</span>
              <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
            </button>
          </div>
        </div>

        {/* Two New Tarot Spread Cards */}
        <div className="grid grid-cols-2 gap-3">
          {/* Card 1: 时光流牌阵 */}
          <Card className="relative border-purple-500/30 backdrop-blur-sm hover:border-purple-400/50 transition-all cursor-pointer group h-[360px] overflow-hidden">
            {/* Background Image */}
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1532153955177-f59af40d6472?w=800&q=80"
              alt="时光流牌阵背景"
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/85 via-purple-800/80 to-black/85"></div>
            
            <div className="relative h-full p-5 pt-6 pb-5 rounded-xl flex flex-col z-10">
              {/* Title */}
              <h3 className="text-white text-xl font-bold mb-8 tracking-wider drop-shadow-lg text-center">时光流牌阵</h3>
              
              {/* Single Large Card - BIGGER */}
              <div className="flex justify-center mb-6">
                <div className="w-[110px] h-[165px] bg-white rounded-2xl border-3 border-yellow-400 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-100/60 to-transparent"></div>
                  
                  {/* Decorative corners */}
                  <div className="absolute top-2 left-2 text-purple-600 text-lg">✦</div>
                  <div className="absolute top-2 right-2 text-purple-600 text-lg">✦</div>
                  <div className="absolute bottom-2 left-2 text-purple-600 text-lg">✦</div>
                  <div className="absolute bottom-2 right-2 text-purple-600 text-lg">✦</div>
                  
                  {/* Center symbol - BIGGER */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="text-purple-600 text-base mb-2">✧ ✧ ✧</div>
                    <div className="text-purple-700 text-6xl">🔮</div>
                    <div className="text-purple-600 text-base mt-2">✧</div>
                  </div>
                </div>
              </div>
              
              {/* Description - Fixed height container */}
              <div className="h-[40px] flex items-center justify-center">
                <p className="text-white text-sm text-center drop-shadow font-medium px-2">
                  快速解答单一问题
                </p>
              </div>
              
              {/* Spacer to push button down */}
              <div className="flex-1"></div>
              
              {/* Test Button - Inside container at bottom */}
              <div className="pt-4 relative z-20">
                <button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 px-4 rounded-full text-sm font-bold transition-all shadow-xl">
                  立即测试
                </button>
              </div>
            </div>
            
            {/* Hover effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/0 group-hover:from-purple-500/10 group-hover:to-red-500/10 transition-all pointer-events-none rounded-xl z-0"></div>
          </Card>

          {/* Card 2: 塔罗牌阵 */}
          <Card className="relative border-purple-500/30 backdrop-blur-sm hover:border-purple-400/50 transition-all cursor-pointer group h-[360px] overflow-hidden">
            {/* Background Image */}
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1578301978018-3005759f48f7?w=800&q=80"
              alt="塔罗牌阵背景"
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/85 via-purple-800/80 to-black/85"></div>
            
            <div className="relative h-full p-5 pt-6 pb-5 rounded-xl flex flex-col z-10">
              {/* Title */}
              <h3 className="text-white text-xl font-bold mb-8 tracking-wider drop-shadow-lg text-center">塔罗牌阵</h3>
              
              {/* Three Cards Horizontal - BIGGER with extra top margin */}
              <div className="flex justify-center mb-6 mt-[60px]">
                <div className="flex items-center justify-center gap-2.5">
                  {/* Card 1 */}
                  <div className="w-[70px] h-[105px] bg-white rounded-xl border-2 border-purple-300/80 shadow-xl flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute top-2 left-2 text-purple-400/60 text-sm">✦</div>
                    <div className="absolute top-2 right-2 text-purple-400/60 text-sm">✦</div>
                    <div className="absolute bottom-2 left-2 text-purple-400/60 text-sm">✦</div>
                    <div className="absolute bottom-2 right-2 text-purple-400/60 text-sm">✦</div>
                    <div className="text-purple-600 text-4xl">🌙</div>
                  </div>
                  
                  {/* Card 2 - Highlighted */}
                  <div className="w-[70px] h-[105px] bg-white rounded-xl border-3 border-yellow-400 shadow-xl flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-100/50 to-transparent"></div>
                    <div className="absolute top-2 left-2 text-purple-500/70 text-sm">✦</div>
                    <div className="absolute top-2 right-2 text-purple-500/70 text-sm">✦</div>
                    <div className="absolute bottom-2 left-2 text-purple-500/70 text-sm">✦</div>
                    <div className="absolute bottom-2 right-2 text-purple-500/70 text-sm">✦</div>
                    <div className="relative z-10 text-purple-700 text-4xl">⭐</div>
                  </div>
                  
                  {/* Card 3 */}
                  <div className="w-[70px] h-[105px] bg-white rounded-xl border-2 border-purple-300/80 shadow-xl flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute top-2 left-2 text-purple-400/60 text-sm">✦</div>
                    <div className="absolute top-2 right-2 text-purple-400/60 text-sm">✦</div>
                    <div className="absolute bottom-2 left-2 text-purple-400/60 text-sm">✦</div>
                    <div className="absolute bottom-2 right-2 text-purple-400/60 text-sm">✦</div>
                    <div className="text-purple-600 text-4xl">✨</div>
                  </div>
                </div>
              </div>
              
              {/* Description - Fixed height container (same as Card 1) */}
              <div className="h-[40px] flex items-center justify-center">
                <p className="text-white text-sm text-center drop-shadow font-medium px-2">
                  过去·现在·未来
                </p>
              </div>
              
              {/* Spacer to push button down */}
              <div className="flex-1"></div>
              
              {/* Test Button - Inside container at bottom */}
              <div className="pt-4 relative z-20">
                <button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 px-4 rounded-full text-sm font-bold transition-all shadow-xl">
                  立即测试
                </button>
              </div>
            </div>
            
            {/* Hover effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/0 group-hover:from-purple-500/10 group-hover:to-red-500/10 transition-all pointer-events-none rounded-xl z-0"></div>
          </Card>
        </div>
      </div>


      {/* Mystical Book Section */}
      <div className="px-6 mt-6">
        <Card 
          onClick={() => window.location.hash = '#mystic-book'}
          className="bg-gradient-to-br from-purple-900/30 to-black/30 border-purple-500/30 overflow-hidden relative cursor-pointer hover:border-purple-400/50 transition-all group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-red-500/10 blur-2xl"></div>
          <div className="relative p-6 text-center">
            <div className="text-2xl mb-3">✨</div>
            <h3 className="text-purple-100 mb-2">神秘之书</h3>
            <p className="text-purple-300/70 text-sm mb-4">在彷徨不决时，找到内心的答案</p>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1559466851-47d3cc0872ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxteXN0aWNhbCUyMGJvb2slMjBncmltb2lyZXxlbnwxfHx8fDE3NjI3ODU1MjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Mystical Book"
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
          <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/10 transition-all"></div>
        </Card>
      </div>
    </div>
    </>
  );
}
