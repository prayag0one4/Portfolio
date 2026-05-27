import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { fadeUp, stagger } from '../utils/animations'

function colorizeText(text, keyPrefix = '') {
  const tokens = text.split(/(\".*?\"|\bconst\b|\bexport\b|\bconsole\b|\blog\b)/g)
  return tokens.map((token, index) => {
    if (token === 'const' || token === 'export') {
      return <span key={`${keyPrefix}-${index}`} className="code-keyword">{token}</span>
    }
    if (token === 'console') {
      return <span key={`${keyPrefix}-${index}`} className="code-function">{token}</span>
    }
    if (token === 'log') {
      return <span key={`${keyPrefix}-${index}`} className="code-method">{token}</span>
    }
    if (token.startsWith('"')) {
      return <span key={`${keyPrefix}-${index}`} className="code-string">{token}</span>
    }
    return <span key={`${keyPrefix}-${index}`}>{token}</span>
  })
}

function renderCodeLine(line) {
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
      parts.push(<span key={`jsx-${match.index}`} className="code-jsx-bracket">{match[1]}</span>)
      parts.push(<span key={`jsx-tag-${match.index}`} className="code-jsx-tag">{match[2]}</span>)
      parts.push(<span key={`jsx-close-${match.index}`} className="code-jsx-bracket">{match[3]}</span>)
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

const codeData = {
  skills: [
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
  ],
  projects: [
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
  ],
  about: [
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
  ],
}

function padLines(lines) {
  const minLines = 12
  return lines.length >= minLines ? lines : [...lines, ...Array(minLines - lines.length).fill('')]
}

export default function Hero() {
  const [activeTab, setActiveTab] = useState('skills')
  const codeLines = codeData[activeTab]
  const padded = useMemo(() => padLines(codeLines), [codeLines])

  return (
    <section className="hero" id="home">
      <motion.div className="hero-content" variants={stagger} initial="show">
        <motion.span className="pill" variants={fadeUp}>&lt;Hello&gt;</motion.span>
        <motion.h1 variants={fadeUp}>
          I&apos;m{' '}
          <span className="typewriter">
            <span className="typewriter-text">Prayag Raj</span>
          </span>
        </motion.h1>
        <motion.h2 variants={fadeUp}>&#123; Full-Stack Developer &#125;</motion.h2>
        <motion.p variants={fadeUp}>
          Building scalable products with clean architecture, modern technologies, and seamless user experiences. 🚀
        </motion.p>
        <motion.div className="hero-actions" variants={fadeUp}>
          <a className="btn btn-primary" href="#contact">Contact</a>
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
      <motion.div className="hero-visual" variants={fadeUp} initial="show">
        <div className="glow"></div>
        <motion.div className="glass-card code-card" animate={{ y: [0, -6, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
          <div className="card-header"></div>
          <div className="code-body">
            <div className="code-tabs">
              {['skills', 'projects', 'about'].map((tab) => (
                <button key={tab} className={`tab ${activeTab === tab ? 'active' : ''}`} type="button" onClick={() => setActiveTab(tab)}>
                  {tab === 'skills' ? 'skills.js' : tab === 'projects' ? 'projects.json' : 'aboutme.tsx'}
                </button>
              ))}
            </div>
            <div className="code-grid">
              <div className="line-nums">
                {padded.map((_, idx) => <span key={idx}>{idx + 1}</span>)}
              </div>
              <pre className="code-snippet">
                <code>
                  {padded.map((line, idx) => (
                    <span key={idx}>{renderCodeLine(line)}{'\n'}</span>
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
  )
}
