import { useState } from 'react';
import { ArrowLeft, Sparkles, History, RefreshCw } from 'lucide-react';
import { Card } from './ui/card';
import Dice3D from './Dice3D';

interface DiceResult {
  dice1: number;
  dice2: number;
  dice3: number;
  total: number;
  fortune: string;
  interpretation: string;
  advice: string;
  timestamp: Date;
}

const fortuneInterpretations: Record<number, { fortune: string; interpretation: string; advice: string }> = {
  3: { fortune: '大吉', interpretation: '三阳开泰，万事如意。此乃上上之签，预示着好运连连，心想事成。', advice: '把握机会，积极进取，必有所成。' },
  4: { fortune: '中吉', interpretation: '四平八稳，稳中求进。运势平稳，适合稳扎稳打。', advice: '保持耐心，循序渐进，不可急躁。' },
  5: { fortune: '小吉', interpretation: '五福临门，喜事将至。有小惊喜，但需谨慎行事。', advice: '注意细节，小心谨慎，可得小成。' },
  6: { fortune: '平', interpretation: '六六大顺，平安顺遂。运势平稳，无大喜大悲。', advice: '维持现状，稳定为主，不宜冒险。' },
  7: { fortune: '中吉', interpretation: '七星高照，贵人相助。会有贵人出现，助你一臂之力。', advice: '多与他人交流，善待身边人，必有回报。' },
  8: { fortune: '大吉', interpretation: '八方来财，财运亨通。财运极佳，投资有道。', advice: '把握商机，大胆尝试，财源广进。' },
  9: { fortune: '中吉', interpretation: '九九归一，圆满如意。事情即将圆满解决。', advice: '坚持到底，善始善终，必得圆满。' },
  10: { fortune: '平', interpretation: '十全十美，知足常乐。运势平稳，宜守不宜攻。', advice: '知足常乐，珍惜当下，平安是福。' },
  11: { fortune: '小吉', interpretation: '一心一意，专注致胜。专注于一件事，必有所成。', advice: '专心致志，不可分心，方能成功。' },
  12: { fortune: '中吉', interpretation: '双喜临门，好事成双。近期会有双重喜事降临。', advice: '保持乐观，积极面对，喜事连连。' },
  13: { fortune: '平', interpretation: '变数较多，需要谨慎。运势起伏，需要小心应对。', advice: '谨言慎行，三思而后行，避免冲动。' },
  14: { fortune: '小凶', interpretation: '波折较多，需要耐心。可能遇到一些小困难。', advice: '保持冷静，耐心应对，困难终会过去。' },
  15: { fortune: '平', interpretation: '平淡如水，顺其自然。运势平平，顺其自然即可。', advice: '不强求，随遇而安，平常心对待。' },
  16: { fortune: '中吉', interpretation: '柳暗花明，转机将至。困境即将过去，转机在即。', advice: '坚持信念，不要放弃，曙光就在前方。' },
  17: { fortune: '小吉', interpretation: '步步为营，稳中有进。稳扎稳打，会有小进步。', advice: '脚踏实地，稳步前进，积少成多。' },
  18: { fortune: '大吉', interpretation: '十八罗汉，护佑平安。运势极佳，诸事顺利。', advice: '大胆行动，把握机遇，必有大成。' },
};

export default function DiceReadingPage() {
  const [isRolling, setIsRolling] = useState(false);
  const [currentResult, setCurrentResult] = useState<DiceResult | null>(null);
  const [history, setHistory] = useState<DiceResult[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [question, setQuestion] = useState('');
  const [rollingDice, setRollingDice] = useState({ dice1: 1, dice2: 1, dice3: 1 });

  const rollDice = () => {
    if (isRolling) return;
    
    setIsRolling(true);
    
    // 骰子滚动动画 - 快速变化点数
    const rollingInterval = setInterval(() => {
      setRollingDice({
        dice1: Math.floor(Math.random() * 6) + 1,
        dice2: Math.floor(Math.random() * 6) + 1,
        dice3: Math.floor(Math.random() * 6) + 1,
      });
    }, 100);
    
    // 2.5秒后停止并显示最终结果
    setTimeout(() => {
      clearInterval(rollingInterval);
      
      const dice1 = Math.floor(Math.random() * 6) + 1;
      const dice2 = Math.floor(Math.random() * 6) + 1;
      const dice3 = Math.floor(Math.random() * 6) + 1;
      const total = dice1 + dice2 + dice3;
      
      const interpretation = fortuneInterpretations[total] || fortuneInterpretations[10];
      
      const result: DiceResult = {
        dice1,
        dice2,
        dice3,
        total,
        fortune: interpretation.fortune,
        interpretation: interpretation.interpretation,
        advice: interpretation.advice,
        timestamp: new Date(),
      };
      
      setCurrentResult(result);
      setRollingDice({ dice1, dice2, dice3 });
      setHistory(prev => [result, ...prev].slice(0, 10)); // 保留最近10条记录
      setIsRolling(false);
    }, 2500);
  };

  const getDiceEmoji = (value: number) => {
    const emojis = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
    return emojis[value - 1];
  };

  const getFortuneColor = (fortune: string) => {
    if (fortune.includes('大吉')) return 'text-green-400';
    if (fortune.includes('中吉') || fortune.includes('小吉')) return 'text-blue-400';
    if (fortune.includes('平')) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black pb-24">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-purple-950/90 backdrop-blur-lg border-b border-purple-500/30">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => window.history.back()}
            className="p-2 hover:bg-purple-800/30 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-purple-200" />
          </button>
          <h1 className="text-xl text-purple-100 font-bold">骰子问答</h1>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="p-2 hover:bg-purple-800/30 rounded-full transition-colors"
          >
            <History className="w-6 h-6 text-purple-200" />
          </button>
        </div>
      </div>

      <div className="px-6 pt-6 space-y-6">
        {/* 说明卡片 */}
        <Card className="bg-gradient-to-br from-purple-900/40 to-black/40 border-purple-500/40 backdrop-blur-sm">
          <div className="p-5 text-center">
            <div className="text-4xl mb-3">🎲</div>
            <h2 className="text-purple-100 text-lg font-bold mb-2">骰子占卜</h2>
            <p className="text-purple-300 text-sm leading-relaxed">
              心诚则灵，默念你的问题，摇动骰子，让命运为你指引方向。
              <br />
              三颗骰子的点数之和，将揭示你问题的答案。
            </p>
          </div>
        </Card>

        {/* 问题输入 */}
        <Card className="bg-gradient-to-br from-purple-900/40 to-black/40 border-purple-500/40 backdrop-blur-sm">
          <div className="p-5">
            <label className="text-purple-200 text-sm font-medium mb-2 block">
              你想问什么？（可选）
            </label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="在心中默念你的问题，或在此输入..."
              className="w-full bg-purple-950/50 border border-purple-500/30 rounded-lg p-3 text-purple-100 placeholder-purple-400/50 focus:outline-none focus:border-purple-400/50 resize-none"
              rows={3}
            />
          </div>
        </Card>

        {/* 骰子显示区域 - 桌面效果 */}
        <Card className="bg-gradient-to-br from-purple-900/40 to-black/40 border-purple-500/40 backdrop-blur-sm overflow-hidden relative">
          {/* 桌面纹理背景 */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-950/60 via-purple-900/40 to-black/60"></div>
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(168, 85, 247, 0.3) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
          
          {/* 滚动时的光效 */}
          {isRolling && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/20 to-transparent animate-pulse"></div>
          )}
          
          <style>{`
            @keyframes diceShake {
              0%, 100% { 
                transform: translate(0, 0) rotate(0deg) scale(1);
              }
              10% { 
                transform: translate(-2px, -2px) rotate(-3deg) scale(1.02);
              }
              20% { 
                transform: translate(2px, -1px) rotate(3deg) scale(0.98);
              }
              30% { 
                transform: translate(-1px, 2px) rotate(-2deg) scale(1.01);
              }
              40% { 
                transform: translate(1px, -2px) rotate(2deg) scale(0.99);
              }
              50% { 
                transform: translate(-2px, 1px) rotate(-3deg) scale(1.02);
              }
              60% { 
                transform: translate(2px, -2px) rotate(3deg) scale(0.98);
              }
              70% { 
                transform: translate(-1px, -1px) rotate(-1deg) scale(1.01);
              }
              80% { 
                transform: translate(1px, 2px) rotate(1deg) scale(0.99);
              }
              90% { 
                transform: translate(-1px, -1px) rotate(-1deg) scale(1);
              }
            }
            
            .dice-shaking {
              animation: diceShake 0.15s ease-in-out infinite;
            }
          `}</style>
          
          {/* 骰子容器 - 模拟桌面 */}
          <div className="relative p-6">
            <div className="bg-gradient-to-br from-purple-950/80 to-black/80 rounded-2xl border-2 border-purple-500/30 p-8 shadow-2xl">
              {/* 桌面内阴影效果 */}
              <div className="absolute inset-0 rounded-2xl shadow-inner pointer-events-none"></div>
              
              {/* 3D骰子显示区域 */}
              <div className="relative min-h-[260px] flex items-center justify-center pt-14 pb-8" style={{ perspective: '1000px',paddingTop: '20px'}}>
                <div className="flex flex-col items-center gap-6">
                  {/* 第一行：1个骰子 */}
                  <div className="flex justify-center">
                    {currentResult || isRolling ? (
                      <div 
                        className={isRolling ? 'dice-shaking' : ''}
                        style={{
                          filter: isRolling 
                            ? 'drop-shadow(0 0 15px rgba(168, 85, 247, 0.8))' 
                            : 'drop-shadow(0 8px 15px rgba(0, 0, 0, 0.5))',
                          transformStyle: 'preserve-3d',
                        }}
                      >
                        <Dice3D 
                          value={isRolling ? rollingDice.dice1 : currentResult!.dice1} 
                          isRolling={isRolling}
                          size={55}
                        />
                      </div>
                    ) : (
                      <div style={{ opacity: 0.4, filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))' }}>
                        <Dice3D value={1} size={55} />
                      </div>
                    )}
                  </div>
                  
                  {/* 第二行：2个骰子 */}
                  <div className="flex justify-center gap-6">
                    {currentResult || isRolling ? (
                      <>
                        <div 
                          className={isRolling ? 'dice-shaking' : ''}
                          style={{
                            filter: isRolling 
                              ? 'drop-shadow(0 0 15px rgba(168, 85, 247, 0.8))' 
                              : 'drop-shadow(0 8px 15px rgba(0, 0, 0, 0.5))',
                            transformStyle: 'preserve-3d',
                            animationDelay: '0.05s',
                          }}
                        >
                          <Dice3D 
                            value={isRolling ? rollingDice.dice2 : currentResult!.dice2} 
                            isRolling={isRolling}
                            size={55}
                          />
                        </div>
                        <div 
                          className={isRolling ? 'dice-shaking' : ''}
                          style={{
                            filter: isRolling 
                              ? 'drop-shadow(0 0 15px rgba(168, 85, 247, 0.8))' 
                              : 'drop-shadow(0 8px 15px rgba(0, 0, 0, 0.5))',
                            transformStyle: 'preserve-3d',
                            animationDelay: '0.1s',
                          }}
                        >
                          <Dice3D 
                            value={isRolling ? rollingDice.dice3 : currentResult!.dice3} 
                            isRolling={isRolling}
                            size={55}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div style={{ opacity: 0.4, filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))' }}>
                          <Dice3D value={1} size={55} />
                        </div>
                        <div style={{ opacity: 0.4, filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))' }}>
                          <Dice3D value={1} size={55} />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* 结果显示 */}
              <div className="relative mt-6">
                {isRolling && (
                  <div className="text-center animate-pulse">
                    <div className="text-purple-300 text-base font-bold mb-1">🎲 骰子滚动中... 🎲</div>
                    <div className="text-purple-400 text-xs">心诚则灵，静待结果</div>
                  </div>
                )}

                {currentResult && !isRolling && (
                  <div className="text-center animate-in fade-in duration-500">
                    <div className="text-purple-300 text-xs mb-1">点数总和</div>
                    <div className="text-purple-100 text-3xl font-bold mb-2">{currentResult.total}</div>
                    <div className="flex justify-center gap-2">
                      <span className="text-purple-400 text-xs">✨ 命运已揭晓 ✨</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* 摇骰子按钮 */}
        <button
          onClick={rollDice}
          disabled={isRolling}
          className={`w-full py-4 px-6 rounded-xl font-bold text-white text-lg transition-all shadow-lg flex items-center justify-center gap-3 ${
            isRolling
              ? 'bg-purple-800/50 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
          }`}
        >
          {isRolling ? (
            <>
              <RefreshCw className="w-6 h-6 animate-spin" />
              <span>骰子滚动中...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-6 h-6" />
              <span>摇动骰子</span>
            </>
          )}
        </button>

        {/* 占卜结果 */}
        {currentResult && !isRolling && (
          <div className="space-y-4 animate-in fade-in duration-500">
            {/* 运势 */}
            <Card className="bg-gradient-to-br from-purple-900/40 to-black/40 border-purple-500/40 backdrop-blur-sm">
              <div className="p-6 text-center">
                <div className="text-5xl mb-3">✨</div>
                <div className="text-purple-300 text-sm mb-2">运势</div>
                <div className={`text-3xl font-bold mb-4 ${getFortuneColor(currentResult.fortune)}`}>
                  {currentResult.fortune}
                </div>
              </div>
            </Card>

            {/* 解读 */}
            <Card className="bg-gradient-to-br from-purple-900/40 to-black/40 border-purple-500/40 backdrop-blur-sm">
              <div className="p-6">
                <h3 className="text-purple-100 text-lg font-bold mb-3 flex items-center gap-2">
                  <span className="text-2xl">📖</span>
                  <span>解读</span>
                </h3>
                <p className="text-purple-200 text-sm leading-relaxed">
                  {currentResult.interpretation}
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
                <p className="text-purple-200 text-sm leading-relaxed">
                  {currentResult.advice}
                </p>
              </div>
            </Card>
          </div>
        )}

        {/* 历史记录 */}
        {showHistory && history.length > 0 && (
          <Card className="bg-gradient-to-br from-purple-900/40 to-black/40 border-purple-500/40 backdrop-blur-sm">
            <div className="p-6">
              <h3 className="text-purple-100 text-lg font-bold mb-4 flex items-center gap-2">
                <History className="w-5 h-5" />
                <span>历史记录</span>
              </h3>
              <div className="space-y-3">
                {history.map((record, index) => (
                  <div
                    key={index}
                    className="bg-purple-950/40 rounded-lg p-4 border border-purple-500/20"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{getDiceEmoji(record.dice1)}</span>
                        <span className="text-2xl">{getDiceEmoji(record.dice2)}</span>
                        <span className="text-2xl">{getDiceEmoji(record.dice3)}</span>
                        <span className="text-purple-300 text-sm ml-2">= {record.total}</span>
                      </div>
                      <span className={`text-sm font-bold ${getFortuneColor(record.fortune)}`}>
                        {record.fortune}
                      </span>
                    </div>
                    <div className="text-purple-400 text-xs">
                      {record.timestamp.toLocaleString('zh-CN')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}

        {/* 占卜说明 */}
        <Card className="bg-gradient-to-br from-purple-900/40 to-black/40 border-purple-500/40 backdrop-blur-sm">
          <div className="p-6">
            <h3 className="text-purple-100 text-lg font-bold mb-4">占卜说明</h3>
            <div className="space-y-3 text-purple-300 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-purple-400">•</span>
                <span>三颗骰子的点数之和范围为 3-18</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-purple-400">•</span>
                <span>点数越极端（3或18），运势越强烈</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-purple-400">•</span>
                <span>中间点数（9-12）代表平稳运势</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-purple-400">•</span>
                <span>建议每天只占卜一次，心诚则灵</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
