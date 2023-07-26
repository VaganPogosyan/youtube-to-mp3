import React from "react";

function Button(props) {
  const { handleClick } = props;
  //   const handleCLick = () => {
  //     console.log("Csd");
  //   };
  return (
    <div>
      <button
        onClick={handleClick}
        style={{
          fontSize: 20,
          paddingLeft: 30,
          paddingRight: 30,
          marginTop: 10,
        }}
      >
        Convert
      </button>
    </div>
  );
}

export default Button;
