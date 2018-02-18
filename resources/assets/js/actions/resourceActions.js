import axios from "axios";

export function createResource(resource) {
    return {
        type: 'CREATE_RESOURCE',
        payload: axios.post("/api/resource", resource)
    }
}

export function fetchResource(resource_id) {
    return {
        type: 'FETCH_RESOURCE',
        payload: axios.get("/api/resource/" + resource_id)
    }
}

export function rateResource(ratingData) {

    const resourceId = ratingData.resource_id;

    return {
        type: 'RATE_RESOURCE',
        payload: axios.post("/api/resource/" + resourceId + "/rate", ratingData)
    }

}