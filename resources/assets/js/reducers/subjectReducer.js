export default function reducer(state={
    byId: {},
    allIds: [],
    searchIds: [],
    fetching: false,
    fetched: false,
    error: null
}, action) {
    switch (action.type) {
        case "FETCH_ALL_SUBJECTS_PENDING": {
            return {...state, fetching: true, fetched: false}
        }
        case "FETCH_FEED_FULFILLED": {

            const fetchedSubjects = {};
            const subjectIds = [];

            for (const subject of action.payload.data.data.subjects) {
                fetchedSubjects[subject.id] = subject;
                fetchedSubjects[subject.id]["resources"] = [];
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
        case "FETCH_ALL_SUBJECTS_FULFILLED": {

            const fetchedSubjects = {};
            const subjectIds = [];

            for (const subject of action.payload.data.data.subjects) {
                fetchedSubjects[subject.id] = subject;
                fetchedSubjects[subject.id]["resources"] = [];
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
        case "FETCH_RESOURCE_FULFILLED": {

            let subject = action.payload.data.data.subject;
            const newIds = [...state.allIds];

            if(!state.allIds.includes(subject.id)){
                newIds.push(subject.id);
            }

            return {
                ...state,
                byId: {
                    ...state.byId,
                    [subject.id]: subject
                },
                allIds: newIds,
            }

        }
        case "FETCH_SUBJECT_FULFILLED": {

            const resourceIds = [];

            const resources = action.payload.data.data.resources;
            let subject = action.payload.data.data.subject;

            for (const resource of resources) {
                resourceIds.push(resource.id);
            }

            subject = {...subject, "resources": resourceIds};

            const newIds = [...state.allIds];
            if (!state.allIds.includes(subject.id)) {
                newIds.push(subject.id);
            }

            return {
                ...state,
                byId: {
                    ...state.byId,
                    [subject.id]: subject
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
                    [subject.id]: {...state.byId[subject.id], subscribed: subject.subscribed}
                },
                fetched: true,
                fetching: false
            }

        }
        case "SEARCH_FULFILLED": {

            const fetchedSubjects = {};
            const subjectIds = [];

            for (const subject of action.payload.data.data.subjects) {
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
                searchIds: subjectIds,
                fetched: true,
                fetching: false
            }

        }
        case "FETCH_OWNED_RESOURCES_FULFILLED":
        case "FETCH_POPULAR_FULFILLED": {

            const fetchedSubjects = {};
            const subjectIds = [];

            for (const subject of action.payload.data.data.subjects) {
                fetchedSubjects[subject.id] = subject;
                fetchedSubjects[subject.id]["resources"] = [];
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
        case "DELETE_RESOURCE_FULFILLED": {

            const resourceId = action.payload.data.data.resource.id;
            const subjectId = action.payload.data.data.subject.id;

            return {
                ...state,
                byId: {
                    ...state.byId,
                    [subjectId]: {
                        ...state.byId[subjectId],
                        resources: state.byId[subjectId].resources.filter(key => key !== resourceId)
                    }
                },
            }

        }
        case "STORE::RESET_FULFILLED": {

            return {
                byId: {},
                allIds: [],
                searchIds: [],
                fetching: false,
                fetched: false,
                error: null
            }

        }

        default:
    }
    return state;
}
