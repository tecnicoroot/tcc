import jwtDecode from "jwt-decode";

export const setToken = token => {
    localStorage.setItem("token", token);
}

const getToken = () => {
    const {token} = localStorage;
    return token;
}

const getTokenInfo = () => {
    const token = getToken();
    try {
        const info = jwtDecode(token);
        return info;
    } catch (error) {
        return {};
    }
};

export const ehTokenValido = () => {
    
    const { exp = 0 } = getTokenInfo();
    return Date.now() <= exp * 1000;
}

export const getClaims = () => {
    const { AuthorizationClaim= []} = getTokenInfo();
    
    return AuthorizationClaim;
}

/*export const getClaim = () => {
    const { claim = ""} = getTokenInfo();
    return claim;
}
*/
export const user = () => {
    const { name = '' } = getTokenInfo();
    return name;
}
export const idUser = () => {
    const { id = 0 } = getTokenInfo();
    return id;
}