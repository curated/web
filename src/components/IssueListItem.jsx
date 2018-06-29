import React from 'react'
import PropTypes from 'prop-types'
import {observer} from 'mobx-react'
import marked from 'marked'
import {fmt} from '../core/Fmt'
import {issueStore} from '../core/IssueStore'
import {ThumbsUp} from '../assets/emoji/ThumbsUp'
import {ThumbsDown} from '../assets/emoji/ThumbsDown'
import {Laugh} from '../assets/emoji/Laugh'
import {Hooray} from '../assets/emoji/Hooray'
import {Confused} from '../assets/emoji/Confused'
import {Heart} from '../assets/emoji/Heart'
import {Open} from '../assets/github/Open'
import {Closed} from '../assets/github/Closed'
import {Fork} from '../assets/github/Fork'
import {Star} from '../assets/github/Star'
import {Owner} from '../assets/github/Owner'
import {Repo} from '../assets/github/Repo'
import {Language} from '../assets/github/Language'
import {Author} from '../assets/github/Author'
import './IssueListItem.scss'

@observer
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
      <section
        className={`issue-list-item ${issue.collapsed ? '' : 'expanded'}`}>
        <div className="issue-title">
          <a
            href="/#"
            onClick={e => this.toggleIssue(e, issue)}
            dangerouslySetInnerHTML={{__html: issue.title}}
          />
        </div>
        <div className="issue-meta">
          {this.renderRepo(issue)}
          {this.renderMeta(issue)}
          {this.renderReactions(issue)}
        </div>
        <div
          className={`issue-body ${issue.collapsed ? 'hidden' : ''}`}
          dangerouslySetInnerHTML={{__html: marked(issue.body)}}
        />
      </section>
    )
  }

  renderRepo(issue) {
    return (
      <div className="issue-meta-row">
        <a className="m-right" href="/#" onClick={e => e.preventDefault()}>
          <Owner />
          <span dangerouslySetInnerHTML={{__html: issue.repoOwnerLogin}} />
        </a>
        <a className="m-right" href="/#" onClick={e => e.preventDefault()}>
          <Repo />
          <span dangerouslySetInnerHTML={{__html: issue.repoName}} />
        </a>
        <div className="issue-meta-breakpoint">
          <span className="m-right">
            <Language />
            <span dangerouslySetInnerHTML={{__html: issue.repoLanguage}} />
          </span>
          <span className="m-right">
            <Star />
            {fmt.number(issue.repoStargazers)}
          </span>
          <span className="m-right">
            <Fork />
            {fmt.number(issue.repoForks)}
          </span>
        </div>
      </div>
    )
  }

  renderMeta(issue) {
    const format = (field, label) => (
      <span
        className={`${issueStore.sortField === field ? 'active' : ''}`}
        title={fmt.datetime(issue[field])}>
        {` ${label} `}
        {fmt.timeAgo(issue[field])}
      </span>
    )

    const time =
      issueStore.sortField === 'updatedAt'
        ? format('updatedAt', 'updated')
        : format('createdAt', 'opened')

    return (
      <div className="issue-meta-row">
        <a href={issue.url} rel="noopener noreferrer" target="_blank">
          {issue.state === 'OPEN' ? <Open /> : <Closed />}
          #{issue.number}
        </a>
        {' by '}
        <a href="/#" onClick={e => e.preventDefault()}>
          <Author />
          <span dangerouslySetInnerHTML={{__html: issue.authorLogin}} />
        </a>
        {time}
      </div>
    )
  }

  renderReactions(issue) {
    if (issue.collapsed) {
      return this.renderReactionElements([this.getRelevantReaction(issue)])
    }
    return this.renderReactionElements(this.getAllReactions(issue))
  }

  renderReactionElements(reactions) {
    return (
      <div className="issue-reactions">
        {reactions.map(reaction => (
          <div
            key={reaction.key}
            className={`issue-reaction ${
              issueStore.sortField === reaction.key ? 'active' : ''
            }`}>
            {reaction.icon}
            {fmt.number(reaction.value)}
          </div>
        ))}
      </div>
    )
  }

  getAllReactions(issue) {
    return Object.keys(IssueListItem.iconMap).map(key => {
      return {
        key,
        value: issue[key],
        icon: IssueListItem.iconMap[key],
      }
    })
  }

  getRelevantReaction(issue) {
    let icon = IssueListItem.iconMap[issueStore.sortField]
    if (icon) {
      return {
        key: issueStore.sortField,
        value: issue[issueStore.sortField],
        icon,
      }
    }
    return this.getMaxReaction(issue)
  }

  getMaxReaction(issue) {
    const reaction = {value: 0}
    for (const key of Object.keys(IssueListItem.iconMap)) {
      if (issue[key] > reaction.value) {
        reaction.key = key
        reaction.value = issue[key]
        reaction.icon = IssueListItem.iconMap[key]
      }
    }
    return reaction
  }

  toggleIssue(e, issue) {
    e.preventDefault()
    issueStore.toggle(issue)
  }
}

IssueListItem.propTypes = {
  issue: PropTypes.object.isRequired,
}

export {IssueListItem}
