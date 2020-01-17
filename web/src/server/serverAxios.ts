import axios from 'axios';

const serverAxios = axios.create({
  baseURL: 'http://47.105.184.50'
})

export default serverAxios;