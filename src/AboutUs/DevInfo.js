import React from 'react';
//import {Link} from 'react-router-dom';
import './DevInfo.css';
import Header from '../components/header';
import { TypeAnimation } from 'react-type-animation';

function DevInfo() {
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
                        Just a happy group of students from Pamantasan ng Lungsod ng Maynila.
                        Achieving the best of everything, pursuing good dreams, and God knows what else...
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

            <div className='devpic'>
                {/* Angelo Tancioco */}
                <div className='devindiv'>
                    <img src='./AboutUsImages/try.jpg' alt='Angelo'></img>
                    <h3>Angelo Tancioco</h3>
                </div>
                
                {/* Rimuel Canada */}
                <div className='devindiv'>
                    <img src='./AboutUsImages/try.jpg' alt='Rimuel'></img>
                    <h3>Rimuel Canada</h3>
                </div>
                
                {/* CJ Defita */}
                <div className='devindiv'>
                    <img src='./AboutUsImages/try.jpg' alt='CJ'></img>
                    <h3>CJ Defita</h3>
                </div>

                {/* Lexter Apuada */}
                <div className='devindiv'>
                    <img src='./AboutUsImages/try.jpg' alt='Lexter'></img>
                    <h3>Lexter Apuada</h3>
                </div>

                {/* Jenie Tadena */}
                <div className='devindiv'>
                    <img src='./AboutUsImages/try.jpg' alt='Jenie'></img>
                    <h3>Jenie Tadena</h3>
                </div>

                {/* Julianna Miranda */}
                <div className='devindiv'>
                    <img src='./AboutUsImages/try.jpg' alt='Julianna'></img>
                    <h3>Julianna Miranda</h3>
                </div>
            </div>
        </>
    )
}

export default DevInfo;
