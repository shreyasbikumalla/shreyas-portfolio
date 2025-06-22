import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/shreyas-portfolio/",   // <- repo name with leading & trailing slash
});
