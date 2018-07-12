import React from 'react'
import PropTypes from 'prop-types'
import {observer} from 'mobx-react'
import {debounce} from 'throttle-debounce'
import {Owner} from '../assets/github/Owner'
import {Repo} from '../assets/github/Repo'
import {Language} from '../assets/github/Language'
import {Author} from '../assets/github/Author'
import {autocompleteStore} from '../core/AutocompleteStore'
import {issueStore} from '../core/IssueStore'
import './Search.scss'

@observer
class Search extends React.Component {
  static debounceInterval = 1
  static tabKey = 9
  static downKey = 40
  static upKey = 38
  static enterKey = 13

  componentDidMount() {
    this.debouncedAutocomplete = debounce(Search.debounceInterval, () =>
      this.autocomplete(),
    )
  }

  render() {
    return (
      <div className="search" onKeyUp={e => this.onSearchKeyUp(e)}>
        <input
          id="search-input"
          placeholder="Search..."
          value={autocompleteStore.term}
          onFocus={() => this.autocomplete()}
          onChange={e => this.onInputChange(e)}
        />
        <Autocomplete search={() => this.search()} />
      </div>
    )
  }

  autocomplete() {
    autocompleteStore.autocomplete()
  }

  search() {
    const search = autocompleteStore.getSearch()
    autocompleteStore.resetAutocomplete()
    issueStore.search(search.match, search.q)
  }

  onInputChange(e) {
    autocompleteStore.updateTerm(e.target.value)
    this.debouncedAutocomplete()
  }

  onSearchKeyUp(e) {
    if (e.keyCode === Search.tabKey && autocompleteStore.hasItems()) {
      e.preventDefault()
    }

    if (e.keyCode === Search.downKey) {
      autocompleteStore.highlight(1)
    }

    if (e.keyCode === Search.upKey) {
      autocompleteStore.highlight(-1)
    }

    if (e.keyCode === Search.enterKey) {
      this.search()
    }
  }
}

/**
 * Autocomplete
 */
@observer
class Autocomplete extends React.Component {
  static iconMap = {
    repoOwnerLogin: <Owner />,
    repoName: <Repo />,
    repoLanguage: <Language />,
    authorLogin: <Author />,
  }

  render() {
    if (!autocompleteStore.hasItems()) {
      return null
    }

    return (
      <ul className="autocomplete">
        {autocompleteStore.items.map((item, i) => (
          <li
            key={i}
            className={item.highlighted ? 'highlight' : ''}
            onMouseOver={() => this.onItemMouseOver(item)}
            onClick={() => this.onItemClick()}>
            {Autocomplete.iconMap[item.field]}
            {item.value} <span className="item-count">({item.count})</span>
          </li>
        ))}
      </ul>
    )
  }

  onItemMouseOver(item) {
    autocompleteStore.replaceHighlight(item)
  }

  onItemClick() {
    this.props.search()
  }
}

Autocomplete.propTypes = {
  search: PropTypes.func.isRequired,
}

/**
 * Export
 */
export {Search}
