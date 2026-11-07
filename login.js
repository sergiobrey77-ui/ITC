const form = document.getElementById("loginForm");
const username = document.getElementById("username");
const password = document.getElementById("password");
const remember = document.getElementById("remember");
const msg = document.getElementById("msg");

const toggle = document.getElementById("toggle");
toggle.addEventListener("click", function () {
  const hidden = password.type === "password";
  password.type = hidden ? "text" : "password";
  toggle.textContent = hidden ? "Hide" : "Show";
});

const saved = localStorage.getItem("savedUsername");
if (saved) {
  username.value = saved;
  remember.checked = true;
}

function setError(input, text) {
  document.getElementById(input.id + "Error").textContent = text;
  input.classList.toggle("invalid", text !== "");
}

function checkUsername() {
  if (username.value.trim() === "") {
    setError(username, "Username is required");
    return false;
  }
  if (username.value.trim().length < 3) {
    setError(username, "Username must be at least 3 characters");
    return false;
  }
  setError(username, "");
  return true;
}

function checkPassword() {
  if (password.value === "") {
    setError(password, "Password is required");
    return false;
  }
  if (password.value.length < 6) {
    setError(password, "Password must be at least 6 characters");
    return false;
  }
  setError(password, "");
  return true;
}

username.addEventListener("input", checkUsername);
password.addEventListener("input", checkPassword);

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const ok1 = checkUsername();
  const ok2 = checkPassword();
  if (!ok1 || !ok2) return;

  if (remember.checked) {
    localStorage.setItem("savedUsername", username.value.trim());
  } else {
    localStorage.removeItem("savedUsername");
  }
  msg.textContent = "Login successful!";
});
