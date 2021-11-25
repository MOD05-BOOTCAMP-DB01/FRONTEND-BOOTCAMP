import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Api } from "../Api/Api";
const AppContext = React.createContext();
const AppProvider = ({ children,props }) => {
  let history = useHistory();
  //  funções e estados globais
  const [loggedUser,setLoggedUser] = useState([])
  const [login, setLogin] = useState(false);
  const [render, setRender] = useState(false);
  const [teams,setTeams] = useState([]);
  const [error,setError] = useState(false)
  const [years,setYears] = useState([])
  const [objectives,setObjectives] = useState([])
  const [quarter,setQuarter] = useState([])

  const [showAddKr, setShowAddKr] = useState(false);
  
  const [krs, setKrs] = useState([]);
  
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
 const getObjectivesByTeam = async()=>{
      try{
      const response = await Api.buildApiGetRequest(
        Api.readObjectiveByTeam('419ac1f2-8496-4403-b03d-a2cf90045520'),
        true
      );
      const data = await response.json();
      console.log(data);
      // setObjectives(data.objectives)
      }catch(error){
        setError(true);
        console.log(error);
      }
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
      data.map((year)=>{
        return {
          value:year.id,
          label:year.year,
        }
      })
    ]
    setYears(yearsList);
  }
  const loadKr = async (id) => {
    const response = await Api.buildApiGetRequest(Api.readKeyResultsByObjectivesId(id),true)
    const results = await response.json()

    if (response.status === 200) {
      setKrs(results.key_results) 
    }

  }

  const loadUniqueUser = async(id)=>{
    try{
      const response = await Api.buildApiGetRequest(Api.readUserbyId(id),true);
      const data = await response.json();
      setLoggedUser(data.user);
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
        handleShowAddKr
        , showAddKr,
        loadUniqueUser
        ,loggedUser,
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
        loadUniqueUser
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
