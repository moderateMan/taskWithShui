const icons: Record<string, string> = {};
const loadStatusMap = {
  NO_START: 0,
  LOADING: 1,
  LOADED: 2,
};
let loadStatus = loadStatusMap.NO_START;

const importAllIcons = (r: __WebpackModuleApi.RequireContext) => {
  return Promise.all(
    r.keys().map((key) =>
      fetch(r(key))
        .then((res) => res.text())
        .then((src) => {
          icons[key.replace(/\.\/(\S+)\.svg$/, "$1")] = src;
        })
    )
  );
};

const renderSvgSprite = () => {
  const symbols = Object.keys(icons)
    .map((iconName) => {
      const svgContent = icons[iconName];
      return `<symbol id="icon-${iconName}">${svgContent}</symbol>`;
    })
    .join("");
  return svgSprite(symbols);
};

const loadSprite = () => {
  if (
    loadStatus === loadStatusMap.LOADED ||
    loadStatus === loadStatusMap.LOADING
  )
    return;
  loadStatus = loadStatusMap.LOADING;
  importAllIcons(require.context("./assets", false, /\.svg$/)).then(() => {
    loadStatus = loadStatusMap.LOADED;
    if (!document) {
      return;
    }
    const existing = document.getElementById("__SVG_SPRITE_NODE__");
    const mountNode = document.body;

    if (!existing) {
      mountNode.insertAdjacentHTML("afterbegin", renderSvgSprite());
    }
  });
};

const svgSprite = (contents: string) => `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    id="__SVG_SPRITE_NODE__"
    style="display:none;overflow:hidden;width:0;height:0"
  >
    <defs>
      ${contents}
    </defs>
  </svg>
`;

export default loadSprite;
