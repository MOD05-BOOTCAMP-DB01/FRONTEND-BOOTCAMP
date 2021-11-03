import React, { useEffect, useState } from 'react'


//CSS
import './cardObjective.css'
import { cks } from '../../Api/mock/data'
import data from '../../Api/mock/data'
import { Api } from '../../Api/Api'
import CardKr from '../CardKeyResult/CardKr'
import CardCk from '../CardCheckin/CardCk'

export default function CardObjective() {
  // const objective = {
  //   objective: "Objetivo 1",
  //   Type: "Anual",
  //   initialDate: "29/10/2021",
  //   endDate: "29/10/2022",
  //   area: "DP",
  //   unity: "DB1 Global Software",
  //   responsible: "Fulano de Tal",
  // };

  const [objective, setObjective] = useState(undefined)
  const [krs, setKrs] = useState(undefined)
  const [cks, setCks] = useState(undefined)

  const [changeView, setChangeView] = useState(true)

  const id = '67615f4b-734e-4fce-8bf2-33d44160b864'

  useEffect(() => {
    const loadObjective = async () => {
      const response = await Api.buildApiGetRequest(
        Api.readObjectivesById(id),
        true,
      )
      const results = await response.json()
      setObjective(results.objective)
      setKrs(results.objective.key_results)
      // setCks(results.objective.key_results.cks)
    }
    loadObjective()
  }, [])
  console.log('Objective', objective)
  // console.log("objective.key_results.cks",objective.key_results.cks)

  // useEffect(() => {
  //   const loadKr = async () => {
  //     const response = await Api.buildApiGetRequest(Api.readKrsbyIdUrl("4626aa14-8a6d-4ea2-9375-65cc06b162f1"),true)
  //     const results = await response.json()
  //       setKr(results)
  //       setCks(results.keyResult.cks)
  //   }
  //   loadKr()
  // }, []);
  console.log('kr=', krs)
  console.log('Cks=', cks)

  if (!objective) {
    return <h3>Loading..</h3>
  }
  if (!krs) {
    return <h3>Loading..</h3>
  }

  const alterChangeView = () => {
    setChangeView(!changeView)
  }

  return (
    // Objective
    <div className="cardObjective">
      <div className="area-objective">
        <div className="objective-header">
          <h3>{objective.unity}</h3>
        </div>
        <button className="changeView" onClick={alterChangeView}>
          {changeView ? 'Detalhes' : 'Ver Status'}
        </button>
        <div className="objective">
          <h3>{objective.area}</h3>
          <h3>{objective.objective}</h3>
          <h3>{objective.owner.username}</h3>
        </div>

        <div>
          <h4>
            {objective.initial_date} {'-'} {objective.end_date}
          </h4>
        </div>
      </div>
      {/* Conditional render */}
      {!changeView 
      ?
        <CardKr krs={objective.key_results}/> 
      :
        <CardCk krs={objective.key_results}/>
      } 
    </div>
  )
}
