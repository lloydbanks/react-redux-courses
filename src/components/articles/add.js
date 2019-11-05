import React from 'react'
import {connect} from 'react-redux'
import {addArticle} from '../../store/actions'

const mapDispatchToProps = (dispatch) => {
    return {
        addArticle: article => dispatch(addArticle(article))
    }
}

class Form extends React.Component {
    state = {title: ''}

    handleChange = e => {
        this.setState({[e.target.id]: e.target.value})
    }

    handleSubmit = e => {
        e.preventDefault()

        this.props.addArticle(this.state.title)
        this.setState({title: ''})
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor="title">
                        <input type="text" id="title" value={this.state.title} onChange={this.handleChange}/>
                    </label>
                    <button type="submit">Save</button>
                </div>
            </form>
        )
    }
}

export default connect(null, mapDispatchToProps)(Form)