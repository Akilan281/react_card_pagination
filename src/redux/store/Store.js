import {createStore, combineReducers} from 'redux'
import cardReducer from '../reducer/AppReducer'

const appReducers = combineReducers(
    {
        cardReducer
    }
)


const store = createStore(appReducers, {});

export default store;