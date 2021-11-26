import React from 'react'

import { Api } from '../../../Api/Api'

import { toast } from 'react-toastify'

import { useGlobalContext } from "../../../context/context";

import './deleteCheckin.css'

export default function DeleteCheckin({ckId, closeDeleteCk}) {
  const { handleRender} = useGlobalContext()

  const handleDelete = async event => {
    const response = await Api.buildApiDeleteRequest(
      Api.deleteCkUrl(ckId),
      true,
    )

    if (response.status === 204) {
      // Delete product successfully
      toast.success('Resultado-chave deletado com sucesso!',{theme: "dark",position: toast.POSITION.TOP_CENTER})
      // Navigate to home page
      handleRender()
      closeDeleteCk()
    }else if (response.status === 403) { 
      toast.error('Você não possível permissão para excluir esse check-in.',{theme: "colored",position: toast.POSITION.TOP_CENTER})
      closeDeleteCk()
    }else  {
      toast.error('Não foi possível excluir esse check-in.',{theme: "colored",position: toast.POSITION.TOP_CENTER})
      closeDeleteCk()
    }
  }

  const backButton = () => {
    toast.info('Nenhuma alteração realizada.',{position: toast.POSITION.TOP_CENTER})
    closeDeleteCk()
  }

  return (
    <div className="area-DeleteCheckin">
      <div className="deleteCheckin">
        <h2>Deseja realmente excluir esse check-in?</h2>
        <div className="deleteCk-blocoBtn">
          <div className="btnCk-delete" onClick={handleDelete}>
              <span >Excluir</span>
          </div>

          <div className="btnCk-cancel" onClick={backButton}>
              <span >Cancelar</span>
          </div>

        </div>
      </div>
    </div>
  )
}
