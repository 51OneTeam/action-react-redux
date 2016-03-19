import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

import demo from 'redux/modules/demo'

export default combineReducers({
  routing: router,
  demo
})
