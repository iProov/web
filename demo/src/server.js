import Hapi from "@hapi/hapi"
import { PlatformAPI, requestToAPIMapper } from "./platform.js"

import { configure } from "./config.js"

async function init() {
  const { BASE_URL, API_KEY, API_SECRET } = configure(process.env)

  const server = Hapi.server({
    port: 80,
    host: "0.0.0.0", // listen on all interfaces so Docker can bind
  })

  let platform

  server.route({
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "Hello World!"
    },
  })

  server.route({
    method: "POST",
    path: "/api/claim/{claimMode}/{claimAction}",
    options: { cors: { origin: ["*"] } },
    handler: async (request, h) => {
      const { claimMode, claimAction } = request.params
      try {
        return await platform[claimAction](claimMode, requestToAPIMapper[claimAction](request))
      } catch (e) {
        console.error("Unhandled: %s", e.message)
        throw e
      }
    },
  })

  platform = new PlatformAPI(console, BASE_URL, API_KEY, API_SECRET)

  await server.start()

  console.log("Web SDK example running on %s", server.info.uri)
  console.log("iProov tokens will be created on %s with API_KEY %s", BASE_URL, API_KEY)
}

process.on("unhandledRejection", (err) => {
  console.log(err)
  process.exit(1)
})

process.on("SIGINT", () => {
  console.log("Caught SIGINT - bye!")
  process.exit(0)
})

init()
