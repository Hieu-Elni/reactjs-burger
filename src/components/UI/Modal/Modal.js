import React , {Component} from 'react';
import './Modal.css';

import BackDrop from '../Backdrop/BackDrop';

import Aux from '../../../Hoc/AuxComponent';
class Modal extends Component{

    shouldComponentUpdate ( nextProps, nextState ) {
         //console.log(nextProps.show); 
         // trong shouldComUpdate
         //props.show khac props o render
         //nextprops lay gia tri cua moi(gia tu cha), this.props lay gia tri cu
      //  console.log(this.props.children)
        return  nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    
       
    }

    componentDidUpdate() {
        // console.log('[Modal] DidUpdate');
    }
    render() {
        
        return(
            <Aux>
                <BackDrop show = {this.props.show} clicked={this.props.modalClose}>

                </BackDrop>
                <div className="Modal"
                style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1': '0'
                }}
                >
                    {this.props.children}
                </div>
            </Aux>
        )
    }
} 

export default Modal;