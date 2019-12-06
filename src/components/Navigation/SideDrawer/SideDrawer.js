import React from 'react';
import Navigation from '../Navigation'
import Logo from '../Logo/Logo';
import './SideDrawer.css';
import BackDrop from '../../UI/Backdrop/BackDrop';

import Aux from '../../../Hoc/AuxComponent';

const sideDrawer = (props) => {
    let attachedClass;
    
    if(props.show) attachedClass = " Open"
    else attachedClass  = " Close"
    return (
        <Aux>
        <BackDrop show={props.show} clicked={props.closeNav}/>
        <div className={"SideDrawer" + attachedClass} onClick={props.closeNav}>
            <div className="Logo">
                <Logo />
            </div>
            <nav>
                <Navigation />
            </nav>
        </div>
        </Aux>
    )
}

 
export default sideDrawer;