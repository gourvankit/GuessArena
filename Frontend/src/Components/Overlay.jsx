// src/Overlay.js
import React from "react";
import { Button } from "@mui/material";
import "./overlay.css";

const Overlay = ({ result, onClose }) => {
  return (
    <div className="overlay">
      <div className="overlay-content">
        <span className="overlay-msg">
          {result.win ? "WOOHOOO!" : "Try Again!"}
        </span>
        <img
          src={
            result.win
              ? "https://www.timeshighereducation.com/sites/default/files/styles/the_breaking_news_image_style/public/cheerful-smiling-man-cartoon.jpg?itok=Tn6TM-Fi"
              : "https://img.freepik.com/free-vector/hand-drawn-bored-cartoon-illustration_52683-117813.jpg"
          }
          alt={result.win ? "Cheerful" : "Sad"}
          className="overlay-image"
        />

        <Button variant="contained" color="primary" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
};

export default Overlay;
