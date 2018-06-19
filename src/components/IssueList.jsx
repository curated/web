import React from 'react'
import {observer} from 'mobx-react'
import {Loading} from '../assets/Loading'
import {IssueListItem} from './IssueListItem'
import {issueStore} from '../core/IssueStore'
import './IssueList.scss'

@observer
class IssueList extends React.Component {
  componentDidMount() {
    issueStore.searchIssues()
  }

  render() {
    return <article className="issue-list">{this.renderIssues()}</article>
  }

  renderIssues() {
    if (issueStore.loading) {
      return <Loading />
    }

    if (issueStore.error) {
      return (
        <div className="color-red issue-list-error">{issueStore.error}</div>
      )
    }

    return issueStore.issues.map(issue => (
      <IssueListItem key={issue.id} issue={issue} />
    ))
  }
}

export {IssueList}
