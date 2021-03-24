import React, { useEffect, useState } from 'react';
import './App.css';
import { Popup } from './Popup/Popup';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [showPopup, setShowPopup] = useState<boolean>(false);

  useEffect(() => {
    const storage = window.localStorage;
    const author = storage.getItem('author');

    if (!author) {
      setShowPopup(true);
    }
  }, []);

  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    <div className="App">
      <Popup show={showPopup} onHide={handleClose} />
    </div>
  );
}

export default App;
