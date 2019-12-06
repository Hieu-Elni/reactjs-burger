import React from 'react';

import  './ToolBar.css';
import  Logo from '../Logo/Logo';
import  Navigation from '../../Navigation/Navigation';
import  DrawToggle from '../SideDrawer/DrawToggle/DrawToggle';

const toolbar = (props) => (
    <header className="ToolBar">
        <DrawToggle clicked={props.openNav}></DrawToggle>
        <div className="Logo">
            <Logo />
        </div>
        <nav className="DesktopOnly">
            <Navigation></Navigation>
        </nav>
    </header>
)

export default toolbar;

// ToolBar
//      Menu 
//      Logo
//      Nav <NavItem/> </Nav>