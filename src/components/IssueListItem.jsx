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

class IssueListItem extends React.Component {
  render() {
    return (
      <section className="issue-list-item">
        <IssueTitle issue={this.props.issue} />
        <IssueRepo issue={this.props.issue} />
        <IssueMeta issue={this.props.issue} />
        <IssueReactions issue={this.props.issue} />
        <IssueBody issue={this.props.issue} />
        <IssueComments issue={this.props.issue} />
      </section>
    )
  }
}

IssueListItem.propTypes = {
  issue: PropTypes.object.isRequired,
}

/**
 * IssueTitle
 */
@observer
class IssueTitle extends React.Component {
  render() {
    return (
      <div className="issue-title">
        <a
          className={this.props.issue.collapsed ? '' : 'expanded'}
          onClick={e => this.toggle(e)}
          href="/#">
          {this.props.issue.title}
        </a>
      </div>
    )
  }

  toggle(e) {
    e.preventDefault()
    issueStore.toggle(this.props.issue)
  }
}

IssueTitle.propTypes = {
  issue: PropTypes.object.isRequired,
}

/**
 * IssueBody
 */
@observer
class IssueBody extends React.Component {
  render() {
    return (
      <div
        className={`issue-body ${
          this.props.issue.collapsed ? 'collapsed' : ''
        }`}
        dangerouslySetInnerHTML={{__html: marked(this.props.issue.body)}}
      />
    )
  }
}

IssueBody.propTypes = {
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
          <RepoMeta count={this.props.issue.repoStargazers} icon={<Star />} />
          <RepoMeta count={this.props.issue.repoForks} icon={<Fork />} />
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
          #{this.props.issue.number}
        </span>
        <IssueAuthor login={this.props.issue.authorLogin} />
        <IssueTimestamp issue={this.props.issue} />
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
    return this.props.count === '?' ? null : (
      <span className="m-right">
        {this.props.icon}
        {fmt.number(this.props.count)}
      </span>
    )
  }
}

RepoMeta.propTypes = {
  count: PropTypes.any.isRequired,
  icon: PropTypes.object.isRequired,
}

/**
 * IssueAuthor
 */
class IssueAuthor extends React.Component {
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

IssueAuthor.propTypes = {
  login: PropTypes.string.isRequired,
}

/**
 * IssueTimestamp
 */
class IssueTimestamp extends React.Component {
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

IssueTimestamp.propTypes = {
  issue: PropTypes.object.isRequired,
}

/**
 * IssueReactions
 */
@observer
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
        {reactions.map(
          reaction =>
            reaction.value === 0 ? null : (
              <div key={reaction.key} className="issue-reaction">
                {reaction.icon}
                {fmt.number(reaction.value)}
              </div>
            ),
        )}
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
 * IssueComments
 */
@observer
class IssueComments extends React.Component {
  render() {
    return (
      <div
        className={`issue-comments ${
          this.props.issue.collapsed ? 'collapsed' : ''
        }`}>
        {this.props.issue.comments.map((comment, i) => (
          <IssueComment key={i} comment={comment} />
        ))}
        {this.renderCommentsFooter()}
      </div>
    )
  }

  renderCommentsFooter() {
    return (
      <div className="issue-comments-footer">
        {this.renderLoadComments()}
        <a
          className="f-right"
          href={this.props.issue.url}
          rel="noopener noreferrer"
          target="_blank">
          Open on GitHub
        </a>
      </div>
    )
  }

  renderLoadComments() {
    if (
      this.props.issue.commentsLoading ||
      !this.props.issue.hasLoadedCommentsTotal()
    ) {
      return <span className="load-comments">Loading...</span>
    }

    if (this.props.issue.commentsTotal === 0) {
      return <span className="load-comments">No comments</span>
    }

    if (this.props.issue.comments.length === this.props.issue.commentsTotal) {
      return (
        <span className="load-comments">
          All comments loaded ({this.props.issue.commentsTotal})
        </span>
      )
    }

    // prettier-ignore
    const stats = this.props.issue.comments.length > 0
      ? ` (${this.props.issue.comments.length}/${this.props.issue.commentsTotal})`
      : ` (${this.props.issue.commentsTotal})`

    return (
      <span className="load-comments">
        <a onClick={e => this.loadComments(e)} href="/#">
          {this.props.issue.comments.length === 0
            ? 'Load comments'
            : 'Load more comments'}
        </a>
        {stats}
      </span>
    )
  }

  loadComments(e) {
    e.preventDefault()
    issueStore.loadComments(this.props.issue)
  }
}

IssueComments.propTypes = {
  issue: PropTypes.object.isRequired,
}

/**
 * IssueComment
 */
class IssueComment extends React.Component {
  render() {
    return (
      <div className="issue-comment">
        <div className="issue-comment-title">
          <a href="/#" onClick={e => this.searchByAuthor(e)}>
            <Author />
            {this.props.comment.authorLogin}
          </a>
          {' commented on '}
          {fmt.datetime(this.props.comment.createdAt)}
        </div>
        <div
          className="issue-comment-body"
          dangerouslySetInnerHTML={{__html: marked(this.props.comment.body)}}
        />
        {this.renderReactions()}
      </div>
    )
  }

  renderReactions() {
    if (this.props.comment.totalReactions === 0) {
      return null
    }

    return <IssueReactions issue={this.props.comment} />
  }

  searchByAuthor(e) {
    e.preventDefault()
    issueStore.search({authorLogin: this.props.comment.authorLogin})
  }
}

IssueComment.propTypes = {
  comment: PropTypes.object.isRequired,
}

/**
 * Export
 */
export {IssueListItem}
