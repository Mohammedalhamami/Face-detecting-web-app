import React from "react";
import "./ImageLinkForm.css";
export const ImageLinkForm = ({ onInputChange, onSubmit }) => {
  return (
    <>
      <p className="f3">
        {"This magic brain will detact faces in your pictures, Get it a try!!"}
      </p>
      <div className="center">
        <div className="center form pa4 shadow-5 br3">
          <input
            type="text"
            className="f4 pa2 w-70 center"
            onChange={onInputChange}
          />
          <button
            className="f4 w-30 grow link ph3 pv2 dib white bg-light-purple"
            onClick={onSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </>
  );
};
