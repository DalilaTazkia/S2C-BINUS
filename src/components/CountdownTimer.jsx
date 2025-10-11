import { useEffect, useState } from "react";

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(30 * 60);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex flex-row justify-center items-center gap-2">
      <h4 className="p-2 bg-white rounded-lg text-center text-black poppins-semibold">
        {String(minutes).padStart(2, "0")}
      </h4>
      <h4 className="p-2 bg-white rounded-lg text-center text-black poppins-semibold">
        {String(seconds).padStart(2, "0")}
      </h4>
    </div>
  );
}
