/* @flow */
import React from 'react'
import { connect } from 'react-redux'
import Tabs from 'material-ui/lib/tabs/tabs'
import Tab from 'material-ui/lib/tabs/tab'
import FontIcon from 'material-ui/lib/font-icon'
import SwipeableViews from 'react-swipeable-views'

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400
  },
  slide: {
    padding: 10
  }
}

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
      <div>
        <Tabs onChange={this.handleChange}
          value={this.state.slideIndex}>
          <Tab label='Tab One' value={0} />
          <Tab label='Tab Two' value={1} />
          <Tab label='Tab Three' value={2} />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
          <div>
            <h2 style={styles.headline}>Tabs with slide effect</h2>
            Swipe to see the next slide.<br />
          </div>
          <div style={styles.slide}>
            slide n°2
          </div>
          <div style={styles.slide}>
            slide n°3
          </div>
        </SwipeableViews>
        <Tabs>
          <Tab
            icon={<FontIcon className='material-icons'>phone</FontIcon>}
            label='RECENTS'
          />
          <Tab
            icon={<FontIcon className='material-icons'>favorite</FontIcon>}
            label='FAVORITES'
          />
          <Tab
            icon={<FontIcon className='material-icons'>favorite</FontIcon>}
            label='FAVORITES'
          />
          <Tab
            icon={<FontIcon className='material-icons'>person_pin</FontIcon>}
            label='NEARBY'
          />
        </Tabs>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  counter: state.counter
})

export default connect((mapStateToProps), {
})(HomeView)
