import React, { useState, useEffect } from 'react';

// Fetch data from the backend API
function App() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const backendUrl = 'http://192.168.49.2:32584';
    async function fetchData() {
      try {
        const response = await fetch(`${backendUrl}/api/v1/users`)
        console.log('Backend URL:', backendUrl);
        //const response = await fetch('http://0.0.0.0:8000/api/v1/users/');
        if (!response.ok) {
          const errorMessage = await response.json();
          throw new Error(errorMessage.error);
        }
        const data = await response.json();
        setUsers(data);
        setError(null); // Clear error if data fetch is successful
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setError(error.message);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>User List</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.user}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
