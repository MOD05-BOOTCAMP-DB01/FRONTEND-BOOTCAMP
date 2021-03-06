import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGlobalContext } from "../../../context/context";
import { Api } from "../../../Api/Api";
import schemaCheckin from "../schemaCheckin";
import { format } from "date-fns";
import "./createCheckin.css";

export default function CreateCheckin({ closeCreateCheckin, krId, kr }) {
  const { handleRender } = useGlobalContext();
  let initialDate = format(new Date(), "yyyy-MM-dd");
  const onSubmit = async (values) => {
    const payload = {
      ...values,
    };

    const response = await Api.buildApiPostRequest(
      Api.createCkUrl(),
      payload,
      true
    );

    if (response.status === 201) {
      toast.success("Checkin criado com sucesso!", {
        theme: "dark",
        position: toast.POSITION.TOP_CENTER,
      });
      handleRender();
      closeCreateCheckin();
    }

    const payloadStatus = {
      status: Math.round((values.current_value * 100) / kr.goal_value),
    };
    await Api.buildApiPatchRequest(Api.updateKrsUrl(krId), payloadStatus, true);
  };

  function validate(values) {
    console.log("create checkin values =", values);
    const errors = {};
    if (!values.current_value) {
      errors.current_value = "Digite o valor atual do resultado chave.";
    }

    if (!values.date) {
      errors.date = "Escolha uma data para o Checkin.";
    }
    return errors;
  }

  return (
    <div className="area-CreateCheckin">
      <div className="CreateCheckin">
        <Formik
          validationSchema={schemaCheckin}
          onSubmit={onSubmit}
          validate={validate}
          validateOnMount
          initialValues={{
            date: "",
            current_value: null,
            key_result: krId,
            comment: "",
            color: "",
          }}
          render={({ values, errors, isvalid }) => (
            <Form className="formCk">
              <AiOutlineCloseSquare
                onClick={closeCreateCheckin}
                className="formKr-close"
              />
              <div className="formKr-title">
                <h2>Adicionar Check-in</h2>
              </div>

              <div className="formCk-area-Items">
                <div className="formCk-Items">
                  <label>
                    Data
                    {errors.date && (
                      <abbr className="fieldError" title={errors.date}>
                        *
                      </abbr>
                    )}
                  </label>
                  <Field
                    name="date"
                    type="date"
                    min={initialDate}
                    className="field"
                  />
                  <div className="formError">
                    <ErrorMessage name="date">
                      {(msg) => <span className="fieldError">{msg}</span>}
                    </ErrorMessage>
                  </div>
                </div>

                <div className="formKr-Items">
                  <label>
                    Valor Atual
                    {errors.current_value && (
                      <abbr className="fieldError" title={errors.current_value}>
                        *
                      </abbr>
                    )}
                  </label>
                  <Field name="current_value" type="number" className="field" />
                  <div className="formError">
                    <ErrorMessage name="current_value">
                      {(msg) => <span className="fieldError">{msg}</span>}
                    </ErrorMessage>
                  </div>
                </div>

                <div className="formKr-Items">
                  <label>Coment??rio</label>
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
