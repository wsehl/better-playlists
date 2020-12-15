# spotify-enhance

### local
create .env in root folder and set up some settings

```sh
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
```

### netlify (client)
```sh
Base directory: client
Build command: CI=false npm run build
Publish directory: client/build
```

### heroku (server)
```sh
heroku config:set SPOTIFY_CLIENT_SECRET=
heroku config:set SPOTIFY_CLIENT_ID=
heroku config:set FRONTEND_URI=
heroku config:set REDIRECT_URI=
```
