import React from 'react';
import '../assets/styles/utility-classes.css';
import './polls.css';

import { ProposalCard } from '../components/ProposalCard';
import { Select } from '../components/Select';
import { AnyCnameRecord } from 'dns';
// import { Pagination } from '../components/Pagination';


async function fetchPolls(cat: number) {
  let fetchUrl = `https://api.florencenet.tzkt.io/v1/bigmaps/${process.env.REACT_APP_BIGMAP_POLLS}/keys`
  if (cat !== 0) 
    fetchUrl += `?value.metadata.category=${cat}`;
  return await fetch(fetchUrl)
    .then(response => response.json())
    .then(polls => polls);
}

async function fetchPollsByCat(cat: number) {
  return await fetch(`https://api.florencenet.tzkt.io/v1/bigmaps/${process.env.REACT_APP_BIGMAP_POLLS}/keys?value.metadata.category=${cat}`)
    .then(response => response.json())
    .then(polls => polls);
}

// async function fetchVotes() {
//   return await fetch(`https://api.florencenet.tzkt.io/v1/bigmaps/${process.env.REACT_APP_BIGMAP_VOTES}/keys`)
//     .then(response => response.json())
//     .then(votes => votes);
// }

class Polls extends React.Component<{ view: string }, { polls: any[] }> {  
  viewTitles: any = {
    'proposals': 'Proposals',
    'questions': 'Questions',
    'my': 'My Votes',
    'past': 'Past Votes'
  };

  loadPolls(view: string) {
    fetchPolls(view==='proposals'?1:view==='questions'?2:0).then(result => {
      console.log(result)
      this.setState({
        polls: result
        // polls: filterPolls(result, 'all', activeAddress)
      })
    })
  }

  
  constructor(props: any) {
    super(props);
    this.state = {
      polls: []
    }
    this.loadPolls(this.props.view);
  }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.view !== this.props.view) {
      this.loadPolls(nextProps.view);
    }
  }

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