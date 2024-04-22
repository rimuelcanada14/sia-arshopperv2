import React from 'react';
import './header.css'

const Header = (props) => {
    return (
        <>
            <div class="header">
                <div class="header-line">
                    <h1>ARShopper</h1>
                    <p class="header-separate"> | </p>
                    <h1> ICHI MART<sub class="subscript">©</sub></h1>
                </div>
            </div> 
        </>
    )
}


export default Header;