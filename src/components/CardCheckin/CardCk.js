import React from 'react'

import { MdOutlineLibraryAdd } from 'react-icons/md'

export default function CardCk({krs}) {

  const statusColor = status => {
    if (status === 'Em andamento') {
      return <h4 className="yellow">Em andamento</h4>
    } else if (status === 'Concluído') {
      return <h4 className="gree">Concluído</h4>
    } else if (status === 'Atraso crítico') {
      return <h4 className="red">Atraso crítico</h4>
    } else {
      console.log("entrou aqui")
      return <h4>dasd</h4>
    }
  }

  return (
    <div className="area-ck">
      <div className="kr-header-ck">
        <div className="kr-header">
          <h3>Titulo KR</h3>
          <MdOutlineLibraryAdd />
        </div>
        {krs.map((kr, i) => (
          <div key={`kr-ch-${i}`} className="kr-title-items-ck">
            <h4>{kr.key_result}</h4>
            
          </div>
          
        ))}
      </div>

      {krs.map((kr,i) => {
        
        return(
          <div key={`kr-${i}`} className="ck">
              <div className="ck-header">
                <h3>{kr.cks[i].date}</h3>
              </div>

              {kr.cks.map((ck, i) => (
              <div key={`ck-${i}`} className="ck-items">
                {statusColor(ck.status)}
              </div>
              ))}
          </div>
        )
      })}
    </div>
  )
}
