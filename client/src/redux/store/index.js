import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist'
import thunk from 'redux-thunk';

import rootReducer from '../reducers/rootReducer'

const composeEnhancers = (typeof window !==  'undefined'  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore( rootReducer, composeEnhancers( applyMiddleware( thunk ) ) );

export const persistor = persistStore(store);

const StorePersistor = { store, persistor }

export default StorePersistor
