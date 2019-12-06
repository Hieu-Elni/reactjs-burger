import React ,{Component} from 'react';
import NavItem from './NavigationItem/NavigationItem'
import { connect } from 'react-redux';

import './Navigation.css';
class Navigation extends Component {
  render() {
    console.log(this.props.isAuth);
    return (
      <ul className="Navigation">
        <NavItem link="/" exact>Burger Builder</NavItem>
        {this.props.isAuth ?<NavItem link="/Orders" >Orders</NavItem> : null}
        {this.props.isAuth ? <NavItem link="/logout" >Logout</NavItem> :
           <NavItem link="/auth" >Authenticate</NavItem>
        }
       
      </ul>
    )
  }
}
  // <ul className="Navigation">
  //     <NavItem link="/" exact>Burger Builder</NavItem>
  //     <NavItem link="/Orders" >Orders</NavItem>
  //     <NavItem link="/auth" >Authenticate</NavItem>
  // </ul>
  const mapStateToProps = state => {
    return {
      isAuth: state.authReducer.token !==null
    }
  }

  export default connect( mapStateToProps, null ) (Navigation);