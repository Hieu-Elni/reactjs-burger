import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://reactjs-burger-6ee09.firebaseio.com',
});

export default instance;