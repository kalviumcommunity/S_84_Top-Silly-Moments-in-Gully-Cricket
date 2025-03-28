import React from "react";
import "./EntityCard.css";

const EntityCard = ({ title, description }) => {
  return (
    <div className="entity-card">
      <h3 >{title}</h3>
      <p >{description}</p>
    </div>
  );
};

export default EntityCard;