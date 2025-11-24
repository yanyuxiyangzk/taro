import { useState, useRef } from 'react';
import { ArrowLeft, Upload, Camera, X } from 'lucide-react';
import { Card } from './ui/card';
import FengShuiCompass from './FengShuiCompass';

export default function FengShuiAnalysisPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    if (!uploadedImage) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis
    setTimeout(() => {
      const analyses = [
        {
          overall: '此居所整体风水格局良好，气场流通顺畅。',
          details: [
            { aspect: '方位布局', score: 85, comment: '主要房间方位合理，符合风水原则。建议在东南方位增加绿植以提升财运。' },
            { aspect: '光线采光', score: 90, comment: '采光充足，阳气充盈。保持窗户清洁，让阳光充分进入室内。' },
            { aspect: '空间流动', score: 80, comment: '空间布局较为开阔，气流通畅。注意避免家具阻挡主要通道。' },
            { aspect: '色彩搭配', score: 75, comment: '色调偏冷，建议增加暖色系装饰，平衡阴阳能量。' }
          ],
          suggestions: [
            '在客厅东南角摆放常绿植物，有助于提升财运',
            '卧室床头宜靠实墙，避免悬空或靠窗',
            '保持室内整洁，定期清理杂物，让气场流通',
            '可在玄关处放置风水摆件，阻挡煞气'
          ]
        },
        {
          overall: '居所藏风聚气，但需注意部分细节调整。',
          details: [
            { aspect: '方位布局', score: 78, comment: '整体方位尚可，但卧室位置略有不足。建议调整床位朝向。' },
            { aspect: '光线采光', score: 70, comment: '部分区域采光不足，建议增加照明设备，提升阳气。' },
            { aspect: '空间流动', score: 88, comment: '空间布局合理，动线流畅，有利于气场循环。' },
            { aspect: '色彩搭配', score: 82, comment: '色彩搭配和谐，冷暖适中，符合风水要求。' }
          ],
          suggestions: [
            '在采光不足的区域增加灯光，提升空间能量',
            '调整家具摆放，避免尖角对冲',
            '在财位摆放水晶或聚宝盆，增强财运',
            '定期开窗通风，保持空气流通'
          ]
        }
      ];
      
      const randomAnalysis = analyses[Math.floor(Math.random() * analyses.length)];
      setAnalysis(JSON.stringify(randomAnalysis));
      setIsAnalyzing(false);
    }, 3000);
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    setAnalysis(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const analysisData = analysis ? JSON.parse(analysis) : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black pb-24">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-purple-500/30">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => window.history.back()}
            className="p-2 hover:bg-purple-900/30 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-purple-200" />
          </button>
          <h1 className="text-xl text-purple-100 font-bold">风水堪舆</h1>
          <div className="w-10"></div>
        </div>
      </div>

      {/* Type Selection */}
      <div className="px-6 pt-6">
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button className="p-4 bg-gradient-to-br from-purple-600/30 to-blue-600/30 border-2 border-purple-400 rounded-xl">
            <div className="text-3xl mb-2">🏠</div>
            <div className="text-purple-100 font-bold">室内堪舆</div>
            <div className="text-purple-300/70 text-xs mt-1">居室布局分析</div>
          </button>
          <button className="p-4 bg-purple-900/20 border border-purple-500/30 rounded-xl hover:border-purple-400/50 transition-all">
            <div className="text-3xl mb-2">🌄</div>
            <div className="text-purple-200 font-bold">室外堪舆</div>
            <div className="text-purple-300/70 text-xs mt-1">环境方位测算</div>
          </button>
        </div>
      </div>


      {/* 风水罗盘模块 */}
      <div className="px-6 mb-6">
        <Card className="bg-gradient-to-br from-purple-900/40 to-indigo-900/30 border-purple-500/30 backdrop-blur-sm overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 blur-2xl"></div>
          <div className="relative p-6">
            <h3 className="text-purple-100 text-lg font-bold mb-4 text-center flex items-center justify-center gap-2">
              <span className="text-2xl">🧭</span>
              <span>传统风水罗盘</span>
              <span className="text-2xl">🧭</span>
            </h3>
            
            <FengShuiCompass />

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
        </Card>
      </div>

      {/* Upload Section */}
      <div className="px-6">
        <Card className="bg-gradient-to-br from-purple-900/40 to-black/40 border-purple-500/40 backdrop-blur-sm overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 blur-2xl"></div>
          
          <div className="relative p-6">
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">📸</div>
              <h2 className="text-purple-100 text-lg mb-2">上传照片</h2>
              <p className="text-purple-300/70 text-sm">
                上传居所照片，AI 将结合星象方位为您分析
              </p>
            </div>

            {!uploadedImage ? (
              <div className="space-y-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                
                <label
                  htmlFor="image-upload"
                  className="flex items-center justify-center gap-3 w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 px-6 rounded-full font-bold transition-all shadow-lg cursor-pointer"
                >
                  <Upload className="w-5 h-5" />
                  <span>选择照片</span>
                </label>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center justify-center gap-3 w-full bg-purple-900/50 hover:bg-purple-900/70 border border-purple-500/30 text-purple-200 py-4 px-6 rounded-full font-bold transition-all"
                >
                  <Camera className="w-5 h-5" />
                  <span>拍摄照片</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <img
                    src={uploadedImage}
                    alt="Uploaded"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <button
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 p-2 bg-black/70 hover:bg-black/90 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>

                {!analysis && !isAnalyzing && (
                  <button
                    onClick={handleAnalyze}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 px-6 rounded-full font-bold transition-all shadow-lg"
                  >
                    开始分析
                  </button>
                )}
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Analysis Loading */}
      {isAnalyzing && (
        <div className="px-6 mt-6">
          <Card className="bg-gradient-to-br from-purple-900/40 to-black/40 border-purple-500/40 backdrop-blur-sm">
            <div className="p-8 text-center">
              <div className="text-6xl mb-4 animate-spin">🧭</div>
              <p className="text-purple-200 mb-2">正在分析风水格局...</p>
              <p className="text-purple-300/70 text-sm">结合星象方位，为您解读</p>
            </div>
          </Card>
        </div>
      )}

      {/* Analysis Results */}
      {analysisData && !isAnalyzing && (
        <div className="px-6 mt-6 space-y-4">
          {/* Overall Assessment */}
          <Card className="bg-gradient-to-br from-purple-900/40 to-black/40 border-purple-500/40 backdrop-blur-sm overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 blur-xl"></div>
            
            <div className="relative p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="text-4xl">✨</div>
              </div>
              <h3 className="text-purple-100 text-lg mb-3 text-center">整体评估</h3>
              <div className="bg-black/30 rounded-lg p-4 border border-purple-500/20">
                <p className="text-purple-200 leading-relaxed text-center">
                  {analysisData.overall}
                </p>
              </div>
            </div>
          </Card>

          {/* Detailed Analysis */}
          <div className="space-y-3">
            <h3 className="text-purple-200 text-center">详细分析</h3>
            {analysisData.details.map((detail: any, index: number) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-purple-900/30 to-black/30 border-purple-500/30 backdrop-blur-sm"
              >
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-purple-100 font-bold">{detail.aspect}</h4>
                    <div className="flex items-center gap-2">
                      <div className="text-2xl text-purple-100 font-bold">{detail.score}</div>
                      <div className="text-purple-300/70 text-sm">分</div>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="h-2 bg-purple-950/50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-1000"
                        style={{ width: `${detail.score}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <p className="text-purple-200/80 text-sm leading-relaxed">
                    {detail.comment}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          {/* Suggestions */}
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

          {/* Re-analyze Button */}
          <button
            onClick={handleRemoveImage}
            className="w-full bg-purple-900/50 hover:bg-purple-900/70 border border-purple-500/30 text-purple-200 py-4 px-6 rounded-full font-bold transition-all"
          >
            重新分析
          </button>
        </div>
      )}
    </div>
  );
}
