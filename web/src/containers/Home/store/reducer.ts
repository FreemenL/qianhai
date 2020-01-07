import { CHANGE_LIST } from './contants';

const defaultState = {
  name: "render lee",
  newList: []
}

export default (state = defaultState,action) => {
  switch(action.type){
    case CHANGE_LIST:
      return {
        ...defaultState,
        newList: action.list
      }
    default:
      return state
  }
}