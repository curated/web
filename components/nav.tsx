import './nav.scss'

export default ({ visible }) => (
  <nav className={`nav ${visible ? '' : 'hidden'}`}>
    <section className="nav-container">
      <h2>Sort by</h2>
    </section>
  </nav>
)
