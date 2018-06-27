import React from 'react'
import {headerStore} from '../core/HeaderStore'
import {About} from './About'
import {Search} from './Search'
import {Curated} from '../assets/logo/Curated'
import {Apps} from '../assets/icons/Apps'
import './Header.scss'

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <div className="container">
          <a href="/#" onClick={e => this.focusSearch(e)}>
            <Curated />
          </a>

          <Search />

          <a href="/#" onClick={e => this.toggleAbout(e)}>
            <Apps />
          </a>
        </div>

        <About />
      </header>
    )
  }

  focusSearch(e) {
    e.preventDefault()
    document.getElementById('search-input').focus()
  }

  toggleAbout(e) {
    e.preventDefault()
    e.stopPropagation()
    headerStore.toggleAbout()
  }
}

export {Header}
