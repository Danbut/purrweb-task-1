const storage = window.localStorage;

export const setItem = (key: string, value: any) => {
  storage.setItem(key, value);
}

export const getItem = (key: string) => storage.getItem(key);
