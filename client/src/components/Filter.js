import React, { Component } from "react";
let defaultStyle = {
  color: "#fff",
  "font-family": "Papyrus",
};
class Filter extends Component {
  render() {
    return (
      <div style={defaultStyle}>
        <img alt="hello" />
        <input
          type="text"
          onKeyUp={(event) => this.props.onTextChange(event.target.value)}
          style={{
            ...defaultStyle,
            color: "black",
            "font-size": "20px",
            padding: "10px",
          }}
        />
      </div>
    );
  }
}

export default Filter;
