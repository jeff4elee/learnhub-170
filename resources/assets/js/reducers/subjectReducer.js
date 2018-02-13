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
        case "FETCH_SUBJECT_PENDING": {
            return {...state, fetching: true, fetched: false}
        }

        case "FETCH_SUBJECT_FULFILLED": {

            let resource = action.payload.data.data;
            let resourceId = resource.id;

            if(state.allIds.length !== 0){
                nextId = state.allIds.reduce(function(a, b) {
                    return Math.max(a, b);
                }) + 1;
            }

            return {
                ...state,
                byId: {
                    ...state.byId,
                    [resourceId]: resource
                },
                allIds: [...state.allIds, resourceId],
                fetching: false,
                fetched: true}
        }
        case "FETCH_SUBJECT_REJECTED": {
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
