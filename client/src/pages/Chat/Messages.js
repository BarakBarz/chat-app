import styles from './styles.module.css';
import { useState, useEffect } from 'react';

import React from 'react';

const Messages = ({ socket }) => {
  const [messagesReceived, setMessagesReceived] = useState([]);

  // Socket received? -> render the data on page
  useEffect(() => {
    socket.on('receive_message', (data) =>
      setMessagesReceived((state) => [
        ...state,
        {
          message: data.message,
          username: data.username,
          __createdtime__: data.__createdtime__,
        },
      ])
    );

    console.log(messagesReceived);

    // Remove evt listner on component unmount
    return () => socket.off('receive_message');
  }, [socket, messagesReceived]);

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString;
  }

  return (
    <div className={styles.messagesColumn}>
      {messagesReceived.map((msg, i) => (
        <div className={styles.message} key={i}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className={styles.msgMeta}>{msg.username}</span>
            <span className={styles.msgMeta}>
              {formatDate(msg.__createdtime__)}
            </span>
          </div>
          <p className={styles.msgText}>{msg.message}</p>
        </div>
      ))}
    </div>
  );
};

export default Messages;
