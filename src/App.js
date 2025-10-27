import React, { useState, useRef } from 'react';
import './App.css';

function App() {
  const [price, setPrice] = useState('');
  const canvasRef = useRef(null);

  const generateImage = () => {
    if (!price) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = '/bhav-btp.jpeg'; // in public folder

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Draw date
      const today = new Date();
      const dateStr = today.toLocaleDateString('en-GB'); // dd/mm/yyyy
      ctx.font = 'bold 70px Arial';
      ctx.fillStyle = 'black';
      ctx.fillText(dateStr, 462, 655);

      // Draw price
      ctx.font = '120px Arial';
      ctx.fillText(price + '/-', 490, 970);
    };
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'updated_image.png';
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <div className="app-container">
      <h1>Mandi Rate Image Generator</h1>
      <p className="subtitle">Enter the rate to generate a new image.</p>
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter the rate"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button className="generate-btn" onClick={generateImage}>Generate Image</button>
      </div>
      <canvas ref={canvasRef}></canvas>
      {price && <p className="preview-title">Preview of the updated image</p>}
      <button className="download-btn" onClick={downloadImage}>Download Updated Image</button>
    </div>
  );
}

export default App;
