import axios from "axios";

export function fetchAllSubjects(){
    return {
        type: 'FETCH_ALL_SUBJECTS',
        payload: axios.get("/api/subject/all")
    }
}