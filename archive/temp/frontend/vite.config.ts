import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Dockerの構成に合わせてHostを公開
    host: "0.0.0.0",
    port: 5173,
    // 【重要】/api へのリクエストをバックエンド(8888)に転送する設定
    proxy: {
      "/api": {
        target: "http://backend:8888", // Docker内での名前解決
        changeOrigin: true,
        // localhostで開発する場合用（Docker外から叩くとき）のフォールバックは
        // 実際の運用環境に合わせて調整が必要ですが、まずはこれで。
      },
    },
  },
});
