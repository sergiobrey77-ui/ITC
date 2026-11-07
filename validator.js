const rules = {
  name: {
    required: true,
    minLength: 3,
    messages: {
      required: "Name is required",
      minLength: "Name must be at least 3 characters"
    }
  },
  email: {
    required: true,
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    messages: {
      required: "Email is required",
      regex: "Enter a valid email like name@example.com"
    }
  },
  phone: {
    required: true,
    regex: /^\+?[0-9]{10,13}$/,
    messages: {
      required: "Phone number is required",
      regex: "Enter 10 to 13 digits, e.g. +256700000000"
    }
  },
  password: {
    required: true,
    minLength: 8,
    regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).+$/,
    messages: {
      required: "Password is required",
      minLength: "Password must be at least 8 characters",
      regex: "Use lowercase, uppercase, a number and a symbol"
    }
  }
};

function validateField(value, rule) {
  if (rule.required && value.trim() === "") return rule.messages.required;
  if (rule.minLength && value.length < rule.minLength) return rule.messages.minLength;
  if (rule.regex && !rule.regex.test(value)) return rule.messages.regex;
  return "";
}

function showResult(input, error) {
  document.getElementById(input.id + "Error").textContent = error;
  input.classList.toggle("invalid", error !== "");
  input.classList.toggle("valid", error === "");
}

const form = document.getElementById("signupForm");
const msg = document.getElementById("msg");

Object.keys(rules).forEach(function (id) {
  const input = document.getElementById(id);
  input.addEventListener("input", function () {
    showResult(input, validateField(input.value, rules[id]));
  });
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let allGood = true;

  Object.keys(rules).forEach(function (id) {
    const input = document.getElementById(id);
    const error = validateField(input.value, rules[id]);
    showResult(input, error);
    if (error) allGood = false;
  });

  msg.textContent = allGood ? "Form submitted successfully!" : "";
});
