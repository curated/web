import React from 'react'
import Head from 'next/head'
import Header from './header'
import Nav from './nav'
import Footer from './footer'

import '../styles/base.scss'
import './layout.scss'

const favicon = require('../static/favicon.ico')

export default class Layout extends React.Component<Props, State> {
  public constructor(props) {
    super(props)
    this.state = { nav: true }
  }

  public render() {
    return (
      <div className="layout">
        <Head>
          <title>{this.props.title || 'Curated GitHub Issues'}</title>
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#222" />
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <link rel="shortcut icon" href={favicon} />

          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.min.css"
          />

          <link
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
            rel="stylesheet"
          />

          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
          />

          <link rel="stylesheet" href="/_next/static/style.css" />
        </Head>

        <Header toggleNav={(e) => this.toggleNav(e)} />
        <Nav visible={this.state.nav} />

        <section className={`scroll ${this.state.nav ? 'nav-visible' : ''}`}>
          <main className="content">{this.props.children}</main>
          <Footer />
        </section>
      </div>
    )
  }

  private toggleNav(e) {
    e.preventDefault()
    this.setState({ nav: !this.state.nav })
  }
}

interface Props {
  title?: string
}

interface State {
  nav: boolean
}
