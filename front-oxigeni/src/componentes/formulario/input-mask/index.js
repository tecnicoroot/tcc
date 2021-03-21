import React from "react";
import { Field as FormikField } from "formik";
import { Input } from "reactstrap";
import MensagemErro from "../mensagem-erro";
import ReactInputMask from "react-input-mask";

const FieldMask = ({ label, mask, ...props }) => {
  return (
    <FormikField name={props.name}>
      {({ field, meta }) => {
        const valido =
          meta.touched && meta.error === undefined && meta.value !== "";
        const invalido = meta.touched && meta.error !== undefined;
        return (
          <>
            <ReactInputMask
              mask={mask}
              {...field}
              {...props}
              valid={valido}
              invalid={invalido}
              children={<Input />}
            />
            <MensagemErro meta={meta} />
          </>
        );
      }}
    </FormikField>
  );
};

export default FieldMask;
