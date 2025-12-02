import { useState } from 'react';

export default function PalmReadingPage() {
  const [selectedLine, setSelectedLine] = useState<string | null>(null);

  const palmLines = [
    {
      id: 'life',
      name: '生命线',
      color: '#ef4444',
      description: '生命线从拇指与食指之间开始，向手腕方向延伸。它代表着生命力、健康状况和生活质量。',
      meaning: '生命线长而清晰表示身体健康、精力充沛；生命线短或断裂可能暗示健康需要注意。',
      position: { top: '35%', left: '25%' },
    },
    {
      id: 'head',
      name: '智慧线',
      color: '#3b82f6',
      description: '智慧线从拇指与食指之间开始，横穿手掌。它代表着思维方式、智力和学习能力。',
      meaning: '智慧线长而直表示逻辑思维强；弯曲的智慧线表示富有创造力和想象力。',
      position: { top: '45%', left: '20%' },
    },
    {
      id: 'heart',
      name: '感情线',
      color: '#ec4899',
      description: '感情线位于手掌上方，从小指下方延伸至食指或中指下方。它代表着情感、爱情和人际关系。',
      meaning: '感情线长而清晰表示感情丰富；感情线短或浅表示较为理性。',
      position: { top: '25%', left: '30%' },
    },
    {
      id: 'fate',
      name: '命运线',
      color: '#8b5cf6',
      description: '命运线从手腕向中指方向延伸。它代表着事业、命运和人生道路。',
      meaning: '命运线清晰表示人生目标明确；命运线模糊或缺失表示人生道路较为自由。',
      position: { top: '55%', left: '50%' },
    },
    {
      id: 'sun',
      name: '太阳线',
      color: '#f59e0b',
      description: '太阳线位于无名指下方，向手腕方向延伸。它代表着成功、名誉和艺术才能。',
      meaning: '太阳线清晰表示有艺术天赋和成功潜力；太阳线缺失并不代表不会成功。',
      position: { top: '40%', left: '65%' },
    },
    {
      id: 'marriage',
      name: '婚姻线',
      color: '#14b8a6',
      description: '婚姻线位于小指下方，感情线上方的短横线。它代表着婚姻和重要的感情关系。',
      meaning: '婚姻线清晰表示感情稳定；多条婚姻线可能表示多段重要感情经历。',
      position: { top: '20%', left: '75%' },
    },
  ];

  const goBack = () => {
    window.location.hash = '#divination';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-950 via-purple-900 to-black text-white">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-50 bg-purple-950/90 backdrop-blur-sm border-b border-purple-800/50">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={goBack} className="text-white p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <span>✋</span>
            <span>手相问答</span>
          </h1>
          <div className="w-10"></div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* 手相示意图 */}
        <div className="bg-purple-900/50 rounded-2xl p-6 border border-purple-700/50">
          <h2 className="text-lg font-bold text-center mb-4 text-yellow-400">✨ 手相示意图 ✨</h2>
          
          <div className="relative mx-auto" style={{ width: '280px', height: '350px' }}>
            {/* 手掌背景 */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 200 250" className="w-full h-full">
                {/* 手掌轮廓 */}
                <path
                  d="M100 240 C40 240 20 180 20 140 C20 100 30 80 40 60 L40 30 C40 15 50 10 55 10 C60 10 65 15 65 30 L65 50 L70 20 C70 5 80 0 85 0 C90 0 95 5 95 20 L95 45 L100 15 C100 0 110 -5 115 -5 C120 -5 125 0 125 15 L125 50 L130 25 C130 10 140 5 145 5 C150 5 155 10 155 25 L155 70 L160 50 C160 35 170 30 175 30 C180 30 185 35 185 50 L185 140 C185 180 160 240 100 240 Z"
                  fill="url(#palmGradient)"
                  stroke="#d4a574"
                  strokeWidth="2"
                />
                <defs>
                  <linearGradient id="palmGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f5d0b5" />
                    <stop offset="100%" stopColor="#e8b896" />
                  </linearGradient>
                </defs>
                
                {/* 生命线 */}
                <path
                  d="M55 90 Q45 130 50 180 Q55 210 70 230"
                  fill="none"
                  stroke={selectedLine === 'life' ? '#ef4444' : '#d4a574'}
                  strokeWidth={selectedLine === 'life' ? 3 : 2}
                  strokeLinecap="round"
                  className="cursor-pointer transition-all"
                  onClick={() => setSelectedLine('life')}
                />
                
                {/* 智慧线 */}
                <path
                  d="M50 100 Q80 105 120 110 Q150 115 160 120"
                  fill="none"
                  stroke={selectedLine === 'head' ? '#3b82f6' : '#d4a574'}
                  strokeWidth={selectedLine === 'head' ? 3 : 2}
                  strokeLinecap="round"
                  className="cursor-pointer transition-all"
                  onClick={() => setSelectedLine('head')}
                />
                
                {/* 感情线 */}
                <path
                  d="M55 75 Q90 65 130 70 Q160 75 175 85"
                  fill="none"
                  stroke={selectedLine === 'heart' ? '#ec4899' : '#d4a574'}
                  strokeWidth={selectedLine === 'heart' ? 3 : 2}
                  strokeLinecap="round"
                  className="cursor-pointer transition-all"
                  onClick={() => setSelectedLine('heart')}
                />
                
                {/* 命运线 */}
                <path
                  d="M100 220 Q100 170 100 130 Q100 100 95 80"
                  fill="none"
                  stroke={selectedLine === 'fate' ? '#8b5cf6' : '#d4a574'}
                  strokeWidth={selectedLine === 'fate' ? 3 : 2}
                  strokeLinecap="round"
                  className="cursor-pointer transition-all"
                  onClick={() => setSelectedLine('fate')}
                />
                
                {/* 太阳线 */}
                <path
                  d="M135 150 Q135 120 130 90"
                  fill="none"
                  stroke={selectedLine === 'sun' ? '#f59e0b' : '#d4a574'}
                  strokeWidth={selectedLine === 'sun' ? 3 : 2}
                  strokeLinecap="round"
                  className="cursor-pointer transition-all"
                  onClick={() => setSelectedLine('sun')}
                />
                
                {/* 婚姻线 */}
                <path
                  d="M175 60 Q165 58 155 60"
                  fill="none"
                  stroke={selectedLine === 'marriage' ? '#14b8a6' : '#d4a574'}
                  strokeWidth={selectedLine === 'marriage' ? 3 : 2}
                  strokeLinecap="round"
                  className="cursor-pointer transition-all"
                  onClick={() => setSelectedLine('marriage')}
                />
              </svg>
            </div>
          </div>
          
          <p className="text-center text-purple-300 text-sm mt-4">点击手掌上的线条查看详细解读</p>
        </div>

        {/* 选中的线条详情 */}
        {selectedLine && (
          <div className="bg-purple-900/50 rounded-2xl p-5 border border-purple-700/50 animate-fadeIn">
            {palmLines.filter(line => line.id === selectedLine).map(line => (
              <div key={line.id}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: line.color }}></div>
                  <h3 className="text-xl font-bold" style={{ color: line.color }}>{line.name}</h3>
                </div>
                <p className="text-purple-200 mb-4 leading-relaxed">{line.description}</p>
                <div className="bg-purple-800/50 rounded-xl p-4">
                  <h4 className="text-yellow-400 font-medium mb-2">✨ 解读含义</h4>
                  <p className="text-purple-100 leading-relaxed">{line.meaning}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 手相线条列表 */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-yellow-400 mb-3">📖 手相线条说明</h3>
          {palmLines.map(line => (
            <button
              key={line.id}
              onClick={() => setSelectedLine(line.id)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                selectedLine === line.id
                  ? 'bg-purple-700/50 border-purple-500'
                  : 'bg-purple-900/30 border-purple-800/50 hover:bg-purple-800/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: line.color }}></div>
                <span className="font-medium">{line.name}</span>
              </div>
            </button>
          ))}
        </div>

        {/* 温馨提示 */}
        <div className="bg-gradient-to-r from-purple-800/50 to-pink-800/50 rounded-2xl p-5 border border-purple-600/30">
          <h3 className="text-yellow-400 font-bold mb-3">💡 温馨提示</h3>
          <ul className="text-purple-200 text-sm space-y-2">
            <li>• 手相解读仅供参考，不能作为人生决策的唯一依据</li>
            <li>• 手相会随着时间和经历而改变</li>
            <li>• 左手代表先天命运，右手代表后天努力</li>
            <li>• 建议结合双手一起解读，获得更全面的信息</li>
          </ul>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
