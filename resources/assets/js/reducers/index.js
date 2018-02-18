import storage from 'redux-persist/es/storage';
import { persistCombineReducers } from 'redux-persist'
import example from './exampleReducer'
import subjects from './subjectReducer'
import resources from './resourceReducer'
import auth from './authReducer'
import users from './userReducer'
import tasks from './taskReducer'

const config = {
    key: 'root',
    storage,
};

//combines all the reducers into one
export default persistCombineReducers(config, {
    example,
    subjects,
    resources,
    auth,
    users,
    tasks
})