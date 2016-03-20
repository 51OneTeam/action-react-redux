/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import RaisedButton from 'material-ui/lib/raised-button'
import CircularProgress from 'material-ui/lib/circular-progress'
import Dropzone from 'react-dropzone'
import { redirect, changeStatus, syncFetchData, upload } from 'redux/modules/demo'

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html

const style = {
  margin: 12
}

type Props = {
  demo: Object,
  changeStatus: Function,
  syncFetchData: Function,
  upload: Function
}

export class DemoView extends React.Component<void, Props, void> {
  static propTypes = {
    demo: PropTypes.object.isRequired,
    changeStatus: PropTypes.func.isRequired,
    syncFetchData: PropTypes.func.isRequired,
    upload: PropTypes.func.isRequired
  }

  constructor (Props) {
    super(Props)
    this.onDrop = this.onDrop.bind(this)
  }

  render () {
    let that = this
    console.log('this.props.demo:', this.props.demo)
    return (
      <div>
        <div className='demo-redirect'>
          <RaisedButton label='页面跳转' style={style} onClick={function () { that.props.redirect('/') }} />
        </div>
        <div className='demo-changeStatus'>
          <RaisedButton label='状态变更' primary={this.props.demo.statusValue} style={style} onClick={this.props.changeStatus} />
        </div>
        <div className='demo-syncFetchData'>
          <RaisedButton label='异步请求' secondary style={style} onClick={this.props.syncFetchData} />
          <div>{this.renderSyncData()}</div>
        </div>
        <div className='demo-upload'>
          <Dropzone onDrop={this.onDrop}>
            <div style={{margin: '80px 65px'}}>图片上传</div>
          </Dropzone>
          <div>{this.renderUploadData()}</div>
        </div>
      </div>
    )
  }
  handleText (value) {
    console.log('value111', value)
  }
  renderSyncData () {
    if (this.props.demo.isFetching) {
      return (
        <div>
          <CircularProgress size={2} />
        </div>
      )
    } else if (this.props.demo.fetchData.msg) {
      return (
        <div>
          <p>msg:{this.props.demo.fetchData.msg}</p>
          <p>userName:{this.props.demo.fetchData.userName}</p>
          <p>tel:{this.props.demo.fetchData.tel}</p>
        </div>
      )
    }
  }

  renderUploadData () {
    if (this.props.demo.isUploading) {
      return (
        <div>
          <CircularProgress size={2} />
        </div>
      )
    } else if (this.props.demo.uploadData.msg) {
      return (
        <div>
          <img src=''/>
        </div>
      )
    }
  }

  onDrop (files) {
    console.log('Received files: ', files)
    this.props.upload(files)
  }

  onChange (editorState) {
    console.log('editorState:', editorState)
  }
}

const mapStateToProps = (state) => ({
  demo: state.demo
})

export default connect((mapStateToProps), {
  redirect,
  changeStatus,
  syncFetchData,
  upload
})(DemoView)
