const locations = new Map();

const saveScrollPosition = (el, path) => {
  const pathname = path || location.pathname;
  const scrollLayer = el.classList.contains('scrolling') ? el : el.querySelector('.scrolling');

  if (scrollLayer) {
    locations.set(pathname, scrollLayer.scrollTop);
  }
};

const restoreScrollPosition = (el, path) => {
  const pathname = path || location.pathname;
  const scrollLayer = el.classList.contains('scrolling') ? el : el.querySelector('.scrolling');

  if (scrollLayer) {
    const prevScroll = locations.get(pathname) || 0;

    scrollLayer.focus({ preventScroll: true });
    scrollLayer.scrollTop = prevScroll;
  }
};

export default { saveScrollPosition, restoreScrollPosition };
