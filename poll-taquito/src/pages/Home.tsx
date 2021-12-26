import '../assets/styles/utility-classes.css';
import './home.css';

import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <article className="pageContents--centered homePage">
      <header className="pageHeader pageHeader--centered">
        <h1>H=N Community Vote</h1>
        <h3 className="text-xl">The voice of the hic et nunc community amplified.</h3>
      </header>
      <section className="pageSection">
        <h2>What can I do here?</h2>
        <p>You are the voice of the community.</p>
        <p>Here you can give your opinion and make it heard so that the hicathon’s working 
          groups can build what you want.</p>
      </section>
      <section className="pageSection">
        <h2>Why this tool?</h2>
        <p>Because we believe that, together, we can create tools and applications 
          respecting the community’s needs and wishes.</p>
      </section>
    </article>
  );
}
