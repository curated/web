class Comment {
  constructor(comment) {
    this.authorLogin = comment.user && comment.user.login
    this.body = comment.body
    this.createdAt = comment.created_at
    if (comment.reactions) {
      this.totalReactions = comment.reactions.total
      this.thumbsUp = comment.reactions['+1']
      this.thumbsDown = comment.reactions['-1']
      this.laugh = comment.reactions.laugh
      this.hooray = comment.reactions.hooray
      this.confused = comment.reactions.confused
      this.heart = comment.reactions.heart
    }
  }
}

class GitHub {
  static commentsPerPage = 10

  comments(issue) {
    const params = this.params(issue)
    // prettier-ignore
    const endpoint = `https://api.github.com/repos/${params.repoOwnerLogin}/${params.repoName}/issues/${params.number}/comments?per_page=${GitHub.commentsPerPage}&page=${params.page}`
    const headers = {Accept: 'application/vnd.github.squirrel-girl-preview'}
    return new Promise((resolve, reject) => {
      fetch(endpoint, {method: 'get', headers})
        .then(res => (res.ok ? res.json() : reject(res.statusText)))
        .then(res => resolve(this.parse(res)))
        .catch(e => reject(e))
    })
  }

  parse(comments) {
    return comments.map(comment => new Comment(comment))
  }

  params(issue) {
    return {
      repoOwnerLogin: issue.repoOwnerLogin,
      repoName: issue.repoName,
      number: issue.number,
      page: issue.comments.length / GitHub.commentsPerPage + 1,
    }
  }
}

export const github = new GitHub()
