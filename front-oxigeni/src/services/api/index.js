import axios from './instance';

export default class Api {
    resource = "";
    path = "";
    constructor(path, resource){
        this.path = path;
        this.resource = resource;
    }

    get(action = "", config){
        return axios.get(`/${this.path}/${this.resource}/${action}`, config);
    }

    post(action = "", body, config){
        return axios.post(`/${this.path}/${this.resource}/${action}`, body, config);
    }

    put(action = "", body, config){
        return axios.put(`/${this.path}/${this.resource}/${action}`, body, config);
    }

    delete(action = "", config){
        return axios.delete(`/${this.path}/${this.resource}/${action}`, config);
    }
}