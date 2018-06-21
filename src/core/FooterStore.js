import {action, observable} from 'mobx'

class FooterStore {
  @observable next = false

  @action
  nextReactions() {
    this.next = true
  }

  @action
  prevReactions() {
    this.next = false
  }
}

export const footerStore = new FooterStore()
