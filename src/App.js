import './App.css';
import Home from './Components/Home';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AnimatePresence } from "framer-motion";
import Sidebar from './Components/Sidebar';
import ForgotPassword from './Components/ForgotPassword';
import CreateMaintanenceBill from './Components/CreateMaintanenceBill';
import CreateWaterBill from './Components/CreateWaterBill';
import ShowMaintanenceBill from './Components/ShowMaintanenceBill';
import ShowWaterBill from './Components/ShowWaterBill';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Initialize isLoggedIn state from localStorage or default to false
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  // Update localStorage when isLoggedIn changes
  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  return (
    <Router>
      <Routes>
        <Route path="*" element={<Main setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />} />
      </Routes>
    </Router>
  );
}

function Main({ setIsLoggedIn, isLoggedIn }) {
  const location = useLocation();

  return (
    <>  
      <div  className={isLoggedIn? 'row m-auto g-0 d-block' : 'd-none'}>
        <div className='col-md-2 col-xl-2'>
          {isLoggedIn && <Sidebar />}
        </div>
        <div className='col-md-12 col-xl-12'>
        <AnimatePresence>
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/CreateMaintenanceBill" element={ <CreateMaintanenceBill /> } />
                <Route path="/CreateWatereBill" element={ <CreateWaterBill /> } />
                <Route path="/ShowMaintanenceBill" element={ <ShowMaintanenceBill /> }/>
                <Route path="/ShowWaterBill" element={ <ShowWaterBill /> }/>
              </Routes>
            </AnimatePresence>
        </div>
      </div>
    </>
  );
}
export default App;
