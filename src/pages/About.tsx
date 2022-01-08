import { Link } from "react-router-dom";

import '../assets/styles/utility-classes.css';
import './about.css';

export const About = () => {
  return (
    <article className="pageContents--centered">
      <header className="pageHeader pageHeader--centered">
        <h1>ABOUT</h1>
      </header>
      <section className="pageSection">
        <p><Link to="/">H=N Community Vote</Link> is an experimental fork of <a href="https://github.com/kylegrover/hicvote" target="_blank" rel="noreferrer">H=N Vote</a>, created for the H=N community to collectively decide it's future.</p>
      </section>
    </article>
  );
};