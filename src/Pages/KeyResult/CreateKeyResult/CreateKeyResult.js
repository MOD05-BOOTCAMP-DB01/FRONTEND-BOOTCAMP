import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";

import { AiOutlineCloseSquare } from "react-icons/ai";

import Select from "react-select";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useGlobalContext } from "../../../context/context";

import "./createKeyResult.css";
import { Api } from "../../../Api/Api";
import schema from "./schema";


export default function CreateKeyResult({ objectiveId }) {
  const [username, setUsername] = useState([]);
  const [ownerId, setOwnerId] = useState("");

  const { handleShowAddKr } = useGlobalContext();

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
    const objective = objectiveId;
    const owner = ownerId;
    const status = 0;

    const payload = {
      ...values,
      status,
      objective,
      owner,
    };

    const response = await Api.buildApiPostRequest(
      Api.createKrUrl(),
      payload,
      true
    );

    if (response.status === 201) {
      toast.success("Resultado-chave criado com sucesso!", {
        theme: "dark",
        position: toast.POSITION.TOP_CENTER,
      });

      handleShowAddKr();
    }
  };

  function validate(values) {
    const errors = {};
    if (!values.key_result) {
      errors.key_result = "O titulo do resultado chave é obrigatório.";
    }

    if (!values.rating) {
      errors.rating = "Escolha a prioridade do resultado chave.";
    }

    if (!values.frequency) {
      errors.frequency = "Escolha uma frequencia para resultado chave.";
    }

    return errors;
  }

  const handleOwnerChange = (selectedOption) => {
    setOwnerId(selectedOption.value);
  };

  return (
    <div className="area-CreateKeyResult">
      <div className="CreateKeyResult">
        <Formik
          validationSchema={schema}
          onSubmit={onSubmit}
          validate={validate}
          validateOnMount
          onReset={onSubmit}
          initialValues={{
            key_result: "",
            rating: null,
            status: null,
            comment: "",
            type: "",
            frequency: "",
            initial_value: null,
            goal_value: null,
            moonshot: "",
            done: false,
          }}
          render={({ values, errors, isvalid }) => (
            <Form className="formKr">
              <AiOutlineCloseSquare
                onClick={() => handleShowAddKr()}
                className="formKr-close"
              />
              <div className="formKr-title">
                <h2>Adicionar Resultado Chave</h2>
              </div>

              <div className="formKr-area-Items">
                <div className="formKr-areaLeft">
                  <div className="formKr-Items">
                    <label>
                      Titulo
                      {errors.key_result && (
                        <abbr className="fieldError" title={errors.key_result}>
                          *
                        </abbr>
                      )}
                    </label>
                    <Field name="key_result" type="text" className="field" />
                    <div className="formError">
                      <ErrorMessage name="key_result" className="field">
                        {(msg) => <span className="fieldError">{msg}</span>}
                      </ErrorMessage>
                    </div>
                  </div>

                  <div className="formKr-Items">
                    <label>
                      Prioridade
                      {errors.rating && (
                        <abbr className="fieldError" title={errors.rating}>
                          *
                        </abbr>
                      )}
                    </label>
                    <Field
                      as="select"
                      name="rating"
                      type="text"
                      className="field"
                    >
                      <option >Selecione</option>
                      <option value="Baixo">Baixo</option>
                      <option value="Médio">Médio</option>
                      <option value="Alto">Alto</option>
                    </Field>
                    <div className="formError">
                      <ErrorMessage name="rating">
                        {(msg) => <span className="fieldError">{msg}</span>}
                      </ErrorMessage>
                    </div>
                  </div>

                  <div className="formKr-Items">
                    <label>
                      Moonshot
                      {errors.rating && (
                        <abbr className="fieldError" title={errors.moonshot}>
                        
                        </abbr>
                      )}
                    </label>
                    <Field
                      as="select"
                      name="moonshot"
                      type="text"
                      className="field"
                      placeholder="Selecione"
                    >
                      <option value="Neutro">Sem moonshot</option>
                      <option value="yes">Lebre</option>
                      <option value="no">Tartaruga</option>
                    </Field>
                    <div className="formError">
                      <ErrorMessage name="moonshot">
                        {(msg) => <span className="fieldError">{msg}</span>}
                      </ErrorMessage>
                    </div>
                  </div>

                  <div className="formKr-Items">
                    <label>
                      Tipo
                      {errors.type && (
                        <abbr className="fieldError" title={errors.type}>
                          *
                        </abbr>
                      )}
                    </label>
                    <Field
                      as="select"
                      name="type"
                      type="text"
                      className="field"
                    >
                      <option >Selecione</option>
                      <option value="inteiro">Inteiro</option>
                      <option value="decimal">Decimal</option>
                      <option value="porcentagem">Porcentagem</option>
                    </Field>
                    <div className="formError">
                      <ErrorMessage name="type" className="field">
                        {(msg) => <span className="fieldError">{msg}</span>}
                      </ErrorMessage>
                    </div>
                  </div>

                  <div className="formKr-Items">
                    <label>
                      Frequência
                      {errors.frequency && (
                        <abbr className="fieldError" title={errors.frequency}>
                          *
                        </abbr>
                      )}
                    </label>
                    <Field name="frequency" type="text" className="field" />
                    <div className="formError">
                      <ErrorMessage name="frequency" className="field">
                        {(msg) => <span className="fieldError">{msg}</span>}
                      </ErrorMessage>
                    </div>
                  </div>
                </div>

                <div className="formKr-areaRight">
                  <div className="formKr-Items">
                    <label>
                      Valor Inicial
                      {errors.initial_value && (
                        <abbr
                          className="fieldError"
                          title={errors.initial_value}
                        >
                          *
                        </abbr>
                      )}
                    </label>
                    <Field
                      name="initial_value"
                      type="number"
                      className="field"
                    ></Field>
                    <div className="formError">
                      <ErrorMessage name="initial_value">
                        {(msg) => <span className="fieldError">{msg}</span>}
                      </ErrorMessage>
                    </div>
                  </div>

                  <div className="formKr-Items">
                    <label>
                      Meta
                      {errors.goal_value && (
                        <abbr className="fieldError" title={errors.goal_value}>
                          *
                        </abbr>
                      )}
                    </label>
                    <Field
                      name="goal_value"
                      type="number"
                      className="field"
                    ></Field>
                    <div className="formError">
                      <ErrorMessage name="goal_value">
                        {(msg) => <span className="fieldError">{msg}</span>}
                      </ErrorMessage>
                    </div>
                  </div>

                  <div className="formKr-Items">
                    <label>Comentário</label>
                    <Field
                      as="textarea"
                      name="comment"
                      type="text"
                      className="fieldTextArea"
                    />
                    <div className="formError">
                      <ErrorMessage name="comment">
                        {(msg) => <span className="fieldError">{msg}</span>}
                      </ErrorMessage>
                    </div>
                  </div>

                  <div className="formKr-Items">
                    <label htmlFor="">Dono</label>
                    <Select
                      options={username[0]}
                      className="formKr-Items-select"
                      onChange={handleOwnerChange}
                      placeholder="Selecione"
                    />
                  </div>
                </div>
              </div>

              <div className="formKr-button">
                <button type="submit" disabled={Object.keys(errors).length}>
                  Enviar
                </button>
              </div>
            </Form>
          )}
        />
      </div>
    </div>
  );
}
