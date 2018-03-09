export default function reducer(state = {
    byId: {},
    allIds: [],
    fetching: false,
    fetched: false,
    error: null
}, action) {
    switch (action.type) {
        case "CREATE_TASK_PENDING": {
            return {...state, fetching: true, fetched: false}
        }
        case "CREATE_TASK_FULFILLED": {

            let task = action.payload.data.data;

            let newIds = [...state.allIds];

            if (!newIds.includes(task.id)) {
                newIds.push(task.id);
            }

            return {
                ...state,
                byId: {
                    ...state.byId,
                    [task.id]: task
                },
                allIds: newIds,
                fetching: false,
                fetched: true
            }
        }
        case "CREATE_TASK_REJECTED": {
            return {...state, fetching: false, fetched: false}
        }
        case "FETCH_ALL_TASKS_PENDING": {
            return {...state, fetching: true, fetched: false}
        }
        case "FETCH_ALL_TASKS_FULFILLED": {

            const fetchedTasks = {};
            const taskIds = [];

            for (const task of action.payload.data.data.tasks) {
                fetchedTasks[task.id] = task;
                taskIds.push(task.id);
            }

            return {
                ...state,
                byId: {
                    ...fetchedTasks
                },
                allIds: taskIds,
                fetched: true,
                fetching: false
            }

        }
        case "FETCH_ALL_TASKS_REJECTED": {
            return {...state, fetching: false, fetched: false}
        }
        case "TOGGLE_TASK_FULFILLED": {
            let task = action.payload.data.data;

            let newIds = [...state.allIds];

            if (!newIds.includes(task.id)) {
                newIds.push(task.id);
            }

            return {
                ...state,
                byId: {
                    ...state.byId,
                    [task.id]: task
                },
                allIds: newIds,
                fetching: false,
                fetched: true
            }
        }
        case "DELETE_RESOURCE_FULFILLED":{

            const resourceId = action.payload.data.data.resource.id;

            let keys = Object.keys(state.byId).filter(key => state.byId[key].resource_id !== resourceId);

            let newByIds = {};

            for(const key of keys){
                newByIds[parseInt(key)] = state.byId[parseInt(key)];
            }

            return {
                ...state,
                byId: newByIds,
                allIds: state.allIds.filter(id => state.byId[id].resource_id !== resourceId),
            }

        }
        case "DELETE_TASK_FULFILLED":{

            const taskId = action.payload.data.data.task.id;

            let keys = Object.keys(state.byId).filter(key => parseInt(key) !== taskId).map(key => parseInt(key));

            let newByIds = {};

            for (const key of keys) {
                newByIds[key] = state.byId[key];
            }

            return {
                ...state,
                byId: newByIds,
                allIds: keys,
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
