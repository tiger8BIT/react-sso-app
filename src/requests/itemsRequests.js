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
                store.dispatch(setItemsAction(result));
                if (typeof onSuccess == 'function') {
                    onSuccess();
                }
            },
            (error) => {
                console.log(error)
            }
        );
};
export const getItemsByIdRequest = (url, targetId, itemsUrl, onSuccess) => {
    fetch(`${domain}${url}/${targetId}/${itemsUrl}`, {
        crossDomain:true,
        method: 'GET',
        headers: {'Content-Type':'application/json'}
    }).then(res => res.json())
        .then(
            (result) => {
                if (typeof onSuccess == 'function') {
                    onSuccess();
                }
                return result;
            },
            (error) => {
                console.log(error)
            }
        );
};
export const addItemsRelationRequest = (targetUrl, targetId, itemUrl, itemId, store, oldData, onSuccess) => {
    fetch(`${domain}${targetUrl}/${targetId}/${itemUrl}/${itemId}`, {
        crossDomain:true,
        method: 'POST',
        headers: {'Content-Type':'application/json'}
    }).then(res => res.json())
        .then(
            (result) => {
                store.dispatch(updateAction(oldData, result));
                if (typeof onSuccess == 'function') {
                    onSuccess();
                }
                return result;
            },
            (error) => {
                console.log(error)
            }
        );
};
export const deleteItemsRelationRequest = (targetUrl, targetId, itemUrl, itemId, store, oldData, onSuccess) => {
    fetch(`${domain}${targetUrl}/${targetId}/${itemUrl}/${itemId}`, {
        crossDomain:true,
        method: 'DELETE',
        headers: {'Content-Type':'application/json'}
    }).then(res => res.json())
        .then(
            (result) => {
                store.dispatch(updateAction(oldData, result));
                if (typeof onSuccess == 'function') {
                    onSuccess();
                }
                return result;
            },
            (error) => {
                console.log(error)
            }
        );
};
export const deleteItemRequest = (url, store, oldData, onSuccess) => {
    fetch(`${domain}${url}/${oldData.id}`, {
        crossDomain:true,
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
        .then(
        (result) => {
            store.dispatch(deleteAction(oldData, result));
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
    fetch(`${domain}${url}/${oldData.id}`, {
        crossDomain:true,
        method: "PUT",
        body: JSON.stringify(newData),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
        .then(
        (result) => {
            store.dispatch(updateAction(oldData, result));
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
    fetch(domain + url, {
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
            store.dispatch(addAction(result));
            if (typeof onSuccess == 'function') {
                onSuccess();
            }
        },
        (error) => {
            console.log(error);
        }
    )
};