import React, { useState } from "react";
import axios from "axios";

const AddEntity = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    submittedBy: "",

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      await axios.post("http://localhost:7856/api/moments", formData, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Entity added successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="submittedBy"
        placeholder="Enter your name"
        value={formData.submittedBy}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Entity</button>
    </form>
  );
};

export default AddEntity;
