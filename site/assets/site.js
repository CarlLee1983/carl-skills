// 進場動畫：區塊進入畫面時逐項淡入；不支援時內容一律可見
(function () {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.documentElement.classList.add('js');
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.rv').forEach(function (el) { io.observe(el); });
})();

// 圖片燈箱：在原頁放大截圖，可切上一張／下一張；沒有 JS 或按住修飾鍵時維持原本連結
// 圖示取自 Lucide（ISC License, Copyright (c) Lucide Contributors）
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll('a.zoom'));
  if (!links.length || typeof HTMLDialogElement !== 'function') return;

  var icon = function (d) {
    return '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + '</svg>';
  };
  var dlg = document.createElement('dialog');
  dlg.className = 'lightbox';
  dlg.setAttribute('aria-label', '截圖放大檢視');
  dlg.innerHTML =
    '<div class="lb-bar">' +
      '<span class="lb-count" aria-live="polite"></span>' +
      '<span class="lb-hint">點圖片看原尺寸</span>' +
      '<a class="lb-raw" target="_blank" rel="noopener">開新分頁</a>' +
      '<button type="button" class="lb-btn lb-close" aria-label="關閉">' + icon('<path d="M18 6 6 18"/><path d="m6 6 12 12"/>') + '</button>' +
    '</div>' +
    '<div class="lb-stage"><img class="lb-img" alt=""></div>' +
    '<p class="lb-cap"></p>' +
    '<button type="button" class="lb-btn lb-prev" aria-label="上一張">' + icon('<path d="m15 18-6-6 6-6"/>') + '</button>' +
    '<button type="button" class="lb-btn lb-next" aria-label="下一張">' + icon('<path d="m9 18 6-6-6-6"/>') + '</button>';
  document.body.appendChild(dlg);

  var img = dlg.querySelector('.lb-img');
  var stage = dlg.querySelector('.lb-stage');
  var cap = dlg.querySelector('.lb-cap');
  var count = dlg.querySelector('.lb-count');
  var raw = dlg.querySelector('.lb-raw');
  var current = 0;
  var opener = null;

  function show(i) {
    current = (i + links.length) % links.length;
    var a = links[current];
    var thumb = a.querySelector('img');
    var fig = a.closest('figure');
    var caption = fig && fig.querySelector('figcaption');
    stage.classList.remove('actual');
    img.src = a.href;
    img.alt = thumb ? thumb.alt : '';
    cap.textContent = caption ? caption.textContent : '';
    count.textContent = (current + 1) + ' / ' + links.length;
    raw.href = a.href;
    var next = new Image();
    next.src = links[(current + 1) % links.length].href;
  }

  links.forEach(function (a, i) {
    a.addEventListener('click', function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      e.preventDefault();
      opener = a;
      show(i);
      dlg.showModal();
    });
  });

  dlg.querySelector('.lb-close').addEventListener('click', function () { dlg.close(); });
  dlg.querySelector('.lb-prev').addEventListener('click', function () { show(current - 1); });
  dlg.querySelector('.lb-next').addEventListener('click', function () { show(current + 1); });
  // 點圖片在「符合畫面」與「原始大小」間切換，方便看清截圖細節
  img.addEventListener('click', function () { stage.classList.toggle('actual'); });
  // 點圖片以外的空白處關閉
  dlg.addEventListener('click', function (e) { if (e.target === dlg || e.target === stage) dlg.close(); });
  dlg.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') { e.preventDefault(); show(current - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); show(current + 1); }
  });
  dlg.addEventListener('close', function () {
    img.removeAttribute('src');
    if (opener) opener.focus();
  });

  // 手機左右滑動切換
  var startX = null;
  stage.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
  stage.addEventListener('touchend', function (e) {
    if (startX === null || stage.classList.contains('actual')) return;
    var dx = e.changedTouches[0].clientX - startX;
    startX = null;
    if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
  });
})();
