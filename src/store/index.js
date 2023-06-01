import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";
import rootReducer from "../reducers";
import mySaga from "../sagas";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// mount it on the Store
export const store = createStore(
   rootReducer,
   applyMiddleware(sagaMiddleware, thunk),
);

// then run the saga
sagaMiddleware.run(mySaga);
