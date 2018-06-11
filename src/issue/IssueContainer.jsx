import React from 'react'
import {observer} from 'mobx-react'
import {issueContainerStore} from './IssueContainerStore'
import {IssueSearch} from './IssueSearch'
import {IssueList} from './IssueList'
import './IssueContainer.scss'

@observer
class IssueContainer extends React.Component {
  render() {
    const c = `issue-container ${issueContainerStore.nav ? ' nav-visible' : ''}`
    return (
      <div className={c}>
        <IssueSearch />
        <IssueList />
      </div>
    )
  }
}
export {IssueContainer}
