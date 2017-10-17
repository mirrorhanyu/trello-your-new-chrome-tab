const get = (key) => {
  return localStorage.getItem(key);
};

const set = (key, data) => {
  localStorage.setItem(key, data)
};

export {
  get, set
}