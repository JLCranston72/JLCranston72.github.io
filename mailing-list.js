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

  form.addEventListener('submit', function () {
    // Buttondown's own onsubmit handler (inline on the form) opens the
    // confirmation in a popup window; this just closes our modal a beat later
    // so it doesn't linger on screen while that popup opens.
    setTimeout(dismiss, 300);
  });
});
