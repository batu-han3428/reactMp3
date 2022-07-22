import {createStore, combineReducers} from 'redux';
import loaderReducer from '../reducers/loader';
import modalReducer from '../reducers/modal';
import userReducer from '../reducers/user';


export default () => {
    const store = createStore(combineReducers({
        loaderBilgileri:loaderReducer,
        userBilgileri:userReducer,
        modalBilgileri:modalReducer
    }),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    return store;
}