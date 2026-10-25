'use strict';

// The explorer uses only these fictional notes. No requests or persistent writes.
const notes = [
  { id: 'amina', initials: 'AM', name: 'Amina M.', source: 'Research call', quote: 'I remember the project, just not what we called it.', context: 'When I come back to a project a month later, I remember the client and what we were making. I remember the project, just not what we called it. I usually open a few folders until something looks familiar.', available: true },
  { id: 'jules', initials: 'JT', name: 'Jules T.', source: 'Support note', quote: 'Could I search by the client instead?', context: 'Could I search by the client instead?', available: false },
  { id: 'ren', initials: 'RL', name: 'Ren L.', source: 'Team interview', quote: 'The filter is there. I just never know which one to use.', context: 'The filter is there. I just never know which one to use. If I could type the client or a few words from the brief, I would not need to remember how we organised the project.', available: true },
];
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const sample = $('#sample-dialog');
const search = $('#feedback-search');
const sourceDetail = $('#source-detail');
let step = 0;
let activeNote = null;
let sampleInvoker = null;

function icon(name) {
  const img = document.createElement('img');
  img.src = `assets/icons/${name}.svg`;
  img.alt = '';
  img.className = 'icon';
  return img;
}
function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}
function renderNotes() {
  const query = search.value.trim().toLocaleLowerCase();
  const filtered = notes.filter(note => `${note.name} ${note.source} ${note.quote} ${note.context}`.toLocaleLowerCase().includes(query));
  const list = $('#sample-notes');
  list.replaceChildren();
  for (const note of filtered) {
    const button = element('button', 'sample-note-button');
    button.type = 'button';
    button.dataset.noteId = note.id;
    button.setAttribute('aria-expanded', String(activeNote === note.id));
    button.setAttribute('aria-controls', 'source-detail');
    const author = element('span', 'note-source');
    const name = element('span', '', note.name);
    name.append(element('small', '', note.source));
    author.append(element('span', 'avatar', note.initials), name);
    const source = element('span', 'source-cta', 'Read source context');
    source.append(icon('arrow-right'));
    button.append(author, element('span', '', `“${note.quote}”`), source);
    button.addEventListener('click', () => showSource(note.id));
    list.append(button);
  }
  $('#empty-state').hidden = filtered.length > 0;
  $('#clear-search').hidden = !query;
  $('#search-status').textContent = `${filtered.length} sample ${filtered.length === 1 ? 'note' : 'notes'}${query ? ' match your search' : ''}`;
}
function clearSource() {
  activeNote = null;
  sourceDetail.hidden = true;
  sourceDetail.replaceChildren();
}
function showSource(id) {
  const note = notes.find(note => note.id === id);
  if (!note) return;
  activeNote = id;
  sourceDetail.replaceChildren();
  sourceDetail.append(element('span', 'eyebrow', `${note.source} / Fictional source`), element('h4', '', `Context from ${note.name}`));
  if (!note.available) {
    const notice = element('p', '', 'The full conversation is not included in this sample. The saved quote is still available below.');
    notice.setAttribute('role', 'status');
    sourceDetail.append(notice);
  }
  sourceDetail.append(element('blockquote', '', `“${note.context}”`), element('p', 'fine', 'Linked theme: Finding work'));
  const back = element('button', 'button secondary source-return', 'Back to the notes');
  back.prepend(icon('arrow-left'));
  back.addEventListener('click', () => {
    clearSource();
    renderNotes();
    $(`[data-note-id="${id}"]`)?.focus();
  });
  sourceDetail.append(back);
  sourceDetail.hidden = false;
  renderNotes();
  sourceDetail.scrollIntoView({ block: 'nearest', behavior: 'instant' });
  sourceDetail.focus({ preventScroll: true });
}
function setStep(value, focusHeading = true) {
  step = Math.max(0, Math.min(2, value));
  $$('[data-panel]').forEach(panel => { panel.hidden = Number(panel.dataset.panel) !== step; });
  $$('[data-step]').forEach(button => {
    if (Number(button.dataset.step) === step) button.setAttribute('aria-current', 'step');
    else button.removeAttribute('aria-current');
  });
  $('#previous-step').hidden = step === 0;
  const next = $('#next-step');
  next.replaceChildren(document.createTextNode(['Find the shared need', 'See the decision', 'Back to the page'][step]), icon(step === 2 ? 'check' : 'arrow-right'));
  $('#explorer-body').scrollTop = 0;
  if (focusHeading) $(`[data-panel="${step}"] h3`).focus({ preventScroll: true });
}
function closeSample() { sample.close(); }
$$('[data-open-sample]').forEach(button => button.addEventListener('click', () => {
  sampleInvoker = button;
  search.value = '';
  clearSource();
  renderNotes();
  setStep(0, false);
  sample.showModal();
  search.focus({ preventScroll: true });
}));
$$('[data-close-sample]').forEach(button => button.addEventListener('click', closeSample));
sample.addEventListener('close', () => sampleInvoker?.focus({ preventScroll: true }));
$$('[data-step]').forEach(button => button.addEventListener('click', () => setStep(Number(button.dataset.step))));
$('#previous-step').addEventListener('click', () => setStep(step - 1));
$('#next-step').addEventListener('click', () => step === 2 ? closeSample() : setStep(step + 1));
search.addEventListener('input', () => { clearSource(); renderNotes(); });
function resetSearch() { search.value = ''; clearSource(); renderNotes(); search.focus(); }
$('#clear-search').addEventListener('click', resetSearch);
$('#reset-search').addEventListener('click', resetSearch);
$('#view-evidence').addEventListener('click', () => {
  search.value = '';
  clearSource();
  setStep(0, false);
  renderNotes();
  showSource('amina');
});

const navigation = $('#navigation-dialog');
const menuButton = $('.menu-toggle');
menuButton.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'true');
  menuButton.setAttribute('aria-label', 'Close menu');
  navigation.showModal();
});
$('.menu-close').addEventListener('click', () => navigation.close());
navigation.addEventListener('close', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open menu');
  if (matchMedia('(max-width:760px)').matches) menuButton.focus({ preventScroll: true });
});
$$('nav a', navigation).forEach(link => link.addEventListener('click', () => navigation.close()));
matchMedia('(max-width:760px)').addEventListener('change', event => {
  if (!event.matches && navigation.open) {
    navigation.close();
    $('.desktop-links a').focus({ preventScroll: true });
  }
});
const legal = $('#legal-dialog');
let legalInvoker;
$$('[data-open-legal]').forEach(button => button.addEventListener('click', () => {
  legalInvoker = button;
  const privacy = button.dataset.openLegal === 'privacy';
  $('#legal-title').textContent = privacy ? 'Privacy in this sample' : 'About this concept';
  $('#legal-content').replaceChildren(element('p', '', privacy
    ? 'This example does not collect your input, use analytics or store your choices. Search runs in your browser against fictional notes. All fonts and icons are served with the page.'
    : 'Threadnote is a fictional design example, not an available commercial service. All people, quotes and product decisions are sample content. No account, purchase or real customer integration is provided.'));
  const paragraph = element('p');
  const link = element('a', '', 'Return to the design case');
  link.href = '../';
  paragraph.append(link);
  $('#legal-content').append(paragraph);
  legal.showModal();
}));
$('#close-legal').addEventListener('click', () => legal.close());
legal.addEventListener('close', () => legalInvoker?.focus({ preventScroll: true }));
// Keep document focus inside each modal at the first/last Tab boundary.
$$('dialog').forEach(dialog => dialog.addEventListener('keydown', event => {
  if (event.key !== 'Tab') return;
  const controls = $$('a[href],button:not([disabled]),input:not([disabled]),summary,[tabindex]:not([tabindex="-1"])', dialog)
    .filter(node => node.getClientRects().length > 0);
  const first = controls[0];
  const last = controls.at(-1);
  if ((!event.shiftKey && document.activeElement === last) || (event.shiftKey && document.activeElement === first)) {
    event.preventDefault();
    (event.shiftKey ? last : first)?.focus();
  }
}));

// One section clock; hidden/offscreen sections do not advance. Capture drives it explicitly.
const params = new URLSearchParams(location.search);
const captureMode = params.has('capture');
const loopMode = params.has('loop');
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
let stillMode = params.has('still') || motionPreference.matches;
let paused = false;
let lastTime = null;
let animationFrame = null;
const sections = $$('[data-story]').map((card, index) => ({ card, index, time: 0, visible: false, started: false }));
const clamp = value => Math.max(0, Math.min(1, value));
const inOut = value => value < .5 ? 4 * value ** 3 : 1 - ((-2 * value + 2) ** 3) / 2;
function track(keys, time) {
  if (time <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    if (time <= keys[i][0]) {
      const [start, a] = keys[i - 1];
      const [end, b] = keys[i];
      return a + (b - a) * inOut(clamp((time - start) / (end - start)));
    }
  }
  return keys.at(-1)[1];
}
function drawStory(section, time, rest = false) {
  const card = section.card;
  // Every story has a quiet resting frame at both ends of its six-second cycle.
  const t = rest ? 0 : ((Math.max(0, time - 2.4) + section.index * .7) % 6);
  if (card.dataset.story === 'collect') {
    $$('[data-note]', card).forEach((row, index) => {
      if (index === 0) {
        const y = track([[0,0],[.3,0],[.8,-16],[1,24],[1.9,0],[6,0]], t);
        const opacity = track([[0,1],[.3,1],[.75,0],[1,0],[1.9,1],[6,1]], t);
        row.style.transform = `translate3d(0,${y}px,0)`;
        row.style.opacity = String(opacity);
        row.style.filter = `blur(${(1-opacity) * 4}px)`;
      } else {
        const amount = track([[0,0],[.4,0],[1.1,1],[1.8,1],[2.6,0],[6,0]], t);
        row.style.transform = `translate3d(0,${12 * amount}px,0)`;
        row.style.opacity = String(1 - .12 * amount);
        row.style.filter = '';
      }
    });
  } else if (card.dataset.story === 'connect') {
    const amount = track([[0,0],[.4,0],[1.3,1],[3.5,1],[4.6,0],[6,0]], t);
    $$('[data-snippet]', card).forEach((node, index) => {
      const x = index === 0 ? amount * 12 : index === 1 ? -amount * 12 : 0;
      node.style.transform = `${index === 2 ? 'translateX(-50%) ' : ''}translate3d(${x}px,${amount * (index === 2 ? 12 : 8)}px,0)`;
    });
    $('[data-theme-node]', card).style.transform = `translateX(-50%) scale(${1 + .035 * amount})`;
    const trace = track([[0,1],[.4,1],[.8,0],[1.8,1],[6,1]], t);
    $('[data-trace]', card).style.clipPath = `inset(0 0 ${Math.round(100 - trace * 100)}% 0)`;
  } else {
    const amount = track([[0,0],[.5,0],[1.4,1],[3.4,1],[4.5,0],[6,0]], t);
    const beam = track([[0,1],[.4,1],[.8,0],[1.8,1],[6,1]], t);
    $('[data-evidence-beam]', card).style.transform = `translateY(${(1 - beam) * -100}%)`;
    $('[data-linked-theme]', card).style.transform = `translateY(${-4 * amount}px)`;
    $('[data-linked-quote]', card).style.transform = `translateY(${-8 * amount}px)`;
    $('[data-linked-quote]', card).style.opacity = String(1 - .12 * amount);
  }
}
function drawCapture(section, absoluteTime) {
  const cycle = loopMode ? absoluteTime % 12 : absoluteTime;
  const entrance = clamp((cycle - section.index * .09) / .9);
  const eased = 1 - (1 - entrance) ** 3;
  const dissolve = loopMode ? 1 - clamp((cycle - 11) / .5) : 1;
  section.card.style.opacity = String(eased * dissolve);
  section.card.style.transform = `translateY(${24 * (1 - eased)}px) scale(${.985 + .015 * eased})`;
  section.card.style.filter = `blur(${6 * (1 - eased)}px)`;
  drawStory(section, cycle, cycle < 2.4 || cycle >= 10.5);
}
function setStatic() {
  document.documentElement.classList.toggle('still-mode', stillMode);
  document.documentElement.classList.toggle('js-motion', !stillMode);
  if (stillMode) {
    $$('.reveal,[data-intro],.feature').forEach(node => node.classList.add('is-visible'));
    sections.forEach(section => {
      section.card.style.opacity = '';
      section.card.style.transform = '';
      section.card.style.filter = '';
      drawStory(section, 0, true);
    });
  }
  const control = $('#motion-toggle');
  control.disabled = stillMode;
  control.setAttribute('aria-pressed', String(stillMode || paused));
  $('span', control).textContent = stillMode ? 'Still view' : paused ? 'Resume motion' : 'Pause motion';
  $('img', control).src = `assets/icons/${paused ? 'play' : 'pause'}.svg`;
}
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); } });
}, { threshold: .15 });
$$('.reveal,[data-intro]').forEach(node => revealObserver.observe(node));
$$('.intro-item').forEach((node, i) => node.style.setProperty('--intro-delay', `${Math.min(i % 12, 8) * .08}s`));
const storyObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const section = sections.find(item => item.card === entry.target);
    section.visible = entry.isIntersecting;
    if (section.visible && !section.started) {
      section.started = true;
      section.card.classList.add('is-visible');
    }
  });
  requestFrame();
}, { threshold: .3 });
sections.forEach(section => storyObserver.observe(section.card));
const taglineWords = $$('.tagline>p span');
const eligibleWords = new Set();
let nextWord = 0;
let wordTimer = null;
function activateNextWord() {
  if (stillMode) return;
  const word = taglineWords[nextWord];
  if (!word || !eligibleWords.has(word)) return;
  word.classList.add('lit');
  nextWord += 1;
  wordTimer = setTimeout(() => { wordTimer = null; activateNextWord(); }, 100);
}
const wordObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      eligibleWords.add(entry.target);
      wordObserver.unobserve(entry.target);
    }
  });
  if (wordTimer === null) activateNextWord();
}, { rootMargin: '0px 0px -20% 0px', threshold: 1 });
taglineWords.forEach(word => wordObserver.observe(word));
function canAnimate() { return !captureMode && !stillMode && !paused && !document.hidden && sections.some(section => section.visible); }
function frame(now) {
  animationFrame = null;
  if (!canAnimate()) { lastTime = null; return; }
  const dt = lastTime === null ? 0 : Math.min((now - lastTime) / 1000, .05);
  lastTime = now;
  sections.forEach(section => {
    if (!section.visible) return;
    section.time += dt;
    if (loopMode) drawCapture(section, section.time);
    else drawStory(section, section.time, section.time < 2.4);
  });
  requestFrame();
}
function requestFrame() {
  if (canAnimate() && animationFrame === null) animationFrame = requestAnimationFrame(frame);
}
$('#motion-toggle').addEventListener('click', () => { paused = !paused; lastTime = null; setStatic(); requestFrame(); });
document.addEventListener('visibilitychange', () => { lastTime = null; requestFrame(); });
motionPreference.addEventListener('change', () => {
  stillMode = params.has('still') || motionPreference.matches;
  lastTime = null;
  setStatic();
  if (!stillMode && wordTimer === null) activateNextWord();
  requestFrame();
});
if (captureMode) document.documentElement.classList.add('capture-mode');
setStatic();
if (captureMode) {
  // Capture has no rAF; deterministic advancement belongs to its caller.
  window.__lt = 0;
  window.__start = () => {
    window.__lt = 0;
    $$('.reveal,[data-intro],.feature').forEach(node => node.classList.add('is-visible'));
    if (stillMode) setStatic();
    else sections.forEach(section => drawCapture(section, 0));
  };
  window.__tick = dt => {
    if (stillMode) return;
    window.__lt += Math.max(0, dt);
    sections.forEach(section => drawCapture(section, window.__lt));
  };
  window.__seek = time => { window.__start(); window.__tick(time); };
  window.__motionState = () => sections.map(section => ({ story:section.card.dataset.story, time:section.time, visible:section.visible }));
}
