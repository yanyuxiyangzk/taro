import { useState } from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';

function MysticBookPage() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    window.location.hash = '#divination';
  };

  const handleGetAnswer = async () => {
    if (!question.trim()) return;
    setIsLoading(true);
    setTimeout(() => {
      setAnswer('命运之轮正在为你揭示答案...\n\n根据宇宙的指引，你所询问的事情将会在适当的时机得到解答。保持耐心和信心，一切都在最好的安排之中。');
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-950 to-black overflow-hidden">
      <div className="relative z-20 flex items-center justify-between p-6">
        <button onClick={handleBack} className="text-purple-200 hover:text-white transition-colors p-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-white text-xl font-bold">神秘之书</h1>
        <div className="w-10"></div>
      </div>
      
      <div className="relative z-10 flex flex-col items-center px-4 pt-4">
        <div className="mb-8">
          <div className="relative w-96 h-96 flex items-center justify-center">
            {/* Outer rotating ring with gradient */}
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, #1e1b4b 0%, #312e81 10%, #4c1d95 20%, #5b21b6 30%, #7c3aed 40%, #a78bfa 50%, #ddd6fe 60%, #f9a8d4 70%, #ec4899 80%, #be185d 90%, #1e1b4b 100%)',
                animation: 'spin 20s linear infinite',
                boxShadow: '0 0 80px rgba(168, 85, 247, 0.8), inset 0 0 60px rgba(168, 85, 247, 0.3)'
              }}
            />
            
            {/* Middle ring with Roman numerals */}
            <div 
              className="absolute inset-10 rounded-full bg-gradient-to-br from-blue-900/90 to-purple-900/90 backdrop-blur-sm"
              style={{
                animation: 'spin 15s linear infinite reverse',
                boxShadow: '0 0 50px rgba(59, 130, 246, 0.6), inset 0 0 40px rgba(139, 92, 246, 0.5)'
              }}
            >
              {/* Roman numerals around the circle */}
              {['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'].map((numeral, i) => {
                const angle = (i * 30 - 90) * (Math.PI / 180);
                const radius = 140;
                return (
                  <div
                    key={i}
                    className="absolute text-white font-bold text-xl"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `translate(-50%, -50%) translate(${Math.cos(angle) * radius}px, ${Math.sin(angle) * radius}px) rotate(${-i * 30 + 90}deg)`
                    }}
                  >
                    {numeral}
                  </div>
                );
              })}
            </div>
            
            {/* Inner core with Yin Yang */}
            <div 
              className="absolute inset-20 rounded-full bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center"
              style={{
                animation: 'spin 10s linear infinite',
                boxShadow: '0 0 40px rgba(99, 102, 241, 0.9), inset 0 0 30px rgba(124, 58, 237, 0.7)'
              }}
            >
              {/* Yin Yang symbol */}
              <div className="relative w-40 h-40">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white via-gray-300 to-black"></div>
                <div className="absolute top-0 left-1/2 w-20 h-20 -translate-x-1/2 rounded-full bg-white"></div>
                <div className="absolute bottom-0 left-1/2 w-20 h-20 -translate-x-1/2 rounded-full bg-black"></div>
                <div className="absolute top-8 left-1/2 w-5 h-5 -translate-x-1/2 rounded-full bg-black"></div>
                <div className="absolute bottom-8 left-1/2 w-5 h-5 -translate-x-1/2 rounded-full bg-white"></div>
              </div>
            </div>
            
            {/* Center glow effect */}
            <div className="absolute inset-0 rounded-full bg-purple-600/20 blur-3xl animate-pulse"></div>
          </div>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-white text-2xl font-bold mb-2">输入你心中所想的问题</h2>
          <p className="text-purple-200 text-sm mb-1">点击获取答案</p>
          <p className="text-purple-300 text-xs">答案即会浮现</p>
        </div>

        <div className="w-full max-w-md mb-6">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="只需要一个问题，答案之书会告诉你当下的答案（30字以内）"
            className="w-full h-32 px-4 py-3 bg-purple-900/30 border-2 border-purple-500/50 rounded-2xl text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 resize-none backdrop-blur-sm"
            maxLength={30}
          />
        </div>

        <button
          onClick={handleGetAnswer}
          disabled={!question.trim() || isLoading}
          className="px-12 py-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white rounded-full text-xl font-bold transition-all shadow-2xl hover:shadow-amber-500/50 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-amber-400/50 mb-8"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 animate-spin" />
              获取中...
            </span>
          ) : (
            '获取答案'
          )}
        </button>

        {answer && (
          <div className="w-full max-w-md bg-gradient-to-br from-purple-800/70 to-purple-900/70 border-2 border-purple-400/60 rounded-3xl p-6 backdrop-blur-sm shadow-2xl mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-purple-400" />
              <h3 className="text-white text-xl font-bold">命运的启示</h3>
            </div>
            <p className="text-purple-100 text-base leading-relaxed whitespace-pre-line">
              {answer}
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default MysticBookPage;
