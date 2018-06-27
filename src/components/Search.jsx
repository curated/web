import React from 'react'
import {elastic} from '../core/Elastic'
import {debounce} from 'throttle-debounce'
import './Search.scss'

class Search extends React.Component {
  static debounceInterval = 300

  componentDidMount() {
    this.onInputKeyUp = debounce(Search.debounceInterval, this.autocomplete)
  }

  render() {
    return (
      <div className="search">
        <input
          id="search-input"
          placeholder="Search..."
          onKeyUp={e => this.onInputKeyUp(e.target.value)}
        />
      </div>
    )
  }

  async autocomplete(text) {
    console.log(await elastic.autocomplete(text))
  }
}

export {Search}
