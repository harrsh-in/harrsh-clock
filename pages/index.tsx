import Head from "next/head";
import React, { useEffect, useState } from "react";

const Home = () => {
  const calculateTimeLeft = (): TimeLeft => {
    let year = new Date().getFullYear();
    const difference = +new Date(`2024-02-17`) - +new Date();

    let timeLeft: TimeLeft = {};

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

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({});
  const [showColon, setShowColon] = useState<boolean>(true);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Blinking colon
    const blinker = setInterval(() => {
      setShowColon((prev) => !prev);
    }, 500);

    // Clear the interval on component unmount
    return () => {
      clearInterval(timer);
      clearInterval(blinker);
    };
  }, []);

  const timeEntries = Object.entries(timeLeft);

  return (
    <React.Fragment>
      <Head>
        <title>Harrsh&apos;s clock</title>
        <link rel="canonical" href="https://timer.harrsh.com" />
      </Head>

      <div className="flex flex-col justify-center items-center h-screen">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8">
          {timeEntries.map(([unit, value]) => (
            <div
              key={unit}
              className="flex flex-col items-center justify-center"
            >
              <div className="relative w-24 h-24 sm:w-48 sm:h-48 border-2 border-gray-600 rounded-full p-4">
                <div className="absolute top-0 left-0 w-full h-full rounded-full text-center flex items-center justify-center text-2xl sm:text-4xl text-white">
                  {value ? value.toString().padStart(2, "0") : "00"}
                </div>
              </div>
              <p className="mt-4 text-center text-xl sm:text-2xl text-white">
                {unit}
              </p>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;

interface TimeLeft {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}
