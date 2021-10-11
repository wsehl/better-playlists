import dotenv from "dotenv"
import express from "express"
import request from "request"
import querystring from "query-string"
import cors from "cors"

dotenv.config()

const PORT = process.env.PORT || 8888
const FRONTEND_URI = process.env.FRONTEND_URI || "http://localhost:3000"
const REDIRECT_URI =
  process.env.REDIRECT_URI || "http://localhost:8888/callback"

const app = express()

app.use(cors({ origin: [FRONTEND_URI], credentials: true }))

app.get("/login", (req, res) => {
  res.redirect(
    `https://accounts.spotify.com/authorize?${querystring.stringify({
      response_type: "code",
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope: "user-read-private user-read-email",
      redirect_uri: REDIRECT_URI,
    })}`
  )
})

app.get("/callback", (req, res) => {
  const code = req.query.code || null
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code",
    },
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
      ).toString("base64")}`,
    },
    json: true,
  }
  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const { access_token, refresh_token } = body
      res.redirect(
        `${FRONTEND_URI}?access_token=${access_token}&refresh_token=${refresh_token}`
      )
    } else {
      const errorMessage = "invalid_token"
      res.redirect(`/${FRONTEND_URI}?error=${errorMessage}`)
    }
  })
})

app.get("/refresh_token", (req, res) => {
  const refresh_token = req.query.refresh_token
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
      ).toString("base64")}`,
    },
    form: {
      grant_type: "refresh_token",
      refresh_token,
    },
    json: true,
  }
  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token
      res.send({ access_token })
    }
  })
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
