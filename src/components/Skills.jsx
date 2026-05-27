import { motion } from 'framer-motion'
import { fadeUp, stagger } from '../utils/animations'

const skills = [
  { title: 'Languages', icon: 'code', items: ['JavaScript', 'TypeScript', 'Java', 'C++', 'Python', 'SQL'] },
  { title: 'Web', icon: 'layers', items: ['React', 'Next.js', 'Node.js', 'Express', 'REST APIs', 'Tailwind'] },
  { title: 'DBs', icon: 'database', items: ['PostgreSQL', 'MongoDB', 'Prisma ORM'] },
  { title: 'Cloud', icon: 'cloud', items: ['AWS EC2', 'S3', 'CloudFront', 'Docker'] },
  { title: 'Tools', icon: 'build', items: ['Git', 'GitHub', 'VS Code', 'Postman', 'Linux'] },
]

export default function Skills() {
  return (
    <motion.section className="skills" id="skills" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
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
              {group.items.map((item) => <span key={item}>[{item}]</span>)}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}
