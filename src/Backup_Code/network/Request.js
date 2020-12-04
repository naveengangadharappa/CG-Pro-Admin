import axios from 'axios';

const request = axios.create({
    baseURL: 'http://115.124.127.245:3001/Mission_Onboarding/',
    timeout: 20000,
    withCredentials: true,
});

export default request