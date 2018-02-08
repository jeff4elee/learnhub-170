import storage from 'redux-persist/es/storage';
import { persistCombineReducers } from 'redux-persist'
import example from './exampleReducer'
import subject from './subjectReducer'
import resource from './resourceReducer'

const config = {
    key: 'root',
    storage,
};

//combines all the reducers into one
export default persistCombineReducers(config, {
    example,
    subject,
    resource
})