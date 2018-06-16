import React from 'react'
import PropTypes from 'prop-types'
import {fmt} from '../common/Fmt'
import {issueStore} from './IssueStore'
import {Open} from '../assets/issue/Open'
import {Closed} from '../assets/issue/Closed'
import {ThumbsUp} from '../assets/emoji/ThumbsUp'
import {ThumbsDown} from '../assets/emoji/ThumbsDown'
import {Laugh} from '../assets/emoji/Laugh'
import {Hooray} from '../assets/emoji/Hooray'
import {Confused} from '../assets/emoji/Confused'
import {Heart} from '../assets/emoji/Heart'
import './IssueListItem.scss'

class IssueListItem extends React.Component {
  render() {
    const {issue} = this.props

    return (
      <section className="issue-list-item">
        <a className="text-small" href="/#">
          {issue.repoOwnerLogin}
        </a>

        <span className="color-mid text-small"> / </span>

        <a className="text-small" href="/#">
          {issue.repoName}
        </a>

        <span className="text-small">
          {` ${fmt.number(issue.repoForks)}`} forks
          {` ${fmt.number(issue.repoStargazers)}`} stars
        </span>

        <div className="issue-box">
          <div className="issue-row">
            <div className="issue-state">
              {issue.state === 'OPEN' ? <Open /> : <Closed />}
            </div>

            <div className="issue-details">
              <a className="issue-title" href="/#">
                {issue.title}
              </a>

              <span className="color-mid text-small">
                <a href="/#">#{issue.number}</a>
                {' by '}
                <a href="/#">{issue.authorLogin}</a>
                <span className="separator"> | </span>
                <span
                  className={`${
                    issueStore.sortBy === 'createdAt' ? 'active' : ''
                  }`}
                  title={fmt.datetime(issue.createdAt)}>
                  {' opened '}
                  {fmt.timeAgo(issue.createdAt)}
                </span>
                <span className="separator"> | </span>
                <span
                  className={`${
                    issueStore.sortBy === 'updatedAt' ? 'active' : ''
                  }`}
                  title={fmt.datetime(issue.updatedAt)}>
                  {' updated '}
                  {fmt.timeAgo(issue.updatedAt)}
                </span>
              </span>
            </div>
          </div>

          <div className="issue-reactions">
            <div
              className={`issue-reaction ${
                issueStore.sortBy === 'thumbsUp' ? 'active' : ''
              }`}>
              <div className="issue-reaction-count">
                {fmt.number(issue.thumbsUp)}
              </div>
              <ThumbsUp />
            </div>

            <div
              className={`issue-reaction ${
                issueStore.sortBy === 'thumbsDown' ? 'active' : ''
              }`}>
              <div className="issue-reaction-count">
                {fmt.number(issue.thumbsDown)}
              </div>
              <ThumbsDown />
            </div>

            <div
              className={`issue-reaction ${
                issueStore.sortBy === 'laugh' ? 'active' : ''
              }`}>
              <div className="issue-reaction-count">
                {fmt.number(issue.laugh)}
              </div>
              <Laugh />
            </div>

            <div
              className={`issue-reaction ${
                issueStore.sortBy === 'hooray' ? 'active' : ''
              }`}>
              <div className="issue-reaction-count">
                {fmt.number(issue.hooray)}
              </div>
              <Hooray />
            </div>

            <div
              className={`issue-reaction ${
                issueStore.sortBy === 'confused' ? 'active' : ''
              }`}>
              <div className="issue-reaction-count">
                {fmt.number(issue.confused)}
              </div>
              <Confused />
            </div>

            <div
              className={`issue-reaction ${
                issueStore.sortBy === 'heart' ? 'active' : ''
              }`}>
              <div className="issue-reaction-count">
                {fmt.number(issue.heart)}
              </div>
              <Heart />
            </div>
          </div>
        </div>
      </section>
    )
  }
}

IssueListItem.propTypes = {
  issue: PropTypes.object.isRequired,
}

export {IssueListItem}
