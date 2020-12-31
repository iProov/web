import { createSDK } from "./iproov-integration.js"

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

async function resetTokenCreationForm() {
  document.querySelector("#token_config").classList.remove("collapsed")
  document.querySelector("#iproov_wrapper").classList.add("hidden")
  document.querySelector("#user_id").focus()
}

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

function handleError(body) {
  const errorContainer = document.querySelector("#token_config .error-container")
  errorContainer.innerHTML = `<h4>Error</h4><p><b>${body.error}</b>: ${body.error_description}</p>`
  errorContainer.classList.remove("hidden")
  errorContainer.scrollIntoView({ behavior: "smooth", block: "end" })
  console.error("Error:", body.error, body)
}

const main = async () => {
  document.querySelector("#token_config").addEventListener("submit", function onTokenSubmit(event) {
    event.preventDefault()
    submitTokenRequest()
  })
  document.body.addEventListener("click", function onRestartDelegate(event) {
    if (event.target.classList.contains("action-restart")) {
      resetTokenCreationForm()
    }
  })
}

main()
