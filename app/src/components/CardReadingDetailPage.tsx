import { ArrowLeft, Sparkles } from 'lucide-react';
import { Card } from './ui/card';

export default function CardReadingDetailPage() {
  // 模拟抽到的卡牌数据
  const drawnCard = {
    name: '命运之轮',
    number: 'X',
    type: '大阿尔克那',
    emoji: '🔮',
    meaning: '命运的转折点已经到来，生活即将迎来重大的变化。这是一个充满机遇的时刻，宇宙的能量正在为你开启新的篇章。',
    keywords: ['转变', '机遇', '命运', '循环'],
    advice: '顺应变化，把握机遇。命运之轮的转动意味着新的开始，保持开放的心态，勇敢地迎接即将到来的改变。',
    love: '感情方面将会有新的转机，单身者可能遇到命中注定的人，有伴侣者关系将进入新的阶段。',
    career: '事业上会有意想不到的机会出现，可能是升职、转岗或新的合作机会。',
    wealth: '财运开始好转，之前的投资可能会有回报，但要注意把握时机。',
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
          <h1 className="text-xl text-purple-100 font-bold">卡牌解读</h1>
          <div className="w-10"></div>
        </div>
      </div>

      <div className="px-6 pt-6 space-y-6">
        {/* 抽到的卡牌 */}
        <Card className="bg-gradient-to-br from-purple-900/40 to-black/40 border-purple-500/40 backdrop-blur-sm overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 blur-2xl"></div>
          
          <div className="relative p-6">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="text-8xl mb-4 animate-pulse">{drawnCard.emoji}</div>
              <div className="text-purple-300/70 text-sm mb-2">{drawnCard.type} · {drawnCard.number}</div>
              <h2 className="text-3xl text-purple-100 font-bold mb-4">{drawnCard.name}</h2>
              
              {/* 关键词 */}
              <div className="flex flex-wrap gap-2 justify-center">
                {drawnCard.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-500/20 border border-purple-400/30 rounded-full text-purple-200 text-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* 卡牌含义 */}
        <Card className="bg-gradient-to-br from-purple-900/40 to-black/40 border-purple-500/40 backdrop-blur-sm">
          <div className="p-6">
            <h3 className="text-purple-100 text-lg font-bold mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span>卡牌含义</span>
            </h3>
            <p className="text-purple-200/80 text-sm leading-relaxed">
              {drawnCard.meaning}
            </p>
          </div>
        </Card>

        {/* 建议 */}
        <Card className="bg-gradient-to-br from-purple-900/40 to-black/40 border-purple-500/40 backdrop-blur-sm">
          <div className="p-6">
            <h3 className="text-purple-100 text-lg font-bold mb-3 flex items-center gap-2">
              <span className="text-2xl">💡</span>
              <span>建议</span>
            </h3>
            <p className="text-purple-200/80 text-sm leading-relaxed">
              {drawnCard.advice}
            </p>
          </div>
        </Card>

        {/* 详细解读 */}
        <div className="space-y-4">
          {/* 爱情 */}
          <Card className="bg-gradient-to-br from-pink-900/30 to-black/30 border-pink-500/30 backdrop-blur-sm">
            <div className="p-5">
              <h4 className="text-pink-200 font-bold mb-2 flex items-center gap-2">
                <span className="text-xl">💕</span>
                <span>爱情运势</span>
              </h4>
              <p className="text-pink-200/80 text-sm leading-relaxed">
                {drawnCard.love}
              </p>
            </div>
          </Card>

          {/* 事业 */}
          <Card className="bg-gradient-to-br from-blue-900/30 to-black/30 border-blue-500/30 backdrop-blur-sm">
            <div className="p-5">
              <h4 className="text-blue-200 font-bold mb-2 flex items-center gap-2">
                <span className="text-xl">💼</span>
                <span>事业运势</span>
              </h4>
              <p className="text-blue-200/80 text-sm leading-relaxed">
                {drawnCard.career}
              </p>
            </div>
          </Card>

          {/* 财富 */}
          <Card className="bg-gradient-to-br from-yellow-900/30 to-black/30 border-yellow-500/30 backdrop-blur-sm">
            <div className="p-5">
              <h4 className="text-yellow-200 font-bold mb-2 flex items-center gap-2">
                <span className="text-xl">💰</span>
                <span>财富运势</span>
              </h4>
              <p className="text-yellow-200/80 text-sm leading-relaxed">
                {drawnCard.wealth}
              </p>
            </div>
          </Card>
        </div>

        {/* 再次抽卡按钮 */}
        <button
          onClick={() => window.location.hash = '#card-draw-animation'}
          className="w-full py-4 px-6 rounded-xl font-bold text-white text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg flex items-center justify-center gap-3"
        >
          <Sparkles className="w-6 h-6" />
          <span>再次抽卡</span>
        </button>

        {/* 提示 */}
        <Card className="bg-gradient-to-br from-purple-900/20 to-black/20 border-purple-500/20 backdrop-blur-sm">
          <div className="p-5 text-center">
            <p className="text-purple-200/70 text-sm leading-relaxed">
              塔罗牌的指引仅供参考，真正的命运掌握在自己手中。
              <br />
              保持积极心态，勇敢面对生活的每一个挑战！
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
