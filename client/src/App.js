import './App.css';
import { useState } from 'react';
import Home from './components/Home/Home';
import Chat from './components/Chat/Chat';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';
import AudioRecorder from './components/AudioRecorder/AudioRecorder';

const socket = io.connect();

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('javascript');

  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route
            path='/'
            element={
              <Home
                username={username}
                setUsername={setUsername}
                room={room}
                setRoom={setRoom}
                socket={socket}
              />
            }
          ></Route>
          <Route
            path='chat'
            element={
              <Chat socket={socket} room={room} username={username}></Chat>
            }
          />
          <Route path='recorder' element={<AudioRecorder />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

