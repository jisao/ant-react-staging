import {createStore} from 'redux'
import reducers from './reducers/reducers'

//把reducers注入store
export const store = createStore(reducers)
