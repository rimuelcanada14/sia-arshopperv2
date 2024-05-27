
import "./Barcodescan.css"
import React, { useEffect, useRef } from 'react';
import Quagga from 'quagga';
import Footer from '../components/footer';

const BarcodeScanner = ({ onDetected }) => {
  const scannerRef = useRef(null);

  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: scannerRef.current,
          constraints: {
            width: 410,
            height: 320,
            facingMode: 'environment', // or user for front camera
          },
        },
        decoder: {
          readers: ['code_128_reader'], // specify the barcode types you need
        },
      },
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        Quagga.start();
      }
    );

    Quagga.onDetected(handleDetected);

    return () => {
      Quagga.offDetected(handleDetected);
      Quagga.stop();
    };
  }, []);

  const handleDetected = (result) => {
    onDetected(result.codeResult.code);
  };

  return <div ref={scannerRef} style={{ width: '100%' }} />;
};

<Footer />
        

export default BarcodeScanner;

