export default function reducer(state={
    byId: {},
    allIds: [],
    fetching: false,
    fetched: false,
    error: null
}, action) {
    switch (action.type) {
        case "FETCH_SUBJECT_PENDING": {
            return {...state, fetching: true, fetched: false}
        }

        case "FETCH_SUBJECT_FULFILLED": {

            const fetchedUsers = {};
            const userIds = [];

            for (const user of action.payload.data.data.users) {
                fetchedUsers[user.id] = user;
                userIds.push(user.id);
            }

            return {
                ...state,
                byId: {
                    ...state.byId,
                    ...fetchedUsers
                },
                allIds: [...state.allIds].concat(userIds.filter(id => !state.allIds.includes(id))),
                fetched: true,
                fetching: false
            }

        }
        case "FETCH_SUBJECT_REJECTED": {
            return {...state, fetching: false, fetched: false}
        }
        case "FETCH_COMMENTS_FULFILLED": {

            const fetchedUsers = {};
            const userIds = [];

            for (const user of action.payload.data.data.users) {
                fetchedUsers[user.id] = user;
                if(!userIds.includes(user.id)) {
                    userIds.push(user.id);
                }
            }

            return {
                ...state,
                byId: {
                    ...state.byId,
                    ...fetchedUsers
                },
                allIds: [...state.allIds].concat(userIds.filter(id => !state.allIds.includes(id))),
                fetched: true,
                fetching: false
            }

        }
        case "USER_LOGIN_FULFILLED": {
            const user = action.payload.data.data;
            let newIds = [...state.allIds];
            if(!newIds.includes(user.id)){
                newIds.push(user.id);
            }
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [user.id]: user
                },
                allIds: newIds,
                fetched: true,
                fetching: false,
            }
        }
        case "STORE::RESET_FULFILLED": {

            return {
                byId: {},
                allIds: [],
                fetching: false,
                fetched: false,
                error: null
            }

        }

        default:
    }
    return state;
}
