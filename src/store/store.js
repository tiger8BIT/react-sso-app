import appsActions from "../reducers/appsActions";
import { createStore } from 'redux'

const store = createStore(appsActions);
export default store;