import Elasticsearch from 'elasticsearch-browser'

class Elastic {
  static client = new Elasticsearch.Client({
    host: 'https://curated-6438764248.us-west-2.bonsaisearch.net',
  })

  static issue = {
    index: 'issue',
    type: 'issue',
  }

  static search = {
    size: 10,
    filterPath: ['hits.total', 'hits.hits._source'],
  }

  static autocomplete = {
    size: 10,
    filterPath: [
      'aggregations.repoLanguage.buckets',
      'aggregations.repoOwnerLogin.buckets',
      'aggregations.repoName.buckets',
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
    const term = this.regex(t)
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
            repoLanguage: this.aggregate(term, 'repoLanguage'),
            repoOwnerLogin: this.aggregate(term, 'repoOwnerLogin'),
            repoName: this.aggregate(term, 'repoName'),
            authorLogin: this.aggregate(term, 'authorLogin'),
          },
        },
      })
      .then(res => {
        return this.sort(
          Array.prototype.concat(
            this.aggregations(res, 'repoLanguage'),
            this.aggregations(res, 'repoOwnerLogin'),
            this.aggregations(res, 'repoName'),
            this.aggregations(res, 'authorLogin'),
          ),
        ).slice(0, 10)
      })
  }

  aggregate(term, field) {
    return {
      terms: {
        field,
        include: `.*${term}.*`,
        size: Elastic.autocomplete.size,
      },
    }
  }

  aggregations(res, field) {
    return res.aggregations[field].buckets.map(bucket => {
      return {field, value: bucket.key, count: bucket.doc_count}
    })
  }

  sort(items) {
    return items.sort((a, b) => {
      return this.compare(a.count * -1, b.count * -1, () => {
        return this.compare(a.value, b.value)
      })
    })
  }

  compare(a, b, eq) {
    if (a === b) {
      return eq ? eq() : 0
    }
    return a > b ? 1 : -1
  }

  regex(term) {
    let pattern = ''
    for (const char of term.trim()) {
      if (char.match(/[A-Za-z]/)) {
        pattern += `[${char.toUpperCase()}${char.toLowerCase()}]`
      } else if (char.match(/[\d-_]/)) {
        pattern += char
      } else {
        pattern += `\\${char}`
      }
    }
    return pattern
  }
}

export const elastic = new Elastic()
