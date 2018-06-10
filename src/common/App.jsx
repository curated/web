import React from 'react'
import {configure} from 'mobx'
import {Route, Switch} from 'react-router-dom'
import {TopNav} from './TopNav'
import {Issues} from '../issues/Issues'
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
        <Route exact path="/" component={Issues} />
        <Route component={NotFound} />
      </Switch>
    </main>
  </div>
)

const NotFound = () => <h1>Not Found</h1>

export {App}
