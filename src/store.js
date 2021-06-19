import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import reducer from "./reducers"
import api from "./api/http"


const logger = store => next => action => {
    console.log(action.type)
    next(action)
}



const store = createStore(
    reducer, 
    applyMiddleware(thunk.withExtraArgument({ api }), logger)
)

export default store