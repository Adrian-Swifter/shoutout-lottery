import { useState, useEffect } from "react";
import useForceUpdate from "../hooks/useForceUpdate";
import moment from "moment";

const TimeLeft = ({ shoutOutTime }) => {
  const forceUpdate = useForceUpdate();
  useEffect(() => {
    forceUpdate();
  }, [shoutOutTime]);

  const calculateTimeLeft = () => {
    const difference =
      new Date(
        moment.utc(shoutOutTime).local().format("YYYY-MM-DD HH:mm:ss")
      ).getTime() - new Date().getTime();
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [year] = useState(new Date().getFullYear());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval, index) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={index}>
        <span className="interval-number">
          {timeLeft[interval].toString().length > 1 ? (
            <>
              <span className="timer-number">
                {timeLeft[interval].toString().split("")[0]}
              </span>
              <span className="timer-number">
                {timeLeft[interval].toString().split("")[1]}
              </span>
            </>
          ) : (
            <>
              <span className="timer-number">0</span>
              <span className="timer-number">{timeLeft[interval]}</span>
            </>
          )}
        </span>
        <span className="interval-sign">{interval}</span>
      </span>
    );
  });
  return (
    <>
      <span className="timer-wrapper">
        {timerComponents.length > 0 ? timerComponents : "0 min"}{" "}
      </span>
    </>
  );
};

export default TimeLeft;
