import { 
  CHANGE_LIST , 
  CHANGE_TB_LIST,
} from './contants';

const defaultState = {
  name: "render lee",
  newList: [],
  tbList: [],
}

export default (state = defaultState,action) => {
  switch(action.type){
    case CHANGE_LIST:
      return {
        ...state,
        newList: action.list
      }
    case CHANGE_TB_LIST:
      return {
        ...state,
        tbList: action.tbList,
      }
    default:
      return state
  }
}