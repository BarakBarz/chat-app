import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

const Home = ({ username, setUsername, room, setRoom, socket }) => {
  const navigate = useNavigate();

  const joinRoom = () => {
    if (room !== '' && username !== '') {
      socket.emit('join_room', { username, room });
      navigate('chat', { replace: true });
    }
  };

  return (
    <div className={styles.container}>
      <form
        onSubmit={(e) => e.preventDefault()}
        className={styles.formContainer}
      >
        <h1>{`Chat-App`}</h1>
        <input
          placeholder='Username...'
          type='text'
          className={styles.input}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <select
          className={styles.input}
          onChange={(e) => setRoom(e.target.value)}
        >
          <option value='javascript'>Javascript</option>
          <option value='node'>Node</option>
          <option value='express'>Express</option>
          <option value='react'>React</option>
        </select>

        <button
          className='btn btn-secondary'
          style={{ width: '100%' }}
          onClick={joinRoom}
        >
          Join Room
        </button>
      </form>
    </div>
  );
};

export default Home;
