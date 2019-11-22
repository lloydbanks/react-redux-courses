const PREFIX = '/api'

function createCourse({title, price}) {
    return fetchData(PREFIX + '/courses', {title, price})
}

function createLesson({title, courseId}) {
    return fetchData(PREFIX + '/lessons', {title, courseId})
}

function updateLesson(lesson) {
    return putData(PREFIX + `/lessons/${lesson.id}`, lesson)
}

function postData(url = '', data = {}) {
    return fetchData(url, data, 'POST')
}

function putData(url = '', data = {}) {
    return fetchData(url, data, 'PUT')
}

function fetchCourses() {
    return getData(PREFIX + '/courses')
}

function fetchLessons(courseId) {
    return getData(PREFIX + '/lessons?courseId=' + courseId)
}

function fetchData(url = '', data = {}) {
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

export {createCourse, createLesson, updateLesson, fetchCourses, fetchLessons}