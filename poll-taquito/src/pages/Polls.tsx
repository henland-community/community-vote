import React from 'react';
import '../assets/styles/utility-classes.css';
import './polls.css';

import { ProposalCard } from '../components/ProposalCard';
import { Select } from '../components/Select';
// import { Pagination } from '../components/Pagination';


async function fetchPolls() {
  return await fetch(`https://api.florencenet.tzkt.io/v1/bigmaps/${process.env.REACT_APP_BIGMAP_POLLS}/keys`)
    .then(response => response.json())
    .then(polls => polls);
}

// async function fetchVotes() {
//   return await fetch(`https://api.florencenet.tzkt.io/v1/bigmaps/${process.env.REACT_APP_BIGMAP_VOTES}/keys`)
//     .then(response => response.json())
//     .then(votes => votes);
// }

/* async function filterPolls(polls: any, filter: string, activeAddress: string) {
  if (filter === 'all') return polls
  const filteredPolls = [];
  for (const poll of polls) {
    if (filter === 'proposals' && poll.type === 1) {
      filteredPolls.push(poll);
    } else if (filter === 'questions' && poll.type === 2) {
      filteredPolls.push(poll);
    } else if (filter === 'past' && poll.active === false) {
      filteredPolls.push(poll);
    } else if (filter === 'active' && poll.active === true) {
      filteredPolls.push(poll);
    } else if (filter === 'my' && activeAddress.indexOf(poll.owner) !== -1) {
      filteredPolls.push(poll);
    }
  }
  return filteredPolls;
} */

class Polls extends React.Component<{ view: string }, { polls: any[] }> {
  constructor(props: any) {
    super(props);
    this.state = {
      polls: []
    }

    // test wallet: tz1LovFrdT3D2uY5ijGnb16172szCqFazDCE
    fetchPolls().then(result => {
      console.log(result)
      this.setState({
        // polls: filterPolls(result, 'all', activeAddress)
        polls: result
      })
    })
  }
  
  viewTitles: any = {
    'proposals': 'Proposals',
    'questions': 'Questions',
    'my': 'My Votes',
    'past': 'Past Votes'
  };

  render() {

    return (
      <article className="polls">
        <header className="pageHeader">
          <h1>{ this.viewTitles[this.props.view] ?? 'All Votes' }</h1>
        </header>
        <nav className="pageSection polls-filters">
          <Select />
          <Select />
        </nav>
        <section className="pageSection polls-cards">
          { this.state.polls.map((poll: any) => <ProposalCard key={poll} poll={poll}/>) }
        </section>
        <footer className="pageSection polls-pagination">
          {/* <Pagination /> */}
        </footer>
      </article>
    );
  }
}

export {Polls};