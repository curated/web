import React from 'react'
import {observer} from 'mobx-react'
import {issueStore} from '../core/IssueStore'
import {New} from '../assets/icons/New'
import {Updated} from '../assets/icons/Updated'
import {ThumbsUp} from '../assets/emoji/ThumbsUp'
import {ThumbsDown} from '../assets/emoji/ThumbsDown'
import {Laugh} from '../assets/emoji/Laugh'
import {Hooray} from '../assets/emoji/Hooray'
import {Confused} from '../assets/emoji/Confused'
import {Heart} from '../assets/emoji/Heart'
import './Footer.scss'

@observer
class Footer extends React.Component {
  render() {
    return (
      <nav className="footer">
        <div className="container">
          <a
            className={issueStore.sortField === 'createdAt' ? 'active' : ''}
            href="#"
            onClick={e => this.sortBy(e, 'createdAt')}>
            <New />
          </a>

          <a
            className={issueStore.sortField === 'updatedAt' ? 'active' : ''}
            href="#"
            onClick={e => this.sortBy(e, 'updatedAt')}>
            <Updated />
          </a>

          <a
            className={issueStore.sortField === 'thumbsUp' ? 'active' : ''}
            href="#"
            onClick={e => this.sortBy(e, 'thumbsUp')}>
            <ThumbsUp />
          </a>

          <a
            className={issueStore.sortField === 'thumbsDown' ? 'active' : ''}
            href="#"
            onClick={e => this.sortBy(e, 'thumbsDown')}>
            <ThumbsDown />
          </a>

          <a
            className={issueStore.sortField === 'laugh' ? 'active' : ''}
            href="#"
            onClick={e => this.sortBy(e, 'laugh')}>
            <Laugh />
          </a>

          <a
            className={issueStore.sortField === 'hooray' ? 'active' : ''}
            href="#"
            onClick={e => this.sortBy(e, 'hooray')}>
            <Hooray />
          </a>

          <a
            className={issueStore.sortField === 'confused' ? 'active' : ''}
            href="#"
            onClick={e => this.sortBy(e, 'confused')}>
            <Confused />
          </a>

          <a
            className={issueStore.sortField === 'heart' ? 'active' : ''}
            href="#"
            onClick={e => this.sortBy(e, 'heart')}>
            <Heart />
          </a>
        </div>
      </nav>
    )
  }

  sortBy(e, sortField) {
    e.preventDefault()
    issueStore.sortBy(sortField)
  }
}

export {Footer}