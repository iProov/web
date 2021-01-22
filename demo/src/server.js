import Hapi from "@hapi/hapi"
import Inert from "@hapi/inert"
import { fileURLToPath } from "url"
import { dirname, resolve } from "path"
import { PlatformAPI, requestToAPIMapper } from "./platform.js"

import { configure } from "./config.js"

const __dirname = fileURLToPath(dirname(import.meta.url))

async function init() {
  const { BASE_URL, API_KEY, API_SECRET, PORT, EXAMPLE_SERVER_PORT } = configure(process.env)

  const ALL_INTERFACES = "0.0.0.0" // listen on all interfaces so Docker can bind
  const server = Hapi.server({
    port: PORT,
    host: ALL_INTERFACES,
  })

  await server.register(Inert)

  let platform

  server.route({
    method: "GET",
    path: "/{param*}",
    handler: {
      directory: {
        path: resolve(__dirname, "static"),
        index: "index.html",
      }
    }
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

  console.debug("Starting internal server: %s", server.info.uri)

  await server.start()

  console.log("iProov tokens will be created on %s with API_KEY %s", BASE_URL, API_KEY)
  console.log("Web SDK example available at %s", "http://localhost:" + EXAMPLE_SERVER_PORT)

}

process.on("unhandledRejection", (err) => {
  console.log(err)
  process.exit(1)
})

process.on("SIGINT", () => {
  console.log("Caught SIGINT - shutting down.")
  process.exit(0)
})

init()
