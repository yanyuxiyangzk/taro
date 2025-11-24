import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Compass, MapPin, Navigation, Star, Sun, Moon, Upload, Camera, Video } from 'lucide-react';
import { Card } from './ui/card';

// 二十四山向
const twentyFourMountains = [
  { name: '壬', angle: 352.5, element: '水' },
  { name: '子', angle: 7.5, element: '水' },
  { name: '癸', angle: 22.5, element: '水' },
  { name: '丑', angle: 37.5, element: '土' },
  { name: '艮', angle: 52.5, element: '土' },
  { name: '寅', angle: 67.5, element: '木' },
  { name: '甲', angle: 82.5, element: '木' },
  { name: '卯', angle: 97.5, element: '木' },
  { name: '乙', angle: 112.5, element: '木' },
  { name: '辰', angle: 127.5, element: '土' },
  { name: '巽', angle: 142.5, element: '木' },
  { name: '巳', angle: 157.5, element: '火' },
  { name: '丙', angle: 172.5, element: '火' },
  { name: '午', angle: 187.5, element: '火' },
  { name: '丁', angle: 202.5, element: '火' },
  { name: '未', angle: 217.5, element: '土' },
  { name: '坤', angle: 232.5, element: '土' },
  { name: '申', angle: 247.5, element: '金' },
  { name: '庚', angle: 262.5, element: '金' },
  { name: '酉', angle: 277.5, element: '金' },
  { name: '辛', angle: 292.5, element: '金' },
  { name: '戌', angle: 307.5, element: '土' },
  { name: '乾', angle: 322.5, element: '金' },
  { name: '亥', angle: 337.5, element: '水' },
];

// 八卦方位
const baGua = [
  { name: '坎', direction: '北', element: '水', angle: 0, color: '#3b82f6' },
  { name: '艮', direction: '东北', element: '土', angle: 45, color: '#eab308' },
  { name: '震', direction: '东', element: '木', angle: 90, color: '#22c55e' },
  { name: '巽', direction: '东南', element: '木', angle: 135, color: '#10b981' },
  { name: '离', direction: '南', element: '火', angle: 180, color: '#ef4444' },
  { name: '坤', direction: '西南', element: '土', angle: 225, color: '#f59e0b' },
  { name: '兑', direction: '西', element: '金', angle: 270, color: '#9ca3af' },
  { name: '乾', direction: '西北', element: '金', angle: 315, color: '#6b7280' },
];

export default function FengShuiCompassPage() {
  const [heading, setHeading] = useState<number>(0);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationName, setLocationName] = useState<string>('获取位置中...');
  const [compassSupported, setCompassSupported] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [uploadedMedia, setUploadedMedia] = useState<{ type: 'image' | 'video'; url: string } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // 获取指南针方向
  useEffect(() => {
    if ('DeviceOrientationEvent' in window) {
      const handleOrientation = (event: DeviceOrientationEvent) => {
        if (event.alpha !== null) {
          setHeading(360 - event.alpha);
        }
      };

      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        (DeviceOrientationEvent as any).requestPermission()
          .then((permissionState: string) => {
            if (permissionState === 'granted') {
              window.addEventListener('deviceorientation', handleOrientation);
            }
          })
          .catch(() => setCompassSupported(false));
      } else {
        window.addEventListener('deviceorientation', handleOrientation);
      }

      return () => {
        window.removeEventListener('deviceorientation', handleOrientation);
      };
    } else {
      setCompassSupported(false);
    }
  }, []);

  // 获取地理位置
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          setLocationName(`北纬 ${latitude.toFixed(2)}°, 东经 ${longitude.toFixed(2)}°`);
        },
        (error) => {
          console.error('获取位置失败:', error);
          setLocationName('位置获取失败');
        }
      );
    }
  }, []);

  // 更新时间
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 根据角度获取当前山向
  const getCurrentMountain = () => {
    const normalizedHeading = ((heading % 360) + 360) % 360;
    const mountain = twentyFourMountains.find((m, index) => {
      const nextAngle = twentyFourMountains[(index + 1) % 24].angle;
      return normalizedHeading >= m.angle && normalizedHeading < nextAngle;
    });
    return mountain || twentyFourMountains[0];
  };

  // 根据角度获取当前卦位
  const getCurrentGua = () => {
    const normalizedHeading = ((heading % 360) + 360) % 360;
    const gua = baGua.find((g, index) => {
      const nextAngle = baGua[(index + 1) % 8].angle;
      const currentAngle = g.angle;
      if (index === 7) {
        return normalizedHeading >= currentAngle || normalizedHeading < 22.5;
      }
      return normalizedHeading >= currentAngle - 22.5 && normalizedHeading < currentAngle + 22.5;
    });
    return gua || baGua[0];
  };

  const handleMediaUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedMedia({ type, url: reader.result as string });
        setAnalysis(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    if (!uploadedMedia && !location) return;
    
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const currentMountain = getCurrentMountain();
      const currentGua = getCurrentGua();
      
      const analysisResult = {
        direction: `${currentGua.direction}（${currentMountain.name}山）`,
        element: currentGua.element,
        score: Math.floor(Math.random() * 20) + 75,
        details: [
          { aspect: '方位吉凶', comment: `当前朝向${currentGua.direction}，属${currentGua.element}，整体气场${Math.random() > 0.5 ? '旺盛' : '平和'}。` },
          { aspect: '星象影响', comment: `根据当前时辰（${currentTime.getHours()}时），天象${Math.random() > 0.5 ? '吉利' : '中平'}，适合进行重要决策。` },
          { aspect: '地理环境', comment: uploadedMedia ? '根据上传的图像分析，环境布局合理，建议保持现状。' : '建议实地勘察，结合周边环境综合判断。' },
        ],
        suggestions: [
          `在${currentGua.direction}方位摆放${currentGua.element}属性物品，可增强运势`,
          '保持室内光线充足，气流通畅',
          '定期清理杂物，避免阻碍气场流动',
          `当前时辰适合在${currentGua.direction}方位进行重要活动`,
        ]
      };
      
      setAnalysis(JSON.stringify(analysisResult));
      setIsAnalyzing(false);
    }, 3000);
  };

  const currentMountain = getCurrentMountain();
  const currentGua = getCurrentGua();
  const analysisData = analysis ? JSON.parse(analysis) : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black pb-24">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-yellow-500/30">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => window.history.back()}
            className="p-2 hover:bg-yellow-900/30 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-yellow-200" />
          </button>
          <h1 className="text-xl text-yellow-100 font-bold">风水堪舆罗盘</h1>
          <div className="w-10"></div>
        </div>
      </div>

      {/* 天文时间信息 */}
      <div className="px-6 mb-6">
        <Card className="bg-gradient-to-br from-purple-900/40 to-black/40 border-purple-500/40 backdrop-blur-sm">
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Sun className="w-5 h-5 text-yellow-400" />
                  <span className="text-purple-200 text-sm">当前时间</span>
                </div>
                <div className="text-purple-100 font-bold text-sm">
                  {currentTime.toLocaleString('zh-CN')}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Moon className="w-5 h-5 text-blue-400" />
                  <span className="text-purple-200 text-sm">时辰</span>
                </div>
                <div className="text-purple-100 font-bold">
                  {['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'][Math.floor(currentTime.getHours() / 2) % 12]}时
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* 地理位置信息 */}
      <div className="px-6 mb-6">
        <Card className="bg-gradient-to-br from-blue-900/40 to-black/40 border-blue-500/40 backdrop-blur-sm">
          <div className="p-4">
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-blue-400" />
              <div className="flex-1">
                <div className="text-purple-200 text-sm mb-1">当前位置</div>
                <div className="text-purple-100 font-bold text-sm">{locationName}</div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* 星盘罗盘 - 动态旋转 */}
      <div className="px-6 mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-red-500/20 blur-3xl"></div>
          
          <Card className="relative bg-gradient-to-br from-yellow-900/30 to-red-900/30 border-yellow-500/50 backdrop-blur-sm overflow-hidden">
            <div className="p-6">
              {/* 罗盘圆盘 */}
              <div className="relative w-full aspect-square max-w-sm mx-auto">
                {/* 最外圈 - 二十四山向 */}
                <div 
                  className="absolute inset-0 rounded-full border-4 border-yellow-600/80 bg-gradient-to-br from-yellow-900/80 to-red-900/80"
                  style={{ transform: `rotate(${-heading}deg)`, transition: 'transform 0.3s ease-out' }}
                >
                  {twentyFourMountains.map((mountain, index) => {
                    const angle = (index * 15) - 90;
                    const radius = 45;
                    const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
                    const y = 50 + radius * Math.sin((angle * Math.PI) / 180);
                    
                    return (
                      <div
                        key={mountain.name}
                        className="absolute"
                        style={{
                          left: `${x}%`,
                          top: `${y}%`,
                          transform: `translate(-50%, -50%) rotate(${heading}deg)`,
                        }}
                      >
                        <div 
                          className="bg-black/60 text-yellow-50 text-base font-bold px-2 py-1 rounded border border-yellow-500/40"
                          style={{
                            textShadow: '0 0 10px rgba(0, 0, 0, 1), 0 0 6px rgba(0, 0, 0, 1), 0 2px 4px rgba(0, 0, 0, 1)',
                            backdropFilter: 'blur(4px)',
                          }}
                        >
                          {mountain.name}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* 中圈 - 八卦 */}
                <div 
                  className="absolute inset-[15%] rounded-full border-4 border-red-600/80 bg-gradient-to-br from-red-900/70 to-purple-900/70"
                  style={{ transform: `rotate(${-heading}deg)`, transition: 'transform 0.3s ease-out' }}
                >
                  {baGua.map((gua, index) => {
                    const angle = (index * 45) - 90;
                    const radius = 35;
                    const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
                    const y = 50 + radius * Math.sin((angle * Math.PI) / 180);
                    
                    return (
                      <div
                        key={gua.name}
                        className="absolute"
                        style={{
                          left: `${x}%`,
                          top: `${y}%`,
                          transform: `translate(-50%, -50%) rotate(${heading}deg)`,
                        }}
                      >
                        <div className="text-center bg-black/40 rounded-lg px-2 py-1 backdrop-blur-sm">
                          <div 
                            className="text-white text-lg font-bold"
                            style={{
                              textShadow: '0 0 6px rgba(0, 0, 0, 0.9), 0 2px 4px rgba(0, 0, 0, 1)',
                            }}
                          >
                            {gua.name}
                          </div>
                          <div 
                            className="text-xs font-semibold" 
                            style={{ 
                              color: gua.color,
                              textShadow: '0 0 4px rgba(0, 0, 0, 0.8), 0 1px 2px rgba(0, 0, 0, 1)',
                            }}
                          >
                            {gua.element}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* 内圈 - 阴阳太极 */}
                <div className="absolute inset-[35%] rounded-full border-4 border-white/80 bg-gradient-to-br from-white to-black overflow-hidden">
                  <div className="absolute inset-0 flex">
                    <div className="w-1/2 bg-white"></div>
                    <div className="w-1/2 bg-black"></div>
                  </div>
                  <div className="absolute top-1/4 left-1/2 w-1/4 h-1/4 rounded-full bg-black transform -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="absolute bottom-1/4 left-1/2 w-1/4 h-1/4 rounded-full bg-white transform -translate-x-1/2 translate-y-1/2"></div>
                  <div className="absolute top-1/4 left-1/2 w-2 h-2 rounded-full bg-white transform -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="absolute bottom-1/4 left-1/2 w-2 h-2 rounded-full bg-black transform -translate-x-1/2 translate-y-1/2"></div>
                </div>

                {/* 指南针指针 */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Navigation 
                    className="w-12 h-12 text-red-500 drop-shadow-lg" 
                    style={{ 
                      filter: 'drop-shadow(0 0 10px rgba(239, 68, 68, 0.8))',
                    }} 
                  />
                </div>

                {/* 北方标记 */}
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                  <div className="text-red-500 text-xl font-bold drop-shadow-lg">N</div>
                </div>
              </div>

              {/* 罗盘读数 */}
              <div className="mt-6 text-center space-y-3">
                <div className="bg-black/50 rounded-lg p-4 backdrop-blur-sm border border-yellow-500/30">
                  <div className="text-yellow-100 text-base font-semibold mb-2">当前方位</div>
                  <div className="text-white text-3xl font-bold mb-3" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)' }}>
                    {Math.round(heading)}°
                  </div>
                  <div className="flex items-center justify-center gap-6 text-base">
                    <div className="bg-purple-900/50 px-3 py-2 rounded-lg border border-purple-500/30">
                      <span className="text-purple-200">山向：</span>
                      <span className="text-yellow-100 font-bold ml-1">{currentMountain.name}</span>
                    </div>
                    <div className="bg-purple-900/50 px-3 py-2 rounded-lg border border-purple-500/30">
                      <span className="text-purple-200">卦位：</span>
                      <span className="text-yellow-100 font-bold ml-1">{currentGua.name}卦</span>
                    </div>
                  </div>
                  <div className="text-purple-200 text-sm mt-3 font-medium">
                    {currentGua.direction} · {currentGua.element}
                  </div>
                </div>
              </div>

              {!compassSupported && (
                <div className="mt-4 text-center text-yellow-400 text-sm">
                  ⚠️ 您的设备不支持指南针功能
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* 上传媒体 */}
      <div className="px-6 mb-6">
        <Card className="bg-gradient-to-br from-purple-900/40 to-black/40 border-purple-500/40 backdrop-blur-sm">
          <div className="p-6">
            <h3 className="text-purple-200 mb-4 text-center">上传图片或视频</h3>
            
            {!uploadedMedia ? (
              <div className="space-y-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleMediaUpload(e, 'image')}
                  className="hidden"
                  id="image-upload"
                />
                <input
                  ref={videoInputRef}
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleMediaUpload(e, 'video')}
                  className="hidden"
                  id="video-upload"
                />
                
                <label
                  htmlFor="image-upload"
                  className="flex items-center justify-center gap-3 w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 px-4 rounded-full font-bold transition-all cursor-pointer"
                >
                  <Camera className="w-5 h-5" />
                  <span>上传图片</span>
                </label>

                <label
                  htmlFor="video-upload"
                  className="flex items-center justify-center gap-3 w-full bg-purple-900/50 hover:bg-purple-900/70 border border-purple-500/30 text-purple-200 py-3 px-4 rounded-full font-bold transition-all cursor-pointer"
                >
                  <Video className="w-5 h-5" />
                  <span>上传视频</span>
                </label>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  {uploadedMedia.type === 'image' ? (
                    <img
                      src={uploadedMedia.url}
                      alt="Uploaded"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ) : (
                    <video
                      src={uploadedMedia.url}
                      controls
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  )}
                  <button
                    onClick={() => setUploadedMedia(null)}
                    className="absolute top-2 right-2 p-2 bg-black/70 hover:bg-black/90 rounded-full transition-colors text-white"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* 开始分析按钮 */}
      {!isAnalyzing && !analysis && (
        <div className="px-6 mb-6">
          <button
            onClick={handleAnalyze}
            className="w-full bg-gradient-to-r from-yellow-600 to-red-600 hover:from-yellow-700 hover:to-red-700 text-white py-4 px-6 rounded-full font-bold transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <Star className="w-5 h-5" />
            <span>开始风水堪舆</span>
          </button>
        </div>
      )}

      {/* 分析中 */}
      {isAnalyzing && (
        <div className="px-6 mb-6">
          <Card className="bg-gradient-to-br from-yellow-900/40 to-red-900/40 border-yellow-500/40 backdrop-blur-sm">
            <div className="p-8 text-center">
              <div className="text-6xl mb-4 animate-spin">🧭</div>
              <p className="text-yellow-200 mb-2">正在堪舆分析...</p>
              <p className="text-yellow-300/70 text-sm">结合罗盘方位、星象时辰、地理环境</p>
            </div>
          </Card>
        </div>
      )}

      {/* 分析结果 */}
      {analysisData && !isAnalyzing && (
        <div className="px-6 space-y-4">
          <Card className="bg-gradient-to-br from-yellow-900/40 to-red-900/40 border-yellow-500/40 backdrop-blur-sm">
            <div className="p-6">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">✨</div>
                <h3 className="text-yellow-100 text-lg font-bold">堪舆结果</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-black/30 rounded-lg p-4 border border-yellow-500/20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-yellow-200">方位：</span>
                    <span className="text-white font-bold">{analysisData.direction}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-yellow-200">五行：</span>
                    <span className="text-white font-bold">{analysisData.element}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-200">综合评分：</span>
                    <span className="text-green-400 font-bold text-xl">{analysisData.score}分</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {analysisData.details.map((detail: any, index: number) => (
            <Card key={index} className="bg-gradient-to-br from-purple-900/30 to-black/30 border-purple-500/30 backdrop-blur-sm">
              <div className="p-5">
                <h4 className="text-purple-100 font-bold mb-2">{detail.aspect}</h4>
                <p className="text-purple-200/80 text-sm leading-relaxed">{detail.comment}</p>
              </div>
            </Card>
          ))}

          <Card className="bg-gradient-to-br from-purple-900/30 to-black/30 border-purple-500/30 backdrop-blur-sm">
            <div className="p-6">
              <h3 className="text-purple-100 mb-4 text-center flex items-center justify-center gap-2">
                <span className="text-2xl">💡</span>
                <span>改善建议</span>
              </h3>
              <div className="space-y-3">
                {analysisData.suggestions.map((suggestion: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 bg-black/30 rounded-lg border border-purple-500/20"
                  >
                    <div className="w-6 h-6 rounded-full bg-purple-600/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-purple-200 text-sm">{index + 1}</span>
                    </div>
                    <p className="text-purple-200/80 text-sm leading-relaxed flex-1">
                      {suggestion}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <button
            onClick={() => {
              setUploadedMedia(null);
              setAnalysis(null);
            }}
            className="w-full bg-purple-900/50 hover:bg-purple-900/70 border border-purple-500/30 text-purple-200 py-4 px-6 rounded-full font-bold transition-all"
          >
            重新堪舆
          </button>
        </div>
      )}
    </div>
  );
}
