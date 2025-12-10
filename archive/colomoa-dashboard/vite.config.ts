import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Docker等の外部からのアクセスを許可
    port: 8080, // ポートを8080に固定
    watch: {
      usePolling: true, // Docker環境でのファイル変更検知を確実にする
    },
  },
});
