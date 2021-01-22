/**
 * Load and validate configuration
 * @todo Use Joi or some better configuration checker
 * @param env an object that contains the configuration, like process.env
 * @return {{API_KEY: *, API_SECRET: *, BASE_URL: *, EXAMPLE_SERVER_PORT: *, PORT: *}}
 */
export function configure(env) {
  const { BASE_URL, API_KEY, API_SECRET } = env
  let { PORT, EXAMPLE_SERVER_PORT } = env
  const errors = []
  if (!BASE_URL) {
    errors.push("BASE_URL is undefined. Example: https://eu.rp.secure.iproov.me.")
  }
  if (!API_KEY) {
    errors.push("API_KEY is undefined. You can obtain one from https://portal.iproov.com.")
  } else if (API_KEY.length < 40) {
    errors.push("API_KEY seems incorrect, it should be a 40 character alphanumeric string.")
  }
  if (!API_SECRET) {
    errors.push(
      "API_SECRET is undefined. It must correspond to your API_KEY. If lost, reset it at https://portal.iproov.com."
    )
  } else if (API_SECRET.length < 40) {
    errors.push("API_SECRET seems incorrect, it should be a 40 character alphanumeric string.")
  }
  if (!PORT) {
    // This is the internal container port that the EXAMPLE_SERVER_PORT should map to. Best left at 80.
    PORT = 80
  }
  if (!EXAMPLE_SERVER_PORT) {
    console.warn("EXAMPLE_SERVER_PORT not specified, using port 80.")
    EXAMPLE_SERVER_PORT = 80
  }
  if (errors.length) {
    console.error("Configuration problems detected:")
    errors.forEach((e) => console.error(e))
    console.error("Contact support@iproov.com for assistance.")
    process.exit(1)
    return
  }
  return {
    BASE_URL,
    API_KEY,
    API_SECRET,
    PORT,
    EXAMPLE_SERVER_PORT,
  }
}
