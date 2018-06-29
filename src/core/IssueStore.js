import {action, observable} from 'mobx'
import {elastic} from './Elastic'

class Issue {
  @observable collapsed = true

  constructor(issue) {
    for (const key in issue) {
      this[key] = issue[key]
    }
    // prettier-ignore
    this.url = `https://github.com/${this.repoOwnerLogin}/${this.repoName}/issues/${this.number}`
  }
}

class IssueStore {
  @observable loading = true
  @observable error = null

  @observable match = null
  @observable sortField = 'updatedAt'
  @observable issues = []
  @observable total = 0

  static sortOrder = 'desc'
  static serviceUnavailableError = 'Service unavailable'

  @action
  async sortBy(sortField) {
    this.sortField = sortField
    await this.search(this.match)
  }

  @action
  async search(match) {
    this.match = match
    this.issues = []
    this.total = 0
    await this.load()
  }

  @action
  async load() {
    this.loading = true
    this.error = null
    try {
      const res = await elastic.search(this.getParams())
      this.loading = false
      this.error = null
      this.total = res.total
      this.issues = this.issues.concat(
        res.issues.map(issue => new Issue(issue)),
      )
    } catch (_) {
      this.loading = false
      this.error = IssueStore.serviceUnavailableError
      this.issues = []
      this.total = 0
    }
  }

  @action
  toggle(issue) {
    issue.collapsed = !issue.collapsed
  }

  hasMore() {
    return this.total > this.issues.length
  }

  getParams() {
    return {
      match: this.match,
      sort: `${this.sortField}:${IssueStore.sortOrder}`,
      from: this.issues.length,
    }
  }
}

export const issueStore = new IssueStore()
