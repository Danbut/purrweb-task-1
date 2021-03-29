import React, { useEffect, useState } from "react";
import "./App.css";
import { EnterNamePopup } from "./components/Popup";
import "bootstrap/dist/css/bootstrap.min.css";
import { Board } from "./components/Board";
import { useAppSelector } from "./state/hooks";

function App() {
  const [isShowPopup, setIsShowPopup] = useState(false);
  const name = useAppSelector((state) => state.name.name);

  useEffect(() => {
    if (!name) {
      setIsShowPopup(true);
    }
  }, []);

  const handleClose = () => {
    setIsShowPopup(false);
  };

  return (
    <div className="App">
      <Board />
      <EnterNamePopup show={isShowPopup} onHide={handleClose} />
    </div>
  );
}

export default App;
