const NotificacaoReducer = (state= "", action) => {
    switch(action.type){
        case "SUCCESS":
            return "Salvo com sucesso";
        case "WARNING" : 
            return "Alterado com sucesso";
        case "ERROR":
            return "Removido com sucesso";
        case "":
            return "";
        default:
            return state;
    }
}

export const SET_STATUS_NOTIFICACAO = (status) => {
    return {
        type: status,
    }
}

export default NotificacaoReducer;