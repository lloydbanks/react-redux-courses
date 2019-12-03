import React from 'react'

const LessonDetail = ({lessonId}) => {
    return (
        <div className="mt-2">
            <hr/>

            <h6>Detail lesson</h6>
            <p>id: {lessonId}</p>
        </div>
    )
}

export default LessonDetail