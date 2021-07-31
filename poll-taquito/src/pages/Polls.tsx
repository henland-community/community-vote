import React, {useState} from 'react';
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
          { this.state.polls.map((poll: any) => <ProposalCard poll={poll} />) }
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
}

export {Polls};