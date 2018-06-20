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
          <a href="/#" onClick={e => e.preventDefault()}>
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
    headerStore.toggleAbout()
  }
}

export {Header}
