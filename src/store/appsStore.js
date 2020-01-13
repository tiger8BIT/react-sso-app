import dataActions from "../reducers/dataActions";
import { createStore} from 'redux'
const appsStore = createStore(dataActions);
export default appsStore;