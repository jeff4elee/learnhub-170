export default function reducer(state={
    byId: {},
    allIds: [],
    fetching: false,
    fetched: false,
    error: null
}, action) {
    switch (action.type) {
        case "FETCH_ALL_SUBJECTS_PENDING": {
            return {...state, fetching: true, fetched: false}
        }
        case "FETCH_ALL_SUBJECTS_FULFILLED": {

            const fetchedSubjects = {};
            const subjectIds = [];

            for (const subject of action.payload.data.data) {
                fetchedSubjects[subject.id] = subject;
                subjectIds.push(subject.id);
            }

            return {
                ...state,
                byId: {
                    ...state.byId,
                    ...fetchedSubjects
                },
                allIds: [...state.allIds].concat(subjectIds.filter(id => !state.allIds.includes(id))),
                fetched: true,
                fetching: false
            }

        }
        case "FETCH_ALL_SUBJECTS_REJECTED": {
            return {...state, fetching: false, fetched: false}
        }
        case "STORE::RESET": {

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
