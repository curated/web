import { parse } from 'url'
import * as match from 'micro-route/match'
import * as next from 'next'
import { getConnection, findIssues } from 'curated-domain'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const route = {
  search: '/search',
}

async function main(req, res) {
  const url = parse(req.url, true)
  const { query } = url

  if (match(req, route.search)) {
    const result = await findIssues(query)
    return app.render(req, res, route.search, result)
  }

  return handle(req, res, url)
}

async function setup(handler) {
  await app.prepare()
  await getConnection()
  return handler
}

module.exports = setup(main)
