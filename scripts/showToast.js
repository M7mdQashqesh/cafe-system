export function showToast(message, background) {
  Toastify({
    text: message,
    duration: 3000,
    gravity: "top",
    position: "right",
    stopOnFocus: false,
    style: {
      background: background,
    },
    onClick: function () {},
  }).showToast();
}
