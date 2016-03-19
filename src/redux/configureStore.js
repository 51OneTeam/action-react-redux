import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'

export default function configureStore (history, initialState = {}) {
  // Compose final middleware and use devtools in debug environment
  const reduxRouterMiddleware = routerMiddleware(history)
  let middleware = [thunk, reduxRouterMiddleware]
  let finalCreateStore

  if (__DEBUG__) {
    const devTools = window.devToolsExtension
      ? window.devToolsExtension()
      : require('containers/DevTools').default.instrument()
    finalCreateStore = compose(
      applyMiddleware(...middleware),
      devTools
    )(createStore)
  }

  finalCreateStore = applyMiddleware(...middleware)(createStore)

  // Create final store and subscribe router in debug env ie. for devtools

  const store = finalCreateStore(rootReducer, initialState)

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      const nextRootReducer = require('./rootReducer').default

      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}
