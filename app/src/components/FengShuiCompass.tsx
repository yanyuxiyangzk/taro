// 动态旋转风水罗盘组件 - 使用SVG绘制传统罗盘
export default function FengShuiCompass() {
  return (
    <div className="flex items-center justify-center py-4">
      <div className="relative" style={{ width: '340px', height: '340px' }}>
        {/* 外层紫色光晕 - 脉动效果 */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(88, 28, 135, 0.6) 0%, rgba(109, 40, 217, 0.5) 20%, rgba(67, 56, 202, 0.4) 40%, transparent 70%)',
            filter: 'blur(50px)',
            animation: 'pulse 4s ease-in-out infinite',
          }}
        />

        {/* 第二层旋转光晕 - 金色渐变 */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              'conic-gradient(from 0deg, rgba(251, 191, 36, 0.4), rgba(217, 119, 6, 0.3), rgba(251, 191, 36, 0.4), rgba(217, 119, 6, 0.3), rgba(251, 191, 36, 0.4))',
            filter: 'blur(30px)',
            animation: 'spin 30s linear infinite',
          }}
        />

        {/* 白色外圈 - 立体质感 */}
        <div
          className="absolute rounded-full shadow-2xl"
          style={{
            width: '94%',
            height: '94%',
            left: '3%',
            top: '3%',
            background:
              'linear-gradient(135deg, #f9fafb 0%, #e5e7eb 30%, #f3f4f6 50%, #d1d5db 70%, #f9fafb 100%)',
            boxShadow:
              '0 0 40px rgba(0, 0, 0, 0.4), inset 0 3px 8px rgba(255, 255, 255, 0.9), inset 0 -3px 8px rgba(0, 0, 0, 0.25)',
          }}
        />

        {/* SVG罗盘主体 - 慢速旋转 */}
        <div
          className="absolute rounded-full overflow-hidden shadow-2xl"
          style={{
            width: '88%',
            height: '88%',
            left: '6%',
            top: '6%',
            border: '4px solid #d97706',
            boxShadow:
              '0 0 35px rgba(217, 119, 6, 0.7), 0 0 60px rgba(251, 191, 36, 0.4), inset 0 0 25px rgba(0, 0, 0, 0.35)',
            animation: 'spin 80s linear infinite',
          }}
        >
          <svg className="w-full h-full" viewBox="0 0 400 400">
            {/* 深红色背景 */}
            <circle cx="200" cy="200" r="200" fill="#7c2d12" />
            
            {/* 最外圈 - 二十四山向 */}
            <g>
              {['壬', '子', '癸', '丑', '艮', '寅', '甲', '卯', '乙', '辰', '巽', '巳', '丙', '午', '丁', '未', '坤', '申', '庚', '酉', '辛', '戌', '乾', '亥'].map((char, index) => {
                const angle = (index * 15) - 90;
                const radius = 180;
                const x = 200 + radius * Math.cos((angle * Math.PI) / 180);
                const y = 200 + radius * Math.sin((angle * Math.PI) / 180);
                
                return (
                  <text
                    key={`char-${index}`}
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#fef3c7"
                    fontSize="16"
                    fontWeight="bold"
                    style={{
                      textShadow: '0 0 4px rgba(254, 243, 199, 0.8)',
                    }}
                  >
                    {char}
                  </text>
                );
              })}
            </g>

            {/* 八卦符号圈 */}
            <circle cx="200" cy="200" r="150" fill="none" stroke="#d97706" strokeWidth="2" opacity="0.6" />
            <g>
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
                const angle = gua.angle - 90;
                const radius = 130;
                const x = 200 + radius * Math.cos((angle * Math.PI) / 180);
                const y = 200 + radius * Math.sin((angle * Math.PI) / 180);
                
                return (
                  <g key={`gua-${index}`}>
                    <text
                      x={x}
                      y={y - 8}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#fde68a"
                      fontSize="28"
                      fontWeight="bold"
                    >
                      {gua.lines}
                    </text>
                    <text
                      x={x}
                      y={y + 12}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#fef3c7"
                      fontSize="14"
                      fontWeight="bold"
                    >
                      {gua.name}
                    </text>
                  </g>
                );
              })}
            </g>

            {/* 中圈 - 十二地支 */}
            <circle cx="200" cy="200" r="100" fill="#991b1b" opacity="0.9" />
            <circle cx="200" cy="200" r="100" fill="none" stroke="#d97706" strokeWidth="3" />
            <g>
              {['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'].map((zhi, index) => {
                const angle = (index * 30) - 90;
                const radius = 80;
                const x = 200 + radius * Math.cos((angle * Math.PI) / 180);
                const y = 200 + radius * Math.sin((angle * Math.PI) / 180);
                
                return (
                  <text
                    key={`zhi-${index}`}
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#fde68a"
                    fontSize="18"
                    fontWeight="bold"
                    style={{
                      textShadow: '0 0 8px rgba(253, 224, 71, 0.9)',
                    }}
                  >
                    {zhi}
                  </text>
                );
              })}
            </g>

            {/* 内圈 - 八方位 */}
            <circle cx="200" cy="200" r="55" fill="#7c2d12" />
            <circle cx="200" cy="200" r="55" fill="none" stroke="#d97706" strokeWidth="2" />
            <g>
              {[
                { text: '南', angle: 0 },
                { text: '西南', angle: 45 },
                { text: '西', angle: 90 },
                { text: '西北', angle: 135 },
                { text: '北', angle: 180 },
                { text: '东北', angle: 225 },
                { text: '东', angle: 270 },
                { text: '东南', angle: 315 },
              ].map((dir, index) => {
                const angle = dir.angle - 90;
                const radius = 40;
                const x = 200 + radius * Math.cos((angle * Math.PI) / 180);
                const y = 200 + radius * Math.sin((angle * Math.PI) / 180);
                
                return (
                  <text
                    key={`dir-${index}`}
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#fbbf24"
                    fontSize="14"
                    fontWeight="900"
                    style={{
                      textShadow: '0 0 10px rgba(250, 204, 21, 1)',
                    }}
                  >
                    {dir.text}
                  </text>
                );
              })}
            </g>

            {/* 装饰性分割线 */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => (
              <line
                key={`line-${index}`}
                x1="200"
                y1="200"
                x2={200 + 190 * Math.cos(((angle - 90) * Math.PI) / 180)}
                y2={200 + 190 * Math.sin(((angle - 90) * Math.PI) / 180)}
                stroke="#d97706"
                strokeWidth="1"
                opacity="0.3"
              />
            ))}
          </svg>
        </div>

        {/* 中心太极图 - 快速旋转 */}
        <div
          className="absolute rounded-full overflow-hidden"
          style={{
            width: '20%',
            height: '20%',
            left: '40%',
            top: '40%',
            border: '3px solid #d97706',
            boxShadow:
              '0 0 30px rgba(217, 119, 6, 0.9), 0 0 50px rgba(251, 191, 36, 0.5), inset 0 0 15px rgba(217, 119, 6, 0.3)',
            animation: 'spin 12s linear infinite',
            zIndex: 10,
          }}
        >
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* 阳（深红棕色部分） */}
            <path
              d="M 50 0 A 25 25 0 0 1 50 50 A 25 25 0 0 0 50 100 A 50 50 0 0 1 50 0"
              fill="#7c2d12"
            />
            {/* 阴（浅金色部分） */}
            <path
              d="M 50 0 A 25 25 0 0 0 50 50 A 25 25 0 0 1 50 100 A 50 50 0 0 0 50 0"
              fill="#fef3c7"
            />
            {/* 阳中阴（上方小圆） */}
            <circle cx="50" cy="25" r="8" fill="#fef3c7" />
            {/* 阴中阳（下方小圆） */}
            <circle cx="50" cy="75" r="8" fill="#7c2d12" />
          </svg>
        </div>

        {/* 顶部指针 - 脉动效果 */}
        <div
          className="absolute"
          style={{
            left: '50%',
            top: '-12px',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '12px solid transparent',
            borderRight: '12px solid transparent',
            borderBottom: '24px solid #f59e0b',
            filter:
              'drop-shadow(0 0 15px rgba(245, 158, 11, 1)) drop-shadow(0 0 30px rgba(251, 191, 36, 0.8))',
            zIndex: 30,
            animation: 'pulse 2.5s ease-in-out infinite',
          }}
        />

        {/* 装饰性能量环 - 多层旋转 */}
        {[0, 1, 2, 3].map((index) => (
          <div
            key={`ring-${index}`}
            className="absolute rounded-full"
            style={{
              width: `${65 + index * 7}%`,
              height: `${65 + index * 7}%`,
              left: `${17.5 - index * 3.5}%`,
              top: `${17.5 - index * 3.5}%`,
              border: `1px solid rgba(217, 119, 6, ${0.2 - index * 0.04})`,
              animation: `spin ${30 + index * 15}s linear infinite ${index % 2 === 0 ? '' : 'reverse'}`,
              pointerEvents: 'none',
            }}
          />
        ))}

        {/* 装饰性光芒 - 八方 */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => (
          <div
            key={`ray-${index}`}
            className="absolute"
            style={{
              left: '50%',
              top: '50%',
              width: '2px',
              height: '46%',
              background:
                'linear-gradient(to bottom, transparent 0%, rgba(217, 119, 6, 0.4) 15%, rgba(251, 191, 36, 0.5) 50%, rgba(217, 119, 6, 0.4) 85%, transparent 100%)',
              transformOrigin: 'bottom center',
              transform: `translate(-50%, -100%) rotate(${angle}deg)`,
              opacity: 0.35,
              animation: `pulse ${3.5 + (index % 3) * 0.5}s ease-in-out infinite`,
              animationDelay: `${index * 0.25}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
