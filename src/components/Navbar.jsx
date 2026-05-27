import { useActiveSection } from '../hooks/useActiveSection'
import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
  const activeSection = useActiveSection()
  const { toggleTheme } = useTheme()
  const links = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <header className="top-nav" id="home">
      <nav className="nav-inner">
        <div className="logo">&lt;PRAYAG/&gt;</div>
        <div className="nav-links">
          {links.map(({ label, href }) => (
            <a key={href} className={activeSection === href.slice(1) ? 'active' : ''} href={href}>
              {label}
            </a>
          ))}
        </div>
        <div className="nav-actions">
          <button className="icon-btn" type="button" aria-label="Toggle theme" onClick={toggleTheme}>
            <span className="material-symbols-outlined">palette</span>
          </button>
          <a className="btn btn-primary" href="#contact">
            Hire Me
          </a>
        </div>
      </nav>
    </header>
  )
}
