import {createStore, combineReducers} from 'redux'
import tokenReducer from '../reducers/token'

export default () => {
    const store = createStore(combineReducers({
        tokenBilgileri:tokenReducer
    }),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    return store;
}