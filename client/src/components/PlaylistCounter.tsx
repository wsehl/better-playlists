import React from "react"
import PropTypes from "prop-types"

function PlaylistCounter(props) {
  const { playlists } = props

  return (
    <div>
      <h2>{playlists.length} playlists</h2>
    </div>
  )
}

PlaylistCounter.propTypes = {
  playlists: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default PlaylistCounter
