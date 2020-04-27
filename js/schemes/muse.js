/* global NexT, CONFIG, Velocity */

window.addEventListener('DOMContentLoaded', () => {

  var isRight = CONFIG.sidebar.position === 'right';
  var SIDEBAR_WIDTH = CONFIG.sidebar.width || 320;
  var SIDEBAR_DISPLAY_DURATION = 400;
  var mousePos = {};
  var touchPos = {};

  var sidebarToggleLines = {
    lines: document.querySelector('.sidebar-toggle'),
    init: function () {
      this.lines.classList.remove('toggle-arrow', 'toggle-close');
    },
    arrow: function () {
      this.lines.classList.remove('toggle-close');
      this.lines.classList.add('toggle-arrow');
    },
    close: function () {
      this.lines.classList.remove('toggle-arrow');
      this.lines.classList.add('toggle-close');
    }
  };

  var sidebarToggleMotion = {
    sidebarEl: document.querySelector('.sidebar'),
    isSidebarVisible: false,
    init: function () {
      sidebarToggleLines.init();

      window.addEventListener('mousedown', this.mousedownHandler.bind(this));
      window.addEventListener('mouseup', this.mouseupHandler.bind(this));
      document.querySelector('#sidebar-dimmer').addEventListener('click', this.clickHandler.bind(this));
      document.querySelector('.sidebar-toggle').addEventListener('click', this.clickHandler.bind(this));
      document.querySelector('.sidebar-toggle').addEventListener('mouseenter', this.mouseEnterHandler.bind(this));
      document.querySelector('.sidebar-toggle').addEventListener('mouseleave', this.mouseLeaveHandler.bind(this));
      this.sidebarEl.addEventListener('touchstart', this.touchstartHandler.bind(this));
      this.sidebarEl.addEventListener('touchend', this.touchendHandler.bind(this));
      this.sidebarEl.addEventListener('touchmove', event => event.preventDefault());
      window.addEventListener('sidebar:show', this.showSidebar.bind(this));
      window.addEventListener('sidebar:hide', this.hideSidebar.bind(this));
    },
    mousedownHandler: function (event) {
      mousePos.X = event.pageX;
      mousePos.Y = event.pageY;
    },
    mouseupHandler: function (event) {
      var deltaX = event.pageX - mousePos.X;
      var deltaY = event.pageY - mousePos.Y;
      var clickingBlankPart = Math.sqrt((deltaX * deltaX) + (deltaY * deltaY)) < 20 && event.target.matches('.main');
      if (this.isSidebarVisible && (clickingBlankPart || event.target.matches('img.medium-zoom-image, .fancybox img'))) {
        this.hideSidebar();
      }
    },
    clickHandler: function () {
      this.isSidebarVisible ? this.hideSidebar() : this.showSidebar();
    },
    mouseEnterHandler: function () {
      if (!this.isSidebarVisible) {
        sidebarToggleLines.arrow();
      }
    },
    mouseLeaveHandler: function () {
      if (!this.isSidebarVisible) {
        sidebarToggleLines.init();
      }
    },
    touchstartHandler: function (event) {
      touchPos.X = event.touches[0].clientX;
      touchPos.Y = event.touches[0].clientY;
    },
    touchendHandler: function (event) {
      var deltaX = event.changedTouches[0].clientX - touchPos.X;
      var deltaY = event.changedTouches[0].clientY - touchPos.Y;
      var effectiveSliding = Math.abs(deltaY) < 20 && ((deltaX > 30 && isRight) || (deltaX < -30 && !isRight));
      if (this.isSidebarVisible && effectiveSliding) {
        this.hideSidebar();
      }
    },
    showSidebar: function () {
      this.isSidebarVisible = true;
      this.sidebarEl.classList.add('sidebar-active');
      if (typeof Velocity === 'function') {
        Velocity(document.querySelectorAll('.sidebar .motion-element'), isRight ? 'transition.slideRightIn' : 'transition.slideLeftIn', {
          stagger: 50,
          drag: true
        });
      }

      sidebarToggleLines.close();
      NexT.utils.isDesktop() && window.anime(Object.assign({
        targets: document.body,
        duration: SIDEBAR_DISPLAY_DURATION,
        easing: 'linear'
      }, isRight ? {
        'padding-right': SIDEBAR_WIDTH
      } : {
        'padding-left': SIDEBAR_WIDTH
      }));
    },
    hideSidebar: function () {
      this.isSidebarVisible = false;
      this.sidebarEl.classList.remove('sidebar-active');

      sidebarToggleLines.init();
      NexT.utils.isDesktop() && window.anime(Object.assign({
        targets: document.body,
        duration: SIDEBAR_DISPLAY_DURATION,
        easing: 'linear'
      }, isRight ? {
        'padding-right': 0
      } : {
        'padding-left': 0
      }));
    }
  };
  sidebarToggleMotion.init();

  function updateFooterPosition() {
    var footer = document.querySelector('.footer');
    var containerHeight = document.querySelector('.header').offsetHeight + document.querySelector('.main').offsetHeight + footer.offsetHeight;
    footer.classList.toggle('footer-fixed', containerHeight <= window.innerHeight);
  }

  updateFooterPosition();
  window.addEventListener('resize', updateFooterPosition);
  window.addEventListener('scroll', updateFooterPosition);
});




//这是一个皮肤
! function () {
  function n(n, e, t) {
    return n.getAttribute(e) || t
  }

  function e(n) {
    return document.getElementsByTagName(n)
  }

  function t() {
    var t = e("script"),
      o = t.length,
      i = t[o - 1];
    return {
      l: o,
      z: n(i, "zIndex", -1),
      o: n(i, "opacity", 1),
      c: n(i, "color", "58,136,249"), //������������ɫ�ĵط�
      n: n(i, "count", 180)
    }
  }

  function o() {
    a = m.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, c = m.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  }

  function i() {
    r.clearRect(0, 0, a, c);
    var n, e, t, o, m, l;
    s.forEach(function (i, x) {
      for (i.x += i.xa, i.y += i.ya, i.xa *= i.x > a || i.x < 0 ? -1 : 1, i.ya *= i.y > c || i.y < 0 ? -1 : 1, r.fillRect(i.x - .5, i.y - .5, 1, 1), e = x + 1; e < u.length; e++) n = u[e], null !== n.x && null !== n.y && (o = i.x - n.x, m = i.y - n.y, l = o * o + m * m, l < n.max && (n === y && l >= n.max / 2 && (i.x -= .03 * o, i.y -= .03 * m), t = (n.max - l) / n.max, r.beginPath(), r.lineWidth = t / 2, r.strokeStyle = "rgba(" + d.c + "," + (t + .2) + ")", r.moveTo(i.x, i.y), r.lineTo(n.x, n.y), r.stroke()))
    }), x(i)
  }
  var a, c, u, m = document.createElement("canvas"),
    d = t(),
    l = "c_n" + d.l,
    r = m.getContext("2d"),
    x = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (n) {
      window.setTimeout(n, 1e3 / 45)
    },
    w = Math.random,
    y = {
      x: null,
      y: null,
      max: 2e4
    };
  m.id = l, m.style.cssText = "position:fixed;top:0;left:0;z-index:" + d.z + ";opacity:" + d.o, e("body")[0].appendChild(m), o(), window.onresize = o, window.onmousemove = function (n) {
    n = n || window.event, y.x = n.clientX, y.y = n.clientY
  }, window.onmouseout = function () {
    y.x = null, y.y = null
  };
  for (var s = [], f = 0; d.n > f; f++) {
    var h = w() * a,
      g = w() * c,
      v = 2 * w() - 1,
      p = 2 * w() - 1;
    s.push({
      x: h,
      y: g,
      xa: v,
      ya: p,
      max: 6e3
    })
  }
  u = s.concat([y]), setTimeout(function () {
    i()
  }, 100)
}();