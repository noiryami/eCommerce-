import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr"
import path, { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  resolve:{
    alias:{
      "@components":path.resolve(__dirname,'./src/components'),
      "@assets":path.resolve(__dirname,'./src/assets'),
      "@hooks":path.resolve(__dirname,'./src/hooks'),
      "@utils":path.resolve(__dirname,'./src/utils'),
      "@routes":path.resolve(__dirname,'./src/routes'),
      "@store":path.resolve(__dirname,'./src/store'),
      "@types":path.resolve(__dirname,'./src/types'),
      "@services":path.resolve(__dirname,'./src/services'),
      "@styles":path.resolve(__dirname,'./src/styles'),
      "@pages":path.resolve(__dirname,'./src/pages'),
      "@layouts":path.resolve(__dirname,'./src/layouts'),
      "@context":path.resolve(__dirname,'./src/context'),
      "@validations":path.resolve(__dirname, './src/validations'),
    }
  },
  plugins: [react(), svgr(), ],
})
