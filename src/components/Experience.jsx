import { motion } from 'framer-motion'
import { fadeUp } from '../utils/animations'

export default function Experience() {
  return (
    <motion.section className="experience" id="experience" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
      <div>
        <h2>Professional Experience</h2>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div>
              <div className="timeline-title">Freelance Full-Stack Developer</div>
              <div className="timeline-meta">Hans International | 2024&ndash;Present</div>
              <p>
                Created a full-stack B2B catalog web application with React 18, TypeScript, Express 5, MongoDB, and Tailwind CSS featuring 24+ product listings and categories. Developed a JWT-authenticated admin panel with full CRUD, drag-and-drop image management via Oracle S3, EmailJS inquiries, and React Query caching. Implemented RESTful API with rate-limited admin auth and centralized error handling. Set up CI/CD pipeline for automated production deployment.
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
              <p>Managed an ₹80,000+ budget and coordinated financial planning for multiple initiatives, ensuring smooth execution and resource allocation across events and activities.</p>
            </div>
          </div>
          <div className="lead-item">
            <span className="material-symbols-outlined">campaign</span>
            <div>
              <div className="lead-title">PR &amp; Outreach Senior Executive</div>
              <p>Led outreach and promotional campaigns that increased participation by 60% through strategic communication, collaborations, and community engagement initiatives.</p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
