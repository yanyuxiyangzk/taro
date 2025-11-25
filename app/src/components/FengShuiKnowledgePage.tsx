import { ArrowLeft, BookOpen, Lightbulb, Star, TrendingUp, Home, Heart, DollarSign, Shield } from 'lucide-react';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface KnowledgeCategory {
  id: string;
  name: string;
  icon: any;
  description: string;
  articleCount: number;
  color: string;
}

interface Article {
  id: string;
  title: string;
  category: string;
  summary: string;
  readTime: string;
  views: string;
  image: string;
  isHot?: boolean;
}

const categories: KnowledgeCategory[] = [
  {
    id: 'basics',
    name: '风水基础',
    icon: BookOpen,
    description: '了解风水的基本概念和原理',
    articleCount: 28,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'home',
    name: '家居风水',
    icon: Home,
    description: '家居布局与风水调整',
    articleCount: 45,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'career',
    name: '事业风水',
    icon: TrendingUp,
    description: '提升事业运势的风水秘诀',
    articleCount: 32,
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'wealth',
    name: '财运风水',
    icon: DollarSign,
    description: '招财纳福的风水布局',
    articleCount: 38,
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'health',
    name: '健康风水',
    icon: Shield,
    description: '保健养生的风水智慧',
    articleCount: 25,
    color: 'from-red-500 to-rose-500'
  },
  {
    id: 'relationship',
    name: '感情风水',
    icon: Heart,
    description: '促进感情和谐的风水方法',
    articleCount: 30,
    color: 'from-pink-500 to-purple-500'
  }
];

const hotArticles: Article[] = [
  {
    id: '1',
    title: '2024年家居风水布局指南',
    category: '家居风水',
    summary: '详解2024年九宫飞星方位，教你如何调整家居布局，趋吉避凶，提升整体运势...',
    readTime: '8分钟',
    views: '12.5万',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    isHot: true
  },
  {
    id: '2',
    title: '客厅风水的十大禁忌',
    category: '家居风水',
    summary: '客厅是家庭的核心区域，这些风水禁忌一定要避免，否则会影响家人关系和运势...',
    readTime: '6分钟',
    views: '9.8万',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
    isHot: true
  },
  {
    id: '3',
    title: '如何利用风水提升财运',
    category: '财运风水',
    summary: '掌握这些风水秘诀，让你的财运节节高升。从财位布局到招财物品摆放...',
    readTime: '10分钟',
    views: '15.2万',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800',
    isHot: true
  },
  {
    id: '4',
    title: '卧室风水影响睡眠质量',
    category: '健康风水',
    summary: '好的卧室风水能让你睡得更香，精神更好。这些卧室布局要点你一定要知道...',
    readTime: '7分钟',
    views: '8.6万',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800'
  },
  {
    id: '5',
    title: '办公室风水助力事业发展',
    category: '事业风水',
    summary: '办公桌的摆放、座位的选择都有讲究。掌握这些风水知识，让你的事业更上一层楼...',
    readTime: '9分钟',
    views: '11.3万',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800'
  },
  {
    id: '6',
    title: '风水中的五行相生相克',
    category: '风水基础',
    summary: '五行是风水学的基础理论，了解五行相生相克的关系，才能更好地调整风水...',
    readTime: '12分钟',
    views: '7.9万',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800'
  }
];

export default function FengShuiKnowledgePage() {
  const handleBack = () => {
    window.history.back();
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
          <h1 className="text-xl text-purple-100 font-bold">风水知识</h1>
        </div>
      </div>

      {/* Hero Section */}
      <div className="px-6 pt-6 pb-4">
        <Card className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-purple-500/40 backdrop-blur-sm overflow-hidden relative">
          <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 blur-3xl rounded-full"></div>
          <div className="relative p-6 text-center">
            <div className="text-5xl mb-4">📚</div>
            <h2 className="text-2xl text-purple-100 font-bold mb-3">风水智慧宝库</h2>
            <p className="text-purple-200/80 text-sm leading-relaxed">
              系统学习风水知识，掌握传统智慧精髓。
              <br />
              从基础理论到实战应用，助你成为风水达人。
            </p>
          </div>
        </Card>
      </div>

      {/* Categories Grid */}
      <div className="px-6 mb-6">
        <h3 className="text-purple-100 text-lg font-bold mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5" />
          <span>知识分类</span>
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card
                key={category.id}
                className="bg-gradient-to-br from-purple-900/40 to-black/40 border-purple-500/30 backdrop-blur-sm hover:border-purple-400/50 transition-all cursor-pointer group"
              >
                <div className="p-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${category.color} bg-opacity-20 flex items-center justify-center mb-3`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-purple-100 font-bold mb-1">{category.name}</h4>
                  <p className="text-purple-300/70 text-xs mb-2 leading-relaxed">
                    {category.description}
                  </p>
                  <div className="flex items-center gap-1 text-purple-400 text-xs">
                    <BookOpen className="w-3 h-3" />
                    <span>{category.articleCount}篇文章</span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/10 transition-all pointer-events-none rounded-xl"></div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Hot Articles */}
      <div className="px-6">
        <h3 className="text-purple-100 text-lg font-bold mb-4 flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-400" />
          <span>热门文章</span>
        </h3>
        <div className="space-y-4">
          {hotArticles.map((article) => (
            <Card
              key={article.id}
              className="bg-gradient-to-br from-purple-900/40 to-black/40 border-purple-500/30 backdrop-blur-sm hover:border-purple-400/50 transition-all cursor-pointer group overflow-hidden"
            >
              <div className="flex gap-4 p-4">
                {/* Image */}
                <div className="relative w-28 h-28 flex-shrink-0 rounded-lg overflow-hidden">
                  <ImageWithFallback
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  {article.isHot && (
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-red-500 text-white text-xs font-bold">
                      HOT
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-purple-100 font-bold mb-2 line-clamp-2">
                    {article.title}
                  </h4>
                  <p className="text-purple-200/70 text-xs mb-3 line-clamp-2 leading-relaxed">
                    {article.summary}
                  </p>
                  <div className="flex items-center gap-3 text-purple-400 text-xs">
                    <span className="px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30">
                      {article.category}
                    </span>
                    <span>📖 {article.readTime}</span>
                    <span>👁️ {article.views}</span>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/10 transition-all pointer-events-none"></div>
            </Card>
          ))}
        </div>
      </div>

      {/* Learning Tips */}
      <div className="px-6 mt-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-900/40 to-indigo-900/30 border-blue-500/30 backdrop-blur-sm">
          <div className="p-5">
            <div className="flex items-start gap-3">
              <div className="text-2xl">💡</div>
              <div className="flex-1">
                <h4 className="text-blue-100 text-lg font-bold mb-3">学习建议</h4>
                <div className="space-y-2 text-sm text-blue-200/90">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5">•</span>
                    <span>从基础知识开始，循序渐进地学习风水理论</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5">•</span>
                    <span>理论结合实践，将所学知识应用到实际生活中</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5">•</span>
                    <span>保持开放心态，风水是经验的总结而非迷信</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5">•</span>
                    <span>遇到疑问可咨询专业风水大师获得指导</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Expert Consultation CTA */}
      <div className="px-6 mb-8">
        <Card className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-purple-500/40 backdrop-blur-sm overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 blur-3xl rounded-full"></div>
          <div className="relative p-6 text-center">
            <div className="text-4xl mb-3">🔮</div>
            <h4 className="text-purple-100 text-lg font-bold mb-2">需要专业指导？</h4>
            <p className="text-purple-200/80 text-sm mb-4">
              我们的风水大师团队随时为您提供一对一咨询服务
            </p>
            <button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 px-4 rounded-full text-sm font-bold transition-all shadow-xl">
              咨询风水大师
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
