import { useState } from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Card } from './ui/card';

interface SpreadDetailPageProps {
  spreadId: string;
}

interface SpreadInfo {
  id: string;
  name: string;
  icon: string;
  description: string;
  detailedDescription: string;
  cardLayout: Array<{
    position: string;
    meaning: string;
  }>;
  tags: string[];
}

const spreadsData: Record<string, SpreadInfo> = {
  'time-flow': {
    id: 'time-flow',
    name: '时间流',
    icon: '⏳',
    description: '了解过去、现在和未来的发展趋势',
    detailedDescription: '时间流牌阵是一种简单而强大的三张牌阵，帮助你理解事件的时间线发展。通过观察过去的影响、当前的状态和未来的可能性，你可以获得对情况的全面理解。',
    cardLayout: [
      { position: '过去', meaning: '影响当前情况的过去事件和经历' },
      { position: '现在', meaning: '当前的状态、挑战和机遇' },
      { position: '未来', meaning: '基于当前路径的可能发展方向' }
    ],
    tags: ['事业发展', '情感分析']
  },
  'tower-bridge': {
    id: 'tower-bridge',
    name: '塔罗之桥',
    icon: '🌉',
    description: '分析当前情况、障碍和最终结果',
    detailedDescription: '塔罗之桥牌阵帮助你识别从当前状态到期望结果之间的桥梁。它揭示了你面临的障碍以及如何克服它们，为你的决策提供清晰的指引。',
    cardLayout: [
      { position: '情况', meaning: '当前的处境和环境' },
      { position: '阻碍', meaning: '需要克服的障碍和挑战' },
      { position: '结果', meaning: '克服障碍后的可能结果' }
    ],
    tags: ['事业发展', '正缘指引']
  },
  'choice': {
    id: 'choice',
    name: '二择一',
    icon: '⚖️',
    description: '在两个选择之间做出明智决定',
    detailedDescription: '当你面临两个重要选择时，二择一牌阵可以帮助你权衡利弊。它为每个选项提供洞察，并揭示决定的关键因素，帮助你做出最符合自己利益的选择。',
    cardLayout: [
      { position: '选择A', meaning: '第一个选项的结果和影响' },
      { position: '决定因素', meaning: '做出选择时应考虑的关键要素' },
      { position: '选择B', meaning: '第二个选项的结果和影响' }
    ],
    tags: ['事业发展', '选择决策']
  },
  'celtic-cross': {
    id: 'celtic-cross',
    name: '荷鲁斯之眼',
    icon: '👁️',
    description: '深入分析复杂情况的全貌',
    detailedDescription: '荷鲁斯之眼牌阵是一个深度分析工具，适合处理复杂的情感和关系问题。它提供全面的视角，帮助你理解情况的各个方面。',
    cardLayout: [
      { position: '情况', meaning: '当前关系或情感状态的核心' },
      { position: '建议', meaning: '改善情况的指导和建议' },
      { position: '结果', meaning: '遵循建议后的可能发展' }
    ],
    tags: ['感情修复', '姻缘关系']
  }
};

export default function SpreadDetailPage({ spreadId }: SpreadDetailPageProps) {
  const [isStarting, setIsStarting] = useState(false);
  const spread = spreadsData[spreadId];

  const handleBack = () => {
    window.location.hash = '#tarot-spreads';
  };

  const handleStartReading = () => {
    setIsStarting(true);
    setTimeout(() => {
      window.location.hash = `#reading/${spreadId}`;
    }, 500);
  };

  if (!spread) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-950 to-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-purple-300 text-lg mb-4">牌阵不存在</p>
          <button
            onClick={handleBack}
            className="px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
          >
            返回列表
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-950 to-black pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-b from-indigo-950 to-purple-950/95 backdrop-blur-sm border-b border-purple-500/20">
        <div className="flex items-center justify-between p-6">
          <button
            onClick={handleBack}
            className="text-purple-200 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-white text-xl font-bold">{spread.name}</h1>
          <div className="w-6"></div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-6 space-y-6">
        {/* Spread Icon and Description */}
        <Card className="bg-gradient-to-br from-purple-900/40 to-purple-950/40 border-purple-500/40 p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="text-6xl">{spread.icon}</div>
            <div className="flex-1">
              <h2 className="text-white text-2xl font-bold mb-2">{spread.name}</h2>
              <p className="text-purple-200/90 text-sm leading-relaxed mb-3">
                {spread.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {spread.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-purple-600/50 text-purple-50 text-xs rounded-full border border-purple-400/40"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <p className="text-purple-200/80 text-sm leading-relaxed">
            {spread.detailedDescription}
          </p>
        </Card>

        {/* Card Positions */}
        <div>
          <h3 className="text-white text-lg font-bold mb-4 px-2">牌位说明</h3>
          <div className="space-y-3">
            {spread.cardLayout.map((card, idx) => (
              <Card
                key={idx}
                className="bg-gradient-to-br from-purple-900/30 to-purple-950/30 border-purple-500/30 p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-600/60 to-purple-700/60 rounded-xl flex items-center justify-center border border-purple-400/40">
                    <span className="text-white font-bold text-lg">{idx + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold mb-1">{card.position}</h4>
                    <p className="text-purple-200/80 text-sm">{card.meaning}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <div className="pt-4">
          <button
            onClick={handleStartReading}
            disabled={isStarting}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white rounded-2xl text-lg font-bold transition-all shadow-lg hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            {isStarting ? '准备中...' : '开始占卜'}
          </button>
        </div>

        {/* Tips */}
        <Card className="bg-purple-900/20 border-purple-500/20 p-4">
          <h4 className="text-purple-200 text-sm font-semibold mb-2">💡 占卜提示</h4>
          <ul className="text-purple-200/70 text-xs space-y-1">
            <li>• 在安静的环境中进行占卜</li>
            <li>• 专注于你想要了解的问题</li>
            <li>• 保持开放和接纳的心态</li>
            <li>• 相信你的直觉和第一感觉</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
