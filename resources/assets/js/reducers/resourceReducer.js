export default function reducer(state={
    byId: {},
    allIds: [],
    searchIds: [],
    fetching: false,
    fetched: false,
    error: null
}, action) {
    switch (action.type) {
        case "CREATE_RESOURCE_PENDING": {
            return {...state, fetching: true, fetched: false}
        }
        case "CREATE_RESOURCE_FULFILLED": {

            let resource = action.payload.data.data;
            let resourceId = resource.id;

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
        case "CREATE_RESOURCE_REJECTED": {
            return {...state, fetching: false, fetched: false}
        }
        case "FETCH_SUBJECT_PENDING": {
            return {...state, fetching: true, fetched: false}
        }
        case "FETCH_SUBJECT_FULFILLED": {

            const fetchedResources = {};
            const resourceIds = [];

            for (const resource of action.payload.data.data.resources) {
                fetchedResources[resource.id] = resource;
                resourceIds.push(resource.id);
            }

            return {
                ...state,
                byId: {
                    ...state.byId,
                    ...fetchedResources
                },
                allIds: [...state.allIds].concat(resourceIds.filter(id => !state.allIds.includes(id))),
                fetched: true,
                fetching: false
            }

        }
        case "FETCH_SUBJECT_REJECTED": {
            return {...state, fetching: false, fetched: false}
        }
        case "FETCH_RESOURCE_PENDING": {
            return {...state, fetching: true, fetched: false}
        }
        case "FETCH_RESOURCE_FULFILLED": {

            const commentIds = [];
            const comments = action.payload.data.data.comments;

            for (const comment of comments) {
                commentIds.push(comment.id);
            }

            let resource = action.payload.data.data.resource;
            const newIds = [...state.allIds];

            if(!state.allIds.includes(resource.id)){
                newIds.push(resource.id);
            }

            resource = {...resource, "comments": commentIds};

            return {
                ...state,
                byId: {
                    ...state.byId,
                    [resource.id]: resource
                },
                allIds: newIds,
                fetched: true,
                fetching: false
            }

        }
        case "FETCH_RESOURCE_REJECTED": {
            return {...state, fetching: false, fetched: false}
        }
        case "RATE_RESOURCE_FULFILLED": {

            const resource = action.payload.data.data;
            const newIds = [...state.allIds];

            if(!state.allIds.includes(resource.id)){
                newIds.push(resource.id);
            }

            return {
                ...state,
                byId: {
                    ...state.byId,
                    [resource.id]: resource
                },
                allIds: newIds,
                fetched: true,
                fetching: false
            }

        }
        case "SEARCH_RESOURCE_FULFILLED": {

            const fetchedResources = {};
            const resourceIds = [];

            for (const resource of action.payload.data.data) {
                fetchedResources[resource.id] = resource;
                resourceIds.push(resource.id);
            }

            return {
                ...state,
                byId: {
                    ...state.byId,
                    ...fetchedResources
                },
                allIds: [...state.allIds].concat(resourceIds.filter(id => !state.allIds.includes(id))),
                searchIds: resourceIds,
                fetched: true,
                fetching: false
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
