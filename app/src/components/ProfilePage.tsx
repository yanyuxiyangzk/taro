import { useState, useEffect } from 'react';
import { Star, BookOpen, Settings, Bell, Shield, Flame, Crown, Award, Coins } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { userService } from '@/services/userService';
import { Achievement as AchievementType } from '@/lib/api/types';
import { LoginModal } from './LoginModal';

const menuItems = [
  { icon: Star, label: '我的收藏', color: 'yellow' },
  { icon: BookOpen, label: '学习记录', color: 'blue' },
  { icon: Bell, label: '消息通知', color: 'purple', badge: '3' },
  { icon: Shield, label: '隐私设置', color: 'green' },
  { icon: Settings, label: '系统设置', color: 'gray' },
];

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [achievements, setAchievements] = useState<AchievementType[]>([]);
  const [isLoadingAchievements, setIsLoadingAchievements] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Fetch achievements on mount
  useEffect(() => {
    const fetchAchievements = async () => {
      if (!user) return;
      
      setIsLoadingAchievements(true);
      try {
        const data = await userService.getUserAchievements();
        setAchievements(data);
      } catch (error) {
        console.error('Failed to fetch achievements:', error);
        // Use mock data as fallback
        setAchievements([
          { id: '1', name: '占卜新手', description: '完成首次占卜', icon: '🎴', unlocked: true },
          { id: '2', name: '风水入门', description: '学习5个风水知识', icon: '🧭', unlocked: true },
          { id: '3', name: '社区活跃', description: '发布10条动态', icon: '💬', unlocked: true },
          { id: '4', name: '神秘探索者', description: '连续签到30天', icon: '🔮', unlocked: false },
        ]);
      } finally {
        setIsLoadingAchievements(false);
      }
    };

    fetchAchievements();
  }, [user]);

  // Calculate experience percentage
  const experiencePercentage = user 
    ? userService.calculateExperiencePercentage(user.experience, user.experienceRequired)
    : 0;

  // Mock stats - in real app, these would come from API
  const stats = [
    { label: '占卜次数', value: '156', icon: Star },
    { label: '学习天数', value: '89', icon: BookOpen },
    { label: '获得勋章', value: achievements.filter(a => a.unlocked).length.toString(), icon: Award },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      // Redirect or show message
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Show loading or login prompt if no user
  if (!user) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black p-6 pb-24 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-4">🔮</div>
            <h2 className="text-purple-200 text-xl mb-2">请先登录</h2>
            <p className="text-purple-300/70 mb-6">登录后查看您的个人资料</p>
            <Button
              onClick={() => setShowLoginModal(true)}
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-2"
            >
              立即登录
            </Button>
          </div>
        </div>
        <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black p-6 pb-24">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Crown className="w-8 h-8 text-yellow-400" />
          <h1 className="text-purple-200">个人中心</h1>
          <Crown className="w-8 h-8 text-yellow-400" />
        </div>
      </div>

      {/* Profile Card */}
      <Card className="bg-gradient-to-br from-purple-900/40 to-black/40 border-purple-500/40 backdrop-blur-sm mb-6 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-red-500/10 blur-3xl rounded-full"></div>
        
        <div className="relative p-6">
          {/* Avatar and Info */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-red-500 flex items-center justify-center text-3xl shadow-lg shadow-purple-500/30">
              {user.avatar || '🔮'}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-purple-100">{user.username}</h2>
                <span className="px-2 py-1 bg-purple-500/30 text-purple-200 text-xs rounded-full border border-purple-400/30">
                  Lv.{user.level}
                </span>
                {user.isVIP && (
                  <span className="px-2 py-1 bg-gradient-to-r from-yellow-500/30 to-amber-500/30 text-yellow-200 text-xs rounded-full border border-yellow-400/30">
                    VIP
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-purple-300/70 text-sm mb-2">
                <Coins className="w-4 h-4" />
                <span>{user.coinBalance} 金币</span>
              </div>
              
              {/* Level Progress */}
              <div className="mt-3">
                <div className="flex justify-between text-xs text-purple-300/60 mb-1">
                  <span>经验值</span>
                  <span>{user.experience}/{user.experienceRequired}</span>
                </div>
                <Progress value={experiencePercentage} className="h-2 bg-purple-950/50">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-red-500 rounded-full transition-all" style={{ width: `${experiencePercentage}%` }}></div>
                </Progress>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Icon className="w-4 h-4 text-purple-400 mr-1" />
                    <span className="text-purple-100 text-xl">{stat.value}</span>
                  </div>
                  <div className="text-purple-300/60 text-xs">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Achievements */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Flame className="w-5 h-5 text-red-400" />
          <h3 className="text-purple-200">我的成就</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {isLoadingAchievements ? (
            <div className="col-span-2 text-center text-purple-300/60 py-8">加载中...</div>
          ) : achievements.length === 0 ? (
            <div className="col-span-2 text-center text-purple-300/60 py-8">暂无成就</div>
          ) : (
            achievements.map((achievement) => (
              <Card
                key={achievement.id}
                className={`p-3 backdrop-blur-sm transition-all ${
                  achievement.unlocked
                    ? 'bg-gradient-to-br from-purple-900/30 to-black/30 border-purple-500/40'
                    : 'bg-black/20 border-purple-500/20 opacity-50'
                }`}
              >
                <div className="flex flex-col items-center text-center gap-2">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                      achievement.unlocked
                        ? 'bg-gradient-to-br from-yellow-500/30 to-red-500/30 shadow-lg shadow-yellow-500/20'
                        : 'bg-purple-900/20'
                    }`}
                  >
                    {achievement.icon || <Award className={`w-6 h-6 ${achievement.unlocked ? 'text-yellow-400' : 'text-purple-400/50'}`} />}
                  </div>
                  <div>
                    <div className="text-purple-100 text-sm mb-1">{achievement.name}</div>
                    <div className="text-purple-300/60 text-xs">{achievement.description}</div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Menu Items */}
      <div className="space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <Card
              key={index}
              className="bg-gradient-to-br from-purple-900/20 to-black/20 border-purple-500/30 backdrop-blur-sm hover:border-purple-400/40 transition-all cursor-pointer"
            >
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-purple-300" />
                  </div>
                  <span className="text-purple-200">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-1 bg-red-500/30 text-red-200 text-xs rounded-full border border-red-400/30">
                    {item.badge}
                  </span>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Logout Button */}
      <div className="mt-6">
        <Button 
          onClick={handleLogout}
          className="w-full bg-gradient-to-r from-purple-900/50 to-red-900/50 border border-purple-500/30 text-purple-200 hover:from-purple-900/70 hover:to-red-900/70 transition-all"
        >
          退出登录
        </Button>
      </div>
    </div>
  );
}
