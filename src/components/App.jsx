import React from 'react'
import {configure} from 'mobx'
import {observer} from 'mobx-react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {headerStore} from '../core/HeaderStore'
import {Header} from './Header'
import {Footer} from './Footer'
import {IssueList} from './IssueList'
import 'babel-polyfill'
import './App.scss'

configure({
  enforceActions: true,
  computedRequiresReaction: true,
  isolateGlobalState: true,
})

@observer
class App extends React.Component {
  render() {
    return (
      <div className="app" onClick={e => this.close(e)}>
        <div className={`overlay-fx ${headerStore.info ? 'on' : ''}`} />
        <Header />
        <main className="container">
          <Switch>
            <Route exact path="/" component={IssueList} />
            <Route component={() => <Redirect to="/" />} />
          </Switch>
          <Footer />
        </main>
      </div>
    )
  }

  close(e) {
    if (e.target.closest && e.target.closest('.info')) {
      return
    }
    e.preventDefault()
    if (headerStore.info) {
      headerStore.toggleInfo()
    }
  }
}

export {App}
