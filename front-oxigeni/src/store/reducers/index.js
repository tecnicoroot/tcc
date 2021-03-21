import { combineReducers } from "redux";
import notificacaoReducer from "./notificacao";
import menu from "./menu";
const rootReducer = combineReducers({
    notificacao : notificacaoReducer,
    menu,
});

export default rootReducer;