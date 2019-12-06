import React ,{Component} from 'react';
import { connect } from 'react-redux';
import withErrorBurger from '../../../Hoc/withError/withErrorBurger/withErrorBurger';
import Button from '../../../components/UI/Button/Button';
import './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-order';
import Input from '../../../components/UI/Input/Input';

import {purchaseBurgerActions } from '../../../store/actions/order'
class ContactData extends Component {
    state ={
        orderForm:{
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZipCode'
                },
                value: '',
                validation:{
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'country'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                   options:[
                    {value:'fastest', displayValue:'Fastest'},
                   {value:'cheapest', displayValue:'Cheapest'}
                    ]
                },
                value: '',
                valid: false,
                validation:{},
               
            },
        },
        // loading: false,
        formIsValid: false
    }
    orderHandler = (event) => {
        event.preventDefault();
         this.setState( { loading: true } );
         const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ingrs,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }

        this.props.onPurchaseOrder(order,this.props.token);
    }

    checkValidity(value, rules){
        let isValid = true;
        if(!rules){
            return true;
        }
        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        //console.log(value.length); 0 
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid ;
        }
        return isValid;
    }


    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier]
        };
        
        updatedFormElement.value = event.target.value;
       
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formCheckValid = true;

        for(let inputIdentifier in updatedOrderForm){
            formCheckValid = updatedOrderForm[inputIdentifier].valid && formCheckValid
        }
       // console.log(updatedFormElement);
        
        this.setState({orderForm: updatedOrderForm ,
           formIsValid: formCheckValid
        });
    }



    render() {

        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let contactForm =  
       
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        valid = {!formElement.config.valid}
                        shouldValidation = {formElement.config.validation}
                        touched = {formElement.config.touched}
                        leaveMoused = {(event) =>this.inputChangedHandler(event, formElement.id)}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                 <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        if(this.props.loading){
            contactForm = <Spinner /> 
        }
        return (
            // {contact}
            <div className="ContactData">
                <h4>Enter code your Data</h4>
               {contactForm}
            </div>
        )
    }
}
   
const mapStateToProps = state => {
    return {
        ingrs: state.ingReducer.ingredients,
        price: state.ingReducer.totalPrice,
        loading: state.ordersReducer.loading,
        token: state.authReducer.token,
        userId: state.authReducer.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onPurchaseOrder: (order,token) => dispatch(purchaseBurgerActions(order,token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorBurger(ContactData,axios));