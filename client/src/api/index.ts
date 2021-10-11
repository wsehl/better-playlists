import axios from "axios"
import { getHashParams } from "../utils"
import { SERVER_URI, TOKEN_EXPIRATION_TIME } from "../config"
import Tokens from "../helpers/tokensInstance"

const tokens = Tokens.getInstance()

const setLocalAccessToken = (token: string) => {
  tokens.setTokenTimestamp(`${Date.now()}`)
  tokens.setAccessToken(`${token}`)
}

const api = axios.create({
  baseURL: SERVER_URI,
})

const refreshAccessToken = async () => {
  try {
    const {
      data: { access_token },
    } = await api.get("/refresh_token", {
      params: {
        refresh_token: tokens.getRefreshToken(),
      },
    })
    setLocalAccessToken(access_token)
    window.location.reload()
    return
  } catch (e) {
    console.error("Error occurred while refreshing token")
    return Promise.reject(e)
  }
}

export const getAccessToken = () => {
  const { error, access_token, refresh_token } = getHashParams()

  if (access_token || refresh_token) {
    window.history.pushState(null, "", window.location.pathname)
  }

  if (error) {
    console.error(error)
    refreshAccessToken()
  }

  if (
    tokens.getTokenTimestamp() &&
    Date.now() - Number(tokens.getTokenTimestamp()) > TOKEN_EXPIRATION_TIME
  ) {
    console.warn("Access token has expired, refreshing...")
    refreshAccessToken()
  }

  const localAccessToken = tokens.getAccessToken()

  if ((!localAccessToken || localAccessToken === "undefined") && access_token) {
    setLocalAccessToken(`${access_token}`)
    tokens.setRefreshToken(`${refresh_token}`)
    return access_token
  }

  return localAccessToken
}

export const token: any = getAccessToken()

export const logout = () => {
  tokens.clear()
  const onlyUrl = window.location.href.replace(window.location.search, "")
  window.location.href = onlyUrl
}

const spotifyApi = axios.create({
  baseURL: "https://api.spotify.com/v1",
})

spotifyApi.interceptors.request.use((request) => {
  request.headers!.Authorization = `Bearer ${token}`
  return request
})

spotifyApi.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

export const getUser = (): Promise<any> => {
  return spotifyApi.get("/me")
}

export const getPlaylists = (): Promise<any> => {
  return spotifyApi.get("/me/playlists")
}

export const getPlaylist = (playlistId: string): Promise<any> => {
  return spotifyApi.get(`/playlists/${playlistId}`)
}

export const getPlaylistTracks = (playlistId: string): Promise<any> => {
  return spotifyApi.get(`/playlists/${playlistId}/tracks`)
}
