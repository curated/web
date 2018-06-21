import React from 'react'
import {observer} from 'mobx-react'
import {headerStore} from '../core/HeaderStore'
import {Bonsai} from '../assets/logo/Bonsai'
import {GraphQL} from '../assets/logo/GraphQL'
import {GitHub} from '../assets/logo/GitHub'
import {Zeit} from '../assets/logo/Zeit'
import './About.scss'

@observer
class About extends React.Component {
  render() {
    return (
      <div className={`about ${headerStore.about ? '' : 'collapsed'}`}>
        <div className="info">
          Curated is an indexed dataset of popular GitHub comments ranked by
          user reactions. It&#39;s written in Golang and React and it&#39;s
          available thanks to open source hosting by:
        </div>

        <a href="https://zeit.co" rel="noopener noreferrer" target="_blank">
          <Zeit /> Zeit serverless
        </a>

        <a href="https://bonsai.io" rel="noopener noreferrer" target="_blank">
          <Bonsai /> Bonsai Elasticsearch
        </a>

        <a
          href="https://developer.github.com/v4"
          rel="noopener noreferrer"
          target="_blank">
          <GraphQL /> GitHub GraphQL
        </a>

        <a
          href="https://github.com/curated"
          rel="noopener noreferrer"
          target="_blank">
          <GitHub /> Source code
        </a>
      </div>
    )
  }
}

export {About}
