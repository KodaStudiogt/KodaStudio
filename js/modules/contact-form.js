import { selectors } from "../config/selectors.js";
import { isValidEmail } from "../utils/validation.js";

export function initContactForm() {
  const form = document.querySelector(selectors.contactForm);
  const status = document.querySelector(selectors.formStatus);

  if (!form || !status) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = new FormData(form).get("email");

    if (typeof email !== "string" || !isValidEmail(email)) {
      status.textContent = "Escribe un correo electrónico válido.";
      form.elements.email.focus();
      return;
    }

    status.textContent = "El formulario está validado; el envío requiere conectar un servicio de contacto.";
  });
}
