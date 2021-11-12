import React, { useState, useContext } from "react";
const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  //  funções e estados globais
  const [value, setValue] = useState(0);
   const [login, setLogin] = useState(false);

  const [showAddKr, setShowAddKr] = useState(false);

  const handleShowAddKr = () => {
    setShowAddKr(!showAddKr);
    
  }

  const completeTask = () => {
    increment();
    // escrever função para enviar um update por endpoint para o banco
  };
  const increment = () =>
    setValue((prevState) => (prevState >= 100 ? 0 : prevState + 20));
  return (
    <AppContext.Provider value={{ completeTask,setLogin,login,handleShowAddKr, showAddKr }}>
      {children}
    </AppContext.Provider>
  );
};

// hook customizado com context
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
