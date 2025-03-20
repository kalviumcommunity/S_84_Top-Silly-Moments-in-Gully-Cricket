import React from "react";
import axios from "axios";
import "./App.css";
import EntityComponent from "./components/EntityCard";
const App = () => {
  const [moments, setMoments] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://s-84-top-silly-moments-in-gully-cricket-qh7y.onrender.com/api/moments"
      )
      .then((response) => setMoments(response.data))
      .catch((err) => console.error("Error Fetching moments: ", err));
  });
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
          {moments.map((moment) => (
            <EntityComponent
              key={moment.id}
              title={moment.title}
              description={moment.description}
            />
          ))}
        </div>
        {/* container of cards [card] */}
      </section>

      <h2>Contact: karan.devgan@example.com</h2>
    </div>
  );
};

export default App;
