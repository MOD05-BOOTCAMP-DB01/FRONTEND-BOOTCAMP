import React, { useEffect,useState } from 'react';
import {Api} from './../../Api/Api';
import {Link} from 'react-router-dom';
import ProgressBar from "./../ProgressBar/ProgressBar";
import './CardObjective2.css'
import {RiDeleteBin2Line} from 'react-icons/ri'
import {BiEdit} from 'react-icons/bi'
import {ViewMoreButton} from './../Button/Button';
import { useGlobalContext } from "../../context/context";
import Spin from "react-cssfx-loading/lib/Spin";

import './CardObjective2.css'
import ModalDelete from '../ModalDelete/ModalDelete';
const CardObjective2 = ({objective,teamName}) => {
    const {  objective:name, id, type,owner,year,quarter,team } = objective;
    const {loggedUser,getQuarterObjective} = useGlobalContext();
    const [isModalOpen,setIsModalOpen]= useState(false);
    const [value,setValue] = useState(0);
    const [error,setError] = useState(false);
    const [isLoading,setIsLoading]= useState(false);
    useEffect(()=>{
        setIsLoading(true);
        const loadKrsbyObjective= async ()=>{
          try {
            const response = await Api.buildApiGetRequest(Api.readKeyResultsByObjectivesId(id),true);
            const data = await response.json();
            let krLength = data.key_results?.length;
            const quantity = data.key_results?.map((number)=>{
                return number.done;
                
            })
            
            const total= quantity?.reduce((total, numero) => total + numero, 0);
            const calc = Math.round(total/krLength * 100);
            setValue(calc);
            
          } catch (error) {
            setError(true);
            console.log(error);
          } 
           
        }
        getQuarterObjective(id);
        loadKrsbyObjective();
        setIsLoading(false)
    },[id])
 
    if(isLoading){
    return (
    <div className="area-spin">
      <Spin
        duration="2s"
        width="200px"
        height= "200px"
        direction="alternate"
        size="1000px"
        primaryColor="#0099b7"
        secondaryColor="#69006e"
        numberofrotationsinanimation={2}
        />;
    </div>
    )
    }
    // if(statusError){
    //   return <h1>Erro de servidor</h1>
    // }

    return (
         <div className="objective-card" key={id}>
            <div className="objective-container-title">
              <h3>
                <span className="objective-info">Titulo:</span>
                {name}
              </h3>
              <div className="status-bar">
              <ProgressBar size="medium" value={value}  />
              </div>
              </div>
              <div className="objective-container-body">
               <h4>
                <span className="objective-info">Dono:</span>
                {owner.username}
              </h4>
               <h4>
                <span className="objective-info">Tipo:</span>
                {type}
              </h4>
              <h4>
                <span className="objective-info">Time:</span>
                {team?.team || teamName}
              </h4>
              </div>
              <div className="objective-button-container">

              {loggedUser?.role === 'MANAGER' && (<div>
              
              <Link to={`/editar/objetivo/${id}`}>
                <BiEdit className="objective-icon" />
              </Link>
              
              <RiDeleteBin2Line className="objective-icon" onClick={()=>setIsModalOpen(!isModalOpen)}/>
               
              </div>)}
             
               <Link to={`/objective/${id}`}><ViewMoreButton>Detalhes</ViewMoreButton></Link>
              </div>
               {isModalOpen && <ModalDelete setIsOpen={setIsModalOpen} objective={objective} />}
            </div>
    )
}

export default CardObjective2
