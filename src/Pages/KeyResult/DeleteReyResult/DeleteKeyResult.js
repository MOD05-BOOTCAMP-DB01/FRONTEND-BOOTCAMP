import React from 'react'

import { Api } from '../../../Api/Api'

import { toast } from 'react-toastify'
import { useHistory } from 'react-router'

import { useGlobalContext } from "../../../context/context";

import './deleteKeyResult.css'

export default function DeleteKeyResult({krId, objectiveId}) {
  const history = useHistory()

  const { setShowDeleteKr } = useGlobalContext()

  const handleDelete = async event => {
    const response = await Api.buildApiDeleteRequest(
      Api.deleteKrsUrl(krId),
      true,
    )

    if (response.status === 204) {
      // Delete product successfully
      toast.success('Resultado-chave deletado com sucesso!',{theme: "dark"})
      // Navigate to home page
      setShowDeleteKr(false)
    } else {
      toast.error('Não foi possível excluir o resultado-chave.',{theme: "colored"})
      setShowDeleteKr(false)
    }
  }

  const backButton = () => {
    toast.info('Nenhuma alteração realizada.')
    setShowDeleteKr(false)
  }

  return (
    <div className="area-DeleteKeyResult">
      <div className="DeleteKeyResult">
        <h2>Deseja realmente excluir esse resultado-chave?</h2>
        <div className="deleteKr-blocoBtn">
          <div className="btn-delete" onClick={handleDelete}>
              <span >Excluir</span>
          </div>

          <div className="btn-cancel" onClick={backButton}>
              <span >Cancelar</span>
          </div>

        </div>
      </div>
    </div>
  )
}
