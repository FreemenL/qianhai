import { createStore , applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { reducer as homeReducer }  from '../containers/Home/store';
import { reducer as detailsReducer }  from '../containers/Details/store';
import serverAxios from '../server/serverAxios';
import clientAxios from '../client/clientAxios';

declare let window: any;

const reducer = combineReducers({
  home: homeReducer,
  details: detailsReducer
})

export const getStore = () => createStore(reducer,applyMiddleware(thunk.withExtraArgument(serverAxios)));

export const getClientStore = () => { 
  const defaultState = window.context ? window.context.state : {};
  return createStore(reducer, defaultState, applyMiddleware(thunk.withExtraArgument(clientAxios)));
}

