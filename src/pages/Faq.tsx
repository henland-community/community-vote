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
        <p>Everyone who has used hicetnunc before the snapshot date (January 16, 2022) will have one vote in the initial rounds of h=n community voting. The community can audit <a href="https://vote.hencommunity.quest/hen-users-snapshot-16-01-2022.json" target="_blank" rel="noreferrer">the voter list</a>. Thanks to <a target="_blank" rel="noreferrer" href="https://twitter.com/jagracar">jagracar</a> for compiling this list, you can also audit <a target="_blank" rel="noreferrer" href="https://github.com/jagracar/hen-utils/blob/main/python/henUtils/henUsersSnapshot.py">his python script</a>.</p>
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
        <p>Not yet. This option is planned for further updates. Contribute to the planning, UI, and contract development work on <a href="https://github.com/hen-community/community-vote">GitHub</a>.</p>
      </section>
      <section className="pageSection">
        <h2>Where are the discussion and debates being held?</h2>
        <p>We are using Discourse to give space for discussion and debate. You will be able to join the conversation there, or just read it, to make up your mind before voting. This tool is off-chain (hosted by <a href="https://twitter.com/_ufffd" target="_blank" rel="noreferrer">UFFFD</a>).</p>
        <p>On this discussion tool, you will be able to comment on a proposal, like a comment or a reply, share links and ideas.</p>
      </section>
      <section className="pageSection">
        <h2>How are votes tallied?</h2>
        <p>At the time this contract was written it was determined we couldn't tally all of the needed information on-chain, and would have to tally votes offline. A script is run that validates voters and tallies their votes and this information is uploaded to the website by a developer.<br/>
        These results can be independently verified by the voters using the unchangeable blockchain data.</p>
      </section>
      <section className="pageSection">
        <h2>Who is behind this platform now?</h2>
        <p>Right after the discontinuation of hicetnunc.xyz on November 11th, 2021, a group of people (initially mainly participants of the first “hicathon” event) joined forces to organize the future of the platform. The main discussion platform is the new “hen_community” (HENC) discord server and the community forum.</p>
        <p>We are currently working to form a DAO in order to make this platform fully decentralized. Our main goals are to keep the core values and spirit of hicetnunc alive and to update the marketplace smart contract so that the fees can be used to keep the platform running.</p>
        <p>The discord is always open for any kind of participation, and we will also continue to do our best to communicate and engage with the community on platforms other than discord.</p>
      </section>
      <section className="pageSection">
        <h2>How to participate?</h2>
        <ul>
          <li>You can join the HENC discord here: Discord</li>
          <li>You can also participate without joining the discord via the community forum: <a href="https://discourse.hencommunity.quest/" target="_blank" rel="noreferrer">discourse.hencommunity.quest</a></li>
          <li>For updates, you can follow our current twitter account: <a href="https://twitter.com/hen_community" target="_blank" rel="noreferrer">@hen_community</a></li>
          <li>Volunteer opportunities are available! If you are interested, please <a href="https://forms.gle/75QHgUC5EZTReceK7" target="_blank" rel="noreferrer">fill out this form</a> so we can get a overview and start coordinating the working groups (Note: This is not a prerequisite for participation; Anyone can join and participate, discuss, and look up past discussions.)</li>
        </ul>
      </section>
    </article>
  );
}
