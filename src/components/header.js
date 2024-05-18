import React from 'react';
import './header.css'

const Header = (props) => {
    return (
        <>
            <div class="header">
                <div class="header-line">
                    <h1>{props.header}</h1>
                    <p class="header-separate"> | </p>
                    <h1>{props.headerright}<sub className="subscript">{props.headersub}</sub></h1>
                </div>
            </div> 
        </>
    )
}


export default Header;
