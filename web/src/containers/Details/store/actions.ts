import { HOME_DETAIL } from './contants';

const getDetail = (detail) => ({
  type: HOME_DETAIL,
  detail
})

export const getDetails = (id) => ( dispatch, getState, axiosInstance) =>
  axiosInstance.get(`/api/articles/${id}`)
  .then((res)=> {
    const detail = res.data.data;
    dispatch(getDetail(detail))
})
