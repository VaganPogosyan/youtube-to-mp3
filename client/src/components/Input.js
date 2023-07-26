import React from "react";

function Input(props) {
  const { handleChange, link } = props;
  return (
    <div>
      <input
        style={{ width: 800, fontSize: 20 }}
        type="text"
        onChange={handleChange}
        value={link}
      ></input>
      <h2>Link: {link}</h2>
    </div>
  );
}

export default Input;
