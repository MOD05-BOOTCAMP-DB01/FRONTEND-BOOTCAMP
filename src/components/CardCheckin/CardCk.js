import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { MdOutlineLibraryAdd } from 'react-icons/md'
import { GiMagnifyingGlass } from 'react-icons/gi'

import ModalCK from './Modal/ModalCK'

// CSS
import './cardCk.css'

export default function CardCk({ krs }) {
  const history = useHistory()
  const [showModalCk, setShowModalCk] = useState(false)
  const [kr, setKr] = useState({})

  const handleShowCk = kr => {
    setKr(kr)
    setShowModalCk(!showModalCk)
  }

  const statusColor = status => {
    if (status === 'Em andamento') {
      return <h4 className="yellow">Em andamento</h4>
    } else if (status === 'Concluído') {
      return <h4 className="gree">Concluído</h4>
    } else if (status === 'Atraso crítico') {
      return <h4 className="red">Atraso crítico</h4>
    } else {
      console.log('entrou aqui')
      return <h4>dasd</h4>
    }
  }

  return (
    <div className="ck-area">
      <div className="ck-header">
        <div className="ck-header-title">
          <h3>Titulo KR</h3>
          <MdOutlineLibraryAdd />
        </div>
        
        <div className="ck-header-status">
          <h3>Status</h3>
        </div>
       
      </div>
        {krs.map((kr, i) => (
          <div className="ck-body">
            <div key={`kr-ch-${i}`} className="ck-body-title">
              <h4>{kr.key_result}</h4>
              <GiMagnifyingGlass
                className="icon-magnifyingGlass"
                onClick={() => handleShowCk(kr)}
              />
            </div>
            
            <div className="ck-body-status">
              {(() => {
               if (kr.status == 1) {
                  return <h4 className="status-gree">{kr.status}</h4>;
                }else if(kr.status >= 0.8){
                    return <h4 className="status-yellow">{kr.status}</h4>;
                }else if(kr.status < 0.8){
                  return <h4 className="status-red">{kr.status}</h4>;
                }else{
                 return <h4>{kr.status}</h4>;
               }
              })()}
            </div>
           
          </div>
        ))}

        <div>{showModalCk ? <ModalCK kr={kr} /> : ''}</div>
      
    </div>
  )
}
