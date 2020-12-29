import Hapi from "@hapi/hapi"

async function init() {
  const server = Hapi.server({
    port: 80,
    host: "0.0.0.0",
  })

  server.route({
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "Hello World!"
    },
  })

  console.log("Launching example server with config:")
  console.dir({
    BASE_URL: process.env.BASE_URL,
    API_KEY: process.env.API_KEY,
  })

  await server.start()
  console.log("Web SDK example running on %s", server.info.uri)
}

process.on("unhandledRejection", (err) => {
  console.log(err)
  process.exit(1)
})

process.on("SIGINT", () => {
  console.log("Bye!")
  process.exit(0)
})

init()
