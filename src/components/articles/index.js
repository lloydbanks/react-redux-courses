import React from 'react'
import {connect} from 'react-redux'
import Form from './add'

const mapStateToProps = ({articles}) => ({articles})

const List = ({articles}) => {
    return (
        <>
            <h2>Articles</h2>
            <ul>
                {articles.map((article, index) => <li key={index}>{article}</li>)}
            </ul>

            <h2>Add new</h2>
            <Form />
        </>
    )
}

export default connect(mapStateToProps)(List)