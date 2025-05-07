import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAppStore from '../store/';

const UserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const users = useAppStore((state) => state.users);
  const setUsers = useAppStore((state) => state.setUsers);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    birthdate: '',
    currentColleague: '',
    hobbies: ''
  });

  useEffect(() => {
    const user = users.find(u => u.id === parseInt(id));
    if (user) {
      setFormData({
        ...user,
        hobbies: Array.isArray(user.hobbies) ? user.hobbies.join(', ') : ''
      });
    } else {
      navigate('/users');
    }
  }, [id, users, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create updated user object
    const updatedUser = {
      ...formData,
      id: parseInt(id),
      hobbies: formData.hobbies.split(',').map(hobby => hobby.trim())
    };

    // Update users list
    const updatedUsers = users.map(user => 
      user.id === parseInt(id) ? updatedUser : user
    );
    setUsers(updatedUsers);

    // Navigate back to users list
    navigate('/users');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Edit User</h2>
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Birthdate:</label>
          <input
            type="date"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Current Colleague:</label>
          <input
            type="text"
            name="currentColleague"
            value={formData.currentColleague}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Hobbies (comma-separated):</label>
          <input
            type="text"
            name="hobbies"
            value={formData.hobbies}
            onChange={handleChange}
            placeholder="e.g., Reading, Traveling, Cooking"
            style={styles.input}
          />
        </div>

        <div style={styles.buttonGroup}>
          <button type="submit" style={{ ...styles.button, backgroundColor: '#82c91e' }}>
            Save Changes
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/users')}
            style={{ ...styles.button, backgroundColor: '#666' }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '20px',
    backgroundColor: '#1e1e1e',
    borderRadius: '8px',
    color: '#e0e0e0',
  },
  title: {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#fff',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '14px',
    color: '#ccc',
  },
  input: {
    padding: '8px 12px',
    borderRadius: '4px',
    border: '1px solid #333',
    backgroundColor: '#2a2a2a',
    color: '#e0e0e0',
    fontSize: '14px',
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    marginTop: '20px',
  },
  button: {
    padding: '8px 16px',
    borderRadius: '4px',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default UserEdit;