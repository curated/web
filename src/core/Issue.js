import {action, observable} from 'mobx'
import {github} from './GitHub'

export class Issue {
  @observable collapsed = true
  @observable commentsLoading = false
  @observable commentsError = null
  @observable commentsTotal = null
  @observable comments = []

  constructor(issue) {
    for (const key in issue) {
      this[key] = issue[key]
    }
    // prettier-ignore
    this.url = `https://github.com/${this.repoOwnerLogin}/${this.repoName}/issues/${this.number}`
  }

  @action
  async fetchCommentsTotal() {
    if (this.hasLoadedCommentsTotal()) {
      return
    }
    try {
      this.commentsTotal = await github.countComments(this)
    } catch (_) {
      this.commentsTotal = -1
    }
  }

  hasLoadedCommentsTotal() {
    return typeof this.commentsTotal === 'number'
  }
}
