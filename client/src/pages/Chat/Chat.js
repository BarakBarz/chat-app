import styles from './Chat.module.css';
import RoomAndUsers from './Room-And-Users';
import MessagesReceived from './Messages';
import SendMessage from './Send-Message';
import { useNavigate } from 'react-router-dom';

import { useReducer, useEffect } from 'react';

// Reducer for handling users typing state
const typingReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_USERNAME':
      // Check if username is already in the state
      if (state.some((user) => user === action.username)) return state;

      // Add username to state
      return [...state, action.username];
    case 'REMOVE_USERNAME':
      // Remove username from state
      return state.filter((user) => user !== action.username);
    default:
      return state;
  }
};

const Chat = ({ socket, username, room }) => {
  const navigate = useNavigate();

  // State and dispatch function for users typing
  const [usersTyping, dispatchTyping] = useReducer(typingReducer, []);

  // navigate if not connected to socket.
  useEffect(() => {
    if (!socket.connected) {
      navigate('/', { replace: true });
    }
  });

  useEffect(() => {
    // Add socket event listeners for typing and stop typing events
    socket.on('typing', ({ username }) => {
      dispatchTyping({ type: 'ADD_USERNAME', username });
    });

    socket.on('stop_typing', ({ username }) => {
      dispatchTyping({ type: 'REMOVE_USERNAME', username });
    });

    return () => {
      // Remove socket event listeners when component unmounts
      socket.off('typing');
      socket.off('stop_typing');
    };
  }, [socket, dispatchTyping]);

  // Check if there are plural users typing
  const isPlural = usersTyping.length > 1;

  const typingUsers =
    usersTyping.length === 0 ? null : (
      <div className={styles.typing}>
        {usersTyping.slice(0, usersTyping.length - 1).join(', ')}
        {isPlural ? ' and ' : ''}
        {usersTyping.slice(-1)}
        {isPlural ? ' are' : ' is'} typing...
      </div>
    );

  return (
    <div className={styles.chatContainer}>
      <RoomAndUsers socket={socket} username={username} room={room} />
      <div>
        <MessagesReceived socket={socket} />

        {typingUsers}
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
