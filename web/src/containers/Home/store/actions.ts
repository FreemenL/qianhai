import { 
  CHANGE_LIST , 
  CHANGE_TB_LIST,
  CHANGE_GK_LIST
} from './contants';

const changeList = (list) => ({
  type: CHANGE_LIST,
  list
})

const changeTBList = (tbList) => ({
  type: CHANGE_TB_LIST,
  tbList
})

const changeGeekBang = (gkList) => ({
  type: CHANGE_GK_LIST,
  gkList
})


export const getHomeList = () => ( dispatch, getState, axiosInstance) =>
  axiosInstance.get('/api/articles')
  .then((res)=> {
    const list = res.data.data.result[0]['articles'];
    dispatch(changeList(list))
})

.then(res=>
    axiosInstance.get('/api/articles/team/taobao')
      .then((res)=> {
        const list = res.data.data.result[0]['articles'];
        dispatch(changeTBList(list))
    })
)

.then(res=>
    axiosInstance.get('/api/articles/team/geekbang')
      .then((res)=> {
        dispatch(changeGeekBang(res.data.data.result[0]['articles']))
    })
)

// export const getTBArticleList = () => ( dispatch, getState, axiosInstance) =>
  