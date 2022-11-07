import styles from './styles.module.css';
import MessagesReceived from './Messages';
import SendMessage from './Send-Message';

const Chat = ({ socket, username, room }) => {
  return (
    <div className={styles.chatContainer}>
      <div>
        <MessagesReceived socket={socket} />
        <SendMessage
          socket={socket}
          username={username}
          room={room}></SendMessage>
      </div>
    </div>
  );
};

export default Chat;
