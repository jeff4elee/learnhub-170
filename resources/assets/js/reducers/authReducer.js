export default function reducer(state={
    user: null,
    fetching: false,
    fetched: false,
    registrationError: null,
    loginError: null
}, action) {
    switch (action.type) {
        case "USER_REGISTRATION_PENDING": {
            return {...state, fetching: true}
        }
        case "USER_REGISTRATION_REJECTED": {
            return {...state, fetching: false, registrationError: action.payload.response.data.errors}
        }
        case "USER_REGISTRATION_FULFILLED": {
            return {
                ...state,
                fetched: true,
                fetching: false
            }
        }
        case "USER_LOGIN_PENDING": {
            return {...state, fetching: true}
        }
        case "USER_LOGIN_REJECTED": {
            return {...state, fetching: false, loginError: action.payload.response.data.errors}
        }
        case "USER_LOGIN_FULFILLED": {
            //     axios.defaults.headers.common['Authorization'] = 'bearer ' + action.payload.data.data.token;
            return {
                ...state,
                fetched: true,
                fetching: false,
                user: action.payload.data.data,
            }
        }
        case "USER_LOGOUT_PENDING": {
            return {...state, fetching: true}
        }
        case "USER_LOGOUT_REJECTED": {
            return {...state, fetching: false, error: action.payloa}
        }
        case "USER_LOGOUT_FULFILLED": {
            return {
                ...state,
                fetched: true,
                fetching: false,
                user: null,
                registrationError: null,
                loginError: null
            }
        }
        case "RESUME_SESSION_FULFILLED": {
            return {
                ...state,
                user: action.payload.data.data
            }
        }
        case "RESUME_SESSION_REJECTED": {
            return {
                ...state,
                user: action.payload.response.data.data
            }
        }
        case "STORE::RESET_FULFILLED": {

            return {
                user: null,
                fetching: false,
                fetched: false,
                registrationError: null,
                loginError: null
            }

        }
        default:
    }
    return state;
}
