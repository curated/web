import Elasticsearch from 'elasticsearch-browser'

const host = atob(
  'eTBuMXpoMGpkYTpsd3U4ajZwd25jQGN1cmF0ZWQtNjQzODc2NDI0OC51cy13ZXN0LTIuYm9uc2Fpc2VhcmNoLm5ldA=='
)

class Elastic {
  static client = new Elasticsearch.Client({host})
  static filterPath = ['hits.total', 'hits.hits._source']
  static issueIndex = 'issue'
  static issueType = 'issue'
  static size = 10

  search(params) {
    return Elastic.client
      .search({
        filterPath: Elastic.filterPath,
        index: Elastic.issueIndex,
        type: Elastic.issueType,
        size: Elastic.size,
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
}

export const elastic = new Elastic()
