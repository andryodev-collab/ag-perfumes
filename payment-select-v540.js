(() => {
  "use strict";

  const STORAGE_KEY = "ag_payment_method_v1";

  function iniciarMenuPagamento() {
    const fieldset = document.getElementById("paymentMethods");
    if (!fieldset || document.getElementById("paymentMethodSelect")) return Boolean(fieldset);

    const optionsWrap = fieldset.querySelector(".payment-options");
    const radios = [...fieldset.querySelectorAll('input[name="paymentMethod"]')];
    if (!optionsWrap || !radios.length) return false;

    const stored = (() => {
      try { return localStorage.getItem(STORAGE_KEY); } catch (_) { return null; }
    })();

    const selectedRadio = radios.find(radio => radio.checked);
    const initialValue = selectedRadio?.value || stored || radios[0]?.value || "Pix";

    const wrapper = document.createElement("div");
    wrapper.className = "payment-select-wrap";
    wrapper.innerHTML = `
      <select id="paymentMethodSelect" class="payment-select" aria-label="Selecionar forma de pagamento">
        ${radios.map(radio => `<option value="${radio.value}">${radio.value}</option>`).join("")}
      </select>
      <span class="payment-select-arrow" aria-hidden="true">⌄</span>
    `;

    optionsWrap.classList.add("payment-options-native");
    optionsWrap.setAttribute("aria-hidden", "true");
    fieldset.appendChild(wrapper);

    const select = wrapper.querySelector("#paymentMethodSelect");
    select.value = radios.some(radio => radio.value === initialValue) ? initialValue : radios[0].value;

    select.addEventListener("change", () => {
      const radio = radios.find(item => item.value === select.value);
      if (!radio) return;

      radio.checked = true;
      radio.dispatchEvent(new Event("change", { bubbles: true }));

      try { localStorage.setItem(STORAGE_KEY, select.value); } catch (_) {}
    });

    return true;
  }

  if (iniciarMenuPagamento()) return;

  let tentativas = 0;
  const timer = setInterval(() => {
    tentativas += 1;
    if (iniciarMenuPagamento() || tentativas >= 20) clearInterval(timer);
  }, 150);
})();
