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

  async function fetchData() {
    const { display_name, images } = await getUser()

    setUser({ name: display_name, avatar: images[0].url })

    const { items: playlists } = await getPlaylists()

    const trackDataPromises = playlists.map((playlist) => {
      return getPlaylistTracks(playlist.id)
    })

    const trackDatas = await Promise.all(trackDataPromises)

    trackDatas.forEach((trackData, i) => {
      playlists[i].trackDatas = trackData.items
        .map((item) => item.track)
        .map((track) => ({
          name: track.name,
          duration: track.duration_ms / 1000,
        }))
    })

    const formattedPlaylists = playlists.map((item) => ({
      name: item.name,
      imageUrl: item.images[0].url,
      songs: item.trackDatas.slice(0, 3),
    }))

    setPlaylists(formattedPlaylists)
  }

  useEffect(() => {
    fetchData()
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

  const containerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, 140px)",
    justifyContent: "space-between",
    gridGap: "20px",
  }

  return (
    <div className="container">
      {user && playlistToRender ? (
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
          <div style={containerStyle}>
            {playlistToRender.map((playlist, i: number) => (
              <Playlist playlist={playlist} key={i} />
            ))}
          </div>
        </div>
      ) : (
        <div className="h-screen flex items-center justify-center">
          <Loader></Loader>
        </div>
      )}
    </div>
  )
}
