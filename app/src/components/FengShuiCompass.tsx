// 独立的风水罗盘组件 - 八角形设计
export default function FengShuiCompass() {
  // 创建八角形路径
  const createOctagonPath = (size: number) => {
    const points = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i * 45 - 22.5) * (Math.PI / 180);
      const x = 50 + size * Math.cos(angle);
      const y = 50 + size * Math.sin(angle);
      points.push(`${x},${y}`);
    }
    return points.join(' ');
  };



  return (
    <div className="flex items-center justify-center">
      <div className="relative" style={{ width: '360px', height: '360px' }}>
        {/* 外层紫色光晕 */}
        <div 
          className="absolute"
          style={{ 
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(109, 40, 217, 0.3) 40%, transparent 70%)',
            filter: 'blur(30px)',
          }}
        />
        
        {/* SVG 八角形罗盘 */}
        <svg 
          className="absolute"
          style={{
            width: '100%',
            height: '100%',
          }}
          viewBox="0 0 100 100"
        >
          {/* 外层浅黄色八角形 */}
          <polygon
            points={createOctagonPath(48)}
            fill="#fef3c7"
            stroke="#92400e"
            strokeWidth="0.5"
            filter="drop-shadow(0 4px 12px rgba(0, 0, 0, 0.4))"
          />
          
          {/* 主罗盘八角形 - 浅黄色背景 */}
          <polygon
            points={createOctagonPath(45)}
            fill="url(#compassGradient)"
            stroke="#92400e"
            strokeWidth="0.8"
          />
          
          {/* 渐变定义 */}
          <defs>
            <linearGradient id="compassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="50%" stopColor="#fde68a" />
              <stop offset="100%" stopColor="#fef3c7" />
            </linearGradient>
            <linearGradient id="innerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fde68a" />
              <stop offset="100%" stopColor="#fef3c7" />
            </linearGradient>
          </defs>
        </svg>

        {/* 主罗盘内容容器 */}
        <div 
          className="absolute overflow-hidden"
          style={{ 
            width: '88%',
            height: '88%',
            left: '6%',
            top: '6%',
          }}
        >
          {/* 最外圈 - 二十四山向 */}
          <div 
            className="absolute"
            style={{ 
              width: '100%',
              height: '100%',
              animation: 'spin 60s linear infinite',
            }}
          >
            {['壬', '子', '癸', '丑', '艮', '寅', '甲', '卯', '乙', '辰', '巽', '巳', '丙', '午', '丁', '未', '坤', '申', '庚', '酉', '辛', '戌', '乾', '亥'].map((char, index) => {
              const angle = (index * 15);
              const radius = 42;
              return (
                <div
                  key={`char-${index}`}
                  className="absolute text-yellow-400 font-bold"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `rotate(${angle}deg) translateY(-${radius}%) rotate(-${angle}deg) translate(-50%, -50%)`,
                    fontSize: '11px',
                    textShadow: '0 0 8px rgba(250, 204, 21, 0.9)',
                  }}
                >
                  {char}
                </div>
              );
            })}
          </div>

          {/* 八卦符号层 */}
          <div 
            className="absolute"
            style={{ 
              width: '70%',
              height: '70%',
              left: '15%',
              top: '15%',
              animation: 'spin 40s linear infinite reverse',
            }}
          >
            {[
              { name: '乾', lines: '☰', angle: 0 },
              { name: '兑', lines: '☱', angle: 45 },
              { name: '离', lines: '☲', angle: 90 },
              { name: '震', lines: '☳', angle: 135 },
              { name: '巽', lines: '☴', angle: 180 },
              { name: '坎', lines: '☵', angle: 225 },
              { name: '艮', lines: '☶', angle: 270 },
              { name: '坤', lines: '☷', angle: 315 },
            ].map((gua, index) => {
              const angle = gua.angle;
              const radius = 38;
              return (
                <div
                  key={`gua-${index}`}
                  className="absolute"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `rotate(${angle}deg) translateY(-${radius}%) rotate(-${angle}deg) translate(-50%, -50%)`,
                  }}
                >
                  <div className="text-center">
                    <div 
                      className="text-yellow-300 font-bold mb-0.5" 
                      style={{ 
                        fontSize: '20px',
                        textShadow: '0 0 10px rgba(253, 224, 71, 0.9)' 
                      }}
                    >
                      {gua.lines}
                    </div>
                    <div 
                      className="text-yellow-400 font-bold" 
                      style={{ 
                        fontSize: '10px',
                        textShadow: '0 0 6px rgba(250, 204, 21, 0.8)' 
                      }}
                    >
                      {gua.name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 中圈 - 十二地支 */}
          <div 
            className="absolute rounded-full"
            style={{ 
              width: '56%',
              height: '56%',
              left: '22%',
              top: '22%',
              border: '3px solid rgba(202, 138, 4, 0.6)',
              background: 'radial-gradient(circle, rgba(127, 29, 29, 0.85) 0%, rgba(153, 27, 27, 0.95) 100%)',
              animation: 'spin 30s linear infinite',
            }}
          >
            {['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'].map((zhi, index) => {
              const angle = (index * 30);
              const radius = 35;
              return (
                <div
                  key={`zhi-${index}`}
                  className="absolute text-yellow-300 font-bold"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `rotate(${angle}deg) translateY(-${radius}%) rotate(-${angle}deg) translate(-50%, -50%)`,
                    fontSize: '13px',
                    textShadow: '0 0 8px rgba(253, 224, 71, 0.9)',
                  }}
                >
                  {zhi}
                </div>
              );
            })}
          </div>

          {/* 内圈 - 八方位 */}
          <div 
            className="absolute rounded-full"
            style={{ 
              width: '40%',
              height: '40%',
              left: '30%',
              top: '30%',
              border: '2px solid rgba(202, 138, 4, 0.5)',
              background: 'radial-gradient(circle, rgba(127, 29, 29, 0.9) 0%, rgba(153, 27, 27, 1) 100%)',
            }}
          >
            {[
              { text: '南', angle: 0 },
              { text: '坤', angle: 45 },
              { text: '西', angle: 90 },
              { text: '乾', angle: 135 },
              { text: '北', angle: 180 },
              { text: '艮', angle: 225 },
              { text: '东', angle: 270 },
              { text: '巽', angle: 315 },
            ].map((dir, index) => {
              const angle = dir.angle;
              const radius = 28;
              return (
                <div
                  key={`dir-${index}`}
                  className="absolute text-yellow-400 font-bold"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `rotate(${angle}deg) translateY(-${radius}%) rotate(-${angle}deg) translate(-50%, -50%)`,
                    fontSize: '14px',
                    textShadow: '0 0 10px rgba(250, 204, 21, 1)',
                  }}
                >
                  {dir.text}
                </div>
              );
            })}
          </div>

          {/* 中心 - 阴阳太极 */}
          <div 
            className="absolute rounded-full overflow-hidden"
            style={{ 
              width: '16%',
              height: '16%',
              left: '42%',
              top: '42%',
              border: '3px solid #ca8a04',
              boxShadow: '0 0 20px rgba(250, 204, 21, 0.7)',
              animation: 'spin 15s linear infinite',
            }}
          >
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {/* 阳（红色部分） */}
              <path
                d="M 50 0 A 25 25 0 0 1 50 50 A 25 25 0 0 0 50 100 A 50 50 0 0 1 50 0"
                fill="#7f1d1d"
              />
              {/* 阴（金黄色部分） */}
              <path
                d="M 50 0 A 25 25 0 0 0 50 50 A 25 25 0 0 1 50 100 A 50 50 0 0 0 50 0"
                fill="#fbbf24"
              />
              {/* 阳中阴（上方小圆） */}
              <circle cx="50" cy="25" r="8" fill="#fbbf24" />
              {/* 阴中阳（下方小圆） */}
              <circle cx="50" cy="75" r="8" fill="#7f1d1d" />
            </svg>
          </div>

          {/* 顶部指针 */}
          <div 
            className="absolute"
            style={{
              left: '50%',
              top: '-2px',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderBottom: '16px solid #fbbf24',
              filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.9))',
            }}
          />
        </div>
      </div>
    </div>
  );
}
