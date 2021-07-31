import '../assets/styles/utility-classes.css';
import './polls.css';

import { ProposalCard } from '../components/ProposalCard';
import { Select } from '../components/Select';
import { Pagination } from '../components/Pagination';

async function fetchPolls() {
  return await fetch(`https://api.florencenet.tzkt.io/v1/bigmaps/102344/keys`)
    .then(response => response.json())
    .then(polls => polls);
}

export const Polls = (props: any) => {
  const viewTitles: any = {
    'proposals': 'Proposals',
    'questions': 'Questions',
    'my': 'My Votes',
    'past': 'Past Votes'
  }
  return (
    <article className="polls">
      <header className="pageHeader">
        <h1>{ viewTitles[props.view] ?? 'All Votes' }</h1>
      </header>
      <nav className="pageSection polls-filters">
        <Select />
        <Select />
      </nav>
      <section className="pageSection polls-cards">
        { props.polls && props.polls.map((poll: any) => <ProposalCard poll={poll} />) }
        {/* <ProposalCard />
        <ProposalCard />
        <ProposalCard />
        <ProposalCard />
        <ProposalCard />
        <ProposalCard />
        <ProposalCard />
        <ProposalCard /> */}
      </section>
      <footer className="pageSection polls-pagination">
        {/* <Pagination /> */}
      </footer>
    </article>
  );
}
