import React from "react";

const EntityCard = ({ title, description }) => {
  return (
    <div className="entity-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

const DummyMoment = {
  title: "Epic Runout of Deepankar by Akshit",
  description:
    "Deepankar was running very slowly apprehending a easy single but a quick throw by Akshit hit him on head and he himself fell on the wicket which created a silly moment ",
  image:
    "https://www.shutterstock.com/shutterstock/photos/2455522249/display_1500/stock-photo-a-group-of-young-boys-playing-cricket-th-april-lucknow-india-2455522249.jpg",
  location: "Kalka , India",
};

const EntityComponent = () => {
  return (
    <div>
      <EntityCard moment={DummyMoment} />
    </div>
  );
};

export default { EntityComponent, EntityCard };
