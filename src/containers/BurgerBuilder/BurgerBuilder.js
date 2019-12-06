import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../Hoc/AuxComponent';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BurgerControl/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorBurger from '../../Hoc/withError/withErrorBurger/withErrorBurger';
import axios from '../../axios-order';
import {addIngredients, removeIngredients,
    initIngredientsActions
}
 from '../../store/actions/actions';

class BurgerBuilder extends Component {

    state = {
        //ingredients: { gop salad:2
        //     // salad: 1,
        //     // bacon: 0,
        //     // cheese: 0,
        //     // meat: 0
        // }
    //    ingredients: [],// [{id:,type:'salad'},]
        openModalPur: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        this.props.onInitIngredients();
       
    }
    //dùng redux chuyển 2 ham onadd, onRemove qua store chung khi goi action

    updatePurchasable = () => {
        if(this.props.ingrs && this.props.ingrs.length >0){
            return true
        }else {
            return false
        }
    }

    openModalHandle = () =>{
        if(this.props.isAuthenticated){
        this.setState({openModalPur: true});
        }else{
            this.props.history.push("/auth")
        }
    }
    handleClosePur = () =>{
        this.setState({openModalPur: false});
    }

    purchaseHandleContinue = () => {
        this.props.history.push('/checkout');
    }

    
    render () {
      let disableInfo ={
            salad:true,
            bacon: true,
            cheese:true,
            meat:true,
        }
            if(this.props.ingrs && this.props.ingrs.length>0){
                for(let i= 0; i< this.props.ingrs.length;i++){
                    for( let key in disableInfo){
                        if(this.props.ingrs[i].type === key){
                            disableInfo[key] = false; 
                        }
                    }
                }
                
            }
        let orderSummary = null;
        let burger = null;

        burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
      
        if (this.props.ingrs === null || this.props.ingrs.length >0) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingrs}></Burger>
                    <BuildControls 
                    handleOnAdd = {this.props.onIngredientAdded}
                    handleOnRemove = {this.props.onIngredientRemoved}
                    disable={disableInfo}
                    purchasable = {this.updatePurchasable()}
                    openModalPur = {this.openModalHandle}
                    isAuth={this.props.isAuthenticated}
                    price = {this.props.price}
                />
                </Aux>
            );
            orderSummary = 
            <OrderSummary ingredients ={this.props.ingrs} 
            purchaseCancel = {this.handleClosePur}
            purchaseContinue = {this.purchaseHandleContinue}
            price = {this.props.price}
            />;
        }
        if ( this.state.loading ) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
               {burger}
                <Modal show={this.state.openModalPur} modalClose={this.handleClosePur}>
                    
                {orderSummary}
                    
                </Modal>
            </Aux>
        );
    }
}
const mapStateToProps = state => {
    return {
        ingrs: state.ingReducer.ingredients,
        price: state.ingReducer.totalPrice,
        error: state.ingReducer.error,
        isAuthenticated: state.authReducer.token !==null
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(addIngredients(ingName)),
        onIngredientRemoved: (ingName) => dispatch(removeIngredients(ingName)),
        onInitIngredients: () => dispatch(initIngredientsActions())
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (withErrorBurger(BurgerBuilder,axios));