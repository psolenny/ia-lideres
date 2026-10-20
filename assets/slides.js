// Navegación del deck: ← → espacio · f pantalla completa · o índice · Inicio/Fin
(function () {
  document.body.insertAdjacentHTML('beforeend',
    '<div class="bar" id="bar"></div><div class="num" id="num"></div><div class="tmark" id="tmark"></div>' +
    '<div class="hint"><a href="index.html" style="color:inherit;text-decoration:none;font-weight:700">← Inicio</a> · ← → espacio · f pantalla completa · o índice</div>' +
    '<div id="ov"><h3>Índice · clic para saltar (o / esc para cerrar)</h3><ol id="ovl"></ol></div>');
  var slides = document.querySelectorAll('.slide'), ov = document.getElementById('ov'), i = 0;
  slides.forEach(function (s, k) {
    if (!s.querySelector('.logo')) s.insertAdjacentHTML('afterbegin', '<div class="logo" role="img" aria-label="CECOMSA"></div>');
    var h = s.querySelector('h1, h2'), li = document.createElement('li');
    li.innerHTML = '<span class="i">' + (k + 1) + '</span><span>' + (h ? h.textContent.replace(/\s+/g, ' ').trim() : '') + '</span><span class="tt">' + (s.dataset.t || '') + '</span>';
    li.addEventListener('click', function () { show(k); toggle(false); });
    document.getElementById('ovl').appendChild(li);
  });
  function toggle(force) {
    var open = force === undefined ? !ov.classList.contains('on') : force;
    ov.classList.toggle('on', open);
    if (open) ov.querySelectorAll('li').forEach(function (li, k) { li.className = k === i ? 'cur' : ''; });
  }
  function show(n) {
    i = Math.max(0, Math.min(slides.length - 1, n));
    slides.forEach(function (s, k) { s.classList.toggle('on', k === i); });
    document.getElementById('bar').style.width = ((i + 1) / slides.length * 100) + '%';
    document.getElementById('num').textContent = (i + 1) + ' / ' + slides.length;
    document.getElementById('tmark').textContent = slides[i].dataset.t || '';
    var c = slides[i].classList.contains('dark') ? 'rgba(255,255,255,.7)' : (slides[i].classList.contains('sep') ? '#002F6C' : '');
    ['num', 'tmark'].forEach(function (id) { document.getElementById(id).style.color = c; });
    document.querySelector('.hint').style.color = c;
    document.getElementById('bar').style.background = slides[i].classList.contains('dark') ? '#84BD00' : (slides[i].classList.contains('sep') ? '#002F6C' : '');
    if (location.hash !== '#' + (i + 1)) history.replaceState(null, '', '#' + (i + 1));
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') return toggle(false);
    if (e.key === 'o' || e.key === 'O') { e.preventDefault(); return toggle(); }
    if (ov.classList.contains('on')) return;
    if (['ArrowRight', ' ', 'PageDown', 'ArrowDown'].indexOf(e.key) > -1) { e.preventDefault(); show(i + 1); }
    if (['ArrowLeft', 'PageUp', 'ArrowUp'].indexOf(e.key) > -1) { e.preventDefault(); show(i - 1); }
    if (e.key === 'Home') show(0);
    if (e.key === 'End') show(slides.length - 1);
    if (e.key === 'f' || e.key === 'F') { if (document.fullscreenElement) document.exitFullscreen(); else document.documentElement.requestFullscreen(); }
  });
  document.addEventListener('click', function (e) {
    if (e.target.closest('a') || e.target.closest('#ov')) return;
    show(e.clientX < window.innerWidth * 0.25 ? i - 1 : i + 1);
  });
  // QR de la app del taller: <div class="qr" data-url="…">Texto</div>
  if (window.qrcode) document.querySelectorAll('.qr[data-url]').forEach(function (d) {
    var q = window.qrcode(0, 'M'); q.addData(d.dataset.url); q.make();
    d.insertAdjacentHTML('afterbegin', q.createImgTag(6, 0));
  });
  show(parseInt((location.hash || '#1').slice(1), 10) - 1 || 0);
})();
