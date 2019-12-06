import * as Types from './actionTypes';
import axios from 'axios';
import * as  keyA from '../../apiKey';

export const authStart = () => {
    return {
        type: Types.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: Types.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: Types.AUTH_FAIL,
        error: error
    };
};

export const logout = (error) => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: Types.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expiresTime) => {
    return dispatch =>{
        setTimeout(() => {
            dispatch(logout())
        }, expiresTime * 1000)
    }
}

export const authAction = (email, password, isRegister) => {
    return dispatch =>{
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key='+keyA.key;
        if(!isRegister){
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key='+keyA.key;
        }
        axios.post(url, authData)
            .then(response => {
                console.log(response.data);
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                // ngayhan = tao ngay( milis ngay hien tai + so tgian cho phep ton tai * 1000 mlis);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                 console.log('err',err.response.data.error);
                dispatch(authFail(err.response.data.error));
            });
    };
};

export const authCheckState = () =>{
    return dispatch => {
        const token = localStorage.getItem("token");
        if(!token){
            dispatch(logout());
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date()){
                dispatch(logout())
            }else{
                const userId = localStorage.getItem("userId");
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }
        }

    }
}