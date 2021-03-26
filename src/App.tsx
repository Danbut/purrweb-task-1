import React, { useEffect, useState } from "react";
import "./App.css";
import Popup from "./components/Popup";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./utils/store";
import Board from "./components/Board";
import {
  DONE_COLUMN_NAME,
  IN_PROGRESS_COLUMN_NAME,
  TESTING_COLUMN_NAME,
  TODO_COLUMN_NAME,
} from "./constants/exampleColumnNames";
import { ColumnsProvider } from "./context/ColumnsContext";

function App() {
  const [isShowPopup, setIsShowPopup] = useState(false);

  useEffect(() => {
    const author = store.getName();

    if (!author) {
      setIsShowPopup(true);
    }

    const columns = store.getColumns();

    if (!columns.length) {
      store.addColumns([
        TODO_COLUMN_NAME,
        IN_PROGRESS_COLUMN_NAME,
        TESTING_COLUMN_NAME,
        DONE_COLUMN_NAME,
      ]);
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
      <Popup show={isShowPopup} onHide={handleClose} />
    </div>
  );
}

export default App;
