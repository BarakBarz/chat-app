import { useState, useEffect } from 'react';

function useAudioRecorder() {
  // Set initial state for the audio recorder
  const [recording, setRecording] = useState(false);
  const [audioStream, setAudioStream] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);

  // Request permission to access the user's microphone when the component mounts
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        setAudioStream(stream);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Start recording the audio stream
  const startRecording = () => {
    setRecording(true);
    setAudioChunks([]);
    audioStream && audioStream.getTracks().forEach((track) => track.start());
  };

  // Stop recording the audio stream
  const stopRecording = () => {
    setRecording(false);
    audioStream && audioStream.getTracks().forEach((track) => track.stop());
  };

  // Use MediaRecorder API to record audio and store it in an array of audio chunks
  useEffect(() => {
    if (recording && audioStream) {
      const mediaRecorder = new MediaRecorder(audioStream);
      mediaRecorder.start();

      // Store each data chunk in the audioChunks state
      mediaRecorder.addEventListener('dataavailable', (event) => {
        setAudioChunks((audioChunks) => [...audioChunks, event.data]);
      });

      // When recording stops, create a URL for the recorded audio data
      mediaRecorder.addEventListener('stop', () => {
        const audioBlob = new Blob(audioChunks);
        const audioUrl = URL.createObjectURL(audioBlob);
        console.log(audioUrl);
      });
    }
  }, [recording, audioStream, audioChunks]);

  // Return the startRecording, stopRecording, and recording variables as an array
  return [startRecording, stopRecording, recording];
}

export default useAudioRecorder;
