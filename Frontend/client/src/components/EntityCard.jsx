import React from "react";
import { Link } from "react-router-dom";
import "./EntityCard.css"; 

const EntityCard = ({ moment , handleDelete }) => {
  return (
    <div className="entity-card">
      console.log("Moment Data: " , moment);
      <img
        src="https://via.placeholder.com/150" 
        alt={`${moment.title} image`}
        className="entity-image"
      />
      <div className="entity-details">
        <h3 className="entity-title">{moment.title}</h3>
        <p className="entity-description">{moment.description}</p>
        <Link to={`/update/${moment._id}`}>
          <button className="edit-button">Edit</button>
        </Link>
        <button
          className="delete-button"
          onClick={() => handleDelete(moment._id)}
        >
          Delete
        </button>
        console.log("Props in EntityCard: ", {(moment, handleDelete)});
      </div>
    </div>
  );
};

export default EntityCard;
