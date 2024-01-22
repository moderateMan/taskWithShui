const jsonParse = (json: string | null) => {
  if (!json) return json;
  try {
    return JSON.parse(json);
  } catch {
    return json;
  }
};

export const getLocal = <T>(key: string) => {
  const item = localStorage.getItem(key);
  return jsonParse(item) as T | undefined;
};

export const setLocal = <T>(key: string, item: T) => {
  localStorage.setItem(key, JSON.stringify(item));
};

export const getSession = <T>(key: string) => {
  const item = sessionStorage.getItem(key);
  return jsonParse(item) as T | undefined;
};

export const setSession = <T>(key: string, item: T) => {
  sessionStorage.setItem(key, JSON.stringify(item));
};
