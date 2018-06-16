import React from 'react'
import {observer} from 'mobx-react'
import {issueStore} from './IssueStore'
import {ThumbsUp} from '../assets/emoji/ThumbsUp'
import {ThumbsDown} from '../assets/emoji/ThumbsDown'
import {Laugh} from '../assets/emoji/Laugh'
import {Hooray} from '../assets/emoji/Hooray'
import {Confused} from '../assets/emoji/Confused'
import {Heart} from '../assets/emoji/Heart'
import './IssueSearch.scss'

@observer
class IssueSearch extends React.Component {
  sortBy(e, val) {
    e.preventDefault()
    issueStore.setSortBy(val)
  }

  render() {
    return (
      <nav className="issue-search">
        <h1>Sort by</h1>

        <section className="sort-by-options">
          <a
            className={`sort-by-item ${
              issueStore.sortBy === 'createdAt' ? 'active' : ''
            }`}
            href="#"
            onClick={e => this.sortBy(e, 'createdAt')}>
            Newest
          </a>

          <a
            className={`sort-by-item ${
              issueStore.sortBy === 'updatedAt' ? 'active' : ''
            }`}
            href="#"
            onClick={e => this.sortBy(e, 'updatedAt')}>
            Recently updated
          </a>

          <div className="sort-by-reactions">
            <a
              className={`sort-by-reaction ${
                issueStore.sortBy === 'thumbsUp' ? 'active' : ''
              }`}
              href="#"
              onClick={e => this.sortBy(e, 'thumbsUp')}>
              <ThumbsUp />
            </a>

            <a
              className={`sort-by-reaction ${
                issueStore.sortBy === 'thumbsDown' ? 'active' : ''
              }`}
              href="#"
              onClick={e => this.sortBy(e, 'thumbsDown')}>
              <ThumbsDown />
            </a>

            <a
              className={`sort-by-reaction ${
                issueStore.sortBy === 'laugh' ? 'active' : ''
              }`}
              href="#"
              onClick={e => this.sortBy(e, 'laugh')}>
              <Laugh />
            </a>

            <a
              className={`sort-by-reaction ${
                issueStore.sortBy === 'hooray' ? 'active' : ''
              }`}
              href="#"
              onClick={e => this.sortBy(e, 'hooray')}>
              <Hooray />
            </a>

            <a
              className={`sort-by-reaction ${
                issueStore.sortBy === 'confused' ? 'active' : ''
              }`}
              href="#"
              onClick={e => this.sortBy(e, 'confused')}>
              <Confused />
            </a>

            <a
              className={`sort-by-reaction ${
                issueStore.sortBy === 'heart' ? 'active' : ''
              }`}
              href="#"
              onClick={e => this.sortBy(e, 'heart')}>
              <Heart />
            </a>
          </div>
        </section>
      </nav>
    )
  }
}

export {IssueSearch}
