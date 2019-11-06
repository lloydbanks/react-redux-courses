import React from 'react'
import {connect} from 'react-redux'
import Form from './add'
import {FORBIDDEN_WORDS} from '../../store/constants'

const mapStateToProps = ({articles, error}) => ({articles, error})

const List = ({articles, error}) => {
    return (
        <>
            <h2>Articles</h2>
            <ul>
                {articles.map((article, index) => <li key={index}>{article}</li>)}
            </ul>

            <h2>Add new</h2>
            {<p>{error ? error : 'No bad words: ' + FORBIDDEN_WORDS}</p>}
            <Form />
        </>
    )
}

export default connect(mapStateToProps)(List)