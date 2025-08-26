// index.js (frontend script, optional if using links directly)
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".navigation-bar button:first-child")
    .addEventListener("click", () => window.location.href = "/");

  document.querySelector(".right-button button:first-child")
    .addEventListener("click", () => window.location.href = "/signin");

  document.querySelector(".right-button button:last-child")
    .addEventListener("click", () => window.location.href = "/register");
});

app.get("/", (req, res) => res.render("index"));
app.get("/signin", (req, res) => res.render("signin"));
app.get("/register", (req, res) => res.render("register"));
