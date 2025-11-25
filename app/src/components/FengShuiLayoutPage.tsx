import { ArrowLeft, Home, Bed, DollarSign, Utensils, Sofa, Bath, BookOpen, Briefcase } from 'lucide-react';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LayoutArea {
  id: string;
  name: string;
  icon: any;
  description: string;
  tips: string[];
  level: '优' | '良' | '中';
  image: string;
}

const layoutAreas: LayoutArea[] = [
  {
    id: 'living-room',
    name: '客厅布局',
    icon: Sofa,
    description: '客厅是家庭的核心区域，影响家人关系和社交运势',
    tips: [
      '沙发应靠墙摆放，寓意有靠山',
      '客厅光线要充足，保持明亮通透',
      '避免横梁压顶，影响家人健康',
      '摆放绿植可增加生气，提升运势'
    ],
    level: '优',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'
  },
  {
    id: 'bedroom',
    name: '卧室布局',
    icon: Bed,
    description: '卧室关系到睡眠质量和个人健康运势',
    tips: [
      '床头应靠实墙，不宜对着门窗',
      '避免镜子正对床铺，影响睡眠',
      '卧室色调宜温馨柔和，不宜过于鲜艳',
      '保持空气流通，但不宜风口直吹'
    ],
    level: '优',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800'
  },
  {
    id: 'wealth-position',
    name: '财位布局',
    icon: DollarSign,
    description: '财位是家中聚财纳福的重要位置',
    tips: [
      '财位宜明亮整洁，不可堆放杂物',
      '可摆放招财植物如发财树、金钱树',
      '财位忌受压，不宜摆放重物',
      '保持财位通风，气流顺畅'
    ],
    level: '优',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800'
  },
  {
    id: 'kitchen',
    name: '厨房布局',
    icon: Utensils,
    description: '厨房代表家庭的财库和健康',
    tips: [
      '炉灶不宜正对水槽，水火相冲',
      '厨房门不宜正对卧室门',
      '保持厨房清洁，油烟及时排出',
      '厨房宜在房屋后方，不宜在前方'
    ],
    level: '良',
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800'
  },
  {
    id: 'study',
    name: '书房布局',
    icon: BookOpen,
    description: '书房影响学业和事业发展',
    tips: [
      '书桌应面向门口，背靠实墙',
      '书房光线要充足，有利于学习',
      '避免横梁压顶，影响思维',
      '可摆放文昌塔提升学业运'
    ],
    level: '良',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800'
  },
  {
    id: 'office',
    name: '办公区布局',
    icon: Briefcase,
    description: '办公区域影响工作效率和事业运势',
    tips: [
      '办公桌后方宜有靠，象征有贵人相助',
      '办公桌前方要开阔，视野宽广',
      '避免座位背对门窗，缺乏安全感',
      '可摆放水晶球或文昌笔提升事业运'
    ],
    level: '良',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800'
  },
  {
    id: 'bathroom',
    name: '卫生间布局',
    icon: Bath,
    description: '卫生间位置影响家庭健康和财运',
    tips: [
      '卫生间门不宜正对大门或卧室门',
      '保持卫生间干燥通风，避免潮湿',
      '马桶不宜正对镜子',
      '可摆放绿植净化空气'
    ],
    level: '中',
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800'
  },
  {
    id: 'entrance',
    name: '玄关布局',
    icon: Home,
    description: '玄关是气口，影响整体家运',
    tips: [
      '玄关宜明亮整洁，不可昏暗杂乱',
      '可设置玄关柜，起到遮挡作用',
      '摆放绿植或装饰画提升气场',
      '避免正对镜子，气流外泄'
    ],
    level: '良',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'
  }
];

export default function FengShuiLayoutPage() {
  const handleBack = () => {
    window.history.back();
  };

  const getLevelColor = (level: '优' | '良' | '中') => {
    switch (level) {
      case '优':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case '良':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case '中':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black pb-24">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-purple-500/20">
        <div className="flex items-center gap-4 p-4">
          <button
            onClick={handleBack}
            className="p-2 rounded-full hover:bg-purple-900/30 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-purple-200" />
          </button>
          <h1 className="text-xl text-purple-100 font-bold">风水布局</h1>
        </div>
      </div>

      {/* Hero Section */}
      <div className="px-6 pt-6 pb-4">
        <Card className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-purple-500/40 backdrop-blur-sm overflow-hidden relative">
          <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 blur-3xl rounded-full"></div>
          <div className="relative p-6 text-center">
            <div className="text-5xl mb-4">🏠</div>
            <h2 className="text-2xl text-purple-100 font-bold mb-3">家居风水规划</h2>
            <p className="text-purple-200/80 text-sm leading-relaxed">
              合理的家居布局能够改善气场流动，提升家庭运势。
              <br />
              根据风水原理，为您的家打造和谐舒适的生活空间。
            </p>
          </div>
        </Card>
      </div>

      {/* Layout Areas Grid */}
      <div className="px-6 space-y-4">
        {layoutAreas.map((area) => {
          const IconComponent = area.icon;
          return (
            <Card
              key={area.id}
              className="bg-gradient-to-br from-purple-900/40 to-black/40 border-purple-500/30 backdrop-blur-sm overflow-hidden hover:border-purple-400/50 transition-all"
            >
              {/* Image Header */}
              <div className="relative h-40 overflow-hidden">
                <ImageWithFallback
                  src={area.image}
                  alt={area.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                
                {/* Title Overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-500/30 backdrop-blur-sm flex items-center justify-center border border-purple-400/30">
                      <IconComponent className="w-5 h-5 text-purple-200" />
                    </div>
                    <h3 className="text-xl text-white font-bold">{area.name}</h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs border ${getLevelColor(area.level)}`}>
                    {area.level}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <p className="text-purple-200/80 text-sm mb-4 leading-relaxed">
                  {area.description}
                </p>

                {/* Tips */}
                <div className="space-y-2">
                  <h4 className="text-purple-100 text-sm font-semibold mb-3 flex items-center gap-2">
                    <span>💡</span>
                    <span>布局建议</span>
                  </h4>
                  {area.tips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-purple-400 mt-0.5 flex-shrink-0">•</span>
                      <span className="text-purple-200/90">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Bottom Tips */}
      <div className="px-6 mt-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-900/40 to-indigo-900/30 border-blue-500/30 backdrop-blur-sm">
          <div className="p-5">
            <div className="flex items-start gap-3">
              <div className="text-2xl">🔮</div>
              <div className="flex-1">
                <h4 className="text-blue-100 text-lg font-bold mb-2">温馨提示</h4>
                <div className="space-y-2 text-sm text-blue-200/90">
                  <p>• 风水布局应因地制宜，结合实际情况调整</p>
                  <p>• 保持家居整洁是最基本的风水原则</p>
                  <p>• 定期调整布局，顺应季节和运势变化</p>
                  <p>• 如需专业指导，可咨询风水大师</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
