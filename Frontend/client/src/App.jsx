import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import EntityCard from "./components/EntityCard";
import moment from "moment";

const App = () => {
  const [moments, setMoments] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://s-84-top-silly-moments-in-gully-cricket-qh7y.onrender.com/api/moments"
      )
      .then((response) => {
        console.log("Backend response: ", response.data.moments);
        setMoments(response.data.moments);
      })
      .catch((err) => console.error("Error Fetching moments: ", err));
  }, []);
  return (
    <div className="">
      <section id="home-section">
        {/* title */}
        {/* subtitle */}
        <h1 style = {{color: 'wheat'}}> Top Silly Moments in Gully Cricket</h1>
        <h2  style = {{color: "grey"}}className="sub-title">
          Welcome to the most hilarious and entertaining moments from the
          streets of Gully cricket!
        </h2>
      </section>

      <section id="moments-section">
        {/* heading (top silly moments) */}
        <h2 style = {{color: 'pink'}}>Watch, laugh and relive!</h2>
        <div id="cards">
          {moments &&
            moments.map((moment) => (
              <EntityCard
                key={moment.id}
                title={moment.title}
                description={moment.description}
              />
            ))}
        </div>
      </section>

      <h2 style = {{color: "wheat"}}>Contact: karan.devgan@example.com</h2>
    </div>
  );
};

export default App;
