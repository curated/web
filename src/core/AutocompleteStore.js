import {action, observable} from 'mobx'
import {elastic} from './Elastic'

class Item {
  @observable highlighted = false

  constructor(item) {
    this.field = item.field
    this.value = item.value
    this.count = item.count
  }
}

class AutocompleteStore {
  closed = false

  @observable term = ''
  @observable items = []

  @action
  async autocomplete(term) {
    if (this.term === term) {
      return
    }
    try {
      this.closed = false
      const res = await elastic.autocomplete(term)
      if (!closed) {
        this.term = term
        this.items = res.map(item => new Item(item))
      }
    } catch (_) {
      this.term = ''
      this.items = []
    }
  }

  @action
  closeAutocomplete() {
    this.term = ''
    this.items = []
    this.closed = true
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
  replaceHighlight(item) {
    const current = this.getHighlighted()
    if (current) {
      current.highlighted = false
    }
    item.highlighted = true
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

  hasItems() {
    return this.items.length > 0
  }
}

export const autocompleteStore = new AutocompleteStore()
