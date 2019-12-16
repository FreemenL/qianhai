import { CHANGE_LIST } from './contants';

const changeList = (list) => ({
  type: CHANGE_LIST,
  list
})

export const getHomeList = () => ( dispatch, getState, axiosInstance) =>
    axiosInstance.get('/api/jueJinList.json')
   .then((res)=> {
      const list = res.data.data.articleFeed.items.edges;
      dispatch(changeList(list))
  })
