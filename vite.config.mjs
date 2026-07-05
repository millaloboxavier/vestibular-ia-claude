import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Em desenvolvimento local, use `vercel dev` em vez de `vite dev` sozinho —
// assim as funções em /api rodam de verdade. O `vite dev` puro só serve o
// front-end e não executa as serverless functions.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
});
