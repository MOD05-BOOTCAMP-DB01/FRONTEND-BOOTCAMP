import React from 'react'
import './Page500.css'
import Error500 from './../../Assets/500.png'
const Page500 = () => {
    return (
        <div className="error-500">
            <img src={Error500} alt="erro no servidor" />
        </div>
    )
}

export default Page500
