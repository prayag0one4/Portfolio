import { motion } from 'framer-motion'
import { fadeUp } from '../utils/animations'

export default function Contact() {
  return (
    <motion.section className="contact" id="contact" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
      <h2>Get In Touch</h2>
      <div className="contact-grid">
        <div className="contact-info">
          <p>
            I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
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
            <input placeholder="// what&apos;s this about?" type="text" />
          </div>
          <div>
            <label>Message</label>
            <textarea placeholder="// let&apos;s build something cool" rows="4"></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Send Message <span className="material-symbols-outlined">send</span>
          </button>
        </form>
      </div>
    </motion.section>
  )
}
