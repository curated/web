import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import {observer} from 'mobx-react'
import {fmt} from '../core/Fmt'
import {Loading} from '../assets/Loading'
import {IssueListItem} from './IssueListItem'
import {issueStore} from '../core/IssueStore'
import {Owner} from '../assets/github/Owner'
import {Repo} from '../assets/github/Repo'
import {Language} from '../assets/github/Language'
import {Author} from '../assets/github/Author'
import './IssueList.scss'

@observer
class IssueList extends React.Component {
  componentDidMount() {
    issueStore.search()
  }

  render() {
    return <article className="issue-list">{this.renderIssues()}</article>
  }

  renderIssues() {
    if (issueStore.issues.length === 0 && issueStore.loading) {
      return <Loading />
    }

    if (issueStore.error) {
      return <div className="summary error">{issueStore.error}</div>
    }

    if (issueStore.total === 0) {
      return <div className="summary">None found</div>
    }

    const loader = (
      <div key={0} className="loading-more">
        Loading more...
      </div>
    )

    return (
      <div>
        <Summary />
        <InfiniteScroll
          loadMore={() => issueStore.load()}
          hasMore={issueStore.hasMore()}
          loader={loader}
          threshold={0}>
          {issueStore.issues.map((issue, i) => (
            <IssueListItem key={i} issue={issue} />
          ))}
        </InfiniteScroll>
      </div>
    )
  }
}

class Summary extends React.Component {
  static matchMap = {
    title: ['matching', null],
    repoOwnerLogin: ['in', <Owner key={0} />],
    repoName: ['in', <Repo key={0} />],
    repoLanguage: ['in', <Language key={0} />],
    authorLogin: ['by', <Author key={0} />],
  }

  render() {
    if (!issueStore.match) {
      return null
    }

    const [matching, icon] = Summary.matchMap[Object.keys(issueStore.match)[0]]
    const term = Object.values(issueStore.match)[0]

    return (
      <div className="summary">
        {`Found ${fmt.number(issueStore.total)} issues ${matching} `}
        {icon} {term}
        <a
          className="reset-search"
          href="/#"
          onClick={e => this.resetSearch(e)}>
          &#10005;
        </a>
      </div>
    )
  }

  resetSearch(e) {
    e.preventDefault()
    issueStore.search()
  }
}

export {IssueList}
