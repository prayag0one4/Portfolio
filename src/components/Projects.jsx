import { motion } from 'framer-motion'
import { fadeUp, stagger } from '../utils/animations'

const projects = [
  {
    id: '01',
    name: 'VersionVista',
    desc: 'Git Repository Timeline Visualizer',
    bullets: [
      'Interactive timeline with frame-by-frame commit scrubbing and VS Code-inspired three-panel UI',
      'Checkpoint-based snapshot system for 10-20x faster state reconstruction',
      'File tree explorer with color-coded diff visualization per commit',
    ],
    tags: ['React', 'Node.js', '+1'],
    link: 'https://versionvista.iamprayag.space',
    github: 'https://github.com/prayag0one4/VersionVista',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAn6v_4Fbgznf4VvzIG5OM3aUgolDNg_r91ECS3whc-RkKv_CBNJRrWKcMnsucpC3Y4NQI2i-cV2io1YAo2xtKObX8meWmRcKdfaP6V4zYtGO-3PDkrEElRQo-g4IgqsMYFn-hSFffuVxsIsXHtzf20kuGSFvBy0V0r7xDI23xFDJrjSv28WcQV7C0Hp1qtrftEqS63zDmK2b-dLbN3PejxOsuw0pQNl-oU2p0gUsAWSK2qJUL3VHqBgMq4i7GqfND2vP6LRvtM80Od',
  },
  {
    id: '02',
    name: 'PayU',
    desc: 'Digital Wallet Platform',
    bullets: [
      'Full-stack wallet with P2P transfers, add-money, and transaction history',
      'ACID-compliant transfers using PostgreSQL Serializable isolation',
      'Layered architecture with JWT auth, rate limiting, and centralized error handling',
    ],
    tags: ['React', 'Express', '+1'],
    link: 'https://payu.iamprayag.space/',
    github: 'https://github.com/prayag0one4/PayU',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAomFD68vTdIsu84G9JgbzdGR3ZqL9w-WPr0AbbcNM1Avm4RR_zOCCazjF_7AQ5GYlmv8Q59VngHO1RxxD0MB7s6KUW4PQW36iwhz1hhZ_AH7g1gOssXrR7uVq_KuoeM0nD6Q9V7Ee1q-xxo9GblwM6xwtzQNgyyzt91HBTGJ7HA9VY6adIm8u5QolgpVmGam-LNG40Gx2qk71uPoSGu6eA660fcdYpySxMrcYX_Muf0FsoxWp6htKlRSe-MVDUAqAK0XLsZiQrYnyG',
  },
  {
    id: '03',
    name: 'MagnetDrop',
    desc: 'Decentralized File Sharing App',
    bullets: [
      'Serverless P2P file sharing via WebTorrent for direct browser-to-browser transfers',
      'Magnet link generation with real-time progress tracking, supporting files exceeding 1GB',
      'Responsive UI with one-click clipboard actions',
    ],
    tags: ['React', 'WebTorrent', '+1'],
    link: 'https://file-sharing-peach.vercel.app/',
    github: 'https://github.com/prayag0one4/File_sharing',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnv0yEJ20UlIiOQeMbujmpefDGjg0G4GjxXfd9yx7UbBmCTHoM0I7GdLTGSnnF6FZtws3eAyLJCpRQtUpbAH7iITxVBs_AJsXt59NPkAIPQG45ZZTMxkzqY5F387flAADD4PUfutMOJz6q6eE5_zh0zJ7BLeFyVTD8bmtl_QIMcmdRqLhMFpPdqYSzXXzr5GqI8TR2oPPjGqnLHnmnvUd2Hn24xaKFRnoKoxHlzPp6IEyPBbvzlETknkF5CzXVj9PyFnC55wcN7qO7',
  },
]

export default function Projects() {
  return (
    <motion.section className="projects" id="projects" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
      <h2>Featured Projects</h2>
      <motion.div className="project-grid" variants={stagger}>
        {projects.map((p) => (
          <motion.article key={p.name} className="glass-card project-card" variants={fadeUp}>
            <div className="project-image">
              <img alt={p.name} src={p.img} />
              <div className="terminal-header"></div>
              <span>{p.id}</span>
            </div>
            <div className="project-body">
              <h3>{p.name}</h3>
              <p>{p.desc}</p>
              <ul>
                {p.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
              <div className="project-footer">
                <div className="tags">
                  {p.tags.map((t) => (
                    <span key={t} className={t.startsWith('+') ? 'tag-extra' : ''}>{t}</span>
                  ))}
                </div>
                <div style={{display: 'flex', gap: '12px'}}>
                  {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer">GitHub</a>}
                  <a href={p.link} target="_blank" rel="noopener noreferrer">View Project</a>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
      <div className="projects-footer">
        <a className="btn btn-outline" href="https://github.com/prayag0one4" target="_blank" rel="noopener noreferrer">More Projects</a>
      </div>
    </motion.section>
  )
}
