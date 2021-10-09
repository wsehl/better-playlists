import React, { Component } from "react"
import queryString from "query-string"
import PlaylistCounter from "./components/PlaylistCounter"
import HoursCounter from "./components/HoursCounter"
import Filter from "./components/Filter"
import Playlist from "./components/Playlist"

const serverUri = import.meta.env.VITE_BACKEND_URI

class App extends Component {
  constructor() {
    super()
    this.state = {
      filterString: "",
    }
  }

  componentDidMount() {
    const parsed = queryString.parse(window.location.search)
    const accessToken = parsed.access_token
    if (!accessToken) return
    fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          user: {
            name: data.display_name,
            avatar: data.images[0].url,
          },
        })
      })
    fetch("https://api.spotify.com/v1/me/playlists", {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => response.json())
      .then((playlistData) => {
        const playlists = playlistData.items
        const trackDataPromises = playlists.map((playlist) => {
          const responsePromise = fetch(playlist.tracks.href, {
            headers: { Authorization: `Bearer ${accessToken}` },
          })
          const trackDataPromise = responsePromise.then((response) =>
            response.json()
          )
          return trackDataPromise
        })
        const allTracksDataPromises = Promise.all(trackDataPromises)
        const playlistsPromise = allTracksDataPromises.then((trackDatas) => {
          trackDatas.forEach((trackData, i) => {
            playlists[i].trackDatas = trackData.items
              .map((item) => item.track)
              .map((track) => ({
                name: track.name,
                duration: track.duration_ms / 1000,
              }))
          })
          return playlists
        })
        return playlistsPromise
      })
      .then((playlists) =>
        this.setState({
          playlists: playlists.map((item) => ({
            name: item.name,
            imageUrl: item.images[0].url,
            songs: item.trackDatas.slice(0, 3),
          })),
        })
      )
  }

  render() {
    const { user, playlists, filterString } = this.state

    const playlistToRender =
      user && playlists
        ? playlists.filter((playlist) => {
            const matchesPlaylist = playlist.name
              .toLowerCase()
              .includes(filterString.toLowerCase())
            const matchesSong = playlist.songs.find((song) =>
              song.name.toLowerCase().includes(filterString.toLowerCase())
            )
            return matchesPlaylist || matchesSong
          })
        : []

    return (
      <div className="container">
        {user ? (
          <div className="flex flex-col gap-3 mt-3">
            <div className="flex items-center gap-2">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 object-cover rounded-full"
              />
              <h1 className="text-2xl font-medium">{user.name}</h1>
            </div>
            <div className="flex items-center gap-2">
              <PlaylistCounter playlists={playlistToRender} />
              <HoursCounter playlists={playlistToRender} />
            </div>
            <div>
              <Filter
                onTextChange={(text) => {
                  this.setState({ filterString: text })
                }}
              />
            </div>
            <div className="flex flex-wrap gap-3">
              {playlistToRender.map((playlist, i) => (
                <Playlist playlist={playlist} index={i} />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex h-screen justify-center items-center">
            <div className="text-center">
              <button
                className="px-4 py-2 text-center rounded-lg bg-green-500-spotify bg-opacity-90 text-white font-medium focus:outline-none focus:ring-2 ring-green-500-spotify ring-opacity-20 shadow"
                type="button"
                onClick={() => {
                  window.location.href = `${serverUri}/login`
                }}
              >
                Sign in with Spotify
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default App
