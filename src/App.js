import './App.css';
import GetAllBuildings from './Components/GetAllBuildings';
import Home from './Components/Home';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './Components/Navbar';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <Router>
        {isLoggedIn && <Navbar />}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path='/signup' element={<SignUp setIsLoggedIn={setIsLoggedIn} />} />
          {isLoggedIn && <Route path='/buildings' element={<GetAllBuildings />} />}
        </Routes>
      </Router>
    </>
  );
}

export default App;
