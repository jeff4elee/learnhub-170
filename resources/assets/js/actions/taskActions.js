import axios from "axios";

export function addResourceAsTask(resource_id) {
    return {
        type: 'CREATE_TASK',
        payload: axios.post("/api/task", {"resource_id": resource_id})
    }
}

export function fetchAllTasks() {
    return {
        type: 'FETCH_ALL_TASKS',
        payload: axios.get("/api/task/all")
    }
}