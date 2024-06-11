import React from 'react';
import {Link} from 'react-router-dom';
import './History.css';
import Header from '../components/header';


function History() {

    return(
    <> 
    
        <div className='ichiInfo-text-header'>
            <Header header={<a href = "/AboutUs" className="history-back">BACK</a>} headerright="ABOUT US" 
                    headersub={<a href = "/AboutUs" className="history-sub">h</a>}/>
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