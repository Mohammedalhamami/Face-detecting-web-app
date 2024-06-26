import React from "react";

export const FaceRecognition = ({ imageURL }) => {
  return (
    <div className="center ma" style={{ width: "500px", height: "auto" }}>
      <img id="inputimage" src={imageURL} alt="face-detect img." />
    </div>
  );
};
