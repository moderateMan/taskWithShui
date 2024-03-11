const jsonParse = (json: string | null) => {
  if (!json) return json;
  try {
    return JSON.parse(json);
  } catch {
    return json;
  }
};

export const getLocalInToday = <T>(key: string) => {
  const item = localStorage.getItem(key);
  const obj = jsonParse(item);
  if (obj?.value && obj?.expire) {
    if (obj.expire > Date.now()) {
      return obj.value as T;
    }
  }
  localStorage.removeItem(key);
  return undefined;
};

export const setLocalInToday = <T>(key: string, item: T) => {
  const data = {
    value: item,
    expire: new Date().setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000,
  };
  localStorage.setItem(key, JSON.stringify(data));
};

export const getSession = <T>(key: string) => {
  const item = sessionStorage.getItem(key);
  return jsonParse(item) as T | undefined;
};

export const setSession = <T>(key: string, item: T) => {
  sessionStorage.setItem(key, JSON.stringify(item));
};
