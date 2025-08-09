(function initContactForm() {
  var form = document.getElementById('contact-form');
  var formMessage = document.getElementById('form-message');
  var successMessage = document.getElementById('success-message');
  var errorMessage = document.getElementById('error-message');

  if (!form || !formMessage || !successMessage || !errorMessage) return;

  var fields = form.querySelectorAll('input, textarea, select');

  function sanitize(value) {
    return String(value)
      .replace(/<\/?script[^>]*>/gi, '')
      .replace(/[\u0000-\u001F\u007F]/g, '')
      .replace(/[\r\n\t]+/g, ' ')
      .replace(/[<>]/g, '')
      .trim();
  }

  function clearFieldError(field) {
    var errorElement = document.getElementById(field.id + '-error');
    if (errorElement) {
      errorElement.classList.add('hidden');
      errorElement.removeAttribute('role');
    }
    field.setAttribute('aria-invalid', 'false');
  }

  function validateField(field) {
    var errorElement = document.getElementById(field.id + '-error');
    var isValid = true;
    var message = '';

    clearFieldError(field);

    var value = (field.value || '').trim();
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      message = 'This field is required.';
    }

    if (isValid && field.type === 'email' && value) {
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        message = 'Please enter a valid email address.';
      }
    }

    if (isValid && (field.tagName === 'INPUT' || field.tagName === 'TEXTAREA') && /[<>]/.test(value)) {
      isValid = false;
      message = 'Angle brackets are not allowed.';
    }

    if (!isValid && errorElement) {
      field.setAttribute('aria-invalid', 'true');
      errorElement.textContent = message;
      errorElement.classList.remove('hidden');
      errorElement.setAttribute('role', 'alert');
    }

    return isValid;
  }

  function validateForm() {
    var ok = true;
    fields.forEach(function (f) {
      if (!validateField(f)) ok = false;
    });
    return ok;
  }

  function showMessage(type, message) {
    if (!formMessage || !successMessage || !errorMessage) return;
    formMessage.classList.remove('hidden');
    successMessage.classList.add('hidden');
    errorMessage.classList.add('hidden');
    if (type === 'success') {
      successMessage.classList.remove('hidden');
      successMessage.textContent = message;
      successMessage.tabIndex = -1;
      successMessage.focus && successMessage.focus();
    } else {
      errorMessage.classList.remove('hidden');
      errorMessage.textContent = message;
      errorMessage.tabIndex = -1;
      errorMessage.focus && errorMessage.focus();
    }
    formMessage.setAttribute('aria-live', 'polite');
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!validateForm()) {
      var firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid && firstInvalid.focus) firstInvalid.focus();
      return;
    }

    var submitButton = form.querySelector('button[type="submit"]');
    if (!submitButton) return;
    var originalText = submitButton.textContent || '';
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    try {
      var payload = {};
      fields.forEach(function (f) {
        payload[f.name] = sanitize(f.value || '');
      });
      // Replace with real submission endpoint when available
      setTimeout(function () {
        showMessage('success', 'Message sent successfully!');
        form.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }, 1200);
    } catch (e) {
      showMessage('error', 'There was an error sending your message. Please try again.');
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }
  }

  fields.forEach(function (field) {
    field.addEventListener('blur', function () { validateField(field); });
    field.addEventListener('input', function () { clearFieldError(field); });
  });

  form.addEventListener('submit', handleSubmit);
})();


