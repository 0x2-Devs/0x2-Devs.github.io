(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;
  var submit = form.querySelector('[type="submit"]');
  var error = form.querySelector('.form-error');
  var success = document.getElementById('contact-success');
  var app = form.elements.app;
  var requestedApp = new URLSearchParams(window.location.search).get('app');
  if (Array.from(app.options).some(function (option) { return option.value === requestedApp; })) {
    app.value = requestedApp;
  }

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    if (submit.disabled) return;
    if (!form.reportValidity()) return;
    var data = {
      name: form.elements.name.value.trim(),
      email: form.elements.email.value.trim(),
      app: app.value,
      message: form.elements.message.value.trim(),
    };
    if (!data.name || !data.message) {
      error.textContent = 'Please enter your name and a message.';
      error.hidden = false;
      return;
    }
    submit.disabled = true;
    submit.textContent = 'Sending…';
    form.setAttribute('aria-busy', 'true');
    error.hidden = true;
    var controller = new AbortController();
    var timeout = window.setTimeout(function () { controller.abort(); }, 15000);
    try {
      var response = await fetch(form.action, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error('Message was not accepted');
      form.hidden = true;
      success.hidden = false;
      success.focus();
    } catch (failure) {
      error.textContent = 'We couldn’t send your message. Please try again, or email info@0x2-devs.com. Your message is still here.';
      error.hidden = false;
    } finally {
      window.clearTimeout(timeout);
      form.removeAttribute('aria-busy');
      submit.disabled = false;
      submit.textContent = 'Send message →';
    }
  });

  document.querySelector('[data-contact-reset]').addEventListener('click', function () {
    form.reset();
    error.hidden = true;
    success.hidden = true;
    form.hidden = false;
    form.elements.name.focus();
  });
})();
