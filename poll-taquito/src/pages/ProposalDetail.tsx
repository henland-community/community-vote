import '../assets/styles/utility-classes.css';
import './proposalDetail.css';
import { useParams } from "react-router-dom";
import VoteCard from '../components/VoteCard';

import { Button } from '../components/Button';

import { ReactComponent as Logo } from '../assets/icons/hen-logo.svg';
import { ReactComponent as VoteForIcon } from '../assets/icons/vote-for.svg';
import { ReactComponent as VoteAgainstIcon } from '../assets/icons/vote-against.svg';
import { ReactComponent as VoteDrawIcon } from '../assets/icons/vote-draw.svg';
import { ReactComponent as ViewsIcon } from '../assets/icons/views.svg';
import { ReactComponent as OtherIcon } from '../assets/icons/other.svg';

export const ProposalDetail = () => {
  const params = useParams<{poll?: string}>();
  const hasVoted = false;
  return (
    <article className="proposalDetail pageContents">
      <header className="proposalDetail-header pageHeader">
        <div className="proposalDetail-meta">
          <div className="proposalDetail-metaPrimary">
            <div className="proposalDetail-idAndType">
              #1340 Proposal
            </div>
            <div className="proposalDetail-subCategory">
              <OtherIcon /> DAO
            </div>
            <div className="proposalDetail-views">
              <ViewsIcon /> 34 Views
            </div>
          </div>
          <div className="proposalDetail-countdown">
            Ends in 5d 12h 34m
          </div>
        </div>
        <h1>
        In order to connect and grow the H=N developer com...
        </h1>
        <div className="proposalDetail-url">
        https://community.hicetnunc.xyz/hicatvote/proposal-{params.poll}
        </div>
        <hr />
        <footer className="proposalDetail-voteStatus">
          <div className="proposalDetail-graph">
            <div><span className="text-s-bold">Results</span> <small className="text-s-light">30 votes required</small></div>
            <div>3205 for • 3201 against</div>
          </div>
          <a className="proposalDetail-discussionLink"
            href={"https://community.hicetnunc.xyz/hicatvote/proposal-"+params.poll }>
            Discuss on Discourse 
          </a>
          <div className="proposalDetail-yourVote">
            <Button>AGAINST</Button>
            <Button>FOR</Button>
          </div>
        </footer>
        <VoteCard poll_id={params.poll}/>
      </header>
      <div className="pageSection proposalDetail-adoptionStatus">
        <Logo /> <span className="text-l-light">STATUS</span> <span className="text-l-bold">PENDING</span> <a href="#adoptiondoc">https://www.loremipsum.com/wqdwqdw/ef3243r/qwdwde42/65765y4trf</a>
      </div>
      <section className="pageSection proposalDetail-columns">
        <section className="proposalDetail-details">
          <p className="text-m-medium">In order to connect and grow the H=N developer comsectetur adipiscing elit tempus feugi?</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt orci in tempus feugiat. Duis congue ac turpis eu blandit. Phasellus dolor nisi, rutrum quis tempus in, volutpat sit amet mi. Quisque nisi tortor, dictum nec leo at, molestie eleifend ipsum. Aliquam dapibus metus nec tortor pulvinar, in commodo risus consectetur. Phasellus auctor vestibulum viverra. Nulla tristique sodales purus, ut cursus turpis ultrices eu. Sed aliquet sed lectus nec finibus. Praesent pulvinar, sapien et consequat bibendum, velit ligula porttitor odio, vel sollicitudin odio nisl nec neque. Vestibulum vel finibus mauris, et fermentum urna. Aliquam sed mauris enim. Pellentesque in arcu sapien. </p>
          <p>Phasellus dolor nisi, rutrum quis tempus in, volutpat sit amet mi. Quisque nisi tortor, dictum nec leo at, molestie eleifend ipsum. Aliquam dapibus metus nec tortor pulvinar, in commodo risus consectetur. Phasellus auctor vestibulum viverra. Nulla tristique sodales purus, ut cursus turpis ultrices eu. Sed aliquet sed lectus nec finibus. Praesent pulvinar, sapien et consequat bibendum, velit ligula porttitor odio, vel sollicitudin odio nisl nec neque. Vestibulum vel finibus mauris, et fermentum urna. Aliquam sed mauris enim. Pellentesque in arcu sapien.</p>
        </section>
        <section className="proposalDetail-sidebar">
          <p className="proposalDetail-sidebarHeader">
            <span className="proposalDetail-sidebarHeader-line"></span>
            <span className="proposalDetail-sidebarHeader-text text-s-medium">Specs</span>
          </p>
          <p className="text-s-light">
            Start date:<br/>
            31.07.2021 - 14:53 UTC
          </p>
          <p className="text-s-light">
            End date:<br/>
            12.08.2021 - 14:53 UTC
          </p>
          <p className="text-s-light">
            Hash:<br/>
            PtGRANADsDU8R9daYKAgWnQYAJ64omN1o3KMGVCykShA97vQbvV
          </p>
          <p className="text-s-light">
            Proposer:<br/>
            Hicathon
          </p>
          <p className="proposalDetail-sidebarHeader">
          <span className="proposalDetail-sidebarHeader-line"></span>
            <span className="proposalDetail-sidebarHeader-text text-s-medium">Help</span>
          </p>
          <p className="text-s-light">
            How does the voting system work?<br/>
            Sollicitudin odio nisl nec neque et fermentum?
          </p>
        </section>
      </section>
    </article>
  );
}
