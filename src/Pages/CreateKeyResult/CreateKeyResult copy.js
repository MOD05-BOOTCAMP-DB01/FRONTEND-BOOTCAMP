import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import schema from '../../schema'
import './create.css'

import { toast } from "react-toastify";
import { Api } from '../../api/api';



const CreateKeyResult = () => {

  const onSubmit = async (values, { resetForm }) => {
    const response = await Api.buildApiPostRequest(
      Api.createKrUrl(),
      values,
      true
    );

    const body = await response.json();

    console.log(response);

    if (response.status === 201) {
      
    }
   
  }

  function validate(values) {
    const errors = {}
    if (!values.key_result) {
      errors.key_result = 'O key result é obrigatório.'
    }

    if (!values.rating) {
      errors.rating = 'Escolha a prioridade do resultado chave.'
    }

    if (!values.status) {
      errors.status = 'Escolha status da tarefa.'
    }

    if (!values.prazo) {
      errors.prazo = 'Escolha o prazo da tarefa.'
    }

    return errors
  }
  return (
    <div className="create">
      <Formik
        validationSchema={schema}
        validate={validate}
        onSubmit={onSubmit}
        validateOnMount
        // onReset={onSubmit}
        initialValues={{
          key_result: '',
          comment: '',
          rating: null,
          status: '',
          comment: '',
          type: '',
          frequency: '',
          initial_value: '',
          goal_value: '',
        }}
        render={({ values, errors, isvalid }) => (
          <Form>
            <div className="formItems">
              <label>
                Titulo
                {errors.key_result && <abbr title={errors.key_result}>*</abbr>}
              </label>
              <Field name="key_result" type="text" className="field"/>
              <ErrorMessage name="key_result" className="field">
                {msg => <span>{msg}</span>}
              </ErrorMessage>
            </div>

            <div className="formItems">
              <label>Prioridade 
                {errors.rating && <abbr title={errors.rating}>*</abbr>}
              </label>
              <Field as="select" name="prioridade" type="text" className="field">
                <option ></option>
                <option value='Baixa'>Baixa</option>
                <option value='Média'>Média</option>
                <option value='Alta'>Alta</option>
              </Field>
              <ErrorMessage name="rating">
                {msg => <span>{msg}</span>}
              </ErrorMessage>
            </div>

            <div className="formItems">
              <label>Comentário</label>
              <Field as="textarea" name="comment" type="text" className="fieldTextArea"/>
              <ErrorMessage name="comment">
                {msg => <span>{msg}</span>}
              </ErrorMessage>
            </div>

            
            <div className="formItems">
              <label>Status 
                {errors.status && <abbr title={errors.status}>*</abbr>}
              </label>
              <Field name="status" type="number" className="field">
              </Field>
              <ErrorMessage name="status">
                {msg => <span>{msg}</span>}
              </ErrorMessage>
            </div>

            <div className="formItems">
              <label>
                Tipo
                {errors.type && <abbr title={errors.type}>*</abbr>}
              </label>
              <Field name="type" type="text" className="field"/>
              <ErrorMessage name="type" className="field">
                {msg => <span>{msg}</span>}
              </ErrorMessage>
            </div>

            <div className="formItems">
              <label>
                Frequência
                {errors.frequency && <abbr title={errors.frequency}>*</abbr>}
              </label>
              <Field name="frequency" type="text" className="field"/>
              <ErrorMessage name="frequency" className="field">
                {msg => <span>{msg}</span>}
              </ErrorMessage>
            </div>

            <div className="formItems">
              <label>Valor Inicial 
                {errors.initial_value && <abbr title={errors.initial_value}>*</abbr>}
              </label>
              <Field name="initial_value" type="number" className="field">
              </Field>
              <ErrorMessage name="initial_value">
                {msg => <span>{msg}</span>}
              </ErrorMessage>
            </div>

            <div className="formItems">
              <label>Meta 
                {errors.goal_value && <abbr title={errors.goal_value}>*</abbr>}
              </label>
              <Field name="goal_value" type="number" className="field">
              </Field>
              <ErrorMessage name="goal_value">
                {msg => <span>{msg}</span>}
              </ErrorMessage>
            </div>

            <div>
              <button type="submit" 
              disabled={Object.keys(errors).length}
              >
                Enviar
              </button>
            </div>
          </Form>
        )}
      />
    </div>
  )
}

export default CreateKeyResult
