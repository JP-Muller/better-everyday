import axios from 'axios'
import { ADD_TASKS, ADD_ENTRY, ADD_IMAGE, ADD_DATE, ADD_MOOD, REMOVE_MOOD, GET_POSTS, SAVE_POST, EDIT_POST, DELETE_POST, EDIT_IMAGE, EDIT_ENTRY, POST_VIEW_TOGGLE, CHANGE_POST_PRIVATE, CHANGE_POST_PUBLIC, GET_PUBLIC_POSTS, CLEAR_STATE } from './actionTypes'

const initialState = {
    initialTasks: [],
    completedTasks: [],
    imageOfDay: 'https://media.tenor.com/images/210681d6ca7aaa4bfde14c3579b8b94d/tenor.gif',
    entry: '',
    date: '',
    task1: '',
    task2: '',
    task3: '',
    task4: '',
    task5: '',
    mood: '',
    loading: false,
    error: false,
    posts: [],
    totalPosts: null,
    postViewToggled: false,
    publicPosts: {},

}

//DB

export function getPosts(userId) {
    let data = axios.get(`/api/posts/${userId}`).then(res => res.data);
    console.log('ksahdkhasdkhgdask', userId, data)
    return {
        type: GET_POSTS,
        payload: data
    };
}

export function deletePost(postId) {
    let data = axios.delete(`/api/posts/${postId}`).then(res => res.data);
    return {
        type: DELETE_POST,
        payload: data
    };
}

export function editPost(postId, newEntry, newImage, newTask1, newTask2, newTask3, newTask4, newTask5) {
    let data = axios
        .put(`/api/posts/edit/${postId}`, { newEntry, newImage, newTask1, newTask2, newTask3, newTask4, newTask5 })
        .then(res => res.data);
    return {
        type: EDIT_POST,
        payload: data
    };
}

export function editPostImage(postId, newImage) {
    let data = axios
        .put(`/api/editImage/${postId}`, { newImage })
        .then(res => res.data)
    return {
        type: EDIT_IMAGE,
        payload: data
    }
}
export function editPostEntry(postId, newEntry) {
    let data = axios
        .put(`/api/editEntry/${postId}`, { newEntry })
        .then(res => res.data)
    return {
        type: EDIT_ENTRY,
        payload: data
    }
}

export function savePost(task1, task2, task3, task4, task5, entry, date, imageOfDay, mood) {
    let data = axios.post(`/api/posts`, { task1, task2, task3, task4, task5, entry, date, imageOfDay, mood }).then(res => res.data);
    return {
        type: SAVE_POST,
        payload: data
    };
}
export function togglePostView() {
    return {
        type: POST_VIEW_TOGGLE
    }
}
export const getAllPublicPosts = () => {
    let data = axios.get('/api/getallpublic').then(res => res.data)
    console.log('all public posts:', data)
    return {
        type: GET_PUBLIC_POSTS,
        payload: data
    }
}
export const clearPostState = () => {
    return {
        type: CLEAR_STATE
    }
}

export function setPostPrivate(postId) {
    let data = axios.put(`/api/setprivate/${postId}`).then(res => res.data)
    console.log('SET POST PRIVATE')
    return {
        type: CHANGE_POST_PRIVATE,
        payload: data
    }
}
export function setPostPublic(postId) {
    let data = axios.put(`/api/setpublic/${postId}`).then(res => res.data)
    console.log('SET POST PUBLIC')
    return {
        type: CHANGE_POST_PUBLIC,
        payload: data
    }
}





// saving state
export const saveTasks = (taskArray) => {
    let data = taskArray.filter(obj => obj.checked === true)
    console.log('Saved Checked Tasks to Store:', data)
    return {
        type: ADD_TASKS,
        payload: data
    }
}

export const saveEntry = (str) => {
    let data = str
    return {
        type: ADD_ENTRY,
        payload: data
    }
}

export const saveImageOfDay = (str) => {
    let data = str
    return {
        type: ADD_IMAGE,
        payload: data
    }
}

export const savePostDate = (str) => {
    let data = str
    return {
        type: ADD_DATE,
        payload: data
    }
}

export const saveTodaysMood = (selectedMood) => {
    let data = selectedMood
    console.log('SELECTED MOOD:', selectedMood);

    return {
        type: ADD_MOOD,
        payload: data
    }
}

export const removeMood = () => {
    console.log('Mood Deselected');
    return {
        type: REMOVE_MOOD
    }
}

export const wipeState = () => {

}

export default function (state = initialState, action) {
    let { type, payload } = action
    // console.log('action:', action)
    switch (type) {
        case ADD_TASKS:
            return { ...state, completedTasks: payload, loading: false }
        case ADD_ENTRY:
            return { ...state, entry: payload }
        case ADD_IMAGE:
            return { ...state, imageOfDay: payload, loading: false }
        case ADD_DATE:
            return { ...state, date: payload, loading: false }
        case ADD_MOOD:
            return { ...state, mood: payload, loading: false }
        case REMOVE_MOOD:
            return { ...state, mood: '', loading: false }
        case POST_VIEW_TOGGLE:
            let { postViewToggled } = initialState
            return { ...state, postViewToggled: !postViewToggled, loading: false }

        case SAVE_POST + '_FULFILLED':
            console.log('save posts payload:', payload)
            return {
                ...state,
                posts: payload,
                completedTasks: [],
                imageOfDay: 'https://media.tenor.com/images/210681d6ca7aaa4bfde14c3579b8b94d/tenor.gif',
                entry: '',
                date: '',
                task1: '',
                task2: '',
                task3: '',
                task4: '',
                task5: '',
                mood: ''
            };
        case GET_POSTS + '_FULFILLED':
            console.log('get posts payload:', payload)
            return { ...state, posts: payload, totalPosts: payload.length, error: false };
        case GET_PUBLIC_POSTS + '_FULFILLED':
            return { ...state, publicPosts: payload, error: false }
        case GET_POSTS + '_REJECTED':
            return { ...state, error: payload };
        case EDIT_IMAGE + '_FULFILLED':
            return { ...state, posts: payload };
        case EDIT_ENTRY + '_FULFILLED':
            return { ...state, posts: payload }
        case EDIT_POST + '_FULFILLED':
            return { ...state, posts: payload };
        case DELETE_POST + '_FULFILLED':
            console.log('delete payload:', payload)
            return { ...state, posts: payload };
        case CHANGE_POST_PUBLIC + '_FULFILLED':
            return { ...state, posts: payload }
        case CHANGE_POST_PRIVATE + '_FULFILLED':
            return { ...state, posts: payload }
        case CLEAR_STATE:
            return { ...state, posts: [], totalPosts: '', postViewToggled: false }
        default:
            return state
    }
}