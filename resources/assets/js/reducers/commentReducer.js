export default function reducer(state={
    byId: {},
    allIds: [],
    fetching: false,
    fetched: false,
    error: null
}, action) {
    switch (action.type) {
        case "CREATE_COMMENT_PENDING": {
            return {...state, fetching: true, fetched: false}
        }
        case "CREATE_COMMENT_FULFILLED": {

            let comment = action.payload.data.data.comment;
            let commentId = comment.id;

            return {
                ...state,
                byId: {
                    ...state.byId,
                    [commentId]: comment
                },
                allIds: [...state.allIds, commentId],
                fetching: false,
                fetched: true
            }

        }
        case "CREATE_COMMENT_REJECTED": {
            return {...state, fetching: false, fetched: false}
        }
        case "FETCH_COMMENTS_PENDING": {
            return {...state, fetching: true, fetched: false}
        }
        case "FETCH_COMMENTS_FULFILLED": {

            const fetchedComments = {};
            const commentIds = [];

            for (const comment of action.payload.data.data.comments) {
                fetchedComments[comment.id] = comment;
                commentIds.push(comment.id);
            }

            return {
                ...state,
                byId: {
                    ...state.byId,
                    ...fetchedComments
                },
                allIds: [...state.allIds].concat(commentIds.filter(id => !state.allIds.includes(id))),
                fetched: true,
                fetching: false
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
