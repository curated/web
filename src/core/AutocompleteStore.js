import {action, observable} from 'mobx'
import {elastic} from './Elastic'

class Suggestion {
  @observable highlighted = false

  constructor(suggestion) {
    for (const key in suggestion) {
      this[key] = suggestion[key]
    }
  }
}

class AutocompleteStore {
  @observable suggestText = ''
  @observable suggestions = []

  @action
  async autocomplete(text) {
    if (this.suggestText === text) {
      return
    }
    try {
      const res = await elastic.autocomplete(text)
      this.suggestText = text
      this.suggestions = res.map(suggestion => new Suggestion(suggestion))
    } catch (_) {
      this.suggestText = ''
      this.suggestions = []
    }
  }

  @action
  closeAutocomplete() {
    this.suggestText = ''
    this.suggestions = []
  }

  @action
  highlight(delta) {
    if (!this.hasSuggestions()) {
      return
    }
    const current = this.getHighlighted()
    if (!current) {
      this.initHighlight(delta)
      return
    }
    const all = this.suggestions.slice()
    const next = all[all.indexOf(current) + delta]
    current.highlighted = false
    if (!next) {
      this.initHighlight(delta)
      return
    }
    next.highlighted = true
  }

  @action
  replaceHighlight(suggestion) {
    const current = this.getHighlighted()
    if (current) {
      current.highlighted = false
    }
    suggestion.highlighted = true
  }

  initHighlight(delta) {
    const i = delta === 1 ? 0 : this.suggestions.length - 1
    this.suggestions[i].highlighted = true
  }

  getHighlighted() {
    for (const suggestion of this.suggestions) {
      if (suggestion.highlighted) {
        return suggestion
      }
    }
  }

  hasSuggestions() {
    return this.suggestions.length > 0
  }
}

export const autocompleteStore = new AutocompleteStore()
