import React from 'react'
import {configure} from 'mobx'
import {observer} from 'mobx-react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {headerStore} from '../core/HeaderStore'
import {autocompleteStore} from '../core/AutocompleteStore'
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
      <div className="app" onClick={e => this.closeDialogs(e)}>
        <div className={`overlay-fx ${this.showFx() ? 'on' : ''}`} />
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

  showFx() {
    return headerStore.info || autocompleteStore.hasSuggestions()
  }

  closeDialogs(e) {
    this.closeInfo(e)
    this.closeAutocomplete(e)
  }

  closeInfo(e) {
    if (
      headerStore.info &&
      !e.target.closest('.info') &&
      !e.target.closest('.info-toggler')
    ) {
      headerStore.toggleInfo()
    }
  }

  closeAutocomplete(e) {
    if (
      autocompleteStore.hasSuggestions() &&
      !e.target.closest('.search') &&
      !e.target.closest('.search-toggler')
    ) {
      autocompleteStore.closeAutocomplete()
    }
  }
}

export {App}
