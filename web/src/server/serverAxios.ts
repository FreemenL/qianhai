import axios from 'axios';

const serverAxios = axios.create({
  baseURL: 'http://127.0.0.1:7001'
})

export default serverAxios;