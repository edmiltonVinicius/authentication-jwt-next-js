import axios from 'axios';
import { parseCookies } from 'nookies';

export function getApiClient(context: any) {
    const api = axios.create({
        baseURL: 'http://localhost:3000'
    });
    
    const { 'authentication-next-token': token } = parseCookies(context);
    
    if (token) {
        api.defaults.headers['Auhtorization'] = `Bearer ${token}`;
    }
    
    api.interceptors.request.use(config => {
        console.log(config);
        return config;
    });

    return api;
}