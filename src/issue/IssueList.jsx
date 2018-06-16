import React from 'react'
import {observer} from 'mobx-react'
import {Loading} from '../assets/Loading'
import {IssueListItem} from './IssueListItem'
import {issueStore} from './IssueStore'
import './IssueList.scss'

@observer
class IssueList extends React.Component {
  componentDidMount() {
    issueStore.searchIssues()
  }

  render() {
    return (
      <article className="issue-list">
        <h1>Issues ({issueStore.total})</h1>
        {this.renderIssues()}
      </article>
    )
  }

  renderIssues() {
    if (issueStore.loading) {
      return <Loading />
    }

    if (issueStore.error) {
      return <div className="color-red">{issueStore.error}</div>
    }

    return issueStore.issues.map(issue => (
      <IssueListItem key={issue.id} issue={issue} />
    ))
  }
}

export {IssueList}
