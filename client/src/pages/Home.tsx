import React, { useEffect, useState } from "react"
import PlaylistCounter from "@/components/PlaylistCounter"
import HoursCounter from "@/components/HoursCounter"
import Filter from "@/components/Filter"
import Playlist from "@/components/Playlist"
import Loader from "@/components/Loader"
import {
  getUser,
  getPlaylists,
  getPlaylist,
  getPlaylistTracks,
  logout,
} from "@/api"
import { IPlaylist } from "@/types"

export default function Home() {
  interface IUser {
    name: string
    avatar: string
  }

  const [filterString, setFilterString] = useState("")
  const [playlists, setPlaylists] = useState<Array<IPlaylist> | null>(null)
  const [user, setUser] = useState<IUser | null>(null)

  useEffect(() => {
    ;(async () => {
      const userData = await getUser()
      setUser({
        name: userData.display_name,
        avatar: userData.images[0].url,
      })
      getPlaylists()
        .then((playlistData) => {

          const playlists = playlistData.items
          const trackDataPromises = playlists.map((playlist) => {
            return getPlaylistTracks(playlist.id)
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
        .then((playlists) => {
          return setPlaylists(
            playlists.map((item) => ({
              name: item.name,
              imageUrl: item.images[0].url,
              songs: item.trackDatas.slice(0, 3),
            }))
          )
        })
    })()
  }, [])

  const playlistToRender = playlists
    ? playlists.filter((playlist) => {
        const matchesPlaylist = playlist.name
          .toLowerCase()
          .includes(filterString.toLowerCase())
        const matchesSong = playlist.songs.find((song) =>
          song.name.toLowerCase().includes(filterString.toLowerCase())
        )
        return matchesPlaylist || matchesSong
      })
    : null

  return (
    <div className="container">
      {user && playlistToRender ? (
        <>
          <div className="flex flex-col gap-3 mt-3">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-16 h-16 object-cover rounded-full"
                />
                <h1 className="text-2xl font-medium">{user.name}</h1>
              </div>
              <div>
                <button
                  className="px-4 py-2 font-medium text-center rounded-lg bg-red-500 bg-opacity-90 text-white focus:outline-none focus:ring-2 ring-red-500 ring-opacity-20 shadow"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <PlaylistCounter playlists={playlistToRender} />
              <HoursCounter playlists={playlistToRender} />
            </div>
            <div>
              <Filter
                onTextChange={(text: any) => {
                  setFilterString(text)
                }}
              />
            </div>
            <div className="flex flex-wrap gap-3">
              {playlistToRender.map((playlist, i:number) => (
                <Playlist playlist={playlist} key={i} />
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <Loader></Loader>
        </>
      )}
    </div>
  )
}
