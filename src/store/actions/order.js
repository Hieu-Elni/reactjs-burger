import * as Types from './actionTypes';
import axios from '../../axios-order';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: Types.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
}

export const purchaseBurgerStart = (error) => {
    return {
        type: Types.PURCHASE_BURGER_START,
        error
    };
}

export const purchaseBurgerFail = () => {
    return {
        type: Types.PURCHASE_BURGER_START,
    };
}


export const purchaseBurgerActions = (orderData, token) => {
    return (dispatch) => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth=' + token,orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name,orderData));
            })
            .catch( error => {
                console.log('run faild',error)
                dispatch(purchaseBurgerFail(error));
            })
    };
}

export const fetchOrdersSuccess = ( orders ) => {
    return {
        type: Types.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersFail = ( error ) => {
    return {
        type: Types.FETCH_ORDERS_FAIL,
        error: error
    };
};

export const fetchOrdersStart = () => {
    return {
        type: Types.FETCH_ORDERS_START
    };
};

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        console.log('orr',userId)
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' +userId +'"';
        axios.get( '/orders.json' +queryParams )
            .then( res => {
                const fetchedOrders = [];
                for ( let key in res.data ) {
                    fetchedOrders.push( {
                        ...res.data[key],
                        id: key
                    } );
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            } )
            .catch( err => {
                dispatch(fetchOrdersFail(err));
            } );
    };
};