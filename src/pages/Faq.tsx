import '../assets/styles/utility-classes.css';
import './faq.css';

export const Faq = () => {
  return (
    <article className="pageContents--centered">
      <header className="pageHeader">
        <h1>Frequently Asked Questions</h1>
      </header>
      <section className="pageSection">
        <h2>Who can vote?</h2>
        <p>Everyone who used hicetnunc before the website shutdown will have one vote in the initial rounds of h=n community voting.</p>
      </section>
      <section className="pageSection">
        <h2>How are people voting?</h2>
        <p>People may vote for any available option on any open proposal until the end of its voting period, and change their vote as many times as they like during the voting period (before it ends). Voting in version 1, will not include a token, or a representation of a token but a vote will simply be added to the tally of the voting results.</p>
        <p>This function should only work during a voting period.</p>
        <p>Gas fees for voting will be paid by voters. Current cost for an initial vote is ~0.017 tez (about 5 cents USD at the time of writing), the cost to change your vote is 0.0007 tez.</p>
        <p>Any voting cost is intrinsic to the blockchain, we charge no fee for voting. We aim to reduce gas prices even further in our next contract.</p>
      </section>
      <section className="pageSection">
        <h2>Can I delegate my vote?</h2>
        <p>Not yet. This option will be unlocked in an upcoming version of our voting DAO.</p>
      </section>
      <section className="pageSection">
        <h2>Where are the discussion and debates being held?</h2>
        <p>We are using the tool discourse to give space for discussion and debate. You will be able to join the conversation there, or just read it, to make up your mind before voting. This tool is off-chain.</p>
        <p>On this discussion tool, you will be able to comment on a proposal, like a comment or a reply, share links and ideas.</p>
      </section>
    </article>
  );
}
