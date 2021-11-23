import React, { useEffect, useState } from 'react'


// import { BsFillCircleFill } from 'react-icons/bs'
import { AiOutlineAppstoreAdd,AiFillPushpin } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'
import { RiDeleteBin2Line } from 'react-icons/ri'


import { GoCommentDiscussion } from 'react-icons/go'



import { format, addDays} from 'date-fns'



import { Api } from '../../../Api/Api';
import { useGlobalContext } from '../../../context/context';
import CreateCheckin from '../../../Pages/Checkin/CreateCheckin/CreateCheckin';
// import CreateKeyResult from '../../../Pages/CreateKeyResult/CreateKeyResult';


// CSS
import './modalCk.css'
import UpdateCheckin from '../../../Pages/Checkin/UpdateCheckin/UpdateCheckin';
import DeleteCheckin from '../../../Pages/Checkin/DeleteCheckin/DeleteCheckin'

export default function ModalCk({kr}) {
  const [cks, setCks] = useState([]);
  const [ckEdit, setCkEdit] = useState({});
  const [ckDelete, setCkDelete] = useState({});
  const [showAddCk, setShowAddCk] = useState(false)
  const [showUpdateCk, setShowUpdateCk] = useState(false)
  const [showDeleteCk, setShowDeleteCk] = useState(false)

  const {render} = useGlobalContext()
  

  useEffect(() => {

    const loadCheckin = async () => {
      const response = await Api.buildApiGetRequest(
        Api.readCheckinsByKeyResultId(kr.id),
        true
      );
      const result = await response.json();
      setCks(result);
    };

    loadCheckin();
  }, [render]);

  const handleShowAddCk = () => {
    setShowAddCk(true);
  }

  const getMonth = (month) => {
    if(month == 12){
      return 'Dez'
    } else if(month == 11){
      return 'Nov'
    }else if(month == 10){
      return 'Out'
    }else if(month == 9){
      return 'Set'
    }else if(month == 8){
      return 'Ago'
    }else if(month == 7){
      return 'Jul'
    }else if(month == 6){
      return 'Jun'
    }else if(month == 5){
      return 'Mai'
    }else if(month == 4){
      return 'Abr'
    }else if(month == 3){
      return 'Mar'
    }else if(month == 2){
      return 'Fev'
    }else if(month == 1){
      return 'Jan'
    }else{
      return ''
    }
  }

  const handleShowUpdateCk = (ck) =>{
    setShowUpdateCk(true)
    setCkEdit(ck)
  }
  const handleShowDeleteCk = (ck) =>{
    setShowDeleteCk(true)
    setCkDelete(ck)
  }
  

  return (
  
      <div className="modalCk">
        <div className="modal-header">
          <div className="modal-header-items">
            <AiOutlineAppstoreAdd className="chapterAdd" onClick={handleShowAddCk}/>
            <div className="modal-rating">
              {(() => {
                switch (kr.rating) {
                  case "Alto":   return <h3 className="rating-high">{kr.rating}</h3>;
                  case "Médio": return <h3 className="rating-medium">{kr.rating}</h3>;
                  case "Baixo":  return <h3 className="rating-low">{kr.rating}</h3>;
                  default:      return <h3>{kr.rating}</h3>;
                }
              })()}
            </div>
          </div>
        </div>

        <div className="modal-areaCardCk">
          {cks.map( ck => (
            <div className="cardCk">
              <div className="checkin-status">
              <AiFillPushpin/>
              </div>
              <div className="cardCK-date">
                <h3>{format(addDays(new Date(ck.date),1), 'dd')}</h3>
                <h4>{getMonth(format((new Date(ck.date)), 'MM'))}</h4>
              </div>
              <div className="cardCK-value">
                <h3>{ck.current_value}</h3>
              </div>
              <div className="cardCk-icons">
                <BiEdit className="icon-edit"
                  onClick={() => handleShowUpdateCk(ck)}/>

              <div className="modalCk-comment">
                <p>{ck.comment}</p>
                <GoCommentDiscussion className="modalck-icon-comment" />
              </div>
                

                <RiDeleteBin2Line className="icon-delete"
                onClick={() => handleShowDeleteCk(ck)}/>
              </div>
            </div>
          ))}
        </div>

        <div className="modalFooter">
        </div>
        <div>
          {showAddCk ? <CreateCheckin krId={kr.id}  closeCreateCheckin={()=>setShowAddCk(false)}/> : ""}

          {showUpdateCk ? <UpdateCheckin ck={ckEdit}  closeUpdateCheckin={()=>setShowUpdateCk(false)}/> : ""}

          {showDeleteCk ? <DeleteCheckin ckId={ckDelete.id}  closeDeleteCk={()=>setShowDeleteCk(false)}/> : ""}
        </div>

      </div>


  )
}
