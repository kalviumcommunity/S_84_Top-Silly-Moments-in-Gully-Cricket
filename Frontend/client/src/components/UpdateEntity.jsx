import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";


const UpdateEntity = ({ moments, setMoments }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [momentData, setMomentData] = useState({ title: "", description: "" });

  
  useEffect(() => {
    console.log("Moments in UpdateEntity:", moments);
    console.log("ID from URL:", id);
    const momentToEdit = moments.find((moment) => moment._id === parseInt(id));
    if (momentToEdit) setMomentData(momentToEdit);
  }, [id, moments]);

  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data being updated: " , momentData);
    axios
      .put(
        `https://s-84-top-silly-moments-in-gully-cricket-qh7y.onrender.com/api/moments/${id}`,
        momentData
      )
      .then((response) => {
        console.log("Updated Moment:", response.data);
        
        setMoments((prevMoments) =>
          prevMoments.map((moment) =>
            moment._id === parseInt(id) ? response.data : moment
          )
        );
        navigate("/");
        console.log("Navigating to Home after update..");
      })
      .catch((err) => console.error("Error updating moment:", err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Update Moment</h1>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={momentData.title}
          onChange={(e) =>
            setMomentData({ ...momentData, title: e.target.value })
          }
          required
        />
      </label>
      <br />
      <label>
        Description:
        <textarea
          name="description"
          value={momentData.description}
          onChange={(e) =>
            setMomentData({ ...momentData, description: e.target.value })
          }
          required
        />
      </label>
      <br />
      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateEntity;
