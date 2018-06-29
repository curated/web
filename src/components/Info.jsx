import React from 'react'
import {observer} from 'mobx-react'
import {headerStore} from '../core/HeaderStore'
import {Bonsai} from '../assets/logo/Bonsai'
import {GraphQL} from '../assets/logo/GraphQL'
import {GitHub} from '../assets/logo/GitHub'
import {Heroku} from '../assets/logo/Heroku'
import './Info.scss'

@observer
class Info extends React.Component {
  render() {
    return (
      <div className={`info ${headerStore.info ? '' : 'collapsed'}`}>
        <div className="description">
          Curated is an indexed dataset of popular GitHub comments ranked by
          user reactions. It&#39;s written in Golang and React and it&#39;s
          available thanks to open source hosting by:
        </div>

        <a
          className="info-anchor"
          href="https://bonsai.io"
          rel="noopener noreferrer"
          target="_blank">
          <Bonsai /> Bonsai Elasticsearch
        </a>

        <a
          className="info-anchor"
          href="https://heroku.com"
          rel="noopener noreferrer"
          target="_blank">
          <Heroku /> Heroku Dyno Worker
        </a>

        <a
          className="info-anchor"
          href="https://developer.github.com/v4"
          rel="noopener noreferrer"
          target="_blank">
          <GraphQL /> GitHub GraphQL
        </a>

        <a
          className="info-anchor"
          href="https://github.com/curated"
          rel="noopener noreferrer"
          target="_blank">
          <GitHub /> Source
        </a>
      </div>
    )
  }
}

export {Info}
