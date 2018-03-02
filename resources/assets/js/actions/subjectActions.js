import axios from "axios";

export function fetchAllSubjects(){
    return {
        type: 'FETCH_ALL_SUBJECTS',
        payload: axios.get("/api/subject/all")
    }
}

export function fetchSubject(subjectId){
    return {
        type: 'FETCH_SUBJECT',
        payload: axios.get("/api/subject/" + subjectId)
    }
}

export function toggleSubscription(subjectId){
    return {
        type: 'TOGGLE_SUBSCRIPTION',
        payload: axios.get("/api/subject/" + subjectId + "/toggle_subscription")
    }
}

export function search(searchTerm) {
    return {
        type: 'SEARCH',
        payload: axios.get("/api/search/" + searchTerm)
    }
}

export function fetchPopular(){
    return {
        type: 'FETCH_POPULAR',
        payload: axios.get("/api/popular")
    }
}