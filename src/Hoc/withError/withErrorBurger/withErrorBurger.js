import React , {Component} from 'react';

import Aux from '../../Aux';
import Modal from '../../../components/UI/Modal/Modal';

const withErrorBurger = (WrappedComponent, axios) => {
    return class extends Component {
        state= {
            error:null
        }

        componentWillMount() {
            this.reqIntercerptor = axios.interceptors.request.use(req =>{
                this.setState({error:null})
                return req;
            })

            this.resInter = axios.interceptors.response.use(res => res,error =>{
                this.setState({error:error});
               
            })
        }

        errorConfirmHandle = () =>{
            this.setState({error:null})
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqIntercerptor);
            axios.interceptors.response.eject(this.resInter);
        }
        render() {
            return (
                <Aux>
                <Modal show={this.state.error}
                        modalClose={this.errorConfirmHandle}
                >
                    {this.state.error ?this.state.error.message : null}
                </Modal>
                <WrappedComponent {...this.props}></WrappedComponent>
            </Aux>
            )
        }
    }
}
    
export default withErrorBurger;