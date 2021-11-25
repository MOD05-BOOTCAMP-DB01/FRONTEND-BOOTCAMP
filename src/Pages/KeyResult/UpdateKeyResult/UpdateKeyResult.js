import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { AiOutlineCloseSquare } from "react-icons/ai";
import Select from "react-select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGlobalContext } from "../../../context/context";
import "./updateKeyResult.css";
import { Api } from "../../../Api/Api";
import schema from "../CreateKeyResult/schema";

export default function UpdateKeyResult({
  objectiveId,
  kr,
  closeUpdateKr = () => {},
}) {
  const { handleRender } = useGlobalContext();

  const [username, setUsername] = useState([]);
  const [ownerId, setOwnerId] = useState("");
  const [newKr, setNewKr] = useState(kr);

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
    const owner = ownerId || selectedOption.value;
    const done = newKr.done === "true" ? true : false;

    const payload = {
      ...newKr,
      owner,
      done,
    };

    const response = await Api.buildApiPatchRequest(
      Api.updateKrsUrl(kr.id),
      payload,
      true
    );

    if (response.status === 200) {
      toast.success("Resultado-chave editado com sucesso!", {
        theme: "dark",
        position: toast.POSITION.TOP_CENTER,
      });
      handleRender();
      closeUpdateKr();
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

  const handleChange = (evento) => {
    const auxKr = { ...kr };
    auxKr[evento.target.name] = evento.target.value;
    setNewKr(auxKr);
  };

  const selectedOption = {
    value: kr.owner.id,
    label: kr.owner.username,
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
            key_result: kr.key_result,
            comment: kr.comment,
            rating: kr.rating,
            status: kr.status,
            type: kr.type,
            frequency: kr.frequency,
            initial_value: kr.initial_value,
            goal_value: kr.goal_value,
            moonshot: kr.moonshot,
            done: kr.done,
          }}
          render={({ values, errors, isvalid }) => (
            <Form className="formKr">
              <AiOutlineCloseSquare
                onClick={closeUpdateKr}
                className="formKr-close"
              />
              <div className="formKr-title">
                <h2>Editar Resultado Chave</h2>
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
                    <ErrorMessage name="key_result" className="field">
                      {(msg) => <span className="fieldError">{msg}</span>}
                    </ErrorMessage>
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
                    <select
                      name="rating"
                      type="text"
                      className="field"
                      value={newKr.rating}
                      onChange={handleChange}
                    >
                      <option></option>
                      <option value="Baixo">Baixo</option>
                      <option value="Médio">Médio</option>
                      <option value="Alto">Alto</option>
                    </select>
                    <ErrorMessage name="rating">
                      {(msg) => <span className="fieldError">{msg}</span>}
                    </ErrorMessage>
                  </div>
                  <div className="formKr-Items">
                    <label>
                      Moonshot
                      {errors.rating && (
                        <abbr className="fieldError" title={errors.moonshot}>
                          *
                        </abbr>
                      )}
                    </label>
                    <Field
                      as="select"
                      name="moonshot"
                      type="text"
                      value={newKr.moonshot}
                      className="field"
                      onChange={handleChange}
                    >
                      <option value="Neutro"></option>
                      <option value="yes">Sim</option>
                      <option value="no">Não</option>
                    </Field>
                    <ErrorMessage name="moonshot">
                      {(msg) => <span className="fieldError">{msg}</span>}
                    </ErrorMessage>
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
                      value={newKr.type}
                      onChange={handleChange}
                    >
                      <option value="Inteiro">Inteiro</option>
                      <option value="Decimal">Decimal</option>
                      <option value="Porcentagem">Porcentagem</option>
                    </Field>
                    <ErrorMessage name="type" className="field">
                      {(msg) => <span className="fieldError">{msg}</span>}
                    </ErrorMessage>
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
                    <ErrorMessage name="frequency" className="field">
                      {(msg) => <span className="fieldError">{msg}</span>}
                    </ErrorMessage>
                  </div>

                  <div className="formKr-Items">
                    <label htmlFor="">Dono</label>
                    <Select
                      options={username[0]}
                      className="formKr-Items-select"
                      onChange={handleOwnerChange}
                      defaultValue={selectedOption}
                    />
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
                    <ErrorMessage name="initial_value">
                      {(msg) => <span className="fieldError">{msg}</span>}
                    </ErrorMessage>
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
                    <ErrorMessage name="goal_value">
                      {(msg) => <span className="fieldError">{msg}</span>}
                    </ErrorMessage>
                  </div>

                  <div className="formKr-Items">
                    <label>Comentário</label>
                    <Field
                      as="textarea"
                      name="comment"
                      type="text"
                      className="fieldTextArea"
                    />
                    <ErrorMessage name="comment">
                      {(msg) => <span className="fieldError">{msg}</span>}
                    </ErrorMessage>
                  </div>

                  <div className="formKr-Items">
                    <label>
                      Concluído?
                      {errors.done && (
                        <abbr className="fieldError" title={errors.done}>
                          *
                        </abbr>
                      )}
                    </label>
                    <select
                      name="done"
                      type="Boolean"
                      className="field"
                      value={newKr.done}
                      onChange={handleChange}
                    >
                      <option value="false">Não</option>
                      <option value="true">Sim</option>
                    </select>
                    <ErrorMessage name="done">
                      {(msg) => <span className="fieldError">{msg}</span>}
                    </ErrorMessage>
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
