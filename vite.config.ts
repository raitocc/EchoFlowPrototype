import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite' // 如果你用 PostCSS 插件方式，其实这里不需要 tailwindcss 插件，保持 react 插件即可。
// 但为了简单，我们只用 PostCSS 方式，这是最通用的。

export default defineConfig({
  plugins: [react()],
})