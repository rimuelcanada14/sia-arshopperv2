import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';
import './Barcodescan.css'; // Import the CSS file for additional styling if needed
import Header from '../components/header';
import Footer from '../components/footer';
import Border from './border.png';
import 'aframe';

const BarcodeScanner = () => {
  const [scannedCode, setScannedCode] = useState(null);
  const [message, setMessage] = useState('');
  const scannerRef = useRef(null);
  const arSceneRef = useRef(null); // Reference to AR scene container

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    let isScanned = false; // Flag to track if barcode is scanned

    const scanBarcode = () => {
      if (!isScanned && scannerRef.current) {
        codeReader.decodeFromVideoDevice(null, scannerRef.current, (result, err) => {
          if (result) {
            isScanned = true; // Set the flag to true to prevent multiple scans
            const code = result.getText();
            setScannedCode(code);
            if (code === '051111407592') {
              setMessage('Johnsons Baby Powder');
              displayAR('red'); // Call function to display AR content with red box
            } else if (code === '9780201379624') {
              setMessage('Book');
              displayAR('blue'); // Call function to display AR content with blue box
            } else {
              setMessage('Scan again');
            }
          }
        });
      }
    };

    scanBarcode();

    return () => {
      // Clean up code if needed
    };
  }, [scannerRef]);

  // Function to display AR content
  const displayAR = (color) => {
    // Clear previous AR content if any
    arSceneRef.current.innerHTML = '';

    // Create a simple AR scene with a box of specified color
    const arScene = document.createElement('a-scene');
    const arBox = document.createElement('a-box');
    arBox.setAttribute('position', '0 0 -5');
    arBox.setAttribute('color', color);
    arScene.appendChild(arBox);
    
    // Append AR scene to the container
    arSceneRef.current.appendChild(arScene);
  };

  // Function to reset the scanner
  const resetScanner = () => {
    setScannedCode(null);
    setMessage('');
    arSceneRef.current.innerHTML = ''; // Clear AR scene
  };

  return (
    <>
      <div>
        <Header header="ARShopper" headerright="ICHI MART" headersub="©" />
      </div>

      <div className="scanner-page">
        <div className="scanner-container">
          <div className="scanner-border">
            <img src={Border} alt="Scanner Border" className="border-image" />
            <video ref={scannerRef} className="scanner-video" />
            <div className="horizontal-line"></div>
            {/* AR Scene Container positioned within scanner-container */}
            <div className="ar-scene-container" ref={arSceneRef}></div>
          </div>
        </div>
      </div>

      <div className='title-container'>
        <div>
          <h3 className='scanner-title'>Scanned Barcode Details</h3>
          <p className='scanned-code'>{scannedCode}</p>
          <p className='message'>{message}</p> {/* Display the message */}
        </div>
      </div>

      {/* Button to scan again */}
      {scannedCode && (
        <div className="button-container">
          <button onClick={resetScanner} className="scan-again-button">Scan Again</button>
        </div>
      )}

      <div>
        <Footer />
      </div>
    </>
  );
};

export default BarcodeScanner;
