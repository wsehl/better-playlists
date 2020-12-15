# spotify-enhance

## Development setup
### local

create .env in root folder

```sh
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
```

install packages and run 

```sh
npm i
npm run dev
```

### netlify (client)
```sh
Base directory: client
Build command: CI=false npm run build
Publish directory: client/build
```

### heroku (server)
```sh
heroku create spotify-serv-backend
heroku buildpacks:set heroku/nodejs
heroku config:set SPOTIFY_CLIENT_SECRET=
heroku config:set SPOTIFY_CLIENT_ID=
heroku config:set FRONTEND_URI=https://app.netlify.app/
heroku config:set REDIRECT_URI=https://app.herokuapp.com/callback
git push heroku master
```
