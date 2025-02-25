import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';
import './Barcodescan.css';
import Header from '../components/header';
import Footer from '../components/footer';
import Border from './border.png';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ModelBuilder from '../3DModels/ModelBuilder.js';
import { Link, useLocation } from 'react-router-dom';
import Modal from '../profile/ProfileModal';
import TDModal from './BarcodeModal';
import RecoModal from './RecoModal';
import axios from 'axios';
import 'aframe';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

const BarcodeScanner = () => {
  const [scannedCode, setScannedCode] = useState(null);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [show3DModelModal, setShow3DModelModal] = useState(false);
  const [showRecoModal, setShowRecoModal] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const scannerRef = useRef(null);
  const [product, setProduct] = useState(null);
  const [glbFile, setGlbFile] = useState(null);
  const arSceneRef = useRef(null);
  const location = useLocation();
  const [userIllness, setUserIllness] = useState('');


  useEffect(() => {
    const handleBeforeUnload = (event) => {
        event.preventDefault();
        event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const fetchUserIllness = async() => {
      const mobileNumber = localStorage.getItem('mobileNumber');
      if(mobileNumber){
        try{
          const response = await axios.get(`https://api-arshopper.ngrok.app/api/user-details/${mobileNumber}`);
          setUserIllness({
            illness: response.data.illness,
            illness2: response.data.illness2,
            illness3: response.data.illness3,
          });
        } catch(error){
          console.error('Failed to fetch user illness', error);
        }
      }
    };
    fetchUserIllness();
  }, []);

  useEffect(() => {
    let codeReader = null;

    const initializeScanner = () => {
      codeReader = new BrowserMultiFormatReader();
      codeReader.decodeFromVideoDevice(null, scannerRef.current, async (result, err) => {
        if (result) {
          const code = result.getText();
          setScannedCode(code);
          try {
            const response = await axios.get(`https://api-arshopper.ngrok.app/api/products/${code}/`);
            if (response.status === 200) {
              const data = response.data;
              setProduct(data);
              setMessage(data.name);
              setGlbFile(data.glb_file);
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
    if (arSceneRef.current) {
      arSceneRef.current.innerHTML = '';
    }
    setProduct(null);
    setGlbFile(null);
  };

  const fetchRecommendations = async (productFeatures, conditions, category) => {
    console.log('Fetching recommendations for:', productFeatures, conditions, category);
  
    try {
      const response = await axios.post('https://api-arshopper.ngrok.app/api/recommendations/', {
        product_features: productFeatures,
        conditions: conditions || [], 
        category: category || '',     
      });
  
      console.log('Response:', response);
  
      if (response.status === 200) {
        const recommendations = response.data;
        console.log('Recommendations:', recommendations);
        setRecommendations(recommendations);
        setShowRecoModal(true);
      } else {
        console.error('Unexpected status code:', response.status);
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };
  
  
  
  const parseNutritionalFacts = (factsString) => {
    const factsArray = factsString.split(', ').map(fact => fact.match(/(\w+)\(([\d.]+)(\w+)\)/));
    const factsDict = {};
    factsArray.forEach(fact => {
      if (fact && fact.length === 4) {
        factsDict[fact[1]] = parseFloat(fact[2]);
      }
    });
    return factsDict;
  };
  

  const handleShowRecommendations = () => {
    if (!product) {
      console.error('Product data not available');
      return;
    }
  
    // Parse the nutritional facts string to a dictionary
    let productFeatures = parseNutritionalFacts(product.nutritional_facts);
    console.log('Parsed Product Features:', productFeatures);
  
    const category = product.category;
  
    // Filter out null conditions
    const conditions = [userIllness.illness, userIllness.illness2, userIllness.illness3].filter(
      illness => illness !== 'null' && illness !== 'null2' && illness !== 'null3'
    );
  
    fetchRecommendations(productFeatures, conditions, category);
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

  const closeRecoModal = () => {
    setShowRecoModal(false);
  };

  const displayAR = (imagePath) => {
    if (!arSceneRef.current) return;

    arSceneRef.current.innerHTML = '';

    const arScene = document.createElement('a-scene');
    arScene.setAttribute('embedded', 'true');

    const arElement = document.createElement('a-image');
    const imageUrl = `https://api-arshopper.ngrok.app${imagePath}`;

    arElement.setAttribute('src', imageUrl);
    arElement.setAttribute('position', '0 2 -3');
    arElement.setAttribute('height', '2');
    arElement.setAttribute('width', '2');

    arScene.appendChild(arElement);
    arSceneRef.current.appendChild(arScene);
  };

  const modelModalContent = (
    <div className="model-modal-content">
      <div className="canvas-container">
        <Canvas style={{ height: '70vh', width: '100%', zIndex: '100' }}>
          <ambientLight intensity={1.5} />
          <directionalLight position={[5, 5, 5]} />
          {glbFile && (
            <ModelBuilder path={`https://api-arshopper.ngrok.app${product.glb_file}`} position={[0, 0, -5]} />
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

  const renderRecommendations = () => {
    return (
      <>
      <h2 className = "reco-title">OTHER ITEMS</h2>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        modules={[Pagination]}
        pagination={{ clickable: true }}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {recommendations.map((recommendation, index) => (
          
          <SwiperSlide key={index}>
            
            <div className="recommendation-item">
              <h4 className='reco-content'>{recommendation.ProductName}</h4>
              <p className='reco-content'>Price: ₱{recommendation.Price}</p>
              <p className='reco-content-down'>Nutritional Facts: {recommendation.NutritionalFacts}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      </>
      
    );
  };
  
  

  return (
    <>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.css" />

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
            <button className="show-reco" onClick={handleShowRecommendations}>
              OTHER ITEMS
            </button>

            <button className="td-button" onClick={open3DModelModal}>
              3D Model
            </button>
          </div>
        </div>
      )}

      <Modal show={showModal} onClose={closeModal}>
        <div>
          <h2 className='barcode-title'>Product<br/>Information</h2>
          <p>Product Name: <br/>{message}</p>
          {product && (
            <>
              <p>Price: <br/>₱{product.price}</p>
              <p>Ingredients: <br/>{product.ingredients}</p>
              <p>Nutritional Facts: <br/>{product.nutritional_facts}</p>
              <p>Barcode: <br/>{product.barcode}</p>
            </>
          )}
        </div>
      </Modal>

      <TDModal show={show3DModelModal} onClose={close3DModelModal}>
        <h2 className='td-title'>3D MODEL <p className='subtext'>USE TWO FINGERS TO NAVIGATE</p></h2>
        
        {modelModalContent}
      </TDModal>

      <RecoModal show={showRecoModal} onClose={closeRecoModal}>
        {renderRecommendations()}
      </RecoModal>

      <div>
        <Footer onResetScanner={resetScanner} />
      </div>
    </>
  );
};

export default BarcodeScanner;
