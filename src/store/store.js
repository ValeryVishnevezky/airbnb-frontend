import { legacy_createStore as createStore, combineReducers } from 'redux'

import { stayReducer } from './reducers/stay.reducer'
import { userReducer } from './reducers/user.reducer'
import { orderReducer } from './reducers/order.reducer'
import { systemReducer } from './reducers/system.reducer'

const rootReducer = combineReducers({
    stayModule: stayReducer,
    userModule: userReducer,
    systemModule: systemReducer,
    orderModule: orderReducer,
})


const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
export const store = createStore(rootReducer, middleware)