import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('skills')
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-50% 0px -50% 0px' },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])
  const codeLines = useMemo(() => {
    if (activeTab === 'projects') {
      return [
        '// Featured projects',
        'const projects = [',
        '  {',
        '    name: "VersionVista",',
        '    stack: "React, Node, MongoDB",',
        '    link: "versionvista.iamprayag.space",',
        '  },',
        '  {',
        '    name: "PayU", stack: "React, Express, PostgreSQL",',
        '    link: "payu.iamprayag.space" },',
        ']',
        'console.log("More projects? Visit github.com/prayag0one4")',
      ]
    }
    if (activeTab === 'about') {
      return [
        '// Professional Summary',
        'export const ProfessionalSummary = () => (',
        '',
        '  <section>',
        '    <p>',
        '      Computer Science undergraduate at IIIT Kota',
        '      with a strong interest in software development',
        '      and problem-solving. Focused on building',
        '      scalable applications and maintainable code.',
        '    </p>',
        '  </section>',
        ')',
      ]
    }
    return [
      '// My Skills & Expertise',
      'const skills = {',
      '',
      '  frontend: ["React", "Next.js", "TypeScript", "Tailwind"],',
      '  backend: ["Node.js", "Express", "REST APIs"],',
      '  database: ["PostgreSQL", "Prisma"],',
      '  tools: ["Git", "Docker", "AWS"],',
      '',
      '}',
      '',
      'console.log("Building solutions with modern tech ⚡")',
    ]
  }, [activeTab])

  const paddedCodeLines = useMemo(() => {
    const minLines = 12
    if (codeLines.length >= minLines) return codeLines
    return [...codeLines, ...Array(minLines - codeLines.length).fill('')]
  }, [codeLines])

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }
  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
  }

  const colorizeText = (text, keyPrefix = '') => {
    const tokens = text.split(/(\".*?\"|\bconst\b|\bexport\b|\bconsole\b|\blog\b)/g)
    return tokens.map((token, index) => {
      if (token === 'const' || token === 'export') {
        return (
          <span key={`${keyPrefix}-${index}`} className="code-keyword">
            {token}
          </span>
        )
      }
      if (token === 'console') {
        return (
          <span key={`${keyPrefix}-${index}`} className="code-function">
            {token}
          </span>
        )
      }
      if (token === 'log') {
        return (
          <span key={`${keyPrefix}-${index}`} className="code-method">
            {token}
          </span>
        )
      }
      if (token.startsWith('"')) {
        return (
          <span key={`${keyPrefix}-${index}`} className="code-string">
            {token}
          </span>
        )
      }
      return <span key={`${keyPrefix}-${index}`}>{token}</span>
    })
  }

  const renderCodeLine = (line) => {
    if (line.startsWith('//')) {
      return <span className="code-comment">{line}</span>
    }

    if (line.includes('<') && line.includes('>')) {
      const parts = []
      const regex = /(<\/?)([A-Za-z]+)(>)/g
      let lastIndex = 0
      let match = regex.exec(line)

      while (match) {
        if (match.index > lastIndex) {
          parts.push(...colorizeText(line.slice(lastIndex, match.index), `t-${lastIndex}`))
        }

        parts.push(
          <span key={`jsx-${match.index}`} className="code-jsx-bracket">
            {match[1]}
          </span>,
        )
        parts.push(
          <span key={`jsx-tag-${match.index}`} className="code-jsx-tag">
            {match[2]}
          </span>,
        )
        parts.push(
          <span key={`jsx-close-${match.index}`} className="code-jsx-bracket">
            {match[3]}
          </span>,
        )

        lastIndex = match.index + match[0].length
        match = regex.exec(line)
      }

      if (lastIndex < line.length) {
        parts.push(...colorizeText(line.slice(lastIndex), `t-${lastIndex}`))
      }

      return parts
    }

    return colorizeText(line)
  }
  const skills = [
    {
      title: 'Languages',
      icon: 'code',
      items: ['JavaScript', 'TypeScript', 'Java', 'C++', 'Python', 'SQL'],
    },
    {
      title: 'Web',
      icon: 'layers',
      items: ['React', 'Next.js', 'Node.js', 'Express', 'REST APIs', 'Tailwind'],
    },
    {
      title: 'DBs',
      icon: 'database',
      items: ['PostgreSQL', 'MongoDB', 'Prisma ORM'],
    },
    {
      title: 'Cloud',
      icon: 'cloud',
      items: ['AWS EC2', 'S3', 'CloudFront', 'Docker'],
    },
    {
      title: 'Tools',
      icon: 'build',
      items: ['Git', 'GitHub', 'VS Code', 'Postman', 'Linux'],
    },
  ]

  return (
    <div className="app">
      <header className="top-nav" id="home">
        <nav className="nav-inner">
          <div className="logo">&lt;PRAYAG/&gt;</div>
          <div className="nav-links">
            <a className={activeSection === 'home' ? 'active' : ''} href="#home">
              Home
            </a>
            <a className={activeSection === 'about' ? 'active' : ''} href="#about">
              About
            </a>
            <a className={activeSection === 'skills' ? 'active' : ''} href="#skills">
              Skills
            </a>
            <a className={activeSection === 'projects' ? 'active' : ''} href="#projects">
              Projects
            </a>
            <a className={activeSection === 'experience' ? 'active' : ''} href="#experience">
              Experience
            </a>
            <a className={activeSection === 'contact' ? 'active' : ''} href="#contact">
              Contact
            </a>
          </div>
          <div className="nav-actions">
            <button
              className="icon-btn"
              type="button"
              aria-label="Toggle theme"
              onClick={() =>
                setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
              }
            >
              <span className="material-symbols-outlined">palette</span>
            </button>
            <a className="btn btn-primary" href="#contact">
              Hire Me
            </a>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <motion.div
            className="hero-content"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.span className="pill" variants={fadeUp}>
              &lt;Hello&gt;
            </motion.span>
            <motion.h1 variants={fadeUp}>
              I&apos;m{' '}
              <span className="typewriter">
                <span className="typewriter-text">Prayag Raj</span>
              </span>
            </motion.h1>
            <motion.h2 variants={fadeUp}>
              &#123; Full-Stack Developer &#125;
            </motion.h2>
            <motion.p variants={fadeUp}>
              Building scalable products with clean architecture, modern
              technologies, and seamless user experiences. 🚀
            </motion.p>
            <motion.div className="hero-actions" variants={fadeUp}>
              <a className="btn btn-primary" href="#contact">
                Contact
              </a>
              <a className="btn btn-outline" href="https://drive.google.com/file/d/1TO6_ZyPHNAp4UsfETHOq_XgD-BS9rcLT/view?pli=1" target="_blank" rel="noopener noreferrer">
                Download Resume
              </a>
            </motion.div>
            <motion.div className="hero-social" variants={fadeUp}>
              <a href="https://github.com/prayag0one4" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0z"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/prayag-raj22/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="mailto:rajprayag.dev@gmail.com" aria-label="Email">
                <span className="material-symbols-outlined">mail</span>
              </a>
            </motion.div>
          </motion.div>
          <motion.div
            className="hero-visual"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="glow"></div>
            <motion.div
              className="glass-card code-card"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="card-header"></div>
              <div className="code-body">
                <div className="code-tabs">
                  <button
                    className={`tab ${activeTab === 'skills' ? 'active' : ''}`}
                    type="button"
                    onClick={() => setActiveTab('skills')}
                  >
                    skills.js
                  </button>
                  <button
                    className={`tab ${activeTab === 'projects' ? 'active' : ''}`}
                    type="button"
                    onClick={() => setActiveTab('projects')}
                  >
                    projects.json
                  </button>
                  <button
                    className={`tab ${activeTab === 'about' ? 'active' : ''}`}
                    type="button"
                    onClick={() => setActiveTab('about')}
                  >
                    aboutme.tsx
                  </button>
                </div>
                <div className="code-grid">
                  <div className="line-nums">
                    {paddedCodeLines.map((_, idx) => (
                      <span key={idx}>{idx + 1}</span>
                    ))}
                  </div>
                  <pre className="code-snippet">
                    <code>
                      {paddedCodeLines.map((line, idx) => (
                        <span key={idx}>
                          {renderCodeLine(line)}
                          {'\n'}
                        </span>
                      ))}
                    </code>
                  </pre>
                </div>
              </div>
            </motion.div>
          </motion.div>
          <div className="scroll-indicator">
            <span className="scroll-text">SCROLL</span>
            <span className="material-symbols-outlined scroll-icon">keyboard_double_arrow_down</span>
          </div>
        </section>

        <motion.section
          className="about"
          id="about"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="glass-card about-card">
            <div className="about-text">
              <h2>About Me</h2>
              <p>
                I&rsquo;m a passionate Full-Stack Developer focused on building scalable, high-performance web applications with clean architecture and strong user experience. My journey into development started with curiosity about how modern software systems work, which gradually evolved into building production-grade applications across frontend, backend, databases, and cloud infrastructure.
              </p>
              <p>
                I enjoy solving complex engineering problems, optimizing systems, and creating seamless digital experiences that are fast, reliable, and intuitive. I thrive in fast-paced environments where I can learn quickly, take ownership, and contribute across the stack.
              </p>
              <p>
                Beyond coding, I&rsquo;m constantly exploring modern technologies, AI-assisted development workflows, and scalable system design. I believe great software is built through thoughtful engineering, continuous learning, and an obsession with performance, maintainability, and developer experience. 🚀
              </p>
            </div>
            <div className="about-photo photo-swap">
              <div className="photo-frame"></div>
              <img
                className="photo-bw"
                alt="Prayag Raj"
                src="Black_white.jpeg"
              />
              <img
                className="photo-color"
                alt="Prayag Raj"
                src="Normal.jpeg"
              />
            </div>
          </div>
        </motion.section>

        <motion.section
          className="skills"
          id="skills"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="skills-heading">
            <h2>Skills and Proficiencies</h2>
            <p>Focused expertise across modern product engineering stacks.</p>
          </div>
          <motion.div className="skill-grid" variants={stagger}>
            {skills.map((group) => (
              <motion.div key={group.title} className="glass-card skill-card" variants={fadeUp}>
                <div className="skill-title">
                  <span className="material-symbols-outlined">{group.icon}</span>
                  <span>{group.title}</span>
                </div>
                <div className="chip-row">
                  {group.items.map((item) => (
                    <span key={item}>[{item}]</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          className="projects"
          id="projects"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2>Featured Projects</h2>
          <motion.div className="project-grid" variants={stagger}>
            <motion.article className="glass-card project-card" variants={fadeUp}>
              <div className="project-image">
                <img
                  alt="VersionVista"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAn6v_4Fbgznf4VvzIG5OM3aUgolDNg_r91ECS3whc-RkKv_CBNJRrWKcMnsucpC3Y4NQI2i-cV2io1YAo2xtKObX8meWmRcKdfaP6V4zYtGO-3PDkrEElRQo-g4IgqsMYFn-hSFffuVxsIsXHtzf20kuGSFvBy0V0r7xDI23xFDJrjSv28WcQV7C0Hp1qtrftEqS63zDmK2b-dLbN3PejxOsuw0pQNl-oU2p0gUsAWSK2qJUL3VHqBgMq4i7GqfND2vP6LRvtM80Od"
                />
                <div className="terminal-header"></div>
                <span>01</span>
              </div>
              <div className="project-body">
                <h3>VersionVista</h3>
                <p>Git Repository Timeline Visualizer</p>
                <ul>
                  <li>Interactive timeline with frame-by-frame commit scrubbing and VS Code-inspired three-panel UI</li>
                  <li>Checkpoint-based snapshot system for 10-20x faster state reconstruction</li>
                  <li>File tree explorer with color-coded diff visualization per commit</li>
                </ul>
                <div className="project-footer">
                  <div className="tags">
                    <span>React</span>
                    <span>Node.js</span>
                    <span className="tag-extra">+1</span>
                  </div>
                  <a href="https://versionvista.iamprayag.space" target="_blank" rel="noopener noreferrer">View Project</a>
                </div>
              </div>
            </motion.article>
            <motion.article className="glass-card project-card" variants={fadeUp}>
              <div className="project-image">
                <img
                  alt="PayU Integration"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAomFD68vTdIsu84G9JgbzdGR3ZqL9w-WPr0AbbcNM1Avm4RR_zOCCazjF_7AQ5GYlmv8Q59VngHO1RxxD0MB7s6KUW4PQW36iwhz1hhZ_AH7g1gOssXrR7uVq_KuoeM0nD6Q9V7Ee1q-xxo9GblwM6xwtzQNgyyzt91HBTGJ7HA9VY6adIm8u5QolgpVmGam-LNG40Gx2qk71uPoSGu6eA660fcdYpySxMrcYX_Muf0FsoxWp6htKlRSe-MVDUAqAK0XLsZiQrYnyG"
                />
                <div className="terminal-header"></div>
                <span>02</span>
              </div>
              <div className="project-body">
                <h3>PayU</h3>
                <p>Digital Wallet Platform</p>
                <ul>
                  <li>Full-stack wallet with P2P transfers, add-money, and transaction history</li>
                  <li>ACID-compliant transfers using PostgreSQL Serializable isolation</li>
                  <li>Layered architecture with JWT auth, rate limiting, and centralized error handling</li>
                </ul>
                <div className="project-footer">
                  <div className="tags">
                    <span>React</span>
                    <span>Express</span>
                    <span className="tag-extra">+1</span>
                  </div>
                  <a href="https://payu.iamprayag.space/" target="_blank" rel="noopener noreferrer">View Project</a>
                </div>
              </div>
            </motion.article>
            <motion.article className="glass-card project-card" variants={fadeUp}>
              <div className="project-image">
                <img
                  alt="MagnetDrop"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnv0yEJ20UlIiOQeMbujmpefDGjg0G4GjxXfd9yx7UbBmCTHoM0I7GdLTGSnnF6FZtws3eAyLJCpRQtUpbAH7iITxVBs_AJsXt59NPkAIPQG45ZZTMxkzqY5F387flAADD4PUfutMOJz6q6eE5_zh0zJ7BLeFyVTD8bmtl_QIMcmdRqLhMFpPdqYSzXXzr5GqI8TR2oPPjGqnLHnmnvUd2Hn24xaKFRnoKoxHlzPp6IEyPBbvzlETknkF5CzXVj9PyFnC55wcN7qO7"
                />
                <div className="terminal-header"></div>
                <span>03</span>
              </div>
              <div className="project-body">
                <h3>MagnetDrop</h3>
                <p>Decentralized File Sharing App</p>
                <ul>
                  <li>Serverless P2P file sharing via WebTorrent for direct browser-to-browser transfers</li>
                  <li>Magnet link generation with real-time progress tracking, supporting files exceeding 1GB</li>
                  <li>Responsive UI with one-click clipboard actions</li>
                </ul>
                <div className="project-footer">
                  <div className="tags">
                    <span>React</span>
                    <span>WebTorrent</span>
                    <span className="tag-extra">+1</span>
                  </div>
                  <a href="https://file-sharing-peach.vercel.app/" target="_blank" rel="noopener noreferrer">View Project</a>
                </div>
              </div>
            </motion.article>
          </motion.div>
          <div className="projects-footer">
            <a className="btn btn-outline" href="https://github.com/prayag0one4" target="_blank" rel="noopener noreferrer">More Projects</a>
          </div>
        </motion.section>

        <motion.section
          className="experience"
          id="experience"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div>
            <h2>Professional Experience</h2>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div>
                  <div className="timeline-title">Freelance Full-Stack Developer</div>
                  <div className="timeline-meta">Hans International | 2024–Present</div>
                  <p>
                    Developed and maintained several high-traffic client websites using
                    React and Node.js. Optimized database queries which led to a 40%
                    reduction in server response times. Implemented secure authentication
                    and payment flows.
                  </p>
                  <a className="btn btn-outline timeline-btn" href="https://hansconveyor.com" target="_blank" rel="noopener noreferrer">Visit Site</a>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2>Leadership</h2>
            <div className="glass-card leadership-card">
              <div className="lead-item">
                <span className="material-symbols-outlined">account_balance</span>
                <div>
                  <div className="lead-title">Finance Lead, TGCC</div>
                  <p>
                    Managed an ₹80,000+ budget and coordinated financial planning for multiple initiatives, ensuring smooth execution and resource allocation across events and activities.
                  </p>
                </div>
              </div>
              <div className="lead-item">
                <span className="material-symbols-outlined">campaign</span>
                <div>
                  <div className="lead-title">PR &amp; Outreach Senior Executive</div>
                  <p>
                    Led outreach and promotional campaigns that increased participation by 60% through strategic communication, collaborations, and community engagement initiatives.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="contact"
          id="contact"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2>Get In Touch</h2>
          <div className="contact-grid">
            <div className="contact-info">
              <p>
                I&apos;m always open to discussing new projects, creative ideas, or
                opportunities to be part of your visions.
              </p>
              <div className="info-row">
                <span className="material-symbols-outlined">mail</span>
                <div>
                  <div className="label">EMAIL</div>
                  <div className="value">rajprayag.dev@gmail.com</div>
                </div>
              </div>
              <div className="info-row">
                <span className="material-symbols-outlined">call</span>
                <div>
                  <div className="label">PHONE</div>
                  <div className="value">+91 9105307905</div>
                </div>
              </div>
              <div className="info-row">
                <span className="material-symbols-outlined">location_on</span>
                <div>
                  <div className="label">LOCATION</div>
                  <div className="value">Jewar, Uttar Pradesh</div>
                </div>
              </div>
            </div>
            <form className="glass-card contact-form">
              <div className="field-grid">
                <div>
                  <label>Name</label>
                  <input placeholder="// your name" type="text" />
                </div>
                <div>
                  <label>Email</label>
                  <input placeholder="// your email" type="email" />
                </div>
              </div>
              <div>
                <label>Subject</label>
                <input placeholder="// what's this about?" type="text" />
              </div>
              <div>
                <label>Message</label>
                <textarea placeholder="// let's build something cool" rows="4"></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Send Message <span className="material-symbols-outlined">send</span>
              </button>
            </form>
          </div>
        </motion.section>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <div className="logo">&lt;PRAYAG/&gt;</div>
          <p>© 2024 Prayag Raj. Built with Terminal Precision.</p>
          <div className="footer-links">
            <a href="https://github.com/prayag0one4" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/prayag-raj22/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="mailto:rajprayag.dev@gmail.com">Email</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
