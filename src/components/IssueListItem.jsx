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
  render() {
    return (
      <section
        className={`issue-list-item ${
          this.props.issue.collapsed ? '' : 'expanded'
        }`}>
        <div className="issue-title">
          <a href="/#" onClick={e => this.toggleIssue(e, this.props.issue)}>
            {this.props.issue.title}
          </a>
        </div>
        <div className="issue-details">
          <IssueRepo issue={this.props.issue} />
          <IssueMeta issue={this.props.issue} />
          <IssueReactions issue={this.props.issue} />
        </div>
        <div
          className={`issue-body ${
            this.props.issue.collapsed ? 'collapsed' : ''
          }`}
          dangerouslySetInnerHTML={{__html: marked(this.props.issue.body)}}
        />
      </section>
    )
  }

  toggleIssue(e, issue) {
    e.preventDefault()
    issueStore.toggle(issue)
  }
}

IssueListItem.propTypes = {
  issue: PropTypes.object.isRequired,
}

/**
 * IssueRepo
 */
class IssueRepo extends React.Component {
  render() {
    return (
      <div className="issue-repo">
        <a className="m-right" href="/#" onClick={e => this.searchByOwner(e)}>
          <Owner />
          {this.props.issue.repoOwnerLogin}
        </a>
        <a className="m-right" href="/#" onClick={e => this.searchByRepo(e)}>
          <Repo />
          {this.props.issue.repoName}
        </a>
        <div className="issue-repo-breakpoint">
          <RepoLanguage language={this.props.issue.repoLanguage} />
          <RepoMeta val={this.props.issue.repoStargazers} icon={<Star />} />
          <RepoMeta val={this.props.issue.repoForks} icon={<Fork />} />
        </div>
      </div>
    )
  }

  searchByOwner(e) {
    e.preventDefault()
    issueStore.search({repoOwnerLogin: this.props.issue.repoOwnerLogin})
  }

  searchByRepo(e) {
    e.preventDefault()
    issueStore.search({repoName: this.props.issue.repoName})
  }
}

IssueRepo.propTypes = {
  issue: PropTypes.object.isRequired,
}

/**
 * IssoMeta
 */
class IssueMeta extends React.Component {
  render() {
    return (
      <div className="issue-meta">
        <span className="m-right">
          {this.props.issue.state === 'OPEN' ? <Open /> : <Closed />}
          {this.props.issue.number}
        </span>
        <ByAuthor login={this.props.issue.authorLogin} />
        <Timestamp issue={this.props.issue} />
        <div
          className={`issue-url ${
            this.props.issue.collapsed ? 'collapsed' : ''
          }`}>
          <a
            href={this.props.issue.url}
            rel="noopener noreferrer"
            target="_blank">
            {this.props.issue.url.substr(8)}
          </a>
        </div>
      </div>
    )
  }
}

IssueMeta.propTypes = {
  issue: PropTypes.object.isRequired,
}

/**
 * RepoLanguage
 */
class RepoLanguage extends React.Component {
  render() {
    return this.props.language === '?' ? null : (
      <a className="m-right" href="/#" onClick={e => this.searchByLanguage(e)}>
        <Language />
        {this.props.language}
      </a>
    )
  }

  searchByLanguage(e) {
    e.preventDefault()
    issueStore.search({repoLanguage: this.props.language})
  }
}

RepoLanguage.propTypes = {
  language: PropTypes.any.isRequired,
}

/**
 * RepoMeta
 */
class RepoMeta extends React.Component {
  render() {
    return this.props.val === '?' ? null : (
      <span className="m-right">
        {this.props.icon}
        {this.props.val}
      </span>
    )
  }
}

RepoMeta.propTypes = {
  val: PropTypes.any.isRequired,
  icon: PropTypes.object.isRequired,
}

/**
 * ByAuthor
 */
class ByAuthor extends React.Component {
  render() {
    return this.props.login === '?' ? null : (
      <span className="m-right">
        by{' '}
        <a href="/#" onClick={e => this.searchByAuthor(e)}>
          <Author />
          {this.props.login}
        </a>
      </span>
    )
  }

  searchByAuthor(e) {
    e.preventDefault()
    issueStore.search({authorLogin: this.props.login})
  }
}

ByAuthor.propTypes = {
  login: PropTypes.string.isRequired,
}

/**
 * Timestamp
 */
class Timestamp extends React.Component {
  render() {
    return issueStore.sortField === 'updatedAt'
      ? this.format('updatedAt', 'updated')
      : this.format('createdAt', 'opened')
  }

  format(field, label) {
    return (
      <span title={fmt.datetime(this.props.issue[field])}>
        {label} {fmt.timeAgo(this.props.issue[field])}
      </span>
    )
  }
}

Timestamp.propTypes = {
  issue: PropTypes.object.isRequired,
}

/**
 * IssueReactions
 */
class IssueReactions extends React.Component {
  static iconMap = {
    thumbsUp: <ThumbsUp />,
    thumbsDown: <ThumbsDown />,
    laugh: <Laugh />,
    hooray: <Hooray />,
    confused: <Confused />,
    heart: <Heart />,
  }

  render() {
    if (this.props.issue.collapsed) {
      return this.renderElements([this.getRelevantReaction(this.props.issue)])
    }
    return this.renderElements(this.getAllReactions(this.props.issue))
  }

  renderElements(reactions) {
    return (
      <div className="issue-reactions">
        {reactions.map(reaction => (
          <div key={reaction.key} className="issue-reaction">
            {reaction.icon}
            {fmt.number(reaction.value)}
          </div>
        ))}
      </div>
    )
  }

  getAllReactions(issue) {
    return Object.keys(IssueReactions.iconMap).map(key => {
      return {
        key,
        value: issue[key],
        icon: IssueReactions.iconMap[key],
      }
    })
  }

  getRelevantReaction(issue) {
    let icon = IssueReactions.iconMap[issueStore.sortField]
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
    for (const key of Object.keys(IssueReactions.iconMap)) {
      if (issue[key] > reaction.value) {
        reaction.key = key
        reaction.value = issue[key]
        reaction.icon = IssueReactions.iconMap[key]
      }
    }
    return reaction
  }
}

IssueReactions.propTypes = {
  issue: PropTypes.object.isRequired,
}

/**
 * Export
 */
export {IssueListItem}
