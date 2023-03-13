import React, { useState } from 'react';
import useAudioRecorder from '../hooks/useAudioRecorder';

function AudioRecorder() {
  const [startRecording, stopRecording, recording, audioUrl] =
    useAudioRecorder();
  const [audioFile, setAudioFile] = useState(null);

  const handleDownload = () => {
    if (audioUrl) {
      fetch(audioUrl)
        .then((response) => response.blob())
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          setAudioFile(url);
        });
    }
  };

  return (
    <div>
      <button onClick={startRecording} disabled={recording}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!recording}>
        Stop Recording
      </button>
      {recording && <p>Recording...</p>}
      {audioUrl && (
        <div>
          <p>Recorded Audio:</p>
          <audio src={audioUrl} controls />
          <button onClick={handleDownload}>Download Audio</button>
        </div>
      )}
      {audioFile && (
        <div>
          <p>Downloaded Audio:</p>
          <audio src={audioFile} controls />
        </div>
      )}
    </div>
  );
}

export default AudioRecorder;
