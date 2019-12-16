import axios from 'axios';

const serverAxios = axios.create({
  baseURL: 'http://localhost:4000'
})

export default serverAxios;