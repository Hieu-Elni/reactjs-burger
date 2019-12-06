import React , { Component } from 'react';
import Aux from '../../Hoc/Aux';

import ToolBar from '../../components/Navigation/ToolBar/ToolBar';
import  './Layout.css';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
class Layout extends Component {
    state={
        openNav:false,
    }

    openHandleNav = () => {
        this.setState({openNav:true})
    }

    closeHandleNav = () => {
        this.setState({openNav:false})
    }

    render() {
        return(
            <Aux>
                <ToolBar openNav={this.openHandleNav}/>
                <SideDrawer  show ={this.state.openNav} closeNav={this.closeHandleNav}/>
                <main className="Content">
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;