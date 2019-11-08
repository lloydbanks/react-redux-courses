import React, {useState} from 'react'
import {connect} from 'react-redux'
import {addToDo} from '../../store/actions'

const mapDispatchToProps = {addToDo}

function Form(props) {
    const [value, setValue] = useState('')

    const submit = e => {
        e.preventDefault()
        props.addToDo(value)
        setValue('')
    }

    return (
        <div>
            <form onSubmit={submit}>
                <input type="text" onChange={e => setValue(e.target.value)}
                       value={value} placeholder="Text"/>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default connect(null, mapDispatchToProps)(Form)