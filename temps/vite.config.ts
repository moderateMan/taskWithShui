import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve, join } from "path";
import { existsSync, readdirSync, statSync } from "fs";
import chalk from "chalk";

const getEntries = () => {
  const pagesPath = resolve(__dirname, "pages");
  const pages = readdirSync(pagesPath);
  const ret = pages
    .filter((p) => {
      const stat = statSync(join(pagesPath, p));
      if (stat.isDirectory()) {
        return existsSync(join(pagesPath, p, "index.html"));
      }
      return false;
    })
    .reduce(
      (pre, cur) => ({ ...pre, [cur]: join(pagesPath, cur, "index.html") }),
      {}
    );
  const names = Object.keys(ret).map((n) => chalk.bgBlue(n));
  console.log(
    chalk.yellowBright(
      `本次构建共有 ${names.length} 个页面，分别为 ${names.join("、")}`
    )
  );
  return ret;
};

// https://vitejs.dev/config/
export default defineConfig({
  root: "./pages",
  plugins: [react()],
  build: {
    outDir: resolve(__dirname, `dist`),
    emptyOutDir: true,
    rollupOptions: {
      input: getEntries(),
      output: {
        entryFileNames: "[name]/[name].[hash].js",
        chunkFileNames: "[name]/[name].[hash].js",
        assetFileNames: "[ext]/[name].[hash].[ext]",
      },
    },
  },
});
