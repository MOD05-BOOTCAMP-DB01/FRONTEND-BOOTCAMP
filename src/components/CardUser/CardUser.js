import React from 'react'
import './CardUser.css'
const CardUser = ({user}) => {
    return (
       <div className="user-card">
        <h3>{user.username}</h3>
        <h4>{user.email}</h4>
        <div>{user.status}</div>
        </div>
    )
}

export default CardUser
