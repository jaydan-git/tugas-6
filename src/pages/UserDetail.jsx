import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAppStore from '../store/';
import reactSvg from '../assets/react.svg';

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const users = useAppStore((state) => state.users);
  const user = users.find(u => u.id === parseInt(id));

  if (!user) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h2>User not found</h2>
        <button onClick={() => navigate('/users')} style={{ marginTop: '10px' }}>
          Back to Users
        </button>
      </div>
    );
  }

  // Add default values for missing fields
  const userData = {
    ...user,
    photo: user.photo || reactSvg,
    hobbies: user.hobbies || ["Reading", "Traveling", "Cooking", "Gaming"],
    address: user.address || "Not specified",
    birthdate: user.birthdate || "Not specified",
    currentColleague: user.currentColleague || "Not specified"
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <img src={userData.photo} alt={`${userData.name}'s profile`} style={styles.photo} />
        <div>
          <h1 style={styles.name}>{userData.name}</h1>
          <p style={styles.email}>{userData.email}</p>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.title}>Personal Info</h2>
        <p><strong>Address:</strong> {userData.address}</p>
        <p><strong>Birthdate:</strong> {userData.birthdate}</p>
        <p><strong>Current Colleague:</strong> {userData.currentColleague}</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.title}>Hobbies</h2>
        <ul style={styles.hobbyList}>
          {userData.hobbies.map((hobby, index) => (
            <li key={index} style={styles.hobbyItem}>• {hobby}</li>
          ))}
        </ul>
      </div>

      <div style={styles.actions}>
        <button 
          onClick={() => navigate('/users')}
          style={{ ...styles.button, backgroundColor: '#666' }}
        >
          Back to Users
        </button>
        <button 
          onClick={() => navigate(`/user/${id}/edit`)}
          style={{ ...styles.button, backgroundColor: '#82c91e' }}
        >
          Edit User
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    maxWidth: "700px",
    margin: "40px auto",
    padding: "30px",
    borderRadius: "10px",
    backgroundColor: "#1e1e1e",
    color: "#e0e0e0",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  },
  header: {
    display: "flex",
    gap: "20px",
    marginBottom: "30px",
    alignItems: "center",
  },
  photo: {
    width: "120px",
    height: "120px",
    objectFit: "cover",
    borderRadius: "10px",
    border: "2px solid #333",
  },
  name: {
    fontSize: "1.8em",
    margin: "0 0 10px 0",
  },
  email: {
    fontSize: "1em",
    color: "#999",
  },
  section: {
    marginBottom: "20px",
  },
  title: {
    fontSize: "1.2em",
    marginBottom: "10px",
    color: "#fff",
    borderBottom: "1px solid #333",
    paddingBottom: "5px",
  },
  hobbyList: {
    listStyle: "none",
    paddingLeft: 0,
  },
  hobbyItem: {
    marginBottom: "6px",
  },
  actions: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    marginTop: "20px",
  },
  button: {
    padding: "8px 16px",
    borderRadius: "4px",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    fontSize: "14px",
  }
};

export default UserDetail;
