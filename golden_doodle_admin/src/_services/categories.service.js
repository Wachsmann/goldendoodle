import { authHeader,urlAppender } from '../_helpers';

export const categoriesService = {
  
    register,
    getAll,
    getList,
    getById,
    update,
    delete: _delete
};


function getAll(req) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(req)
    };

    return fetch(urlAppender('/categories/all'), requestOptions).then(handleResponse);
}

function getList() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
        //body: JSON.stringify(req)
    };

    return fetch(urlAppender('/categories/'), requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(urlAppender('/categories/'+id), requestOptions).then(handleResponse);
}

function register(category) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(category)
    };

    return fetch(urlAppender('/categories'), requestOptions).then(handleResponse);
}

function update(category) {
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(category)
    };

    return fetch(urlAppender('/categories/' + category._id), requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(urlAppender('/categories/' + id), requestOptions).then(handleResponse);
}

function handleResponse(response) {
    if (!response.ok) { 
        return Promise.reject(response.statusText);
    }

    return response.json();
}