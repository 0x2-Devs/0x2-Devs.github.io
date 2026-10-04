(function () {
  var root = document.documentElement;
  var button = document.querySelector('[data-theme-toggle]');

  function applyTheme(theme) {
    root.dataset.theme = theme;
    button.textContent = theme === 'dark' ? '☀' : '☾';
    button.setAttribute('aria-label', theme === 'dark' ? 'Use light appearance' : 'Use dark appearance');
  }

  var savedTheme = 'light';
  try {
    savedTheme = localStorage.getItem('0x2-draft-theme') || 'light';
  } catch (error) {
    // Appearance persistence is optional.
  }
  applyTheme(savedTheme === 'dark' ? 'dark' : 'light');

  button.addEventListener('click', function () {
    var theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(theme);
    try {
      localStorage.setItem('0x2-draft-theme', theme);
    } catch (error) {
      // Appearance persistence is optional.
    }
  });

  var menu = document.querySelector('.mobile-menu');
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && menu.open) {
      menu.open = false;
      menu.querySelector('summary').focus();
    }
  });
  document.addEventListener('click', function (event) {
    if (!menu.contains(event.target)) menu.open = false;
  });
  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () { menu.open = false; });
  });

  document.querySelectorAll('[data-carousel]').forEach(function (carousel) {
    var slides = Array.from(carousel.querySelectorAll('[data-carousel-slide]'));
    var selectors = Array.from(carousel.querySelectorAll('[data-carousel-select]'));
    var count = carousel.querySelector('[data-carousel-count]');
    var status = carousel.querySelector('[data-carousel-status]');
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    var hoverInput = window.matchMedia('(hover: hover)');
    var current = 0;
    var paused = reducedMotion.matches;
    var hovering = false;
    var visible = false;
    var timer = null;
    var selectionRequest = 0;

    function canRotate() {
      return !paused && !hovering && visible && !document.hidden;
    }

    function prepareSlide(index) {
      return Promise.all(Array.from(slides[index].querySelectorAll('.app-capture')).map(function (image) {
        if (image.dataset.src) {
          image.loading = 'eager';
          image.srcset = image.dataset.srcset;
          image.src = image.dataset.src;
          delete image.dataset.src;
          delete image.dataset.srcset;
        }
        return image.decode().catch(function () { /* The image can retry on its normal load path. */ });
      }));
    }

    function updateRotation() {
      window.clearTimeout(timer);
      timer = null;
      if (!canRotate()) return;
      prepareSlide((current + 1) % slides.length);
      timer = window.setTimeout(function () { showSlide(current + 1, false); }, 5000);
    }

    function showSlide(index, manual) {
      var target = (index + slides.length) % slides.length;
      var request = ++selectionRequest;
      if (manual) {
        paused = true;
        updateRotation();
      }
      prepareSlide(target).then(function () {
        if (request !== selectionRequest || (!manual && !canRotate())) return;
        current = target;
        slides.forEach(function (slide, position) {
          var inactive = position !== current;
          slide.setAttribute('aria-hidden', String(inactive));
          slide.inert = inactive;
        });
        selectors.forEach(function (selector, position) {
          selector.setAttribute('aria-current', String(position === current));
        });
        count.textContent = (current + 1) + ' / ' + slides.length;
        if (manual) status.textContent = slides[current].getAttribute('aria-label');
        updateRotation();
      });
    }

    carousel.querySelectorAll('[data-carousel-controls]').forEach(function (control) { control.hidden = false; });
    carousel.querySelector('[data-carousel-previous]').addEventListener('click', function () { showSlide(current - 1, true); });
    carousel.querySelector('[data-carousel-next]').addEventListener('click', function () { showSlide(current + 1, true); });
    selectors.forEach(function (selector, index) {
      selector.addEventListener('click', function () {
        showSlide(index, true);
      });
    });
    carousel.addEventListener('focusin', function () {
      // Keyboard interaction keeps the selected product in place.
      paused = true;
      updateRotation();
    });
    carousel.addEventListener('mouseenter', function () {
      hovering = hoverInput.matches;
      updateRotation();
    });
    carousel.addEventListener('mouseleave', function () {
      hovering = false;
      updateRotation();
    });
    document.addEventListener('visibilitychange', updateRotation);
    reducedMotion.addEventListener('change', function () {
      if (reducedMotion.matches) paused = true;
      updateRotation();
    });
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting && entries[0].intersectionRatio >= 0.2;
      updateRotation();
    }, { threshold: [0, 0.2] }).observe(carousel);
    updateRotation();
  });
})();
