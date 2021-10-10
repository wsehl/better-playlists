import React from "react"
import { IPlaylist } from "@/types"

interface Props {
  playlist: IPlaylist
}

export default function Playlist(props: Props) {
  const { playlist } = props
  return (
    <div
      className="
      bg-gray-800-spotify
      hover:bg-opacity-60
      flex flex-shrink-0 flex-none flex-col
      items-center
      duration-200
      rounded
      group
      w-36
      p-0
    "
    >
      <img
        src={playlist.imageUrl}
        alt={playlist.name}
        className="w-36 h-36 object-cover rounded"
      />
      <div className="fullwidth">
        <div className="flex flex-col w-full p-3">
          <span className="text-white text-base font-medium truncate">
            {playlist.name}
          </span>
          <ul className="text-gray-400 text-xs truncate">
            {playlist.songs.map((song, i) => (
              <li key={i}>{song.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
