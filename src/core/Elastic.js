import Elasticsearch from 'elasticsearch-browser'

const host = atob(
  'eTBuMXpoMGpkYTpsd3U4ajZwd25jQGN1cmF0ZWQtNjQzODc2NDI0OC51cy13ZXN0LTIuYm9uc2Fpc2VhcmNoLm5ldA=='
)

class Elastic {
  static client = new Elasticsearch.Client({host})
  static issueIndex = 'issue'
  static issueType = 'issue'

  static searchSize = 10
  static searchPath = ['hits.total', 'hits.hits._source']

  static autocompleteSize = 3
  static autocompletePath = [
    'suggest.owners.options._source.repoOwnerLogin',
    'suggest.repos.options._source.repoName',
    'suggest.languages.options._source.repoLanguage',
    'suggest.authors.options._source.authorLogin',
  ]

  search(params) {
    return Elastic.client
      .search({
        index: Elastic.issueIndex,
        type: Elastic.issueType,
        filterPath: Elastic.searchPath,
        size: Elastic.searchSize,
        sort: params.sort,
        from: params.from,
      })
      .then(res => {
        return {
          total: res.hits.total,
          issues: res.hits.hits.map(hit => {
            return hit._source
          }),
        }
      })
  }

  autocomplete(text) {
    return Elastic.client
      .search({
        index: Elastic.issueIndex,
        type: Elastic.issueType,
        filterPath: Elastic.autocompletePath,
        body: {
          suggest: {
            owners: this.suggest(text, 'repoOwnerLogin'),
            repos: this.suggest(text, 'repoName'),
            languages: this.suggest(text, 'repoLanguage'),
            authors: this.suggest(text, 'authorLogin'),
          },
        },
      })
      .then(res => {
        return {
          owners: this.suggestions(res, 'owners', 'repoOwnerLogin'),
          repos: this.suggestions(res, 'repos', 'repoName'),
          languages: this.suggestions(res, 'languages', 'repoLanguage'),
          authors: this.suggestions(res, 'authors', 'authorLogin'),
        }
      })
  }

  suggest(text, field) {
    return {
      text,
      completion: {
        field,
        skip_duplicates: true,
        size: Elastic.autocompleteSize,
      },
    }
  }

  suggestions(res, key, field) {
    if (!res.suggest || !res.suggest[key]) {
      return []
    }
    return res.suggest[key][0].options.map(o => o._source[field])
  }
}

export const elastic = new Elastic()
