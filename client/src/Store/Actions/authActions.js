import {
    LOGIN_REQUEST,
    LOGIN_REQUEST_FAILED,
    LOGIN_REQUEST_SUCCESS,
    SIGNUP_REQUEST,
    SIGNUP_REQUEST_FAILED,
    SIGNUP_REQUEST_SUCCESS,
    USER_LOGOUT_SUCCESS,
    USER_GMAIL_SUCCESS,
    USER_GMAIL_FAILED,
} from './type';
import Cookie from 'js-cookie';


export const userSignup = ({ name, email, password, password2 }) => {
    return async (dispatch) => {
        dispatch({
            type: SIGNUP_REQUEST
        })
        try {
            const response = await fetch('https://mern-redux-auth.herokuapp.com/register', {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    password2
                })
            })
            const data = await response.json();
            if (!data.success) {
                dispatch({
                    type: SIGNUP_REQUEST_FAILED,
                    payload: data.name || data.email || data.password || data.password2
                })
            } else {
                dispatch({
                    type: SIGNUP_REQUEST_SUCCESS,
                    payload: data.msg
                })
            }
        } catch (e) {
            console.log(e)
        }
    }
}


export const userLogin = ({ email, password }) => {
    return async (dispatch) => {
        dispatch({
            type: LOGIN_REQUEST,
        })
        try {
            const response = await fetch('https://mern-redux-auth.herokuapp.com/login', {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })
            const data = await response.json();
            if (!data.success) {
                dispatch({
                    type: LOGIN_REQUEST_FAILED,
                    payload: data.emailnotfound || data.passwordincorrect
                })
            } else {
                console.log("login", data.msg)
                dispatch({
                    type: LOGIN_REQUEST_SUCCESS,
                    payload: data.token
                })
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const googleLogin = (tokenId) => {
    return async (dispatch) => {
        const response = await fetch('https://mern-redux-auth.herokuapp.com/google-auth', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                tokenId,
            })
        })

        const data = await response.json();

        if(!data.success) {
            dispatch({
                type: USER_GMAIL_FAILED,
                payload: data.msg,
            })
        } else {
            dispatch({
                type: USER_GMAIL_SUCCESS,
                payload: data.token,
            })
        }

    }
}

export const userLogout = () => {
    return (dispatch) => {
        dispatch({
            type: USER_LOGOUT_SUCCESS,
        })
    }
}


export const clearErrors = (type) => {
    return (dispatch) => {
        dispatch(type)
    }
}

export const clearMessages = (type) => {
    return (dispatch) => {
        dispatch(type)
    }
}


