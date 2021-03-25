import React, { useEffect, useState } from 'react';
import './App.css';
import { Popup } from './Popup/Popup';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './utils/store';
import { Board } from './Board/Board';
import { DONE_COLUMN_NAME, IN_PROGRESS_COLUMN_NAME, TESTING_COLUMN_NAME, TODO_COLUMN_NAME } from './constants/exampleColumnNames';

function App() {
  const [isShowPopup, setIsShowPopup] = useState<boolean>(false);

  useEffect(() => {
    const author = store.getName()

    if (!author) {
      setIsShowPopup(true);
    }

    const columns = store.getColumns()

    if (!columns.length) {
      store.addColumns([
        TODO_COLUMN_NAME, IN_PROGRESS_COLUMN_NAME,
        TESTING_COLUMN_NAME, DONE_COLUMN_NAME
      ])
    }
  }, []);

  const handleClose = () => {
    setIsShowPopup(false);
  };

  return (
    <div className="App">
      <Board />
      <Popup show={isShowPopup} onHide={handleClose} />
    </div>
  );
}

export default App;
