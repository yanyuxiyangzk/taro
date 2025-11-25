import { Compass, Flame, Wind, Droplets, Mountain } from 'lucide-react';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';

const directions = [
  { name: '北', element: '水', color: 'blue', icon: Droplets, fortune: '事业运' },
  { name: '东北', element: '土', color: 'yellow', icon: Mountain, fortune: '智慧运' },
  { name: '东', element: '木', color: 'green', icon: Wind, fortune: '健康运' },
  { name: '东南', element: '木', color: 'green', icon: Wind, fortune: '财富运' },
  { name: '南', element: '火', color: 'red', icon: Flame, fortune: '名誉运' },
  { name: '西南', element: '土', color: 'yellow', icon: Mountain, fortune: '婚姻运' },
  { name: '西', element: '金', color: 'gray', icon: Compass, fortune: '子女运' },
  { name: '西北', element: '金', color: 'gray', icon: Compass, fortune: '贵人运' },
];

const fengShuiTips = [
  { title: '客厅布局', desc: '保持明亮通风，主色调宜用暖色系', level: '优' },
  { title: '卧室方位', desc: '床头宜靠实墙，避免正对门窗', level: '良' },
  { title: '财位摆设', desc: '财位宜放置绿植或流水装饰', level: '优' },
  { title: '厨房位置', desc: '避免与卫生间相对，保持整洁', level: '中' },
];

export default function FengShuiPage() {
  const [selectedDirection, setSelectedDirection] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black p-6 pb-24">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Compass className="w-8 h-8 text-purple-400 animate-spin" style={{ animationDuration: '8s' }} />
          <h1 className="text-purple-200">风水堪舆</h1>
          <Compass className="w-8 h-8 text-purple-400 animate-spin" style={{ animationDuration: '8s' }} />
        </div>
        <p className="text-purple-300/80">天人合一，趋吉避凶</p>
      </div>

      {/* Compass Image */}
      <div className="mb-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-3xl"></div>
        <Card className="relative bg-black/50 border-purple-500/30 overflow-hidden">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1663739726752-0947d2d6f1b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW5nJTIwc2h1aSUyMGNvbXBhc3N8ZW58MXx8fHwxNzYyNzg0Njc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Feng Shui Compass"
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        </Card>
      </div>

      {/* Eight Directions */}
      <div className="mb-6">
        <h2 className="text-purple-200 mb-4 text-center">八方吉凶</h2>
        <div className="grid grid-cols-4 gap-3">
          {directions.map((dir, index) => {
            const Icon = dir.icon;
            const isSelected = selectedDirection === index;
            
            return (
              <button
                key={index}
                onClick={() => setSelectedDirection(index)}
                className={`p-4 rounded-xl transition-all ${
                  isSelected
                    ? 'bg-gradient-to-br from-purple-600/50 to-blue-600/50 border-2 border-purple-400 shadow-lg shadow-purple-500/30'
                    : 'bg-purple-900/30 border border-purple-500/30 hover:border-purple-400/50'
                }`}
              >
                <Icon className={`w-6 h-6 mx-auto mb-2 text-${dir.color}-400`} />
                <div className="text-purple-100 text-sm font-bold mb-1">{dir.name}</div>
                <div className="text-purple-300/70 text-xs">{dir.element}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 风水堪舆功能入口 */}
      <div className="mb-8">
        <Card 
          onClick={() => window.location.hash = '#fengshui-detail'}
          className="bg-gradient-to-br from-yellow-900/40 to-red-900/40 border-yellow-500/50 backdrop-blur-sm hover:border-yellow-400/70 transition-all cursor-pointer group overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-red-500/10 blur-2xl"></div>
          <div className="relative p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-600/30 to-red-600/30 border-2 border-yellow-500/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Compass className="w-8 h-8 text-yellow-400 animate-spin" style={{ animationDuration: '8s' }} />
              </div>
              <div className="flex-1">
                <h3 className="text-yellow-200 text-lg font-bold mb-1">风水堪舆</h3>
                <p className="text-white text-sm" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 0 2px rgba(0,0,0,0.9)' }}>罗盘定位 · 星象测算 · 智能分析</p>
              </div>
              <div className="text-yellow-400 text-2xl group-hover:translate-x-1 transition-transform">→</div>
            </div>
            <div className="mt-4 pt-4 border-t border-yellow-500/20">
              <div className="flex items-center justify-around text-center">
                <div>
                  <div className="text-yellow-200 text-xs mb-1">🧭</div>
                  <div className="text-white text-xs" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 0 2px rgba(0,0,0,0.9)' }}>罗盘定向</div>
                </div>
                <div>
                  <div className="text-yellow-200 text-xs mb-1">⭐</div>
                  <div className="text-white text-xs" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 0 2px rgba(0,0,0,0.9)' }}>星象测算</div>
                </div>
                <div>
                  <div className="text-yellow-200 text-xs mb-1">📸</div>
                  <div className="text-white text-xs" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 0 2px rgba(0,0,0,0.9)' }}>图像分析</div>
                </div>
                <div>
                  <div className="text-yellow-200 text-xs mb-1">🎥</div>
                  <div className="text-white text-xs" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 0 2px rgba(0,0,0,0.9)' }}>视频堪舆</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* 风水功能模块 */}
      <div className="mb-8">
        <h2 className="text-purple-200 mb-4 text-center flex items-center justify-center gap-2">
          <span>✨</span>
          <span>风水功能</span>
          <span>✨</span>
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {/* 风水布局 */}
          <Card
            onClick={() => window.location.hash = '#fengshui-layout'}
            className="bg-gradient-to-br from-purple-900/40 to-black/40 border-purple-500/30 backdrop-blur-sm hover:border-purple-400/50 transition-all cursor-pointer group overflow-hidden relative h-36"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent"></div>
            <div className="relative p-4 h-full flex flex-col items-center justify-center text-center">
              <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">🏠</div>
              <h4 className="text-purple-100 font-bold mb-1 text-sm">风水布局</h4>
              <p className="text-purple-300/70 text-xs leading-tight">家居规划</p>
            </div>
            <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/10 transition-all pointer-events-none"></div>
          </Card>

          {/* 风水工具 */}
          <Card
            onClick={() => window.location.hash = '#fengshui-tools'}
            className="bg-gradient-to-br from-blue-900/40 to-black/40 border-blue-500/30 backdrop-blur-sm hover:border-blue-400/50 transition-all cursor-pointer group overflow-hidden relative h-36"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent"></div>
            <div className="relative p-4 h-full flex flex-col items-center justify-center text-center">
              <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">🧭</div>
              <h4 className="text-white font-bold mb-1 text-sm" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 0 2px rgba(0,0,0,0.9)' }}>风水工具</h4>
              <p className="text-white text-xs leading-tight" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 0 2px rgba(0,0,0,0.9)' }}>测算工具</p>
            </div>
            <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 transition-all pointer-events-none"></div>
          </Card>

          {/* 风水知识 */}
          <Card
            onClick={() => window.location.hash = '#fengshui-knowledge'}
            className="bg-gradient-to-br from-green-900/40 to-black/40 border-green-500/30 backdrop-blur-sm hover:border-green-400/50 transition-all cursor-pointer group overflow-hidden relative h-36"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent"></div>
            <div className="relative p-4 h-full flex flex-col items-center justify-center text-center">
              <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">📚</div>
              <h4 className="text-white font-bold mb-1 text-sm" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 0 2px rgba(0,0,0,0.9)' }}>风水知识</h4>
              <p className="text-white text-xs leading-tight" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 0 2px rgba(0,0,0,0.9)' }}>学习智慧</p>
            </div>
            <div className="absolute inset-0 bg-green-500/0 group-hover:bg-green-500/10 transition-all pointer-events-none"></div>
          </Card>
        </div>
      </div>

      {/* Selected Direction Details */}
      {selectedDirection !== null && (
        <Card className="mb-8 bg-gradient-to-br from-purple-900/40 to-black/40 border-purple-500/40 backdrop-blur-sm animate-in">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              {(() => {
                const Icon = directions[selectedDirection].icon;
                return <Icon className={`w-8 h-8 text-${directions[selectedDirection].color}-400`} />;
              })()}
              <div>
                <h3 className="text-purple-100 text-lg font-bold">
                  {directions[selectedDirection].name}方
                </h3>
                <p className="text-purple-300/70 text-sm">
                  {directions[selectedDirection].element} · {directions[selectedDirection].fortune}
                </p>
              </div>
            </div>
            <div className="bg-black/30 rounded-lg p-4 border border-purple-500/20">
              <p className="text-purple-200/90 text-sm leading-relaxed">
                {directions[selectedDirection].name}方属{directions[selectedDirection].element}，主管{directions[selectedDirection].fortune}。
                此方位宜保持整洁明亮，可摆放相应五行属性的物品以增强运势。
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Feng Shui Tips */}
      <div className="mb-8">
        <h2 className="text-purple-200 mb-4 text-center">风水建议</h2>
        <div className="space-y-3">
          {fengShuiTips.map((tip, index) => (
            <Card
              key={index}
              className="bg-gradient-to-br from-purple-900/30 to-black/30 border-purple-500/30 backdrop-blur-sm hover:border-purple-400/40 transition-all"
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-purple-100 font-bold">{tip.title}</h4>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      tip.level === '优'
                        ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                        : tip.level === '良'
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                    }`}
                  >
                    {tip.level}
                  </span>
                </div>
                <p className="text-purple-300/80 text-sm">{tip.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Analysis Button */}
      <button
        onClick={() => window.location.hash = '#fengshui-analysis'}
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 px-6 rounded-full font-bold transition-all shadow-lg shadow-purple-500/30"
      >
        开始风水分析
      </button>
    </div>
  );
}
