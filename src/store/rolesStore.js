import { createStore } from 'redux'
import dataActions from "../reducers/dataActions";
const rolesStore = createStore(dataActions);
export default rolesStore;