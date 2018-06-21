import React from 'react'
import PropTypes from 'prop-types'

class Swipe extends React.Component {
  constructor() {
    super()
    this.el = React.createRef()
  }

  componentDidMount() {
    this.el.current.addEventListener('touchstart', e => {
      this.startX = e.changedTouches[0].screenX
    })

    this.el.current.addEventListener('touchend', e => {
      const endX = e.changedTouches[0].screenX

      if (this.startX > endX) {
        e.preventDefault()
        this.props.onLeft(new Event('swipeleft'))
      }

      if (this.startX < endX) {
        e.preventDefault()
        this.props.onRight(new Event('swiperight'))
      }
    })
  }

  render() {
    return <div ref={this.el}>{this.props.children}</div>
  }
}

Swipe.propTypes = {
  children: PropTypes.element,
  onLeft: PropTypes.func,
  onRight: PropTypes.func,
}

export {Swipe}
