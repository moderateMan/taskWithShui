export const getTextByHtml = (html?: string) => {
  if (!html) return html;
  const container: null | HTMLDivElement = document.createElement("div");
  container.innerHTML = html;
  const ret = container.innerText;
  return ret;
};
