import React, { useEffect, useState } from "react";
import "./App.css";
import EnterNamePopup from "./components/Popup";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./utils/store";
import Board from "./components/Board";
import { ColumnsProvider } from "./context/ColumnsContext";

function App() {
  const [isShowPopup, setIsShowPopup] = useState(false);

  useEffect(() => {
    const author = store.getName();

    if (!author) {
      setIsShowPopup(true);
    }
  }, []);

  const handleClose = () => {
    setIsShowPopup(false);
  };

  return (
    <div className="App">
      <ColumnsProvider>
        <Board />
      </ColumnsProvider>
      <EnterNamePopup show={isShowPopup} onHide={handleClose} />
    </div>
  );
}

export default App;
