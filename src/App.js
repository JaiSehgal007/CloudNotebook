import './App.css';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';

function App() {
  const [alert,setAlert]=useState(null);
  const showAlert = (message, typ) => {
    setAlert({
      msg: message,
      type: typ
    })
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  }
  return (
    <>
      {/* here we have wrapped in note state, now all the children within and and the childen of children within it will recieve the note state props */}
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home showAlert={showAlert} />}></Route>
              <Route path="/about" element={<About showAlert={showAlert} />}></Route>
              <Route path="/Login" element={<Login showAlert={showAlert} />}></Route>
              <Route path="/Signup" element={<Signup showAlert={showAlert} />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
