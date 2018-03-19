import './nav.scss'

export default ({ visible }) => (
  <nav className={`nav ${visible ? '' : 'hidden'}`}>
    <section className="nav-container">
      <h3>Sort by</h3>
    </section>
  </nav>
)
