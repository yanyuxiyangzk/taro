import { X } from 'lucide-react';

interface ZodiacSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedZodiac: string;
  onSelect: (zodiac: string) => void;
}

const zodiacData = [
  { name: '白羊座', symbol: '♈', dates: '03.21-04.19', icon: '🐏' },
  { name: '金牛座', symbol: '♉', dates: '04.20-05.20', icon: '🐂' },
  { name: '双子座', symbol: '♊', dates: '05.21-06.21', icon: '👯' },
  { name: '巨蟹座', symbol: '♋', dates: '06.22-07.22', icon: '🦀' },
  { name: '狮子座', symbol: '♌', dates: '07.23-08.22', icon: '🦁' },
  { name: '处女座', symbol: '♍', dates: '08.23-09.22', icon: '👧' },
  { name: '天秤座', symbol: '♎', dates: '09.23-10.23', icon: '⚖️' },
  { name: '天蝎座', symbol: '♏', dates: '10.24-11.22', icon: '🦂' },
  { name: '射手座', symbol: '♐', dates: '11.23-12.21', icon: '🏹' },
  { name: '摩羯座', symbol: '♑', dates: '12.22-01.19', icon: '🐐' },
  { name: '水瓶座', symbol: '♒', dates: '01.20-02.18', icon: '🏺' },
  { name: '双鱼座', symbol: '♓', dates: '02.19-03.20', icon: '🐟' },
];

export default function ZodiacSelectionModal({
  isOpen,
  onClose,
  selectedZodiac,
  onSelect,
}: ZodiacSelectionModalProps) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Header */}
      <div className="relative p-6 pb-8">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-purple-300 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-white text-2xl font-bold text-center mt-4">选择星座</h2>
      </div>

      {/* Zodiac Grid */}
      <div className="px-6 pb-40 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 240px)' }}>
        <div className="grid grid-cols-3 gap-4">
          {zodiacData.map((zodiac) => {
            const isSelected = selectedZodiac === zodiac.name;
            return (
              <button
                key={zodiac.name}
                onClick={() => onSelect(zodiac.name)}
                className={`relative flex flex-col items-center p-4 rounded-2xl transition-all duration-300 ${
                  isSelected
                    ? 'bg-gradient-to-br from-purple-600 to-purple-700 shadow-lg shadow-purple-500/50 scale-105'
                    : 'bg-purple-900/40 border border-purple-500/40 hover:bg-purple-800/50 hover:scale-105'
                }`}
              >
                {/* Constellation Icon */}
                <div className="text-5xl mb-2 opacity-80">{zodiac.icon}</div>
                
                {/* Zodiac Symbol */}
                <div className={`text-3xl mb-2 ${isSelected ? 'text-white' : 'text-purple-300'}`}>
                  {zodiac.symbol}
                </div>
                
                {/* Name */}
                <div className={`text-sm font-medium mb-1 ${isSelected ? 'text-white' : 'text-purple-200'}`}>
                  {zodiac.name}
                </div>
                
                {/* Date Range */}
                <div className={`text-xs ${isSelected ? 'text-purple-100' : 'text-purple-400'}`}>
                  {zodiac.dates}
                </div>

                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute top-2 right-2">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                    </div>
                  </div>
                )}

                {/* Sparkle decoration for selected */}
                {isSelected && (
                  <>
                    <div className="absolute top-1 left-1 text-yellow-300 text-xs animate-pulse">✨</div>
                    <div className="absolute bottom-1 right-1 text-yellow-300 text-xs animate-pulse" style={{ animationDelay: '0.5s' }}>✨</div>
                  </>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Confirm Button */}
      <div className="fixed bottom-20 left-0 right-0 px-6 py-6 bg-black">
        <button
          onClick={handleConfirm}
          className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-5 rounded-full text-xl font-bold transition-all shadow-xl shadow-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/60"
        >
          确认
        </button>
      </div>
    </div>
  );
}
