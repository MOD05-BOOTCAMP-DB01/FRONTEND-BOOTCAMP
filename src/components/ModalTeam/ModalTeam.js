import React,{useEffect,useState} from 'react'
import './ModalTeam.css'
import {Api} from './../../Api/Api'
import  Button  from '../Button/Button'
import { useGlobalContext } from '../../context/context'
import Select from 'react-select';

const ModalDelete = ({ name = "modal", setIsOpen }) => {
  const id = localStorage.getItem("USER_ID");
  const [teamSelected,setTeamSelected] = useState({})
  const [teamId,setTeamId] = useState({})
  const {loadUniqueUser,loadTeams,teams,setTeams} = useGlobalContext()

  useEffect(() => {
   loadUniqueUser(id)
   loadTeams()
  },[])

    const onClose = ()=>{
    setIsOpen(false)
  }
    const handleOutsideClose = (e) => {
    if (e.target.id === id) onClose();
  };
  const handlePatch = async (e)=>{
    e.preventDefault();
    const payload = {
        team:teamId,
    }
    const response = await Api.buildApiPatchRequest(Api.updateUsers(id),payload,true);
    onClose()
  }
  const handleChange = (selectedOption)=>{
    setTeamSelected({value:selectedOption.value,label:selectedOption.label})
    setTeamId(selectedOption.value)
  }
  return (
    <div id={name} className="modal" onClick={handleOutsideClose}>
      <div className="modal__card">
      <form class="delete__form" onSubmit={handlePatch}>
      <div>
      <div className='delete__form-heading'>
      <h2>Deletar objetivo</h2>
      </div>
        <div className="delete__form-body">
            <Select options={teams[0]} onChange={handleChange} id="select"/>
           <div className="delete__form-btns">
        <Button type="submit">confirmar</Button>
        <Button onClick={onClose} >cancelar</Button>
        </div>
        </div>
       
        </div>
        </form>
      </div>
    </div>
  );
}

export default ModalDelete
