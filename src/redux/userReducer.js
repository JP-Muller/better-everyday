import axios from 'axios';
import { LOGIN, LOGOUT, SIGNUP, GET_USER, ADD_STREAK_SCORE, REMOVE_STREAK_SCORE, INCREASE_LEVEL, GET_SCORES } from './actionTypes';

const initialState = {
    user: {},
    redirect: false,
    error: false,
    currentLevel: '',
    scoreStreak: ''

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

export const addImage = (image) => {
    let data = axios
        .put('/api/userimage')
}

export const levelUp = () => {
    let data = axios
        .post('/api/levelup')
        .then(res => res.data)
        .catch(err => console.log(`Couldn't level up user`, err))
    console.log(data)
    return {
        type: INCREASE_LEVEL,
        payload: data
    }
}

export const addToStreak = () => {
    let data = axios
        .post('/api/addstreak')
        .then(res => res.data)
        .catch(err => console.log(`Unable to add to streak`, err))
    console.log(data)
    return {
        type: ADD_STREAK_SCORE,
        payload: data
    }
}
export const removeStreak = () => {
    let data = axios
        .post('/api/removestreak')
        .then(res => res.data)
        .catch(err => console.log('Unable to remove streak', err))
    return {
        type: REMOVE_STREAK_SCORE,
        payload: data
    }
}

export const getUserScores = () => {
    let data = axios.post('/api/userscores').then(res => res.data)
    return {
        type: GET_SCORES,
        payload: data
    }
}

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
                currentLevel: payload.level,
                scoreStreak: payload.level,
                redirect: false,
                error: false
            };
        case LOGIN + '_REJECTED':
            return { ...state, error: payload }
        case LOGOUT + '_FULFILLED':
            return { ...state, user: {}, redirect: true, error: false }
        case SIGNUP + '_FULFILLED':
            return {
                ...state,
                redirect: false,
                user: payload,
                error: false
            };
        case SIGNUP + '_REJECTED':
            return { ...state, error: payload }
        case GET_USER + '_PENDING':
            return { ...state, redirect: false, error: false }
        case GET_USER + '_FULFILLED':
            return { ...state, user: payload, error: false }
        case GET_USER + '_REJECTED':
            return { ...state, redirect: true, error: payload }
        case GET_SCORES + '_FULFILLED':
            return {
                ...state,
                currentLevel: payload[0].level,
                scoreStreak: payload[0].score_streak,
                error: false
            }
        case INCREASE_LEVEL + '_FULFILLED':
            return { ...state, currentLevel: payload[0].level, error: false }
        case ADD_STREAK_SCORE + '_FULFILLED':
            return { ...state, scoreStreak: payload[0].score_streak, error: false }
        case REMOVE_STREAK_SCORE + '_FULFILLED':
            return { ...state, scoreStreak: payload[0].score_streak, error: false }

        default:
            return state;
    }
}
