import React from 'react'
import { connect } from 'react-redux'

import Styles from './RegisterView.scss'

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
    return (
      <div className={Styles.RegisterView}>
        lall
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  counter: state.counter
})

export default connect((mapStateToProps), {
})(HomeView)
