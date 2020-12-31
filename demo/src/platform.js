import superagent from "superagent"

/**
 * Lightweight Platform v2 wrapper
 * @see https://eu.rp.secure.iproov.me/docs.html
 */
export class PlatformAPI {
  constructor(logger, baseUrl, apiKey, apiSecret) {
    this.logger = logger
    this.baseUrl = baseUrl
    this.apiKey = apiKey
    this.apiSecret = apiSecret
  }

  apiUrl(endpoint) {
    return `${this.baseUrl}/api/v2/${endpoint}`
  }

  withJsonAuth(payload) {
    return {
      api_key: this.apiKey,
      secret: this.apiSecret,
      ...payload,
    }
  }

  withHeaders() {
    return {
      "accept": "json",
      "user-agent": "superagent",
    }
  }

  /**
   * @todo Add response envelope for consumption by Hapi
   * @param request
   * @return {Promise<*>}
   */
  async unpack(request) {
    try {
      const response = await request
      return { ...response.body, base_url: this.baseUrl }
    } catch (e) {
      // @todo: indicate this is an error - currently we just pass through
      if (e.status === 400) {
        const { error, error_description } = e.response.body
        this.logger.error("Error %s: %s", error, error_description)
      }
      return e.response.body
    }
  }

  async token(mode, options = {}) {
    const { userId, assuranceType } = options
    if (!userId) {
      this.logger.warn(`Couldn't create a token because user_id is empty`)
      return {
        error: "Missing User ID",
        error_description: "You must provide a user_id to create a token.",
      }
    }
    this.logger.info(`Creating ${assuranceType} ${mode} token for ${userId}`)
    return this.unpack(
      superagent
        .post(this.apiUrl(`claim/${mode}/token`))
        .set(this.withHeaders())
        .send(
          this.withJsonAuth({
            user_id: userId,
            assurance_type: assuranceType,
            resource: "Web SDK Example",
          })
        )
    )
  }

  async validate(mode, options = { userId, token }) {
    const { userId, token } = options
    this.logger.info(`Validating ${mode} for ${userId} - token: ${token}`)
    return this.unpack(
      superagent
        .post(this.apiUrl(`claim/${mode}/validate`))
        .set(this.withHeaders())
        .send(
          this.withJsonAuth({
            token,
            ip: "127.0.0.1", // @todo: change when IPv6 is fully supported
            client: "superagent",
          })
        )
    )
  }
}

/**
 * Map Hapi request payloads to PlatformAPI method arguments
 */
export const requestToAPIMapper = Object.freeze({
  token(request) {
    return {
      userId: request.payload.user_id,
      assuranceType: request.payload.assurance_type || "genuine_presence",
    }
  },
  validate(request) {
    return {
      token: request.payload.token,
      userId: request.payload.user_id,
    }
  },
})
