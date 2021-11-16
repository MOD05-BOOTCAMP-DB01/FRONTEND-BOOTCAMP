import React from 'react'
import './Button.css'

const Button = (props) => {
    return ( 
        <button className="btn fourth"{...props} ></button>
    )
}

export const ViewMoreButton = (props)=>{
 return <a class="effect effect-5" href="#" title="Learn More">Learn More</a>
}

export default Button
