import React from 'react'
import './Page500.css'
import Error500 from './../../Assets/500.png'
import Button from './../../components/Button/Button'
const Page500 = () => {

    const refreshPage = ()=>{
        window.location.reload();
    }
    return (
        <div className="error-500">
            <img src={Error500} alt="erro no servidor" />
            <Button onClick={refreshPage} style={{'marginTop':'-10rem'}}>Tentar Novamente</Button>
        </div>
    )
}

export default Page500
