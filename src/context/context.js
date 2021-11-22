import React, { useState, useContext } from "react";
import { Api } from "../Api/Api";
const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  //  funções e estados globais
  const [loggedUser,setLoggedUser] = useState([])
  const [login, setLogin] = useState(false);
  const [render, setRender] = useState(false);
  const [teams,setTeams] = useState([]);


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
  const [objective,setObjectives] = useState([])

const getAllObjectives = async () => {
      const response = await Api.buildApiGetRequest(
        Api.readAllObjectives(),
        true
      );
      const data = await response.json();
      setObjectives(data);
    };

  const handleShowAddKr = () => {
    setShowAddKr(!showAddKr);
    
  }
 
  
  const loadKr = async (id) => {
    const response = await Api.buildApiGetRequest(Api.readKeyResultsByObjectivesId(id),true)
    const results = await response.json()

    if (response.status === 200) {
      setKrs(results.key_results) 
    }

  }

  const loadUniqueUser = async(id)=>{
      const response = await Api.buildApiGetRequest(Api.readUserbyId(id),true);
      const data = await response.json();
      setLoggedUser(data.user);
    }

    const loadTeams = async ()=>{
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
        typeOptions
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
