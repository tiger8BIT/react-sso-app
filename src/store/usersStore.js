import { createStore } from 'redux'
import dataActions from "../reducers/dataActions";
const usersStore = createStore(dataActions);
export default usersStore;