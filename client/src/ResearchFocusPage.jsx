import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Compass, Search, Sparkles } from 'lucide-react';
import { themes } from './data.js';
import { photoSrcSet, photoUrl } from './images.js';
import { focusThemeImages, researchFocusAreas } from './researchFocusAreas.js';

const imageWidths = [640, 960, 1280, 1600];

function FocusPhoto({ photo, alt, className = '', priority = false }) {
  return <img className={className} src={photoUrl(photo, 960)} srcSet={photoSrcSet(photo, imageWidths)} sizes={priority ? '100vw' : '(max-width: 900px) 100vw, 52vw'} alt={alt} loading={priority ? 'eager' : 'lazy'} decoding="async" fetchPriority={priority ? 'high' : 'auto'}/>;
}

export default function ResearchFocusPage() {
  const { topic } = useParams();
  const areaIndex = researchFocusAreas.findIndex(area => area.slug === topic);
  const area = researchFocusAreas[areaIndex];
  if (!area) return <section className="focus-not-found"><span className="eyebrow">RESEARCH FOCUS</span><h1>Explore our areas of inquiry.</h1><p>Select a focus area to see its scope and related themes.</p><div className="focus-related-grid">{researchFocusAreas.map(item => <Link key={item.slug} to={`/research-focus/${item.slug}`}>{item.shortTitle}<ArrowUpRight size={16}/></Link>)}</div></section>;

  const image = area.heroImage;
  const related = researchFocusAreas.filter(item => item.slug !== area.slug);
  const moveTilt = event => {
    if (event.pointerType === 'touch' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const box = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - .5;
    const y = (event.clientY - box.top) / box.height - .5;
    event.currentTarget.style.setProperty('--tilt-x', `${(-y * 5).toFixed(2)}deg`);
    event.currentTarget.style.setProperty('--tilt-y', `${(x * 5).toFixed(2)}deg`);
    event.currentTarget.style.setProperty('--shine-x', `${((x + .5) * 100).toFixed(1)}%`);
    event.currentTarget.style.setProperty('--shine-y', `${((y + .5) * 100).toFixed(1)}%`);
  };
  const resetTilt = event => {
    event.currentTarget.style.setProperty('--tilt-x', '0deg');
    event.currentTarget.style.setProperty('--tilt-y', '0deg');
    event.currentTarget.style.setProperty('--shine-x', '50%');
    event.currentTarget.style.setProperty('--shine-y', '50%');
  };
  const tiltProps = { onPointerMove: moveTilt, onPointerLeave: resetTilt };
  return <main className="focus-page">
    <section className={`focus-hero focus-hero--${area.heroLayout} focus-hero--${area.slug}`}>
      <figure className="focus-hero-visual" style={{ '--hero-focal': area.heroPosition }}>
        <FocusPhoto photo={image} alt={image.alt} className="focus-hero-image" priority/>
        <span className="focus-image-index">SKALTAIR · RESEARCH FOCUS {String(areaIndex + 1).padStart(2, '0')}</span>
        <figcaption><span>FIELDWORK · EVIDENCE · PUBLIC PURPOSE</span><a href={image.href} target="_blank" rel="noreferrer">Photo: {image.credit} <ArrowUpRight size={13}/></a></figcaption>
      </figure>
      <div className="container focus-hero-grid">
        <div className="focus-hero-copy">
          <Link className="focus-back" to="/#research"><ArrowLeft size={15}/> All research areas</Link>
          <div className="focus-kicker"><span>{String(areaIndex + 1).padStart(2, '0')} / 06</span><i/>{area.lens}</div>
          <h1>{area.title}</h1>
          <p className="focus-hero-description">{area.description}</p>
          <div className="focus-hero-actions"><a className="focus-scroll" href="#scope">Explore this focus <ArrowDown size={16}/></a><a className="focus-hero-secondary" href="#themes">Browse related themes <ArrowRight size={16}/></a></div>
        </div>
      </div>
      <div className="focus-hero-foot"><div className="container"><span>INDEPENDENT INQUIRY</span><span>INTERDISCIPLINARY PERSPECTIVES</span><span>PUBLIC PURPOSE</span></div></div>
    </section>

    <section className="section focus-scope" id="scope">
      <div className="container">
        <div className="focus-section-heading"><div><span className="eyebrow">THE QUESTIONS THAT SHAPE THIS FIELD</span><h2>Start with the question.<br/><em>Follow the evidence.</em></h2></div><p>These focus areas describe the questions SKALTAIR’s legal and technology research can examine. The final scope of an individual project depends on its research question and approved programme.</p></div>
        <div className="focus-question-grid">{area.questions.map((question, index) => <article className="focus-question focus-tilt" {...tiltProps} key={question}><span>0{index + 1}</span><p>{question}</p><Compass size={18}/></article>)}</div>
      </div>
    </section>

    <section className="section focus-themes-section" id="themes">
      <div className="container">
        <div className="focus-theme-intro"><span className="eyebrow">RELATED RESEARCH THEMES</span><h2>Room for <em>deeper inquiry.</em></h2><p>Explore the themes and subtopics connected to this focus area.</p></div>
        <div className="focus-theme-list">{area.themeIndexes.map((themeIndex, index) => {
          const theme = themes[themeIndex];
          const themeImage = focusThemeImages[area.slug][themeIndex];
          return <article className="focus-theme-card focus-tilt" {...tiltProps} key={theme.title} style={{ '--theme-index': index }}>
            <div className="focus-theme-image"><FocusPhoto photo={themeImage} alt={themeImage.alt} className="focus-theme-photo"/><span>THEME {String(index + 1).padStart(2, '0')}</span><a href={themeImage.href} target="_blank" rel="noreferrer">Photo: {themeImage.credit} <ArrowUpRight size={13}/></a></div>
            <div className="focus-theme-content"><span className="eyebrow">{theme.topics.length} RESEARCH DIRECTIONS</span><h3>{theme.title}</h3><p>{theme.desc}</p><div className="focus-topic-list">{theme.topics.map((item, topicIndex) => <div className="focus-topic" key={item}><span>{String(topicIndex + 1).padStart(2, '0')}</span><p>{item}</p></div>)}</div><Link className="focus-program-link" to={`/programs?theme=${themeIndex}`}>Explore this theme in research programmes <ArrowUpRight size={15}/></Link></div>
          </article>;
        })}</div>
      </div>
    </section>

    <section className="focus-method-band"><div className="container focus-method-layout"><div><span className="eyebrow light"><Sparkles size={14}/> A STARTING POINT, NOT A LIMIT</span><h2>Good legal and technology research makes<br/><em>room for new questions.</em></h2><p>Use these themes to find a direction, then shape a focused research question with supporting sources, clear methods and a defined public or scholarly contribution.</p></div><div className="focus-method-steps"><div><span><Search size={18}/></span><section><b>01 · FRAME</b><p>Identify a specific legal or policy question.</p></section></div><div><span><BookOpen size={18}/></span><section><b>02 · INVESTIGATE</b><p>Examine the law, evidence and relevant perspectives.</p></section></div><div><span><ArrowRight size={18}/></span><section><b>03 · CONTRIBUTE</b><p>Develop a clear analysis and practical conclusion.</p></section></div></div></div></section>

    <section className="section focus-next"><div className="container"><div className="focus-next-heading"><div><span className="eyebrow">FOLLOW A RELATED QUESTION</span><h2>Explore another <em>research area.</em></h2></div><Link className="text-link" to="/programs">All research themes <ArrowRight size={16}/></Link></div><div className="focus-related-grid">{related.map(item => <Link key={item.slug} className="focus-tilt" {...tiltProps} to={`/research-focus/${item.slug}`}><span>{String(researchFocusAreas.indexOf(item) + 1).padStart(2, '0')}</span><b>{item.shortTitle}</b><ArrowUpRight size={17}/></Link>)}</div><div className="focus-cta"><div><span className="eyebrow light">READY TO DEVELOP AN IDEA?</span><h2>Bring your question<br/>into the conversation.</h2><p>Explore the legal and technology research programmes and consider where your question could lead.</p></div><Link className="button button-white" to="/programs">Explore research programmes <ArrowRight size={16}/></Link></div></div></section>
  </main>;
}
