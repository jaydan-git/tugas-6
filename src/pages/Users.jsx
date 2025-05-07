import { Link } from 'react-router-dom';
import { useState } from 'react';
import useAppStore from '../store/';

const Users = () => {
  // stores
  const version = useAppStore((state) => state.version);
  const users = useAppStore((state) => state.users);
  const setUsers = useAppStore((state) => state.setUsers);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // actions
  const deleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const updatedUsers = users.filter(user => user.id !== id);
      setUsers(updatedUsers);
    }
  }

  return (
    <div>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '8px 12px',
            borderRadius: '4px',
            border: '1px solid #333',
            backgroundColor: '#1e1e1e',
            color: '#e0e0e0',
            width: '300px'
          }}
        />
        <button 
          onClick={() => setSearchTerm('')}
          style={{
            backgroundColor: '#666',
            color: '#fff'
          }}
        >
          Clear
        </button>
      </div>

      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <Link to="/user/add">
          <button style={{ backgroundColor: '#82c91e', color: '#fff' }}>
            Add New User
          </button>
        </Link>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Link to={`/user/${user.id}`}>
                  <button className='btn-detail'>Detail</button>
                </Link>
                <Link to={`/user/${user.id}/edit`}>
                  <button className='btn-edit'>Edit</button>
                </Link>
                <button className='btn-delete' onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;