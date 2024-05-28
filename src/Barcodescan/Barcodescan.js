import React, { useEffect, useRef, useState } from 'react';
import Quagga from 'quagga';
import './Barcodescan.css'; // Import the CSS file for additional styling if needed
import Header from '../components/header';
import Footer from '../components/footer';
import Border from './border.png';

const BarcodeScanner = () => {
  const [scannedCode, setScannedCode] = useState(null);
  const scannerRef = useRef(null);

  useEffect(() => {
    if (scannerRef.current) {
      Quagga.init(
        {
          inputStream: {
            type: 'LiveStream',
            target: scannerRef.current, // Or '#yourElement' (optional)
            constraints: {
              facingMode: 'environment', // or 'user' for front camera
              width: 340, // Adjust the width as needed
              height: 340, // Adjust the height as needed
            },
          },
          decoder: {
            readers: ['code_128_reader', 'ean_reader', 'ean_8_reader', 'code_39_reader', 'code_39_vin_reader', 'codabar_reader', 'upc_reader', 'upc_e_reader', 'i2of5_reader'],
          },
        },
        (err) => {
          if (err) {
            console.log(err);
            return;
          }
          Quagga.start();
        }
      );

      Quagga.onDetected((data) => {
        setScannedCode(data.codeResult.code);
        Quagga.stop();
      });

      return () => {
        Quagga.stop();
      };
    }
  }, [scannerRef]);

  return (
    <>
    <div>
      <Header header="ARShopper" headerright="ICHI MART" headersub="©" />
    </div>

    <div className="scanner-page">
      <div className="scanner-container">
        <div class = "scanner-border">
          <img src={Border} alt="Scanner Border" className="border-image" />
          <div ref={scannerRef} className="scanner-video" />
          <div className="horizontal-line"></div> 
        </div>
      </div>
    </div>

    <div className='title-container'>
      <div>
        <h3 className='scanner-title'>Scanned Barcode Details</h3>
        <p className='scanned-code'>{scannedCode}</p>
      </div>
    </div>

    <div>
      <Footer />
    </div>
    </>
    
  );
};

export default BarcodeScanner;
