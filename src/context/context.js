import React, { useState, useContext } from "react";
import { Api } from "../Api/Api";
const AppContext = React.createContext();
const AppProvider = ({ children }) => {

  //  funções e estados globais
  const [loggedUser,setLoggedUser] = useState([])
  const [login, setLogin] = useState(false);
  const [render, setRender] = useState(false);
  const [teams,setTeams] = useState([]);
  const [teamName,setTeamName] = useState([]);
  const [error,setError] = useState(false)
  const [years,setYears] = useState([])
  const [objectives,setObjectives] = useState('')
  const [quarter,setQuarter] = useState([])
  const [oneObjective,setOneObjective] = useState('');
  const [showAddKr, setShowAddKr] = useState(false);
  
    const typeOptions = [
    { value: 'Pessoas',
      label: 'Pessoas',
    },{
      value: 'Processos',
      label: 'Processos',
    },
    { value: 'Cliente',
      label: 'Cliente',
    }
  ]
  const handleRender = () => {
    setRender(!render);
    
  }
 const getObjectivesByTeam = async (id)=>{
      const response = await Api.buildApiGetRequest(
        Api.readObjectiveByTeam(id),
        true
      );
      const data = await response.json();
      setObjectives(data[0]?.objectives);
      setTeamName(data[0]?.team)
      
 }

 const getObjectivesByQuarter = async(quarter)=>{
   const response = await Api.buildApiGetRequest(
      Api.readObjectiveByQuarter(quarter),
      true
    );
    const data = await response.json();
    setObjectives(data[0].objectives);
    
 }

 const getQuarterObjective = async (id)=>{
   const response = await Api.buildApiGetRequest(Api.readObjectivesById(id),true);
   const data = await response.json();
   setOneObjective(data.objective);

 }

 const getObjectivesByQuarterTeam = async(quarter,id)=>{
   const response = await Api.buildApiGetRequest(Api.readObjectivesByTeamQuarter(quarter,id),true)
   const results = await response.json()
   setObjectives(results[0]?.objectives);
 }

const getAllObjectives = async () => {
      try{
      const response = await Api.buildApiGetRequest(
        Api.readAllObjectives(),
        true
      );
      const data = await response.json();
      setObjectives(data);
      }catch(error){
        setError(true);
        console.log(error);
      }
    };

  const handleShowAddKr = () => {
    setShowAddKr(!showAddKr);
    
  }
 
  const loadYears = async()=>{
    const response = await Api.buildApiGetRequest(Api.realAllYears(),true);
    const data = await response.json();
    const yearsList = [
      data?.map((year)=>{
        return {
          value:year.id,
          label:year.year,
        }
      })
    ]
    setYears(yearsList);
  }
  

  const loadUniqueUser = async(id)=>{
    try{
      const response = await Api.buildApiGetRequest(Api.readUserbyId(id),true);
      const data = await response.json();
      setLoggedUser(data.user);
      localStorage.setItem('team',data.user.team.id);
    }catch(error){
      setError(true);
      console.log(error);
    }
    }

    
  const loadQuarter = async ()=>{
   const response = await Api.buildApiGetRequest(Api.readAllQuaters(),true);
   const data = await response.json();
   const quarterList = data.map((quarter)=>{
     return {
       value:quarter.id,
       label:quarter.quarter
     }
   })
 
   setQuarter(quarterList);
  
  }

    const loadTeams = async ()=>{
      try{
        const response = await Api.buildApiGetRequest(Api.readAllTeams(),true);
        const data = await response.json();
        const teamsOptions =[
         data.map((data) => {
          return {
            value: data.id,
            label: data.team,
          };
        }),
        ]
        
        setTeams(teamsOptions);
      }catch(error){
        if(!error.status){
          setError(true)
        }
        console.log(error.status)
      }
      }

  return (
    <AppContext.Provider value={
        { setLogin,
        login,
        handleShowAddKr,
        showAddKr,
        loadUniqueUser,
        loggedUser,
        setLoggedUser,
        getAllObjectives,
        handleRender,
        render,
        teams,
        loadTeams,
        typeOptions,
        setError,
        error,
        years,
        loadYears,
        setYears,
        loadQuarter,
        quarter,
        setQuarter,
        setObjectives,
        objectives,
        getObjectivesByTeam,
        setTeams,
        teamName,
        getObjectivesByQuarter,
        getQuarterObjective,
        oneObjective,
        getObjectivesByQuarterTeam
          }}>
      {children}
    </AppContext.Provider>
  );
};

// hook customizado com context
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
