async function submitTokenRequest() {
  const formData = new FormData(document.querySelector("#token_config"))
  const payload = {}
  for (let [field, value] of formData.entries()) {
    payload[field] = value
  }
  const res = await fetch(`/api/claim/${payload.mode}/token`, { method: "POST", body: payload })
  const body = await res.json()
  if (body.error) {
    return handleError(body)
  }
  return initializeSDK(body)
}

async function initializeSDK(body) {
  const { token, base_url } = body
  const iProov = document.createElement("iproov-me")
  iProov.setAttribute("token", token)
  iProov.setAttribute("base_url", base_url)
  document.body.appendChild(iProov)
  await import("../node_modules/@iproov/web/iProovMe.js")
}

function handleError(body) {
  console.error(body)
}

const main = async () => {
  const d = document
  d.querySelector("#token_config button").addEventListener("click", function onTokenSubmit(event) {
    event.preventDefault()
    this.setAttribute("disabled", true)
    submitTokenRequest()
  })
}

main()
