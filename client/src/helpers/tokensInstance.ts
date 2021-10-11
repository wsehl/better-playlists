import Storage from "./storageWrapper"

enum Locals {
  ACCESS_TOKEN = "spotify_access_token",
  REFRESH_TOKEN = "spotify_refresh_token",
  TOKEN_TIMESTAMP = "spotify_token_timestamp",
}

export default class Tokens extends Storage<Locals> {
  private static instance?: Tokens

  private constructor() {
    super()
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new Tokens()
    }

    return this.instance
  }

  public getAccessToken() {
    return this.get(Locals.ACCESS_TOKEN)
  }

  public setAccessToken(accessToken: string) {
    this.set(Locals.ACCESS_TOKEN, accessToken)
  }

  public getRefreshToken() {
    return this.get(Locals.REFRESH_TOKEN)
  }

  public setRefreshToken(refreshToken: string) {
    this.set(Locals.REFRESH_TOKEN, refreshToken)
  }

  public getTokenTimestamp() {
    return this.get(Locals.TOKEN_TIMESTAMP)
  }

  public setTokenTimestamp(tokenTimestamp: string) {
    this.set(Locals.TOKEN_TIMESTAMP, tokenTimestamp)
  }

  public clear() {
    this.clearItems([
      Locals.ACCESS_TOKEN,
      Locals.REFRESH_TOKEN,
      Locals.TOKEN_TIMESTAMP,
    ])
  }
}
