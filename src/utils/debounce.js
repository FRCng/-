export function debounce(func, wait = 500) {
  let timer;
  return function () {
    let arg = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, ...arg);
    }, wait);
  };
}
