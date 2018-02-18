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
                    ...fetchedSubjects
                },
                allIds: subjectIds,
                fetched: true,
                fetching: false
            }

        }
        case "FETCH_ALL_SUBJECTS_REJECTED": {
            return {...state, fetching: false, fetched: false}
        }
        case "FETCH_SUBJECT_FULFILLED": {

            const resourceIds = [];

            const resources = action.payload.data.data.resources;
            const subjectId = action.payload.data.data.subject_id;

            for (const resource of resources) {
                resourceIds.push(resource.id);
            }

            const subject = {...state.byId[subjectId], "resources": resourceIds};

            const newIds = [...state.allIds];
            if (!state.allIds.includes(subjectId)) {
                newIds.push(subjectId);
            }

            return {
                ...state,
                byId: {
                    ...state.byId,
                    [subjectId]: subject
                },
                allIds: newIds,
                fetched: true,
                fetching: false
            }

        }
        case "TOGGLE_SUBSCRIPTION_FULFILLED": {

            const subject = action.payload.data.data;

            return {
                ...state,
                byId: {
                    ...state.byId,
                    [subject.id]: subject
                },
                fetched: true,
                fetching: false
            }
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
