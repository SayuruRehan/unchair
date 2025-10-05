
import { useEffect, useRef, useState } from "react";
import { Notification } from "@tauri-apps/api/notification";
import "./App.css";


function App() {
  const [nextReminder, setNextReminder] = useState(Date.now() + 20 * 60 * 1000);
  const [isStretching, setIsStretching] = useState(false);
  const timerRef = useRef();

  useEffect(() => {
    function showNotification() {
      const notif = new Notification("Time to stand up and stretch!", {
        body: "Stand up and stretch for 1 minute.",
      });
      notif.show();
      setIsStretching(true);
      setTimeout(() => {
        setIsStretching(false);
        setNextReminder(Date.now() + 20 * 60 * 1000);
      }, 60 * 1000);
    }

    timerRef.current = setInterval(() => {
      if (!isStretching && Date.now() >= nextReminder) {
        showNotification();
      }
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [nextReminder, isStretching]);

  const minutesLeft = Math.max(0, Math.ceil((nextReminder - Date.now()) / 60000));

  return (
    <main className="container">
      <h1>Stretch Reminder</h1>
      {isStretching ? (
        <div className="alert">It's time to stand up and stretch for 1 minute!</div>
      ) : (
        <p>Next reminder in {minutesLeft} minute{minutesLeft !== 1 ? "s" : ""}.</p>
      )}
      <p>This app will remind you every 20 minutes to stand up and stretch for 1 minute.</p>
    </main>
  );
}

export default App;
