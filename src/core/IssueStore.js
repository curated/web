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
  @observable sortField = 'updatedAt'
  @observable issues = []
  @observable total = 0

  @action
  async sortBy(sortField) {
    this.sortField = sortField
    await this.search()
  }

  @action
  async search() {
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
        res.issues.map(issue => new Issue(issue))
      )
    } catch (_) {
      this.loading = false
      this.error = 'Service unavailable'
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
      sort: `${this.sortField}:desc`,
      from: this.issues.length,
    }
  }
}

export const issueStore = new IssueStore()
