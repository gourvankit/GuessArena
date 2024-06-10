// src/FormUI.js
import React, { useState, useRef } from "react";
import axios from "axios";
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import "./form-ui.css";
import Typewriter from "typewriter-effect";
import Overlay from "./Overlay";
import LogoutIcon from "@mui/icons-material/Logout";

const FormUI = (props) => {
  const [points, setPoints] = useState(5000);
  const [betAmount, setBetAmount] = useState();
  const [betType, setBetType] = useState();
  const [dice, setDice] = useState({ dice1: null, dice2: null, total: null });
  const [result, setResult] = useState(null);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const cardRef = useRef(null);

  const handleRollDice = async () => {
    const diceResponse = await axios.post("http://localhost:8080/roll-dice");
    setDice(diceResponse.data);

    const resultResponse = await axios.post(
      "http://localhost:8080/calculate-result",
      {
        betAmount,
        betType,
        total: diceResponse.data.total,
      }
    );
    setResult(resultResponse.data);
    setPoints(resultResponse.data.amount);
    setOverlayVisible(true);
  };

  const closeOverlay = () => {
    setOverlayVisible(false);
  };
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const deltaX = x - centerX;
    const deltaY = y - centerY;
    const rotateX = (deltaY / centerY) * -10;
    const rotateY = (deltaX / centerX) * 10;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    card.style.transform = `perspective(1000px) rotateX(0) rotateY(0)`;
  };
  return (
    <>
      <div className="nav-main">
        <span className="nav-heading">GuessArena</span>
        <div className="nav-points-div">
          <span className="nav-points">Points: {points}</span>
          <LogoutIcon
            className="logout-btn"
            color="primary"
            fontSize="large"
            onClick={props.logout}
          />
        </div>
      </div>
      <div className="content">
        <div className="welcome-text">
          <h1>
            <Typewriter
              options={{
                autoStart: true,
                loop: true,
                delay: 100,
                strings: ["Welcome to 7 Up 7 Down Game!"],
                cursor: "|",
              }}
            ></Typewriter>
          </h1>
        </div>
        <div
          className="inner-content"
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="inner-content-1">
            <FormControl fullWidth>
              <InputLabel className="input-label" id="demo-simple-select-label">
                Bet Amount
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={betAmount}
                label="Bet Amount"
                onChange={(e) => setBetAmount(e.target.value)}
                required
              >
                <MenuItem value={100}>100</MenuItem>
                <MenuItem value={200}>200</MenuItem>
                <MenuItem value={500}>500</MenuItem>
              </Select>
            </FormControl>
          </div>
          <FormControl fullWidth>
            <InputLabel className="input-label" id="demo-simple-select-label-1">
              Bet Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-label-1"
              id="demo-simple-select-1"
              value={betType}
              label="Bet Type"
              onChange={(e) => setBetType(e.target.value)}
              required
            >
              <MenuItem value="7up">7 Up</MenuItem>
              <MenuItem value="7down">7 Down</MenuItem>
              <MenuItem value="lucky7">Lucky 7</MenuItem>
            </Select>
          </FormControl>

          <Box textAlign="center" marginTop={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleRollDice}
            >
              Roll Dice
            </Button>
          </Box>

          {dice.dice1 !== null && (
            <span className="result-text-1">
              Dice Result: {dice.dice1} + {dice.dice2} = {dice.total}
            </span>
          )}
          <br />
          {result && (
            <span className="result-text-2">
              {result.win ? "You Win!" : "You Lose!"} New Points:{" "}
              {result.amount}
            </span>
          )}
        </div>
        <span>Made with love by Gourvankit Singh</span>
      </div>

      {overlayVisible && <Overlay result={result} onClose={closeOverlay} />}
    </>
  );
};

export default FormUI;
