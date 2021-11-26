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
    const {  objective:name, id, type,owner,team } = objective;
    const {loggedUser,getQuarterObjective,setStatusError,statusError} = useGlobalContext();
    const [isModalOpen,setIsModalOpen]= useState(false);
    const [value,setValue] = useState(0);
    const [isLoading,setIsLoading] = useState(false);
    const [isProgressbar,setisProgressbar] = useState(false);
  
    useEffect(()=>{
        setIsLoading(true)
        const loadKrsbyObjective= async ()=>{
            try{
              setisProgressbar(true);
            const response = await Api.buildApiGetRequest(Api.readKeyResultsByObjectivesId(id),true);
            if(!response.ok){
            setisProgressbar(false);
            const msg = `Houve um erro no banco status:${response.status}`;
            throw new Error(msg);
             }
            const data = await response.json();
            let krLength = data.key_results?.length;
            const quantity = data.key_results?.map((number)=>{
                return number.done;
                
            })
            
            const total= quantity?.reduce((total, numero) => total + numero, 0);
            const calc = Math.round(total/krLength * 100);
            setValue((old)=>{
              return old + calc
            });
            setisProgressbar(false);
          }catch(error){
            console.log(error);
          }
        }
        getQuarterObjective(id);
        loadKrsbyObjective();
        setIsLoading(false);
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
        primarycolor="#0099b7"
        secondarycolor="#69006e"
        numberofrotationsinanimation={2}
        />;
    </div>
    )
    }

    return (
         <div className="objective-card" key={id}>
            <div className="objective-container-title">
              <h3>
                <span className="objective-info">Titulo:</span>
                {name}
              </h3>
              <div className="status-bar">
              
              {isProgressbar?<span><Spin width="20px" height="20px"/></span>:<ProgressBar size="medium" value={value} />}
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
