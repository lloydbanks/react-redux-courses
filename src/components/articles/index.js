import React from 'react'
import {connect} from 'react-redux'

const mapStateToProps = ({articles, isLoading, error}) => {
    return {articles: articles.data, isLoading: articles.isLoading, error: articles.error}
}

const List = ({articles, isLoading, error}) => {
    if(isLoading) return <div>Loading...</div>
    if(error) return <div>Error: {error}</div>

    return (
        <>
            <h2>Articles</h2>
            <ul>
                {articles.map(article => <li key={article.id}>{article.title}</li>)}
            </ul>
        </>
    )
}

export default connect(mapStateToProps)(List)