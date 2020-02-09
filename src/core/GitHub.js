const token = atob('MDFmYjg1ZTdkYmZmMTM2NzQzODQ4Zjg0NjkwMDAwZTJjNjU5YWYxNQ==')

class GitHub {
  static commentsPerPage = 10

  countComments(issue) {
    // prettier-ignore
    const endpoint = `https://api.github.com/repos/${issue.repoOwnerLogin}/${issue.repoName}/issues/${issue.number}`
    const headers = {Authorization: `token ${token}`}
    return new Promise((resolve, reject) => {
      fetch(endpoint, {method: 'get', headers})
        .then(res => (res.ok ? res.json() : reject(res.statusText)))
        .then(res => resolve(res.comments))
        .catch(e => reject(e))
    })
  }

  comments(issue) {
    const page = issue.comments.length / GitHub.commentsPerPage + 1
    // prettier-ignore
    const endpoint = `https://api.github.com/repos/${issue.repoOwnerLogin}/${issue.repoName}/issues/${issue.number}/comments?per_page=${GitHub.commentsPerPage}&page=${page}`
    const headers = {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.squirrel-girl-preview',
    }
    return new Promise((resolve, reject) => {
      fetch(endpoint, {method: 'get', headers})
        .then(res => (res.ok ? res.json() : reject(res.statusText)))
        .then(res => resolve(this.parse(res)))
        .catch(e => reject(e))
    })
  }

  parse(comments) {
    return comments.map(comment => {
      return {
        authorLogin: comment.user.login,
        body: comment.body,
        createdAt: comment.created_at,
        totalReactions: comment.reactions.total_count,
        thumbsUp: comment.reactions['+1'],
        thumbsDown: comment.reactions['-1'],
        laugh: comment.reactions.laugh,
        hooray: comment.reactions.hooray,
        confused: comment.reactions.confused,
        heart: comment.reactions.heart,
      }
    })
  }
}

export const github = new GitHub()
