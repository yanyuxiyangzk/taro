import { useState } from 'react';
import { X } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { DEMO_USERS, quickDemoLogin } from '@/services/mockDataService';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login({
        email: formData.email,
        password: formData.password,
      });
      onClose();
    } catch (err: any) {
      setError(err.message || '登录失败，请检查您的凭据');
    } finally {
      setIsLoading(false);
    }
  };

  // Demo login function for testing
  const handleDemoLogin = (userKey: keyof typeof DEMO_USERS) => {
    setIsLoading(true);
    quickDemoLogin(userKey);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <Card className="w-full max-w-md bg-gradient-to-br from-purple-900/90 to-black/90 border-purple-500/40 backdrop-blur-lg relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-purple-300 hover:text-purple-100 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="text-4xl mb-3">🔮</div>
            <h2 className="text-purple-100 text-2xl mb-2">欢迎回来</h2>
            <p className="text-purple-300/70 text-sm">登录以访问您的神秘世界</p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/40 rounded-lg text-red-200 text-sm">
              {error}
            </div>
          )}

          {/* Login form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-purple-200 text-sm mb-2">邮箱</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
                className="w-full bg-purple-900/30 border-purple-500/30 text-purple-100 placeholder:text-purple-400/50"
                required
              />
            </div>

            <div>
              <label className="block text-purple-200 text-sm mb-2">密码</label>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full bg-purple-900/30 border-purple-500/30 text-purple-100 placeholder:text-purple-400/50"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white"
            >
              {isLoading ? '登录中...' : '登录'}
            </Button>
          </form>

          {/* Demo login */}
          <div className="mt-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-purple-500/30"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gradient-to-br from-purple-900/90 to-black/90 text-purple-300/70">
                  演示账号
                </span>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              {/* 演示账号 1 */}
              <button
                type="button"
                onClick={() => handleDemoLogin('user1')}
                disabled={isLoading}
                className="w-full p-3 bg-purple-900/30 border border-purple-500/30 rounded-lg hover:bg-purple-900/50 transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{DEMO_USERS.user1.avatar}</div>
                  <div className="flex-1">
                    <div className="text-purple-100 text-sm font-medium">{DEMO_USERS.user1.username}</div>
                    <div className="text-purple-300/60 text-xs">
                      Lv.{DEMO_USERS.user1.level} · {DEMO_USERS.user1.coinBalance} 金币 · {DEMO_USERS.user1.isVIP ? 'VIP' : '普通用户'}
                    </div>
                  </div>
                </div>
              </button>

              {/* 演示账号 2 */}
              <button
                type="button"
                onClick={() => handleDemoLogin('user2')}
                disabled={isLoading}
                className="w-full p-3 bg-purple-900/30 border border-purple-500/30 rounded-lg hover:bg-purple-900/50 transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{DEMO_USERS.user2.avatar}</div>
                  <div className="flex-1">
                    <div className="text-purple-100 text-sm font-medium">{DEMO_USERS.user2.username}</div>
                    <div className="text-purple-300/60 text-xs">
                      Lv.{DEMO_USERS.user2.level} · {DEMO_USERS.user2.coinBalance} 金币 · {DEMO_USERS.user2.isVIP ? 'VIP' : '普通用户'}
                    </div>
                  </div>
                </div>
              </button>

              {/* 演示账号 3 */}
              <button
                type="button"
                onClick={() => handleDemoLogin('user3')}
                disabled={isLoading}
                className="w-full p-3 bg-purple-900/30 border border-purple-500/30 rounded-lg hover:bg-purple-900/50 transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{DEMO_USERS.user3.avatar}</div>
                  <div className="flex-1">
                    <div className="text-purple-100 text-sm font-medium">{DEMO_USERS.user3.username}</div>
                    <div className="text-purple-300/60 text-xs">
                      Lv.{DEMO_USERS.user3.level} · {DEMO_USERS.user3.coinBalance} 金币 · {DEMO_USERS.user3.isVIP ? 'VIP' : '普通用户'}
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Register link */}
          <p className="mt-4 text-center text-purple-300/70 text-sm">
            还没有账号？{' '}
            <button className="text-purple-300 hover:text-purple-100 transition-colors">
              立即注册
            </button>
          </p>
        </div>
      </Card>
    </div>
  );
}
