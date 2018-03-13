import { Logger, transports } from 'winston'
import { getConnection, findIssues } from 'curated-domain'

const logger = new Logger({
  transports: [
    new transports.Console({
      timestamp: true,
      colorize: true,
    }),
  ],
})

getConnection().then(() => {})
