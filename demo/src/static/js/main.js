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
  return initializeSDK(body)
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
    document.querySelector("#iproov_wrapper").classList.remove("hidden")
  }
}

initializeSDK.imported = false

function handleError(body) {
  console.error(body)
}

const main = async () => {
  const d = document
  d.querySelector("#token_config button").addEventListener("click", function onTokenSubmit(event) {
    event.preventDefault()
    submitTokenRequest()
  })
}

main()
