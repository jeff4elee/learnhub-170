export default function reducer(state={
    byId: {},
    allIds: [],
    searchIds: [],
    feedIds: [],
    myIds: [],
    fetching: false,
    fetched: false,
    fetchedOwn: false,
    feedUrl: null,
    error: null
}, action) {
    switch (action.type) {
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
                myIds: [...state.myIds, resourceId],
            }
        }
        case "FETCH_FEED_FULFILLED": {

            const resourceData = action.payload.data.data.resources;
            const fetchedResources = {};
            const resourceIds = [];

            for (const resource of resourceData.data) {
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
                feedIds: [...state.feedIds].concat(resourceIds.filter(id => !state.feedIds.includes(id))),
                feedUrl: resourceData.next_page_url,
            }

        }
        case "FETCH_ALL_TASKS_FULFILLED":
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
            }

        }
        case "FETCH_RESOURCE_FULFILLED": {

            let resource = action.payload.data.data.resource;
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
            }

        }
        case "FETCH_COMMENTS_FULFILLED": {


            const commentIds = [];
            const comments = action.payload.data.data.comments;
            const resource = action.payload.data.data.resource;

            for (const comment of comments) {
                commentIds.push(comment.id);
            }

            const newIds = [...state.allIds];

            if(!state.allIds.includes(resource.id)){
                newIds.push(resource.id);
            }

            return {
                ...state,
                byId: {
                    ...state.byId,
                    [resource.id] : {...resource, "comments": commentIds}
                },
                allIds: newIds,
            }

        }
        case "CREATE_COMMENT_FULFILLED": {

            let comment = action.payload.data.data.comment;
            let resource = action.payload.data.data.resource;
            let commentId = comment.id;

            return {
                ...state,
                byId: {
                    ...state.byId,
                    [resource.id]: {...resource, comments: [...state.byId[resource.id].comments, commentId]}
                },
            }

        }
        case "RATE_RESOURCE_FULFILLED": {

            const resource = action.payload.data.data.resource;
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
            }

        }
        case "SEARCH_FULFILLED": {

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
                searchIds: resourceIds,
            }

        }
        case "FETCH_POPULAR_FULFILLED": {
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
            }

        }
        case "FETCH_OWNED_RESOURCES_FULFILLED": {
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
                myIds: resourceIds,
                fetchedOwn: true
            }
        }
        case "DELETE_RESOURCE_FULFILLED":{

            const resourceId = action.payload.data.data;

            let keys = Object.keys(state.byId).filter(key => parseInt(key) !== resourceId);

            let newByIds = {};

            for(const key of keys){
                newByIds[parseInt(key)] = state.byId[parseInt(key)];
            }

            return {
                ...state,
                byId: newByIds,
                allIds: state.allIds.filter(id => id !== resourceId),
                myIds: state.myIds.filter(id => id !== resourceId),
                fetchedOwn: true
            }

        }
        case "STORE::RESET_FULFILLED": {

            return {
                byId: {},
                allIds: [],
                searchIds: [],
                feedIds: [],
                myIds: [],
                fetching: false,
                fetched: false,
                fetchedOwn: false,
                feedUrl: null,
                error: null
            }

        }

        default:
    }
    return state;
}
