import axios from 'axios';
import { LOGIN, LOGOUT, SIGNUP, GET_USER, ADD_STREAK_SCORE, REMOVE_STREAK_SCORE, INCREASE_LEVEL, GET_SCORES, STREAK_BLOCK_ON, REMOVE_STREAK_BLOCK, ADMIN_GET_ALL, UPDATE_PROFILE_IMAGE, POSTED_TODAY_ON, POSTED_TODAY_OFF, CHANGE_ACTIVITY } from './actionTypes';

const initialState = {
    user: {},
    redirect: false,
    error: false,
    posted: null,
    currentLevel: '',
    currentXp: '',
    scoreStreak: '',
    streakAddedToday: false,
    highestStreak: null,
    allPosts: {}

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

export const updateProfileImage = (newProfileImage) => {
    let data = axios
        .put('/api/userimage', { newProfileImage })
        .then(res => res.data)
        .catch(err => console.log(`Couldn't update profile pic`, err))
    return {
        type: UPDATE_PROFILE_IMAGE,
        payload: data
    }
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

export const addToStreak = (date) => {
    let data = axios
        .post('/api/addstreak', { date })
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

export const changeActivity = (today) => {
    let data = axios
        .post('/api/changeactivity', { today })
        .then(res => res.data)
        .catch(err => console.log(`Couldn't change activity`, err))
    console.log('CHANGED ACTIVITY')
    return {
        type: CHANGE_ACTIVITY,
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
export const streakBlockerOn = () => {
    let data = axios.get('/api/streakblockeron').then(res => res.data)
    console.log('Streak block on')
    return {
        type: STREAK_BLOCK_ON,
        payload: data
    }
}
export const removeStreakBlocker = () => {
    let data = axios.post('/api/streakblockeroff').then(res => res.data)
    console.log('Removed Streak block')
    return {
        type: REMOVE_STREAK_BLOCK,
        payload: data
    }
}
export const adminGetAllPosts = () => {
    let data = axios.get('/api/admingetall').then(res => res.data)
    console.log('allposts for admin:', data);
    return {
        type: ADMIN_GET_ALL,
        payload: data
    }
}
export const postedTodayOn = () => {
    let data = axios.post('/api/postedtodayon').then(res => res.data)
    console.log('POSTED TODAY ON!')
    return {
        type: POSTED_TODAY_ON,
        payload: data
    }
}
export const postedTodayOff = () => {
    let data = axios.post('/api/postedtodayoff').then(res => res.data)
    return {
        type: POSTED_TODAY_OFF,
        payload: data
    }
}
export default function (state = initialState, action) {
    let { type, payload } = action;
    let date = new Date().toDateString()
    switch (type) {
        case LOGIN + '_FULFILLED':
            return {
                ...state,
                user: payload,
                currentLevel: payload.level,
                scoreStreak: payload.score_streak,
                currentXp: payload.xp,
                redirect: false,
                error: false
            };
        case LOGIN + '_REJECTED':
            return { ...state, error: payload }
        case LOGOUT + '_FULFILLED':
            return { ...state, user: {}, currentLevel: '', scoreStreak: '', currentXp: '', streakAddedToday: false, redirect: true, error: false }
        case SIGNUP + '_FULFILLED':
            return {
                ...state,
                redirect: false,
                // user: payload,
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
                streakAddedToday: payload[0].posted_today,
                highestStreak: payload[0].highest_streak,
                currentXp: payload[0].xp,
                error: false
            }
        case INCREASE_LEVEL + '_FULFILLED':
            return { ...state, currentLevel: payload[0].level, currentXp: payload[0].xp, error: false }
        case ADD_STREAK_SCORE + '_FULFILLED':
            return { ...state, scoreStreak: payload[0].score_streak, highestStreak: payload[0].highest_streak, streakAddedToday: true, error: false }
        case REMOVE_STREAK_SCORE + '_FULFILLED':
            return { ...state, scoreStreak: payload[0].score_streak, error: false }
        case REMOVE_STREAK_BLOCK + '_FULFILLED':
            return { ...state, error: false }
        case ADMIN_GET_ALL + '_FULFILLED':
            return { ...state, allPosts: payload, error: false }
        case UPDATE_PROFILE_IMAGE + '_FULFILLED':
            return { ...state, user: payload, error: false }
        case POSTED_TODAY_ON + '_FULFILLED':
            return { ...state, posted: payload[0].posted_today, error: false }
        case POSTED_TODAY_OFF + '_FULFILLED':
            return { ...state, posted: payload[0].posted_today, error: false }
        default:
            return state;
    }
}
