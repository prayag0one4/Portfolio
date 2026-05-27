import { motion } from 'framer-motion'
import { fadeUp } from '../utils/animations'

export default function About() {
  return (
    <motion.section className="about" id="about" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
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
          <img className="photo-bw" alt="Prayag Raj" src="Black_white.jpeg" />
          <img className="photo-color" alt="Prayag Raj" src="Normal.jpeg" />
        </div>
      </div>
    </motion.section>
  )
}
