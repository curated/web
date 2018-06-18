import React from 'react'
import {configure} from 'mobx'
import {Redirect, Route, Switch} from 'react-router-dom'
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

const App = () => (
  <div className="app">
    <Header />
    <main className="container">
      <Switch>
        <Route exact path="/" component={IssueList} />
        <Route component={() => <Redirect to="/" />} />
      </Switch>
    </main>
    <Footer />
  </div>
)

export {App}
