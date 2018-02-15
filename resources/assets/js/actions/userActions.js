import axios from "axios";

export function registerUser(user) {
    return {
        type: 'USER_REGISTRATION',
        payload: axios.post('/register', user)
    }
}

export function loginUser(user) {
    return {
        type: 'USER_LOGIN',
        payload: axios.post('/login', user)
    }
}

export function logoutUser() {
    return {
        type: 'USER_LOGOUT',
        payload: axios.post('/logout')
    }
}

export function resumeSession() {
    return {
        type: 'RESUME_SESSION',
        payload: axios.post('/resumeSession')
    }
}