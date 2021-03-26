import React, { useEffect, useState } from 'react';
import './App.css';
import { Popup } from './Popup/Popup';
import 'bootstrap/dist/css/bootstrap.min.css';
import nameStore from './utils/store';

function App() {
  const [isShowPopup, setIsShowPopup] = useState<boolean>(false);

  useEffect(() => {
    const author = nameStore.getName()

    if (!author) {
      setIsShowPopup(true);
    }
  }, []);

  const handleClose = () => {
    setIsShowPopup(false);
  };

  return (
    <div className="App">
      <Popup show={isShowPopup} onHide={handleClose} />
    </div>
  );
}

export default App;
