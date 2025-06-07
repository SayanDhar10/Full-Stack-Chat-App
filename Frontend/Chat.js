import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';



function Chat({ username }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    
      .then(res => setMessages(res.data));

    socket.on('receiveMessage', msg => {
      setMessages(prev => [...prev, msg]);
    });

    return () => socket.off('receiveMessage');
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('sendMessage', { username, text: message });
      setMessage('');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Welcome, {username}</h2>
      <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc' }}>
        {messages.map((msg, i) => (
          <p key={i}><strong>{msg.username}:</strong> {msg.text}</p>
        ))}
      </div>
      <input value={message} onChange={e => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;
