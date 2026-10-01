import React, { useEffect, useState } from "react";
import axios from "axios";

import Dashboard from "./Dashboard";
import TopBar from "./TopBar";

const Home = () => {
  const [isVerifying, setIsVerifying] = useState(true);
  const [username, setUsername] = useState("User");
  const [isDarkMode, setIsDarkMode] = useState(
    () => window.localStorage.getItem("tradenova-dashboard-theme") === "dark"
  );

  const toggleDarkMode = () => {
    setIsDarkMode((currentMode) => {
      const nextMode = !currentMode;
      window.localStorage.setItem("tradenova-dashboard-theme", nextMode ? "dark" : "light");
      return nextMode;
    });
  };

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:3002/verify",
          {},
          { withCredentials: true }
        );

        if (!data.status) {
          window.location.href = "http://localhost:3000/login";
          return;
        }

        setUsername(data.user || "User");
        setIsVerifying(false);
      } catch (error) {
        window.location.href = "http://localhost:3000/login";
      }
    };

    verifyUser();
  }, []);

  if (isVerifying) {
    return <p>Checking account...</p>;
  }

  return (
    <div className={`app-shell${isDarkMode ? " dark-mode" : ""}`}>
      <TopBar
        username={username}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />
      <Dashboard username={username} />
    </div>
  );
};

export default Home;
