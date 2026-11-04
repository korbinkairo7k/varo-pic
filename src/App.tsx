import { useEffect, useRef, useState } from 'react'
import type { FormEvent, SVGProps } from 'react'

function Arrow({ diagonal = false, ...props }: SVGProps<SVGSVGElement> & { diagonal?: boolean }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{diagonal ? <path d="M6 18 18 6M6 6h12v12" /> : <path d="M4 12h15m-6-6 6 6-6 6" />}</svg>
}

function LineIcon({ type }: { type: 'connection' | 'perspective' | 'coordination' }) {
  return <svg width="26" height="26" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{type === 'connection' ? <><path d="m11 17 6-6m-8 4-2 2a4.25 4.25 0 0 0 6 6l4-4a4.25 4.25 0 0 0 0-6m2 0 2-2a4.25 4.25 0 0 0-6-6l-4 4a4.25 4.25 0 0 0 0 6" /></> : type === 'perspective' ? <><rect x="4" y="4" width="8" height="8" rx="1" /><rect x="16" y="4" width="8" height="8" rx="1" /><rect x="4" y="16" width="8" height="8" rx="1" /><path d="M16 20h8m-4-4v8" /></> : <><rect x="4" y="7" width="20" height="17" rx="3" /><path d="M4 13h20M9 4v6m10-6v6m-10 8 3 3 6-6" /></>}</svg>
}

const industries = [
  { title: 'Food & Beverage', description: 'Production, distribution, packaging, and supply relationships.', image: 'industry-food', alt: 'Workers inspecting tomatoes on a food processing conveyor', position: 'center' },
  { title: 'Oil & Gas', description: 'Equipment, industrial services, and operational supply requirements.', image: 'industry-energy', alt: 'Pipes, towers, and infrastructure at an oil and gas facility', position: 'center 55%' },
  { title: 'Pharmaceuticals', description: 'Manufacturing, packaging, distribution, and qualified service partners.', image: 'industry-pharma', alt: 'Glass ampoules on a pharmaceutical filling and sealing line', position: 'center' },
  { title: 'Manufacturing', description: 'Production capabilities, components, and contract manufacturing.', image: 'industry-manufacturing', alt: 'Industrial machinery and operational detail on a manufacturing floor', position: 'center' },
  { title: 'Logistics & Supply Chain', description: 'Warehousing, transport, distribution, and fulfillment.', image: 'industry-logistics', alt: 'Organized warehouse storage and logistics operations', position: 'center' },
  { title: 'Business & Facility Services', description: 'Operational support and outsourced services for growing organizations.', image: 'industry-services', alt: 'Architecture and maintained facilities in a commercial building', position: 'center' },
  { title: 'Technology', description: 'Software, IT services, digital infrastructure, and technology partnerships that support business growth.', image: 'industry-technology', alt: 'Close-up of rack-mounted servers and indicator lights in a data center', position: 'center' },
]

const opportunities = [
  { sector: 'Food & Beverage', title: 'Taking a food brand further.', requirement: 'A food brand exploring its next stage of production and distribution.', partner: 'A manufacturing and distribution partner with relevant capabilities.', help: 'Clarifying production needs and introducing businesses with a practical fit.' },
  { sector: 'Industrial Operations', title: 'Keeping operations moving.', requirement: 'An industrial operator seeking equipment and maintenance support.', partner: 'An equipment supplier and service provider aligned with operational needs.', help: 'Connecting the right capabilities and giving both parties clear context.' },
  { sector: 'Logistics & Supply Chain', title: 'Building room for growth.', requirement: 'A growing company looking for a long-term logistics provider.', partner: 'A logistics business with suitable warehousing and transport capacity.', help: 'Understanding service requirements and coordinating a focused introduction.' },
]

const steps = [
  ['Understand', 'We discuss your requirements, priorities, and the kind of relationship you are looking for.'],
  ['Identify', 'We consider relevant businesses based on capabilities and commercial fit.'],
  ['Introduce', 'We facilitate a focused introduction with clear context for both sides.'],
  ['Coordinate', 'We help organize follow-up conversations as the parties explore next steps.'],
]

type Inquiry = '' | 'partner' | 'offering' | 'general'
type FormFields = { name: string; email: string; company: string; inquiry: Inquiry; message: string }
type Errors = Partial<Record<keyof FormFields, string>>
const emptyFields: FormFields = { name: '', email: '', company: '', inquiry: '', message: '' }
const inquiryLabels = { partner: 'Looking for a partner', offering: 'Offering products or services', general: 'General inquiry' }

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [fields, setFields] = useState<FormFields>(emptyFields)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'error' | 'success'>('idle')
  const [statusMessage, setStatusMessage] = useState('')
  const menuButton = useRef<HTMLButtonElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT?.trim() ?? ''

  useEffect(() => {
    if (!menuOpen) return
    function escapeMenu(event: KeyboardEvent) {
      if (event.key === 'Escape') { setMenuOpen(false); menuButton.current?.focus() }
    }
    function closeOutside(event: MouseEvent) {
      if (event.target instanceof Element && !event.target.closest('.site-header')) setMenuOpen(false)
    }
    document.addEventListener('keydown', escapeMenu)
    document.addEventListener('click', closeOutside)
    return () => { document.removeEventListener('keydown', escapeMenu); document.removeEventListener('click', closeOutside) }
  }, [menuOpen])

  function selectInquiry(inquiry: Inquiry) {
    setFields(previous => ({ ...previous, inquiry }))
    setErrors(previous => ({ ...previous, inquiry: undefined }))
    setStatus('idle')
    setMenuOpen(false)
  }

  function changeField<K extends keyof FormFields>(field: K, value: FormFields[K]) {
    setFields(previous => ({ ...previous, [field]: value }))
    setErrors(previous => ({ ...previous, [field]: undefined }))
    if (status !== 'sending') setStatus('idle')
  }

  async function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'sending') return
    const nextErrors: Errors = {}
    if (!fields.name.trim()) nextErrors.name = 'Please enter your name.'
    if (!fields.email.trim()) nextErrors.email = 'Please enter your work email.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) nextErrors.email = 'Enter a valid email address, such as name@company.com.'
    if (!fields.company.trim()) nextErrors.company = 'Please enter your company name.'
    if (!fields.inquiry) nextErrors.inquiry = 'Please choose an inquiry type.'
    if (!fields.message.trim()) nextErrors.message = 'Please tell us a little about your requirements.'
    setErrors(nextErrors)
    setStatus('idle')
    if (Object.keys(nextErrors).length) {
      const firstField = Object.keys(nextErrors)[0]
      formRef.current?.querySelector<HTMLElement>(`[name="${firstField}"]`)?.focus()
      return
    }
    if (!endpoint) {
      setStatusMessage('Your message has not been sent. Online inquiries are not available yet. Please try again later; your details remain in the form.')
      setStatus('error')
      requestAnimationFrame(() => statusRef.current?.focus())
      return
    }
    setStatus('sending')
    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 15000)
    try {
      const url = new URL(endpoint, window.location.origin)
      if (url.protocol !== 'https:' && url.hostname !== 'localhost' && url.hostname !== '127.0.0.1') throw new Error('Invalid endpoint')
      const response = await fetch(url, {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...fields, name: fields.name.trim(), email: fields.email.trim(), company: fields.company.trim(), message: fields.message.trim(), inquiry: inquiryLabels[fields.inquiry as keyof typeof inquiryLabels] }),
        signal: controller.signal,
      })
      const result: unknown = await response.json()
      if (!response.ok || typeof result !== 'object' || result === null || !('accepted' in result) || result.accepted !== true) throw new Error('Not accepted')
      setStatusMessage('Thank you. Your inquiry has been received by Varopic. We look forward to learning more about your business.')
      setStatus('success')
      setFields(emptyFields)
    } catch {
      setStatusMessage('Your message could not be confirmed as received. Please try again. Your details remain in the form.')
      setStatus('error')
    } finally {
      window.clearTimeout(timeout)
      requestAnimationFrame(() => statusRef.current?.focus())
    }
  }

  function fieldProps(field: keyof FormFields) {
    return { id: field, name: field, 'aria-invalid': errors[field] ? true : undefined, 'aria-describedby': errors[field] ? `${field}-error` : undefined }
  }

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header">
      <div className="container header-inner">
        <a href="#" className="wordmark" aria-label="Varopic home">varopic<span>.</span></a>
        <nav className="desktop-nav" aria-label="Main navigation"><a href="#about">About</a><a href="#industries">Industries</a><a href="#how-we-work">How We Work</a></nav>

        <button className="menu-toggle" ref={menuButton} type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(value => !value)}><svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none" aria-hidden="true">{menuOpen ? <path d="m5 5 14 14M5 19 19 5" /> : <path d="M3 7h18M3 16h18" />}</svg></button>
      </div>
      <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" hidden={!menuOpen}><a href="#about" onClick={() => setMenuOpen(false)}>About <Arrow /></a><a href="#industries" onClick={() => setMenuOpen(false)}>Industries <Arrow /></a><a href="#how-we-work" onClick={() => setMenuOpen(false)}>How We Work <Arrow /></a></nav>
    </header>

    <main id="main">
      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero-copy">
          <h1 id="hero-title">The right connections.<span>For your next big opportunity.</span></h1>
          <p className="hero-description">Varopic connects businesses with suppliers, service providers, and commercial partners across the United States, helping turn business requirements into productive conversations.</p>
          <div className="hero-actions flex flex-wrap items-center gap-5"><a className="button button-dark" href="#contact">Discuss an Opportunity <Arrow diagonal /></a><a className="text-link" href="#industries">Explore Our Industries <Arrow /></a></div>
          <p className="hero-note">For small businesses, growing companies,<br className="desktop-break" /> and established enterprises.</p>
        </div>
        <div className="hero-collage">
          <div className="hero-main-photo"><img src="/images/hero-logistics.jpg" srcSet="/images/hero-logistics-600.jpg 600w, /images/hero-logistics.jpg 1400w" sizes="(max-width: 600px) calc(100vw - 40px), (max-width: 850px) 60vw, 45vw" alt="Production machinery inside a bright, modern industrial facility" width="1200" height="800" fetchPriority="high" /><div className="image-info"><span className="info-icon"><LineIcon type="connection" /></span><div><strong>Cross-industry connections</strong><span>Buyers · Suppliers · Commercial partners</span></div></div></div>
          <figure className="hero-small-photo"><img src="/images/hero-food.jpg" srcSet="/images/hero-food-600.jpg 600w, /images/hero-food.jpg 1200w" sizes="(max-width: 600px) 45vw, (max-width: 850px) 36vw, 23vw" alt="Stainless steel equipment in a food production facility" width="600" height="400" /><figcaption>Food production</figcaption></figure>
          <figure className="hero-small-photo"><img src="/images/hero-pharma.jpg" srcSet="/images/hero-pharma-600.jpg 600w, /images/hero-pharma.jpg 1200w" sizes="(max-width: 600px) 45vw, (max-width: 850px) 36vw, 23vw" alt="Clean manufacturing environment for pharmaceutical production" width="600" height="400" /><figcaption>Pharmaceuticals</figcaption></figure>
          <div className="collage-footer"><span>Essential industries. Meaningful connections.</span><span aria-hidden="true">01 / {String(industries.length).padStart(2, '0')}</span></div>
        </div>
      </section>

      <section className="positioning" aria-label="Our service model"><div className="container stats-grid"><div className="stat"><span className="stat-number">{industries.length}</span><div><strong>Core industry sectors</strong><span>A cross-industry perspective</span></div></div><div className="stat"><span className="stat-number">3</span><div><strong>Business scales</strong><span>Small, midsize, enterprise</span></div></div><div className="stat"><span className="stat-number">1</span><div><strong>Dedicated point of contact</strong><span>Clear, personal coordination</span></div></div></div></section>

      <section id="about" className="section container about-grid" aria-labelledby="about-title">
        <div><p className="eyebrow">01 / A considered approach</p><h2 id="about-title">Good business starts<br className="desktop-break" /> with the right people.</h2><p className="section-copy">Finding a potential partner is only the beginning. The real work is understanding what each business needs and whether there is a practical fit. Varopic helps companies make relevant connections and move commercial conversations forward with clarity.</p><a className="text-link" href="#how-we-work">Get to know our approach <Arrow /></a></div>
        <div className="value-rows">
          <div className="value-row"><span className="value-icon"><LineIcon type="connection" /></span><div><h3>Relevant connections</h3><p>Introductions shaped around your requirements, capabilities, and commercial priorities.</p></div></div>
          <div className="value-row"><span className="value-icon"><LineIcon type="perspective" /></span><div><h3>Cross-industry perspective</h3><p>Connections across essential sectors and different stages of business growth.</p></div></div>
          <div className="value-row"><span className="value-icon"><LineIcon type="coordination" /></span><div><h3>Clear coordination</h3><p>A dedicated contact to help align expectations and organize the next conversation.</p></div></div>
        </div>
      </section>

      <section id="impact" className="container impact-section" aria-labelledby="impact-title">
        <div className="impact-panel">
          <div className="impact-metric">
            <p className="eyebrow">The value of the right connection</p>
            <p className="impact-amount" aria-label="Over 30 million US dollars"><span className="impact-currency" aria-hidden="true">$</span><span aria-hidden="true">30M</span><span className="impact-plus" aria-hidden="true">+</span></p>
            <p className="impact-metric-label">In connections value</p>
            <p className="impact-metric-note">Commercial relationships. Meaningful possibilities.</p>
          </div>
          <div className="impact-copy">
            <h2 id="impact-title">Helping our<br />clients grow.</h2>
            <p>With over $30 million in connections value, we help businesses find the suppliers, service providers, and commercial partners to support their next stage of growth.</p>
            <a className="text-link" href="#contact">Let’s explore your next opportunity <Arrow diagonal /></a>
          </div>
          <ol className="impact-path" aria-label="Our focus for client growth">
            <li><span className="impact-node" aria-hidden="true">01</span><span>Connect</span><Arrow /></li>
            <li><span className="impact-node" aria-hidden="true">02</span><span>Collaborate</span><Arrow /></li>
            <li><span className="impact-node" aria-hidden="true">03</span><span>Grow</span><Arrow diagonal /></li>
          </ol>
        </div>
      </section>

      <section id="industries" className="section industry-section" aria-labelledby="industries-title"><div className="container">
        <div className="section-heading"><div><p className="eyebrow">02 / Industries we work with</p><h2 id="industries-title">Different industries.<br />Shared opportunity.</h2></div><p>We bring a focused approach to business connections across seven essential sectors of the economy.</p></div>
        <div className="industry-grid">{industries.map((industry, index) => <article className={`industry-card${industry.title === 'Technology' ? ' industry-card-technology' : ''}`} key={industry.title}><div className="industry-image"><img src={`/images/${industry.image}.jpg`} srcSet={`/images/${industry.image}-600.jpg 600w, /images/${industry.image}.jpg 1200w`} sizes="(max-width: 600px) calc(100vw - 40px), (max-width: 850px) 45vw, 30vw" alt={industry.alt} width="900" height="600" loading="lazy" decoding="async" style={{ objectPosition: industry.position }} /></div><div className="industry-content"><div className="industry-title"><h3>{industry.title}</h3><span aria-hidden="true">0{index + 1}</span></div><p>{industry.description}</p></div></article>)}</div>
      </div></section>

      <section className="section container opportunities" aria-labelledby="opportunities-title">
        <div className="section-heading"><div><p className="eyebrow">03 / Illustrative opportunities</p><h2 id="opportunities-title">What the right connection<br className="desktop-break" /> can make possible.</h2></div><p>Different needs. A shared starting point.<br />These examples illustrate how we help.</p></div>
        <div className="opportunity-grid">{opportunities.map((opportunity, index) => <article className="opportunity-card" key={opportunity.title}><div className="opportunity-top"><span className="opportunity-number">0{index + 1}</span><span>{opportunity.sector}</span></div><h3>{opportunity.title}</h3><dl><div><dt>The requirement</dt><dd>{opportunity.requirement}</dd></div><div><dt>The right partner</dt><dd>{opportunity.partner}</dd></div><div className="varopic-role"><dt>Where Varopic helps</dt><dd>{opportunity.help}</dd></div></dl></article>)}</div>
        <p className="illustrative-note">Illustrative scenarios only. These are examples of potential requirements, not completed engagements.</p>
      </section>

      <section id="how-we-work" className="section process-section" aria-labelledby="process-title"><div className="container"><div className="process-heading"><p className="eyebrow">04 / How we work</p><h2 id="process-title">A clear path from<br />requirement to introduction.</h2><p className="section-copy">Thoughtful at every step. Focused on moving the conversation forward.</p></div><div className="process-grid">{steps.map(([title, description], index) => <article className="process-step" key={title}><div className="step-line"><span>0{index + 1}</span>{index < 3 && <Arrow />}</div><h3>{title}</h3><p>{description}</p></article>)}</div></div></section>

      <section className="section container pathways" aria-label="Two ways to work with Varopic">
        <div className="pathway-panel"><p className="eyebrow">For businesses with a requirement</p><h2>Looking for<br />the right partner?</h2><p>Tell us what your business needs, from a supplier or service provider to a new commercial relationship.</p><a className="text-link" href="#contact" onClick={() => selectInquiry('partner')}>Share Your Requirements <Arrow diagonal /></a></div>
        <div className="pathway-panel pathway-secondary"><p className="eyebrow">For businesses with capabilities</p><h2>Ready for new<br />business opportunities?</h2><p>Introduce your company, capabilities, and the types of commercial relationships you are looking to develop.</p><a className="text-link" href="#contact" onClick={() => selectInquiry('offering')}>Introduce Your Business <Arrow diagonal /></a></div>
      </section>

      <section id="contact" className="contact-section container" aria-labelledby="contact-title"><div className="contact-panel">
        <div className="contact-copy"><h2 id="contact-title">Start a conversation.</h2><p>Tell us about your business and what you’re looking for.</p></div>
        <form ref={formRef} className="contact-form" onSubmit={submitInquiry} noValidate aria-label="Business inquiry" aria-busy={status === 'sending'}>
          <p className="form-hint">All fields are required.</p>
          <div className="form-row"><div className="field"><label htmlFor="name">Name</label><input {...fieldProps('name')} autoComplete="name" maxLength={120} placeholder="Your name" required value={fields.name} onChange={event => changeField('name', event.target.value)} disabled={status === 'sending'} />{errors.name && <p className="field-error" id="name-error">{errors.name}</p>}</div><div className="field"><label htmlFor="email">Work email</label><input {...fieldProps('email')} type="email" autoComplete="email" maxLength={254} placeholder="you@company.com" required value={fields.email} onChange={event => changeField('email', event.target.value)} disabled={status === 'sending'} />{errors.email && <p className="field-error" id="email-error">{errors.email}</p>}</div></div>
          <div className="form-row"><div className="field"><label htmlFor="company">Company</label><input {...fieldProps('company')} autoComplete="organization" maxLength={180} placeholder="Company name" required value={fields.company} onChange={event => changeField('company', event.target.value)} disabled={status === 'sending'} />{errors.company && <p className="field-error" id="company-error">{errors.company}</p>}</div>
          <div className="field"><label htmlFor="inquiry">Inquiry type</label><select {...fieldProps('inquiry')} required value={fields.inquiry} onChange={event => changeField('inquiry', event.target.value as Inquiry)} disabled={status === 'sending'}><option value="" disabled>Select an inquiry type</option><option value="partner">Looking for a partner</option><option value="offering">Offering products or services</option><option value="general">General inquiry</option></select>{errors.inquiry && <p className="field-error" id="inquiry-error">{errors.inquiry}</p>}</div></div>
          <div className="field"><label htmlFor="message">Message</label><textarea {...fieldProps('message')} rows={4} maxLength={5000} placeholder="How can we help?" required value={fields.message} onChange={event => changeField('message', event.target.value)} disabled={status === 'sending'} />{errors.message && <p className="field-error" id="message-error">{errors.message}</p>}</div>
          {!endpoint && <p className="availability-note">Online inquiries are not available yet. Messages cannot be sent at this time.</p>}
          <button className="button button-dark submit-button" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending your inquiry…' : 'Start the Conversation'}<Arrow diagonal /></button>
          <div ref={statusRef} tabIndex={-1} className={status === 'error' || status === 'success' ? `form-status ${status}` : 'sr-only'} role={status === 'error' ? 'alert' : 'status'} aria-live={status === 'error' ? 'assertive' : 'polite'}>{status === 'error' || status === 'success' ? statusMessage : status === 'sending' ? 'Sending your inquiry. Please wait.' : ''}</div>
        </form>
      </div></section>
    </main>

    <footer className="container site-footer"><div className="footer-top"><div><a href="#" className="wordmark" aria-label="Varopic home">varopic<span>.</span></a><p>Connecting businesses.<br />Advancing opportunities.</p></div><nav aria-label="Footer navigation"><a href="#about">About</a><a href="#industries">Industries</a><a href="#how-we-work">How We Work</a><a href="#contact">Get in Touch <Arrow diagonal /></a></nav></div><div className="footer-bottom"><p>© {new Date().getFullYear()} Varopic. All rights reserved.</p><p>Business connections across the United States.</p></div></footer>
  </>
}

export default App



