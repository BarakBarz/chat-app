import styles from './Chat.module.css';
import { useState } from 'react';

import React from 'react';

const SendMessage = ({ socket, username, room }) => {
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (message !== '') {
      const __createdtime__ = Date.now();
      // Send message to server, and receive it from server to frontend
      socket.emit('send_message', { username, room, message, __createdtime__ });
      setMessage('');
    }
  };

  const handleEnterKeyUp = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className={styles.sendMessageContainer}>
      <input
        type='text'
        className={styles.messageInput}
        placeholder={'Enter message'}
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        onKeyUp={(e) => handleEnterKeyUp(e)}
      />
      <button
        type='submit'
        className='btn btn-primary btn-small'
        onClick={sendMessage}
      >
        Send Message
      </button>
    </div>
  );
};

export default SendMessage;
