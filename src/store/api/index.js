import firebase from 'firebase/app'
import 'firebase/database'
import { fbConfig } from '../firebase/config'
firebase.initializeApp(fbConfig)
const db = firebase.firestore()

function createCourse({ title, price }) {
  return db.collection('courses').add({ title, price })
}

function createLesson({ title, courseId }) {
  return db.collection('lessons').add({ title, courseId })
}

function updateLesson(lesson) {
  return db
    .collection('lessons')
    .doc(lesson.id)
    .set(lesson)
}

function removeLesson(lesson) {
  return db
    .collection('lessons')
    .doc(lesson.id)
    .delete()
}

function fetchCourses() {
  return db
    .collection('courses')
    .orderBy('title')
    .get()
}

function fetchLessons(courseId) {
  return db
    .collection('lessons')
    .where('courseId', '==', courseId)
    .orderBy('title')
    .get()
}

export {
  createCourse,
  createLesson,
  updateLesson,
  removeLesson,
  fetchCourses,
  fetchLessons
}
