import axios from 'axios';
import { LOGIN, LOGOUT, SIGNUP, GET_USER } from './actionTypes';

const initialState = {
    user: {},
    redirect: false,
    error: false
};

export const login = (username, password) => {
    let data = axios
        .post('/api/login', { username, password })
        .then(res => res.data);
    return {
        type: LOGIN,
        payload: data
    };
};

export const logout = () => {
    return {
        type: LOGOUT,
        payload: axios.delete('/api/logout')
    };
};

export const signup = (firstName, lastName, email, username, password) => {
    let data = axios
        .post('/api/signup', { firstName, lastName, email, username, password })
        .then(res => res.data)
        .catch(err => console.log(`Couldn't sign up user`, err))
    return {
        type: SIGNUP,
        payload: data
    };
};

export const getUser = () => {
    let data = axios.get('/api/user').then(res => res.data);
    return {
        type: GET_USER,
        payload: data
    };
};

export default function (state = initialState, action) {
    let { type, payload } = action;
    switch (type) {
        case LOGIN + '_FULFILLED':
            return {
                ...state,
                user: payload,
                redirect: false,
                error: false
            };
        case LOGIN + '_REJECTED':
            return { ...state, error: payload };
        case LOGOUT + '_FULFILLED':
            return { ...state, user: {}, redirect: true, error: false };
        case SIGNUP + '_FULFILLED':
            return {
                ...state,
                redirect: false,
                user: payload,
                error: false
            };
        case SIGNUP + '_REJECTED':
            return { ...state, error: payload };
        case GET_USER + '_PENDING':
            return { ...state, redirect: false, error: false };
        case GET_USER + '_FULFILLED':
            return { ...state, user: payload, error: false };
        case GET_USER + '_REJECTED':
            return { ...state, redirect: true, error: payload };
        default:
            return state;
    }
}
