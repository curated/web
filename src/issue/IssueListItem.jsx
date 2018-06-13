import React from 'react'
import {Open} from '../assets/issue/Open'
// import {Closed} from '../assets/issue/Closed'
import {ThumbsUp} from '../assets/emoji/ThumbsUp'
import {ThumbsDown} from '../assets/emoji/ThumbsDown'
import {Laugh} from '../assets/emoji/Laugh'
import {Hooray} from '../assets/emoji/Hooray'
import {Confused} from '../assets/emoji/Confused'
import {Heart} from '../assets/emoji/Heart'
import './IssueListItem.scss'

class IssueListItem extends React.Component {
  render() {
    return (
      <section className="issue-list-item">
        <a className="text-small" href="/#">
          Microsoft
        </a>
        <span className="color-mid text-small"> / </span>
        <a className="text-small" href="/#">
          vscode
        </a>
        <div className="issue-box">
          <div className="issue-row">
            <div className="issue-state">
              <Open />
            </div>
            <div className="issue-details">
              <a className="issue-title" href="/#">
                Perhaps there will be an issue with an average title size
              </a>
              <a className="text-small" href="/#">
                #910
              </a>
              <span className="color-mid text-small">
                {' '}
                opened 17 minutes ago by{' '}
              </span>
              <a className="text-small" href="/#">
                ntucker
              </a>
            </div>
          </div>
          <div className="issue-reactions">
            <div className="issue-reaction">
              <div className="issue-reaction-count">1321</div>
              <ThumbsUp />
            </div>
            <div className="issue-reaction">
              <div className="issue-reaction-count">231</div>
              <ThumbsDown />
            </div>
            <div className="issue-reaction">
              <div className="issue-reaction-count">332</div>
              <Laugh />
            </div>
            <div className="issue-reaction">
              <div className="issue-reaction-count">131</div>
              <Hooray />
            </div>
            <div className="issue-reaction">
              <div className="issue-reaction-count">212</div>
              <Confused />
            </div>
            <div className="issue-reaction">
              <div className="issue-reaction-count">213</div>
              <Heart />
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export {IssueListItem}
