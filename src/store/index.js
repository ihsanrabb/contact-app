import { createStore, combineReducers, compose, applyMiddleware } from "redux"
import contactsReducer from "./reducers/contactsReducer"

import thunk from "redux-thunk"
const middleware = [thunk]
const allReducers  = combineReducers({contacts: contactsReducer})
const initialState = {
    contacts: [],
}

const store = createStore(allReducers, initialState, compose( applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
export default store;