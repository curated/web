import {action, observable} from 'mobx'
import {elastic} from './Elastic'
import {Item} from './AutocompleteItem'

class AutocompleteStore {
  @observable term = ''
  @observable items = []

  @action
  async autocomplete() {
    if (!this.term) {
      this.items = []
      return
    }
    try {
      const res = await elastic.autocomplete(this.term)
      if (this.term) {
        this.items = res.map(item => new Item(item))
      }
    } catch (_) {
      this.term = ''
      this.items = []
    }
  }

  @action
  updateTerm(term) {
    this.term = term
  }

  @action
  removeItems() {
    this.items = []
  }

  @action
  resetAutocomplete() {
    this.term = ''
    this.items = []
  }

  @action
  highlight(delta) {
    if (!this.hasItems()) {
      return
    }
    const all = this.items.slice()
    const current = this.getHighlighted()
    const next = all[all.indexOf(current) + delta]
    if (current) {
      current.highlighted = false
    }
    if (!current || !next) {
      this.initHighlight(delta)
      return
    }
    next.highlighted = true
  }

  @action
  replaceHighlight(next) {
    const current = this.getHighlighted()
    if (current) {
      current.highlighted = false
    }
    next.highlighted = true
  }

  initHighlight(delta) {
    const i = delta === 1 ? 0 : this.items.length - 1
    this.items[i].highlighted = true
  }

  getHighlighted() {
    for (const item of this.items) {
      if (item.highlighted) {
        return item
      }
    }
  }

  getSearch() {
    const item = autocompleteStore.getHighlighted()
    if (item) {
      return {
        match: item.field,
        q: item.value,
      }
    }
    const term = autocompleteStore.term.trim()
    if (term) {
      return {
        match: 'title',
        q: term,
      }
    }
  }

  hasItems() {
    return this.items.length > 0
  }
}

export const autocompleteStore = new AutocompleteStore()
