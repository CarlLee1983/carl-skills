'use strict';
const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
const params = new URLSearchParams(location.search);
const invokers = new Map();
const skipRestore = new Set();

function showDialog(id, invoker) {
  invokers.set(id, invoker);
  $(`#${id}`).showModal();
}
function closeDialog(id, restore = true) {
  if (!restore) skipRestore.add(id);
  $(`#${id}`).close();
}
$$('dialog').forEach(dialog => {
  dialog.addEventListener('close', () => {
    if (dialog.id === 'menu-dialog') $('#open-menu').setAttribute('aria-expanded', 'false');
    if (skipRestore.delete(dialog.id)) return;
    const invoker = invokers.get(dialog.id);
    if (invoker?.getClientRects().length) invoker.focus({ preventScroll: true });
  });
  dialog.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const controls = [...dialog.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),[tabindex]:not([tabindex="-1"])')].filter(node => node.getClientRects().length);
    const first = controls[0], last = controls.at(-1);
    if ((!event.shiftKey && document.activeElement === last) || (event.shiftKey && document.activeElement === first)) {
      event.preventDefault();
      (event.shiftKey ? last : first)?.focus();
    }
  });
});
$$('[data-close]').forEach(button => button.addEventListener('click', () => closeDialog(button.dataset.close)));
$('#open-menu').addEventListener('click', () => {
  $('#open-menu').setAttribute('aria-expanded', 'true');
  showDialog('menu-dialog', $('#open-menu'));
});
$('#menu-dialog').querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', event => {
  event.preventDefault();
  closeDialog('menu-dialog', false);
  if (link.hash === '#contact') { openInquiry(); return; }
  const target = $(link.hash);
  target.scrollIntoView({ block: 'start', behavior: 'instant' });
  const heading = target.querySelector('h2');
  heading.tabIndex = -1;
  heading.focus({ preventScroll: true });
}));
matchMedia('(max-width:800px)').addEventListener('change', event => {
  if (!event.matches && $('#menu-dialog').open) {
    closeDialog('menu-dialog', false);
    $('.nav-links a').focus({ preventScroll: true });
  }
});

const projects = {
  tea: {
    title: '山序製茶', category: '品牌定位 / AI 圖像 / 概念案例', image: 'assets/shansu-v2.webp', width: 1796, height: 876, service: 'positioning',
    intro: '從「產地很多話」，到日常裡的一杯好茶。',
    problem: '茶種、產地與製程都想說，第一次接觸品牌的人卻很難記住一個明確的理由。',
    choice: '把溝通重心放在「日常裡的喝茶時刻」，用晨間、山間與暮色整理產品角色，讓風土成為支持主張的內容。',
    deliverables: '一頁定位、品牌主張、產品命名原則、包裝語言與視覺方向。這些是概念示意，沒有真實客戶成效資料。',
  },
  space: {
    title: '合日空間', category: '訊息系統 / AI 圖像 / 概念案例', image: 'assets/hori-v2.webp', width: 1586, height: 992, service: 'messaging',
    intro: '從出租座位，到讓一起工作成為選擇理由。',
    problem: '網站只列坪數、設備與租金，容易讓訪客只用價格比較，也看不見這個空間適合什麼人。',
    choice: '把主張聚焦在「一起做事的條件」，依獨立工作、團隊討論與活動交流建立訊息層次；空間設備成為支持，而非全部。',
    deliverables: '核心主張、受眾訊息架構、官網段落範例與語氣指引。手冊及名片是說明方向的 AI 生成概念圖。',
  },
};
let currentProject = 'tea';
$$('[data-project]').forEach(button => button.addEventListener('click', () => {
  currentProject = button.dataset.project;
  const project = projects[currentProject];
  $('#project-title').textContent = project.title;
  $('#project-category').textContent = project.category;
  const image = $('#project-image');
  image.src = project.image;
  image.alt = `${project.title}的 AI 概念品牌提案`;
  image.width = project.width;
  image.height = project.height;
  for (const key of ['intro', 'problem', 'choice', 'deliverables']) $(`#project-${key}`).textContent = project[key];
  showDialog('project-dialog', button);
  $('#project-dialog').scrollTop = 0;
  $('#project-title').focus({ preventScroll: true });
}));
$('#project-inquiry').addEventListener('click', event => {
  event.preventDefault();
  const service = projects[currentProject].service;
  closeDialog('project-dialog', false);
  openInquiry(service);
});

const form = $('#inquiry-form');
const fields = ['name', 'email', 'company', 'service', 'context'];
const controls = Object.fromEntries(fields.map(name => [name, form.elements.namedItem(name)]));
const labels = { name: '稱呼', email: '工作信箱', company: '公司或團隊', service: '想先聊的問題', context: '目前的狀況' };
function showInquiryState(state) {
  form.hidden = state !== 'form';
  $('#inquiry-review').hidden = state !== 'review';
  $('#inquiry-done').hidden = state !== 'done';
}
function openInquiry(service) {
  if (service) {
    controls.service.value = service;
    if (controls.service.hasAttribute('aria-invalid')) setError('service', '');
    if (!$('#error-summary').hidden) refreshErrorSummary();
  }
  showInquiryState('form');
  controls.name.scrollIntoView({ block: 'center', behavior: 'instant' });
  controls.name.focus({ preventScroll: true });
}
$$('[data-inquiry]').forEach(link => link.addEventListener('click', event => {
  event.preventDefault();
  openInquiry(link.dataset.service);
}));
function errorFor(name) {
  const value = controls[name].value.trim();
  if (!value) return `請填寫${labels[name]}。`;
  if (name === 'email' && !controls.email.validity.valid) return '請填寫有效的信箱，例如 hello@example.com。';
  return '';
}
function setError(name, message) {
  const error = $(`#${name}-error`);
  error.textContent = message;
  error.hidden = !message;
  if (message) controls[name].setAttribute('aria-invalid', 'true');
  else controls[name].removeAttribute('aria-invalid');
}
function refreshErrorSummary() {
  const count = fields.filter(name => controls[name].hasAttribute('aria-invalid')).length;
  const summary = $('#error-summary');
  summary.hidden = count === 0;
  summary.textContent = count ? `還有 ${count} 個欄位需要確認，已標在下方。` : '';
}
function renderReview() {
  const content = $('#review-content');
  content.replaceChildren();
  for (const name of fields) {
    const group = document.createElement('div');
    const term = document.createElement('dt');
    const value = document.createElement('dd');
    term.textContent = labels[name];
    value.textContent = name === 'service' ? controls.service.selectedOptions[0].textContent : controls[name].value.trim();
    group.append(term, value);
    content.append(group);
  }
}
form.addEventListener('submit', event => {
  event.preventDefault();
  const errors = [];
  for (const name of fields) {
    const message = errorFor(name);
    setError(name, message);
    if (message) errors.push(name);
  }
  refreshErrorSummary();
  if (errors.length) {
    controls[errors[0]].scrollIntoView({ block: 'center', behavior: 'instant' });
    controls[errors[0]].focus({ preventScroll: true });
    return;
  }
  renderReview();
  showInquiryState('review');
  $('#review-title').scrollIntoView({ block: 'center', behavior: 'instant' });
  $('#review-title').focus({ preventScroll: true });
});
for (const name of fields) controls[name].addEventListener('input', () => {
  if (controls[name].hasAttribute('aria-invalid')) setError(name, errorFor(name));
  if (!$('#error-summary').hidden) refreshErrorSummary();
});
$('#edit-inquiry').addEventListener('click', () => {
  showInquiryState('form');
  controls.name.scrollIntoView({ block: 'center', behavior: 'instant' });
  controls.name.focus({ preventScroll: true });
});
$('#finish-inquiry').addEventListener('click', () => {
  showInquiryState('done');
  $('#done-title').scrollIntoView({ block: 'center', behavior: 'instant' });
  $('#done-title').focus({ preventScroll: true });
});
$('#reopen-inquiry').addEventListener('click', () => {
  showInquiryState('review');
  $('#review-title').scrollIntoView({ block: 'center', behavior: 'instant' });
  $('#review-title').focus({ preventScroll: true });
});
$('#new-inquiry').addEventListener('click', () => {
  form.reset();
  fields.forEach(name => setError(name, ''));
  $('#error-summary').hidden = true;
  openInquiry();
});
// Without JS the disabled fieldset prevents a fallback GET submission of personal data.
$('#inquiry-fields').disabled = false;

$$('[data-legal]').forEach(button => button.addEventListener('click', () => {
  const privacy = button.dataset.legal === 'privacy';
  $('#legal-title').textContent = privacy ? '隱私說明' : '使用說明';
  $('#legal-text').textContent = privacy
    ? '這個設計原型不會寄送或儲存表單內容，也沒有分析追蹤。輸入僅暫留目前頁面，重新整理即清除。請使用示例資料試用。字型與圖像都隨頁面提供。'
    : '序間品牌策略、山序製茶與合日空間均為虛構設計情境。作品圖像由 AI 生成，未宣稱真實客戶、見證或成效。服務內容不是實際商業邀約，表單不會建立預約。';
  showDialog('legal-dialog', button);
}));

function setMotion() {
  const still = params.has('still') || motionPreference.matches;
  document.documentElement.classList.toggle('still', still);
  document.documentElement.classList.toggle('motion', !still);
  if (still) $$('.reveal').forEach(node => node.classList.add('visible'));
}
setMotion();
const reveals = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); reveals.unobserve(entry.target); }
}), { threshold: .12 });
$$('.reveal').forEach(node => reveals.observe(node));
const words = $$('.tagline>p>span');
const eligible = new Set();
let nextWord = 0;
let wordTimer = null;
function revealWord() {
  if (params.has('still') || motionPreference.matches) return;
  const word = words[nextWord];
  if (!word || !eligible.has(word)) return;
  word.classList.add('lit');
  nextWord += 1;
  wordTimer = setTimeout(() => { wordTimer = null; revealWord(); }, 140);
}
const tagline = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) { eligible.add(entry.target); tagline.unobserve(entry.target); } });
  if (wordTimer === null) revealWord();
}, { threshold: 1, rootMargin: '0px 0px -20% 0px' });
words.forEach(word => tagline.observe(word));
motionPreference.addEventListener('change', () => { setMotion(); if (wordTimer === null) revealWord(); });
