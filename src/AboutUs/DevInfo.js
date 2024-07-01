import React, { useState } from 'react';
import './DevInfo.css';
import Header from '../components/header';
import Footer from '../components/footer';
import { TypeAnimation } from 'react-type-animation';
import { FaFacebook } from "react-icons/fa";
import { Link } from 'react-router-dom';

function DevInfo() {

    const [AngeloisFlipped, setAngeloIsFlipped] = useState(false);
    const [RimuelisFlipped, setRimuelIsFlipped] = useState(false);
    const [CJisFlipped, setCJIsFlipped] = useState(false);
    const [LexterisFlipped, setLexterIsFlipped] = useState(false);
    const [JenieisFlipped, setJenieIsFlipped] = useState(false);
    const [JuliannaisFlipped, setJuliannaIsFlipped] = useState(false);

    const handleAngeloCardClick = () => {
        setAngeloIsFlipped(!AngeloisFlipped);
    };
    const handleRimuelCardClick = () => {
        setRimuelIsFlipped(!RimuelisFlipped);
    };
    const handleCJCardClick = () => {
        setCJIsFlipped(!CJisFlipped);
    };
    const handleLexterCardClick = () => {
        setLexterIsFlipped(!LexterisFlipped);
    };
    const handleJenieCardClick = () => {
        setJenieIsFlipped(!JenieisFlipped);
    };
    const handleJuliannaCardClick = () => {
        setJuliannaIsFlipped(!JuliannaisFlipped);
    };

    return (
        <>
            {/* header */}
            <Header header={<Link to="/aboutus" className="products-back">BACK</Link>} headersub="&nbsp;" headerright="DEVELOPERS" />
            <div className='devcard'>
                <div className='devheader'>
                    <h1>iloveyou.vbs</h1>
                </div>

                <div className='devcontents'>
                    <h3>
                        Just a happy group of students from Pamantasan ng Lungsod ng Maynila,
                        achieving the best of everything, pursuing good dreams, and God knows what else...
                    </h3>
                </div>
            </div>

            <div className='devcard'>
                <div className='devheader'>
                    <h1>
                        <TypeAnimation
                            sequence={[
                                'Meet the Team', 3000,
                                '认识团队', 3000,
                            ]}
                            repeat={Infinity}
                        />
                    </h1>
                </div>
            </div>

            <div className="card-container">
                <div className={`card ${AngeloisFlipped ? 'flip' : ''}`} onClick={handleAngeloCardClick}>
                    <div className="card-front-angelo">
                        <h4>Angelo Tancioco</h4>
                    </div>
                    <div className="card-back">
                        <div className='card-back-contact'>
                            <a href="https://www.facebook.com/tanchyy" target="_blank" rel="noopener noreferrer">
                                Follow me on <FaFacebook />
                            </a>
                        </div>
                    </div>
                </div>

                <div className={`card ${RimuelisFlipped ? 'flip' : ''}`} onClick={handleRimuelCardClick}>
                    <div className="card-front-rimuel">
                        <h4>Rimuel Canada</h4>
                    </div>
                    <div className="card-back">
                        <div className='card-back-contact'>
                            <a href="https://www.facebook.com/rimuel.canada.33" target="_blank" rel="noopener noreferrer">
                                Follow me on <FaFacebook />
                            </a>
                        </div>
                    </div>
                </div>

                <div className={`card ${CJisFlipped ? 'flip' : ''}`} onClick={handleCJCardClick}>
                    <div className="card-front-cj">
                        <h4>CJ Defita</h4>
                    </div>
                    <div className="card-back">
                        <div className='card-back-contact'>
                            <a href="https://www.facebook.com/cj.defita" target="_blank" rel="noopener noreferrer">
                                Follow me on <FaFacebook />
                            </a>
                        </div>
                    </div>
                </div>

                <div className={`card ${LexterisFlipped ? 'flip' : ''}`} onClick={handleLexterCardClick}>
                    <div className="card-front-lexter">
                        <h4>Lexter Apuada</h4>
                    </div>
                    <div className="card-back">
                        <div className='card-back-contact'>
                            <a href="https://www.facebook.com/yuna.shin.3192" target="_blank" rel="noopener noreferrer">
                                Follow me on <FaFacebook />
                            </a>
                        </div>
                    </div>
                </div>

                <div className={`card ${JenieisFlipped ? 'flip' : ''}`} onClick={handleJenieCardClick}>
                    <div className="card-front-jenie">
                        <h4>Jenie Tadena</h4>
                    </div>
                    <div className="card-back">
                        <div className='card-back-contact'>
                            <a href="https://www.facebook.com/Jeniebean53" target="_blank" rel="noopener noreferrer">
                                Follow me on <FaFacebook />
                            </a>
                        </div>
                    </div>
                </div>

                <div className={`card ${JuliannaisFlipped ? 'flip' : ''}`} onClick={handleJuliannaCardClick}>
                    <div className="card-front-julianna">
                        <h4>Julianna Miranda</h4>
                    </div>
                    <div className="card-back">
                        <div className='card-back-contact'>
                            <a href="https://www.facebook.com/julsmiranda27" target="_blank" rel="noopener noreferrer">
                                Follow me on <FaFacebook />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default DevInfo;
