import "../node_modules/@iproov/web-sdk/iProovSupport.js";
import { createSDK } from "./iproov-integration.js";

/**
 * @param {HTMLElement} el target element
 */
function showElement(el) {
  el.classList.remove("hidden");
  el.setAttribute("aria-hidden", false);
}

/**
 * @param {HTMLElement} el target element
 */
function hideElement(el) {
  el.classList.add("hidden");
  el.setAttribute("aria-hidden", true);
}

/**
 * @param {HTMLButtonElement} submitButton
 * @param {string} buttonText
 */
function setCreateTokenSubmitText(submitButton, buttonText) {
  submitButton.textContent = buttonText;
}

const createTokenSubmitButton = document.querySelector("button[type=submit]");

/**
 * Dispatch a request to the demo backend to create a new token.
 * Initialize a new SDK instance or handle any errors.
 */
async function submitTokenRequest(createTokenSubmitButton) {
  setCreateTokenSubmitText(createTokenSubmitButton, "Loading...");
  const formData = new FormData(document.querySelector("#token_config"));
  const payload = {};
  for (let [field, value] of formData.entries()) {
    payload[field] = value;
  }
  const res = await fetch(`/api/claim/${payload.mode}/token`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
  const body = await res.json();
  if (body.error) {
    return handleError(body);
  }
  hideElement(document.querySelector("#token_config .error-container"));
  return initializeSDK(body);
}

/**
 * Prepare the form for another submission.
 */
async function resetTokenCreationForm() {
  const tokenEl = document.querySelector("#token_config");
  tokenEl.classList.remove("collapsed");
  tokenEl.setAttribute("aria-hidden", false);
  hideElement(document.querySelector("#iproov_wrapper"));
  document.querySelector("#user_id").focus();
}

/**
 * On load, restore any cached user_id. If a user_id exists, automatically set the mode to verify.
 * On change, cache the user_id to localStorage.
 */
function primeForm() {
  const userIDField = document.querySelector("#user_id");
  const verifyRadio = document.querySelector("input[name=mode][value=verify]");
  let cachedUserId = localStorage.getItem("user_id");
  if (cachedUserId) {
    userIDField.value = cachedUserId;
    verifyRadio.setAttribute("checked", true);
  }
  userIDField.addEventListener("change", function cacheUserId() {
    localStorage.setItem("user_id", userIDField.value);
  });
}

/**
 * Create a standalone support checker instance and configure the page to respond to basic checks.
 * @return {iProovSupport}
 */
function createSupportChecker() {
  const checker = new iProovSupport.iProovSupport(); // vanilla JS with no webpack/UMD
  const output = document.querySelector(".support-container");
  checker.addEventListener("granted", (event) => {
    console.log("Permission is granted");
  });
  checker.addEventListener("denied", (event) => {
    console.warn("Permission denied", event);
    handleError(
      createError("permission_denied", "Device permission was denied")
    );
  });
  checker.addEventListener("check", (event) => {
    const { supported, granted } = event.detail;
    output.innerHTML = `Device supported: ${supported.toString()}; permission granted: ${granted}`;

    if (!supported || granted === false) {
      output.classList.remove("support-container--ok");
      output.classList.add("support-container--error");
    } else if (supported) {
      output.classList.add("support-container--ok");
      output.classList.remove("support-container--error");
    }

    output.classList.remove("hidden");
  });
  checker.check();
  return checker;
}

/**
 * Create a new SDK instance, customise it (see iproov-integration.js) and append to the page.
 * @param body
 */
async function initializeSDK(body) {
  const { token, base_url } = body;
  const iProov = createSDK(console, token, base_url, { onResult: renderFrame });
  const container = document.querySelector("#iproovme_container");
  container.innerHTML = "";
  container.appendChild(iProov);
  if (!initializeSDK.imported) {
    await import("../node_modules/@iproov/web-sdk/iProovMe.js");
    initializeSDK.imported = true;
  }
  const wrapper = document.querySelector("#iproov_wrapper");
  showElement(wrapper);

  const tokenEl = document.querySelector("#token_config");
  tokenEl.classList.add("collapsed");
  tokenEl.setAttribute("aria-hidden", true);
  setCreateTokenSubmitText(createTokenSubmitButton, "Create token");

  iProov.addEventListener("ready", () => {
    iProov.querySelector("[slot=button] button").focus();
    wrapper.scrollIntoView({ behavior: "smooth", block: "end" });
  });

  async function renderFrame() {
    const formData = new FormData(document.querySelector("#token_config"));
    const payload = { token };
    for (let [field, value] of formData.entries()) {
      payload[field] = value;
    }

    const res = await fetch(`/api/claim/${payload.mode}/validate`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });

    const body = await res.json();
    if (body.error) {
      return handleError(body);
    }

    if (body.frame_available) {
      const img = document.createElement("img");
      img.id = "frame";
      img.alt = "Returned face scan image";
      img.src = "data:image/png;base64," + body.frame;
      container.appendChild(img);
      img.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
}

initializeSDK.imported = false;

function createError(title, description) {
  return { error: title, error_description: description };
}

function testIfValidEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

const emailAddressEl = document.querySelector("#user_id");
const emailErrorMessageEl = document.querySelector("#user_id + .error-message");

function validateEmail(emailAddressValue, emailErrorMessageEl) {
  const isValidEmail = testIfValidEmail(emailAddressValue);
  emailErrorMessageEl.style.display = isValidEmail ? "none" : "block";
  return isValidEmail;
}

function handleError(body) {
  setCreateTokenSubmitText(createTokenSubmitButton, "Create token");
  const errorContainer = document.querySelector(
    "#token_config .error-container"
  );
  errorContainer.innerHTML = `<h3 class="error">Error</h3><p><strong>${body.error}</strong>: ${body.error_description}</p>`;
  showElement(errorContainer);
  errorContainer.scrollIntoView({ behavior: "smooth", block: "end" });
  console.error("Error:", body.error, body);
}

const main = async () => {
  const support = createSupportChecker();
  document
    .querySelector("#token_config")
    .addEventListener("submit", function onTokenSubmit(event) {
      event.preventDefault();
      if (!validateEmail(emailAddressEl.value, emailErrorMessageEl)) {
        return;
      }
      submitTokenRequest(createTokenSubmitButton);
    });
  document.body.addEventListener(
    "click",
    function onButtonClickDelegate(event) {
      if (event.target.classList.contains("action-restart")) {
        resetTokenCreationForm();
      } else if (event.target.classList.contains("action-check-permission")) {
        support.checkWithPermission();
      }
    }
  );

  primeForm();

  // Email user_id validation
  if (emailAddressEl.value !== "") {
    validateEmail(emailAddressEl.value, emailErrorMessageEl);
  }
  emailAddressEl.addEventListener("keyup", (event) => {
    validateEmail(event.target.value, emailErrorMessageEl);
  });
};

window.addEventListener("DOMContentLoaded", () => main());
