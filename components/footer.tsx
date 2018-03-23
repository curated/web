import './footer.scss'

const zeit = require('../static/logo/zeit.svg')
const github = require('../static/logo/github.svg')
const codes84 = require('../static/logo/84codes.png')
const emojione = require('../static/logo/emojione.svg')

export default () => (
  <footer className="footer">
    <h5 className="footer-note">Made with &nbsp;&#10084;&nbsp; in Sydney</h5>
    <h5 className="footer-note">Thank you kindly to these organisations</h5>

    <a href="https://zeit.co" target="_blank">
      <img src={zeit} alt="Zeit" height="42" />
    </a>

    <a href="https://github.com" target="_blank">
      <img src={github} alt="GitHub" height="32" />
    </a>

    <a href="https://84codes.com" target="_blank">
      <img src={codes84} alt="84 Codes" height="24" />
    </a>

    <a href="https://emojione.com" target="_blank">
      <img src={emojione} alt="Emoji One" height="12" />
    </a>
  </footer>
)
