import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { fadeUp } from '../utils/animations'

export default function Contact() {
  const formRef = useRef()
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)

  const sendEmail = (e) => {
    e.preventDefault()
    setSending(true)
    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY },
      )
      .then(() => {
        setDone(true)
        formRef.current.reset()
      })
      .catch(() => alert('Failed to send. Try again later.'))
      .finally(() => setSending(false))
  }

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
        <form ref={formRef} className="glass-card contact-form" onSubmit={sendEmail}>
          <div className="field-grid">
            <div>
              <label>Name</label>
              <input name="name" placeholder="// your name" type="text" required />
            </div>
            <div>
              <label>Email</label>
              <input name="email" placeholder="// your email" type="email" required />
            </div>
          </div>
          <div>
            <label>Subject</label>
            <input name="subject" placeholder="// what&apos;s this about?" type="text" required />
          </div>
          <div>
            <label>Message</label>
            <textarea name="message" placeholder="// let&apos;s build something cool" rows="4" required></textarea>
          </div>
          <button type="submit" className="btn btn-primary" disabled={sending}>
            {sending ? 'Sending...' : done ? 'Sent!' : 'Send Message'}
            <span className="material-symbols-outlined">{done ? 'check' : 'send'}</span>
          </button>
        </form>
      </div>
    </motion.section>
  )
}
