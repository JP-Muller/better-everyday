import axios from 'axios'
import { ADD_TASKS, ADD_ENTRY, ADD_IMAGE, ADD_DATE, GET_POSTS, SAVE_POST, EDIT_POST, DELETE_POST } from './actionTypes'

const initialState = {
    initialTasks: [],
    completedTasks: [],
    imageOfDay: 'https://fsmedia.imgix.net/05/a9/aa/5c/261b/4afa/a99c/ac32c5c1b81e/vault-boy.png?rect=0%2C120%2C1116%2C558&auto=format%2Ccompress&dpr=2&w=650',
    entry: '',
    date: '',
    task1: '',
    task2: '',
    task3: '',
    task4: '',
    task5: '',
    loading: false,
    error: false

}

//DB

export function getPosts(userId) {
    let data = axios.get(`/api/posts/${userId}`).then(res => res.data);
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

export function editPost(postId, newTitle, newContent) {
    let data = axios
        .put(`/api/posts/edit/${postId}`, { newTitle, newContent })
        .then(res => res.data);
    return {
        type: EDIT_POST,
        payload: data
    };
}

export function savePost(task1, task2, task3, task4, task5, entry, date, imageOfDay) {
    let data = axios.post(`/api/posts`, { task1, task2, task3, task4, task5, entry, date, imageOfDay }).then(res => res.data);
    return {
        type: SAVE_POST,
        payload: data
    };
}




// saving state
export const saveTasks = (taskArray) => {
    let data = [...taskArray]
    console.log('Saved Checked Tasks to Store')
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

export default function (state = initialState, action) {
    let { type, payload } = action
    console.log('action:', action)
    switch (type) {
        case ADD_TASKS:
            console.log(payload)
            return { ...state, completedTasks: payload, loading: false }
        // case ADD_TASKS + 'PENDING':
        //     return { ...state, loading: true }
        // case ADD_TASKS + 'REJECTED':
        //     return { ...state, error: payload }
        case ADD_ENTRY:
            return { ...state, entry: payload }
        // case ADD_ENTRY + 'PENDING':
        //     return { ...state, loading: true }
        // case ADD_ENTRY + 'REJECTED':
        //     return { ...state, error: payload }
        case ADD_IMAGE:
            return { ...state, imageOfDay: payload, loading: false }
        // case ADD_IMAGE + 'PENDING':
        //     return { ...state, loading: true }
        // case ADD_IMAGE + 'REJECTED':
        //     return { ...state, error: payload }
        case ADD_DATE:
            return { ...state, date: payload, loading: false }

        default:
            return state
    }
}