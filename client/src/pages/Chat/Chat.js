import styles from './Chat.module.css';
import RoomAndUsers from './Room-And-Users';
import MessagesReceived from './Messages';
import SendMessage from './Send-Message';
import { useEffect, useState } from 'react';

const Chat = ({ socket, username, room }) => {
  const [usersTyping, setUsersTyping] = useState([]);

  const removeUsername = (username) => {
    const updatedArray = usersTyping.filter((user) => user !== username);
    setUsersTyping(updatedArray);
  };

  const addUsername = (username) => {
    if (usersTyping.some((user) => user === username)) return;

    setUsersTyping([...usersTyping, username]);
  };

  useEffect(() => {
    socket.on('typing', ({ username }) => {
      addUsername(username);
    });

    socket.on('stop_typing', ({ username }) => {
      removeUsername(username);
    });

    return () => {
      socket.off('typing');
      socket.off('stop_typing');
    };
  }, [socket, addUsername, removeUsername]);

  const isPlurals = usersTyping.length > 1;

  return (
    <div className={styles.chatContainer}>
      <RoomAndUsers socket={socket} username={username} room={room} />
      <div>
        <MessagesReceived socket={socket} />
        {usersTyping.length !== 0 && (
          <div className={styles.typing}>
            {isPlurals
              ? usersTyping.slice(0, usersTyping.length - 1).join(', ') +
                ' and ' +
                usersTyping.slice(-1)
              : usersTyping}{' '}
            {isPlurals ? 'are' : 'is'} typing...{' '}
          </div>
        )}
        <SendMessage
          socket={socket}
          username={username}
          room={room}
        ></SendMessage>
      </div>
    </div>
  );
};

export default Chat;
