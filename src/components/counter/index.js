import React from 'react'
import {connect} from 'react-redux'
import {increment, decrement} from '../../store/actions'

const mapStateToProps = ({counter}) => ({counter})
const mapDispatchToProps = {increment, decrement}

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