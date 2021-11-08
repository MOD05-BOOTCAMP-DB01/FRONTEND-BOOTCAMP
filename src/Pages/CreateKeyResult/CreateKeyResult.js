import React, { useEffect, useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'

import Select from "react-select";

import './createKeyResult.css'
import { Api } from '../../Api/Api';
import schema from './schema';

export default function CreateKeyResult({objectiveId}) {

  const [username, setUsername] = useState([]);
  const [ownerId, setOwnerId] = useState("");

  

  useEffect(() => {
    const loadOwners = async () => {
      const response = await Api.buildApiGetRequest(Api.readAllUsers(), true);
      const data = await response.json();
      const options = [
        data.map((data) => {
          return {
            value: data.id,
            label: data.username,
          };
        }),
      ];
      setUsername(options);
    };
    loadOwners();
  }, []);

  

  const onSubmit = async (values, { resetForm }) => {
    console.log("values =", values)

    const objectives = objectiveId 
    const owner = ownerId

    const payload = {
      ...values,
      objectives,
      owner,
    }
    console.log("payload =", payload)

    const response = await Api.buildApiPostRequest(
      Api.createKrUrl(),
      payload,
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
      errors.key_result = 'O titulo do resultado chave é obrigatório.'
    }

    if (!values.rating) {
      errors.rating = 'Escolha a prioridade do resultado chave.'
    }

    if (!values.frequency) {
      errors.prazo = 'Escolha uma frequencia para resultado chave.'
    }


    return errors
  }

  const handleOwnerChange = selectedOption => {
    console.log("select = ", selectedOption);
    setOwnerId(selectedOption.value)
  }
  

  return (
    <div className="CreateKeyResult">
      <Formik
      validationSchema={schema}
       onSubmit={onSubmit}
       validate={validate}
       validateOnMount
       initialValues={{
        key_result: '',
        comment: '',
        rating: null,
        status: null,
        comment: '',
        type: '',
        frequency: '',
        initial_value: null,
        goal_value: null,
        done: false,
      }}
      
        render={({ values, errors, isvalid }) => (
          <Form className="formKr">
            <div className="formKr-title">
              <h2>Adicionar Resultado Chave</h2>
            </div>
            <div className="formKr-Items">
              <label>
                Titulo
                {errors.key_result && <abbr className="fieldError" title={errors.key_result}>*</abbr>}
              </label>
              <Field name="key_result" type="text" className="field"/>
              <ErrorMessage name="key_result" className="field">
                {msg => <span className="fieldError">{msg}</span>}
              </ErrorMessage>
            </div>

            <div className="formKr-Items">
              <label>Prioridade 
                {errors.rating && <abbr className="fieldError" title={errors.rating}>*</abbr>}
              </label>
              <Field as="select" name="rating" type="text" className="field">
                <option ></option>
                <option value='Baixa'>Baixa</option>
                <option value='Média'>Média</option>
                <option value='Alta'>Alta</option>
              </Field>
              <ErrorMessage name="rating">
                {msg => <span className="fieldError">{msg}</span>}
              </ErrorMessage>
            </div>

            <div className="formKr-Items">
              <label>
                Tipo
                {errors.type && <abbr className="fieldError" title={errors.type}>*</abbr>}
              </label>
              <Field name="type" type="text" className="field"/>
              <ErrorMessage name="type" className="field">
                {msg => <span className="fieldError">{msg}</span>}
              </ErrorMessage>
            </div>

            <div className="formKr-Items">
              <label>
                Frequência
                {errors.frequency && <abbr className="fieldError" title={errors.frequency}>*</abbr>}
              </label>
              <Field name="frequency" type="text" className="field"/>
              <ErrorMessage name="frequency" className="field">
                {msg => <span className="fieldError">{msg}</span>}
              </ErrorMessage>
            </div>

            <div className="formKr-Items">
              <label>Valor Inicial 
                {errors.initial_value && <abbr className="fieldError" title={errors.initial_value}>*</abbr>}
              </label>
              <Field name="initial_value" type="number" className="field">
              </Field>
              <ErrorMessage name="initial_value">
                {msg => <span className="fieldError">{msg}</span>}
              </ErrorMessage>
            </div>

            <div className="formKr-Items">
              <label>Meta 
                {errors.goal_value && <abbr className="fieldError" title={errors.goal_value}>*</abbr>}
              </label>
              <Field name="goal_value" type="number" className="field">
              </Field>
              <ErrorMessage name="goal_value">
                {msg => <span className="fieldError">{msg}</span>}
              </ErrorMessage>
            </div>


            <div className="formKr-Items">
              <label>Comentário</label>
              <Field as="textarea" name="comment" type="text" className="fieldTextArea"/>
              <ErrorMessage name="comment">
                {msg => <span className="fieldError">{msg}</span>}
              </ErrorMessage>
            </div>

            <div className="formKr-Items">
              <label htmlFor="">Dono</label>
              <Select options={username[0]} className="formKr-Items-select" onChange={handleOwnerChange}/>
            </div>

            <div className="formKr-button">
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
