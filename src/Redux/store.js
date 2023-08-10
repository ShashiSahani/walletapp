import { createStore, applyMiddleware,compose } from "redux";
import rootSaga from "./rootSaga";
import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";
import Reducers from "../Redux/Reducers/Reducers"
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middleware)
  // other store enhancers if any
);
const store = createStore(Reducers, enhancer);

sagaMiddleware.run(rootSaga);
export default store;