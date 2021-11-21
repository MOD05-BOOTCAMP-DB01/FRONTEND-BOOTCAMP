import React, { useState, useContext } from "react";
import { Api } from "../Api/Api";
const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  //  funções e estados globais
  const [loggedUser,setLoggedUser] = useState([])
  const [login, setLogin] = useState(false);

  const [showAddKr, setShowAddKr] = useState(false);
  const [showUpdateKr, setShowUpdateKr] = useState(false);
  const [krs, setKrs] = useState([]);
  const [showDeletekr, setShowDeleteKr] = useState(false)
  const [objectives,setObjectives] = useState([])

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

  }

  const loadUniqueUser = async(id)=>{
      const response = await Api.buildApiGetRequest(Api.readUserbyId(id),true);
      const data = await response.json();
      setLoggedUser(data.user);
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
        closeShowUpdateKr,
        showUpdateKr,
        openShowUpdateKr,
        showDeletekr,
        setShowDeleteKr,
        getAllObjectives,
        objectives }}>
      {children}
    </AppContext.Provider>
  );
};

// hook customizado com context
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
