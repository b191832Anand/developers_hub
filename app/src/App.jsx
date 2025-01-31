import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Login from './components/login.jsx';
import Signup from './components/signup.jsx';
import Navbar from './components/navbar.jsx';
import Home from './components/home.jsx';
import Dashboard from './components/dashboard.jsx';
import Myprofile from './components/myprofile.jsx'
import Indprofile from './components/indprofile.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const location = useLocation();

  return (
    <div>
      {(location.pathname === '/' || location.pathname==='/login' || location.pathname==='/signup') && <Navbar />}
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/myprofile' element={<Myprofile/>}/>
        <Route path='/indprofile/:name/:email/:id' element={<Indprofile/>}/>
      </Routes>
    </div>
  );
}

function MainApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default MainApp;
