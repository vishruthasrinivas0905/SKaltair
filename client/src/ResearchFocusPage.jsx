import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { themes } from './data.js';
import { photoSrcSet, photoUrl } from './images.js';
import { researchFocusAreas } from './researchFocusAreas.js';

const imageWidths = [640, 960, 1280, 1600];

function FocusPhoto({ photo, alt, className = '' }) {
  return <img className={className} src={photoUrl(photo, 960)} srcSet={photoSrcSet(photo, imageWidths)} sizes="(max-width: 760px) 100vw, 52vw" alt={alt} loading="eager" decoding="async" fetchPriority="high"/>;
}

export default function ResearchFocusPage() {
  const { topic } = useParams();
  const areaIndex = researchFocusAreas.findIndex(area => area.slug === topic);
  const area = researchFocusAreas[areaIndex];

  if (!area) {
    return <main className="focus-page focus-page-simple"><section className="focus-simple-empty"><h1>Research area not found</h1><Link to="/">Back to home</Link></section></main>;
  }

  return <main className="focus-page focus-page-simple">
    <section className="focus-simple-hero">
      <div className="container focus-simple-hero-layout">
        <div className="focus-simple-hero-copy">
          <p className="focus-simple-label">Research Focus</p>
          <h1>{area.title}</h1>
          <p className="focus-simple-description">{area.description}</p>
        </div>
        <figure className="focus-simple-hero-image" style={{ '--hero-focal': area.heroPosition }}>
          <FocusPhoto photo={area.heroImage} alt={area.heroImage.alt}/>
          <Link className="button button-red focus-simple-apply" to="/apply">Apply now <ArrowRight size={16}/></Link>
        </figure>
      </div>
    </section>

    <section className="section focus-simple-questions" aria-labelledby="focus-questions-title">
      <div className="container">
        <h2 id="focus-questions-title">Research questions</h2>
        <div className="focus-question-flow">
          {area.questions.map((question, index) => <article className="focus-flow-card" key={question}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <p>{question}</p>
          </article>)}
        </div>
      </div>
    </section>

    <section className="section focus-simple-themes" aria-labelledby="focus-themes-title">
      <div className="container">
        <h2 id="focus-themes-title">Related themes</h2>
        <div className="focus-theme-flow">
          {area.themeIndexes.map(themeIndex => {
            const theme = themes[themeIndex];
            return <article className="focus-theme-box" key={theme.title}>
              <h3>{theme.title}</h3>
              <p>{theme.desc}</p>
              <ul>{theme.topics.slice(0, 3).map(item => <li key={item}>{item}</li>)}</ul>
            </article>;
          })}
        </div>
      </div>
    </section>
  </main>;
}
