import {createStore, combineReducers} from 'redux'
import loaderReducer from '../reducers/loader'


export default () => {
    const store = createStore(combineReducers({
        loaderBilgileri:loaderReducer
    }),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    return store;
}