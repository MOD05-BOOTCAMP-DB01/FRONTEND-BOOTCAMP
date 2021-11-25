import React from 'react'
import './Page404.css'
import Button from './../../components/Button/Button'
import NotFound from './../../Assets/not-found.svg'
import {Link} from 'react-router-dom' 
const Page404 = () => {
    return (
        <div className="container-page404">
            <img src={NotFound} alt="" />
            <Link to="/objectives"><Button>Voltar</Button></Link>
        </div>
    )
}

export default Page404
