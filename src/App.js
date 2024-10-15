import './App.css';
import React, { useState } from "react";
import { FaHome, FaUser, FaCog } from "react-icons/fa";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from './Components/home';
import Profile from './Components/profile';


function App() {
  const [activeItem, setActiveItem] = useState("home");
  const menuItems = [
    { name: "home", icon: <FaHome />, label: "Home",path:"/"  },
    { name: "profile", icon: <FaUser />, label: "Profile", path:"/profile" },
    { name: "settings", icon: <FaCog />, label: "Settings",path:"/settings" },
  ];

  return (
    <div className="App">
      <header>
        <div style={{
          width: "100vw", height: "8vh", backgroundColor: "red",
          borderBottom: "3px solid yellow", textAlign: "left", padding: "4px"
        }}>
          <span style={{ color: "white", fontSize: "30px" }}>
            WELLS FARGO - FITC Tool
          </span>
        </div>
      </header>
      <div className="content">
        <Router>
          <nav className="fancy-menu">
            <ul>
              {menuItems.map((item) => (
                <li
                  key={item.name}
                  className={activeItem === item.name ? "active" : ""}
                  onClick={() => setActiveItem(item.name)}
                >
                  {item.icon}
                  <Link to={item.path} style={{color:"white"}}>{item.label}</Link>
                </li>
              ))} 
            </ul>
          </nav>
          <div className="content">
            <Routes>
              <Route path="/" Component={Home}/>
              <Route path="/profile" Component={Profile}/>
              <Route path="/settings" Component={Profile}/>
            </Routes>
          </div>
        </Router>
      </div>
      <footer className='footer'>
        &copy; 2024 Wells Fargo. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
