import axios from "axios";

export function createResource(resource){
    return {
        type: 'CREATE_RESOURCE',
        payload: axios.post("/api/resource", resource)
    }
}

export function fetchResources(subjectId){
    return {
        type: 'FETCH_RESOURCES',
        payload: axios.get("/api/subject/" + subjectId + "/resources")
    }
}