import { applyMiddleware, createStore } from 'redux';
import reducers from './reducers/reducers'
import { createLogger } from 'redux-logger';
const logger = createLogger();

export const store = createStore(
    reducers,
    applyMiddleware(logger)
);
