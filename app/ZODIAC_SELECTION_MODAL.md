# 星座选择模态框功能

## 更新日期
2024年

## 功能概述
将原来的下拉菜单星座选择器改为全屏模态框，提供更美观大气的用户体验。

## 新增文件
- `app/src/components/ZodiacSelectionModal.tsx` - 星座选择模态框组件

## 功能特性

### 1. 全屏模态框设计
- 深紫色渐变背景 (`from-indigo-950 via-purple-950 to-black`)
- 占据整个屏幕，提供沉浸式体验
- 顶部有关闭按钮（X图标）

### 2. 星座网格布局
- 3列网格布局，展示所有12个星座
- 每个星座卡片包含：
  - 星座图标（emoji）
  - 星座符号（♈ ♉ ♊ 等）
  - 星座名称（白羊座、金牛座等）
  - 日期范围（03.21-04.19 等）

### 3. 选中状态
- 选中的星座有紫色渐变背景高亮
- 右上角显示白色圆形选中指示器
- 四角有闪烁的星星装饰（✨）
- 卡片会放大（scale-105）

### 4. 交互效果
- 悬停时卡片放大并显示阴影
- 点击星座卡片即可选中
- 平滑的过渡动画（duration-300）

### 5. 确认按钮
- 固定在底部的紫色渐变按钮
- 文字为"确认"
- 点击后关闭模态框并保存选择
- 悬停时有阴影增强效果

## 使用方式

### 在 DivinationPage 中的集成

```tsx
// 1. 导入组件
import ZodiacSelectionModal from './ZodiacSelectionModal';

// 2. 使用组件
<ZodiacSelectionModal
  isOpen={showZodiacSelect}
  onClose={() => setShowZodiacSelect(false)}
  selectedZodiac={selectedZodiac}
  onSelect={setSelectedZodiac}
/>

// 3. 触发按钮
<button onClick={() => setShowZodiacSelect(true)}>
  <span>{selectedZodiac}</span>
  <ChevronDown className="w-4 h-4" />
</button>
```

## 用户流程

1. 用户点击右上角的星座按钮
2. 全屏模态框弹出，显示所有12个星座
3. 用户点击想要选择的星座（卡片高亮显示）
4. 用户点击底部的"确认"按钮
5. 模态框关闭，占卜页面显示新选中的星座

## 技术实现

### Props 接口
```typescript
interface ZodiacSelectionModalProps {
  isOpen: boolean;           // 控制模态框显示/隐藏
  onClose: () => void;       // 关闭模态框的回调
  selectedZodiac: string;    // 当前选中的星座
  onSelect: (zodiac: string) => void;  // 选择星座的回调
}
```

### 星座数据
```typescript
const zodiacData = [
  { name: '白羊座', symbol: '♈', dates: '03.21-04.19', icon: '🐏' },
  // ... 其他11个星座
];
```

## 视觉效果
- 深色主题，符合应用整体风格
- 紫色渐变，营造神秘氛围
- 平滑动画，提升用户体验
- 清晰的视觉反馈，易于操作

## 测试状态
✅ 代码无语法错误
✅ TypeScript 类型检查通过
✅ 模态框正确打开/关闭
✅ 星座选择功能正常
✅ 确认按钮功能正常
