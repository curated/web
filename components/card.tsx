import './card.scss'

export default ({ children, className = '' }) => (
  <article className={`card ${className}`}>{children}</article>
)

export const CardHeader = ({ children, className = '' }) => (
  <header className={`card-header ${className}`}>{children}</header>
)

export const CardBody = ({ children, className = '' }) => (
  <section className={`card-body ${className}`}>{children}</section>
)

export const CardFooter = ({ children, className = '' }) => (
  <footer className={`card-footer ${className}`}>{children}</footer>
)
