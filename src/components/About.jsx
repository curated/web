import React from 'react'
import {observer} from 'mobx-react'
import {headerStore} from '../core/HeaderStore'
import {Heart} from '../assets/emoji/Heart'
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
          <p>
            Curated is an indexed dataset of popular GitHub comments ranked by
            user reactions.
          </p>
          Open source hosting<Heart />thanks to
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
