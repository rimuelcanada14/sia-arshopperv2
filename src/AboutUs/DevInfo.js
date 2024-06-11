import React, { useState } from 'react';
import './DevInfo.css';
import Header from '../components/header';
import { TypeAnimation } from 'react-type-animation';
import { FaFacebook } from "react-icons/fa";

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

    return(
        <>
            {/* header */}
            <Header className='devinfo-header' header={<a href = "/home" className="category-back">BACK</a>} headerright="DEVELOPERS" />

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
            
            {/* individual content */}
            <div className='devcard'>
                <div className='devheader'>
                    <h1>
                        <TypeAnimation
                            sequence={[
                                'Meet the Team',3000,
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
                    <div className="card-back-angelo">
                        <div className='card-back-contact'>
                            <h3>short description...</h3>
                            <a href="https://www.facebook.com/tanchyy">
                                Follow me on <FaFacebook />
                            </a>
                        </div>
                    </div>
                </div>
                
                
                <div className={`card ${RimuelisFlipped ? 'flip' : ''}`} onClick={handleRimuelCardClick}>
                    <div className="card-front-rimuel">
                        <h4>Rimuel Canada</h4>
                    </div>
                    <div className="card-back-rimuel">
                    <div className='card-back-contact'>
                            <h3>short description...</h3>
                            <a href="https://www.facebook.com/rimuel.canada.33">
                                Follow me on <FaFacebook />
                            </a>
                        </div>
                    </div>
                </div>

                <div className={`card ${CJisFlipped ? 'flip' : ''}`} onClick={handleCJCardClick}>
                    <div className="card-front-cj">
                        <h4>CJ Defita</h4>
                    </div>
                    <div className="card-back-cj">
                    <div className='card-back-contact'>
                            <h3>short description...</h3>
                            <a href="https://www.facebook.com/cj.defita">
                                Follow me on <FaFacebook />
                            </a>
                        </div>
                    </div>
                </div>

                <div className={`card ${LexterisFlipped ? 'flip' : ''}`} onClick={handleLexterCardClick}>
                    <div className="card-front-lexter">
                        <h4>Lexter Apuada</h4>
                    </div>
                    <div className="card-back-lexter">
                    <div className='card-back-contact'>
                            <h3>short description...</h3>
                            <a href="https://www.facebook.com/yuna.shin.3192">
                                Follow me on <FaFacebook />
                            </a>
                        </div>
                    </div>
                </div>

                <div className={`card ${JenieisFlipped ? 'flip' : ''}`} onClick={handleJenieCardClick}>
                    <div className="card-front-jenie">
                        <h4>Jenie Tadena</h4>
                    </div>
                    <div className="card-back-jenie">
                    <div className='card-back-contact'>
                            <h3>short description...</h3>
                            <a href="https://www.facebook.com/Jeniebean53">
                                Follow me on <FaFacebook />
                            </a>
                        </div>
                    </div>
                </div>

                <div className={`card ${JuliannaisFlipped ? 'flip' : ''}`} onClick={handleJuliannaCardClick}>
                    <div className="card-front-julianna">
                        <h4>Julianna</h4>
                    </div>
                    <div className="card-back-julianna">
                    <div className='card-back-contact'>
                            <h3>short description...</h3>
                            <a href="https://www.facebook.com/julsmiranda27">
                                Follow me on <FaFacebook />
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default DevInfo;
