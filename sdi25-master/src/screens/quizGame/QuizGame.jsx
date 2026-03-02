import secureLocalStorage from "react-secure-storage";
import React, { useEffect, useState } from "react";
import Log from "./pages/log";
import Quiz from "./pages/Quiz";

export default function QuizGame() {
  const [display, setDisplay] = useState(true);

  useEffect(() => {
    renderDisplay();
  }, []);

  function renderDisplay() {
    if (secureLocalStorage.getItem("data_about_user")) {
      setDisplay(false);
    } else {
      setDisplay(true);
    }
  }

  return <div className="h-full">{display ? <Log renderDisplay={renderDisplay} /> : <Quiz />}</div>;
}

//test micro
