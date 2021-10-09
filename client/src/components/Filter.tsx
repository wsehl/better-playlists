import React from "react"
import PropTypes from "prop-types"

function Filter(props) {
  return (
    <input
      type="text"
      placeholder="Type something..."
      className="h-10 px-2 rounded border border-gray-800 hover:border-gray-500-spotify placeholder-gray-600 focus:ring-1 focus:outline-none ring-gray-500 ring-opacity-20 bg-gray-800-spotify"
      onKeyUp={(event) => props.onTextChange(event.target.value)}
    />
  )
}

Filter.propTypes = {
  onTextChange: PropTypes.func.isRequired,
}

export default Filter
