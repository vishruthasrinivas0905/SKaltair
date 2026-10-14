import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { flushSync } from 'react-dom';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { ArrowDownRight, ArrowRight, ArrowUpRight, Award, BookOpen, Check, ChevronDown, ChevronLeft, ChevronRight, CircleHelp, ClipboardCheck, Clock3, FileText, Globe2, GraduationCap, Landmark, Mail, Menu, MoveUpRight, Phone, Plus, Scale, Search, Send, ShieldCheck, Sparkles, Users, X } from 'lucide-react';
import { api } from './api.js';
import { governanceText } from './governanceContent.js';
import { newsItems, programs, publications, themes } from './data.js';
import { councilPhotos, heroSlides, newsPhotos, pagePhotos, photoSrcSet, photoUrl, photos, programPhotos, programTermPhotos, publicationPhotos, themePhotos } from './images.js';
import ResearchFocusPage from './ResearchFocusPage.jsx';

function transitionUpdate(update) {
  if (typeof document.startViewTransition === 'function' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // A transition is skipped when a newer one starts or the tab is hidden; the update still runs.
    document.startViewTransition(() => flushSync(update)).ready.catch(() => {});
  } else update();
}

// The API lists newest first; numbered items (the programmes) are shown in their numbered order.
const byNumber = (a, b) => String(a.number ?? '').localeCompare(String(b.number ?? ''), undefined, { numeric: true });

function useContent(kind, fallback) {
  const [items, setItems] = useState(fallback);
  useEffect(() => { let active = true; api.publicContent(kind).then(rows => { if (active && Array.isArray(rows)) setItems(rows.map(row => ({ ...row, ...row.data, name: row.title, title: row.title, description: row.description || '' })).sort(byNumber)); }).catch(() => {}); return () => { active = false; }; }, [kind]);
  return items;
}

function Mark({ inverse = false }) { return <Link className={`brand ${inverse ? 'brand-inverse' : ''}`} to="/" aria-label="SK ALTAIR home"><img className="brand-seal" src="/skaltair-emblem.png" alt=""/><span className="brand-type"><b>S<span className="brand-k">K</span> ALTAIR</b><small className="brand-company">Satatham <span>Kritam</span> Advanced Legal Technology and Imperative Research</small><small className="brand-society">(A unit of Sri Chennakeshava Memorial Education and Welfare Society)</small></span></Link>; }
function BrandName() { return <span className="brand-name-text">S<span className="brand-k">K</span> ALTAIR</span>; }

function AboutBrandText({ text }) {
  return text.split(/(SK\s*ALTAIR)/gi).map((part, index) =>
    /^SK\s*ALTAIR$/i.test(part)
      ? <span className="about-brand-mention" key={index}><span className="about-brand-initial">S</span><span className="about-brand-k">K</span><span className="about-brand-rest"> ALTAIR</span></span>
      : part
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [researchOpen, setResearchOpen] = useState(false);
  const [focusOpen, setFocusOpen] = useState(false);
  const [committeeOpen, setCommitteeOpen] = useState(false);
  const [applyOpen, setApplyOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const loc = useLocation();
  useEffect(() => { setOpen(false); setAboutOpen(false); setResearchOpen(false); setFocusOpen(false); setCommitteeOpen(false); setApplyOpen(false); }, [loc.pathname, loc.search, loc.hash]);
  useEffect(() => { let frame = 0; const update = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(() => { const max = document.documentElement.scrollHeight - window.innerHeight; document.documentElement.style.setProperty('--scroll-progress', max > 0 ? String(window.scrollY / max) : '0'); setScrolled(window.scrollY > 80); }); }; update(); window.addEventListener('scroll', update, { passive: true }); window.addEventListener('resize', update); return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', update); window.removeEventListener('resize', update); }; }, []);
  const nav = <>
    <NavLink to="/" end className="nav-link">Home</NavLink>
    <NavLink to="/about" className="nav-link">About Us</NavLink>
    <div className="nav-dropdown research-nav" onMouseEnter={()=>setResearchOpen(true)} onMouseLeave={()=>setResearchOpen(false)}>
      <NavLink to="/programs" end className={`nav-link nav-trigger ${loc.pathname.startsWith('/programs')?'active':''}`} aria-haspopup="true" aria-expanded={researchOpen} aria-controls="research-menu" onClick={() => { setResearchOpen(false); setAboutOpen(false); setFocusOpen(false); setCommitteeOpen(false); setApplyOpen(false); }}>Research Programmes <ChevronDown size={13}/></NavLink>
      {researchOpen && <div className="dropdown-panel research-menu" id="research-menu"><p>Choose a program and explore its available research themes. The same themes are open across program durations; the proposed scope guides term selection.</p><div className="research-menu-grid">{programs.map(program=><details className="research-menu-term" key={program.slug}><summary>{program.name}<ChevronDown size={13}/></summary><Link className="program-overview-link" to={`/programs?term=${program.slug}`}>Program overview · {program.duration}</Link><div className="research-menu-topics">{themes.map((theme,index)=><Link key={theme.title} to={`/programs?term=${program.slug}&theme=${index}`}>{theme.title}</Link>)}</div></details>)}</div></div>}
    </div>
    <div className="nav-dropdown committee-nav" onMouseEnter={()=>setFocusOpen(true)} onMouseLeave={()=>setFocusOpen(false)}><NavLink to="/research-focus/law-governance" className={`nav-link nav-trigger ${loc.pathname.startsWith('/research-focus')?'active':''}`} aria-haspopup="true" aria-expanded={focusOpen} aria-controls="research-focus-menu" onClick={()=>setFocusOpen(false)}>Research Focus <ChevronDown size={13}/></NavLink>{focusOpen&&<div className="dropdown-panel committee-menu" id="research-focus-menu"><Link to="/research-focus/law-governance">Law &amp; Governance</Link><Link to="/research-focus/ai">AI</Link><Link to="/research-focus/data-protection-cyber">Data Protection &amp; Cyber</Link><Link to="/research-focus/intellectual-property">Intellectual Property</Link><Link to="/research-focus/corporate-commercial">Corporate &amp; Commercial</Link><Link to="/research-focus/litigation">Litigation</Link></div>}</div>
    <div className="nav-dropdown committee-nav" onMouseEnter={()=>setCommitteeOpen(true)} onMouseLeave={()=>setCommitteeOpen(false)}><NavLink to="/committee" className={`nav-link nav-trigger ${loc.pathname.startsWith('/committee')?'active':''}`} aria-haspopup="true" aria-expanded={committeeOpen} aria-controls="committee-menu" onClick={()=>setCommitteeOpen(false)}>Committee <ChevronDown size={13}/></NavLink>{committeeOpen&&<div className="dropdown-panel committee-menu" id="committee-menu"><Link to="/committee">Committee Overview</Link><Link to="/committee/board-members">Board Members</Link></div>}</div>
    <div className="nav-dropdown committee-nav publication-nav"><NavLink to="/publications" className="nav-link">Publications and News <ChevronDown size={13}/></NavLink><div className="dropdown-panel committee-menu"><Link to="/publications">Articles</Link><Link to="/publications?type=Research%20Paper">Research Papers</Link></div></div>
    <NavLink to="/collaborate" className="nav-link">Collaborate</NavLink>
    <div className="nav-dropdown committee-nav apply-nav" onMouseEnter={()=>setApplyOpen(true)} onMouseLeave={()=>setApplyOpen(false)}><NavLink to="/apply" className={`nav-link nav-trigger ${loc.pathname.startsWith('/apply')?'active':''}`} aria-haspopup="true" aria-expanded={applyOpen} aria-controls="apply-menu" onClick={()=>setApplyOpen(false)}>Apply Now <ChevronDown size={13}/></NavLink>{applyOpen&&<div className="dropdown-panel committee-menu apply-menu" id="apply-menu"><Link to="/apply">Apply Now</Link><details><summary>Programmes <ChevronDown size={12}/></summary><div className="apply-submenu">{programs.map(program=><Link key={program.slug} to={`/programs?term=${program.slug}`}>{program.name}</Link>)}</div></details><details><summary>Research Focus <ChevronDown size={12}/></summary><div className="apply-submenu">{[{title:'Law & Governance',slug:'law-governance'},{title:'AI',slug:'ai'},{title:'Data Protection & Cyber',slug:'data-protection-cyber'},{title:'Intellectual Property',slug:'intellectual-property'},{title:'Corporate & Commercial',slug:'corporate-commercial'},{title:'Litigation',slug:'litigation'}].map(item=><Link key={item.slug} to={`/research-focus/${item.slug}`}>{item.title}</Link>)}</div></details></div>}</div>
    <NavLink to="/contact" className="nav-link">Contact Us</NavLink>
  </>;
  return <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}><div className="header-inner"><Mark/><nav className={`nav ${open ? 'nav-open' : ''}`} aria-label="Main navigation">{nav}</nav><button className="menu-toggle" aria-expanded={open} onClick={() => setOpen(!open)} aria-label={open ? 'Close navigation' : 'Open navigation'}>{open ? <X/> : <Menu/>}</button></div><span className="scroll-progress" aria-hidden="true"/></header>;
}

function Footer() {
  const [showTop,setShowTop]=useState(false);
  useEffect(()=>{const update=()=>setShowTop(window.scrollY>360);window.addEventListener('scroll',update,{passive:true});update();return()=>window.removeEventListener('scroll',update);},[]);
  return <footer className="footer"><div className="container footer-main"><div className="footer-brand"><Mark inverse/><p>Independent legal and technology research at the intersection of law, technology and public policy.</p><div className="footer-contact"><a className="footer-mail" href="mailto:ananth.sripadarao@sklegal-solutions.com"><Mail size={15}/> ananth.sripadarao@sklegal-solutions.com</a><a className="footer-mail" href="mailto:sk@sklegal-solutions.com"><Mail size={15}/> sk@sklegal-solutions.com</a><a className="footer-mail" href="tel:+919880556565"><Phone size={15}/> +91 98805 56565</a><a className="footer-mail" href="tel:+919448083714"><Phone size={15}/> +91 9448083714</a></div></div><div><h4>Explore</h4><Link to="/about">About <BrandName/></Link><Link to="/programs">Research programmes</Link><Link to="/committee">Board & councils</Link><Link to="/about#governance">Governance</Link></div><div><h4>Read</h4><Link to="/publications">Publications</Link><Link to="/news">News & updates</Link><Link to="/collaborate">Collaborate</Link><Link to="/privacy">Privacy notice</Link></div><div className="footer-cta"><span className="eyebrow light">HAVE A QUESTION?</span><h3>Let’s start a conversation.</h3><Link className="text-link light" to="/contact">Contact the team <ArrowRight size={16}/></Link></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} SKALTAIR. Content and institutional details are subject to confirmation.</span><span className="footer-bottom-right">Bengaluru, India</span></div><button className={`back-to-top ${showTop?'visible':''}`} type="button" aria-label="Back to top" onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>↑</button></footer>;
}

function Photo({ image, widths = [640, 960, 1280, 1920], sizes = '100vw', alt = image.alt, eager = false, ...rest }) { return <img src={photoUrl(image, widths[Math.min(1, widths.length - 1)])} srcSet={photoSrcSet(image, widths)} sizes={sizes} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" style={image.position ? { objectPosition: image.position } : undefined} {...rest}/>; }
function SectionHeading({ eyebrow, title, copy, link, to }) { return <div className="section-heading"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{copy && <p>{copy}</p>}</div>{link && <Link className="text-link" to={to}>{link}<ArrowRight size={16}/></Link>}</div>; }
// Image sizes for the wide intro photograph used on the Research Programmes and Core Committee pages.
const wideIntroImageSizes = '(max-width: 760px) 100vw, (max-width: 1140px) 60vw, (max-width: 1451px) 62vw, 900px';

function PageIntro({ eyebrow, title, copy, image, imageSizes = '(max-width: 1140px) 100vw, 40vw', imageBehind = false, className = '', children }) {
  const lines = [[]];
  const titleContent = React.isValidElement(title) && title.type === React.Fragment ? title.props.children : title;
  React.Children.forEach(titleContent, child => {
    if (React.isValidElement(child) && child.type === 'br') lines.push([]);
    else lines[lines.length - 1].push(child);
  });
  const introImage = image && <figure className={`intro-media${imageBehind ? ' intro-media-behind' : ''}`} aria-hidden="true"><Photo image={image} alt="" widths={[480, 800, 1200, 1600]} sizes={imageBehind ? '100vw' : imageSizes} eager/></figure>;
  return <section className={`page-intro ${className}${imageBehind ? ' page-intro-image-behind' : ''}`}>{imageBehind && introImage}<div className="container"><span className="eyebrow">{eyebrow}</span><h1>{lines.map((line, index)=><span className="page-title-mask" key={index}><span>{line}</span></span>)}</h1><p>{copy}</p>{!imageBehind && introImage}{children}</div></section>;
}

function formatHomeBrandMentions(node, keyPrefix = 'home-brand') {
  if (typeof node === 'string') {
    const parts = node.split(/(SK\s?ALTAIR)/g);
    if (parts.length === 1) return node;
    return parts.map((part, index) => /^SK\s?ALTAIR$/.test(part)
      ? <span className="home-brand-mention" key={`${keyPrefix}-${index}`}><span className="home-brand-initial">S</span><span className="home-brand-k">K</span><span className="home-brand-rest"> ALTAIR</span></span>
      : part);
  }
  if (Array.isArray(node)) return node.map((child, index) => formatHomeBrandMentions(child, `${keyPrefix}-${index}`));
  if (React.isValidElement(node) && node.props.children !== undefined) {
    return React.cloneElement(node, undefined, formatHomeBrandMentions(node.props.children, keyPrefix));
  }
  return node;
}

function Home() {
  const [active, setActive] = useState(0);
  const [slide, setSlide] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);
  const [marqueePreview, setMarqueePreview] = useState(null);
  const marqueePreviewCloseTimer = React.useRef(null);
  const livePrograms = useContent('program', programs);
  const livePublications = useContent('publication', publications);
  const liveNews = useContent('news', newsItems);
  useEffect(() => { if (heroPaused || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return; const timer = window.setInterval(() => setSlide(value => (value + 1) % heroSlides.length), 6500); return () => window.clearInterval(timer); }, [heroPaused]);
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const section = document.querySelector('.gita-strip');
    if (!section) return;
    let frame = 0, lastY = window.scrollY, lastTime = performance.now();
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const now = performance.now(), y = window.scrollY;
        const progress = Math.max(0, Math.min(1, y / 120));
        const speed = Math.abs(y - lastY) / Math.max(1, now - lastTime);
        const mix = (from, to) => from.map((channel, index) => Math.round(channel + (to[index] - channel) * progress));
        const bg = mix([245, 240, 233], [68, 48, 52]);
        const ink = mix([71, 62, 56], [244, 235, 226]);
        section.style.backgroundColor = `rgb(${bg.join(' ')})`;
        section.style.setProperty('--gita-ink', `rgb(${ink.join(' ')})`);
        section.style.setProperty('--gita-progress', progress.toFixed(3));
        section.style.setProperty('--gita-duration', `${Math.max(.2, Math.min(.4, .4 - speed * .04))}s`);
        section.style.setProperty('--gita-drift', `${((progress - .5) * 24).toFixed(1)}px`);
        section.style.setProperty('--gita-scale', (0.94 + progress * 0.24).toFixed(3));
        section.style.setProperty('--gita-opacity', (0.2 + progress * 0.2).toFixed(3));
        lastY = y; lastTime = now;
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, []);
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const windowEl = document.querySelector('.program-marquee-window');
    const track = windowEl?.querySelector('.program-marquee-track');
    if (!windowEl || !track) return;
    let frame = 0;
    let lastFrame = performance.now();
    let velocity = 0;
    let offset = 0;
    const animate = now => {
      const elapsed = Math.min(50, now - lastFrame) / 1000;
      lastFrame = now;
      const distance = track.scrollWidth / 2;
      if (distance > 0) {
        const cruise = distance / 28;
        const target = track.closest('.program-marquee')?.matches(':hover,:focus-within') ? 0 : cruise;
        velocity += (target - velocity) * (1 - Math.exp(-elapsed / 0.62));
        offset = (offset + velocity * elapsed) % distance;
        track.style.transform = `translate3d(${-offset}px,0,0)`;
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => { cancelAnimationFrame(frame); };
  }, [livePrograms]);
  const showProgramPreview = (event, program) => {
    window.clearTimeout(marqueePreviewCloseTimer.current);
    const marquee = event.currentTarget.closest('.program-marquee');
    if (!marquee) return;
    const item = event.currentTarget.getBoundingClientRect();
    const bounds = marquee.getBoundingClientRect();
    setMarqueePreview({ program, left: Math.max(150, Math.min(bounds.width - 150, item.left - bounds.left + item.width / 2)), closing: false });
  };
  const hideProgramPreview = () => {
    window.clearTimeout(marqueePreviewCloseTimer.current);
    setMarqueePreview(current => current ? { ...current, closing: true } : current);
    marqueePreviewCloseTimer.current = window.setTimeout(() => setMarqueePreview(null), 260);
  };
  const principles = [['Intellectual independence', 'Legal and technology research guided by evidence and reason.'], ['Rigorous analysis', 'Questions examined with care and discipline.'], ['Responsible scholarship', 'Legal and technology research connected to public benefit.']];
  const institution = [
    { title: 'About SK ALTAIR', copy: <>Understand our purpose, legal and technology research orientation and institutional identity.</>, to: '/about', Icon: Landmark },
    { title: 'Vision, Mission and Objectives', copy: 'Explore the principles and goals that guide our work.', to: '/about#vision', Icon: Sparkles },
    { title: 'Governance and Institutional Policies', copy: 'Learn about our governance structure, academic independence and standards for responsible legal and technology research.', to: '/governance', Icon: ShieldCheck },
  ];
  // Each research area reuses the photo of its matching research theme.
  const researchFocus = [
    { title: 'Law, Governance and Public Policy', desc: 'Legislative reform, constitutional and administrative law, institutional accountability, access to justice and policy implementation.', icon: '§', photo: photos.raisinaHill, slug: 'law-governance' },
    { title: <>Artificial Intelligence<br/>and Emerging Technologies</>, desc: 'Legal, ethical and governance challenges arising from artificial intelligence, automated decision-making and technological change.', icon: 'AI', photo: photos.aiHands, slug: 'ai' },
    { title: 'Data Protection and Cybersecurity', desc: 'Privacy, data governance, digital rights, cybersecurity and accountability in the digital environment.', icon: '01', photo: photos.phoneLock, slug: 'data-protection-cyber' },
    { title: <>Intellectual Property<br/>and Innovation</>, desc: 'Intellectual property, technology transfer, licensing and the relationship between innovation and public interest.', icon: '©', photo: photos.lightBulb, slug: 'intellectual-property' },
    { title: 'Corporate and Commercial Law', desc: 'Corporate governance, mergers and acquisitions, competition law and emerging commercial and regulatory questions.', icon: '↗', photo: photos.boardroom, slug: 'corporate-commercial' },
    { title: 'Litigation and Dispute Resolution', desc: 'Judicial processes, procedural reform, arbitration, mediation and other forms of alternative dispute resolution.', icon: '⚖', photo: photos.ladyJustice, slug: 'litigation' },
  ];
  const homeContent = <>
    <section className="gita-strip" onPointerMove={event=>{const rect=event.currentTarget.getBoundingClientRect();event.currentTarget.style.setProperty('--gita-pointer-x',`${event.clientX-rect.left}px`);event.currentTarget.style.setProperty('--gita-pointer-y',`${event.clientY-rect.top}px`);}} onPointerLeave={event=>{event.currentTarget.style.setProperty('--gita-pointer-x','50%');event.currentTarget.style.setProperty('--gita-pointer-y','50%');}}><svg className="gita-geometry" viewBox="0 0 240 240" aria-hidden="true"><g fill="none" stroke="currentColor" strokeWidth=".8"><circle cx="120" cy="120" r="92"/><circle cx="120" cy="120" r="76"/><path d="M120 28C87 64 87 92 120 120c33-28 33-56 0-92Zm0 184c33-36 33-64 0-92-33 28-33 56 0 92ZM28 120c36-33 64-33 92 0-28 33-56 33-92 0Zm184 0c-36 33-64 33-92 0 28-33 56-33 92 0ZM55 55c47 3 72 28 65 65-37 7-62-18-65-65Zm130 130c-47-3-72-28-65-65 37-7 62 18 65 65ZM185 55c-3 47-28 72-65 65-7-37 18-62 65-65ZM55 185c3-47 28-72 65-65 7 37-18 62-65 65Z"/></g></svg><div className="container gita-inner"><div className="gita-quote ink-reveal"><p className="gita-sanskrit" lang="sa">न हि ज्ञानेन सदृशं पवित्रमिह विद्यते।<br/>तत्स्वयं योगसंसिद्धः कालेनात्मनि विन्दति॥</p><span className="gita-transliteration">“na hi jñānena sadṛśaṁ pavitram iha vidyate; tat svayaṁ yoga-saṁsiddhaḥ kālenātmani vindati.”</span><p className="gita-translation"><b>Translation:</b> <em>In this world, there is nothing as purifying as knowledge.</em> <small>— Bhagavad Gita 4.38</small></p></div><div className="gita-action ink-reveal"><button className="listen-button" type="button" aria-label="Audio coming soon"><span className="listen-icon">▶</span><span className="soundwave" aria-hidden="true"><i/><i/><i/></span><span className="listen-label">Listen soon</span><span className="listen-tooltip" aria-hidden="true">Audio coming soon</span></button></div></div></section>

    <section className="news-marquee" aria-label="Institution updates"><span>PUBLICATIONS &amp; NEWS</span><div>{[...livePublications.slice(0,3).map(item=>item.title),...liveNews.slice(0,3).map(item=>item.title)].map((title,i)=><Link key={`${title}-${i}`} to={i<3?'/publications':'/news'}>{title}<ArrowUpRight size={14}/></Link>)}</div></section>

    <section className="hero"><div className="hero-content container"><div className="hero-copy"><h1 className="hero-title"><span className="hero-title-mask"><span>Advancing Legal and Technology Research.</span></span><span className="hero-title-mask"><span>Informing Public Policy.</span></span><span className="hero-title-mask"><span>Supporting Responsible Innovation.</span></span></h1><div className="hero-actions"><Link to="/apply" className="button button-red">Apply now <ArrowRight size={16}/></Link><Link to="/about" className="text-link hero-about-link">About <BrandName/> <ArrowUpRight size={15}/></Link></div><div className="hero-proof"><span>LAW</span><i/> <span>TECHNOLOGY</span><i/> <span>PUBLIC POLICY</span></div></div><div className="hero-art-wrap"><div className="hero-art-frame" onMouseEnter={() => setHeroPaused(true)} onMouseLeave={() => setHeroPaused(false)}>{heroSlides.map((image, index) => <Photo key={image.id} image={image} className="hero-art" data-active={slide === index} widths={[640, 960, 1280, 1800]} sizes="(max-width: 760px) 100vw, 600px" eager={index === 0} fetchpriority={index === 0 ? 'high' : undefined} aria-hidden={slide !== index}/>)}<div className="hero-art-label"><span>{String(slide + 1).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')}</span><b>Law · Technology · Public Policy</b></div></div><div className="hero-seal"><img src="/skaltair-emblem.png" alt="SK ALTAIR emblem"/><span>Independent thought.<br/>Practical insight.</span></div></div></div><div className="hero-bottom container"><span>RESEARCH WITH PUBLIC PURPOSE</span><a href="#purpose">SCROLL TO EXPLORE <ArrowDownRight size={14}/></a></div></section>


    <section className="section section-about" id="purpose"><div className="container two-col"><div className="section-art"><Photo image={photos.stateCentralLibrary} widths={[640, 960, 1280, 1600]} sizes="(max-width: 760px) 100vw, 560px"/><div className="art-stamp"><Landmark size={22}/><span>Research<br/>for public good</span></div></div><div className="about-copy"><span className="eyebrow">OUR PURPOSE</span><p className="lead">We connect legal and policy scholarship with the practical needs of legislation, policymaking, governance, adjudication and dispute resolution.</p><p>Through original legal and technology research, informed debate and collaboration, we seek to identify gaps, evaluate possible solutions and support the development and effective implementation of laws and public policies.</p><p>Our work is guided by intellectual independence, rigorous analysis and a commitment to the rule of law, accountable governance and responsible innovation.</p><Link className="text-link" to="/about">About <BrandName/> <ArrowRight size={16}/></Link><div className="method-steps purpose-principles">{principles.map(([title, copy], i) => <div className="method-step" key={title}><span>0{i + 1}</span><div><h3>{title}</h3><p>{copy}</p></div></div>)}</div></div></div></section>

    <section className="section section-institution"><div className="container"><SectionHeading eyebrow="" title={<>THE INSTITUTION</>} copy={<>Explore the institutional framework that guides <BrandName/>&apos;s legal and technology research and public-facing work.</>}/><div className="theme-grid">{institution.map(({ title, copy, to, Icon }, i) => <Link className="theme-card" to={to} key={title}><span className="theme-number">0{i + 1}</span><span className="theme-symbol"><Icon size={21}/></span><h3>{title === 'About SK ALTAIR' ? <>About <BrandName/></> : title}</h3><p>{copy}</p><span className="card-arrow"><ArrowUpRight size={17}/></span></Link>)}</div></div></section>

    <section className="section section-themes" id="research"><div className="container"><SectionHeading eyebrow="OUR RESEARCH FOCUS" title={<><span className="research-heading-black">A broad field of</span> inquiry.</>} copy="Our legal and technology research spans contemporary challenges at the intersection of law, technology, governance and public policy." link="Explore all research themes" to="/programs"/><div className="theme-grid">{researchFocus.map((t, i) => <Link className="theme-card" to={`/research-focus/${t.slug}`} key={`research-focus-${i}`}><span className="theme-media"><Photo image={t.photo} alt="" widths={[480, 800, 1200]} sizes="(max-width: 520px) 100vw, (max-width: 760px) 50vw, 400px"/></span><span className="theme-number">0{i + 1}</span><span className="theme-symbol">{t.icon}</span><h3>{t.title}</h3><p>{t.desc}</p><span className="card-arrow"><ArrowUpRight size={17}/></span></Link>)}</div></div></section>

    <section className="section section-programs"><div className="container"><div className="program-top"><div><span className="eyebrow light">RESEARCH WITH US</span></div><p>Our structured legal and technology research programmes support sustained inquiry through mentorship, defined milestones and independent review.</p></div><div className="program-slider" aria-label="Research programmes">{livePrograms.map((p, i) => <Link key={p.slug} to={`/apply?program=${p.slug}`} className={`program-slide ${active === i ? 'selected' : ''}`} onMouseEnter={() => setActive(i)}>{programPhotos[p.slug] && <span className="program-media" aria-hidden="true"><Photo image={programPhotos[p.slug]} alt="" widths={[480, 800, 1200]} sizes="(max-width: 760px) 100vw, 400px"/></span>}<span className="program-count">{p.number}</span><div><span className="program-duration"><Clock3 size={14}/>{p.duration}</span><h3>{p.name}</h3><p>{p.description}</p></div><span className="program-slide-arrow"><ArrowUpRight size={18}/></span></Link>)}</div><div className="program-controls"><div className="program-dots">{livePrograms.map((p, i) => <button key={p.slug} className={active === i ? 'active' : ''} aria-label={`Highlight ${p.name}`} aria-pressed={active===i} onClick={() => setActive(i)}/>)}</div><Link className="text-link light" to="/programs">Explore Research Programmes <ArrowRight size={16}/></Link></div><div className="program-notes"><div><h3>Who can apply?</h3><p>Students, fresh law graduates, practising lawyers and other eligible researchers may apply against published topics and programme requirements. Online participation is available, subject to project terms.</p><Link className="text-link light" to="/apply">Register Your Interest <ArrowUpRight size={15}/></Link></div><div><h3>Research support</h3><p>Selected researchers receive monthly stipends as specified in their project offers. Completion certificates are issued upon satisfactory completion and submission of the required work within the approved period.</p></div></div></div></section>

    <section className="section section-method"><div className="container method-layout"><div><span className="eyebrow">THE SKALTAIR APPROACH</span><h2>From a sharp question<br/>to a <em>useful contribution.</em></h2><p className="lead">Legal and technology research that is rigorous enough for scholarship and clear enough to inform action.</p><Link to="/about#mission" className="text-link">How we work <ArrowRight size={16}/></Link></div><div className="method-steps"><div className="method-step"><span>01</span><div><h3>Ask with care</h3><p>Define a researchable question and understand the context behind it.</p></div><ArrowUpRight size={17}/></div><div className="method-step"><span>02</span><div><h3>Investigate rigorously</h3><p>Use sound methods, reliable sources and ethical research practices.</p></div><ArrowUpRight size={17}/></div><div className="method-step"><span>03</span><div><h3>Share with purpose</h3><p>Communicate findings and practical recommendations with clarity.</p></div><ArrowUpRight size={17}/></div></div></div></section>

    <section className="section section-join"><div className="container join-inner"><div className="join-icon"><Scale size={26}/></div><div><span className="eyebrow">COLLABORATE WITH <BrandName/></span><h2>Contribute to legal and technology research,<br/><em>policy and innovation.</em></h2><p>We welcome expressions of interest from researchers, academic institutions, professional bodies and public institutions seeking to contribute through legal and technology research, mentorship, policy consultation and scholarly exchange.</p></div><div className="join-actions"><Link to="/collaborate" className="button button-red">Collaborate With Us <ArrowUpRight size={16}/></Link><Link to="/contact" className="text-link">Contact Us <ArrowRight size={16}/></Link></div></div></section>
  </>;
  return <>{formatHomeBrandMentions(homeContent)}</>;
}

function About() {
  const [expanded,setExpanded]=useState(false); const [more,setMore]=useState({});
  const objectives=[
    ['Advance Original and Independent Research','Provide a platform for legal professionals, students and eligible interdisciplinary researchers to undertake original, methodologically sound legal and technology research. Encourage critical inquiry, careful evaluation of sources and conclusions supported by evidence and reason.'],
    ['Support Legislative and Policy Development','Examine the design, interpretation, administration, enforcement and effectiveness of laws and public policies. Identify statutory gaps, regulatory uncertainty and implementation challenges, and develop practical proposals for reform.'],
    ['Examine Technology and Its Legal Implications','Investigate the legal, ethical and governance implications of artificial intelligence, automated decision-making, emerging technologies, data privacy, cybersecurity and digital activity. Contribute to approaches that protect rights while supporting responsible innovation.'],
    ['Develop Research Across Legal Disciplines','Advance inquiry into intellectual property, technology transfer, corporate and commercial law, mergers and acquisitions, competition law, litigation and dispute resolution. Address constitutional, administrative, civil, criminal, social and economic questions of contemporary importance.'],
    ['Strengthen Research Skills Through Mentorship','Conduct structured short-term, mid-term and long-term legal and technology research programmes with transparent proposal-based selection, supervision, defined milestones and assessed outputs. Develop researchers’ capabilities in methodology, ethical research, legal writing and policy communication, with stipends and research support on approved project-specific terms.'],
    ['Encourage Informed Debate and Consultation','Create opportunities for reasoned discussion of contested legal and policy questions through consultations, lectures, seminars, workshops and scholarly exchanges. Welcome competing viewpoints and encourage constructive engagement among researchers, practitioners, institutions and other stakeholders.'],
    ['Publish and Share Accessible Research','Publish research papers, articles, reports, policy briefs and educational resources that communicate findings clearly and support informed decision-making. Maintain appropriate editorial review, respect intellectual property rights and acknowledge researchers’ authorship and contributions.'],
    ['Build Academic and Institutional Collaboration','Collaborate with academic institutions, professional bodies, researchers, public institutions and other suitable organisations. Support joint inquiry, knowledge exchange, policy consultation and capacity building while preserving scholarly independence.'],
    ['Promote Public Understanding and Access to Justice','Make legal, technology and policy research accessible to wider audiences. Examine barriers to justice and institutional effectiveness, and contribute to public understanding of rights, responsibilities and legal processes.'],
    ['Uphold Integrity and Institutional Accountability','Maintain standards of intellectual honesty, fairness, inclusion, confidentiality, data protection and responsible use of technology. Manage conflicts of interest and apply grants, donations and other permitted resources transparently towards the Centre’s public-benefit objectives.']
  ];
  const full=[
    'Our purpose is to connect legal scholarship with the practical needs of legislation, policymaking, governance, adjudication and dispute resolution. We examine challenges confronting the legislature, executive and judiciary, identify gaps in existing legal and regulatory frameworks, and develop evidence-based recommendations for reform. Our work also considers how laws and policies operate in practice, including the barriers that affect their implementation, accessibility and effectiveness.',
    'As technology reshapes society, legal research must address questions that extend beyond established disciplinary boundaries. SK ALTAIR’s research interests encompass artificial intelligence, automated decision-making, data privacy and protection, cybersecurity, intellectual property, innovation and technology transfer. Our scope also includes corporate and commercial law, mergers and acquisitions, competition law, litigation, arbitration, mediation and other forms of alternative dispute resolution, alongside constitutional, social and economic questions of public importance.',
    'We support sustained inquiry through structured short-term, mid-term and long-term research programmes. These programmes bring together students, emerging legal professionals, practising lawyers and other eligible researchers through proposal-based selection, mentorship, defined research milestones and independent review. Online participation enables researchers to contribute across geographical boundaries.',
    'Our commitment to policymaking extends from identifying problems to evaluating possible solutions. Through research papers, policy briefs, consultations, scholarly exchanges and institutional collaboration, we seek to support the formulation, review, reform, implementation and evaluation of laws, regulations and public policies. We also aim to strengthen research capability through methodological guidance, ethical research practices, legal writing and effective policy communication.',
    'Intellectual independence, rigorous analysis and responsible scholarship guide our work. We welcome competing viewpoints supported by evidence and reason, while maintaining safeguards for research integrity, confidentiality, data protection and intellectual property. Research conclusions must remain independent of donor or collaborator preferences, and researchers’ contributions must receive appropriate acknowledgement.',
    'Through this work, SK ALTAIR seeks to strengthen the rule of law, promote access to justice and accountable governance, and support responsible innovation for public benefit.'
  ];
  const toggle=k=>setMore(v=>({...v,[k]:!v[k]}));
  const bracketRoutes={"[Contact the Centre Regarding a Grievance]":"/contact","[Contact Us]":"/contact","[Read Our Privacy Notice]":"/privacy","[Research Programmes]":"/programs","[Vision, Mission and Objectives]":"/about#vision"};
  const renderPolicyLine=line=>line.split(/(\[[^\]]+\])/g).map((part,i)=>bracketRoutes[part]?<Link className="about-bracket-link" key={`${part}-${i}`} to={bracketRoutes[part]}>{part}</Link>:<AboutBrandText text={part} key={`text-${i}`}/>);
  const gov=governanceText.split('\n').filter(Boolean).slice(1); const categoryTitles=new Set(['Our Governance Structure','Our Institutional Policies']); const policyTitles=new Set(['Governing Council','Centre Leadership and Academic Functions','Role of the Society','Academic Independence','Research Integrity and Ethics','Responsible Use of Artificial Intelligence','Data Protection and Information Security','Confidentiality','Intellectual Property and Publication Rights','Editorial Standards and Publication Review','Conflicts of Interest and Funding Independence','Fair Participation and Grievance Handling','Programme Accountability and Records','Constitution and Policy Documents','Questions About Our Governance']);
  const govIntro=gov.slice(0,2); const categories=[]; let category=null; let policy=null;
  gov.slice(2).forEach((line,i)=>{if(categoryTitles.has(line)){category={title:line,items:[]};categories.push(category);policy=null}else if(policyTitles.has(line)&&category){policy={title:line,lines:[],id:'gp'+i};category.items.push(policy)}else if(policy)policy.lines.push(line)});
  return <div className="about-page-layout"><aside className="contents-rail about-hero-rail"><span className="eyebrow">ABOUT <AboutBrandText text="SK ALTAIR"/></span><a href="#vision">Vision</a><a href="#mission">Mission</a><a href="#constitution">Constitution</a><a href="#objectives">Objectives</a><a href="#governance"><span>Governance and</span><span>Institutional Policies</span></a></aside><PageIntro eyebrow="ABOUT US" title={<>About <em>Us</em></>} copy="" image={pagePhotos.about} className="page-intro-about"><div className="about-summary"><p><b>Satatham Kritam Advanced Legal Technology and Imperative Research (<AboutBrandText text="SK ALTAIR"/>)</b> is a non-profit research initiative dedicated to examining contemporary legal, technological and public-policy challenges. A unit of <b>Sri Chennakeshava Memorial Education and Welfare Society</b>, we provide a platform for legal professionals, students and interdisciplinary researchers to undertake original research, engage in informed debate and contribute to the development of laws, institutions and public policies.</p><button className="text-link" onClick={()=>setExpanded(v=>!v)}>{expanded?'Read less':'Read me'} <ArrowRight size={16}/></button>{expanded&&<div className="about-purpose-expanded">{full.map(p=><p key={p}><AboutBrandText text={p}/></p>)}</div>}</div></PageIntro><section className="section content-section"><div className="container about-page-grid"><div className="prose"><section id="vision"><span className="eyebrow">01 · VISION</span><h2>A clear direction for the future.</h2><p>To be a respected centre of independent legal, technological and public-policy research that strengthens the rule of law, informs public institutions and enables society to respond fairly and effectively to emerging challenges.</p></section><section id="mission"><span className="eyebrow">02 · MISSION</span><h2>Create room for rigorous inquiry.</h2><p>We provide legal professionals, students and interdisciplinary researchers with an inclusive platform for sustained legal and technology research and informed debate on challenges confronting the legislature, executive and judiciary.</p>{more.mission&&<><p>Through structured, mentored programmes, credible publications, stakeholder consultation and institutional collaboration, we seek to support the development and reform of laws and policies, effective implementation and evidence-based evaluation.</p><p>Our work connects legal scholarship with legislation, policymaking, governance, adjudication and dispute resolution. It examines how rules work in practice and how they can better serve the public, including as technology reshapes rights, institutions and social life.</p></>}<button className="text-link" onClick={()=>toggle('mission')}>{more.mission?'Read less':'Read more'}</button></section><section id="constitution"><span className="eyebrow">03 · CONSTITUTION</span><h2>The framework for the institution.</h2><p>The Centre’s Constitution establishes its institutional purpose, governance structure, delegated authority and research framework.</p>{more.constitution&&<><p>Its accompanying policies provide detailed standards for data protection, intellectual property, confidentiality, research integrity, records and implementation.</p><p>The adopted Constitution and approved policies will be made available here, with their effective dates and subsequent revisions.</p><p>This page provides an overview. The adopted governing documents, applicable law and executed project agreements determine the detailed rights and obligations of the Centre and its participants.</p></>}<button className="text-link" onClick={()=>toggle('constitution')}>{more.constitution?'Read less':'Read more'}</button></section><section id="objectives"><span className="eyebrow">04 · OBJECTIVES</span><h2>What guides the work.</h2><div className="objective-list">{objectives.map(([title,description],i)=><article className="objective-card" key={title}><span className="objective-number">{String(i+1).padStart(2,'0')}</span><h3>{title}</h3><p className="objective-description">{description}</p></article>)}</div></section></div></div></section><section id="governance" className="section governance-content"><div className="container"><div className="governance-section-heading"><span className="eyebrow">05 · GOVERNANCE</span><h2>Governance and Institutional Policies</h2></div><div className="governance-intro">{govIntro.map((line,i)=><p key={i}><AboutBrandText text={line}/></p>)}</div>{categories.map(cat=><section className="governance-category" key={cat.title}><h3>{cat.title}</h3><div className="governance-grid">{cat.items.map(item=><article className="governance-policy-card" key={item.id}><h4>{item.title}</h4>{(more[item.id]?item.lines:item.lines.slice(0,2)).map((line,i)=><p className={line.trim().startsWith('•')?'governance-bullet':''} key={i}>{renderPolicyLine(line)}</p>)}{item.lines.length>2&&<button className="text-link" onClick={()=>toggle(item.id)}>{more[item.id]?'Read less':'Read more'}</button>}</article>)}</div></section>)}<div className="about-download-row"><a className="button button-red about-download" href="/governance-constitution-objectives.pdf" download>Download Constitution, Objectives and Governance Policies</a></div></div></section></div>;
}

function ProgramsPage() {
  const livePrograms = useContent('program', programs);
  const location=useLocation();
  const [selected, setSelected] = useState('short-term');
  const current = livePrograms.find(p => p.slug === selected) || livePrograms[0] || programs[0];
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState('');
  const filtered = useMemo(() => themes.filter(t => t.title.toLowerCase().includes(query.toLowerCase()) || t.desc.toLowerCase().includes(query.toLowerCase())), [query]);
  useEffect(()=>{const params=new URLSearchParams(location.search);const term=params.get('term');if(livePrograms.some(program=>program.slug===term))setSelected(term);const themeParam=params.get('theme');const themeIndex=themeParam?Number(themeParam):NaN;const nextQuery=Number.isInteger(themeIndex)&&themes[themeIndex]?themes[themeIndex].title:'';setSearch(nextQuery);setQuery(nextQuery);},[location.search,livePrograms]);
  return <><PageIntro eyebrow="RESEARCH PROGRAMMES" title={<>Choose a theme.<br/><em>Define your question.</em></>} copy="A structured, mentored legal and technology research path for legal professionals, students and interdisciplinary researchers." image={pagePhotos.programs} imageSizes={wideIntroImageSizes}/><section className="section program-page program-terms"><div className="container"><div className="term-tabs" role="tablist">{livePrograms.map(p=><button key={p.slug} role="tab" aria-selected={selected===p.slug} className={selected===p.slug?'selected':''} onClick={()=>transitionUpdate(()=>setSelected(p.slug))}><span>{p.number}</span>{p.name}<small>{p.duration}</small></button>)}</div><div className="term-panel"><div className="term-visual">{programTermPhotos[current.slug] && <figure className="term-media" key={current.slug}><Photo image={programTermPhotos[current.slug]} widths={[480, 800, 1200]} sizes="(max-width: 760px) 100vw, 640px"/></figure>}<span className="term-badge" aria-hidden="true">{current.number}</span></div><div className="term-copy"><span className="eyebrow">{current.name.toUpperCase()} · {current.duration}</span><h2>A research term<br/><em>shaped around the question.</em></h2><p>{current.description} The preferred term should reflect the research question, methodology, available sources and proposed deliverables. Final duration and milestones are agreed in the written offer.</p><Link to={`/apply?program=${current.slug}`} className="button button-red term-apply">Apply <ArrowRight size={17}/></Link></div></div></div></section><section className="section program-page program-themes"><div className="container"><div className="themes-heading"><div><span className="eyebrow">RESEARCH THEMES</span><h2>Questions we’re <em>exploring.</em></h2></div><label className="search-box"><input value={search} onChange={e=>{const value=e.target.value;setSearch(value);transitionUpdate(()=>setQuery(value));}} placeholder="Search themes" aria-label="Search research themes"/><span><Search size={17}/></span></label></div><div className="theme-tiles">{filtered.map(t=><article className="theme-tile" key={t.title}><div className="theme-tile-media">{themePhotos[t.title] && <Photo image={themePhotos[t.title]} alt="" widths={[480, 800]} sizes="(max-width: 760px) 100vw, (max-width: 1140px) 50vw, 400px"/>}</div><div className="theme-tile-body"><div className="theme-tile-meta"><span>{String(themes.indexOf(t)+1).padStart(2,'0')}</span><span aria-hidden="true">{t.icon}</span></div><h3>{t.title}</h3><p>{t.desc}</p><details className="theme-details"><summary><span className="when-closed">View illustrative subtopics</span><span className="when-open">Hide subtopics</span><Plus size={17} aria-hidden="true"/></summary><ul>{t.topics?.map(x=><li key={x}>{x}</li>)}</ul></details></div></article>)}</div>{!filtered.length && <p className="theme-empty">No research themes match “{search}”.</p>}<div className="research-note"><CircleHelp size={18}/><p>These themes provide a framework for proposals. Applicants may propose other relevant questions and should explain how their work connects with a primary theme.</p></div></div></section><section className="section program-page proposal-band"><div className="container proposal-layout"><div className="proposal-intro"><div className="proposal-heading"><span className="eyebrow">PROPOSAL GUIDANCE</span><h2>From interest to <em>a researchable proposal.</em></h2></div><p>Unless a specific call says otherwise, a proposal should identify its primary theme, working title, research problem, principal questions, significance and existing research gap. Outline a feasible methodology, scope, indicative sources, expected contribution and monthly work plan. Disclose relevant ethical, confidentiality, data-access or conflict-of-interest considerations.</p><div className="guidance-caution"><ShieldCheck size={18}/><span>Application windows and detailed terms are pending confirmation. The written offer and project agreement will govern any engagement.</span></div></div><div className="guidance-grid"><article><div className="guidance-top"><span className="guidance-icon"><Users size={20}/></span><span className="guidance-no">01</span></div><h3>Who may apply</h3><p>Law students, fresh graduates, early-career professionals, practising lawyers and researchers in relevant disciplines may apply, subject to each call’s eligibility requirements.</p></article><article><div className="guidance-top"><span className="guidance-icon"><ClipboardCheck size={20}/></span><span className="guidance-no">02</span></div><h3>How proposals are reviewed</h3><p>Assessment considers relevance, originality, analytical quality, methodology, feasibility, availability of supervision and approved funding. Shortlisted applicants may be invited to discuss and refine their proposal.</p></article><article><div className="guidance-top"><span className="guidance-icon"><GraduationCap size={20}/></span><span className="guidance-no">03</span></div><h3>Mentorship and participation</h3><p>Selected researchers receive guidance, feedback and agreed milestones. Projects may include scheduled reviews, progress reports and documented sources. Online participation depends on project requirements.</p></article><article><div className="guidance-top"><span className="guidance-icon"><Award size={20}/></span><span className="guidance-no">04</span></div><h3>Stipends and completion</h3><p>Any monthly stipend, funded period, schedule and completion conditions are stated in the written offer. Selection does not guarantee publication; certificates require satisfactory completion of agreed deliverables.</p></article></div></div></section></>;
}

// Core Committee: an overview of the three bodies, then a page for each, all within the Committee section.
const committeePages = [
  { to: '/committee', label: 'Committee Overview' },
  { to: '/committee/board-members', label: 'Board Members' },
  { to: '/committee/research-council', label: 'Research Council' },
  { to: '/committee/academic-council', label: 'Academic Council' },
];

const committeeBodies = [
  {
    to: '/committee/board-members', tab: '01 · BOARD', name: 'Board Members', Icon: Landmark, line: 'Institutional stewardship', link: 'Meet the Board',
    copy: 'Board Members bring experience in legal practice, research, innovation and education to guide SK ALTAIR’s institutional development and academic work, within the responsibilities assigned under the Centre’s approved governance framework.',
    remit: ['Institutional development', 'Academic guidance', 'Practice and innovation', 'Governance framework'],
  },
  {
    to: '/committee/research-council', tab: '02 · RESEARCH', name: 'Research Council', Icon: BookOpen, line: 'The research agenda', link: 'View the Research Council',
    copy: 'The Research Council will support the development of the Centre’s legal and technology research agenda, assess proposed research themes and encourage rigorous, relevant and feasible projects.',
    remit: ['Research agenda', 'Theme assessment', 'Methodology and supervision', 'Interdisciplinary collaboration', 'Legal and policy contribution'],
  },
  {
    to: '/committee/academic-council', tab: '03 · ACADEMIC', name: 'Academic Council', Icon: GraduationCap, line: 'Academic standards', link: 'View the Academic Council',
    copy: 'The Academic Council will support academic standards across the Centre’s legal and technology research programmes, with guidance on programme design, researcher development, mentorship, assessment criteria and academic quality.',
    remit: ['Programme design', 'Researcher development', 'Mentorship', 'Assessment criteria', 'Lectures and workshops'],
  },
];

// Portraits are stored in client/public/committee. Fill in each contact detail as it is supplied: linkedin takes the full
// profile URL and email the address.
const boardMembers = [
  {
    name: 'Dr. S. K. Murthy', initials: 'SKM', title: 'SK ALTAIR Board Member', photo: '/committee/s-k-murthy.jpg',
    contact: { linkedin: '', email: '' },
    summary: 'His work spans teaching, research and development, and intellectual property, including 24 years building and sustaining innovation and IP cultures within multinational organisations.',
    highlights: [['32', 'years of experience'], ['6,000+', 'patent assets managed'], ['250+', 'patent applications']],
    expertise: ['US, European and Indian patent practice', 'Data protection', 'Corporate governance', 'IP and standards policy'],
    bio: ['Dr. S. K. Murthy brings 32 years of experience spanning teaching, research and development, and intellectual property, including 24 years dedicated to building and sustaining innovation and IP cultures within multinational organisations.',
      'His expertise covers United States, European and Indian patent practice, data protection and corporate governance. He has chaired a global IP committee, managed more than 6,000 patent assets, developed over 500 claim charts, prepared more than 250 patent applications and handled over 500 responses to patent office actions.',
      'He has contributed to IP and standards policy in India and co-founded the In-House IP Professionals (IHIPP) Forum, an Indian IP think tank. He has authored books and articles, including a commissioned paper published by the National Academy of Sciences, USA. He is a member of the Government of Karnataka’s ESDM Vision Group and serves on advisory boards and boards of studies at engineering institutions.',
      'His qualifications include a BE, an ME with a gold medal, an LLB, a Postgraduate Diploma in Intellectual Property Rights, a Doctor of Science in Computer Science and a PhD from the National Law School of India University. He is enrolled with the Karnataka State Bar Council, is a registered Indian Patent Agent and holds certification as an Independent Director.'],
  },
  {
    name: 'Mr. Ananth Sripadarao', initials: 'AS', title: 'SK ALTAIR Board Member', photo: '/committee/ananth-sripadarao.jpg',
    contact: { linkedin: '', email: '' },
    summary: 'His practice spans patents, trademarks, brand protection, technology licensing, corporate governance, and mergers and acquisitions across the Asia-Pacific, Middle East and Africa.',
    highlights: [['23+', 'years of experience'], ['200+', 'patent filings led'], ['400+', 'technologies licensed or commercialised']],
    expertise: ['Patents and trademarks', 'Technology licensing', 'IP litigation', 'Mergers and acquisitions'],
    bio: ['Mr. Ananth Sripadarao brings over 23 years of experience in intellectual property law and legal affairs across the Asia-Pacific, Middle East and Africa regions. His practice encompasses patents, trademarks, brand protection, industrial designs, technology licensing, corporate governance, and mergers and acquisitions.',
      'He has led significant IP litigation and complex licensing negotiations, with a reported 100% success rate in the internal infringement matters he handled. His experience includes leading the filing of more than 200 patent applications and supporting the commercialisation or licensing of over 400 technologies, alongside developing brand-protection and technology-licensing strategies.',
      'He has held key legal and IP roles at Philips India Ltd. and 3M India Ltd. His qualifications include a BSc in Chemistry, an LLM in Intellectual Property and Information Technology from the National University of Singapore, a Postgraduate Diploma in Patent Law from NALSAR University of Law, and an Executive Programme in Advanced Corporate Law covering mergers and acquisitions from the Indian Institute of Management Calcutta.',
      'He is enrolled with the Karnataka State Bar Council, is a registered Indian Patent Agent and Trademark Agent, a Registered Independent Director and a Certified Arbitrator. He is also a member of the Licensing Executives Society and the Chartered Institute of Arbitrators, London.'],
  },
];

// Placeholder seats until appointments are confirmed; replace each with the member's name, title, photo, contact details and profile.
const councils = {
  research: {
    name: 'Research Council', eyebrow: 'RESEARCH COUNCIL', image: councilPhotos['research-council'],
    title: <>Shaping a rigorous<br/><em>legal and technology research agenda.</em></>,
    heading: <>Research <em>Council</em></>,
    copy: 'The Research Council will support the development of the Centre’s legal and technology research agenda, assess proposed research themes and encourage rigorous, relevant and feasible projects.',
    remit: 'Its remit will include recommendations on research methodology, supervision, interdisciplinary collaboration and the potential legal or policy contribution of research outputs.',
    focus: ['Research methodology', 'Supervision', 'Interdisciplinary collaboration', 'Legal and policy contribution'],
    seats: [['Chair', 'Law, Governance and Public Policy'], ['Member', 'Technology, AI and Law'], ['Member', 'Data Protection and Cybersecurity'], ['Member', 'Intellectual Property and Innovation']],
  },
  academic: {
    name: 'Academic Council', eyebrow: 'ACADEMIC COUNCIL', image: councilPhotos['academic-councils'],
    title: <>Upholding<br/><em>academic standards.</em></>,
    heading: <>Academic <em>Council</em></>,
    copy: 'The Academic Council will support academic standards across the Centre’s legal and technology research programmes.',
    remit: 'Its remit will include guidance on programme design, researcher development, mentorship, assessment criteria and academic quality, together with recommendations for lectures, workshops and scholarly exchanges.',
    focus: ['Programme design', 'Researcher development', 'Mentorship', 'Assessment criteria', 'Academic quality'],
    seats: [['Chair', 'Programme Design'], ['Member', 'Researcher Development and Mentorship'], ['Member', 'Assessment and Academic Quality'], ['Member', 'Lectures, Workshops and Scholarly Exchange']],
  },
};

function Committee() {
  return (
    <Routes>
      <Route index element={<CommitteeOverview/>}/>
      <Route path="board-members" element={<BoardMembers/>}/>
      <Route path="research-council" element={<CouncilPage council={councils.research}/>}/>
      <Route path="academic-council" element={<CouncilPage council={councils.academic}/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  );
}

function CommitteeTabs() {
  return <nav className="committee-tabs" aria-label="Core Committee pages"><div className="container">{committeePages.map(page => <NavLink key={page.to} to={page.to} end>{page.label}</NavLink>)}</div></nav>;
}

function ShowcaseHeading({ eyebrow, title, copy }) {
  return <div className="showcase-heading"><span className="eyebrow">{eyebrow}</span><h2><span className="ornament" aria-hidden="true"/><span>{title}</span><span className="ornament" aria-hidden="true"/></h2>{copy && <p>{copy}</p>}</div>;
}

function MemberPortrait({ member }) {
  return <div className="member-portrait">{member.photo ? <img src={member.photo} alt={member.name} loading="lazy" decoding="async"/> : <span aria-hidden="true">{member.initials}</span>}</div>;
}

function MemberHighlights({ items }) {
  return <ul className="member-highlights">{items.map(([value, label]) => <li key={label}><b>{value}</b><span>{label}</span></li>)}</ul>;
}

// LinkedIn mark from Simple Icons (CC0); envelope from Material Icons (Apache 2.0).
const contactChannels = [
  { key: 'linkedin', label: 'LinkedIn', href: value => value, describe: name => `${name} on LinkedIn`, icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z' },
  { key: 'email', label: 'Email', href: value => `mailto:${value}`, describe: name => `Email ${name}`, icon: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' },
];

// A button links once its detail is supplied; until then it is shown without a link.
function MemberContact({ member }) {
  const contact = member.contact ?? {};
  return (
    <ul className="member-contact" aria-label={`Contact ${member.name}`}>
      {contactChannels.map(({ key, label, href, describe, icon }) => {
        const mark = <svg viewBox="0 0 24 24" aria-hidden="true"><path d={icon}/></svg>;
        return <li key={key}>{contact[key] ? <a href={href(contact[key])} aria-label={describe(member.name)} title={label} {...(key === 'email' ? {} : { target: '_blank', rel: 'noopener noreferrer' })}>{mark}</a> : <span role="img" aria-label={`${label} link to be added`} title={`${label} link to be added`}>{mark}</span>}</li>;
      })}
    </ul>
  );
}

function MemberCard({ member, onOpen }) {
  return (
    <article className="member-card">
      <MemberPortrait member={member}/>
      <h3>{member.name}</h3>
      <span className="member-title">{member.title}</span>
      <MemberContact member={member}/>
      {member.highlights && <MemberHighlights items={member.highlights}/>}
      {member.focus && <span className="member-focus">{member.focus}</span>}
      <p>{member.summary}</p>
      {onOpen ? <button type="button" className="member-more" onClick={() => onOpen(member)}>Read full profile <ArrowUpRight size={16}/></button> : <span className="member-pending">Appointment pending</span>}
    </article>
  );
}

function ProfileDialog({ member, onClose }) {
  const dialog = React.useRef(null);
  // A close event can arrive after the dialog has been reopened; only clear the profile when it is really closed.
  useEffect(() => { if (member && !dialog.current.open) dialog.current.showModal(); }, [member]);
  return (
    <dialog ref={dialog} className="profile-dialog" aria-labelledby="profile-dialog-name" onClose={event => { if (!event.currentTarget.open) onClose(); }} onClick={event => { if (event.target === event.currentTarget) event.currentTarget.close(); }}>
      {member && <div className="profile-dialog-body">
        <button type="button" className="profile-dialog-close" onClick={() => dialog.current.close()} aria-label="Close profile"><X size={20}/></button>
        <aside><MemberPortrait member={member}/><MemberHighlights items={member.highlights}/></aside>
        <div className="profile-dialog-copy">
          <span className="eyebrow">{member.title}</span>
          <h2 id="profile-dialog-name">{member.name}</h2>
          {member.bio.map(paragraph => <p key={paragraph.slice(0, 32)}>{paragraph}</p>)}
          <ul className="member-tags">{member.expertise.map(item => <li key={item}>{item}</li>)}</ul>
        </div>
      </div>}
    </dialog>
  );
}

function CommitteeOverview() {
  return (
    <>
      <PageIntro
        eyebrow="PEOPLE & GOVERNANCE"
        title={<>Experience in practice.<br /><em>Purpose in legal and technology research.</em></>}
        copy="SKALTAIR brings together experience in legal practice, research, innovation and education to guide its institutional development and academic work."
        image={pagePhotos.committee}
        imageSizes={wideIntroImageSizes}
      />
      <CommitteeTabs/>
      <section className="section committee-overview">
        <div className="container">
          <div className="committee-lead">
            <div><span className="eyebrow">BOARD & COUNCILS</span><h2>Guidance for<br/><em>independent legal and technology research.</em></h2></div>
            <div>
              <p>The Board and Councils contribute to SKALTAIR’s institutional development and academic work within the responsibilities assigned under the approved governance framework. Each body has a distinct role.</p>
              <div className="committee-note"><ShieldCheck size={20}/><p>SK ALTAIR is a non-profit unit of Sri Chennakeshava Memorial Education and Welfare Society. Council responsibilities operate within the Centre’s approved governance framework.</p></div>
            </div>
          </div>
          <div className="committee-roles">
            {committeeBodies.map(({ Icon, ...body }) => (
              <article className="committee-role" key={body.to}>
                <span className="role-tab">{body.tab}</span>
                <span className="role-icon"><Icon size={22}/></span>
                <h3>{body.name}</h3>
                <p className="role-line">{body.line}</p>
                <p>{body.copy}</p>
                <ul className="role-remit">{body.remit.map(item => <li key={item}>{item}</li>)}</ul>
                <Link to={body.to} className="role-link">{body.link} <ArrowRight size={16}/></Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="committee-facts">
        <div className="container">
          <div><span className="eyebrow">AT A GLANCE</span><h2>The Board and Councils<br/><em>in brief.</em></h2></div>
          <ul className="facts-row">
            {[['02', 'Board Members'], ['55+', 'years of combined Board experience'], ['02', 'Councils for research and academic standards']].map(([value, label]) => <li key={label}><b>{value}</b><span>{label}</span></li>)}
          </ul>
        </div>
      </section>
    </>
  );
}

function BoardMembers() {
  const [profile, setProfile] = useState(null);
  return (
    <>
      <PageIntro
        eyebrow="BOARD MEMBERS"
        title={<>Experience that<br/><em>guides the institution.</em></>}
        copy="SK ALTAIR’s Board Members bring decades of experience in intellectual property, law, research and corporate governance to its institutional development and academic work."
        image={councilPhotos['founding-committee']}
        imageSizes={wideIntroImageSizes}
      />
      <CommitteeTabs/>
      <section className="section member-showcase">
        <div className="container">
          <ShowcaseHeading eyebrow="SK ALTAIR BOARD" title={<>Board <em>Members</em></>} copy="The Board guides SK ALTAIR’s institutional development and academic work within the Centre’s approved governance framework."/>
          <div className="member-grid is-board">{boardMembers.map(member => <MemberCard key={member.name} member={member} onOpen={setProfile}/>)}</div>
        </div>
      </section>
      <ProfileDialog member={profile} onClose={() => setProfile(null)}/>
    </>
  );
}

function CouncilPage({ council }) {
  return (
    <>
      <PageIntro eyebrow={council.eyebrow} title={council.title} copy={council.copy} image={council.image} imageSizes={wideIntroImageSizes}/>
      <CommitteeTabs/>
      <section className="section member-showcase">
        <div className="container">
          <ShowcaseHeading eyebrow="CORE COMMITTEE" title={council.heading} copy={council.remit}/>
          <ul className="council-remit">{council.focus.map(item => <li key={item}>{item}</li>)}</ul>
          <div className="member-grid is-council">
            {council.seats.map(([seat, focus], index) => <MemberCard key={focus} member={{ name: 'Member name', initials: String(index + 1).padStart(2, '0'), title: `${seat} · ${council.name}`, focus, summary: 'A short profile will appear here once the appointment is confirmed.' }}/>)}
          </div>
          <p className="member-note"><ShieldCheck size={18}/>Member profiles will be published following confirmation of appointments.</p>
        </div>
      </section>
    </>
  );
}

function Publications() {
  const livePublications = useContent('publication', publications);
  const [filter, setFilter] = useState(() => { const requested = new URLSearchParams(window.location.search).get('type') || ''; return /research paper/i.test(requested) ? 'Research papers' : /^articles?$/i.test(requested) ? 'Articles' : 'All'; });
  const [authorFilter, setAuthorFilter] = useState('All authors');
  const [yearFilter, setYearFilter] = useState('All years');
  const [themeFilter, setThemeFilter] = useState('All themes');
  const [publicationSearch, setPublicationSearch] = useState('');
  const filters = ['All', 'Research papers', 'Policy briefs', 'Reports', 'Articles', 'Consultation submissions'];

  const categoryFor = (publication) => {
    const rawType = String(publication.type || publication.data?.type || publication.category || publication.data?.category || '').trim().toLowerCase();
    const normalised = rawType.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ');
    if (/consultation|submission|response to consultation/.test(normalised)) return 'Consultation submissions';
    if (/policy brief|policy note|policy paper/.test(normalised)) return 'Policy briefs';
    if (/research paper|working paper|research article/.test(normalised)) return 'Research papers';
    if (/\breport\b/.test(normalised)) return 'Reports';
    if (/\barticle\b|journal article|opinion|commentary|case analysis/.test(normalised)) return 'Articles';
    return rawType ? rawType.replace(/\b\w/g, character => character.toUpperCase()) : 'Institutional update';
  };

  const authors = [...new Set(livePublications.flatMap(publication => {
    const value = publication.author || publication.authors || publication.data?.author || publication.data?.authors;
    return (Array.isArray(value) ? value : [value]).filter(Boolean).map(item => typeof item === 'string' ? item : item.name).filter(Boolean);
  }))].sort((a, b) => a.localeCompare(b));
  const years = [...new Set(livePublications.map(publication => String(publication.year || publication.data?.year || publication.publicationDate || '').slice(0, 4)).filter(year => /^\d{4}$/.test(year)))].sort((a, b) => b.localeCompare(a));
  const themesAvailable = [...new Set(livePublications.flatMap(publication => {
    const value = publication.theme || publication.researchTheme || publication.data?.theme || publication.data?.researchTheme;
    return (Array.isArray(value) ? value : [value]).filter(Boolean).map(item => typeof item === 'string' ? item : item.title).filter(Boolean);
  }))].sort((a, b) => a.localeCompare(b));
  const shown = livePublications.filter(publication => {
    const authorValue = publication.author || publication.authors || publication.data?.author || publication.data?.authors;
    const authorNames = (Array.isArray(authorValue) ? authorValue : [authorValue]).filter(Boolean).map(item => typeof item === 'string' ? item : item.name);
    const year = String(publication.year || publication.data?.year || publication.publicationDate || '').slice(0, 4);
    const themeValue = publication.theme || publication.researchTheme || publication.data?.theme || publication.data?.researchTheme;
    const themeNames = (Array.isArray(themeValue) ? themeValue : [themeValue]).filter(Boolean).map(item => typeof item === 'string' ? item : item.title);
    const searchText = [publication.title, publication.name, publication.description, publication.data?.description, ...authorNames, ...themeNames].filter(Boolean).join(' ').toLowerCase();
    return (filter === 'All' || categoryFor(publication) === filter)
      && (authorFilter === 'All authors' || authorNames.includes(authorFilter))
      && (yearFilter === 'All years' || year === yearFilter)
      && (themeFilter === 'All themes' || themeNames.includes(themeFilter))
      && searchText.includes(publicationSearch.trim().toLowerCase());
  });
  const publishTypes = [
    ['Research Papers', 'Detailed studies addressing defined research questions through doctrinal, comparative, interdisciplinary or appropriately approved empirical methods.'],
    ['Policy Briefs', 'Focused analysis of legislative, regulatory or institutional challenges, with practical options and recommendations for decision-makers.'],
    ['Research Reports', 'Substantial findings from individual or collaborative projects, including assessments of legal frameworks, implementation challenges and opportunities for reform.'],
    ['Articles and Case Analyses', 'Critical examination of legal developments, judicial decisions, emerging technologies and questions of contemporary importance.'],
    ['Consultation Submissions', 'Research-based responses to public consultations and proposals for legislative or regulatory reform, where approved for publication.'],
  ];

  return <>
    <PageIntro
      eyebrow="PUBLICATIONS"
      title={<>Original legal and technology research for<br/><em>informed debate.</em></>}
      copy="SK ALTAIR publishes legal and technology research examining contemporary questions in law, technology, governance and public policy. We aim to make rigorous scholarship useful to legal professionals, researchers, students, policymakers and public institutions."
      image={pagePhotos.publications}
      imageBehind
      className="page-intro-publications"
    />
    <section className="section content-section publications-section">
      <div className="container">
        <div className="publication-intro">
          <BookOpen size={24}/>
          <p>We encourage work that identifies significant problems, evaluates competing approaches and develops reasoned recommendations. The first publications will appear here following completion and editorial review of the Centre’s legal and technology research projects.</p>
        </div>

        <section className="publication-editorial-section" aria-labelledby="what-we-publish-title">
          <div className="publication-section-heading">
            <span className="eyebrow">WHAT WE PUBLISH</span>
            <h2 id="what-we-publish-title">Different formats.<br/><em>One commitment to rigour.</em></h2>
            <p>Our publication formats are designed to communicate careful analysis to readers working across law, technology, governance and public policy.</p>
          </div>
          <div className="publish-types-grid">
            {publishTypes.map(([title, description], index) => <article className="publish-type-card" key={title}>
              <span className="publish-type-number">{String(index + 1).padStart(2, '0')}</span>
              <BookOpen size={20}/>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>)}
          </div>
        </section>

        <section className="publication-editorial-section publication-work-section" aria-labelledby="explore-work-title">
          <div className="publication-section-heading">
            <span className="eyebrow">EXPLORE OUR WORK</span>
            <h2 id="explore-work-title">Legal and technology research made easier<br/><em>to navigate.</em></h2>
            <p>Publications are intended to be organised by research theme, publication type, author and year. Each item will identify its authors, publication date and research context, together with relevant disclosures and access information.</p>
          </div>
          <div className="publication-work-links">
            <Link to="/programs" className="publication-work-link"><span><b>Explore research themes</b><small>Browse the themes that frame SK ALTAIR’s legal and technology research.</small></span><ArrowUpRight size={18}/></Link>
            <Link to="/programs" className="publication-work-link"><span><b>View research programmes</b><small>Learn about research terms and proposal guidance.</small></span><ArrowUpRight size={18}/></Link>
          </div>
          <div className="filter-row" role="tablist" aria-label="Filter publications by type">
            {filters.map(category => <button type="button" role="tab" aria-selected={filter === category} className={filter === category ? 'active' : ''} key={category} onClick={() => transitionUpdate(() => setFilter(category))}>{category}</button>)}
          </div>
          <div className="publication-browse-controls">
            <label className="publication-search"><span className="eyebrow">SEARCH</span><input type="search" value={publicationSearch} onChange={event => setPublicationSearch(event.target.value)} placeholder="Search title, author or keyword" aria-label="Search publications"/></label>
            <label><span className="eyebrow">AUTHOR</span><select value={authorFilter} onChange={event => setAuthorFilter(event.target.value)}><option>All authors</option>{authors.map(author => <option key={author}>{author}</option>)}</select></label>
            <label><span className="eyebrow">YEAR</span><select value={yearFilter} onChange={event => setYearFilter(event.target.value)}><option>All years</option>{years.map(year => <option key={year}>{year}</option>)}</select></label>
            <label><span className="eyebrow">RESEARCH THEME</span><select value={themeFilter} onChange={event => setThemeFilter(event.target.value)}><option>All themes</option>{themesAvailable.map(theme => <option key={theme}>{theme}</option>)}</select></label>
          </div>
          {shown.length > 0 ? <div className="publication-grid">
            {shown.map((publication, index) => {
              const category = categoryFor(publication);
              const photo = publicationPhotos[index % publicationPhotos.length];
              return <article key={publication.slug || publication.id || `${publication.title || publication.name}-${index}`} className="publication-card">
                <div className="publication-cover">
                  <Photo image={photo} alt="" widths={[400, 700, 1000]} sizes="(max-width: 520px) 100vw, 400px"/>
                  <span>{category}</span><div className="cover-lines"/><BookOpen size={24}/><small>SKALTAIR RESEARCH</small>
                </div>
                <div className="publication-body">
                  <span className="eyebrow">{publication.publicationDate || publication.data?.publicationDate || publication.year || publication.data?.year || 'SKALTAIR'}</span>
                  <h3>{publication.title || publication.name}</h3>
                  <p>{publication.description || publication.data?.description || 'Publication details will be added when the research output is approved for release.'}</p>
                  {(publication.author || publication.authors || publication.data?.author || publication.data?.authors) && <p className="publication-metadata"><b>Author(s):</b> {(() => { const value = publication.author || publication.authors || publication.data?.author || publication.data?.authors; return (Array.isArray(value) ? value : [value]).map(item => typeof item === 'string' ? item : item.name).filter(Boolean).join(', '); })()}</p>}
                  {(publication.theme || publication.researchTheme || publication.data?.theme || publication.data?.researchTheme) && <p className="publication-metadata"><b>Research theme:</b> {(() => { const value = publication.theme || publication.researchTheme || publication.data?.theme || publication.data?.researchTheme; return (Array.isArray(value) ? value : [value]).map(item => typeof item === 'string' ? item : item.title).filter(Boolean).join(', '); })()}</p>}
                  {(publication.disclosures || publication.data?.disclosures) && <p className="publication-metadata"><b>Disclosures:</b> {publication.disclosures || publication.data?.disclosures}</p>}
                  {publication.url || publication.data?.url || publication.doi || publication.data?.doi ? <a className="text-link" href={publication.url || publication.data?.url || `https://doi.org/${publication.doi || publication.data?.doi}`} target="_blank" rel="noreferrer">Read publication <ArrowUpRight size={15}/></a> : <span className="coming-label">{publication.status === 'published' ? 'ACCESS DETAILS ON REQUEST' : 'IN PREPARATION'}</span>}
                </div>
              </article>;
            })}
          </div> : <div className="publication-empty-state" role="status"><FileText size={24}/><div><h3>No matching publications yet</h3><p>Try changing your search or filters. Approved outputs will appear here after completion and editorial review.</p></div></div>}
          <div className="empty-editorial"><FileText size={20}/><p>Only approved research outputs will be listed with author details and access information.</p></div>
        </section>

        <section className="publication-policy-grid" aria-label="Publication policies">
          <article className="publication-policy-card">
            <span className="eyebrow">EDITORIAL STANDARDS</span>
            <h2>Careful review.<br/><em>Independent conclusions.</em></h2>
            <p>Legal and technology research is assessed for originality, analytical quality, methodological soundness, accuracy and relevance. Review also considers source reliability, appropriate attribution, research ethics, confidentiality, data protection and intellectual property.</p>
            <p>Authors may be asked to clarify their analysis, verify sources or revise submissions before a decision is made. Participation in a legal and technology research programme does not guarantee publication.</p>
            <p>Research conclusions must remain independent of donor or collaborator preferences. Views expressed belong to their authors unless expressly identified as an adopted institutional position.</p>
          </article>
          <article className="publication-policy-card">
            <span className="eyebrow">AUTHORSHIP AND RIGHTS</span>
            <h2>Credit contributions.<br/><em>Respect permissions.</em></h2>
            <p>Researchers’ authorship and substantive contributions will receive appropriate acknowledgement. Ownership, publication rights and permitted reuse are governed by applicable agreements and the notice accompanying each publication.</p>
            <p>Public availability does not by itself authorise unrestricted reproduction, adaptation or commercial use. Requests concerning permissions, licensing or republication should be directed to the Centre.</p>
            <Link to="/contact?category=Publications%20and%20permissions&subject=Publication%20permission%20request" className="button button-outline">Request publication permission <ArrowUpRight size={15}/></Link>
          </article>
          <article className="publication-policy-card">
            <span className="eyebrow">CORRECTIONS AND RESEARCH CONCERNS</span>
            <h2>Help maintain<br/><em>research integrity.</em></h2>
            <p>We welcome reports of factual errors, attribution concerns or potential breaches of research integrity. Please identify the publication, relevant passage and supporting information so that the concern can be reviewed.</p>
            <p>Where appropriate, the Centre may publish a correction, clarification or retraction following a fair editorial process.</p>
            <Link to="/contact?category=Grievance%20or%20research%20integrity%20concern&subject=Publication%20concern" className="button button-outline">Report a publication concern <ArrowUpRight size={15}/></Link>
          </article>
        </section>

        <section className="publication-contribute-cta">
          <div><span className="eyebrow light">CONTRIBUTE THROUGH RESEARCH</span><h2>Have a question worth<br/><em>bringing into the conversation?</em></h2><p>Researchers interested in publishing through SK ALTAIR may apply to its legal and technology research programmes. Separate calls for articles, special issues or invited contributions will be announced with their submission requirements.</p></div>
          <div className="publication-contribute-actions"><Link to="/apply" className="button button-white">Submit a research proposal <ArrowUpRight size={15}/></Link><Link to="/contact?category=Publications%20and%20permissions&subject=Editorial%20team%20enquiry" className="text-link light">Contact the editorial team <ArrowRight size={16}/></Link></div>
        </section>
      </div>
    </section>
  </>;
}

function News() {
  const liveNews = useContent('news', newsItems);
  return <><PageIntro eyebrow="NEWS & UPDATES" title={<>The work, as it<br/><em>takes shape.</em></>} copy="Legal and technology research announcements, programme calls, events and institutional updates from SKALTAIR." image={pagePhotos.news} imageBehind className="page-intro-news"/><section className="section content-section"><div className="container"><div className="news-grid">{liveNews.map((n,i)=>{const photo=newsPhotos[i%newsPhotos.length];return <article key={n.slug || n.title} className="news-card"><div className="news-card-top"><span className="news-tag">{n.type || n.data?.type || 'Update'}</span><span className="news-date">{n.date || n.data?.date || 'SKALTAIR'}</span></div><div className="news-card-art"><Photo image={photo} widths={[480, 800, 1200]} sizes="(max-width: 520px) 100vw, (max-width: 760px) 50vw, 400px"/><b>0{i+1}</b></div><div className="news-card-body"><h3>{n.title || n.name}</h3><p>{n.description}</p><span className="text-link muted">Read the update <ArrowRight size={15}/></span></div></article>})}</div></div></section></>;
}

function FormField({ label, children, hint }) { return <label className="form-field"><span>{label}</span>{children}{hint && <small>{hint}</small>}</label>; }
function Apply() {
  const params = new URLSearchParams(window.location.search);
  const initial = programs.some(p=>p.slug===params.get('program')) ? params.get('program') : '';
  const [form,setForm]=useState({name:'',email:'',phone:'',affiliation:'',program:initial,theme:'',title:'',summary:'',duration:'',availability:'',consent:false});
  const [state,setState]=useState({busy:false,error:'',success:''});
  const change=(key,value)=>setForm(old=>({...old,[key]:value}));
  async function submit(e){e.preventDefault();setState({busy:true,error:'',success:''});try{const result=await api.submitApplication(form);setState({busy:false,error:'',success:`Your application reference is ${result.reference}. We have recorded your interest.`});setForm({name:'',email:'',phone:'',affiliation:'',program:'',theme:'',title:'',summary:'',duration:'',availability:'',consent:false});}catch(err){setState({busy:false,error:err.message,success:''});}}
  return <><PageIntro eyebrow="A question can be the beginning." title={<>RESEARCH WITH US</>} copy="Share an initial legal and technology research proposal. Programme terms, availability and final application requirements will be confirmed before a research call opens." image={pagePhotos.apply} imageSizes={wideIntroImageSizes} imageBehind className="page-intro-apply"/><section className="section application-section"><div className="container application-layout"><aside className="application-aside"><span className="eyebrow">BEFORE YOU APPLY</span><h2>Start with the<br/><em>question.</em></h2><p>Describe the issue you want to investigate and why it matters. A proposal should identify its scope, likely sources and expected contribution.</p><div className="apply-facts"><div><Clock3 size={17}/><span><b>Research terms</b><small>4–6, 6–8 or 12–18 months</small></span></div><div><Globe2 size={17}/><span><b>Online participation</b><small>Subject to project requirements</small></span></div><div><Check size={17}/><span><b>Reviewed by people</b><small>Relevance, quality and feasibility</small></span></div></div><div className="aside-note"><CircleHelp size={16}/><span>Application windows, fees and final fields are pending institutional confirmation. This form records an expression of interest.</span></div></aside><form className="form-card" onSubmit={submit}><div className="form-card-head"><span className="eyebrow">EXPRESSION OF INTEREST</span><h2>Tell us about your idea.</h2><p>Fields marked with an asterisk are required.</p></div>{state.success && <div className="form-success"><Check size={18}/>{state.success}</div>}{state.error && <div className="form-error">{state.error}</div>}<div className="form-grid"><FormField label="Full name *"><input required value={form.name} onChange={e=>change('name',e.target.value)} autoComplete="name"/></FormField><FormField label="Email address *"><input required type="email" value={form.email} onChange={e=>change('email',e.target.value)} autoComplete="email"/></FormField><FormField label="Telephone"><input type="tel" value={form.phone} onChange={e=>change('phone',e.target.value)} autoComplete="tel"/></FormField><FormField label="Institution / affiliation"><input value={form.affiliation} onChange={e=>change('affiliation',e.target.value)}/></FormField><FormField label="Preferred research term *"><select required value={form.program} onChange={e=>change('program',e.target.value)}><option value="">Choose a programme</option>{programs.map(p=><option key={p.slug} value={p.slug}>{p.name} · {p.duration}</option>)}</select></FormField><FormField label="Primary research theme *"><select required value={form.theme} onChange={e=>change('theme',e.target.value)}><option value="">Choose a theme</option>{themes.map(t=><option key={t.title}>{t.title}</option>)}<option>Other related topic</option></select></FormField><FormField label="Working title *"><input required value={form.title} onChange={e=>change('title',e.target.value)} placeholder="A concise description of your question"/></FormField><FormField label="Proposed duration"><input value={form.duration} onChange={e=>change('duration',e.target.value)} placeholder="For example, 6 months"/></FormField><FormField label="Research question and brief proposal *" hint="Please do not include confidential or sensitive personal information."><textarea required rows="6" value={form.summary} onChange={e=>change('summary',e.target.value)} placeholder="What do you want to investigate? Why does it matter? What methods or sources might you use?"/></FormField><FormField label="Availability and relevant experience"><textarea rows="4" value={form.availability} onChange={e=>change('availability',e.target.value)} placeholder="Tell us about your availability, background or relevant experience."/></FormField></div><label className="consent-check"><input type="checkbox" checked={form.consent} required onChange={e=>change('consent',e.target.checked)}/><span>I agree that SKALTAIR may use these details to review and respond to this expression of interest. <Link to="/privacy">Privacy notice</Link>.</span></label><button disabled={state.busy} className="button button-red submit-button">{state.busy?'Submitting…':'Submit expression of interest'} <Send size={15}/></button><p className="form-disclaimer">Submitting this form does not guarantee selection, a stipend or publication. Any formal engagement will be governed by written terms.</p></form></div></section></>;
}

function Collaborate() {
  const ways = [
    { title: 'Joint Research', copy: 'Develop legal and technology research projects addressing shared legal, technological or public-policy questions. Collaborations may involve comparative studies, interdisciplinary inquiry, research reports or policy recommendations.', detail: 'Project scope, responsibilities, resources, timelines and intended outputs will be agreed before work begins.' },
    { title: 'Academic and Institutional Partnerships', copy: 'Work with us on legal and technology research opportunities, academic exchanges, methodological training and knowledge-sharing initiatives.', detail: 'We welcome proposals from universities, colleges, research centres and professional institutions interested in supporting sustained inquiry and researcher development.' },
    { title: 'Research Supervision and Mentorship', copy: 'Experienced legal professionals, academics and subject specialists may express interest in supervising projects, advising researchers or supporting the development of research and writing skills.', detail: 'Appointments will depend on subject expertise, availability and the Centre’s requirements.' },
    { title: 'Editorial and Academic Review', copy: 'Contribute as a reviewer or subject expert in assessing research methodology, legal analysis, source reliability and publication quality.', detail: 'Reviewers must maintain confidentiality and disclose interests that could affect their independence.' },
    { title: 'Policy Consultation and Institutional Support', copy: 'Collaborate on identifying legal and regulatory gaps, evaluating implementation challenges and developing evidence-based reform proposals.', detail: 'We welcome opportunities to support public consultations, institutional research needs and policy capacity building within the Centre’s approved remit.' },
    { title: 'Lectures, Workshops and Scholarly Dialogue', copy: 'Propose lectures, seminars, roundtables, workshops or consultations that encourage informed discussion of contested legal and policy questions.', detail: 'Activities should have a clear academic purpose and accommodate reasoned differences of opinion.' },
    { title: 'Research Funding and Support', copy: 'Individuals and organisations may express interest in supporting research stipends, approved projects, publications, research resources or educational activities through lawful grants, donations or other permitted arrangements.', detail: 'Funding is received and administered through Sri Chennakeshava Memorial Education and Welfare Society, subject to applicable requirements and institutional approval. Proposals involving CSR support will be assessed separately for eligibility and project suitability. Financial support does not confer control over research findings, candidate selection or publication outcomes.' },
  ];
  const principles = [
    'Academic independence and evidence-based conclusions.',
    'Clearly defined responsibilities and transparent financial arrangements.',
    'Confidentiality, data protection and research ethics.',
    'Agreed treatment of intellectual property, authorship and publication rights.',
    'Disclosure and management of conflicts of interest.',
    'The Centre’s non-profit and public-benefit purpose.',
  ];
  const proposalPoints = [
    'Your name, organisation and contact details.',
    'The proposed area and form of collaboration.',
    'The research question, activity or institutional need.',
    'Intended outcomes and potential public benefit.',
    'Proposed responsibilities, timeline and resources.',
    'Any funding, confidentiality, data-access or intellectual property considerations.',
  ];
  const proposeUrl = '/contact?category=Collaboration%20and%20support&subject=Propose%20a%20collaboration';
  const mentorUrl = '/contact?category=Collaboration%20and%20support&subject=Mentor%20or%20reviewer%20interest';
  return <>
    <PageIntro
      eyebrow="COLLABORATE WITH SK ALTAIR"
      title={<>Good questions grow<br/><em>through exchange.</em></>}
      copy="SK ALTAIR welcomes collaboration with academic institutions, legal professionals, researchers, public institutions, professional bodies and other organisations whose work aligns with our public-benefit objectives."
      image={pagePhotos.collaborate}
      imageBehind
      className="page-intro-publications page-intro-collaborate"
    />
    <section className="section content-section collaborate-page">
      <div className="container">
        <div className="collab-intro-copy">
          <span className="eyebrow">CONTRIBUTE TO RESEARCH, POLICY AND RESPONSIBLE INNOVATION</span>
          <p className="lead">We seek collaborations that strengthen research quality, bring relevant expertise into legal and policy discussions and help translate scholarship into practical recommendations.</p>
        </div>

        <section className="collab-ways-section" aria-labelledby="collab-ways-title">
          <SectionHeading eyebrow="WAYS TO COLLABORATE" title={<>Bring expertise to<br/><em>the conversation.</em></>} copy="Explore ways to contribute knowledge, experience and resources to independent legal and technology research and public-benefit work."/>
          <div className="collab-grid collab-grid-detailed">
            {ways.map((item, index) => <article key={item.title} className="collab-way-card">
              <span className="collab-way-number">{String(index + 1).padStart(2, '0')}</span>
              <span className="collab-way-icon" aria-hidden="true">↗</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              <p className="collab-way-detail">{item.detail}</p>
            </article>)}
          </div>
        </section>

        <section className="collab-principles collab-principles-detailed" aria-labelledby="collab-principles-title">
          <div className="collab-principles-heading">
            <span className="eyebrow">OUR COLLABORATION PRINCIPLES</span>
            <h2 id="collab-principles-title">Partnership with<br/><em>clear expectations.</em></h2>
            <p>Every collaboration must preserve the Centre’s independence, ethical standards and public-benefit purpose.</p>
          </div>
          <div className="collab-principles-content">
            <ul>{principles.map((principle, index) => <li key={principle}><span>{String(index + 1).padStart(2, '0')}</span>{principle}</li>)}</ul>
            <div className="collab-authorisation-note"><ShieldCheck size={21}/><p>Use of the Centre’s name or logo, public announcements and representations of institutional endorsement require prior written authorisation.</p></div>
          </div>
        </section>

        <section className="collab-proposal-section" aria-labelledby="collab-proposal-title">
          <div className="collab-proposal-heading">
            <span className="eyebrow">HOW TO PROPOSE A COLLABORATION</span>
            <h2 id="collab-proposal-title">Start with a clear<br/><em>proposal.</em></h2>
            <p>Please provide a brief outline covering the following points so that the Centre can assess relevance, feasibility, available expertise and alignment with its objectives.</p>
          </div>
          <div className="collab-proposal-checklist">
            {proposalPoints.map((point, index) => <div className="collab-proposal-point" key={point}><span>{String(index + 1).padStart(2, '0')}</span><p>{point}</p></div>)}
          </div>
        </section>

        <div className="collab-review-note"><Check size={19}/><p>The Centre will review proposals for relevance, feasibility, available expertise and alignment with its objectives. Discussions do not create a partnership or binding commitment; approved collaborations will be documented through the appropriate written arrangement.</p></div>

        <section className="collab-cta collab-cta-enhanced" aria-label="Propose a collaboration">
          <Photo image={photos.roundTable} alt="" className="collab-cta-photo" widths={[640, 1000, 1400]} sizes="(max-width: 760px) 100vw, 1240px"/>
          <div className="collab-cta-copy"><span className="eyebrow light">PROPOSE AN IDEA</span><h2>Tell us what you have in mind.</h2><p>Share your organisation, proposed activity, intended public benefit, responsibilities, timeline, resources and any funding, confidentiality or intellectual-property considerations.</p></div>
          <div className="collab-cta-actions">
            <Link to={proposeUrl} className="button button-white">Propose a Collaboration <ArrowUpRight size={16}/></Link>
            <Link to={mentorUrl} className="collab-cta-secondary">Express Interest as a Mentor or Reviewer <ArrowRight size={16}/></Link>
            <Link to="/contact" className="collab-cta-secondary">Contact Us <ArrowRight size={16}/></Link>
          </div>
        </section>
      </div>
    </section>
  </>;
}

function Governance() {
  const items=[['Research integrity and ethics','Researchers are expected to uphold originality, intellectual honesty and accuracy. Methods should be explained, sources acknowledged and limitations presented fairly. Sensitive or personal-data research requires appropriate review and safeguards.'],['Responsible use of AI','Researcher responsibility for accuracy, originality and integrity remains with the researcher. Material AI use should be disclosed as required; generated legal propositions, citations and factual statements must be verified. Confidential information and personal data should not be entered into unapproved AI systems.'],['Data protection and information security','Information should be collected for defined purposes, protected through restricted access and secure storage, and retained only as long as required under an approved framework. Research involving personal data requires additional assessment where appropriate.'],['Confidentiality','Unpublished research, participant information, internal records and third-party material must be used only for authorised purposes and shared through permitted channels, subject to applicable terms and lawful exceptions.'],['Intellectual property and publication rights','Project agreements determine ownership, assignment and permitted use. Authors and substantive contributions should receive appropriate acknowledgement. Background intellectual property and third-party material remain subject to their respective rights and licences.'],['Editorial standards','Outputs are reviewed for originality, analytical quality, accuracy, source reliability and relevance, alongside ethics, confidentiality, privacy and intellectual property considerations. Corrections or retractions may follow a fair process if concerns arise.'],['Conflicts and funding independence','Relevant personal, professional and financial interests should be disclosed. Funding should support public-benefit purposes without dictating findings, selection or publication decisions.'],['Fair participation and grievances','Selection and assessment should use clear criteria. Concerns about programme administration, conduct or compliance should be reviewed impartially, with an opportunity to respond and protection against retaliation for good-faith reporting.'],['Records and accountability','Project terms should identify scope, duration, milestones, stipend, supervision and completion criteria. Records should be preserved and securely disposed of under an approved retention framework.']];
  return <><PageIntro eyebrow="GOVERNANCE & INSTITUTIONAL POLICIES" title={<>Independent by design.<br/><em>Accountable in practice.</em></>} copy="A framework for academic independence, responsible legal and technology research and transparent institutional administration." image={pagePhotos.governance}/><section className="section content-section"><div className="container governance-layout"><aside className="governance-aside"><div className="governance-media reveal-media"><Photo image={photos.goldenJustice} alt="" widths={[400, 700, 1000]} sizes="(max-width: 760px) 100vw, 420px"/></div><ShieldCheck size={26}/><h2>Trust is built into the work.</h2><p>These policy summaries reflect the supplied webpage draft. The adopted Constitution and approved policy documents will be published when formally confirmed.</p><Link to="/contact" className="text-link">Ask a governance question <ArrowRight size={15}/></Link></aside><div className="policy-list">{items.map(([title,body],i)=><details key={title} className="policy-item" open={i===0}><summary><span>{String(i+1).padStart(2,'0')}</span>{title}<ChevronDown size={16}/></summary><p>{body}</p></details>)}<div className="policy-framework"><span className="eyebrow">CONSTITUTION & GOVERNING DOCUMENTS</span><p>The supplied copy refers to a Constitution establishing institutional purpose, governance, delegated authority and research framework. The adopted Constitution and approved policies have not been supplied yet; this page does not present a draft summary as an adopted legal instrument.</p></div></div></div></section></>;
}

function Contact() {
  const contactParams = new URLSearchParams(window.location.search);
  const allowedCategories = ['General enquiry','Research programmes','Collaboration and support','Publications and permissions','Privacy and data protection','Grievance or research integrity concern'];
  const initialCategory = allowedCategories.includes(contactParams.get('category')) ? contactParams.get('category') : 'General enquiry';
  const [form,setForm]=useState({name:'',email:'',organisation:'',phone:'',category:initialCategory,subject:contactParams.get('subject') || '',message:'',consent:false});
  const [state,setState]=useState({busy:false,error:'',success:''});
  const change=(key,value)=>setForm(old=>({...old,[key]:value}));
  async function submit(e){e.preventDefault();setState({busy:true,error:'',success:''});try{await api.submitContact(form);setState({busy:false,error:'',success:'Your enquiry has been recorded. Thank you for contacting SKALTAIR.'});setForm({name:'',email:'',organisation:'',phone:'',category:'General enquiry',subject:'',message:'',consent:false});}catch(err){setState({busy:false,error:err.message,success:''});}}
  return <><PageIntro eyebrow="CONTACT" title={<>Good work begins<br/>with a <em>conversation.</em></>} copy="Questions about legal and technology research programmes, publications, collaboration or institutional activity? Send the team a note." image={pagePhotos.contact} imageBehind className="page-intro-contact"/><section className="section contact-section"><div className="container contact-layout"><div className="contact-aside"><span className="eyebrow">GET IN TOUCH</span><h2>We’d like to<br/><em>hear from you.</em></h2><p>Use the form to direct your enquiry to the right team. Official contact details and the Bengaluru address will be added when confirmed.</p><div className="contact-detail"><span className="contact-icon"><Mail size={18}/></span><div><small>EMAIL</small><b>Official address to be confirmed</b></div></div><div className="contact-detail"><span className="contact-icon"><Landmark size={18}/></span><div><small>LOCATION</small><b>Bengaluru, India</b><span>Postal address pending confirmation</span></div></div><div className="contact-detail"><span className="contact-icon"><Clock3 size={18}/></span><div><small>MEETINGS</small><b>By prior appointment</b></div></div><div className="contact-media reveal-media"><Photo image={photos.bengaluruDusk} widths={[480, 800, 1200]} sizes="(max-width: 760px) 100vw, 440px"/></div></div><form className="form-card contact-form" onSubmit={submit}><div className="form-card-head"><span className="eyebrow">SEND AN ENQUIRY</span><h2>How can we help?</h2></div>{state.success&&<div className="form-success"><Check size={18}/>{state.success}</div>}{state.error&&<div className="form-error">{state.error}</div>}<div className="form-grid"><FormField label="Full name *"><input required value={form.name} onChange={e=>change('name',e.target.value)}/></FormField><FormField label="Email address *"><input required type="email" value={form.email} onChange={e=>change('email',e.target.value)}/></FormField><FormField label="Organisation"><input value={form.organisation} onChange={e=>change('organisation',e.target.value)}/></FormField><FormField label="Telephone"><input value={form.phone} onChange={e=>change('phone',e.target.value)}/></FormField><FormField label="Enquiry category *"><select value={form.category} onChange={e=>change('category',e.target.value)}>{['General enquiry','Research programmes','Collaboration and support','Publications and permissions','Privacy and data protection','Grievance or research integrity concern'].map(o=><option key={o}>{o}</option>)}</select></FormField><FormField label="Subject *"><input required value={form.subject} onChange={e=>change('subject',e.target.value)}/></FormField><FormField label="Message *"><textarea required rows="5" value={form.message} onChange={e=>change('message',e.target.value)} hint="Please do not submit passwords, identity documents, client-confidential information, unpublished inventions or sensitive research data."/></FormField></div><label className="consent-check"><input required type="checkbox" checked={form.consent} onChange={e=>change('consent',e.target.checked)}/><span>I have read the <Link to="/privacy">privacy notice</Link>.</span></label><button disabled={state.busy} className="button button-red">{state.busy?'Sending…':'Send enquiry'} <Send size={15}/></button><p className="form-disclaimer">Submitting an enquiry does not constitute admission to a programme or acceptance of a collaboration.</p></form></div></section></>;
}

function Privacy() { return <><PageIntro eyebrow="PRIVACY" title={<>Your information deserves<br/><em>careful handling.</em></>} copy="A plain-language overview of information submitted through this website."/><section className="section content-section"><div className="container prose privacy-copy"><p>This website collects information you submit through the expression-of-interest and contact forms so the SKALTAIR team can review your enquiry and respond. Please do not submit passwords, identity documents, confidential client information, unpublished inventions or sensitive research data through these forms.</p><h2>How information is used</h2><p>Submitted details are used to process applications and enquiries, maintain institutional records and communicate with you about the matter you raised. Access should be limited to authorised personnel.</p><h2>Storage and retention</h2><p>When a MongoDB connection is configured, submissions are stored in the configured database. In demo mode they remain in server memory and are lost when the server restarts. Production retention periods, hosting locations, data-subject request channels and the official institutional contact must be confirmed before launch.</p><h2>Questions or requests</h2><p>For privacy-related questions, use the contact form and select “Privacy and data protection.” The final privacy notice should be reviewed and approved by the institution before production use.</p></div></section></>; }

function NotFound(){return <PageIntro eyebrow="NOT FOUND" title={<>This page isn’t<br/><em>here yet.</em></>} copy="The page may have moved. Use the navigation to continue exploring."/>;}

export default function App() {
  const loc=useLocation();
  const [displayLoc,setDisplayLoc]=useState(loc);
  const [routePhase,setRoutePhase]=useState('enter');
  const [curtainActive,setCurtainActive]=useState(false);
  useLayoutEffect(()=>{const previous=window.history.scrollRestoration;window.history.scrollRestoration='manual';if(!window.location.hash)window.scrollTo(0,0);return()=>{window.history.scrollRestoration=previous;};},[]);
  useEffect(()=>{if(routePhase!=='enter'||loc.pathname!==displayLoc.pathname||loc.search!==displayLoc.search)return;if(loc.hash){const frame=window.requestAnimationFrame(()=>{try{document.querySelector(loc.hash)?.scrollIntoView({behavior:'smooth',block:'start'});}catch(e){}});return()=>window.cancelAnimationFrame(frame);}window.scrollTo(0,0);},[displayLoc,routePhase,loc.pathname,loc.search,loc.hash]);
  useEffect(()=>{if(loc.pathname===displayLoc.pathname&&loc.search===displayLoc.search)return;setRoutePhase('exit');setCurtainActive(true);const swap=window.setTimeout(()=>{setDisplayLoc(loc);setRoutePhase('enter');},200);const reveal=window.setTimeout(()=>setCurtainActive(false),420);return()=>{window.clearTimeout(swap);window.clearTimeout(reveal);};},[loc.pathname,loc.search]);
  useEffect(()=>{document.title='SKALTAIR — Research for a changing world';},[loc.pathname]);
  useEffect(()=>{let observer,mutations;const selector='.hero-copy,.hero-art-wrap,.gita-inner,.ink-reveal,.section-heading,.theme-card,.program-top,.program-slide,.method-layout > *,.research-row,.method-step,.objective-list > div,.section-art,.about-copy,.pub-feature,.person-card,.policy-item,.collab-grid article,.page-intro .container,.prose > section,.page-about .objective-card,.page-about .governance-category,.page-about .governance-policy-card,.term-tabs,.term-panel,.themes-heading,.research-list,.theme-tile,.proposal-intro,.guidance-grid > article,.committee-lead > *,.committee-role,.facts-row > li,.showcase-heading,.council-remit,.member-card,.committee-note,.publication-intro,.publication-cover,.people-grid > *,.council-grid > *,.news-grid > *,.publication-grid > *,.home-news-card,.collab-principles > *,.collab-cta > *,.contact-layout > *,.application-layout > *,.form-card,.form-card-head,.form-grid .form-field,.join-inner > *,.footer-main > *,.focus-hero-copy,.focus-hero-visual,.focus-hero-foot,.focus-question,.focus-theme-card,.focus-method-steps > div,.focus-related-grid > a,.reveal-media';const reveal=nodes=>{nodes.forEach(node=>{node.classList.add('motion-ready');if(node.matches('.section-art,.hero-art-wrap,.publication-cover'))node.classList.add('motion-image');if(node.matches('.method-layout > :first-child,.contact-layout > :first-child,.application-layout > :first-child'))node.classList.add('motion-left');if(node.matches('.method-layout > :last-child,.contact-layout > :last-child,.application-layout > :last-child'))node.classList.add('motion-right');});if(!('IntersectionObserver'in window)){nodes.forEach(node=>node.classList.add('is-visible'));return;}if(!observer)observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}),{threshold:.12,rootMargin:'0px 0px -24px 0px'});nodes.forEach(node=>observer.observe(node));};const timer=window.setTimeout(()=>{reveal(document.querySelectorAll(selector));const root=document.getElementById('root');if(!root||!('MutationObserver'in window))return;mutations=new MutationObserver(records=>{const added=new Set();records.forEach(record=>record.addedNodes.forEach(node=>{if(node.nodeType!==1)return;if(node.matches(selector))added.add(node);node.querySelectorAll(selector).forEach(child=>added.add(child));}));const fresh=[...added].filter(node=>!node.classList.contains('motion-ready'));if(fresh.length)reveal(fresh);});mutations.observe(root,{childList:true,subtree:true});},80);return()=>{window.clearTimeout(timer);observer?.disconnect();mutations?.disconnect();};},[displayLoc.pathname]);
  useEffect(()=>{let frame=0;const update=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.querySelectorAll('.hero-art,.section-art img').forEach(image=>image.style.setProperty('--parallax-y','0px'));return;}const y=window.scrollY;document.querySelectorAll('.hero-art').forEach(image=>image.style.setProperty('--parallax-y',`${-Math.min(y*.055,28)}px`));const library=document.querySelector('.section-art img');if(library){const offset=library.getBoundingClientRect().top;library.style.setProperty('--parallax-y',`${Math.max(-8,Math.min(8,-offset*.025))}px`);}});};const loaded=event=>{const image=event.target;if(image instanceof HTMLImageElement&&!image.matches('.brand-seal,.route-curtain img')){image.classList.add('image-loaded');image.addEventListener('animationend',()=>{image.classList.remove('image-loaded');image.classList.add('image-settled');},{once:true});}};document.addEventListener('load',loaded,true);document.querySelectorAll('img:not(.brand-seal):not(.route-curtain img)').forEach(image=>{if(image.complete&&image.naturalWidth)loaded({target:image});});const pointer=event=>{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;const card=event.target.closest('.theme-card,.program-slide');if(card){const rect=card.getBoundingClientRect();card.style.setProperty('--pointer-x',`${event.clientX-rect.left}px`);card.style.setProperty('--pointer-y',`${event.clientY-rect.top}px`);}};document.addEventListener('pointermove',pointer,{passive:true});window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update);update();return()=>{cancelAnimationFrame(frame);document.removeEventListener('load',loaded,true);document.removeEventListener('pointermove',pointer);window.removeEventListener('scroll',update);window.removeEventListener('resize',update);};},[displayLoc.pathname]);
  useEffect(()=>{if(displayLoc.pathname!=='/about')return;const sections=[...document.querySelectorAll('.prose section[id], #governance')];const links=[...document.querySelectorAll('.contents-rail a[href^="#"]')];if(!sections.length||!links.length)return;let frame=0;const activate=id=>links.forEach(link=>{const active=link.hash===`#${id}`;link.classList.toggle('active',active);if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});const update=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{const line=Math.min(window.innerHeight*.34,260);let current=sections[0];let best=Infinity;sections.forEach((section,index)=>{const rect=section.getBoundingClientRect();const distance=rect.top>line?rect.top-line:rect.bottom<line?line-rect.bottom:0;if(distance<best){best=distance;current=section;}});activate(current.id);});};const onLink=event=>{const link=event.currentTarget;activate(link.hash.slice(1));};links.forEach(link=>link.addEventListener('click',onLink));window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update);update();return()=>{cancelAnimationFrame(frame);links.forEach(link=>link.removeEventListener('click',onLink));window.removeEventListener('scroll',update);window.removeEventListener('resize',update);};},[displayLoc.pathname]);
  return <><Header/><div className={`route-view ${routePhase} page-${displayLoc.pathname.split('/')[1] || 'home'}`} key={`${displayLoc.pathname}${displayLoc.search}`}><Routes location={displayLoc}><Route path="/" element={<Home/>}/><Route path="/about" element={<About/>}/><Route path="/programs" element={<ProgramsPage/>}/><Route path="/committee/*" element={<Committee/>}/><Route path="/governance" element={<Governance/>}/><Route path="/collaborate" element={<Collaborate/>}/><Route path="/publications" element={<Publications/>}/><Route path="/news" element={<News/>}/><Route path="/apply" element={<Apply/>}/><Route path="/contact" element={<Contact/>}/><Route path="/privacy" element={<Privacy/>}/><Route path="/research-focus/:topic" element={<ResearchFocusPage/>}/><Route path="*" element={<NotFound/>}/></Routes></div><Footer/><div className={`route-curtain ${curtainActive?'is-active':''}`} aria-hidden="true"><img src="/skaltair-emblem.png" alt=""/></div></>;
}
