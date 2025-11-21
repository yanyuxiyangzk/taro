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
      <div className="mb-8">
        <h3 className="text-purple-200 mb-4 text-center flex items-center justify-center gap-2">
          <Flame className="w-5 h-5 text-red-400" />
          八方运势
          <Flame className="w-5 h-5 text-red-400" />
        </h3>
        
        <div className="grid grid-cols-4 gap-2 mb-4">
          {directions.map((dir, index) => {
            const Icon = dir.icon;
            const isSelected = selectedDirection === index;
            
            return (
              <button
                key={index}
                onClick={() => setSelectedDirection(index)}
                className={`p-3 rounded-lg border transition-all ${
                  isSelected
                    ? 'bg-purple-600/30 border-purple-400'
                    : 'bg-purple-900/20 border-purple-500/30 hover:border-purple-400/50'
                }`}
              >
                <Icon className="w-5 h-5 text-purple-300 mx-auto mb-1" />
                <div className="text-purple-200 text-sm">{dir.name}</div>
              </button>
            );
          })}
        </div>

        {selectedDirection !== null && (
          <Card className="bg-gradient-to-br from-purple-900/40 to-black/40 border-purple-500/40 p-4 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/30 to-red-500/30 flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/20">
                <span className="text-xl">{directions[selectedDirection].name}</span>
              </div>
              <div className="flex-1">
                <h4 className="text-purple-100 mb-2">
                  五行属{directions[selectedDirection].element}
                </h4>
                <p className="text-purple-300/80 text-sm mb-2">
                  主管：{directions[selectedDirection].fortune}
                </p>
                <p className="text-purple-300/60 text-sm">
                  适宜摆放与{directions[selectedDirection].element}相关的物品，增强此方位能量
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Feng Shui Tips */}
      <div>
        <h3 className="text-purple-200 mb-4 text-center flex items-center justify-center gap-2">
          <Flame className="w-5 h-5 text-red-400" />
          家居建议
          <Flame className="w-5 h-5 text-red-400" />
        </h3>
        
        <div className="grid grid-cols-1 gap-3">
          {fengShuiTips.map((tip, index) => (
            <Card
              key={index}
              className="bg-gradient-to-br from-purple-900/30 to-black/30 border-purple-500/30 p-4 backdrop-blur-sm hover:border-purple-400/40 transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h4 className="text-purple-100 mb-1">{tip.title}</h4>
                  <p className="text-purple-300/70 text-sm">{tip.desc}</p>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-sm flex-shrink-0 ${
                    tip.level === '优'
                      ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                      : tip.level === '良'
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                  }`}
                >
                  {tip.level}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Crystal Ball */}
      <div className="mt-8">
        <Card className="bg-gradient-to-br from-purple-900/20 to-black/20 border-purple-500/30 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-red-500/10 blur-2xl"></div>
          <div className="relative p-4">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1669867660200-810bd0921333?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcnlzdGFsJTIwYmFsbCUyMG1hZ2ljfGVufDF8fHx8MTc2Mjc1NjU1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Crystal Ball"
              className="w-full h-40 object-cover rounded-lg mb-3"
            />
            <p className="text-purple-200/80 text-center text-sm">
              水晶能量场可以净化空间，提升居所气场
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
