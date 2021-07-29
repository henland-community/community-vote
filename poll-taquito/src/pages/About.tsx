import { Link } from "react-router-dom";

import '../assets/styles/utility-classes.css';
import './about.css';

export const About = () => {
  return (
    <article>
      <header className="pageHeader">
        <h1>ABOUT</h1>
      </header>
      <section className="pageSection">
        <p>
          <Link to="https://www.hicathon.xyz/" target="_blank" rel="noreferrer">Hicathon</Link>
        </p>
      </section>
    </article>
  );
};
