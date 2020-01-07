import { HOME_DETAIL } from './contants';

const defaultState = {
  detail: {}
}

export default (state = defaultState,action) => {
  switch(action.type){
    case HOME_DETAIL:
      return {
        ...defaultState,
        detail: action.detail
      }
    default:
      return state
  }
}