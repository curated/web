import {action, observable} from 'mobx'
import {history} from './History'
import {elastic} from './Elastic'
import {github} from './GitHub'
import {Issue} from './Issue'

class IssueStore {
  @observable loading = true
  @observable error = null

  @observable match = null
  @observable q = null
  @observable sortField = 'updatedAt'
  @observable issues = []
  @observable total = 0

  static sortOrder = 'desc'
  static serviceUnavailableError = 'Service unavailable'

  constructor() {
    this.sortField = history.getQuery('sortBy') || this.sortField
    history.setQuery('replace', {sortBy: this.sortField})
  }

  @action
  async sortBy(sortField) {
    history.setQuery('push', {sortBy: sortField})
    this.sortField = sortField
    await this.search(this.match, this.q)
  }

  @action
  async search(match, q) {
    if (match && q) {
      history.setQuery('push', {match, q})
    } else {
      history.removeQuery('push', ['match', 'q'])
    }
    this.match = match
    this.q = q
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
  async loadComments(issue) {
    issue.commentsLoading = true
    issue.commentsError = null
    try {
      const res = await github.comments(issue)
      issue.commentsLoading = false
      issue.commentsError = null
      issue.comments = issue.comments.concat(res)
    } catch (e) {
      issue.commentsLoading = false
      issue.commentsError = IssueStore.serviceUnavailableError
      issue.comments = []
    }
  }

  @action
  toggle(issue) {
    issue.fetchCommentsTotal()
    issue.collapsed = !issue.collapsed
  }

  hasMore() {
    return this.total > this.issues.length
  }

  getParams() {
    return {
      match: this.match && this.q ? {[this.match]: this.q} : null,
      sort: `${history.getQuery('sortBy')}:${IssueStore.sortOrder}`,
      from: this.issues.length,
    }
  }
}

export const issueStore = new IssueStore()
