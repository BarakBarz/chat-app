import styles from './Chat.module.css';
import RoomAndUsers from './Room-And-Users';
import MessagesReceived from './Messages';
import SendMessage from './Send-Message';
import { useEffect } from 'react';

const Chat = ({ socket, username, room }) => {
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className={styles.chatContainer}>
      <RoomAndUsers socket={socket} username={username} room={room} />
      <div>
        <MessagesReceived socket={socket} />
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
