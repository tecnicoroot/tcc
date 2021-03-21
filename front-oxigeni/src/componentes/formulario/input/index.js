import React from "react";
import { Field as FormikField } from "formik";
import { Input } from "reactstrap";
import MensagemErro from "../mensagem-erro";

const Field = ({ component, ...props }) => {
  const Component = component ? component : Input;
  return (
    <FormikField name={props.name}>
      {({ field, meta }) => {
        const valido = meta.touched && meta.error === undefined && meta.value !== "";
        const invalido = meta.touched && meta.error !== undefined;
        return (
          <>
            <Component
              valid={valido}
              invalid={invalido}
              {...field}
              {...props}
            />
            <MensagemErro meta={meta} />
          </>
        );
      }}
    </FormikField>
  );
};

export default Field;
