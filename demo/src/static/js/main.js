import "../node_modules/@iproov/web/iProovSupport.js"

import { createSDK } from "./iproov-integration.js"

/**
 * Dispatch a request to the demo backend to create a new token.
 * Initialize a new SDK instance or handle any errors.
 */
async function submitTokenRequest() {
  const formData = new FormData(document.querySelector("#token_config"))
  const payload = {}
  for (let [field, value] of formData.entries()) {
    payload[field] = value
  }
  const res = await fetch(`/api/claim/${payload.mode}/token`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  })
  const body = await res.json()
  if (body.error) {
    return handleError(body)
  }
  document.querySelector("#token_config .error-container").classList.add("hidden")
  return initializeSDK(body)
}

/**
 * Prepare the form for another submission.
 */
async function resetTokenCreationForm() {
  document.querySelector("#token_config").classList.remove("collapsed")
  document.querySelector("#iproov_wrapper").classList.add("hidden")
  document.querySelector("#user_id").focus()
}

/**
 * On load, restore any cached user_id. If a user_id exists, automatically set the mode to verify.
 * On change, cache the user_id to localStorage.
 */
function primeForm() {
  const userIDField = document.querySelector("#user_id")
  const verifyRadio = document.querySelector("input[name=mode][value=verify]")
  let cachedUserId = localStorage.getItem("user_id")
  if (cachedUserId) {
    userIDField.value = cachedUserId
    verifyRadio.setAttribute("checked", true)
  }
  userIDField.addEventListener("change", function cacheUserId() {
    localStorage.setItem("user_id", userIDField.value)
  })
}

/**
 * Create a standalone support checker instance and configure the page to respond to basic checks.
 * @return {iProovSupport}
 */
function createSupportChecker() {
  const checker = new iProovSupport.iProovSupport() // vanilla JS with no webpack/UMD
  const output = document.querySelector(".support-container")
  checker.addEventListener("granted", (event) => {
    console.log("Permission is granted")
  })
  checker.addEventListener("denied", (event) => {
    console.warn("Permission denied", event)
    handleError(createError("permission_denied", "Device permission was denied"))
  })
  checker.addEventListener("check", (event) => {
    const { supported, granted } = event.detail
    output.innerHTML = `Device supported: ${supported.toString()}; permission granted: ${granted}`

    if (!supported || granted === false) {
      output.classList.remove("support-container--ok")
      output.classList.add("support-container--error")
    } else if (supported) {
      output.classList.add("support-container--ok")
      output.classList.remove("support-container--error")
    }

    output.classList.remove("hidden")
  })
  checker.check()
  return checker
}

/**
 * Create a new SDK instance, customise it (see iproov-integration.js) and append to the page.
 * @param body
 */
async function initializeSDK(body) {
  const { token, base_url } = body
  const iProov = createSDK(console, token, base_url)
  const container = document.querySelector("#iproovme_container")
  container.innerHTML = ""
  container.appendChild(iProov)
  if (!initializeSDK.imported) {
    await import("../node_modules/@iproov/web/iProovMe.js")
    initializeSDK.imported = true
  }
  const wrapper = document.querySelector("#iproov_wrapper")
  wrapper.classList.remove("hidden")
  iProov.addEventListener("ready", () => {
    iProov.querySelector("[slot=button] button").focus()
    wrapper.scrollIntoView({ behavior: "smooth", block: "end" })
  })
  document.querySelector("#token_config").classList.add("collapsed")
}

initializeSDK.imported = false

function createError(title, description) {
  return { error: title, error_description: description }
}

function handleError(body) {
  const errorContainer = document.querySelector("#token_config .error-container")
  errorContainer.innerHTML = `<h4>Error</h4><p><b>${body.error}</b>: ${body.error_description}</p>`
  errorContainer.classList.remove("hidden")
  errorContainer.scrollIntoView({ behavior: "smooth", block: "end" })
  console.error("Error:", body.error, body)
}

const main = async () => {
  const support = createSupportChecker()
  document.querySelector("#token_config").addEventListener("submit", function onTokenSubmit(event) {
    event.preventDefault()
    submitTokenRequest()
  })
  document.body.addEventListener("click", function onButtonClickDelegate(event) {
    if (event.target.classList.contains("action-restart")) {
      resetTokenCreationForm()
    } else if (event.target.classList.contains("action-check-permission")) {
      support.checkWithPermission()
    }
  })
  primeForm()
}

main()
