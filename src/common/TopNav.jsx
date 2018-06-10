import React from 'react'
import logo from '../assets/logo.svg'
import github from '../assets/github.svg'
import './TopNav.scss'

class TopNav extends React.Component {
  render() {
    return (
      <nav className="top-nav">
        <a href="/#" onClick={e => this.toggle(e)}>
          <img src={logo} />
        </a>

        <div className="top-nav-right">
          <a
            href="https://github.com/curated"
            rel="noopener noreferrer"
            target="_blank">
            <img src={github} />
          </a>
        </div>
      </nav>
    )
  }

  toggle(e) {
    e.preventDefault()
  }
}

export {TopNav}
