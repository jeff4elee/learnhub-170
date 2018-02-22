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
