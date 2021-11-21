import { createStore, combineReducers } from 'redux';
import {loginReducer} from './reducers';



const storeConfig = () => {
return createStore(combineReducers({
    login: loginReducer,
}));

}

export default storeConfig;

