import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Card } from './ui/card';

type SpreadCategory = 'basic' | 'advanced';

interface TarotSpread {
  id: string;
  name: string;
  category: SpreadCategory;
  tags: string[];
  cardLayout: string[];
  description: string;
  icon: string;
}

const tarotSpreads: TarotSpread[] = [
  {
    id: 'time-flow',
    name: '时间流',
    category: 'basic',
    tags: ['事业发展', '情感分析'],
    cardLayout: ['过去', '现在', '未来'],
    description: '了解过去、现在和未来的发展趋势',
    icon: '⏳'
  },
  {
    id: 'tower-bridge',
    name: '塔罗之桥',
    category: 'basic',
    tags: ['事业发展', '正缘指引'],
    cardLayout: ['情况', '阻碍', '结果'],
    description: '分析当前情况、障碍和最终结果',
    icon: '🌉'
  },
  {
    id: 'choice',
    name: '二择一',
    category: 'basic',
    tags: ['事业发展', '选择决策'],
    cardLayout: ['选择A', '决定因素', '选择B'],
    description: '在两个选择之间做出明智决定',
    icon: '⚖️'
  },
  {
    id: 'celtic-cross',
    name: '荷鲁斯之眼',
    category: 'advanced',
    tags: ['感情修复', '姻缘关系'],
    cardLayout: ['情况', '建议', '结果'],
    description: '深入分析复杂情况的全貌',
    icon: '👁️'
  }
];

function TarotSpreadsPage() {
  const [activeCategory, setActiveCategory] = useState<SpreadCategory>('basic');

  const filteredSpreads = tarotSpreads.filter(spread => spread.category === activeCategory);

  const handleBack = () => {
    window.location.hash = '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-950 to-black pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-b from-indigo-950 to-purple-950/95 backdrop-blur-sm border-b border-purple-500/20">
        <div className="flex items-center justify-between p-6 pb-4">
          <button
            onClick={handleBack}
            className="text-purple-200 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-white text-xl font-bold">牌阵列表</h1>
          <div className="w-6"></div>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-3 px-6 pb-4">
          <button
            onClick={() => setActiveCategory('basic')}
            className={`flex-1 max-w-[160px] py-3 px-6 rounded-full text-sm font-semibold transition-all ${
              activeCategory === 'basic'
                ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/30'
                : 'bg-purple-900/30 text-purple-300 hover:bg-purple-900/50'
            }`}
          >
            基础牌阵
          </button>
          <button
            onClick={() => setActiveCategory('advanced')}
            className={`flex-1 max-w-[160px] py-3 px-6 rounded-full text-sm font-semibold transition-all ${
              activeCategory === 'advanced'
                ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/30'
                : 'bg-purple-900/30 text-purple-300 hover:bg-purple-900/50'
            }`}
          >
            高级牌阵
          </button>
        </div>
      </div>

      {/* Spreads List */}
      <div className="px-4 pt-6 space-y-4">
        {filteredSpreads.map((spread) => (
          <Card
            key={spread.id}
            className="bg-gradient-to-br from-purple-900/40 to-purple-950/40 border-purple-500/40 overflow-hidden hover:border-purple-400/60 hover:shadow-lg hover:shadow-purple-500/20 transition-all cursor-pointer"
          >
            <div className="flex gap-4 p-5">
              {/* Card Icon Visualization */}
              <div className="flex-shrink-0 w-28 h-28 bg-gradient-to-br from-purple-900/60 via-purple-800/50 to-purple-950/60 rounded-2xl border-2 border-purple-500/40 p-3 flex flex-col items-center justify-center relative shadow-lg overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-full h-full" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
                    backgroundSize: '16px 16px'
                  }}></div>
                </div>
                
                {/* Decorative corners */}
                <div className="absolute top-2 left-2 text-purple-400/60 text-xs">✦</div>
                <div className="absolute top-2 right-2 text-purple-400/60 text-xs">✦</div>
                <div className="absolute bottom-2 left-2 text-purple-400/60 text-xs">✦</div>
                <div className="absolute bottom-2 right-2 text-purple-400/60 text-xs">✦</div>
                
                {/* Main Icon */}
                <div className="relative z-10 text-5xl mb-1 drop-shadow-lg">
                  {spread.icon}
                </div>
                
                {/* Card count indicator */}
                <div className="relative z-10 text-purple-200/80 text-[10px] font-medium">
                  {spread.cardLayout.length}张牌
                </div>
              </div>

              {/* Spread Info */}
              <div className="flex-1 flex flex-col justify-between min-h-[112px]">
                <div>
                  <h3 className="text-white text-lg font-bold mb-2">{spread.name}</h3>
                  <p className="text-purple-200/90 text-sm mb-3 leading-relaxed">{spread.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {spread.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-purple-600/50 text-purple-50 text-xs rounded-full border border-purple-400/40 shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button 
                  onClick={() => window.location.hash = `#spread-detail/${spread.id}`}
                  className="self-start mt-3 px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white rounded-full text-sm font-semibold transition-all shadow-lg hover:shadow-purple-500/50 hover:scale-105 active:scale-95 whitespace-nowrap"
                >
                  立即测试
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Bottom Quote */}
      <div className="mt-12 px-6 text-center">
        <p className="text-purple-300/60 text-sm leading-relaxed italic">
          我们的星辰在破解重重迷雾
          <br />
          新的指引即将到来
        </p>
      </div>
    </div>
  );
}

export default TarotSpreadsPage;
