import React ,{Component} from 'react';
import { connect } from 'react-redux';
import Button from '../../components/UI/Button/Button';
import './Auth.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import Input from '../../components/UI/Input/Input';

import {authAction} from '../../store/actions/authAction';
class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isRegister: true
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /^[a-z][a-z0-9]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }
        this.setState({controls: updatedControls});
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isRegister);
    }

    switchAuthModeHandler = () => {
        
        this.setState(prevState => {
            return {isRegister: !prevState.isRegister};
        })
    }
    render() {
        const formElementsArray = [];
        for ( let key in this.state.controls ) {
            formElementsArray.push( {
                id: key,
                config: this.state.controls[key]
            } );
        }
        let form = formElementsArray.map( formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
        ) );

        if(this.props.loading){
            form = <Spinner/>
        }
        let errorMessage = null;
        let authRedirect = null;
        if(this.props.error){
            errorMessage= this.props.error.message;
        }
        if(this.props.isAuthen){
            if(this.props.selectedIngr){
                authRedirect = <Redirect to="/checkout"/>;
            }else{
                authRedirect = <Redirect to="/"/>;
            }
          
        }

        return(
            <div className="Auth">
                <form onSubmit={this.submitHandler}>
                    {authRedirect}
                    {errorMessage}
                    {form}
                    <Button btnType="Success">{this.state.isRegister ? 'REGISTER' : 'LOGIN'}</Button>
                </form>
                <Button 
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger">SWITCH TO {this.state.isRegister ? 'LOGIN' : 'REGISTER'}</Button>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        loading: state.authReducer.loading,
        error: state.authReducer.error,
        isAuthen: state.authReducer.token !==null,
        selectedIngr: state.ingReducer.selectedIng,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isRegister) => dispatch(authAction(email, password, isRegister))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
