import createHistory from 'history/createBrowserHistory'

class History {
  constructor() {
    this.h = createHistory()
  }

  getQuery(key) {
    return new URLSearchParams(this.h.location.search).get(key)
  }

  setQuery(method, params) {
    const searchParams = this._searchParams()
    for (const key in params) {
      searchParams.set(key, params[key])
    }
    this._updateQuery(method, searchParams)
  }

  removeQuery(method, keys) {
    const searchParams = this._searchParams()
    for (const key of keys) {
      searchParams.delete(key)
    }
    this._updateQuery(method, searchParams)
  }

  _searchParams() {
    return new URLSearchParams(this.h.location.search)
  }

  _updateQuery(method, searchParams) {
    this.h[method]({
      pathname: this.h.location.pathname,
      search: `?${searchParams.toString()}`,
      hash: this.h.location.hash,
    })
  }
}

export const history = new History()
