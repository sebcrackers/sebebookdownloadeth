function login() {
  const user = document.getElementById('username').value.trim();
  const pass = document.getElementById('password').value.trim();

  fetch("data/users.json")
    .then(res => res.json())
    .then(users => {
      const found = users.find(u => u.username === user && u.password === pass);

      if (found) {
        localStorage.setItem("user", user);
        window.location.href = "viewer.html";
      } else {
        document.getElementById("error").innerText = "Invalid username or password.";
      }
    })
    .catch(() => {
      document.getElementById("error").innerText = "Login system unavailable.";
    });
}

window.addEventListener("DOMContentLoaded", () => {
  const user = localStorage.getItem("user");

  if (window.location.pathname.includes("viewer.html")) {
    if (!user) {
      window.location.href = "login.html";
    } else {
      document.getElementById("watermark").innerText = user;
      fetch("data/content.html")
        .then(res => res.text())
        .then(html => {
          document.getElementById("ebookContent").innerHTML = html;
        });
    }
  }
});