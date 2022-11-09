import styles from './Chat.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import React from 'react';

const RoomAndUsers = ({ socket, username, room }) => {
  const [roomUsers, setRoomUsers] = useState([]);

  const navigate = useNavigate();

  // Sets all users inside room
  useEffect(() => {
    socket.on('chatroom_users', (data) => {
      setRoomUsers(data);
    });

    return () => socket.off('chatroom_users');
  }, [socket]);

  const leaveRoom = () => {
    const __createdtime__ = Date.now();
    socket.emit('leave_room', { username, room, __createdtime__ });
    // Redirecting to home page
    navigate('/', { replace: false });
  };

  return (
    <div className={styles.roomAndUsersColumn}>
      <h2 className={styles.roomTitle}>{room}</h2>
      <div>
        {roomUsers.length > 0 && <h5 className={styles.usersTitle}>Users</h5>}
        <ul className={styles.usersList}>
          {roomUsers.map((user) => (
            <li
              style={{
                fontWeight: `${user.username === username ? 'bold' : 'normal'}`,
              }}
              key={user.id}
            >
              {user.username}
            </li>
          ))}
        </ul>
      </div>

      <button className='btn btn-outline' onClick={leaveRoom}>
        Leave
      </button>
    </div>
  );
};

export default RoomAndUsers;
