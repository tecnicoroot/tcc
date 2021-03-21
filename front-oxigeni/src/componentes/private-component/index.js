import React from "react";
import { getClaims } from "../../services/token-service";

const PrivateComponent = props => {
    const { permissao } = props;
    const claims = getClaims();
    const valido = claims.some(claim => claim === permissao);
    return valido ? props.children : <></>
}
export default PrivateComponent