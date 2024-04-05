#!/usr/bin/env node

import inquirer from "inquirer";
import ora from "ora";
import { dirname, resolve, join } from "path";
import { mkdirSync, writeFileSync, existsSync, rmSync } from "fs";

const mainTemplate = `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
`;

const htmlTemplate = (title) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="./main.tsx"></script>
  </body>
</html>
`;

const appTemplate = `function App() {
  return <></>;
}

export default App;
`;

const cssTemplate = `@tailwind base;
@tailwind components;
@tailwind utilities;
`;

const run = async () => {
  const { name, title } = await inquirer.prompt([
    {
      name: "name",
      type: "input",
      message: "请输入页面名称",
      default: "page",
    },
    {
      name: "title",
      type: "input",
      message: "请输入页面标题",
      default: "page title",
    },
  ]);
  const pages = resolve(dirname(""), "pages");

  if (!existsSync(pages)) {
    mkdirSync(pages);
  }
  const pageDirPath = join(pages, name);
  if (existsSync(pageDirPath)) {
    const { confirm } = await inquirer.prompt([
      {
        name: "confirm",
        type: "confirm",
        message: "页面已存在，是否删除",
        default: true,
      },
    ]);
    if (confirm) {
      rmSync(pageDirPath, { recursive: true, force: true });
    }
  }
  const spinner = ora("正在创建页面！").start();
  mkdirSync(pageDirPath);
  writeFileSync(join(pageDirPath, "index.html"), htmlTemplate(title));
  writeFileSync(join(pageDirPath, "main.tsx"), mainTemplate);
  writeFileSync(join(pageDirPath, "App.tsx"), appTemplate);
  writeFileSync(join(pageDirPath, "index.css"), cssTemplate);
  spinner.succeed("创建成功！");
};

run();
