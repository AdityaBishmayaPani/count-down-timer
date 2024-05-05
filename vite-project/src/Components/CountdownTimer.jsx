// src/components/CountdownTimer.js
import React, { useState, useEffect, useRef } from 'react';
import { DateTime, Duration } from 'luxon';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './CountdownTimer.css'; // Custom styles

const CountdownTimer = () => {
  const [targetDate, setTargetDate] = useState('');
  const [countdown, setCountdown] = useState(null);
  const [intervalId, setIntervalId] = useState(null);

  const calculateTimeRemaining = (targetDateTime) => {
    const now = DateTime.local();
    const target = DateTime.fromISO(targetDateTime);
    const remaining = target.diff(now, ['days', 'hours', 'minutes', 'seconds']);
    return remaining;
  };

  const startCountdown = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }

    const targetDateTime = DateTime.fromISO(targetDate);
    if (targetDateTime.isValid && targetDateTime > DateTime.local()) {
      setCountdown(calculateTimeRemaining(targetDate));

      const newIntervalId = setInterval(() => {
        const remaining = calculateTimeRemaining(targetDate);
        setCountdown(remaining);
        if (remaining.toMillis() <= 0) {
          clearInterval(newIntervalId);
        }
      }, 1000);

      setIntervalId(newIntervalId);
    } else {
      alert('Please enter a valid future date and time');
    }
  };

  const stopCountdown = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
      setCountdown(null);
    }
  };

  return (
    <div className="container">
      <h1>Countdown Timer</h1>
      <div className="row">
        <div className="col-12">
          <input
            type="datetime-local"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
          />
          <button onClick={startCountdown} className="btn btn-primary mx-2">
            Start
          </button>
          <button onClick={stopCountdown} className="btn btn-danger mx-2">
            Stop
          </button>
        </div>
      </div>

      {countdown && (
        <div className="row countdown">
          <div className="col-12">
            <h2>
              {countdown.days} days, {(countdown.hours)} hours, {countdown.minutes} minutes,{' '}
              {Math.floor(countdown.seconds)} seconds
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;
