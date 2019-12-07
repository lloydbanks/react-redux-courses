import React from 'react'
import { connect } from 'react-redux'
import { setLessonMarkdown } from '../../store/actions'

const LessonEditor = ({ lesson, setLessonMarkdown }) => {
  return (
    <>
      <div className="lesson-editor">
        <p>
          You can use{' '}
          <a
            href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
            target="_blank"
            rel="noopener noreferrer"
          >
            markdown
          </a>{' '}
          to edit this lesson. Changes are saved automatically
        </p>
      </div>

      <div className="form-group">
        <textarea
          onChange={e => {
            setLessonMarkdown(lesson, e.target.value)
          }}
          className="form-control"
          value={lesson.markdown || ''}
          placeholder="Enter lesson description"
          rows="3"
        ></textarea>
      </div>
    </>
  )
}

export default connect(null, { setLessonMarkdown })(LessonEditor)
