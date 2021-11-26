import React, { useState, useContext } from "react";
import { Api } from "../Api/Api";
import useLocalStorage from 'react-use-localstorage';
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
  const [objectives,setObjectives] = useState([])
  const [quarter,setQuarter] = useState([])
  const [oneObjective,setOneObjective] = useState('');
  const [showAddKr, setShowAddKr] = useState(false);
  const [statusError,setStatusError] = useState('');
  const [teamLocal, setTeamLocal] = useLocalStorage('team','team');
  
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
   try{
      const response = await Api.buildApiGetRequest(
        Api.readObjectiveByTeam(id),
        true
      );
       if(!response.ok){
      const msg = `House um erro no banco ${response.status}`;
      setError(true);
      throw new Error(msg);
    }
      const data = await response.json();
      setObjectives(data[0]?.objectives);
      setTeamName(data[0]?.team)
  }catch(error){
    console.log(error);
  }
 }

 const getObjectivesByQuarter = async(quarter)=>{
   try{
   const response = await Api.buildApiGetRequest(
      Api.readObjectiveByQuarter(quarter),
      true
    );
     if(!response.ok){
      const msg = `Houve um erro no banco status:${response.status}`;
      setError(true);
      setStatusError(response.status);
      throw new Error(msg);
    }
    const data = await response.json();
    setObjectives(data[0]?.objectives);
   }catch(error){
     console.log(error);
   }
 }

 const getQuarterObjective = async (id)=>{
   try{
   const response = await Api.buildApiGetRequest(Api.readObjectivesById(id),true);
   const data = await response.json();
   setOneObjective(data?.objective);
   }catch(error){
     console.log(error);
   }
 }

 const getObjectivesByQuarterTeam = async(quarter,id)=>{
   try{
   const response = await Api.buildApiGetRequest(Api.readObjectivesByTeamQuarter(quarter,id),true)
    if(!response.ok){
      const msg = `House um erro no banco ${response.status}`;
      setError(true);
      throw new Error(msg);
    }
   const results = await response.json()
   setObjectives(results[0]?.objectives)}catch{
     console.log(error)
   }
 }

const getAllObjectives = async () => {
      try{
      const response = await Api.buildApiGetRequest(
        Api.readAllObjectives(),
        true
      );
      if(!response.ok){
      const msg = `House um erro no banco ${response.status}`;
      setError(true);
      throw new Error(msg);
    }
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
    try{
    const response = await Api.buildApiGetRequest(Api.realAllYears(),true);
    if(!response.ok){
      const msg = `Houve um erro no banco ${response.status}`;
      setError(true);
      throw new Error(msg);
    }
    const data = await response.json();
    const yearsList = [
      data.map((year)=>{
        return {
          value:year.id,
          label:year.year,
        }
      })
    ]
    setYears(yearsList);
  }catch(error){
    setError(true);
    console.log(error);
  }
  }
  

  const loadUniqueUser = async(id)=>{
    try{
      const response = await Api.buildApiGetRequest(Api.readUserbyId(id),true);
      if(!response.ok){
      const msg = `Houve um erro no banco ${response.status}`;
      throw new Error(msg);
    }
      const data = await response.json();
      setLoggedUser(data?.user)
      if(data.user.team){
 setTeamLocal('team',data.user.team);
      }else{
        setTeamLocal('team',null)
      }
     
    }catch(error){
      setError(true);
      console.log(error);
    }
    }

    
  const loadQuarter = async ()=>{
   const response = await Api.buildApiGetRequest(Api.readAllQuaters(),true);
   if(!response.ok){
      const msg = `Houve um erro no banco ${response.status}`;
      setError(true);
      throw new Error(msg);
    }
   const data = await response.json();
   const quarterList = data?.map((quarter)=>{
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
        if(!response.ok){
      const msg = `House um erro no banco ${response.status}`;
      setError(true);
      throw new Error(msg);
    }
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
       setError(true);
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
        getObjectivesByQuarterTeam,
        teamLocal
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
