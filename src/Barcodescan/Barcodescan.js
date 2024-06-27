import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';
import './Barcodescan.css';
import Header from '../components/header';
import Footer from '../components/footer';
import Border from './border.png';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ModelBuilder from '../ARModels/ModelBuilder.js';
import { Link, useLocation } from 'react-router-dom';
import Modal from '../profile/ProfileModal';
import TDModal from './BarcodeModal';
import axios from 'axios';
import 'aframe';

const BarcodeScanner = () => {
  const [scannedCode, setScannedCode] = useState(null);
  const [message, setMessage] = useState('');
  const [showCokeCan, setShowCokeCan] = useState(false);
  const [showPineApple, setShowPineApple] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [show3DModelModal, setShow3DModelModal] = useState(false);
  const scannerRef = useRef(null);
  const [product, setProduct] = useState(null);
  const arSceneRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    let codeReader = null;

    const initializeScanner = () => {
      codeReader = new BrowserMultiFormatReader();
      codeReader.decodeFromVideoDevice(null, scannerRef.current, async (result, err) => {
        if (result) {
          const code = result.getText();
          setScannedCode(code);
          try {
            const response = await axios.get(`https://192.168.100.90:8000/api/products/${code}/`);
            if (response.status === 200) {
              const data = response.data;
              setProduct(data);
              setMessage(data.name);
              setShowCokeCan(data.barcode === '051111407592');
              setShowPineApple(data.barcode === '9780201379624');
              displayAR(data.image);
            } else {
              setProduct(null);
              setMessage('Product not found!');
            }
          } catch (error) {
            console.error('Error fetching product:', error);
            setMessage(`Error fetching product: ${error.message}`);
          }
        }
      });
    };

    const stopScanner = () => {
      if (codeReader) {
        codeReader.reset();
        codeReader.stopContinuousDecode();
        codeReader = null;
      }
    };

    if (location.pathname === '/barcodescan') {
      initializeScanner();
    } else {
      stopScanner();
    }

    return () => {
      stopScanner();
    };
  }, [location]);

  const resetScanner = () => {
    setScannedCode(null);
    setMessage('');
    setShowCokeCan(false);
    setShowPineApple(false);
    if (arSceneRef.current) {
      arSceneRef.current.innerHTML = '';
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const open3DModelModal = () => {
    setShow3DModelModal(true);
  };

  const close3DModelModal = () => {
    setShow3DModelModal(false);
  };

  const displayAR = (imagePath) => {
    if (!arSceneRef.current) return;

    arSceneRef.current.innerHTML = '';

    const arScene = document.createElement('a-scene');
    arScene.setAttribute('embedded', 'true');

    const arElement = document.createElement('a-image');
    const imageUrl = `https://192.168.100.90:8000${imagePath}`;
    
    arElement.setAttribute('src', imageUrl);
    arElement.setAttribute('position', '0 2 -3');
    arElement.setAttribute('height', '2');
    arElement.setAttribute('width', '2');

    arScene.appendChild(arElement);
    arSceneRef.current.appendChild(arScene);
  };

  const modalContent = product ? (
    <div>
      <h2 className='barcode-title'>Product<br/>Information</h2>
      <p>Product Name: <br/>{message}</p>
      <p>Price: <br/>₱{product.price}</p>
      <p>Ingredients: <br/>{product.ingredients}</p>
      <p>Nutritional Facts: <br/>{product.nutritional_facts}</p>
      <p>Barcode: <br/>{product.barcode}</p>
      <img src={`https://192.168.100.90:8000${product.image}`} alt={`${product.name}`} />
    </div>
  ) : (
    <p>Loading...</p>
  );

  const modelModalContent = (
    <div className="model-modal-content">
      <div className="canvas-container">
        <Canvas style={{ height: '70vh', width: '100%', zIndex: '100' }}>
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
      </div>
    </div>
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
            {location.pathname === '/barcodescan' && <video ref={scannerRef} className="scanner-video" />}
            <div className="horizontal-line"></div>
            <div className="ar-scene-container" ref={arSceneRef} />
          </div>
        </div>
      </div>

      {scannedCode && (
        <div className="button-container">
          <div className='button-left'>
            <button className="show-info" onClick={openModal}>
              Information
            </button>

            <Link to="/barcodescan" className="scan-again" onClick={resetScanner}>
              Scan Again
            </Link>
          </div>

          <div className='button-right'>
            <Link to="" className="show-reco">
              other items
            </Link>

            <button className="td-button" onClick={open3DModelModal}>
              3D Model
            </button>
          </div>
        </div>
      )}

      <Modal show={showModal} onClose={closeModal}>
        {modalContent}
      </Modal>

      <TDModal show={show3DModelModal} onClose={close3DModelModal}>
        <h2 className='td-title'>3D MODEL</h2>
        {modelModalContent}
      </TDModal>

      <div>
        <Footer onResetScanner={resetScanner} />
      </div>
    </>
  );
};

export default BarcodeScanner;
