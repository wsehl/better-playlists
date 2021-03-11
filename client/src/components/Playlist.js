import React, { Component } from "react";

let defaultStyle = {
  color: "#fff",
  "font-family": "Papyrus",
};
function isEven(number) {
  return number % 2;
}

class Playlist extends Component {
  render() {
    let playlist = this.props.playlist;
    return (
      <div
        style={{
          ...defaultStyle,
          display: "inline-block",
          width: "25%",
          padding: "10px",
          "background-color": isEven(this.props.index) ? "#C0C0C0" : "#808080",
        }}
      >
        <h2>{playlist.name}</h2>
        <img src={playlist.imageUrl} alt="hello" style={{ width: "60px" }} />
        <ul style={{ "margin-top": "10px", "font-weight": "bold" }}>
          {playlist.songs.map((song) => (
            <li style={{ "padding-top": "2px" }}>{song.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Playlist;
