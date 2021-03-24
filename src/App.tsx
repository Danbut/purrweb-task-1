import React, { useEffect, useState } from 'react';
import './App.css';
import { Popup } from './Popup/Popup';
import 'bootstrap/dist/css/bootstrap.min.css';
import nameStore from './utils/NameStoreService';
import { Board } from './Board/Board';
import { DONE_COLUMN_NAME, IN_PROGRESS_COLUMN_NAME, TESTING_COLUMN_NAME, TODO_COLUMN_NAME } from './constants/exampleColumnNames';
import TaskListStoreService from './utils/TaskListStoreService';

function App() {
  const [isShowPopup, setIsShowPopup] = useState<boolean>(false);

  useEffect(() => {
    const author = nameStore.getName()

    if (!author) {
      setIsShowPopup(true);
    }

    const columns = TaskListStoreService.getColumns()

    if (!columns.length) {
      TaskListStoreService.addColumn(TODO_COLUMN_NAME)
      TaskListStoreService.addColumn(IN_PROGRESS_COLUMN_NAME)
      TaskListStoreService.addColumn(TESTING_COLUMN_NAME)
      TaskListStoreService.addColumn(DONE_COLUMN_NAME)
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
