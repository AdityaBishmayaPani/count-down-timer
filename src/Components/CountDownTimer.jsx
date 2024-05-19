import React from "react";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CountDownTimer.css";
const CountDownTimer = () => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [targetDate, setTargetDate] = useState(new Date());
  const [running, setRunning] = useState(false);

  const handleChange = (event) => {
    setTargetDate(new Date(event.target.value));
  };

  const calculateTimeLeft = () => {
    if (!targetDate) return;
    const now = new Date().getTime();
    const difference = targetDate.getTime() - now;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setCountdown({
        days,
        hours,
        minutes,
        seconds,
      });
    } else {
      setCountdown({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
    }
  };

  useEffect(() => {
    
    let timer
    if (running) {
       timer = setInterval(() => {
        calculateTimeLeft();
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [targetDate,running]);

  const startCountdown = () => {
    setRunning(true);
  };

  const cancelCountdown = () => {
    setRunning(false);
    setCountdown({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
    // setTargetDate(null);
  };
  return (
    <div>
      <div className="container">
        <h1 className="text">
          Countdown <span style={{ color: "purple" }}>Timer</span>
        </h1>
        <div className="text">
          <input
            type="datetime-local"
            value={targetDate.toISOString().slice(0, 16)}
            onChange={handleChange}
          />
        </div>
        <div className="countdown-boxes">
          <div className="countdown-box">
            <span>{countdown.days}</span>
            <span>Days</span>
          </div>
          <div className="countdown-box">
            <span>{countdown.hours}</span>
            <span>Hours</span>
          </div>
          <div className="countdown-box">
            <span>{countdown.minutes}</span>
            <span>Minutes</span>
          </div>
          <div className="countdown-box">
            <span>{countdown.seconds}</span>
            <span>Seconds</span>
          </div>
        </div>
        <div className="countdown-buttons">
          {!running ? (
            <button onClick={startCountdown}>Start</button>
          ) : (
            <button onClick={cancelCountdown}>Cancel</button>
          )}
        </div>
      </div>
    </div>
  );
};
export default CountDownTimer;
