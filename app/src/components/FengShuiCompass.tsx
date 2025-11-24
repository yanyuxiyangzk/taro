// 专业传统风水罗盘组件 - 超精细版本
export default function FengShuiCompass() {
  return (
    <div className="flex items-center justify-center py-4">
      <div className="relative" style={{ width: '360px', height: '360px', aspectRatio: '1 / 1' }}>
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

        {/* SVG罗盘主体 - 慢速旋转 */}
        <div
          className="absolute rounded-full overflow-hidden shadow-2xl"
          style={{
            width: '88%',
            height: '88%',
            left: '6%',
            top: '6%',
            border: '4px solid #92400e',
            boxShadow:
              '0 0 35px rgba(146, 64, 14, 0.7), 0 0 60px rgba(217, 119, 6, 0.4), inset 0 0 25px rgba(0, 0, 0, 0.4)',
            animation: 'spin 100s linear infinite',
          }}
        >
          <svg className="w-full h-full" viewBox="0 0 500 500">
            <defs>
              <radialGradient id="bgGradient" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#7c2d12" />
                <stop offset="50%" stopColor="#991b1b" />
                <stop offset="100%" stopColor="#7c2d12" />
              </radialGradient>
              <radialGradient id="centerGradient" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#991b1b" />
                <stop offset="100%" stopColor="#7c2d12" />
              </radialGradient>
            </defs>
            
            <circle cx="250" cy="250" r="250" fill="url(#bgGradient)" />
            
            <circle cx="250" cy="250" r="240" fill="none" stroke="#92400e" strokeWidth="2" opacity="0.8" />
            <circle cx="250" cy="250" r="235" fill="none" stroke="#d97706" strokeWidth="1" opacity="0.5" />
            
            <g>
              {Array.from({ length: 72 }).map((_, index) => {
                const angle = (index * 5) - 90;
                const radius = 228;
                const x1 = 250 + radius * Math.cos((angle * Math.PI) / 180);
                const y1 = 250 + radius * Math.sin((angle * Math.PI) / 180);
                const x2 = 250 + (radius - (index % 3 === 0 ? 8 : 4)) * Math.cos((angle * Math.PI) / 180);
                const y2 = 250 + (radius - (index % 3 === 0 ? 8 : 4)) * Math.sin((angle * Math.PI) / 180);
                
                return (
                  <line
                    key={`tick-${index}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#fef3c7"
                    strokeWidth={index % 3 === 0 ? "2" : "1"}
                    opacity={index % 3 === 0 ? "0.8" : "0.5"}
                  />
                );
              })}
            </g>

            <g>
              {['壬', '子', '癸', '丑', '艮', '寅', '甲', '卯', '乙', '辰', '巽', '巳', '丙', '午', '丁', '未', '坤', '申', '庚', '酉', '辛', '戌', '乾', '亥'].map((char, index) => {
                const angle = (index * 15) - 90;
                const radius = 210;
                const x = 250 + radius * Math.cos((angle * Math.PI) / 180);
                const y = 250 + radius * Math.sin((angle * Math.PI) / 180);
                
                return (
                  <text
                    key={`char-${index}`}
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#fef3c7"
                    fontSize="15"
                    fontWeight="bold"
                    style={{
                      filter: 'drop-shadow(0 0 3px rgba(254, 243, 199, 0.8))',
                    }}
                  >
                    {char}
                  </text>
                );
              })}
            </g>

            <g>
              {['0°', '15°', '30°', '45°', '60°', '75°', '90°', '105°', '120°', '135°', '150°', '165°', '180°', '195°', '210°', '225°', '240°', '255°', '270°', '285°', '300°', '315°', '330°', '345°'].map((deg, index) => {
                const angle = (index * 15) - 90;
                const radius = 195;
                const x = 250 + radius * Math.cos((angle * Math.PI) / 180);
                const y = 250 + radius * Math.sin((angle * Math.PI) / 180);
                
                return (
                  <text
                    key={`deg-${index}`}
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#d97706"
                    fontSize="9"
                    fontWeight="600"
                    opacity="0.7"
                  >
                    {deg}
                  </text>
                );
              })}
            </g>

            <circle cx="250" cy="250" r="180" fill="none" stroke="#92400e" strokeWidth="3" opacity="0.7" />
            <circle cx="250" cy="250" r="177" fill="none" stroke="#d97706" strokeWidth="1" opacity="0.6" />

            <g>
              {[
                { name: '乾', lines: '☰', angle: 0, desc: '天' },
                { name: '兑', lines: '☱', angle: 45, desc: '泽' },
                { name: '离', lines: '☲', angle: 90, desc: '火' },
                { name: '震', lines: '☳', angle: 135, desc: '雷' },
                { name: '巽', lines: '☴', angle: 180, desc: '风' },
                { name: '坎', lines: '☵', angle: 225, desc: '水' },
                { name: '艮', lines: '☶', angle: 270, desc: '山' },
                { name: '坤', lines: '☷', angle: 315, desc: '地' },
              ].map((gua, index) => {
                const angle = gua.angle - 90;
                const radius = 155;
                const x = 250 + radius * Math.cos((angle * Math.PI) / 180);
                const y = 250 + radius * Math.sin((angle * Math.PI) / 180);
                
                return (
                  <g key={`gua-${index}`}>
                    <text
                      x={x}
                      y={y - 10}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#fde68a"
                      fontSize="32"
                      fontWeight="bold"
                      style={{
                        filter: 'drop-shadow(0 0 4px rgba(253, 224, 138, 0.8))',
                      }}
                    >
                      {gua.lines}
                    </text>
                    <text
                      x={x}
                      y={y + 12}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#fef3c7"
                      fontSize="13"
                      fontWeight="bold"
                    >
                      {gua.name}
                    </text>
                    <text
                      x={x}
                      y={y + 24}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#d97706"
                      fontSize="10"
                      fontWeight="600"
                      opacity="0.8"
                    >
                      {gua.desc}
                    </text>
                  </g>
                );
              })}
            </g>

            <circle cx="250" cy="250" r="125" fill="none" stroke="#92400e" strokeWidth="2" opacity="0.8" />
            <circle cx="250" cy="250" r="122" fill="none" stroke="#d97706" strokeWidth="1" opacity="0.5" />

            <circle cx="250" cy="250" r="115" fill="url(#centerGradient)" opacity="0.95" />
            <circle cx="250" cy="250" r="115" fill="none" stroke="#d97706" strokeWidth="3" />
            
            <g>
              {[
                { zhi: '子', animal: '鼠', angle: 0 },
                { zhi: '丑', animal: '牛', angle: 30 },
                { zhi: '寅', animal: '虎', angle: 60 },
                { zhi: '卯', animal: '兔', angle: 90 },
                { zhi: '辰', animal: '龙', angle: 120 },
                { zhi: '巳', animal: '蛇', angle: 150 },
                { zhi: '午', animal: '马', angle: 180 },
                { zhi: '未', animal: '羊', angle: 210 },
                { zhi: '申', animal: '猴', angle: 240 },
                { zhi: '酉', animal: '鸡', angle: 270 },
                { zhi: '戌', animal: '狗', angle: 300 },
                { zhi: '亥', animal: '猪', angle: 330 },
              ].map((item, index) => {
                const angle = item.angle - 90;
                const radius = 100;
                const x = 250 + radius * Math.cos((angle * Math.PI) / 180);
                const y = 250 + radius * Math.sin((angle * Math.PI) / 180);
                
                return (
                  <g key={`zhi-${index}`}>
                    <text
                      x={x}
                      y={y - 5}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#fde68a"
                      fontSize="18"
                      fontWeight="bold"
                      style={{
                        filter: 'drop-shadow(0 0 6px rgba(253, 224, 71, 0.9))',
                      }}
                    >
                      {item.zhi}
                    </text>
                    <text
                      x={x}
                      y={y + 8}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#fef3c7"
                      fontSize="9"
                      fontWeight="600"
                      opacity="0.8"
                    >
                      {item.animal}
                    </text>
                  </g>
                );
              })}
            </g>

            <circle cx="250" cy="250" r="75" fill="none" stroke="#92400e" strokeWidth="2" opacity="0.8" />
            <circle cx="250" cy="250" r="72" fill="none" stroke="#d97706" strokeWidth="1" opacity="0.6" />

            <circle cx="250" cy="250" r="65" fill="#7c2d12" />
            <circle cx="250" cy="250" r="65" fill="none" stroke="#d97706" strokeWidth="2" />
            
            <g>
              {[
                { text: '南', sub: '离', angle: 0 },
                { text: '西南', sub: '坤', angle: 45 },
                { text: '西', sub: '兑', angle: 90 },
                { text: '西北', sub: '乾', angle: 135 },
                { text: '北', sub: '坎', angle: 180 },
                { text: '东北', sub: '艮', angle: 225 },
                { text: '东', sub: '震', angle: 270 },
                { text: '东南', sub: '巽', angle: 315 },
              ].map((dir, index) => {
                const angle = dir.angle - 90;
                const radius = 50;
                const x = 250 + radius * Math.cos((angle * Math.PI) / 180);
                const y = 250 + radius * Math.sin((angle * Math.PI) / 180);
                
                return (
                  <g key={`dir-${index}`}>
                    <text
                      x={x}
                      y={y - 4}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#fbbf24"
                      fontSize="14"
                      fontWeight="900"
                      style={{
                        filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 1))',
                      }}
                    >
                      {dir.text}
                    </text>
                    <text
                      x={x}
                      y={y + 8}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#fde68a"
                      fontSize="9"
                      fontWeight="600"
                      opacity="0.8"
                    >
                      {dir.sub}
                    </text>
                  </g>
                );
              })}
            </g>

            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => (
              <line
                key={`line-${index}`}
                x1="250"
                y1="250"
                x2={250 + 240 * Math.cos(((angle - 90) * Math.PI) / 180)}
                y2={250 + 240 * Math.sin(((angle - 90) * Math.PI) / 180)}
                stroke="#d97706"
                strokeWidth="1.5"
                opacity="0.4"
              />
            ))}

            {[0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345].map((angle, index) => (
              <line
                key={`line2-${index}`}
                x1={250 + 65 * Math.cos(((angle - 90) * Math.PI) / 180)}
                y1={250 + 65 * Math.sin(((angle - 90) * Math.PI) / 180)}
                x2={250 + 115 * Math.cos(((angle - 90) * Math.PI) / 180)}
                y2={250 + 115 * Math.sin(((angle - 90) * Math.PI) / 180)}
                stroke="#92400e"
                strokeWidth="0.5"
                opacity="0.3"
              />
            ))}
          </svg>
        </div>

        <div
          className="absolute rounded-full overflow-hidden"
          style={{
            width: '22%',
            height: '22%',
            left: '39%',
            top: '39%',
            border: '4px solid #92400e',
            boxShadow:
              '0 0 30px rgba(146, 64, 14, 0.9), 0 0 50px rgba(217, 119, 6, 0.5), inset 0 0 15px rgba(146, 64, 14, 0.4)',
            animation: 'spin 12s linear infinite',
            zIndex: 10,
          }}
        >
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <path
              d="M 50 0 A 25 25 0 0 1 50 50 A 25 25 0 0 0 50 100 A 50 50 0 0 1 50 0"
              fill="#7c2d12"
            />
            <path
              d="M 50 0 A 25 25 0 0 0 50 50 A 25 25 0 0 1 50 100 A 50 50 0 0 0 50 0"
              fill="#fef3c7"
            />
            <circle cx="50" cy="25" r="8" fill="#fef3c7" />
            <circle cx="50" cy="75" r="8" fill="#7c2d12" />
          </svg>
        </div>

        <div
          className="absolute"
          style={{
            left: '50%',
            top: '-14px',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '13px solid transparent',
            borderRight: '13px solid transparent',
            borderBottom: '26px solid #f59e0b',
            filter:
              'drop-shadow(0 0 15px rgba(245, 158, 11, 1)) drop-shadow(0 0 30px rgba(251, 191, 36, 0.8))',
            zIndex: 30,
            animation: 'pulse 2.5s ease-in-out infinite',
          }}
        />

      </div>
    </div>
  );
}
