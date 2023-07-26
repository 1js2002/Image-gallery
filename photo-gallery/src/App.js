import React from 'react';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Home from './Home';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {

  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (

    <Router>
    <div className="App">
      <Routes>
        <Route
          exact
          path="/"
          element={ isLoggedIn == "true" ? <Home /> : <Login />}
        />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
      {/* <ImageUpload/> */}
    </div>
  </Router>
  );
}
export default App;
