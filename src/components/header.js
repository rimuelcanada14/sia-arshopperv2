import React from 'react';
import './header.css'

// function HeaderProps (props) {
//     return(
//         <>
//         <h1>{props.headerTitle}</h1>
//         <p class="header-separate"> {props.divider} </p>
//         <h1>ICHIMART<sub class="subscript">©</sub></h1>
//         </>
//     )
// }

const Header = (props) => {
    return (
        <>
            <div class="header">
                <div class="header-line">
                    <h1>{props.header}</h1>
                    <p class="header-separate"> | </p>
                    <h1> ICHI MART<sub class="subscript">©</sub></h1> 
                </div>
            </div> 
        </>
    )
}


export default Header;