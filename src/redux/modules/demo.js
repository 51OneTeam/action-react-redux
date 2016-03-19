import { push } from 'react-router-redux'
import fetch from 'isomorphic-fetch'
import { EditorState, ContentState } from 'draft-js'

// ------------------------------------
// Constants
// ------------------------------------
export const CHANGE_STATUS = 'CHANGE_STATUS'

export const REQUEST_FETCHDATA = 'REQUEST_FETCHDATA'
export const RECEIVE_FETCHDATA = 'RECEIVE_FETCHDATA'

export const REQUEST_UPLOAD = 'REQUEST_UPLOAD'
export const RECEIVE_UPLOAD = 'RECEIVE_UPLOAD'

// ------------------------------------
// Actions
// ------------------------------------
/**
 * 跳转重定向demo
 */
export const redirect = (redirectUrl) => {
  return (dispatch, getState) => {
    dispatch(push(redirectUrl))
  }
}

/**
 * 异步请求demo
 */
const requestFetchData = (isFetching): Action => ({
  type: REQUEST_FETCHDATA,
  isFetching: isFetching
})
const receiveFetchData = (fetchResult): Action => ({
  type: RECEIVE_FETCHDATA,
  fetchResult: fetchResult
})
export const syncFetchData = () => {
  return (dispatch, getState) => {
    dispatch(requestFetchData(true))
    setTimeout(function () {
      return fetch('/docs/fetchData')
        .then((response) => response.json())
        .then((json) => dispatch(receiveFetchData(json)))
    }, 3000)
  }
}

/**
 * 文件上传demo
 */
const requestUpload = (isUploading): Action => ({
  type: REQUEST_UPLOAD,
  isUploading: isUploading
})
const receiveUpload = (uploadResult): Action => ({
  type: RECEIVE_UPLOAD,
  uploadResult: uploadResult
})
export const upload = (files) => {
  return (dispatch, getState) => {
    let data = new FormData()
    data.append('file', files[0])
    dispatch(requestUpload(true))
    return fetch('/docs/common/upload', {
      method: 'post',
      body: data
    })
      .then((response) => response.json())
      .then((json) => dispatch(receiveUpload(json)))
  }
}

/**
 * 状态改变demo
 */
export const changeStatus = (): Action => ({
  type: CHANGE_STATUS
})

export const actions = {
  changeStatus
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CHANGE_STATUS]: (state, action): Object => {
    let statusValue
    if (state.statusValue === true) {
      statusValue = false
    } else {
      statusValue = true
    }

    return Object.assign({}, state, {
      statusValue: statusValue
    })
  },
  [REQUEST_FETCHDATA]: (state, action): Object => {
    return Object.assign({}, state, {
      isFetching: action.isFetching
    })
  },
  [RECEIVE_FETCHDATA]: (state, action): Object => {
    return Object.assign({}, state, {
      isFetching: false,
      fetchData: action.fetchResult
    })
  },
  [REQUEST_UPLOAD]: (state, action): Object => {
    return Object.assign({}, state, {
      isUploading: action.isUploading
    })
  },
  [RECEIVE_UPLOAD]: (state, action): Object => {
    return Object.assign({}, state, {
      isUploading: false,
      uploadData: action.uploadResult
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  statusValue: true,
  isFetching: false,
  isUploading: false,
  fetchData: {},
  uploadData: {},
  editorState: EditorState.createWithContent(
    ContentState.createFromText('ss')
  )
}
export default function demoReducer (state: Object = initialState, action: Action): Object {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
