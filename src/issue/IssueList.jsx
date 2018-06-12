import React from 'react'
import {IssueListItem} from './IssueListItem'
import './IssueList.scss'

class IssueList extends React.Component {
  render() {
    return (
      <article className="issue-list">
        <h1>Issues</h1>
        <IssueListItem />
        <IssueListItem />
        <IssueListItem />
        <IssueListItem />
      </article>
    )
  }
}

export {IssueList}
