import React from 'react'
import {connect} from 'react-redux'

const mapStateToProps = ({counter}) => ({counter})
const mapDispatchToProps = (dispatch) => {
    return {
        increment: () => dispatch({type: 'INCREMENT'}),
        decrement: () => dispatch({type: 'DECREMENT'})
    }
}

function Counter(props) {
    const {counter, increment, decrement} = props

    return (
        <div>
            <p>Counter: {counter}</p>
            <button onClick={decrement}>-</button>
            <button onClick={increment}>+</button>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)