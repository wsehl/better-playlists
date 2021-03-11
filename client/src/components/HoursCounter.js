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

class HoursCounter extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs);
    }, []);
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration;
    }, 0);
    let totalDurationHours = Math.round(totalDuration / 60);
    let isTooLow = totalDurationHours < 40;
    let hoursCounterStyle = {
      ...counterStyle,
      color: isTooLow ? "red" : "white",
      "font-weight": isTooLow ? "bold" : "normal",
    };
    return (
      <div style={hoursCounterStyle}>
        <h2>{totalDurationHours} hours</h2>
      </div>
    );
  }
}

export default HoursCounter;
