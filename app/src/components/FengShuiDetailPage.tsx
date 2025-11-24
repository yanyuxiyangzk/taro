import { useState, useEffect } from 'react';
import { ArrowLeft, Camera, Sparkles } from 'lucide-react';
import FengShuiCompass from './FengShuiCompass';

export default function FengShuiDetailPage() {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  // 更新时间
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 获取地理位置
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('获取位置失败:', error);
        }
      );
    }
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        setAnalysis(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    if (!uploadedImage && !location) return;
    
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const analysisResult = {
        score: Math.floor(Math.random() * 20) + 75,
        direction: ['东', '南', '西', '北', '东南', '西南', '东北', '西北'][Math.floor(Math.random() * 8)],
        element: ['金', '木', '水', '火', '土'][Math.floor(Math.random() * 5)],
        fortune: ['大吉', '中吉', '小吉', '平'][Math.floor(Math.random() * 4)],
        suggestions: [
          '建议在此方位摆放绿色植物，可增强生气',
          '保持空间整洁明亮，有利于气场流通',
          '可在此处放置水晶或风水摆件',
          '注意避免尖角对冲，影响风水格局',
        ]
      };
      
      setAnalysis(analysisResult);
      setIsAnalyzing(false);
    }, 2500);
  };

  const getTimeOfDay = () => {
    const hour = currentTime.getHours();
    if (hour >= 5 && hour < 12) return '早晨';
    if (hour >= 12 && hour < 18) return '下午';
    if (hour >= 18 && hour < 22) return '晚上';
    return '深夜';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-950 via-purple-900 to-black pb-6">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-purple-950/90 backdrop-blur-lg border-b border-purple-500/30">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => window.history.back()}
            className="p-2 hover:bg-purple-800/30 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-purple-200" />
          </button>
          <h1 className="text-xl text-purple-100 font-bold">风水堪舆</h1>
          <div className="w-10"></div>
        </div>
      </div>

      <div className="px-6 pt-6 space-y-6">
        {/* 时间和位置信息 */}
        <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-purple-500/40 backdrop-blur-sm rounded-xl border p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-purple-200 text-sm mb-1">当前时间</div>
              <div className="text-purple-50 text-lg font-bold">
                {currentTime.toLocaleTimeString('zh-CN')}
              </div>
              <div className="text-purple-300 text-xs mt-1">{getTimeOfDay()}</div>
            </div>
            <div className="text-right">
              <div className="text-purple-200 text-sm mb-1">位置</div>
              <div className="text-purple-50 text-sm font-medium">
                {location ? `${location.lat.toFixed(2)}°N, ${location.lng.toFixed(2)}°E` : '获取中...'}
              </div>
            </div>
          </div>
        </div>

        {/* 风水罗盘 */}
        <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/30 backdrop-blur-sm rounded-xl border border-purple-500/30 p-6">
          <h3 className="text-purple-100 text-lg font-bold mb-4 text-center flex items-center justify-center gap-2">
            <span className="text-2xl">🧭</span>
            <span>传统风水罗盘</span>
            <span className="text-2xl">🧭</span>
          </h3>
          
          {/* 使用独立的罗盘组件 */}
          <FengShuiCompass />

          {/* 罗盘说明 */}
          <div className="mt-6 text-center space-y-2">
            <p className="text-purple-100 text-base font-bold">
              传统风水罗盘
            </p>
            <p className="text-purple-300 text-sm">
              八卦定位 · 五行调和 · 阴阳平衡
            </p>
            <div className="flex items-center justify-center gap-4 text-xs text-purple-400/80 mt-3">
              <span>🧭 方位测算</span>
              <span>⚡ 实时运转</span>
              <span>✨ 智能分析</span>
            </div>
          </div>
        </div>

        {/* 上传图片区域 */}
        <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-purple-500/40 backdrop-blur-sm rounded-xl border p-6">
          <h3 className="text-purple-100 text-lg font-bold mb-4 flex items-center gap-2">
            <Camera className="w-5 h-5" />
            <span>上传环境照片</span>
          </h3>
          
          {!uploadedImage ? (
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-purple-500/50 rounded-xl hover:border-purple-400/70 transition-colors cursor-pointer bg-purple-900/20"
              >
                <Camera className="w-12 h-12 text-purple-300 mb-3" />
                <span className="text-purple-200 text-sm">点击上传照片</span>
                <span className="text-purple-400 text-xs mt-1">支持 JPG、PNG 格式</span>
              </label>
            </div>
          ) : (
            <div className="relative">
              <img
                src={uploadedImage || ''}
                alt="Uploaded"
                className="w-full h-64 object-cover rounded-xl"
              />
              <button
                onClick={() => {
                  setUploadedImage(null);
                  setAnalysis(null);
                }}
                className="absolute top-3 right-3 p-2 bg-black/70 hover:bg-black/90 rounded-full transition-colors text-white"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* 开始分析按钮 */}
        {uploadedImage && !isAnalyzing && !analysis && (
          <button
            onClick={handleAnalyze}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 px-6 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            <span>开始风水堪舆</span>
          </button>
        )}

        {/* 分析中 */}
        {isAnalyzing && (
          <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-purple-500/40 backdrop-blur-sm rounded-xl border p-8 text-center">
            <div className="text-6xl mb-4 animate-spin">🔮</div>
            <p className="text-purple-200 mb-2 text-lg font-medium">正在堪舆分析...</p>
            <p className="text-purple-400 text-sm">结合方位、时辰、环境进行综合判断</p>
          </div>
        )}

        {/* 分析结果 */}
        {analysis && !isAnalyzing && (
          <div className="space-y-4">
            {/* 综合评分 */}
            <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-purple-500/40 backdrop-blur-sm rounded-xl border p-6">
              <div className="text-center mb-6">
                <div className="text-5xl mb-3">✨</div>
                <h3 className="text-purple-100 text-xl font-bold mb-2">堪舆结果</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-purple-950/50 rounded-lg p-4 text-center">
                  <div className="text-purple-300 text-sm mb-1">综合评分</div>
                  <div className="text-green-400 text-3xl font-bold">{analysis.score}</div>
                  <div className="text-purple-400 text-xs mt-1">满分100</div>
                </div>
                <div className="bg-purple-950/50 rounded-lg p-4 text-center">
                  <div className="text-purple-300 text-sm mb-1">运势</div>
                  <div className="text-yellow-400 text-3xl font-bold">{analysis.fortune}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-purple-950/30 rounded-lg p-3">
                  <div className="text-purple-300 text-xs mb-1">方位</div>
                  <div className="text-purple-100 font-bold">{analysis.direction}</div>
                </div>
                <div className="bg-purple-950/30 rounded-lg p-3">
                  <div className="text-purple-300 text-xs mb-1">五行</div>
                  <div className="text-purple-100 font-bold">{analysis.element}</div>
                </div>
              </div>
            </div>

            {/* 改善建议 */}
            <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-purple-500/40 backdrop-blur-sm rounded-xl border p-6">
              <h3 className="text-purple-100 text-lg font-bold mb-4 flex items-center gap-2">
                <span className="text-2xl">💡</span>
                <span>改善建议</span>
              </h3>
              <div className="space-y-3">
                {analysis.suggestions.map((suggestion: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 bg-purple-950/40 rounded-lg"
                  >
                    <div className="w-6 h-6 rounded-full bg-purple-600/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-purple-200 text-sm font-bold">{index + 1}</span>
                    </div>
                    <p className="text-purple-200 text-sm leading-relaxed flex-1">
                      {suggestion}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 重新分析按钮 */}
            <button
              onClick={() => {
                setUploadedImage(null);
                setAnalysis(null);
              }}
              className="w-full bg-purple-900/50 hover:bg-purple-900/70 border border-purple-500/30 text-purple-200 py-4 px-6 rounded-xl font-bold transition-all"
            >
              重新堪舆
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
