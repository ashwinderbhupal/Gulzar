/* =========================================================
   Gulzar Construction — Contact Form
   Client-side validation + Formspree async submission
   ========================================================= */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('contactForm');
    if (!form) return;

    var messageBox = document.getElementById('formMessage');
    var submitBtn = form.querySelector('button[type="submit"]');
    var originalBtnText = submitBtn ? submitBtn.innerHTML : '';

    var requiredFields = form.querySelectorAll('[data-required]');

    // Live validation: clear error on input
    requiredFields.forEach(function (field) {
      field.addEventListener('input', function () {
        clearFieldError(field);
      });
      field.addEventListener('change', function () {
        clearFieldError(field);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      hideMessage();

      if (!validateForm()) {
        showMessage(
          'Please fill in all required fields correctly.',
          'error'
        );
        // Scroll to first error
        var firstError = form.querySelector('.form-group.error');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      submitForm();
    });

    /* ---------- Validation ---------- */
    function validateForm() {
      var valid = true;
      requiredFields.forEach(function (field) {
        if (!validateField(field)) valid = false;
      });
      return valid;
    }

    function validateField(field) {
      var value = (field.value || '').trim();
      var group = field.closest('.form-group');
      var errorEl = group ? group.querySelector('.error-msg') : null;

      // Empty check
      if (!value) {
        setFieldError(field, errorEl, 'This field is required.');
        return false;
      }

      // Email
      if (field.type === 'email') {
        var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRe.test(value)) {
          setFieldError(field, errorEl, 'Please enter a valid email address.');
          return false;
        }
      }

      // Phone
      if (field.type === 'tel') {
        var digits = value.replace(/\D/g, '');
        if (digits.length < 8) {
          setFieldError(field, errorEl, 'Please enter a valid phone number.');
          return false;
        }
      }

      // Select default
      if (field.tagName === 'SELECT' && (value === '' || value === 'default')) {
        setFieldError(field, errorEl, 'Please make a selection.');
        return false;
      }

      clearFieldError(field);
      return true;
    }

    function setFieldError(field, errorEl, msg) {
      var group = field.closest('.form-group');
      if (group) group.classList.add('error');
      if (errorEl) errorEl.textContent = msg;
    }

    function clearFieldError(field) {
      var group = field.closest('.form-group');
      if (group) group.classList.remove('error');
    }

    /* ---------- Submit to Formspree ---------- */
    function submitForm() {
      var action = form.getAttribute('action') || '';

      // If Form ID has not been set, show a helpful message
      if (action.indexOf('YOUR_FORM_ID') !== -1) {
        showMessage(
          'Form is not connected yet. Please configure your Formspree Form ID in contact.html.',
          'error'
        );
        return;
      }

      setLoading(true);

      var formData = new FormData(form);

      fetch(action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
        .then(function (response) {
          if (response.ok) {
            form.reset();
            showMessage(
              "Thank you! We'll be in touch within 24 hours.",
              'success'
            );
          } else {
            return response.json().then(function (data) {
              var msg = "Oops, something went wrong. Please try again.";
              if (data && data.errors && data.errors.length) {
                msg = data.errors.map(function (er) { return er.message; }).join(', ');
              }
              showMessage(msg, 'error');
            });
          }
        })
        .catch(function () {
          showMessage(
            'Network error. Please check your connection and try again.',
            'error'
          );
        })
        .finally(function () {
          setLoading(false);
        });
    }

    /* ---------- UI helpers ---------- */
    function showMessage(text, type) {
      if (!messageBox) return;
      messageBox.textContent = text;
      messageBox.className = 'form-message ' + type;
      messageBox.scrollIntoView({ behavior: 'smooth', block: 'center' });

      if (type === 'success') {
        setTimeout(hideMessage, 8000);
      }
    }

    function hideMessage() {
      if (!messageBox) return;
      messageBox.className = 'form-message';
      messageBox.textContent = '';
    }

    function setLoading(isLoading) {
      if (!submitBtn) return;
      if (isLoading) {
        submitBtn.disabled = true;
        submitBtn.innerHTML =
          '<i class="fas fa-spinner fa-spin"></i> Sending...';
      } else {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    }
  });
})();
