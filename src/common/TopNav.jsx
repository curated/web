import React from 'react'
import {issueContainerStore} from '../issue/IssueContainerStore'
import {Logo} from '../assets/logo'
import {GitHub} from '../assets/github'
import './TopNav.scss'

class TopNav extends React.Component {
  render() {
    return (
      <nav className="top-nav">
        <a href="/#" onClick={e => this.toggle(e)}>
          <Logo />
        </a>

        <div className="top-nav-right">
          <a
            href="https://github.com/curated"
            rel="noopener noreferrer"
            target="_blank">
            <GitHub />
          </a>
        </div>
      </nav>
    )
  }

  toggle(e) {
    e.preventDefault()
    issueContainerStore.toggleNav()
  }
}

export {TopNav}
