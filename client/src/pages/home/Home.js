import React from 'react';
import styles from './styles.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>{`<>DevRooms</>`}</h1>
        <input
          type='username'
          placeholder='Username...'
          className={styles.input}
        />
        {/* TODO: fix input bigger than select!??*/}
        <select name='rooms' id='select-room' className={styles.input}>
          <option>--Select Room--</option>
          <option value='javascript'>Javascript</option>
          <option value='node'>Node</option>
          <option value='express'>Express</option>
          <option value='react'>React</option>
        </select>

        <button className='btn btn-secondary' style={{ width: '100%' }}>
          Join Room
        </button>
      </div>
    </div>
  );
};

export default Home;
