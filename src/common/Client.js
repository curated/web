const endpoint = 'https://curated.now.sh'

const getHeaders = () => {
  return {
    'Content-Type': 'application/json',
  }
}

const parseParams = params => {
  const keys = Object.keys(params || {})
  if (keys.length === 0) {
    return ''
  }
  return `?${keys
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&')}`
}

const fetchPromise = (...args) => {
  return new Promise((resolve, reject) => {
    fetch
      .apply(this, args)
      .then(res => (res.ok ? resolve(res.json()) : reject(res.statusText)))
      .catch(() => reject('Service unavailable'))
  })
}

class Client {
  delete(path, params) {
    return fetchPromise(`${endpoint}${path}${parseParams(params)}`, {
      method: 'delete',
      headers: getHeaders(),
    })
  }

  get(path, params) {
    return fetchPromise(`${endpoint}${path}${parseParams(params)}`, {
      method: 'get',
      headers: getHeaders(),
    })
  }

  post(path, body) {
    return fetchPromise(`${endpoint}${path}`, {
      method: 'post',
      headers: getHeaders(),
      body: JSON.stringify(body),
    })
  }

  put(path, body) {
    return fetchPromise(`${endpoint}${path}`, {
      method: 'put',
      headers: getHeaders(),
      body: JSON.stringify(body),
    })
  }
}

export const client = new Client()
