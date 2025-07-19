import React, { useState, useRef } from "react";
import "./App.css";

function App() {
  const [videoFile, setVideoFile] = useState(null);
  const [videoURL, setVideoURL] = useState("");
  const [transcription, setTranscription] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();

  // Mock API call for demo
  const mockTranscribe = (file) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          "This is a mock transcription of your handwriting video. Replace this with your real API call when ready!"
        );
      }, 3500);
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideoURL(URL.createObjectURL(file));
      setTranscription("");
      setLoading(true);
      // Replace mockTranscribe with your real API call later
      const result = await mockTranscribe(file);
      setTranscription(result);
      setLoading(false);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="container">
      <h1>Handwriting Transcription Demo</h1>
      <div className="upload-section">
        <button onClick={handleUploadClick}>Upload Video</button>
        <input
          type="file"
          accept="video/*"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>
      <div className="main-content">
        <div className="video-zone">
          {videoURL ? (
            <video src={videoURL} controls width="100%" />
          ) : (
            <div className="placeholder">Video will appear here</div>
          )}
        </div>
        <div className="transcription-zone">
          {loading ? (
            <div className="loading">Analyzing handwriting...</div>
          ) : transcription ? (
            <div className="transcription">{transcription}</div>
          ) : (
            <div className="placeholder">Transcription will appear here</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;