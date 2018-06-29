import {action, observable} from 'mobx'

class HeaderStore {
  @observable info = false

  @action
  toggleInfo() {
    this.info = !this.info
  }
}

export const headerStore = new HeaderStore()
