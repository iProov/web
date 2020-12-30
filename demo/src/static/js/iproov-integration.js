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

export function createSDK(logger, token, base_url) {
  const iProov = document.createElement("iproov-me")
  iProov.setAttribute("token", token)
  iProov.setAttribute("base_url", base_url)
  IPROOV_EVENTS.forEach((eventName) => {
    iProov.addEventListener(eventName, (event) => {
      logger.log(`Captured ${event.type} event:`, event.detail)
    })
  })
  return iProov
}
