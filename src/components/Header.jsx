import React from 'react'
import {headerStore} from '../core/HeaderStore'
import {Curated} from '../assets/logo/Curated'
import {GitHub} from '../assets/logo/GitHub'
import './Header.scss'

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <div className="container">
          <a href="/#" onClick={e => this.toggleAbout(e)}>
            <Curated />
          </a>

          <div className="search" />

          <a
            href="https://github.com/curated"
            rel="noopener noreferrer"
            target="_blank">
            <GitHub />
          </a>
        </div>
      </header>
    )
  }

  toggleAbout(e) {
    e.preventDefault()
    headerStore.toggleAbout()
  }
}

export {Header}
