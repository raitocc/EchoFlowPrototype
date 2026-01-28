import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// import tailwindcss from '@tailwindcss/vite' // Removed to fix build error
// 但为了简单，我们只用 PostCSS 方式，这是最通用的。

export default defineConfig({
  plugins: [react()],
})