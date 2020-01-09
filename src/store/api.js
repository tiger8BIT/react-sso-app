import store from './store';
import {setApps} from "../actions";

const getAppsRequest = () => fetch("http://localhost:8080/sso/apps", {
    crossDomain:true,
    method: 'GET',
    headers: {'Content-Type':'application/json'}
}).then(res => res.json())
    .then(
        (result) => {
            store.dispatch(setApps({isLoaded: true,items: result,error: null}))
        },
        (error) => {
            store.dispatch(setApps({isLoaded: true,items: null,error: error}))
        }
    );
store.subscribe(listener);
function listener() {

}
const api = {
    getApps: () => store.getState().apps,
    setApps: () => store.dispatch(getAppsRequest())
};
export default api;