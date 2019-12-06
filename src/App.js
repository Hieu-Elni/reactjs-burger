import React,{Component} from 'react';
import { connect } from 'react-redux';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './components/Navigation/Logout/Logout';

import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import {authCheckState} from './store/actions/authAction';
class App extends Component {

  componentDidMount(){
    this.props.onTryAutoSignup();
  }
  render(){
  return (
    <div >
    <Layout>
      <Switch>
          
          <Route path="/checkout" component={Checkout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/orders" component={Orders} />
          <Route path="/auth" component={Auth} />
          <Route path="/logout" component={Logout} />
          <Redirect to="/" />
        </Switch>
    </Layout>
    </div>
  );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( authCheckState() )
  };
};

export default  withRouter(connect( null, mapDispatchToProps )( App ));
