import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import chatsReducer from './chats';
import { firebaseReducer } from 'react-redux-firebase';
import messagesReducer from './messages';
import userReducer from './user';

// ---------- REDUCER---------- //
const reducer = combineReducers({
  chats: chatsReducer,
  messages: messagesReducer,
  user: userReducer,
  firebase: firebaseReducer,
});

// ---------- MIDDLEWARE ---------- //
// const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware, logger));
const middlewares = [thunkMiddleware];
const middlewareEnhancer = applyMiddleware(...middlewares);

const enhancers = [middlewareEnhancer];

const composedEnhancers = composeWithDevTools(...enhancers);

// ---------- STORE ---------- //
const store = createStore(reducer, composedEnhancers);

export default store;

export * from './auth';
export * from './chats';
export * from './messages';
export * from './user';
