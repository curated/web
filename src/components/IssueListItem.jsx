import React from 'react'
import PropTypes from 'prop-types'
import {fmt} from '../core/Fmt'
import {issueStore} from '../core/IssueStore'
import {ThumbsUp} from '../assets/emoji/ThumbsUp'
import {ThumbsDown} from '../assets/emoji/ThumbsDown'
import {Laugh} from '../assets/emoji/Laugh'
import {Hooray} from '../assets/emoji/Hooray'
import {Confused} from '../assets/emoji/Confused'
import {Heart} from '../assets/emoji/Heart'
import {Open} from '../assets/issue/Open'
import {Closed} from '../assets/issue/Closed'
import {Fork} from '../assets/repo/Fork'
import {Star} from '../assets/repo/Star'
import './IssueListItem.scss'

class IssueListItem extends React.Component {
  static iconMap = {
    thumbsUp: <ThumbsUp />,
    thumbsDown: <ThumbsDown />,
    laugh: <Laugh />,
    hooray: <Hooray />,
    confused: <Confused />,
    heart: <Heart />,
  }

  render() {
    const {issue} = this.props

    return (
      <section className="issue-list-item">
        <div className="issue-title">
          <a href="/#">{issue.title}</a>
        </div>
        <div className="color-mid text-small">
          {this.renderRepo(issue)}
          {this.renderMeta(issue)}
          {this.renderReaction(issue)}
        </div>
      </section>
    )
  }

  renderRepo(issue) {
    return (
      <div className="issue-repo">
        <a href="/#">{issue.repoOwnerLogin}</a>
        {' / '}
        <a href="/#">{issue.repoName}</a>
        <Star /> {` ${fmt.number(issue.repoStargazers)}`}
        <Fork /> {` ${fmt.number(issue.repoForks)}`}
      </div>
    )
  }

  renderMeta(issue) {
    const timestamp = (field, label) => (
      <span
        className={`${issueStore.sortField === field ? 'active' : ''}`}
        title={fmt.datetime(issue[field])}>
        {` ${label} `}
        {fmt.timeAgo(issue[field])}
      </span>
    )

    const metatime =
      issueStore.sortField === 'updatedAt'
        ? timestamp('updatedAt', 'updated')
        : timestamp('createdAt', 'opened')

    return (
      <div className="issue-meta">
        {issue.state === 'OPEN' ? <Open /> : <Closed />}
        {' by '}
        <a href="/#">{issue.authorLogin}</a>
        {metatime}
      </div>
    )
  }

  renderReaction(issue) {
    const reaction = this.getReaction(issue)

    return (
      <div className="issue-reactions">
        <div className="issue-reaction">
          {reaction.icon}
          {fmt.number(reaction.value)}
        </div>
      </div>
    )
  }

  getReaction(issue) {
    let icon = IssueListItem.iconMap[issueStore.sortField]
    if (icon) {
      return {
        icon,
        value: issue[issueStore.sortField],
      }
    }
    return this.getMaxReaction(issue)
  }

  getMaxReaction(issue) {
    const max = {value: 0}
    for (const reaction of Object.keys(IssueListItem.iconMap)) {
      if (issue[reaction] > max.value) {
        max.icon = IssueListItem.iconMap[reaction]
        max.value = issue[reaction]
      }
    }
    return max
  }
}

IssueListItem.propTypes = {
  issue: PropTypes.object.isRequired,
}

export {IssueListItem}
