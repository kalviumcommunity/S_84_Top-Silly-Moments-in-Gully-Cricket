import React from "react";
import "./App.css";
import EntityComponent from "./components/EntityCard";
const App = () => {
  return (
    <div className="">
      <section id="home-section">
        {/* title */}
        {/* subtitle */}
        <h1> Top Silly Moments in Gully Cricket</h1>
        <h2 className="sub-title">
          Welcome to the most hilarious and entertaining moments from the
          streets of Gully cricket!
        </h2>
      </section>

      <section id="moments-section">
        {/* heading (top silly moments) */}
        <h2>Watch, laugh and relive!</h2>
        <div id="cards">
          <EntityComponent />
        </div>
        {/* container of cards [card] */}
      </section>

      <h2>Contact: karan.devgan@example.com</h2>
    </div>
  );
};

export default App;
