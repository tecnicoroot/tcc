import axios from "axios";
import history from "../../history";
const httpStatusHandler = status => {
    return {
        401 : () => history.push("/login"),
        500 : () => history.push("/500"),
    }[status]
}

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    withCredentials: false,
});
instance.interceptors.request.use(config => {
    const { token } = localStorage;
    if(token){
        
        config.headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }

    return config;
});

instance.interceptors.response.use(
    response => response,
    error => {
        if(error.response?.status){
            const handler = httpStatusHandler(error.response.status);
            if(handler){
                handler();
            }
        };
        return Promise.reject(error);
    }
);
export default instance;