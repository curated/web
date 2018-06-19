import {action, observable} from 'mobx'
import {client} from './Client'

class IssueStore {
  @observable loading = true
  @observable error = null
  @observable sortField = 'createdAt'
  @observable issues = []

  @action
  async sortBy(sortField) {
    this.sortField = sortField
    await this.searchIssues()
  }

  @action
  async searchIssues() {
    this.loading = true
    this.error = null
    try {
      const params = {sort: this.sortField, asc: false, from: 0}
      const res = await client.get('/issues', params)
      this.loading = false
      this.error = null
      this.issues = res.issues
    } catch (e) {
      this.loading = false
      this.error = e.toString()
      this.issues = []
    }
  }
}

export const issueStore = new IssueStore()
