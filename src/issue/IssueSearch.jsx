import React from 'react'
import {ThumbsUp} from '../assets/emoji/ThumbsUp'
import {ThumbsDown} from '../assets/emoji/ThumbsDown'
import {Laugh} from '../assets/emoji/Laugh'
import {Hooray} from '../assets/emoji/Hooray'
import {Confused} from '../assets/emoji/Confused'
import {Heart} from '../assets/emoji/Heart'
import './IssueSearch.scss'

class IssueSearch extends React.Component {
  render() {
    return (
      <nav className="issue-search">
        <h1>Sort by</h1>

        <section className="sort-by-options">
          <a className="sort-by-item" href="#">
            Newest
          </a>
          <a className="sort-by-item" href="#">
            Recently updated
          </a>

          <div className="sort-by-reactions">
            <a className="sort-by-reaction" href="#">
              <ThumbsUp />
            </a>
            <a className="sort-by-reaction" href="#">
              <ThumbsDown />
            </a>
            <a className="sort-by-reaction" href="#">
              <Laugh />
            </a>
            <a className="sort-by-reaction" href="#">
              <Hooray />
            </a>
            <a className="sort-by-reaction" href="#">
              <Confused />
            </a>
            <a className="sort-by-reaction" href="#">
              <Heart />
            </a>
          </div>
        </section>
      </nav>
    )
  }
}

export {IssueSearch}
