import { useState, useEffect } from 'react';

function useAudioRecorder() {
  const [recording, setRecording] = useState(false);
  const [audioStream, setAudioStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);

  useEffect(() => {
    // Request permission to access the user's microphone when the component
    //mounts
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        setAudioStream(stream);
        setMediaRecorder(new MediaRecorder(stream));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (mediaRecorder) {
      // When data is available, store it in an array of audio chunks
      mediaRecorder.addEventListener('dataavailable', (event) => {
        setAudioUrl(URL.createObjectURL(event.data));
      });
    }
  }, [mediaRecorder]);

  const startRecording = () => {
    if (mediaRecorder) {
      setRecording(true);
      mediaRecorder.start();
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      setRecording(false);
      mediaRecorder.stop();
    }
  };

  return [startRecording, stopRecording, recording, audioUrl];
}

export default useAudioRecorder;
