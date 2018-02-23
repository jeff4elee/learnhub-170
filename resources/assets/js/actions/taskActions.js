import axios from "axios";

export function addResourceAsTask(resourceId) {
    return {
        type: 'CREATE_TASK',
        payload: axios.post("/api/task", {"resource_id": resourceId})
    }
}

export function fetchAllTasks() {
    return {
        type: 'FETCH_ALL_TASKS',
        payload: axios.get("/api/task/all")
    }
}

export function toggleTask(taskId){
    return {
        type: 'TOGGLE_TASK',
        payload: axios.get("/api/task/" + taskId + "/toggle")
    }
}