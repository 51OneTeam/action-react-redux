import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import Styles from 'styles/views/RegisterView.scss'
import CommonStyles from 'styles/common.scss'

type Props = {
}

export class HomeView extends React.Component<void, Props, void> {
  constructor (props) {
    super(props)
    this.state = {
      slideIndex: 0
    }
  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value
    })
  }

  render () {
    let buttonsRowClass = classNames(CommonStyles.buttonsRow, Styles.buttonsRow)

    let tab1Class = classNames({
      [CommonStyles.button]: true,
      [CommonStyles.active]: true
    })

    let tab2Class = classNames({
      [CommonStyles.button]: true,
      [CommonStyles.active]: false
    })

    return (
      <div className={Styles.RegisterView}>
        <div className={Styles.container}>
          <div className={Styles.logo}></div>
          <div className={Styles.join}></div>
          <div className={buttonsRowClass}>
            <a className={tab1Class}>邮箱注册</a>
            <a className={tab2Class}>手机注册</a>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  counter: state.counter
})

export default connect((mapStateToProps), {
})(HomeView)
