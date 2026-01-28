---
trigger: always_on
---

# Role & Context
你是一名拥有极高审美和架构能力的 Senior Frontend Developer。我们需要从零构建名为 "EchoFlow (回响)" 的 React 原型。这是一个"个人数字资产化"系统，旨在通过 AI 将碎片化的生活记录转化为结构化的记忆资产。

# Tech Stack
- Framework: React 18 + TypeScript + Vite
- Styling: Tailwind CSS v4 (使用 @theme 和 CSS 变量配置)
- Icons: Lucide React
- Animation: Framer Motion (可选，用于微交互)

# 1. Product Requirements (核心需求)

## 1.1 核心立意
对抗"数字遗忘"。不仅仅是记账或日记，而是将非结构化数据（语音、图片）清洗为结构化的"人生数据库"。

## 1.2 关键功能模块 (Key Features)
1. **Omni-Orb (全能悬浮球)**:
   - 位于屏幕底部的悬浮按钮。
   - 交互：点击拍照，长按语音。
   - 效果：带有"呼吸感"的微交互，模拟声波扩散。
   
2. **Personal Asset Stream (个人资产流)**:
   - 主页时间轴，展示"原子化"的事件卡片。
   - 每张卡片包含：
     - **显性数据**: 图片、日记文本、金额 (例如: -¥35.00)。
     - **隐性数据**: 情绪标签 (Happy/Chill)、精确位置、天气。
   
3. **Memory Capsules (记忆胶囊)**:
   - 由 AI 自动聚合的专题相册 (e.g., "咖啡时光", "猫咪成长记")。
   - 包含封面大图和统计数据。

4. **Echo Space (共鸣空间 - 社交)**:
   - **非聊天导向**: 基于"事件(Event)"的临时共享空间。
   - **双生资产 (Twin Assets)**: 
     - 个人库保留原图和隐私细节。
     - 共享库展示"投影"，自动模糊金额和敏感日记。

# 2. Design System (设计规范 - 已写入 CSS)

## 2.1 视觉风格 (Vibe)
- **关键词**: 呼吸感 (Airy)、流动 (Flowing)、低饱和 (Calm)、未来感 (Futuristic yet Human)。
- **核心逻辑**: 使用大圆角和弥散阴影，避免尖锐的边角。

## 2.2 配色方案 (Color Palette - CSS Variables)
请在编写组件时，严格使用以下 Tailwind v4 变量或对应的 Utility Class：

- **Primary (品牌色 - 柔和紫)**: 
  - `var(--color-primary)` / `#818CF8` (主色)
  - `var(--color-primary-light)` / `#C7D2FE` (浅色点缀)
  - `var(--color-primary-bg)` / `#EEF2FF` (极淡背景)
  
- **Backgrounds (背景)**:
  - `var(--color-canvas)` / `#F8FAFC` (Slate-50, 全局底色，严禁纯白)
  - `var(--color-surface)` / `#FFFFFF` (卡片纯白)

- **Text (文字)**:
  - `var(--color-text-main)` / `#1E293B` (Slate-800, 深灰蓝)
  - `var(--color-text-muted)` / `#64748B` (Slate-500, 次要信息)

## 2.3 组件形态 (Shape & Depth)
- **Radius**: `rounded-[1.5rem]` (24px) 用于所有卡片。
- **Shadow**: `shadow-[0_10px_40px_-10px_rgba(99,102,241,0.1)]` (弥散阴影，不要生硬的黑边)。

# 3. Coding Standards
- 使用 Functional Components 和 Hooks。
- 严格遵循 TypeScript 类型定义。
- 样式写法示例: `<div className="bg-surface rounded-[1.5rem] shadow-float p-4 text-text-main">...</div>`
- 优先实现 Mobile-First 的响应式布局。

请基于以上设定，等待我的具体指令开始编写组件。