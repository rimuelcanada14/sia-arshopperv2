import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';
import './Barcodescan.css'; // Import the CSS file for additional styling if needed
import Header from '../components/header';
import Footer from '../components/footer';
import Border from './border.png';

const BarcodeScanner = () => {
  const [scannedCode, setScannedCode] = useState(null);
  const [message, setMessage] = useState('');
  const scannerRef = useRef(null);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    if (scannerRef.current) {
      codeReader.decodeFromVideoDevice(null, scannerRef.current, (result, err) => {
        if (result) {
          const code = result.getText();
          setScannedCode(code);
          if (code === '051111407592') {
            setMessage('Johnsons Baby Powder');
          }
          else if (code === '4800131591004') {
            setMessage('Alcohol')
          }
          else {
            setMessage('scan again');
          }
          
        }
      });
    }

    return () => {
    };
  }, [scannerRef]);

  return (
    <>
      <div>
        <Header header="ARShopper" headerright="ICHI MART" headersub="©" />
      </div>

      <div className="scanner-page">
        <div className="scanner-container">
          <div className="scanner-border">
            <img src={Border} alt="Scanner Border" className="border-image" />
            <video ref={scannerRef} className="scanner-video" width="100%" height="100%" />
            <div className="horizontal-line"></div>
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

      <div>
        <Footer />
      </div>
    </>
  );
};

export default BarcodeScanner;
