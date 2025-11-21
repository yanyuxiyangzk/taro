import { useState } from 'react';
import { Heart, MessageCircle, Star, Flame, TrendingUp, Search, Volume2, Clock } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ImageWithFallback } from './figma/ImageWithFallback';

const posts = [
  {
    id: 1,
    user: '紫薇星占师',
    avatar: '🔮',
    level: '大师',
    title: '今日塔罗牌阵分享 - 三角恋人牌',
    content: '今天为大家分享一个关于感情的牌阵解读，三张牌分别代表过去、现在和未来...',
    image: 'https://images.unsplash.com/photo-1671013033034-5ea58e9c5008?w=400',
    likes: 234,
    comments: 56,
    isHot: true,
  },
  {
    id: 2,
    user: '风水堪舆师',
    avatar: '🏔️',
    level: '专家',
    title: '办公室风水布局要点',
    content: '办公桌的摆放位置非常重要，今天分享几个提升事业运的小技巧...',
    image: null,
    likes: 189,
    comments: 42,
    isHot: true,
  },
  {
    id: 3,
    user: '月光女巫',
    avatar: '🌙',
    level: '高级',
    title: '满月仪式分享',
    content: '在满月之夜进行的能量净化仪式，帮助释放负面能量，吸引正向力量...',
    image: 'https://images.unsplash.com/photo-1602498456745-e9503b30470b?w=400',
    likes: 312,
    comments: 78,
    isHot: false,
  },
  {
    id: 4,
    user: '星座解析',
    avatar: '⭐',
    level: '专家',
    title: '本周星象分析',
    content: '水星逆行即将结束，本周各星座需要注意的事项...',
    image: null,
    likes: 156,
    comments: 34,
    isHot: false,
  },
];

const topics = [
  { name: '塔罗占卜', count: '1.2k', color: 'purple' },
  { name: '风水布局', count: '856', color: 'blue' },
  { name: '星座运势', count: '2.3k', color: 'pink' },
  { name: '水晶能量', count: '645', color: 'cyan' },
];

const experts = [
  {
    id: 1,
    name: '启迪迪迪',
    avatar: 'https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHdvbWFufGVufDF8fHx8MTc2MjczNDczNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    responseTime: '32s',
    lastActive: '37分钟',
    description: '"不是告诉你你还，而是解...',
    price: '咨询￥9起/条',
    isOnline: true,
    gender: 'female',
  },
  {
    id: 2,
    name: '梁老师',
    avatar: 'https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMG1hbnxlbnwxfHx8fDE3NjI2ODcyNjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    responseTime: '36s',
    lastActive: '533分钟',
    description: '婚姻复合、情感疗愈、恋爱...',
    price: '咨询￥9起/条',
    isOnline: true,
    gender: 'male',
  },
  {
    id: 3,
    name: '南方',
    avatar: 'https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?w=300',
    responseTime: '36s',
    lastActive: '854分钟',
    description: '我可以帮助你走出失恋、走...',
    price: '咨询￥9起/条',
    isOnline: true,
    gender: 'female',
  },
  {
    id: 4,
    name: '安洛',
    avatar: 'https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?w=350',
    responseTime: '27s',
    lastActive: '82分钟',
    description: '解读瞬间的符号，更懂你心...',
    price: '咨询￥9起/条',
    isOnline: true,
    gender: 'female',
  },
  {
    id: 5,
    name: '锦书',
    avatar: 'https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?w=450',
    responseTime: '10s',
    lastActive: '44分钟',
    description: '锦书为你服务',
    price: '咨询￥9起/条',
    isOnline: true,
    gender: 'female',
  },
  {
    id: 6,
    name: '皓夜精灵',
    avatar: 'https://images.unsplash.com/photo-1672685667592-0392f458f46f?w=300',
    responseTime: '5s',
    lastActive: '33分钟',
    description: '同是天涯沦落人，相逢何必...',
    price: '咨询￥9起/条',
    isOnline: true,
    gender: 'male',
  },
];

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<'community' | 'experts'>('community');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black pb-24">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Star className="w-8 h-8 text-yellow-400 animate-pulse" />
          <h1 className="text-purple-200">神秘社区</h1>
          <Star className="w-8 h-8 text-yellow-400 animate-pulse" />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab('community')}
            className={`flex-1 py-2 rounded-lg transition-all ${
              activeTab === 'community'
                ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/30'
                : 'bg-purple-900/30 text-purple-300 border border-purple-500/30'
            }`}
          >
            社区动态
          </button>
          <button
            onClick={() => setActiveTab('experts')}
            className={`flex-1 py-2 rounded-lg transition-all ${
              activeTab === 'experts'
                ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/30'
                : 'bg-purple-900/30 text-purple-300 border border-purple-500/30'
            }`}
          >
            达人咨询
          </button>
        </div>
      </div>

      {activeTab === 'community' ? (
        <div className="px-6">
          {/* Hot Topics */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Flame className="w-5 h-5 text-red-400" />
              <h3 className="text-purple-200">热门话题</h3>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {topics.map((topic, index) => (
                <Badge
                  key={index}
                  className={`bg-gradient-to-r from-${topic.color}-600/30 to-${topic.color}-700/30 border-${topic.color}-500/40 text-${topic.color}-200 px-4 py-2 whitespace-nowrap hover:from-${topic.color}-600/40 hover:to-${topic.color}-700/40 transition-all cursor-pointer`}
                >
                  #{topic.name} {topic.count}
                </Badge>
              ))}
            </div>
          </div>

          {/* Posts */}
          <div className="space-y-4">
            {posts.map((post) => (
              <Card
                key={post.id}
                className="bg-gradient-to-br from-purple-900/30 to-black/30 border-purple-500/30 backdrop-blur-sm hover:border-purple-400/40 transition-all overflow-hidden"
              >
                {/* User Info */}
                <div className="p-4 pb-3">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-red-500 flex items-center justify-center text-xl">
                      {post.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-purple-100">{post.user}</span>
                        <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs">
                          {post.level}
                        </Badge>
                        {post.isHot && (
                          <TrendingUp className="w-4 h-4 text-red-400" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mb-3">
                    <h4 className="text-purple-100 mb-2">{post.title}</h4>
                    <p className="text-purple-300/70 text-sm line-clamp-2">
                      {post.content}
                    </p>
                  </div>

                  {/* Image */}
                  {post.image && (
                    <div className="mb-3 -mx-4">
                      <img
                        src={post.image}
                        alt=""
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-6 text-purple-300/60 text-sm pt-3 border-t border-purple-500/20">
                    <button className="flex items-center gap-2 hover:text-red-400 transition-colors">
                      <Heart className="w-4 h-4" />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-purple-300 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.comments}</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-yellow-400 transition-colors ml-auto">
                      <Star className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Mystical Quote */}
          <Card className="mt-6 bg-gradient-to-br from-red-950/20 to-purple-950/20 border-red-500/30 p-4 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-3xl rounded-full"></div>
            <div className="relative flex items-start gap-3">
              <Flame className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
              <div>
                <p className="text-purple-200/90 text-sm italic leading-relaxed">
                  "宇宙的奥秘就在我们身边，只要用心感受，每个人都能与神秘力量产生共鸣。"
                </p>
                <p className="text-purple-300/50 text-xs mt-2">— 古代占星师</p>
              </div>
            </div>
          </Card>
        </div>
      ) : (
        <div className="px-6">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Input
                type="text"
                placeholder="请输入昵称"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-purple-900/30 border-purple-500/30 text-purple-200 placeholder:text-purple-400/50 pr-12 h-12 rounded-full"
              />
              <button className="absolute right-1 top-1 bottom-1 px-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-all">
                <Search className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Experts List */}
          <div className="space-y-3">
            {experts.map((expert) => (
              <Card
                key={expert.id}
                className="bg-gradient-to-br from-purple-900/40 to-black/40 border-purple-500/40 backdrop-blur-sm overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      <ImageWithFallback
                        src={expert.avatar}
                        alt={expert.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      {expert.isOnline && (
                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-black"></div>
                      )}
                      <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center text-white text-xs border-2 border-black">
                        {expert.gender === 'female' ? '♀' : '♂'}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-purple-100">{expert.name}</h4>
                        <div className="flex items-center gap-1 text-purple-300/70 text-sm">
                          <Volume2 className="w-3 h-3" />
                          <span>{expert.responseTime}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-purple-300/60 text-xs mb-2">
                        <Clock className="w-3 h-3" />
                        <span>最近运送：{expert.lastActive}</span>
                      </div>

                      <div className="flex items-center gap-2 mb-2">
                        {expert.isOnline && (
                          <span className="text-green-400 text-xs flex items-center gap-1">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                            在线
                          </span>
                        )}
                      </div>

                      <p className="text-purple-300/70 text-sm line-clamp-1 mb-2">
                        {expert.description}
                      </p>

                      <div className="flex items-center gap-2 text-xs">
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded border border-blue-500/30">
                          {expert.price}
                        </span>
                      </div>
                    </div>

                    {/* Consult Button */}
                    <div className="flex-shrink-0">
                      <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-2 h-auto shadow-lg shadow-purple-500/30">
                        咨询TA
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Tips */}
          <Card className="mt-6 bg-gradient-to-br from-yellow-950/20 to-purple-950/20 border-yellow-500/30 p-4 backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-yellow-200 mb-2">咨询提示</h4>
                <p className="text-purple-200/80 text-sm leading-relaxed">
                  专业达人提供一对一咨询服务，费用根据达人等级和服务内容而定。请选择适合您的达人进行咨询。
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
