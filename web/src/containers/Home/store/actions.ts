import { 
  CHANGE_LIST , 
  CHANGE_TB_LIST,
} from './contants';

const changeList = (list) => ({
  type: CHANGE_LIST,
  list
})

const changeTBList = (tbList) => ({
  type: CHANGE_TB_LIST,
  tbList
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

// export const getTBArticleList = () => ( dispatch, getState, axiosInstance) =>
  