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
import Modal from '../profile/ProfileModal';
import TDModal from './BarcodeModal';
import axios from 'axios';


let isScanned = false;

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

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    const scanBarcode = async () => {
      if (!isScanned && scannerRef.current) {
        codeReader.decodeFromVideoDevice(null, scannerRef.current, async (result, err) => {
          if (result) {
            isScanned = true;
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
                displayAR('https://192.168.100.90:8000/api/products/${product.image}/');
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

    if (arSceneRef.current) {
      arSceneRef.current.innerHTML = '';
    }
    console.clear();
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

  const displayAR = (barcode) => {
    // Clear previous AR content if any
    if (!arSceneRef.current) return;
  
    arSceneRef.current.innerHTML = '';
  
    // Create a new A-Frame scene
    const arScene = document.createElement('a-scene');
  
    //Display product image as AR content
    const arElement = document.createElement('a-image');
    arElement.setAttribute('src', `https://192.168.100.90:8000${product.image}`); // Set the image URL here
    arElement.setAttribute('position', '0 1.6 -3'); // Example position
    arElement.setAttribute('height', '2'); // Example height
    arElement.setAttribute('width', '2'); // Example width
  
    // Append the AR element to the scene
    arScene.appendChild(arElement);
    arSceneRef.current.appendChild(arScene);
  };
  
  
  

  const modalContent = product ? (
    <div>
      <h2 className='barcode-title'>Product<br/>Information</h2>
      <p>Product Name: <br/>{product.name}</p>
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
    <>
    <div className="model-modal-content">
      <Canvas style={{ height: '70vh', width: '100vw', zIndex:'100'}}>
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
    </>
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
        <Footer onResetScanner={resetScanner} onDisplayAR={displayAR}/>
      </div>
    </>
  );
};

export default BarcodeScanner;