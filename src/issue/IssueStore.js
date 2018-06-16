import {action, observable} from 'mobx'
import {client} from '../common/Client'

class IssueStore {
  @observable loading = true
  @observable error = null
  @observable sortBy = 'thumbsUp'
  @observable issues = []
  @observable total = 0

  @action
  async setSortBy(sortBy) {
    this.sortBy = sortBy
    await this.searchIssues()
  }

  @action
  async searchIssues() {
    this.loading = true
    this.error = null
    // this.total = 0
    try {
      const params = {sort: this.sortBy, asc: false, from: 0}
      const res = await client.get('/issues', params)
      this.loading = false
      this.issues = res.issues
      this.total = res.total
    } catch (e) {
      this.loading = false
      this.error = e
    }
  }
}

export const issueStore = new IssueStore()
