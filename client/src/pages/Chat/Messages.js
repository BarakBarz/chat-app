import styles from './Chat.module.css';
import { useRef, useState, useEffect } from 'react';

const Messages = ({ socket }) => {
  const [messagesReceived, setMessagesReceived] = useState([]);

  const messagesColumnRef = useRef(null);

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
      ]),
    );

    // Remove evt listner on component unmount
    return () => socket.off('receive_message');
  }, [socket, messagesReceived]);

  useEffect(() => {
    // Last hundred messages that saved on DB in relation to relevant room (fetched in backend)
    socket.on('last_hundred_messages', (lastHundredMessages) => {
      console.log('Last 100 messages', JSON.parse(lastHundredMessages));
      lastHundredMessages = JSON.parse(lastHundredMessages);
      // Sort messages by __createdtime__
      lastHundredMessages = sortMessagesByDate(lastHundredMessages);
      setMessagesReceived((state) => [...lastHundredMessages, ...state]);
    });

    return () => socket.off('last_hundred_messages');
  }, [socket]);

  //scroll to most recent message
  useEffect(() => {
    messagesColumnRef.current.scrollTop =
      messagesColumnRef.current.scrollHeight;
  }, [messagesReceived]);

  function sortMessagesByDate(messages) {
    return messages.sort(
      (a, b) => parseInt(a.__createdtime__) - parseInt(b.__createdtime__),
    );
  }

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  return (
    <div className={styles.messagesColumn} ref={messagesColumnRef}>
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
