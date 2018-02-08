import axios from "axios";

export function sendExampleAction(){
    return {
        type: 'EXAMPLE_ACTION',
        payload: axios.get("/api/example")
    }
}