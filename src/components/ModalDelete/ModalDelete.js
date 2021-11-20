import React from 'react'
import './ModalDelete.css'
import {Api} from './../../Api/Api'
import  Button  from '../Button/Button'
import { useGlobalContext } from '../../context/context'

const ModalDelete = ({ id = "modal", setIsOpen,objective }) => {
  const {getAllObjectives} = useGlobalContext()
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
    onClose();
    getAllObjectives();
    console.log(data.status);
    
  }
  return (
    <div id={id} className="modal" onClick={handleOutsideClose}>
      <div className="modal__card">
      <form class="delete__form" onSubmit={handleDelete}>
      <div>
      <div className='delete__form-heading'>
      <h2>Deletar objetivo</h2>
      </div>
        <div className="delete__form-body">
          <h3>Tem certeza que quer deletar <span>{objective.objective}</span></h3>
           <div class="delete__form-btns">
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
