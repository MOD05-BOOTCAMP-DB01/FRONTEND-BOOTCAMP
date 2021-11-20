import React, { useEffect,useState } from 'react';
import {Api} from './../../Api/Api';
import {Link} from 'react-router-dom';
import ProgressBar from "./../ProgressBar/ProgressBar";
import './CardObjective2.css'
import {RiDeleteBin2Line} from 'react-icons/ri'
import {BiEdit} from 'react-icons/bi'
import {ViewMoreButton} from './../Button/Button';
import { useGlobalContext } from "../../context/context";


import './CardObjective2.css'
import ModalDelete from '../ModalDelete/ModalDelete';
const CardObjective2 = ({objective}) => {
    const {  objective:name, initial_date, id, type,owner,end_date,status } = objective;
    const {loggedUser} = useGlobalContext();
    const [isModalOpen,setIsModalOpen]= useState(false);
    const [value,setValue] = useState(0);
    useEffect(()=>{
        const loadKrsbyObjective= async ()=>{
            const response = await Api.buildApiGetRequest(Api.readKeyResultsByObjectivesId(id),true);
            const data = await response.json();
            
            let krLength = data.key_results?.length;
            const quantity = data.key_results?.map((number)=>{
                return number.done;
            })
            
            const teste= quantity?.reduce((total, numero) => total + numero, 0);
            const calc = Math.round(teste/krLength * 100);
            setValue(calc);
        }
        loadKrsbyObjective();
        
    },[])

    


    return (
         <div className="objective-card" key={id}>
            <div className="objective-container-title">
              <h3>
                <span className="objective-info">Titulo:</span>
                {name}
              </h3>
              <div className="status-bar">
              <ProgressBar size="medium" value={value} />
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
                <span className="objective-info">Começa em:</span>
                {new Date(initial_date).toLocaleDateString('pt-BR')}
              </h4>
              <h4>
                <span className="objective-info">Termina em:</span>
                {new Date(end_date).toLocaleDateString('pt-BR')}
                
              </h4>
              </div>
              <div className="objective-button-container">
              
             
              {loggedUser.role === 'MANAGER' && (<div>
              
              <Link to={`/editar/objetivo/${id}`}>
                <BiEdit className="objective-icon" />
              </Link>
              
              
              <RiDeleteBin2Line className="objective-icon" onClick={()=>setIsModalOpen(!isModalOpen)}/>
               {isModalOpen && <ModalDelete setIsOpen={setIsModalOpen} objective={objective} />}
              </div>)}
               <Link to={`/objective/${id}`}><ViewMoreButton>Detalhes</ViewMoreButton></Link>
              </div>
            </div>
    )
}

export default CardObjective2
