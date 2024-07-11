import React, {useEffect} from 'react';
import './History.css';
import Header from '../components/header';
import {Link} from 'react-router-dom';


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

        <div className="ichi-about-header">
                <p>HISTORY OF ICHIMART</p>
            </div>

            <div className="picture">
                <img src='./HistoryImage/Ichilogo.png' alt="AboutUs" className="adjust"/>
            </div>
        <div> 
            
        </div>

        






    </>   
    )
}









export default History;