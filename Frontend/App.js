import React, { useState } from 'react';
import Chat from './Chat';

function App() {
  const [username, setUsername] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    if (username.trim()) {
      setLoggedIn(true);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      {loggedIn ? (
        <Chat username={username} />
      ) : (
        <>
          <h2>Enter your username</h2>
          <input onChange={(e) => setUsername(e.target.value)} />
          <button onClick={handleLogin}>Enter Chat</button>
        </>
      )}
    </div>
  );
}

export default App;
