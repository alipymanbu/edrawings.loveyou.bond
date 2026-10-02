/* 通用交互：下载链接统一取值、返回顶部、滚入渐显 */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 下载按钮：统一从 links.js 取网盘链接 */
  var dl = window.SITE_LINKS && window.SITE_LINKS.download;
  if (dl) {
    var nodes = document.querySelectorAll('[data-link="download"]');
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].setAttribute('href', dl);
      nodes[i].setAttribute('target', '_blank');
      nodes[i].setAttribute('rel', 'noopener');
    }
  }

  /* 返回顶部：下滚后出现 */
  var toTop = document.getElementById('toTop');
  if (toTop) {
    var onScroll = function () {
      if (window.scrollY > 420) {
        toTop.classList.add('show');
      } else {
        toTop.classList.remove('show');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  /* 滚入渐显（prefers-reduced-motion 时直接显示） */
  var items = document.querySelectorAll('.reveal');
  if (!items.length) return;
  if (reduceMotion || !('IntersectionObserver' in window)) {
    for (var j = 0; j < items.length; j++) items[j].classList.add('in');
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) {
        en.target.classList.add('in');
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.12 });
  for (var k = 0; k < items.length; k++) io.observe(items[k]);
})();
