import React from "react"
import PropTypes from "prop-types"

function HoursCounter(props) {
  const { playlists } = props
  const allSongs = playlists.reduce(
    (songs, eachPlaylist) => songs.concat(eachPlaylist.songs),
    []
  )
  const totalDuration = allSongs.reduce(
    (sum, eachSong) => sum + eachSong.duration,
    0
  )
  const totalDurationHours = Math.round(totalDuration / 60)
  return (
    <div>
      <h2>{totalDurationHours} hours</h2>
    </div>
  )
}

HoursCounter.propTypes = {
  playlists: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default HoursCounter
