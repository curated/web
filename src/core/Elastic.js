import Elasticsearch from 'elasticsearch-browser'

const host = atob(
  'eTBuMXpoMGpkYTpsd3U4ajZwd25jQGN1cmF0ZWQtNjQzODc2NDI0OC51cy13ZXN0LTIuYm9uc2Fpc2VhcmNoLm5ldA==',
)

class Elastic {
  static client = new Elasticsearch.Client({host})

  static issue = {
    index: 'issue',
    type: 'issue',
  }

  static search = {
    size: 10,
    filterPath: ['hits.total', 'hits.hits._source'],
  }

  static autocomplete = {
    size: 3,
    filterPath: [
      'aggregations.repoOwnerLogin.buckets',
      'aggregations.repoName.buckets',
      'aggregations.repoLanguage.buckets',
      'aggregations.authorLogin.buckets',
    ],
  }

  search(params) {
    const body = {}
    if (params.match) {
      body.query = {
        match: params.match,
      }
    }
    return Elastic.client
      .search({
        index: Elastic.issue.index,
        type: Elastic.issue.type,
        filterPath: Elastic.search.filterPath,
        size: Elastic.search.size,
        sort: params.sort,
        from: params.from,
        body,
      })
      .then(res => {
        return {
          total: res.hits.total,
          issues: (res.hits.hits || []).map(hit => hit._source),
        }
      })
  }

  autocomplete(t) {
    const term = this.horrify(t)
    if (term.length === 0) {
      return new Promise(res => res([]))
    }
    return Elastic.client
      .search({
        index: Elastic.issue.index,
        type: Elastic.issue.type,
        filterPath: Elastic.autocomplete.filterPath,
        body: {
          aggs: {
            repoOwnerLogin: this.aggregate(term, 'repoOwnerLogin'),
            repoName: this.aggregate(term, 'repoName'),
            repoLanguage: this.aggregate(term, 'repoLanguage'),
            authorLogin: this.aggregate(term, 'authorLogin'),
          },
        },
      })
      .then(res => {
        return Array.prototype.concat(
          this.aggregations(res, 'repoOwnerLogin'),
          this.aggregations(res, 'repoName'),
          this.aggregations(res, 'repoLanguage'),
          this.aggregations(res, 'authorLogin'),
        )
      })
  }

  aggregate(horrified, field) {
    return {
      terms: {
        field,
        include: `.*${horrified}.*`,
        size: Elastic.autocomplete.size,
      },
    }
  }

  aggregations(res, field) {
    return res.aggregations[field].buckets.map(bucket => {
      return {field, value: bucket.key, count: bucket.doc_count}
    })
  }

  horrify(term) {
    let pattern = ''
    for (const char of term.trim()) {
      if (char.match(/[A-Za-z]/)) {
        pattern += `[${char.toUpperCase()}${char.toLowerCase()}]`
      }
      if (char.match(/[\d-_]/)) {
        pattern += char
      }
    }
    return pattern
  }
}

export const elastic = new Elastic()
