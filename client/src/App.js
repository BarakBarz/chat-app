import './App.css';
import { useState } from 'react';
import Home from './pages/Home/Home';
import Chat from './pages/Chat/Chat';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';

const productionSocket = 'https://bb-chat-app.herokuapp.com/';
const developmentSocket = 'http://localhost:3000';

const production = process.env.PRODUCTION;

const socket = io.connect(production ? productionSocket : developmentSocket);

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');

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
          />
          <Route
            path='/chat'
            element={
              <Chat socket={socket} room={room} username={username}></Chat>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

