import React,{useEffect} from 'react'
import './ModalDelete.css'
import {Api} from './../../Api/Api'
import  Button  from '../Button/Button'
import { useGlobalContext } from '../../context/context'

const ModalDelete = ({ id = "modal", setIsOpen,objective }) => {
  const {getAllObjectives,objectives} = useGlobalContext()
  useEffect(() => {
    getAllObjectives()
  },[objectives])
  const onClose = ()=>{
    setIsOpen(false)
  }
    const handleOutsideClose = (e) => {
    if (e.target.id === id) onClose();
  };
  const handleDelete = async (e)=>{
    e.preventDefault();
    const response = await Api.buildApiDeleteRequest(Api.deleteObjectiveUrl(objective.id),true);
    const data = await response.json();
    onClose()

    
  }
  return (
    <div id={id} className="modal" onClick={handleOutsideClose}>
      <div className="modal__card">
      <form className="delete__form" onSubmit={handleDelete}>
      <div>
      <div className='delete__form-heading'>
      <h2>Deletar objetivo</h2>
      </div>
        <div className="delete__form-body">
          <p>Tem certeza que quer deletar <strong>{objective.objective}</strong></p>
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
