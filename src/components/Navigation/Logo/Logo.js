import React from 'react';
import burgerLogo from '../../../assets/img/burger-logo.png';
import  './Logo.css';

const logo = (props) => (
    <div className="Logo-child" style={{height: props.height}}>
        <img src={burgerLogo}/>
    </div>
)

export default logo;