import React from 'react'
import './Button.css'

const Button = (props) => {
    return ( 
        <button className="btn fourth"{...props} ></button>
    )
}

export default Button
