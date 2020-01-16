import {addAction, deleteAction, setItemsAction, updateAction} from "../actions";

const domain = "http://localhost:8080/sso/administration/";

export const getItemsRequest = (url, store, onSuccess) => {
    fetch(domain + url, {
        crossDomain:true,
        method: 'GET',
        headers: {'Content-Type':'application/json'}
    }).then(res => res.json())
        .then(
            (result) => {
                store.dispatch(setItemsAction({isLoaded: true, items: result, error: null}));
                if (typeof onSuccess == 'function') {
                    onSuccess();
                }
            },
            (error) => {
                store.dispatch(setItemsAction({isLoaded: true, items: null, error: error}))
            }
        );
};
export const getItemsByIdRequest = (url, id, onSuccess) => {
    fetch(`${domain}${url}?id=${id}`, {
        crossDomain:true,
        method: 'GET',
        body: JSON.stringify(id),
        headers: {'Content-Type':'application/json'}
    }).then(res => res.json())
        .then(
            (result) => {
                if (typeof onSuccess == 'function') {
                    onSuccess();
                }
                return {isLoaded: true, items: result, error: null};
            },
            (error) => {
                return {isLoaded: true, items: null, error: error}
            }
        );
};
export const deleteItemRequest = (url, store, oldData, onSuccess) => {
    fetch(domain + url + "/delete", {
        crossDomain:true,
        method: "POST",
        body: JSON.stringify(oldData.id),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(
        (result) => {
            store.dispatch(deleteAction(oldData));
            if (typeof onSuccess == 'function') {
                onSuccess();
            }
        },
        (error) => {
            console.log(error);
        }
    )
};
export const updateItemRequest = (url, store, oldData, newData, onSuccess) => {
    fetch(domain + url + "/update", {
        crossDomain:true,
        method: "POST",
        body: JSON.stringify(newData),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(
        (result) => {
            store.dispatch(updateAction(oldData, newData));

            if (typeof onSuccess == 'function') {
                onSuccess();
            }
        },
        (error) => {
            console.log(error);
        }
    )
};
export const addItemRequest = (url, store, newData, onSuccess) => {
    fetch(domain + url + "/add", {
        crossDomain:true,
        method: "POST",
        dataType: 'json',
        body: JSON.stringify(newData),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
        .then(
        (result) => {
            store.dispatch(addAction(newData, result.id));
            if (typeof onSuccess == 'function') {
                onSuccess();
            }
        },
        (error) => {
            console.log(error);
        }
    )
};