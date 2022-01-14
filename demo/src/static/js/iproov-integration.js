export const IPROOV_EVENTS = [
  "cancelled",
  "error",
  "failed",
  "interrupted",
  "multiple_cameras",
  "passed",
  "permission",
  "permission_denied",
  "progress",
  "ready",
  "started",
  "streaming",
  "streamed",
  "unsupported",
]

export function createSDK(logger, token, base_url, { onResult }) {
  const template = document.querySelector("#iproov_template").content.cloneNode(true)
  const iProov = document.createElement("iproov-me")
  iProov.setAttribute("token", token)
  iProov.setAttribute("base_url", base_url)
  iProov.setAttribute("assets_url", "/node_modules/@iproov/web/")
  iProov.setAttribute("debug", "true")
  iProov.addEventListener("progress", (event) => {
    const { progress, message } = event.detail
    document.querySelector(".progress__inner").style.width = progress + "%"
    document.querySelector(".progress__text").innerText = message
  })
  ;["passed", "failed"].forEach((resultEvent) => {
    iProov.addEventListener(resultEvent, () => {
      onResult(resultEvent)
    })
  })
  iProov.append(template)
  IPROOV_EVENTS.forEach((eventName) => {
    iProov.addEventListener(eventName, (event) => {
      logger.log(`Captured ${event.type} event:`, event.detail)
    })
  })
  return iProov
}
