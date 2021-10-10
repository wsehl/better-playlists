import React from "react"
import { IPlaylist, ISong } from "@/types"

interface Props {
  playlists: Array<IPlaylist>
}

function HoursCounter(props: Props) {
  const { playlists } = props

  const allSongs = playlists.reduce((songs: Array<ISong>, eachPlaylist) => {
    return songs.concat(eachPlaylist.songs)
  }, [])

  const totalDuration = allSongs.reduce((sum, eachSong: ISong) => {
    return sum + eachSong.duration
  }, 0)

  const totalDurationHours = Math.round(totalDuration / 60)

  return (
    <div>
      <h2>{totalDurationHours} hours</h2>
    </div>
  )
}

export default HoursCounter
