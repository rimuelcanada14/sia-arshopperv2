import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';
import './Barcodescan.css';
import Header from '../components/header';
import Footer from '../components/footer';
import Border from './border.png';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ModelBuilder from '../ARModels/ModelBuilder.js';
import { Link } from 'react-router-dom';
import Modal from '../profile/Modal'; // Import the Modal component
import axios from 'axios';

let isScanned = false;

const BarcodeScanner = () => {
  const [scannedCode, setScannedCode] = useState(null);
  const [message, setMessage] = useState('');
  const [showCokeCan, setShowCokeCan] = useState(false);
  const [showPineApple, setShowPineApple] = useState(false);
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const scannerRef = useRef(null);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    const scanBarcode = async () => {
      if (!isScanned && scannerRef.current) {
        codeReader.decodeFromVideoDevice(null, scannerRef.current, async (result, err) => {
          if (result) {
            isScanned = true; // Set the flag to true to prevent multiple scans
            const code = result.getText();
            setScannedCode(code);
            try {
              const response = await axios.get(`https://192.168.1.17:8000/api/products/${code}/`); //ibahin nyo yung ip address dito para magamit nyo scanner
              if(response.status === 200){
                const data = response.data;
                setProduct(data);
                setMessage(data.name);
                setShowCokeCan(data.barcode === '051111407592');
                setShowPineApple(data.barcode === '9780201379624');
              } else {
                setProduct(null);
                setMessage('Product not found!');
              } 
              } catch(error){
                console.error('Error fetching product:', error);
                setMessage(`Error fetching product:` + error.message);
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

  const resetScanner = () => {
    setScannedCode(null);
    setMessage('');
    setShowCokeCan(false);
    setShowPineApple(false);
    isScanned = false;
  };

  // Function to open the modal
  const openModal = () => {
    setShowModal(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Modal content
  const modalContent = product ?(
    <div>
      <h2 className='barcode-title'>Product<br/>Information</h2>
      <p>Product Name: <br/>{product.name}</p>
      <p>Price: <br/>₱{product.price}</p>
      <p>Ingredients: <br/>{product.ingredients}</p>
      <p>Nutritional Facts: <br/>{product.nutritional_facts}</p>
      <p>Barcode: <br/>{product.barcode}</p>
    </div>
  ):(
    <p>Loading...</p>
  );

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
            <div className="ar-scene-container">
              {scannedCode && (
                <Canvas style={{ height: '50vh', width: '100vw', position: 'absolute' }}>
                  <ambientLight intensity={1.5} />
                  <directionalLight position={[5, 5, 5]} />
                  {showCokeCan && (
                    <ModelBuilder path="/CokeCan.glb" position={[0, 0, -5]} />
                  )}
                  {showPineApple && (
                    <ModelBuilder path="/ZestoPineApple.glb" position={[0, 0, -8]} />
                  )}
                  <OrbitControls
                    enableZoom={true}
                    minDistance={5}
                    maxDistance={7}
                    enablePan={true}
                  />
                </Canvas>
              )}
            </div>
          </div>
        </div>
      </div>


      {scannedCode && (
        <div className="button-container">
          <button className="show-info" onClick={openModal}>
            Show Information
          </button>

          <Link to="/barcodescan" className="scan-again" onClick={resetScanner}>
            Scan Again
          </Link>
          
        </div>
      )}

      {/* Modal */}
        <Modal show={showModal} onClose={closeModal} >
          {modalContent}
        </Modal>
      

      <div>
        <Footer onResetScanner={resetScanner}/>
      </div>
    </>
  );
};

export default BarcodeScanner;
