import React from 'react'
import {headerStore} from '../core/HeaderStore'
import {About} from './About'
import {Curated} from '../assets/logo/Curated'
import {Apps} from '../assets/icons/Apps'
import './Header.scss'

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <div className="container">
          <a
            className="coming-soon"
            href="/#"
            onClick={e => e.preventDefault()}>
            <Curated />
          </a>

          <div className="search" />

          <a href="/#" onClick={e => this.toggleAbout(e)}>
            <Apps />
          </a>
        </div>

        <About />
      </header>
    )
  }

  toggleAbout(e) {
    e.preventDefault()
    e.stopPropagation()
    headerStore.toggleAbout()
  }
}

export {Header}
