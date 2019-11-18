const PREFIX = '/api'

function createCourse({title, price}) {
    return postData(PREFIX + '/courses', {title, price})
}

function fetchCourses() {
    return getData(PREFIX + '/courses')
}

function postData(url = '', data = {}) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json())
}

function getData(url = '') {
    return fetch(url).then(response => response.json())
}

export {createCourse, fetchCourses}