import React from 'react'
import {configure} from 'mobx'
import {Redirect, Route, Switch} from 'react-router-dom'
import {TopNav} from './TopNav'
import {IssueContainer} from '../issue/IssueContainer'
import 'babel-polyfill'
import './App.scss'

configure({
  enforceActions: true,
  computedRequiresReaction: true,
  isolateGlobalState: true,
})

const App = () => (
  <div className="app">
    <TopNav />
    <main>
      <Switch>
        <Route exact path="/" component={IssueContainer} />
        <Route component={() => <Redirect to="/" />} />
      </Switch>
    </main>
  </div>
)

export {App}
