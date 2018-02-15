import axios from "axios";

export function createResource(resource){
    return {
        type: 'CREATE_RESOURCE',
        payload: axios.post("/api/resource", resource)
    }
}