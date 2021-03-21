import axios from './instance';

export default class Api {
    resource = "";
    constructor(resource){
        this.resource = resource;
    }

    get(action = "", config){
        return axios.get(`/${this.resource}/${action}`, config);
    }

    post(action = "", body, config){
        return axios.post(`/${this.resource}/${action}`, body, config);
    }

    put(action = "", body, config){
        return axios.put(`/${this.resource}/${action}`, body, config);
    }

    delete(action = "", config){
        return axios.delete(`/${this.resource}/${action}`, config);
    }
}