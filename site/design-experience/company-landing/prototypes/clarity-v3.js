'use strict';
(() => {
  const story = document.querySelector('.clarity-story');
  const intro = document.querySelector('.clarity-intro');
  const result = document.querySelector('.clarity-result');
  const headline = document.querySelector('#hero-title');
  const resultTitle = result.querySelector('h2');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const shortScreen = matchMedia('(max-height: 639px)');
  const still = new URLSearchParams(location.search).has('still');
  const marker = document.createElement('span');
  marker.className = 'clarity-marker';
  marker.setAttribute('aria-hidden', 'true');
  story.append(marker);
  headline.tabIndex = -1;
  resultTitle.tabIndex = -1;
  let enhanced = false;
  function setResolved(resolved) {
    const outgoing = resolved ? intro : result;
    const incoming = resolved ? result : intro;
    const target = resolved ? resultTitle : headline;
    const transferFocus = outgoing.contains(document.activeElement);
    incoming.inert = false;
    if (transferFocus) target.focus({ preventScroll: true });
    outgoing.inert = true;
  }
  const observer = new IntersectionObserver(entries => {
    if (!enhanced) return;
    setResolved(entries[0].boundingClientRect.top < innerHeight);
  });
  function setMode() {
    enhanced = CSS.supports('animation-timeline: view()') && !reduced.matches && !shortScreen.matches && !still;
    document.documentElement.classList.toggle('clarity-enhanced', enhanced);
    observer.disconnect();
    if (enhanced) {
      setResolved(marker.getBoundingClientRect().top < innerHeight);
      observer.observe(marker);
    } else {
      intro.inert = false;
      result.inert = false;
    }
  }
  reduced.addEventListener('change', setMode);
  shortScreen.addEventListener('change', setMode);
  setMode();
})();
