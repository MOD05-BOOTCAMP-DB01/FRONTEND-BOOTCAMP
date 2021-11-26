import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Api } from "./../../Api/Api";
import "./Objective.css";
import { useGlobalContext } from "../../context/context";
import  Page500 from "../../Pages/Page500/Page500";
import  Page404 from "../../Pages/Page404/Page404";
import Spin from "react-cssfx-loading/lib/Spin";
import Button from './../Button/Button'
import ModalTeam from './../ModalTeam/ModalTeam'
import CardObjective2 from "../CardObjective2/CardObjective2";

const Objective = () => {
  const id = localStorage.getItem("USER_ID");
  const {
    loadUniqueUser,
    loggedUser,
    getAllObjectives,
    years,
    loadYears,
    objectives,
    setObjectives,
    getObjectivesByTeam,
    getObjectivesByQuarter,
    getObjectivesByQuarterTeam, 
    statusError,
  } = useGlobalContext();

  const [isModalOpen,setIsModalOpen]= useState(false);
  const [ isGeneral,setIsGeneral] = useState(true);
  const [ isMine,setIsMine] = useState(false);
  const [ isLoading,setIsLoading] = useState(false);
  const [ newUser,setNewUser] = useState(false);
  

  useEffect(() => {
    setIsLoading(true);
    loadUniqueUser(id);
    loadYears();
    getAllObjectives();
    setIsLoading(false);
  }, [id]);


  const teamId =localStorage.getItem('team');

 
const handleChange = async (selectedOption)=>{
    const year=selectedOption?.label;
    if(year){
      try{
      const response = await Api.buildApiGetRequest(Api.readObjectiveByYear(year),true)
       if(!response.ok){
      const msg = `House um erro no banco ${response.status}`;
      throw new Error(msg);
    }
    const results = await response?.json()
    setObjectives(results[0].objectives)
  }catch(error){
      console.log(error);
    }
    }else{
      return;
    }
  };

  const quarterFilter = async (e) => {
    const quarter = e.target.id;
    if (quarter === "clear") {
      if(isGeneral){
        getAllObjectives()
        return
      }
      getObjectivesByTeam(teamId)
      return;
    }
    if(isGeneral){
    getObjectivesByQuarter(quarter);
    }else{
     getObjectivesByQuarterTeam(quarter,teamId);
    }
    
    
    
  };


  const handleMyObjectives = (id) => {
    if(id==="my-objectives"){
      setIsGeneral(false);
      setIsMine(true);
      if(teamId==='null' || !teamId){
        setNewUser(true);
        setObjectives('');
      }else{
          getObjectivesByTeam(teamId)
          
          }
   }
    else{
      setIsMine(false);
      setIsGeneral(true);
      getAllObjectives();
    }
  };

 
    if(statusError===500){
    return <Page500/>
  }else if(statusError===404){
    return <Page404></Page404>
  }else{

  }

   if (isLoading) {
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
 
 
  return (
    <div className="objective-container">
    <div className="objective-container-heading">
    <h2 id="general-objectives" class={`${isGeneral && 'checked'}`} onClick={()=>handleMyObjectives('general-objectives')}>Objetivos Gerais</h2>   
    <h2 id="my-objectives" class={`${isMine && 'checked'}`} onClick={()=>handleMyObjectives('my-objectives')}>Meus Objetivos</h2>
    <div className="objective-container_filter">
    <Select placeholder="Ano" options={years[0]} onChange={(e)=>handleChange(e)} isClearable></Select>
    <div className="quarter-container">
     <div class="radio-group">
<input type="radio" id="Q1" name="quarter" onClick={quarterFilter}></input><label for="Q1">Q1</label>
<input type="radio" id="Q2" name="quarter" onClick={quarterFilter}></input><label for="Q2">Q2</label>
<input type="radio" id="Q3" name="quarter" onClick={quarterFilter}></input><label for="Q3">Q3</label>
<input type="radio" id="Q4" name="quarter" onClick={quarterFilter}></input><label for="Q4">Q4</label>
<input type="radio" id="clear" name="quarter" onClick={quarterFilter}></input><label for="clear">TODOS</label>
  </div>
    </div>
    </div>
    </div>

    {
      objectives && (isGeneral? objectives?.map((objective) => {
      
        return (
          <CardObjective2 key={objective.id} objective={objective} teamName={loggedUser.team?.team}/>
        );
      }):
      objectives?.map((objective) => {
        return (
          <CardObjective2 key={objective.id} objective={objective} teamName={loggedUser.team?.team}/>
        );
      }))}

      {newUser?
      <div className="no-team">
      <h2>Você não está vinculado a nenhum time</h2>
      <Button onClick={()=>setIsModalOpen(!isModalOpen)}>Selecionar Time</Button>
      {isModalOpen && <ModalTeam setIsOpen={setIsModalOpen} setNewUser={setNewUser}></ModalTeam>}
      </div>:!objectives && <div>
      <h4>Não há objetivos cadastrados</h4>
      </div>
      }

      {/* {!objectives && <div>
      <h4>Não há objetivos cadastrados</h4>
      </div>} */}


    </div>
  );
};

export default Objective;
