import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';
import './Barcodescan.css';
import Header from '../components/header';
import Footer from '../components/footer';
import Border from './border.png';
import CokeGif from './coke.gif';
import Zesto from './zesto.png';
import 'aframe';

const BarcodeScanner = () => {
  const [scannedCode, setScannedCode] = useState(null);
  const [message, setMessage] = useState('');
  const scannerRef = useRef(null);
  const arSceneRef = useRef(null); 

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    let isScanned = false;

    const scanBarcode = () => {
      if (!isScanned && scannerRef.current) {
        codeReader.decodeFromVideoDevice(null, scannerRef.current, (result, err) => {
          if (result) {
            isScanned = true; // Set the flag to true to prevent multiple scans
            const code = result.getText();
            setScannedCode(code);
            if (code === '051111407592') {
              setMessage('Johnsons Baby Powder');
              displayAR('red', 'box', code); 
            } else if (code === '9780201379624') {
              setMessage('Book');
              displayAR('blue', 'sphere', code); 
            } else {
              setMessage('Scan again');
            }
          }
        });
      }
    };
    scanBarcode();
    return () => {

    };
  }, [scannerRef]);

  // Function to display AR content
  const displayAR = (color, shape, code) => {
    // Clear previous AR content if any
    arSceneRef.current.innerHTML = '';

    const arScene = document.createElement('a-scene');
    let arElement;

    if (code === '051111407592') {
      
      arElement = document.createElement('a-image');
      arElement.setAttribute('src', CokeGif);
      arElement.setAttribute('position', '0 1.6 -3');
      arElement.setAttribute('height', '2');
      arElement.setAttribute('width', '2');
    } else if (code === '9780201379624') {
      
      arElement = document.createElement('a-image');
      arElement.setAttribute('src', Zesto);
      arElement.setAttribute('position', '0 1.6 -3');
      arElement.setAttribute('height', '2');
      arElement.setAttribute('width', '2');
    } else {
      
      switch (shape) {
        case 'box':
          arElement = document.createElement('a-box');
          break;
        case 'sphere':
          arElement = document.createElement('a-sphere');
          break;
        case 'cylinder':
          arElement = document.createElement('a-cylinder');
          break;
        case 'cone':
          arElement = document.createElement('a-cone');
          break;
        default:
          arElement = document.createElement('a-box');
      }

      arElement.setAttribute('position', '0 0 -5');
      arElement.setAttribute('color', color);
    }

    arScene.appendChild(arElement);
    
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
          <p className='message'>{message}</p>
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
