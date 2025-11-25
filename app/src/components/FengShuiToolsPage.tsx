import { ArrowLeft, Compass, Calendar, Calculator, Map, Camera, Ruler } from 'lucide-react';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Tool {
  id: string;
  name: string;
  icon: any;
  description: string;
  features: string[];
  image: string;
  link?: string;
}

const tools: Tool[] = [
  {
    id: 'compass',
    name: '风水罗盘',
    icon: Compass,
    description: '专业的风水罗盘工具，精准测定方位，分析八卦方位吉凶',
    features: [
      '实时方位显示',
      '八卦方位分析',
      '五行属性查询',
      '吉凶方位判断'
    ],
    image: 'https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=800',
    link: '#fengshui-compass'
  },
  {
    id: 'calendar',
    name: '黄历查询',
    icon: Calendar,
    description: '传统黄历查询工具，查看每日宜忌，选择吉日良辰',
    features: [
      '每日宜忌查询',
      '节气节日提醒',
      '吉时查询',
      '冲煞查询'
    ],
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800'
  },
  {
    id: 'calculator',
    name: '命理测算',
    icon: Calculator,
    description: '根据生辰八字进行命理测算，分析五行喜忌',
    features: [
      '八字排盘',
      '五行分析',
      '喜用神查询',
      '大运流年'
    ],
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800'
  },
  {
    id: 'floor-plan',
    name: '户型分析',
    icon: Map,
    description: '上传户型图，智能分析房屋风水格局',
    features: [
      '户型图上传',
      '格局分析',
      '缺角检测',
      '优化建议'
    ],
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800'
  },
  {
    id: 'room-scanner',
    name: '环境扫描',
    icon: Camera,
    description: '使用相机扫描房间环境，获取风水分析报告',
    features: [
      '实时扫描',
      '环境分析',
      'AR标注',
      '改善建议'
    ],
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'
  },
  {
    id: 'measurement',
    name: '尺寸测量',
    icon: Ruler,
    description: '鲁班尺吉凶测量，帮助选择合适的家具尺寸',
    features: [
      '鲁班尺查询',
      '吉凶判断',
      '尺寸建议',
      '单位换算'
    ],
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800'
  }
];

export default function FengShuiToolsPage() {
  const handleBack = () => {
    window.history.back();
  };

  const handleToolClick = (tool: Tool) => {
    if (tool.link) {
      window.location.hash = tool.link;
    } else {
      // 显示"功能开发中"提示
      alert(`${tool.name}功能正在开发中，敬请期待！`);
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
          <h1 className="text-xl text-purple-100 font-bold">风水工具</h1>
        </div>
      </div>

      {/* Hero Section */}
      <div className="px-6 pt-6 pb-4">
        <Card className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-purple-500/40 backdrop-blur-sm overflow-hidden relative">
          <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 blur-3xl rounded-full"></div>
          <div className="relative p-6 text-center">
            <div className="text-5xl mb-4">🧭</div>
            <h2 className="text-2xl text-purple-100 font-bold mb-3">专业风水工具</h2>
            <p className="text-purple-200/80 text-sm leading-relaxed">
              集合多种专业风水测算工具，帮助您精准分析风水格局。
              <br />
              从罗盘定位到户型分析，一站式解决风水问题。
            </p>
          </div>
        </Card>
      </div>

      {/* Tools Grid */}
      <div className="px-6 space-y-4">
        {tools.map((tool) => {
          const IconComponent = tool.icon;
          return (
            <Card
              key={tool.id}
              onClick={() => handleToolClick(tool)}
              className="bg-gradient-to-br from-purple-900/40 to-black/40 border-purple-500/30 backdrop-blur-sm overflow-hidden hover:border-purple-400/50 transition-all cursor-pointer group"
            >
              <div className="flex gap-4 p-5">
                {/* Left: Image */}
                <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
                  <ImageWithFallback
                    src={tool.image}
                    alt={tool.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-purple-500/30 backdrop-blur-sm flex items-center justify-center border border-purple-400/30">
                      <IconComponent className="w-6 h-6 text-purple-200" />
                    </div>
                  </div>
                </div>

                {/* Right: Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg text-purple-100 font-bold mb-2">{tool.name}</h3>
                  <p className="text-purple-200/70 text-sm mb-3 leading-relaxed">
                    {tool.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {tool.features.map((feature, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs border border-purple-500/30"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/10 transition-all pointer-events-none"></div>
            </Card>
          );
        })}
      </div>

      {/* Usage Guide */}
      <div className="px-6 mt-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-900/40 to-indigo-900/30 border-blue-500/30 backdrop-blur-sm">
          <div className="p-5">
            <div className="flex items-start gap-3">
              <div className="text-2xl">💡</div>
              <div className="flex-1">
                <h4 className="text-blue-100 text-lg font-bold mb-3">使用指南</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-2 text-sm">
                    <span className="text-blue-400 mt-0.5">1.</span>
                    <span className="text-blue-200/90">
                      <strong className="text-blue-100">风水罗盘：</strong>
                      打开罗盘工具，允许位置权限，即可实时查看方位信息
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <span className="text-blue-400 mt-0.5">2.</span>
                    <span className="text-blue-200/90">
                      <strong className="text-blue-100">黄历查询：</strong>
                      选择日期查看当日宜忌，规划重要事项的最佳时机
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <span className="text-blue-400 mt-0.5">3.</span>
                    <span className="text-blue-200/90">
                      <strong className="text-blue-100">户型分析：</strong>
                      上传户型图，系统将自动分析格局并给出优化建议
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <span className="text-blue-400 mt-0.5">4.</span>
                    <span className="text-blue-200/90">
                      <strong className="text-blue-100">环境扫描：</strong>
                      使用相机扫描房间，获取实时风水分析和改善建议
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Premium Features */}
      <div className="px-6 mb-8">
        <Card className="bg-gradient-to-br from-yellow-900/30 to-orange-900/20 border-yellow-500/30 backdrop-blur-sm">
          <div className="p-5">
            <div className="flex items-start gap-3">
              <div className="text-2xl">👑</div>
              <div className="flex-1">
                <h4 className="text-yellow-100 text-lg font-bold mb-2">VIP专享功能</h4>
                <p className="text-yellow-200/80 text-sm mb-3">
                  升级VIP会员，解锁更多高级功能和专业分析报告
                </p>
                <div className="space-y-2 text-sm text-yellow-200/90">
                  <p>• 无限次使用所有工具</p>
                  <p>• 详细的风水分析报告</p>
                  <p>• 专业大师在线咨询</p>
                  <p>• 定制化风水解决方案</p>
                </div>
                <button className="mt-4 w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white py-2 px-4 rounded-full text-sm font-bold transition-all">
                  立即升级VIP
                </button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
