export default function reducer(state={
    byId: {},
    allIds: [],
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
