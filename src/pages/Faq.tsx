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
        <p> Wallets that are either going to get more than 1 Teia DAO token in the upcoming distribution (based on activity, contribution and/or hDAO) and/or have at least three active days on Teia. The list was created with these criteria on the snapshot date of May 17th, 2023. Every eligible address has one vote. The community can audit <a href="https://ipfs.io/ipfs/QmNihShvZkXq7aoSSH3Nt1VeLjgGkESr3LoCzShNyV4uzp" target="_blank" rel="noreferrer">the voter list on IPFS</a>. Thanks to <a target="_blank" rel="noreferrer" href="https://twitter.com/jagracar">jagracar</a> for compiling this list. It was generated based on <a target="_blank" rel="noreferrer" href="https://github.com/teia-community/teia-stats/blob/main/python/scripts/teiaStatistics.py">this "teia stats" python script</a>.</p>
      </section>
      <section className="pageSection">
        <h2>How are people voting?</h2>
        <p>People may vote for any available option on any open proposal until the end of its voting period, and change their vote as many times as they like during the voting period (before it ends). 
		Voting with this current setup will not include a token, or a representation of a token but a vote will simply be added to the tally of the voting results. DAO Token votes are planned for the upcoming <a href="https://github.com/teia-community/teia-docs/wiki/Governance-on-Teia" target="_blank" rel="noreferrer">Teia DAO setup (under construction)</a></p>
        <p>This function should only work during a voting period.</p>
        <p>Gas fees for voting will be paid by voters. Current cost for an initial vote is ~0.017 tez (about 5 cents USD at the time of writing), the cost to change your vote is 0.0007 tez.</p>
        <p>Any voting cost is intrinsic to the blockchain, we charge no fee for voting. We aim to reduce gas prices even further in our next contract.</p>
      </section>
      <section className="pageSection">
        <h2>Can I delegate my vote?</h2>
        <p>Not at the moment. Contribute to the planning, UI, and contract development of the voting tool on <a href="https://github.com/teia-community/community-vote/">GitHub</a>.</p>
      </section>
      <section className="pageSection">
        <h2>Where are the discussion and debates being held?</h2>
        <p>We are using <a href="https://discourse.teia.art/" target="_blank" rel="noreferrer">discourse.teia.art</a> to give space for discussion and debate of votes. You will be able to join the conversation there, or just read it, to make up your mind before voting. This tool is off-chain (hosted by <a href="https://twitter.com/_ufffd" target="_blank" rel="noreferrer">UFFFD</a>).</p>
        <p>On this discussion tool, you will be able to comment on a proposal, like a comment or a reply, share links and ideas.</p>
      </section>
      <section className="pageSection">
        <h2>How are votes tallied?</h2>
        <p>At the time this contract was written it was determined we couldn't tally all of the needed information on-chain, and would have to tally votes offline. A script is run that validates voters and tallies their votes and this information is uploaded to the website by a developer.<br/>
        These results can be independently verified by the voters using the unchangeable blockchain data.</p>
      </section>
      <section className="pageSection">
        <h2>How to participate?</h2>
        <ul>
          <li>You can join the <a href="https://discord.gg/fmNTjfBdyV">Teia Discord Server</a></li> 
          <li>You can also participate without joining the discord via the community forum <a href="https://discourse.teia.art/" target="_blank" rel="noreferrer">discourse.teia.art</a></li>
          <li>For updates, you can follow our Blog <a href="https://blog.teia.art/" target="_blank" rel="noreferrer">blog.teia.art</a> and the official twitter account <a href="https://twitter.com/TeiaCommunity" target="_blank" rel="noreferrer">@TeiaCommunity</a></li>
          <li>Anyone can join and participate, discuss, and look up past discussions.</li>
        </ul>
      </section>
    </article>
  );
}
