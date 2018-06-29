import React from 'react'
import {headerStore} from '../core/HeaderStore'
import {issueStore} from '../core/IssueStore'
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
          <a
            className="header-anchor"
            href="/#"
            onClick={e => this.resetSearch(e)}>
            <Curated />
          </a>

          <Search />

          <a
            className="header-anchor info-toggler"
            href="/#"
            onClick={e => this.toggleInfo(e)}>
            <Apps />
          </a>
        </div>

        <Info />
      </header>
    )
  }

  resetSearch(e) {
    e.preventDefault()
    issueStore.search()
  }

  toggleInfo(e) {
    e.preventDefault()
    headerStore.toggleInfo()
  }
}

export {Header}
