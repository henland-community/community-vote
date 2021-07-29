import '../assets/styles/utility-classes.css';
import './proposalDetail.css';

import { Button } from '../components/Button';

export const ProposalDetail = () => {
  return (
    <article className="proposalDetail pageContents">
      <header className="proposalDetail-header pageHeader">
        <div className="proposalDetail-status">
          <div className="proposalDetail-id">
            #1340
          </div>
          <div className="proposalDetail-type">
            Proposal
          </div>
          <div className="proposalDetail-subCategory">
            DAO
          </div>
          <div className="proposalDetail-views">
            34 Views
          </div>
          <div className="proposalDetail-countdown">
            Ends in 5d 12h 34m
          </div>
        </div>
        <h1>
        In order to connect and grow the H=N developer com...
        </h1>
        <div className="proposalDetail-url">
        https://www.loremipsum.com/wqdwqdw/ef3243r/qwdwde42/65765y4trf
        </div>
        <hr />
        <footer>
          <div className="proposalDetail-graph">
            results graph
          </div>
          <div className="proposalDetail-discussion">
            Discuss on Discourse 
          </div>
          <div className="proposalDetail-CTA">
            <Button>AGAINST</Button>
            <Button>FOR</Button>
          </div>
        </footer>
      </header>
      <section className="pageSection proposalDetail-columns">
        <section className="proposalDetail-details">
          <p>In order to connect and grow the H=N developer comsectetur adipiscing elit tempus feugi?</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt orci in tempus feugiat. Duis congue ac turpis eu blandit. Phasellus dolor nisi, rutrum quis tempus in, volutpat sit amet mi. Quisque nisi tortor, dictum nec leo at, molestie eleifend ipsum. Aliquam dapibus metus nec tortor pulvinar, in commodo risus consectetur. Phasellus auctor vestibulum viverra. Nulla tristique sodales purus, ut cursus turpis ultrices eu. Sed aliquet sed lectus nec finibus. Praesent pulvinar, sapien et consequat bibendum, velit ligula porttitor odio, vel sollicitudin odio nisl nec neque. Vestibulum vel finibus mauris, et fermentum urna. Aliquam sed mauris enim. Pellentesque in arcu sapien. </p>
          <p>Phasellus dolor nisi, rutrum quis tempus in, volutpat sit amet mi. Quisque nisi tortor, dictum nec leo at, molestie eleifend ipsum. Aliquam dapibus metus nec tortor pulvinar, in commodo risus consectetur. Phasellus auctor vestibulum viverra. Nulla tristique sodales purus, ut cursus turpis ultrices eu. Sed aliquet sed lectus nec finibus. Praesent pulvinar, sapien et consequat bibendum, velit ligula porttitor odio, vel sollicitudin odio nisl nec neque. Vestibulum vel finibus mauris, et fermentum urna. Aliquam sed mauris enim. Pellentesque in arcu sapien.</p>
        </section>
        <section className="proposalDetail-metaData">
          <p className="text-sm-medium">Specs</p>
          <p className="text-sm-light">
            Start date:<br/>
            31.07.2021 - 14:53 UTC
          </p>
          <p className="text-sm-light">
            End date:<br/>
            12.08.2021 - 14:53 UTC
          </p>
          <p className="text-sm-light">
            Hash:<br/>
            PtGRANADsDU8R9daYKAgWnQYAJ64omN1o3KMGVCykShA97vQbvV
          </p>
          <p className="text-sm-light">
            Proposer:<br/>
            Hicathon
          </p>
          <p className="text-sm-medium">Help</p>
          <p className="text-sm-light">
            How does the voting system work?<br/>
            Sollicitudin odio nisl nec neque et fermentum?
          </p>
        </section>
      </section>
    </article>
  );
}
