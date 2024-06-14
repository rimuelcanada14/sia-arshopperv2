import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';
import './Barcodescan.css';
import Header from '../components/header';
import Footer from '../components/footer';
import Border from './border.png';
// import CokeGif from './coke.gif';
// import Zesto from './zesto.png';
import 'aframe';
import axios from 'axios';

const BarcodeScanner = () => {
  const [scannedCode, setScannedCode] = useState(null);
  const [message, setMessage] = useState('');
  const [product, setProduct] = useState(null);
  const scannerRef = useRef(null);
  const arSceneRef = useRef(null); 

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    let isScanned = false;

    const scanBarcode = async () => {
      if (!isScanned && scannerRef.current) {
        codeReader.decodeFromVideoDevice(null, scannerRef.current, async (result, err) => {
          if (result) {
            isScanned = true; // Set the flag to true to prevent multiple scans
            const code = result.getText();
            setScannedCode(code);
            try {
              const response = await axios.get(`https://192.168.1.13:8000/api/products/${code}/`); //ibahin nyo yung ip address dito para magamit nyo scanner
              if(response.status === 200){
                const data = response.data;
                setProduct(data);
                setMessage(data.name);
                // displayAR(data);
              } else {
                setProduct(null);
                setMessage('Product not found!');
              } 
              } catch(error){
                console.error('Error fetching product:', error);
                setMessage(`Error fetching product:` + error.message);
              } 
            }
            // else if (err) {
            //   console.error('Barcode scanning error', err);
            //   setMessage('Error Scanning barcode');
            // }
            // if (code === '051111407592') {
            //   setMessage('Johnsons Baby Powder');
            //   displayAR('red', 'box', code); 
            // } else if (code === '9780201379624') {
            //   setMessage('Book');
            //   displayAR('blue', 'sphere', code); 
            // } else {
            //   setMessage('Scan again');
            // }
        });
      }
    };
    scanBarcode();
    return () => {
      codeReader.reset();
    };
  }, [scannerRef]);

  // Function to display AR content
  // const displayAR = (color, shape, code) => {
  //   // Clear previous AR content if any
  //   arSceneRef.current.innerHTML = '';

  //   const arScene = document.createElement('a-scene');
  //   let arElement;

  //   if (code === '051111407592') {
      
  //     arElement = document.createElement('a-image');
  //     arElement.setAttribute('src', CokeGif);
  //     arElement.setAttribute('position', '0 1.6 -3');
  //     arElement.setAttribute('height', '2');
  //     arElement.setAttribute('width', '2');
  //   } else if (code === '9780201379624') {
      
  //     arElement = document.createElement('a-image');
  //     arElement.setAttribute('src', Zesto);
  //     arElement.setAttribute('position', '0 1.6 -3');
  //     arElement.setAttribute('height', '2');
  //     arElement.setAttribute('width', '2');
  //   } else {
      
  //     switch (shape) {
  //       case 'box':
  //         arElement = document.createElement('a-box');
  //         break;
  //       case 'sphere':
  //         arElement = document.createElement('a-sphere');
  //         break;
  //       case 'cylinder':
  //         arElement = document.createElement('a-cylinder');
  //         break;
  //       case 'cone':
  //         arElement = document.createElement('a-cone');
  //         break;
  //       default:
  //         arElement = document.createElement('a-box');
  //     }

  //     arElement.setAttribute('position', '0 0 -5');
  //     arElement.setAttribute('color', color);
  //   }

  //   arScene.appendChild(arElement);
    
  //   // Append AR scene to the container
  //   arSceneRef.current.appendChild(arScene);
  // };

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
          {product && (
            <div>
              <p>Product Name: {product.name}</p>
              <p>Product Price: {product.price}</p>
            </div>
          )}
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
