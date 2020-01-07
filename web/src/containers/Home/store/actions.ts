import { CHANGE_LIST } from './contants';

const changeList = (list) => ({
  type: CHANGE_LIST,
  list
})

export const getHomeList = () => ( dispatch, getState, axiosInstance) =>
  axiosInstance.get('/api/articles')
  .then((res)=> {
    const list = res.data.data.result[0]['articles'];
    dispatch(changeList(list))
})
