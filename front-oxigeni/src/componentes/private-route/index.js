import React from "react";
import {Route, Redirect} from "react-router-dom";
import { ehTokenValido } from "../../services/token-service";

const PrivateRoute = props => {
    return ehTokenValido() ? <Route {...props} /> : <Redirect to="/login"/>

}

export default PrivateRoute;