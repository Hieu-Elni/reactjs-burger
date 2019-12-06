import React from 'react';

import './NavItem.css';
import {NavLink} from 'react-router-dom'
const navigationItem = (props) => (
 <li className="NavItem">
     <NavLink to={props.link} 
    //  className={props.active ? "active": null}
    activeClassName="active"
    exact={props.exact}
        >
            {props.children}
    </NavLink>
    </li>
)

export default navigationItem;