import React from 'react'
import './Loading.scss'

class Loading extends React.Component {
  render() {
    return (
      <svg className="loading" viewBox="25 25 50 50">
        <circle cx="50" cy="50" r="20" fill="none" strokeWidth="3" />
      </svg>
    )
  }
}

export {Loading}
