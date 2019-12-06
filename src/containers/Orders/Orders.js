import React,{Component} from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorBurger from '../../Hoc/withError/withErrorBurger/withErrorBurger';
import {fetchOrders} from '../../store/actions/order'
class Orders extends Component {


    componentDidMount() {
        this.props.onFetchOrders(this.props.token,this.props.userId);
    }

    render(){
       
        let ordersShow = <Spinner/>;
        if(!this.props.loading){
            ordersShow = this.props.orders && this.props.orders.map((order,index) => (
                <Order orders ={order.ingredients} key={index} price={order.price}/>
            ));
        }

        return(
            <div>
                {ordersShow}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders: state.ordersReducer.orders,
        loading: state.ordersReducer.loading,
        token: state.authReducer.token,
        userId: state.authReducer.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token,userId) => dispatch(fetchOrders(token,userId))
    };
};
export default connect( mapStateToProps, mapDispatchToProps )( withErrorBurger( Orders, axios ) );
