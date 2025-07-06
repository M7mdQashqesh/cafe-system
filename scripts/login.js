let loginForm = document.querySelector("form");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let email = document.querySelector("#username").value.trim();
  let password = document.querySelector("#password").value.trim();

  if (!email || !password) {
    // Notification
    Toastify({
      text: "All fields are required",
      duration: 3000,
      gravity: "top",
      position: "right",
      stopOnFocus: false,
      style: {
        background: "linear-gradient(to right, #ff416c, #ff4b2b)",
      },
      onClick: function () {},
    }).showToast();

    return;
  }

  if (
    !email.match(/^[\w.-]+@[\w.-]+\.\w{2,10}$/) ||
    !password.match(/^(?=.*?[0-9])(?=.*?[A-Za-z]).{8,32}$/)
  ) {
    // Notification
    Toastify({
      text: "Email or password are wrong, please login again",
      duration: 3000,
      gravity: "top",
      position: "right",
      stopOnFocus: false,
      style: {
        background: "linear-gradient(to right, #ff416c, #ff4b2b)",
      },
      onClick: function () {},
    }).showToast();

    return;
  }
});
