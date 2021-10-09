/* eslint-disable camelcase */
import express from "express"
import request from "request"
import querystring from "query-string"
import dotenv from "dotenv"

dotenv.config()

const app = express()

const PORT = process.env.PORT || 8888

const redirect_uri =
  process.env.REDIRECT_URI || "http://localhost:8888/callback"

app.get("/login", (req, res) => {
  res.redirect(
    `https://accounts.spotify.com/authorize?${querystring.stringify({
      response_type: "code",
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope: "user-read-private user-read-email",
      redirect_uri,
    })}`
  )
})

app.get("/callback", (req, res) => {
  const code = req.query.code || null
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code,
      redirect_uri,
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
    const { access_token } = body
    const uri = process.env.FRONTEND_URI || "http://localhost:3000"
    res.redirect(`${uri}?access_token=${access_token}`)
  })
})

// eslint-disable-next-line no-console
console.log(
  `Listening on port ${PORT}. Go /login to initiate authentication flow.`
)
app.listen(PORT)
