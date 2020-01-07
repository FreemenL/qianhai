import axios from 'axios';

const clientAxios = axios.create({
  baseURL: '/'
})

export default clientAxios;
