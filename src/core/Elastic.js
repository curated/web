import Elasticsearch from 'elasticsearch-browser'

const host = atob(
  'eTBuMXpoMGpkYTpsd3U4ajZwd25jQGN1cmF0ZWQtNjQzODc2NDI0OC51cy13ZXN0LTIuYm9uc2Fpc2VhcmNoLm5ldA==',
)

class Elastic {
  static client = new Elasticsearch.Client({host})
  static issueIndex = 'issue'
  static issueType = 'issue'

  static searchSize = 10
  static searchPath = ['hits.total', 'hits.hits._source']

  static autocompleteSize = 3
  static autocompletePath = [
    'suggest.owners.options.text',
    'suggest.repos.options.text',
    'suggest.languages.options.text',
    'suggest.authors.options.text',
  ]

  search(params) {
    const body = {}
    if (params.match) {
      body.query = {
        match: params.match,
      }
    }
    console.log(params)
    return Elastic.client
      .search({
        index: Elastic.issueIndex,
        type: Elastic.issueType,
        filterPath: Elastic.searchPath,
        size: Elastic.searchSize,
        sort: params.sort,
        from: params.from,
        body,
      })
      .then(res => {
        return {
          total: res.hits.total,
          issues: (res.hits.hits || []).map(hit => {
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
        return Array.prototype.concat(
          this.suggestions(res, 'owners', 'repoOwnerLogin'),
          this.suggestions(res, 'repos', 'repoName'),
          this.suggestions(res, 'languages', 'repoLanguage'),
          this.suggestions(res, 'authors', 'authorLogin'),
        )
      })
  }

  suggest(text, field) {
    return {
      text: text.trim(),
      completion: {
        field,
        skip_duplicates: true,
        size: Elastic.autocompleteSize,
      },
    }
  }

  suggestions(res, collection, field) {
    if (!res.suggest || !res.suggest[collection]) {
      return []
    }
    return res.suggest[collection][0].options.map(option => {
      return {field, value: option.text}
    })
  }
}

export const elastic = new Elastic()
