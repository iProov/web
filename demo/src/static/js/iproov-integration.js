export const IPROOV_EVENTS = [
  "canceled",
  "error",
  "failed",
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
  iProov.setAttribute("assets_url", location.origin + "/node_modules/@iproov/web-sdk/")
  iProov.setAttribute("debug", "true")
  iProov.setAttribute("enable_floating_prompt", "true")
  iProov.setAttribute("aria-live", "assertive")
  iProov.setAttribute("enable_camera_selector", "true")
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

  /**
   * Accessibility in fullscreen
   */
  function ariaHideElements() {
    document.querySelectorAll(".hide-in-fs").forEach((el) => el.setAttribute("aria-hidden", "true"))
  }
  function ariaShowElements() {
    document.querySelectorAll(".hide-in-fs").forEach((el) => el.removeAttribute("aria-hidden"))
  }
  // ARIA hide elements when iProov starts
  iProov.addEventListener("started", ariaHideElements)
  // ARIA show elements when iProov exists
  ;["canceled", "error", "failed", "passed"].forEach((eventName) => {
    iProov.addEventListener(eventName, ariaShowElements)
  })
  return iProov
}
