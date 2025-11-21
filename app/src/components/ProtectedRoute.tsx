import { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black flex items-center justify-center">
        <div className="text-purple-200">加载中...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    if (fallback) {
      return <>{fallback}</>;
    }

    // Default fallback - show login prompt
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black flex items-center justify-center p-6">
        <div className="text-center">
          <div className="text-4xl mb-4">🔮</div>
          <h2 className="text-purple-200 text-xl mb-2">需要登录</h2>
          <p className="text-purple-300/70 mb-4">请登录以访问此功能</p>
          <button
            onClick={() => {
              // In a real app, this would navigate to login page
              window.location.href = '/login';
            }}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all"
          >
            前往登录
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
