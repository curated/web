import Card, { CardHeader, CardBody, CardFooter } from './card'

import './issue-card.scss'

const openIssue = require('../static/issue/open.svg')
const closedIssue = require('../static/issue/closed.svg')

const thumbsUp = require('../static/emoji/thumbs-up.svg')
const thumbsDown = require('../static/emoji/thumbs-down.svg')
const laugh = require('../static/emoji/laugh.svg')
const hooray = require('../static/emoji/hooray.svg')
const confused = require('../static/emoji/confused.svg')
const heart = require('../static/emoji/heart.svg')

export default () => (
  <Card>
    <CardHeader className="issue-header">
      <div className="issue-author">
        <img
          src="https://avatars2.githubusercontent.com/u/777396?s=460&v=4"
          alt="wcamarao"
          height="32"
        />
        <a href="#">wcamarao</a>
      </div>
      <div className="issue-repository">
        <div>
          <a href="#">kelseyhightower</a>
          <span>/</span>
          <a href="#">nocode</a>
        </div>
      </div>
    </CardHeader>

    <CardBody>
      <img className="issue-state" src={openIssue} alt="OPEN" />
      <div className="issue-title">
        Pellentesque habitant morbi tristique senectus et netus et malesuada
        fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae,
        ultricies eget, tempor sit amet, ante. Pellentesque habitant morbi
        tristique senectus et netus et malesuada fames ac turpis egestas.
        <div className="issue-timestamp">#50 opened 5 days ago</div>
      </div>
    </CardBody>

    <CardFooter className="issue-footer">
      <div className="issue-emoji thin-emoji">
        <img src={thumbsUp} alt="Thumbs Up" height="24" />
        <span>61</span>
      </div>

      <div className="issue-emoji thin-emoji">
        <img src={thumbsDown} alt="Thumbs Down" height="24" />
        <span>16</span>
      </div>

      <div className="issue-emoji">
        <img src={laugh} alt="Laugh" height="24" />
        <span>34</span>
      </div>

      <div className="issue-emoji">
        <img src={hooray} alt="Hooray" height="24" />
        <span>43</span>
      </div>

      <div className="issue-emoji">
        <img src={confused} alt="Confused" height="24" />
        <span>25</span>
      </div>

      <div className="issue-emoji">
        <img src={heart} alt="Heart" height="24" />
        <span>52</span>
      </div>
    </CardFooter>
  </Card>
)
