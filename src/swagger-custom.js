const observer = new MutationObserver(() => {
  const inputs = document.querySelectorAll(
    '.auth-container input[type="text"]'
  );

  inputs.forEach((input) => {
    if (input.dataset.passwordToggleAdded) return;

    input.dataset.passwordToggleAdded = "true";

    input.type = "password";

    const button = document.createElement("button");

    button.type = "button";
    button.innerHTML = "👁";
    button.style.marginLeft = "8px";
    button.style.cursor = "pointer";
    button.style.border = "none";
    button.style.background = "transparent";
    button.style.fontSize = "18px";

    button.onclick = () => {
      if (input.type === "password") {
        input.type = "text";
        button.innerHTML = "◡";
      } else {
        input.type = "password";
        button.innerHTML = "👁";
      }
    };

    input.parentElement.appendChild(button);
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});