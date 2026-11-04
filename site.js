(function () {
  var IDS = ["Z001-01", "Z001-02", "Z001-03", "Z001-04", "Z001-05", "Z001-06", "Z001-07", "Z001-08", "Z001-09", "Z001-10", "Z002-01", "Z002-02", "Z003-01", "Z003-02", "Z003-03", "Z004-01", "Z004-02", "Z005-01", "Z005-02", "Z005-03", "Z005-04", "Z005-05", "Z005-06", "Z005-07", "Z005-08", "Z005-09", "Z005-10", "Z005-11", "Z005-12", "Z005-13", "Z005-14", "Z005-15", "Z005-16", "Z005-17", "Z005-18", "Z005-19", "Z005-20", "Z005-21", "Z005-22", "Z005-23", "Z005-25", "Z005-27", "Z005-29", "Z005-31", "Z005-33", "Z005-35", "Z005-37", "Z005-39", "Z005-41", "Z005-43", "Z005-45", "Z005-47", "Z005-49", "Z005-51", "Z005-52", "Z006-01", "Z006-02", "Z007-01", "Z007-02", "Z008-01", "Z008-02", "Z011-01", "Z013-01", "Z013-03", "Z017-01", "Z017-02", "Z017-03", "Z017-04", "Z017-05", "Z018-01", "Z018-03", "Z018-07", "Z018-10", "Z018-13", "Z018-16", "Z018-19", "Z018-22", "Z018-25", "Z018-27", "Z018-29", "Z018-31", "Z019-c84", "Z020-c85", "Z021-01", "Z021-03", "Z021-04", "Z022-01", "Z022-02", "Z022-03", "Z022-04", "Z022-05", "Z022-06", "Z022-07", "Z022-08", "Z022-09", "Z022-10", "Z022-11", "Z022-c101", "Z023-02", "Z023-04", "Z023-06", "Z023-08", "Z023-09", "Z023-c107", "Z025-01", "Z025-02", "Z025-03", "Z025-04", "Z026-01", "Z026-02", "Z026-c114", "Z027-01", "Z028-01", "Z028-02", "Z028-03", "Z028-04", "Z028-05", "Z034-01", "Z037-01", "Z037-02", "Z037-04", "Z037-05", "Z037-06", "Z037-07", "Z037-11", "Z037-13", "Z038-01", "Z038-04", "Z038-07", "Z038-10", "Z038-13", "Z038-16", "Z038-19", "Z038-22", "Z038-25", "Z038-28", "Z038-31", "Z038-34", "Z038-37", "Z038-38", "Z038-39", "Z038-40", "Z040-01", "Z045-01", "Z048-01", "Z048-02", "Z049-01", "Z050-01", "Z050-48", "Z050-51", "Z050-54", "Z050-55", "Z050-59", "Z050-60", "Z050-61", "Z050-62", "Z051-02", "Z051-04", "Z051-06", "Z051-08", "Z051-10", "Z051-12", "Z051-14", "Z051-16", "Z051-18", "Z051-20", "Z052-01", "Z053-01", "Z053-02", "Z053-03", "Z062-01", "Z062-03", "Z062-05", "Z063-01", "Z063-02", "Z063-03", "Z063-04", "Z063-05", "Z063-06", "Z063-07", "Z063-08", "Z063-09", "Z064-02", "Z064-04", "Z064-06", "Z064-08", "Z064-10", "Z064-11", "Z064-c246", "Z070-01", "Z070-02", "Z070-03", "Z070-05", "Z070-06", "Z070-07", "Z076-01", "Z078-01", "Z078-02", "Z078-03", "Z078-14", "Z079-01"];
  var pick = function () {
    var here = location.pathname.replace(/^.*\//, '').replace(/\.html$/, ''), seen = [];
    try { seen = JSON.parse(sessionStorage.getItem('seen') || '[]'); } catch (e) {}
    var pool = IDS.filter(function (x) { return x !== here && seen.indexOf(x) < 0; });
    if (!pool.length) pool = IDS.filter(function (x) { return x !== here; });
    var id = pool[Math.floor(Math.random() * pool.length)];
    seen.push(id); if (seen.length > 12) seen.shift();
    try { sessionStorage.setItem('seen', JSON.stringify(seen)); } catch (e) {}
    return id;
  };
  if (document.getElementById('rnd-msg')) { location.replace(pick()); return; }
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a.rnd'); if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
    e.preventDefault(); location.href = pick();
  });
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
        out.push('<li><a href="' + r.id + '"><b>' + esc(r.t) + '</b><span>第' + cn(r.c) + '回' + (r.a ? ' · ' + esc(r.a) : '') + '</span><em>' + esc(where) + '</em></a></li>');
      }
      hits.innerHTML = out.join('') || '<li><span class="who">没有找到。</span></li>';
    };
    q.addEventListener('input', run); q.focus();
  }
})();
