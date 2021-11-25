import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGlobalContext } from "../../../context/context";
import { Api } from "../../../Api/Api";
import schemaCheckin from "../schemaCheckin";
import { format, addDays } from "date-fns";

export default function UpdateCheckin({ closeUpdateCheckin, ck }) {
  const { handleRender } = useGlobalContext();
  let initialDate = format(new Date(), "yyyy-MM-dd");

  const onSubmit = async (values) => {
    console.log("Entrou onSubmite create ck");
    const payload = {
      ...values,
    };

    const response = await Api.buildApiPatchRequest(
      Api.updateCkUrl(ck.id),
      payload,
      true
    );

    if (response.status === 200) {
      toast.success("Checkin editado com sucesso!", {
        theme: "dark",
        position: toast.POSITION.TOP_CENTER,
      });
      handleRender();
      closeUpdateCheckin();
    }
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

    console.log("errors =", Object.keys(errors).length);
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
            date: format(addDays(new Date(ck.date), 1), "yyyy-MM-dd"),
            current_value: ck.current_value,
            comment: ck.comment,
            color: ck.color,
          }}
          render={({ values, errors, isvalid }) => (
            <Form className="formCk">
              <AiOutlineCloseSquare
                onClick={closeUpdateCheckin}
                className="formKr-close"
              />
              <div className="formKr-title">
                <h2>Editar Checkin</h2>
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
                  <ErrorMessage name="date" className="field">
                    {(msg) => <span className="fieldError">{msg}</span>}
                  </ErrorMessage>
                </div>

                <div className="formCk-Items">
                  <label>
                    Valor Atual
                    {errors.current_value && (
                      <abbr className="fieldError" title={errors.current_value}>
                        *
                      </abbr>
                    )}
                  </label>
                  <Field name="current_value" type="number" className="field" />
                  <ErrorMessage name="current_value" className="field">
                    {(msg) => <span className="fieldError">{msg}</span>}
                  </ErrorMessage>
                </div>

                <div className="formCk-Items">
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
