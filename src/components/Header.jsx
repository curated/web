import React from 'react'
import {headerStore} from '../core/HeaderStore'
import {Info} from './Info'
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

          <a
            className="info-toggler"
            href="/#"
            onClick={e => this.toggleInfo(e)}>
            <Apps />
          </a>
        </div>

        <Info />
      </header>
    )
  }

  focusSearch(e) {
    e.preventDefault()
    document.getElementById('search-input').focus()
  }

  toggleInfo(e) {
    e.preventDefault()
    e.stopPropagation()
    headerStore.toggleInfo()
  }
}

export {Header}
