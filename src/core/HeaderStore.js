import {action, observable} from 'mobx'

class HeaderStore {
  @observable about = false

  @action
  toggleAbout() {
    this.about = !this.about
  }
}

export const headerStore = new HeaderStore()
