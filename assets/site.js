// Navegación compartida, pie de página y botones de copiar.
(function () {
  var NAV = [
    ['Inicio', 'index.html'],
    ['Presentaciones', [['Día 1 · Construye', 'dia-1.html'], ['Día 2 · Afina y lleva al equipo', 'dia-2.html']]],
    ['Kits', [['Kit general', 'kit-general.html'], ['Kit Día 1', 'kit-dia-1.html'], ['Kit Día 2', 'kit-dia-2.html'], ['Versión para imprimir', 'imprimir.html']]],
    ['Guías', [['Buenas prácticas', 'buenas-practicas.html'], ['Mejores prompts', 'prompts.html'], ['Política de uso de IA', 'politica-ia.html'], ['Rúbrica del pitch', 'rubrica.html']]],
    ['Resultados', [['Equipos y problemas', 'equipos.html'], ['Tablero de resultados', 'resultados.html']]]
  ];
  var here = location.pathname.split('/').pop() || 'index.html';
  var html = '<div class="band"></div><div class="in"><a href="index.html"><img src="assets/logo.svg" alt="CECOMSA"></a>' +
    '<a class="brand" href="index.html">IA para líderes</a><div class="tabs">';
  NAV.forEach(function (item) {
    if (typeof item[1] === 'string') {
      html += '<a href="' + item[1] + '"' + (item[1] === here ? ' class="on"' : '') + '>' + item[0] + '</a>';
    } else {
      var on = item[1].some(function (s) { return s[1] === here; });
      html += '<div class="dd' + (on ? ' on' : '') + '"><button type="button">' + item[0] + '</button><div class="menu">';
      item[1].forEach(function (s) { html += '<a href="' + s[1] + '"' + (s[1] === here ? ' class="on"' : '') + '>' + s[0] + '</a>'; });
      html += '</div></div>';
    }
  });
  html += '</div></div>';
  var nav = document.querySelector('nav.nav');
  if (nav) nav.innerHTML = html;
  document.addEventListener('click', function (e) {
    var b = e.target.closest('.dd>button');
    document.querySelectorAll('.dd.open').forEach(function (d) { if (!b || d !== b.parentNode) d.classList.remove('open'); });
    if (b) b.parentNode.classList.toggle('open');
  });

  var foot = document.querySelector('footer');
  if (foot && !foot.innerHTML.trim()) {
    foot.innerHTML = '<div class="wrap"><span>Modelo de Liderazgo CECOMSA · Workshop «IA para líderes: menos tareas, más resultados» · Ing. Solenny Peralta</span>' +
      '<span class="pend">Borrador · lo marcado en naranja está por confirmar</span></div>';
  }

  document.addEventListener('click', function (e) {
    var c = e.target.closest('.copy');
    if (!c) return;
    var pre = c.closest('.prompt').querySelector('pre');
    var done = function () { c.classList.add('ok'); c.textContent = 'Copiado'; setTimeout(function () { c.classList.remove('ok'); c.textContent = 'Copiar'; }, 1600); };
    if (navigator.clipboard) navigator.clipboard.writeText(pre.innerText).then(done, function () {});
  });
})();
