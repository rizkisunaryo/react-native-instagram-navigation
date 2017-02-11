import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import Reducers from './Reducers';

const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

export const store = createStore(
  Reducers,
  applyMiddleware(...middleware)
)
