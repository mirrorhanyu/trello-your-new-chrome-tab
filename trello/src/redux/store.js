import { applyMiddleware, compose, createStore } from "redux";
import rootReducer from "./reducers";
import promise from "redux-promise-middleware";
import logger from "redux-logger";

const middlewares = [promise(), logger];

const finalCreateStore = compose(
  applyMiddleware(...middlewares),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

export default function configureStore() {
  return finalCreateStore(rootReducer);
}
