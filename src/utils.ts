export function debounce(cb: (...args: any) => void, timeout = 300) {
  let timer: any = null;
  return (...args: any) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      cb(...args);
    }, timeout);
  };
}
