import { UserProfile, Achievement, Post, Expert } from '@/lib/api/types';

/**
 * Mock Data Service
 * 提供模拟数据用于开发和测试
 */

// 演示用户账号
export const DEMO_USERS = {
  user1: {
    id: 'demo-user-1',
    username: '神秘行者',
    avatar: '🔮',
    email: 'demo@tarot.app',
    zodiacSign: '摩羯座',
    birthDate: '1990-01-15',
    level: 8,
    experience: 680,
    experienceRequired: 1000,
    coinBalance: 1250,
    isVIP: true,
    vipTier: 'monthly' as const,
    vipExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: '2024-01-01T00:00:00Z',
    lastLoginAt: new Date().toISOString(),
  },
  user2: {
    id: 'demo-user-2',
    username: '星辰占卜师',
    avatar: '⭐',
    email: 'star@tarot.app',
    zodiacSign: '双子座',
    birthDate: '1995-06-10',
    level: 15,
    experience: 2340,
    experienceRequired: 3000,
    coinBalance: 5680,
    isVIP: true,
    vipTier: 'annual' as const,
    vipExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: '2023-06-15T00:00:00Z',
    lastLoginAt: new Date().toISOString(),
  },
  user3: {
    id: 'demo-user-3',
    username: '风水学徒',
    avatar: '🧭',
    email: 'fengshui@tarot.app',
    zodiacSign: '天秤座',
    birthDate: '1998-10-05',
    level: 3,
    experience: 120,
    experienceRequired: 500,
    coinBalance: 50,
    isVIP: false,
    createdAt: '2024-11-01T00:00:00Z',
    lastLoginAt: new Date().toISOString(),
  },
};

// Mock 成就数据
export const MOCK_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-1',
    name: '占卜新手',
    description: '完成首次占卜',
    icon: '🎴',
    unlocked: true,
    unlockedAt: '2024-01-05T10:30:00Z',
  },
  {
    id: 'ach-2',
    name: '风水入门',
    description: '学习5个风水知识',
    icon: '🧭',
    unlocked: true,
    unlockedAt: '2024-01-10T14:20:00Z',
  },
  {
    id: 'ach-3',
    name: '社区活跃',
    description: '发布10条动态',
    icon: '💬',
    unlocked: true,
    unlockedAt: '2024-02-01T09:15:00Z',
  },
  {
    id: 'ach-4',
    name: '神秘探索者',
    description: '连续签到30天',
    icon: '🔮',
    unlocked: false,
    progress: 18,
    requirement: 30,
  },
  {
    id: 'ach-5',
    name: '塔罗大师',
    description: '完成100次塔罗占卜',
    icon: '🃏',
    unlocked: false,
    progress: 45,
    requirement: 100,
  },
  {
    id: 'ach-6',
    name: '慷慨赞助者',
    description: '累计充值1000金币',
    icon: '💰',
    unlocked: true,
    unlockedAt: '2024-03-15T16:45:00Z',
  },
];

// Mock 社区帖子
export const MOCK_POSTS: Post[] = [
  {
    id: 'post-1',
    authorId: 'user-1',
    authorName: '紫薇星占师',
    authorAvatar: '🔮',
    authorLevel: '大师',
    title: '今日塔罗牌阵分享 - 三角恋人牌',
    content: '今天为大家分享一个关于感情的牌阵解读，三张牌分别代表过去、现在和未来...',
    images: ['https://images.unsplash.com/photo-1671013033034-5ea58e9c5008?w=400'],
    tags: ['塔罗', '感情', '牌阵'],
    likes: 234,
    comments: 56,
    views: 1203,
    isHot: true,
    isPinned: false,
    status: 'active',
    createdAt: '2024-11-18T10:30:00Z',
    updatedAt: '2024-11-18T10:30:00Z',
  },
  {
    id: 'post-2',
    authorId: 'user-2',
    authorName: '风水堪舆师',
    authorAvatar: '🏔️',
    authorLevel: '专家',
    title: '办公室风水布局要点',
    content: '办公桌的摆放位置非常重要，今天分享几个提升事业运的小技巧...',
    images: [],
    tags: ['风水', '办公室', '事业运'],
    likes: 189,
    comments: 42,
    views: 856,
    isHot: true,
    isPinned: false,
    status: 'active',
    createdAt: '2024-11-17T15:20:00Z',
    updatedAt: '2024-11-17T15:20:00Z',
  },
];

// Mock 达人数据
export const MOCK_EXPERTS: Expert[] = [
  {
    id: 'expert-1',
    name: '启迪迪迪',
    avatar: 'https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?w=300',
    responseTime: '32s',
    lastActive: '37分钟',
    description: '不是告诉你你还，而是解...',
    price: 9,
    isOnline: true,
    gender: 'female',
    rating: 4.8,
    specializations: ['塔罗', '情感咨询'],
  },
  {
    id: 'expert-2',
    name: '梁老师',
    avatar: 'https://images.unsplash.com/photo-1672685667592-0392f458f46f?w=300',
    responseTime: '36s',
    lastActive: '533分钟',
    description: '婚姻复合、情感疗愈、恋爱...',
    price: 15,
    isOnline: true,
    gender: 'male',
    rating: 4.9,
    specializations: ['婚姻', '情感疗愈'],
  },
];

/**
 * Mock API 服务
 */
export class MockApiService {
  /**
   * 模拟登录
   */
  static async login(email: string, password: string): Promise<UserProfile> {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 500));

    // 查找匹配的演示用户
    const user = Object.values(DEMO_USERS).find(u => u.email === email);

    if (!user) {
      throw new Error('用户不存在');
    }

    // 简单的密码验证（演示用）
    if (password !== 'demo123') {
      throw new Error('密码错误');
    }

    return user;
  }

  /**
   * 获取用户成就
   */
  static async getUserAchievements(userId: string): Promise<Achievement[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_ACHIEVEMENTS;
  }

  /**
   * 获取社区帖子
   */
  static async getPosts(page: number = 1, pageSize: number = 10): Promise<Post[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    return MOCK_POSTS;
  }

  /**
   * 获取达人列表
   */
  static async getExperts(searchQuery?: string): Promise<Expert[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (searchQuery) {
      return MOCK_EXPERTS.filter(expert => 
        expert.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return MOCK_EXPERTS;
  }

  /**
   * 获取每日运势
   */
  static async getDailyFortune(zodiacSign: string) {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // 生成随机运势值
    const generateScore = () => Math.floor(Math.random() * 30) + 70; // 70-100
    
    return {
      date: new Date().toISOString(),
      zodiacSign,
      overallScore: generateScore(),
      stats: {
        health: generateScore(),
        love: generateScore(),
        career: generateScore(),
        wealth: generateScore(),
      },
      description: `今日的感情运势显示，你与伴侣之间的情感将愈发醇厚深沉。共同参与一场刺激的活动，能够增进彼此的了解和信任。`,
      luckyColor: '紫色',
      luckyNumber: Math.floor(Math.random() * 9) + 1,
    };
  }
}

/**
 * 快速登录演示账号
 */
export function quickDemoLogin(userKey: keyof typeof DEMO_USERS = 'user1') {
  const user = DEMO_USERS[userKey];
  
  // 存储到 localStorage
  localStorage.setItem('tarot_current_user', JSON.stringify(user));
  localStorage.setItem('tarot_auth_token', `demo-token-${Date.now()}`);
  localStorage.setItem('tarot_refresh_token', `demo-refresh-${Date.now()}`);
  
  // 刷新页面
  window.location.reload();
}
