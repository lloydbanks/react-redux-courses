function createCourse(title) {
    return postData('/courses', {title})
}

function fetchCourses() {
    return getData('/courses')
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