import moment from 'moment'

class Fmt {
  datetime(d) {
    return moment(d).format('LLLL')
  }

  number(s) {
    if (typeof s === 'number' || typeof s === 'string') {
      return s.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  }

  timeAgo(d) {
    return moment(d).fromNow()
  }
}

export const fmt = new Fmt()
