import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import {observer} from 'mobx-react'
import {Loading} from '../assets/Loading'
import {IssueListItem} from './IssueListItem'
import {issueStore} from '../core/IssueStore'
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
      return <div className="error">{issueStore.error}</div>
    }

    const loader = (
      <div key={0} className="loading-more">
        Loading more...
      </div>
    )

    return (
      <InfiniteScroll
        loadMore={() => issueStore.load()}
        hasMore={issueStore.hasMore()}
        loader={loader}
        threshold={0}>
        {issueStore.issues.map(issue => (
          <IssueListItem key={issue.id} issue={issue} />
        ))}
      </InfiniteScroll>
    )
  }
}

export {IssueList}
