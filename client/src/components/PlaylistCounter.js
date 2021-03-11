import React, { Component } from "react";
let defaultStyle = {
  color: "#fff",
  "font-family": "Papyrus",
};
let counterStyle = {
  ...defaultStyle,
  width: "40%",
  display: "inline-block",
  "margin-bottom": "20px",
  "font-size": "20px",
  "line-height": "30px",
};

class PlaylistCounter extends Component {
  render() {
    let playlistCounterStyle = counterStyle;
    return (
      <div style={playlistCounterStyle}>
        <h2>{this.props.playlists.length} playlists</h2>
      </div>
    );
  }
}

export default PlaylistCounter;