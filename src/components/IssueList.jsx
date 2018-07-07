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
  //prettier-ignore
  static parseMap = {
    title: term => <span>matching <em>{`"${term}"`}</em></span>,
    repoOwnerLogin: owner => <span>in <Owner /> {owner}</span>,
    repoName: repo => <span>in <Repo /> {repo}</span>,
    repoLanguage: language => <span>in <Language /> {language}</span>,
    authorLogin: author => <span>by <Author /> {author}</span>
  }

  render() {
    if (!issueStore.match) {
      return null
    }

    const parse = Summary.parseMap[Object.keys(issueStore.match)[0]]
    const matchingDescription = parse(Object.values(issueStore.match)[0])

    return (
      <div className="summary">
        {`Found ${fmt.number(issueStore.total)} issues`} {matchingDescription}
        <a
          className="reset-search"
          onClick={e => this.resetSearch(e)}
          href="/#">
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
