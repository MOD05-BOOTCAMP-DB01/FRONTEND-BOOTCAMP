import React, { useState, useContext, useEffect } from "react";
import { Api } from "../Api/Api";
const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  //  funções e estados globais
  const [loggedUser,setLoggedUser] = useState([])
  const [value, setValue] = useState(0);
  const [login, setLogin] = useState(false);

  const [showAddKr, setShowAddKr] = useState(false);
  const [showUpdateKr, setShowUpdateKr] = useState(false);
  const [krs, setKrs] = useState([]);
  

  const handleShowAddKr = () => {
    setShowAddKr(!showAddKr);
    
  }
  const closeShowUpdateKr = () => {
    setShowUpdateKr(true);
    
  }
  const openShowUpdateKr = () => {
    setShowUpdateKr(false);
    
  }
 
  const loadKr = async (id) => {
    const response = await Api.buildApiGetRequest(Api.readKeyResultsByObjectivesId(id),true)
    const results = await response.json()

    if (response.status === 200) {
      setKrs(results.key_results) 
    }
      console.log("results =-",results)
  }

  const loadUniqueUser = async(id)=>{
      const response = await Api.buildApiGetRequest(Api.readUserbyId(id),true);
      const data = await response.json();
      setLoggedUser(data.user);
    }

  const completeTask = () => {
    increment();
    // escrever função para enviar um update por endpoint para o banco
  };
  const increment = () =>
    setValue((prevState) => (prevState >= 100 ? 0 : prevState + 20));
  return (
    <AppContext.Provider value={{ completeTask,setLogin,login,handleShowAddKr, showAddKr,loadUniqueUser,loggedUser,setLoggedUser, closeShowUpdateKr,  showUpdateKr, openShowUpdateKr }}>
      {children}
    </AppContext.Provider>
  );
};

// hook customizado com context
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
