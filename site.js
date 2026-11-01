(function () {
  document.addEventListener('click', function (e) {
    var b = e.target.closest('button[data-k]'); if (!b) return;
    var k = b.dataset.k, vl = b.closest('.vl'); if (!vl) return;
    var ones = vl.querySelectorAll('.one[data-k="' + k + '"]'); if (!ones.length) return;
    var open = !ones[0].classList.contains('open');
    ones.forEach(function (x) { x.classList.toggle('open', open); });
    b.classList.toggle('open', open);
    vl.querySelectorAll('.notes, .zp, .jz').forEach(function (box) { box.classList.toggle('open', !!box.querySelector('.one.open')); });
  });
  var tb = document.getElementById('theme');
  if (tb) {
    var label = function () {
      var t = document.documentElement.getAttribute('data-theme');
      tb.title = t === 'dark' ? '现在：深色，点击改为浅色' : t === 'light' ? '现在：浅色，点击改为跟随系统' : '现在：跟随系统，点击改为深色';
    };
    label();
    tb.addEventListener('click', function () {
      var t = document.documentElement.getAttribute('data-theme');
      var next = t === 'dark' ? 'light' : t === 'light' ? '' : 'dark';
      if (next) document.documentElement.setAttribute('data-theme', next); else document.documentElement.removeAttribute('data-theme');
      try { if (next) localStorage.setItem('theme', next); else localStorage.removeItem('theme'); } catch (e) {}
      label();
    });
  }
  var all = document.getElementById('all');
  if (all) {
    try { all.checked = localStorage.getItem('all') === '1'; } catch (e) {}
    document.body.classList.toggle('all', all.checked);
    all.addEventListener('change', function () { document.body.classList.toggle('all', all.checked); try { localStorage.setItem('all', all.checked ? '1' : '0'); } catch (e) {} });
  }
  var q = document.getElementById('q'), hits = document.getElementById('hits');
  if (q && hits) {
    var idx = JSON.parse(document.getElementById('idx').textContent);
    var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
    var CN = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
    var cn = function (n) { return n <= 10 ? CN[n] : n < 20 ? '十' + CN[n - 10] : CN[Math.floor(n / 10)] + '十' + (n % 10 ? CN[n % 10] : ''); };
    var run = function () {
      var s = q.value.trim(); hits.innerHTML = '';
      if (s.length < 1) return;
      var out = [];
      for (var i = 0; i < idx.length && out.length < 50; i++) {
        var r = idx[i], p = r.x.indexOf(s), where = '';
        if (r.t.indexOf(s) >= 0 || r.a.indexOf(s) >= 0) where = r.t; else if (p >= 0) where = '…' + r.x.slice(Math.max(0, p - 12), p + s.length + 14) + '…'; else continue;
        out.push('<li><a href="' + r.id + '.html"><b>' + esc(r.t) + '</b><span>第' + cn(r.c) + '回' + (r.a ? ' · ' + esc(r.a) : '') + '</span><em>' + esc(where) + '</em></a></li>');
      }
      hits.innerHTML = out.join('') || '<li><span class="who">没有找到。</span></li>';
    };
    q.addEventListener('input', run); q.focus();
  }
})();
