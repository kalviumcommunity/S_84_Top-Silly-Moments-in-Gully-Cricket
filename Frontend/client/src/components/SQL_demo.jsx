import { useEffect, useState } from "react";
import axios from "axios";

const SQlRoute = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [moments, setMoments] = useState([]);

  // Fetch all users on mount
  useEffect(() => {
    axios
      .get("https://top-silly-moments-in-chess.onrender.com/sql/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const handleSelectUser = (e) => {
    const userId = e.target.value;
    setSelectedUser(userId);

    if (userId) {
      axios
        .get(
          `https://top-silly-moments-in-chess.onrender.com/sql/users/${userId}`
        )
        .then((res) => setMoments(res.data))
        .catch((err) => console.error("Error fetching moments:", err));
    } else {
      setMoments([]);
    }
  };

  return (
    <div>
      <h2>Select a user to view their SQL-created chess moments</h2>

      <select value={selectedUser} onChange={handleSelectUser}>
        <option value="">-- Select a User --</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>

      <div style={{ marginTop: "1rem" }}>
        {moments.length > 0
          ? moments.map((moment) => (
              <div
                key={moment.id}
                style={{
                  border: "1px solid #ccc",
                  padding: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <h3>{moment.title}</h3>
                <p>
                  <strong>Description:</strong> {moment.description}
                </p>
                <p>
                  <strong>Location:</strong> {moment.location}
                </p>
                {moment.image_url && (
                  <img
                    src={moment.image_url}
                    alt={moment.title}
                    style={{
                      maxWidth: "300px",
                      display: "block",
                      marginTop: "0.5rem",
                    }}
                  />
                )}
                {moment.video_url && (
                  <video controls width="300" style={{ marginTop: "0.5rem" }}>
                    <source src={moment.video_url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            ))
          : selectedUser && <p>No moments found for this user.</p>}
      </div>
    </div>
  );
};

export default SQlRoute;
