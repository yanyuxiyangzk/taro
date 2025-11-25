interface Dice3DProps {
  value: number;
  isRolling?: boolean;
  animationClass?: string;
  size?: number;
}

export default function Dice3D({ value, isRolling = false, animationClass = '', size = 100 }: Dice3DProps) {
  // 根据点数返回对应的面
  const renderDots = (faceValue: number) => {
    const dots = [];
    const dotPositions: Record<number, string[]> = {
      1: ['center'],
      2: ['top-left', 'bottom-right'],
      3: ['top-left', 'center', 'bottom-right'],
      4: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
      5: ['top-left', 'top-right', 'center', 'bottom-left', 'bottom-right'],
      6: ['top-left', 'top-right', 'middle-left', 'middle-right', 'bottom-left', 'bottom-right'],
    };

    const positions = dotPositions[faceValue] || [];
    
    return positions.map((pos, index) => (
      <div
        key={index}
        className={`dice-dot ${pos}`}
        style={{
          width: `${size * 0.18}px`,
          height: `${size * 0.18}px`,
        }}
      />
    ));
  };

  // 根据当前点数设置骰子的旋转角度 - 倾斜显示以看到多个面
  const getRotation = () => {
    const rotations: Record<number, string> = {
      1: 'rotateX(-25deg) rotateY(35deg)',
      2: 'rotateX(-25deg) rotateY(125deg)',
      3: 'rotateX(-25deg) rotateY(215deg)',
      4: 'rotateX(-25deg) rotateY(-55deg)',
      5: 'rotateX(65deg) rotateY(35deg)',
      6: 'rotateX(-115deg) rotateY(35deg)',
    };
    return rotations[value] || rotations[1];
  };

  // 滚动时的随机旋转动画
  const getRandomRotation = () => {
    if (!isRolling) return '';
    const x = Math.random() * 720 - 360;
    const y = Math.random() * 720 - 360;
    const z = Math.random() * 720 - 360;
    return `rotateX(${x}deg) rotateY(${y}deg) rotateZ(${z}deg)`;
  };

  return (
    <div 
      className={`dice-container ${animationClass}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        perspective: '1000px',
      }}
    >
      <div
        className={`dice-cube ${isRolling ? 'rolling' : ''}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          transform: isRolling ? getRandomRotation() : getRotation(),
          transition: isRolling ? 'transform 0.1s linear' : 'transform 0.6s ease-out',
        }}
      >
        {/* 前面 - 1 */}
        <div className="dice-face front" style={{ width: `${size}px`, height: `${size}px`, transform: `translateZ(${size / 2}px)` }}>
          {renderDots(1)}
        </div>
        
        {/* 右面 - 2 */}
        <div className="dice-face right" style={{ width: `${size}px`, height: `${size}px`, transform: `rotateY(90deg) translateZ(${size / 2}px)` }}>
          {renderDots(2)}
        </div>
        
        {/* 后面 - 3 */}
        <div className="dice-face back" style={{ width: `${size}px`, height: `${size}px`, transform: `rotateY(180deg) translateZ(${size / 2}px)` }}>
          {renderDots(3)}
        </div>
        
        {/* 左面 - 4 */}
        <div className="dice-face left" style={{ width: `${size}px`, height: `${size}px`, transform: `rotateY(-90deg) translateZ(${size / 2}px)` }}>
          {renderDots(4)}
        </div>
        
        {/* 上面 - 5 */}
        <div className="dice-face top" style={{ width: `${size}px`, height: `${size}px`, transform: `rotateX(90deg) translateZ(${size / 2}px)` }}>
          {renderDots(5)}
        </div>
        
        {/* 下面 - 6 */}
        <div className="dice-face bottom" style={{ width: `${size}px`, height: `${size}px`, transform: `rotateX(-90deg) translateZ(${size / 2}px)` }}>
          {renderDots(6)}
        </div>
      </div>

      <style jsx>{`
        .dice-container {
          display: inline-block;
          margin: 10px;
        }

        .dice-cube {
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.6s ease-out;
        }

        .dice-cube.rolling {
          animation: continuousRoll 0.1s linear infinite;
        }

        @keyframes continuousRoll {
          0% {
            transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
          }
          100% {
            transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg);
          }
        }

        .dice-face {
          position: absolute;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          align-content: space-around;
          padding: 15%;
          background: linear-gradient(145deg, #ffffff, #e6e6e6);
          border: 2px solid #333;
          border-radius: 15%;
          box-shadow: inset 0 5px 10px rgba(0, 0, 0, 0.1),
                      inset 0 -5px 10px rgba(255, 255, 255, 0.7);
        }

        .dice-dot {
          background: #1a1a1a;
          border-radius: 50%;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.5);
        }

        /* 点的位置 */
        .dice-face {
          display: grid;
          grid-template-areas:
            "a . b"
            "c d e"
            "f . g";
          gap: 10%;
          padding: 15%;
        }

        .top-left { grid-area: a; }
        .top-right { grid-area: b; }
        .middle-left { grid-area: c; }
        .center { grid-area: d; }
        .middle-right { grid-area: e; }
        .bottom-left { grid-area: f; }
        .bottom-right { grid-area: g; }
      `}</style>
    </div>
  );
}
