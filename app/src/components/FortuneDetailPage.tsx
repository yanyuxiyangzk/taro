import { ArrowLeft, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card } from './ui/card';

const fortuneDetails = [
  {
    category: '综合运势',
    score: 85,
    trend: 'up',
    icon: '⭐',
    color: 'from-purple-500 to-purple-600',
    description: '今日整体运势良好，适合把握机会，积极行动。保持乐观的心态，会有意想不到的收获。',
    advice: '保持积极心态，主动出击',
    luckyTime: '10:00 - 14:00',
    luckyColor: '紫色',
    luckyNumber: '7'
  },
  {
    category: '爱情运势',
    score: 81,
    trend: 'up',
    icon: '💕',
    color: 'from-pink-500 to-rose-500',
    description: '感情运势上升，单身者有机会遇到心仪对象。有伴侣者感情升温，适合表达爱意。',
    advice: '勇敢表达内心感受',
    luckyTime: '18:00 - 22:00',
    luckyColor: '粉色',
    luckyNumber: '2'
  },
  {
    category: '事业运势',
    score: 83,
    trend: 'up',
    icon: '💼',
    color: 'from-blue-500 to-cyan-500',
    description: '工作上会有新的机遇出现，适合展示才华。与同事合作顺利，容易获得上司认可。',
    advice: '把握机会，展现实力',
    luckyTime: '09:00 - 12:00',
    luckyColor: '蓝色',
    luckyNumber: '5'
  },
  {
    category: '财富运势',
    score: 80,
    trend: 'stable',
    icon: '💰',
    color: 'from-yellow-500 to-amber-500',
    description: '财运平稳，收入稳定。适合理性投资，避免冲动消费。可以考虑长期理财计划。',
    advice: '理性消费，稳健投资',
    luckyTime: '14:00 - 17:00',
    luckyColor: '金色',
    luckyNumber: '8'
  },
  {
    category: '健康运势',
    score: 86,
    trend: 'up',
    icon: '🍀',
    color: 'from-green-500 to-emerald-500',
    description: '身体状态良好，精力充沛。适合进行运动锻炼，保持规律作息会让你更有活力。',
    advice: '保持运动，规律作息',
    luckyTime: '06:00 - 08:00',
    luckyColor: '绿色',
    luckyNumber: '3'
  },
  {
    category: '学业运势',
    score: 78,
    trend: 'stable',
    icon: '📚',
    color: 'from-indigo-500 to-purple-500',
    description: '学习状态稳定，适合复习巩固。保持专注，避免分心，会有不错的学习效果。',
    advice: '专注学习，稳扎稳打',
    luckyTime: '15:00 - 18:00',
    luckyColor: '靛蓝',
    luckyNumber: '4'
  }
];

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case 'up':
      return <TrendingUp className="w-4 h-4 text-green-400" />;
    case 'down':
      return <TrendingDown className="w-4 h-4 text-red-400" />;
    default:
      return <Minus className="w-4 h-4 text-yellow-400" />;
  }
};

const getTrendText = (trend: string) => {
  switch (trend) {
    case 'up':
      return <span className="text-green-400">上升</span>;
    case 'down':
      return <span className="text-red-400">下降</span>;
    default:
      return <span className="text-yellow-400">平稳</span>;
  }
};

export default function FortuneDetailPage() {
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
          <h1 className="text-xl text-purple-100 font-bold">今日运势详情</h1>
          <div className="w-10"></div>
        </div>
      </div>

      {/* Date and Overall Score */}
      <div className="px-6 pt-6 pb-4">
        <Card className="bg-gradient-to-br from-purple-900/40 to-black/40 border-purple-500/40 backdrop-blur-sm overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 blur-2xl"></div>
          
          <div className="relative p-6 text-center">
            <div className="text-purple-300/70 text-sm mb-2">
              {new Date().toLocaleDateString('zh-CN', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                weekday: 'long'
              })}
            </div>
            
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="text-6xl">⭐</div>
              <div>
                <div className="text-5xl text-purple-100 font-bold mb-1">85</div>
                <div className="text-purple-300/70 text-sm">综合评分</div>
              </div>
            </div>
            
            <p className="text-purple-200/80 text-sm leading-relaxed">
              今天是充满机遇的一天，保持积极乐观的心态，
              <br />
              你会发现生活中处处都有惊喜在等待着你。
            </p>
          </div>
        </Card>
      </div>

      {/* Fortune Details */}
      <div className="px-6 space-y-4">
        {fortuneDetails.map((fortune, index) => (
          <Card
            key={index}
            className="bg-gradient-to-br from-purple-900/30 to-black/30 border-purple-500/30 backdrop-blur-sm overflow-hidden relative hover:border-purple-400/50 transition-all"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent blur-2xl"></div>
            
            <div className="relative p-5">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{fortune.icon}</div>
                  <div>
                    <h3 className="text-purple-100 font-bold">{fortune.category}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      {getTrendIcon(fortune.trend)}
                      <span className="text-sm">{getTrendText(fortune.trend)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-3xl text-purple-100 font-bold">{fortune.score}</div>
                  <div className="text-purple-300/70 text-xs">分</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="h-2 bg-purple-950/50 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${fortune.color} rounded-full transition-all duration-1000 relative overflow-hidden`}
                    style={{ width: `${fortune.score}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-4 p-4 bg-black/30 rounded-lg border border-purple-500/20">
                <p className="text-purple-200/80 text-sm leading-relaxed">
                  {fortune.description}
                </p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-purple-900/20 rounded-lg p-3 border border-purple-500/20">
                  <div className="text-purple-300/70 text-xs mb-1">开运建议</div>
                  <div className="text-purple-100 text-sm">{fortune.advice}</div>
                </div>
                
                <div className="bg-purple-900/20 rounded-lg p-3 border border-purple-500/20">
                  <div className="text-purple-300/70 text-xs mb-1">幸运时间</div>
                  <div className="text-purple-100 text-sm">{fortune.luckyTime}</div>
                </div>
                
                <div className="bg-purple-900/20 rounded-lg p-3 border border-purple-500/20">
                  <div className="text-purple-300/70 text-xs mb-1">幸运颜色</div>
                  <div className="text-purple-100 text-sm">{fortune.luckyColor}</div>
                </div>
                
                <div className="bg-purple-900/20 rounded-lg p-3 border border-purple-500/20">
                  <div className="text-purple-300/70 text-xs mb-1">幸运数字</div>
                  <div className="text-purple-100 text-sm">{fortune.luckyNumber}</div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Bottom Tips */}
      <div className="px-6 mt-6 mb-8">
        <Card className="bg-gradient-to-br from-purple-900/20 to-black/20 border-purple-500/20 backdrop-blur-sm">
          <div className="p-5 text-center">
            <div className="text-2xl mb-3">✨</div>
            <p className="text-purple-200/70 text-sm leading-relaxed">
              运势仅供参考，真正的幸运掌握在自己手中。
              <br />
              保持积极心态，努力奋斗，创造属于自己的精彩人生！
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
