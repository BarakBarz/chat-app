import styles from './Chat.module.css';
import RoomAndUsers from './Room-And-Users';
import MessagesReceived from './Messages';
import SendMessage from './Send-Message';
import { useEffect } from 'react';

const Chat = ({ socket, username, room }) => {
  const [userTyping, setUserTyping] = useState('');

  useEffect(() => {
    socket.on('user_typing', ({ username }) => {
      setUserTyping(username);
    });
    return () => {
      socket.off('user_typing');
    };
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
        {userTyping && (
          <div className={styles.typing}>{userTyping} is typing...</div>
        )}
      </div>
    </div>
  );
};

export default Chat;
