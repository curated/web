import {action, observable} from 'mobx'
import {client} from './Client'

class IssueStore {
  @observable loading = true
  @observable error = null
  @observable sortField = 'createdAt'
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
      const params = {
        sort: this.sortField,
        asc: false,
        from: this.issues.length,
      }
      const res = await client.get('/issues', params)
      this.loading = false
      this.error = null
      this.issues = this.issues.concat(res.issues)
      this.total = res.total
    } catch (e) {
      this.loading = false
      this.error = e.toString()
      this.issues = []
      this.total = 0
    }
  }

  hasMore() {
    return this.total > this.issues.length
  }
}

export const issueStore = new IssueStore()
