import { 
  CHANGE_LIST , 
  CHANGE_TB_LIST,
  CHANGE_GK_LIST,
} from './contants';

const defaultState = {
  name: "render lee",
  newList: [],
  tbList: [],
  gkList:[],
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
    case CHANGE_GK_LIST:
      return {
        ...state,
        gkList: action.gkList,
      }
    default:
      return state
  }
}