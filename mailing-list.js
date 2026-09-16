// Mailing list popup: shows once per visitor (remembers via localStorage),
// dismissible by the close button, the overlay, or the Escape key.
document.addEventListener('DOMContentLoaded', function () {
  var overlay = document.getElementById('mailing-list-modal');
  if (!overlay) return;

  var closeBtn = overlay.querySelector('.modal-close');
  var form = overlay.querySelector('.modal-form');

  function dismiss() {
    overlay.classList.remove('visible');
    try { localStorage.setItem('jlc_mailing_dismissed', '1'); } catch (e) {}
  }

  var alreadyDismissed = false;
  try { alreadyDismissed = localStorage.getItem('jlc_mailing_dismissed') === '1'; } catch (e) {}

  if (!alreadyDismissed) {
    setTimeout(function () {
      overlay.classList.add('visible');
    }, 900);
  }

  closeBtn.addEventListener('click', dismiss);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) dismiss();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') dismiss();
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    // NOTE: this form does not currently send anywhere.
    // Connect it to a mailing list provider (see the setup notes) to actually collect emails.
    form.innerHTML = '<p style="margin:0; color: var(--pine);">Thanks &mdash; you\'re on the list.</p>';
    dismiss();
  });
});
