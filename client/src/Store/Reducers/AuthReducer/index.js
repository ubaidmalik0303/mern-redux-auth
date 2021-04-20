import {
    LOGIN_REQUEST,
    LOGIN_REQUEST_FAILED,
    LOGIN_REQUEST_SUCCESS,
    SIGNUP_REQUEST,
    SIGNUP_REQUEST_FAILED,
    SIGNUP_REQUEST_SUCCESS,
    USER_LOGOUT_SUCCESS,
    CLEAR_ERROR,
    CLEAR_MESSAGE,
    USER_GMAIL_SUCCESS,
    USER_GMAIL_FAILED,
} from '../../Actions/type';
import isEmpty from 'is-empty';
import Cookie from 'js-cookie';


const initialState = {
    token: Cookie.get('token'),
    isAuthenticated: !isEmpty(Cookie.get('token')),
    isLoading: false,
    message: null,
    error: null,
    user: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SIGNUP_REQUEST:
            return {
                ...state,
                isAuthenticated: false,
                isLoading: true,
            }
        case SIGNUP_REQUEST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                message: action.payload
            }
        case SIGNUP_REQUEST_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        case LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case LOGIN_REQUEST_SUCCESS:
            Cookie.set('token', action.payload)
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                token: action.payload,
            }
        case LOGIN_REQUEST_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        case USER_GMAIL_SUCCESS:
            Cookie.set('token', action.payload)
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload,
            }
        case USER_GMAIL_FAILED:
            return {
                ...state,
                error: action.payload
            }
        case USER_LOGOUT_SUCCESS:
            Cookie.remove('token')
            return {
                ...state,
                isAuthenticated: false,
                token: null,

            }
        case CLEAR_ERROR:
            return {
                ...state,
                isLoading: false,
                error: false
            }
        case CLEAR_MESSAGE:
            return {
                ...state,
                message: null
            }
        default:
            return state;
    }
}