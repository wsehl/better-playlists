import React from "react"
import { IPlaylist } from "@/types"

interface Props {
  playlists: Array<IPlaylist>
}

function PlaylistCounter(props: Props) {
  const { playlists } = props

  return (
    <div>
      <h2>{playlists.length} playlists</h2>
    </div>
  )
}

export default PlaylistCounter
