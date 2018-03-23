import './header.scss'

const github = require('../static/logo/github.svg')

export default ({ toggleNav }) => (
  <header className="header">
    <section className="header-left">
      <a
        href="#"
        className="header-nav-toggle material-icons"
        onClick={toggleNav}
      >
        menu
      </a>
      <div className="title">Curated</div>
    </section>

    <section className="header-right">
      <a
        href="https://github.com/curated"
        className="header-github"
        target="_blank"
      >
        <img src={github} alt="Curated on GitHub" height="24" />
      </a>
    </section>
  </header>
)
