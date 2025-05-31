// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import UpdateEntity from "./components/UpdateEntity"; // Create this component
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./App.css";
// import EntityCard from "./components/EntityCard";
// import AddEntity from "./components/AddEntity";

// import LoginPage from "./pages/LoginPage";
// import SignupPage from "./pages/SignupPage";
// const App = () => {
//   const [moments, setMoments] = useState([]);

//   useEffect(() => {
//     axios
//       .get(
//         "https://s-84-top-silly-moments-in-gully-cricket-qh7y.onrender.com/api/moments"
//       )
//       .then((response) => {
//         console.log("API Response Moments: ", response.data.moments);
//         setMoments(response.data.moments);
//       })
//       .catch((err) => console.error("Error Fetching moments:", err));
//   }, []);

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this moment?"))
//       axios
//         .delete(
//           `https://s-84-top-silly-moments-in-gully-cricket-qh7y.onrender.com/api/moments/${id}`
//         )
//         .then(() => {
//           setMoments((prevMoments) =>
//             prevMoments.filter((moment) => moment._id !== id)
//           );
//           console.log("Moment deleted successfully");
//         })
//         .catch((err) => console.error("Error deleting the moment: ", err));
//   };

//   return (
//     <Router>
//       <Routes>
//         {/* Home page with moments list */}
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/signup" element={<SignupPage />} />

//         <Route
//           path="/"
//           element={
//             <div>
//               <h1 style={{ color: "wheat" }}>
//                 Top Silly Moments in Gully Cricket
//               </h1>
//               <div id="cards">
//                 {moments.map((moment) => (
//                   <EntityCard
//                     key={moment._id}
//                     moment={moment}
//                     handleDelete={handleDelete}
//                   />
//                 ))}
//               </div>
//               <AddEntity />
//             </div>
//           }
//         />

//         {/* Update Entity page */}
//         <Route
//           path="/update/:id"
//           element={<UpdateEntity moments={moments} setMoments={setMoments} />}
//         />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UpdateEntity from "./components/UpdateEntity";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import EntityCard from "./components/EntityCard";
import AddEntity from "./components/AddEntity";
import LoginPage from "./pages/LoginPage"; // 👈 NEW
import SignupPage from "./pages/SignupPage"; // 👈 NEW

const App = () => {
  const [moments, setMoments] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://s-84-top-silly-moments-in-gully-cricket-qh7y.onrender.com/api/moments"
      )
      .then((response) => {
        console.log("API Response Moments: ", response.data.moments);
        setMoments(response.data.moments);
      })
      .catch((err) => console.error("Error Fetching moments:", err));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this moment?"))
      axios
        .delete(
          `https://s-84-top-silly-moments-in-gully-cricket-qh7y.onrender.com/api/moments/${id}`
        )
        .then(() => {
          setMoments((prevMoments) =>
            prevMoments.filter((moment) => moment._id !== id)
          );
          console.log("Moment deleted successfully");
        })
        .catch((err) => console.error("Error deleting the moment: ", err));
  };

  return (
    <Router>
      <Routes>
        {/* Home page with moments list */}
        <Route
          path="/"
          element={
            <div>
              <h1 style={{ color: "wheat" }}>
                Top Silly Moments in Gully Cricket
              </h1>

              {/* 🚀 Login/Signup Buttons */}
              <div style={{ marginBottom: "20px" }}>
                <Link to="/login">
                  <button>Login</button>
                </Link>
                <Link to="/signup" style={{ marginLeft: "10px" }}>
                  <button>Signup</button>
                </Link>
              </div>

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

        {/* Update Entity page */}
        <Route
          path="/update/:id"
          element={<UpdateEntity moments={moments} setMoments={setMoments} />}
        />

        {/* 🚀 Login and Signup pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
};

export default App;
