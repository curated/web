import {action, observable} from 'mobx'

class IssueContainerStore {
  @observable nav = window.innerWidth >= 1200

  @action
  toggleNav() {
    this.nav = !this.nav
  }
}

export const issueContainerStore = new IssueContainerStore()
