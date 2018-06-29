import React from 'react'
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
  static debounceInterval = 300
  static tabKey = 9
  static downKey = 40
  static upKey = 38
  static enterKey = 13

  static iconMap = {
    repoOwnerLogin: <Owner />,
    repoName: <Repo />,
    repoLanguage: <Language />,
    authorLogin: <Author />,
  }

  constructor() {
    super()
    this.searchInputRef = React.createRef()
  }

  componentDidMount() {
    this.onSearchInput = debounce(Search.debounceInterval, this.autocomplete)
  }

  render() {
    return (
      <div className="search" onKeyDown={e => this.onSearchKey(e)}>
        <input
          id="search-input"
          placeholder="Search..."
          onFocus={e => this.onSearchInput(e.target.value)}
          onKeyUp={e => this.onSearchInput(e.target.value)}
          ref={this.searchInputRef}
        />
        {this.renderAutocomplete()}
      </div>
    )
  }

  renderAutocomplete() {
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
            onClick={() => this.onItemClick(item)}>
            {Search.iconMap[item.field]}
            {item.value} <span className="item-count">({item.count})</span>
          </li>
        ))}
      </ul>
    )
  }

  onItemMouseOver(item) {
    autocompleteStore.replaceHighlight(item)
  }

  onItemClick(item) {
    this.search(item)
  }

  onSearchKey(e) {
    if (e.keyCode === Search.tabKey) {
      e.preventDefault()
    }

    if (e.keyCode === Search.downKey) {
      autocompleteStore.highlight(1)
    }

    if (e.keyCode === Search.upKey) {
      autocompleteStore.highlight(-1)
    }

    if (e.keyCode === Search.enterKey) {
      const item = autocompleteStore.getHighlighted()
      this.search(item)
    }
  }

  search(s) {
    const input = this.searchInputRef.current
    const titleMatch = input.value.trim() ? {title: input.value} : null
    const match = s ? {[s.field]: s.value} : titleMatch
    input.value = ''
    autocompleteStore.closeAutocomplete()
    issueStore.search(match)
  }

  async autocomplete(text) {
    autocompleteStore.autocomplete(text)
  }
}

export {Search}
