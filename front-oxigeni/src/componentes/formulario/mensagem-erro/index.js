import React from "react";
import { FormFeedback } from "reactstrap";
import "./mensagemErro.css";

const MensagemErro = ({ meta }) => {
  const invalido = meta.touched && meta.error !== "";
  return <>{invalido && <FormFeedback>{meta.error}</FormFeedback>}</>;
};

export default MensagemErro;
