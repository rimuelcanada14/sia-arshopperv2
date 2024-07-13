import React, {useEffect} from 'react';
import './History.css';
import Header from '../components/header';
import {Link} from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';


function History() {

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


    return(
    <> 
    
        <div className='ichiInfo-text-header'>
            <Header header={<Link to ="/aboutus" className="products-back">BACK</Link>} headersub="&nbsp;" headerright="ABOUT US" />
        </div>

        <div className='devcard'>
                <div className='devheader'>
                    <h1>
                        <TypeAnimation
                            sequence={[
                                'Ichi Mart', 3000,
                                'Binondo, Manila', 3000,
                                'Chinatown', 3000,
                                '一市场', 3000,
                            ]}
                            repeat={Infinity}
                        />
                    </h1>
                </div>
            </div>

            <div className="picture">
                <img src='./HistoryImage/Ichilogo.png' alt="AboutUs" className="adjust"/>
            </div>

            <div className='devcard'>
                <div className='devheader'>
                    <h1>ICHI MART</h1>
                </div>

                <div className='devcontents'>
                    <h3>
                    Ichi Mart is a grocery store located in Binondo, Manila, and was established last
                    August 2004. The name of the store was derived from the Japanese word “ichi” which
                    means one, best, or start, and the word “mart” which means a trade center or market. 
                    
                    Ichi Mart envisions expanding their store to be a supermarket so there will be more
                    customers to be catered to with the services they offer.
                    </h3>
                </div>
            </div>
        <div> 
            
        </div>

        






    </>   
    )
}









export default History;