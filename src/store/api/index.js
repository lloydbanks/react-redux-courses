const PREFIX = '/api'

function createCourse({ title, price }) {
  return fetchData(PREFIX + '/courses', { title, price })
}

function createLesson({ title, courseId }) {
  return fetchData(PREFIX + '/lessons', { title, courseId })
}

function updateLesson(lesson) {
  return fetchData(PREFIX + `/lessons/${lesson.id}`, lesson, 'PUT')
}

function removeLesson(lesson) {
  return fetchData(PREFIX + `/lessons/${lesson.id}`, null, 'DELETE')
}

function removeCourse(course) {
  return fetchData(PREFIX + `/courses/${course.id}`, null, 'DELETE')
}

function fetchCourses() {
  return getData(PREFIX + '/courses')
}

function fetchLessons(courseId) {
  return getData(PREFIX + '/lessons?courseId=' + courseId)
}

function fetchData(url = '', data = {}, method = 'POST') {
  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: data !== null ? JSON.stringify(data) : null
  }).then(response => response.json())
}

function getData(url = '') {
  return fetch(url).then(response => {
    if (response.ok) {
      return response.json()
    } else if (response.status === 500) {
      throw new Error('Server is not running. Please run `yarn server`')
    }
  })
}

export {
  createCourse,
  createLesson,
  updateLesson,
  removeLesson,
  removeCourse,
  fetchCourses,
  fetchLessons
}
