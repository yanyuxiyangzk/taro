#!/usr/bin/env python3
# 在 FengShuiAnalysisPage.tsx 中插入罗盘组件

with open('FengShuiAnalysisPage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 要插入的罗盘代码
compass_code = '''
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

'''

# 在 "Upload Section" 注释之前插入
new_content = content.replace(
    '      {/* Upload Section */',
    compass_code + '      {/* Upload Section */'
)

with open('FengShuiAnalysisPage.tsx', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("罗盘组件已成功插入!")
