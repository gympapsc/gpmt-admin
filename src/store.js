import { createStore, applyMiddleware } from "redux"
import createSagaMiddleware from "redux-saga"
import { takeEvery, takeLatest } from "redux-saga/effects"


const sagaMiddleware = createSagaMiddleware()

const logger = store => next => action => {
    console.log(action.type)
    next(action)
}

const store = createStore(
    reducer, 
    applyMiddleware(sagaMiddleware, logger)
)


function* saga() {
    
}

sagaMiddleware.run(saga)

export default store