import React, { useEffect, useState } from "react";
import axios from "axios";

const UserMomentsPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [moments, setMoments] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:7856/api/auth/users", {
          withCredentials: true,
        });
        setUsers(res.data.users || []);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  const fetchUserMoments = async (userId) => {
    try {
      const res = await axios.get(
        `http://localhost:7856/api/moments/user/${userId}`,
        { withCredentials: true }
      );
      setMoments(res.data.moments || []);
    } catch (err) {
      console.error("Error fetching moments:", err);
    }
  };

  const handleUserChange = (e) => {
    const userId = e.target.value;
    setSelectedUser(userId);
    if (userId) fetchUserMoments(userId);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Select a User to View Their Moments</h2>
      <select onChange={handleUserChange} value={selectedUser}>
        <option value="">-- Select User --</option>
        {users.map((u) => (
          <option key={u._id} value={u._id}>
            {u.username}
          </option>
        ))}
      </select>

      <h3>Moments by Selected User</h3>
      {moments.length === 0 ? (
        <p>No moments to display.</p>
      ) : (
        <ul>
          {moments.map((moment) => (
            <li key={moment._id}>
              <strong>{moment.title}</strong> - {moment.description}
              <br />
              <small>Location: {moment.location}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserMomentsPage;
