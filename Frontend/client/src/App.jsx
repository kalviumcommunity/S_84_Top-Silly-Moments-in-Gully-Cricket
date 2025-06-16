
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import "./App.css";

// Components
import EntityCard from "./components/EntityCard";
import AddEntity from "./components/AddEntity";
import UpdateEntity from "./components/UpdateEntity";

// Pages
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UserMomentsPage from "./pages/UserMomentsPage"; // 👈 Newly Added Page

const App = () => {
  const [moments, setMoments] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:7856/api/moments" , {
      withCredentials : true ,
    })
      .then((response) => {
        console.log("API Response Moments: ", response.data.moments);
        setMoments(response.data.moments);
      })
      .catch((err) => console.error("Error Fetching moments:", err));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this moment?")) {
      axios
        .delete(
          `https://s-84-top-silly-moments-in-gully-cricket-qh7y.onrender.com/api/moments/${id}`,
          { withCredentials: true }
        )
        .then(() => {
          setMoments((prevMoments) =>
            prevMoments.filter((moment) => moment._id !== id)
          );
          console.log("Moment deleted successfully");
        })
        .catch((err) => console.error("Error deleting the moment: ", err));
    }
  };

  return (
    <Router>
      <Routes>
        {/* 🏠 Home Page */}
        <Route
          path="/"
          element={
            <div>
              <h1 style={{ color: "wheat" }}>
                Top Silly Moments in Gully Cricket
              </h1>

              {/* 🔐 Auth Buttons */}
              <div style={{ marginBottom: "20px" }}>
                <Link to="/login">
                  <button>Login</button>
                </Link>
                <Link to="/signup" style={{ marginLeft: "10px" }}>
                  <button>Signup</button>
                </Link>
                <Link to="/user-moments" style={{ marginLeft: "10px" }}>
                  <button>View Moments by User</button>
                </Link>
              </div>

              {/* 🎞️ Moments List */}
              <div id="cards">
                {moments.map((moment) => (
                  <EntityCard
                    key={moment._id}
                    moment={moment}
                    handleDelete={handleDelete}
                  />
                ))}
              </div>

              <AddEntity />
            </div>
          }
        />

        {/* ✏️ Update Entity */}
        <Route
          path="/update/:id"
          element={<UpdateEntity moments={moments} setMoments={setMoments} />}
        />

        {/* 🔐 Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* 📋 User Moments Dropdown Page */}
        <Route path="/user-moments" element={<UserMomentsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
