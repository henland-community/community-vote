import '../assets/styles/utility-classes.css';
import './home.css';

// import { Link } from "react-router-dom";

import { Polls } from './Polls';

export const Home = (myVotes:any) => {
  return (
    <article className="pageContents--centered homePage">
      <header className="pageHeader pageHeader--centered">
        <h1>H=N Community Vote</h1>
        <h3 className="text-xl">The voice of the Teia community, amplified.</h3>
      </header>
      <Polls view="home" myVotes={myVotes} />
      <section className="pageSection">
        <h2>Let's build Teia together</h2>
        <p>You are the voice of the community. The HENC (hen-community) uses this tool for on-chain voting. While we are working on setting up a full DAO structure, this tool will allow us to vote on important decisions with wallets used before the discontinuation of hicetnunc.xyz.</p>
      </section>
      <section className="pageSection">
        <h2>Why this tool?</h2>
        <p>Because we believe that, together, we can create tools and applications respecting the community’s needs and wishes. The process of forming a real DAO will take a long time and we want to be able to vote on pressing decisions transparently and on-chain.</p>
      </section>
      <h3>In the end, we are all building the future of the Teia ecosystem together.</h3>
      <section className="pageSection">
        <h2>How does it work?</h2>
        <ol>
          <li>Currently, proposals and questions are discussed at the HENC discord and the community ‘discourse’ forum and then put up for a vote here.</li>
          <li>Check the list of what is to be voted.</li>
          <li>Click on one proposal or question, see the different voting options, how many votes have been done, discuss them via the ‘discourse’ forum.</li>
          <li>For the proposals, vote by selecting one option and then click on XX. For the questions, vote by clicking on “Against” or “For”.</li>
          <li>Results are tabulated at the end of the voting period, to determine whether it met quorum and was successful.</li>
        </ol>
        <p>Visit our FAQ to learn more about how to submit proposals, earn voting rights, what the criteria are for a successful proposal, and what the adoption policies are.</p>
      </section>
    </article>
  );
}
