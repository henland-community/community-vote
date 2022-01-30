import React from 'react';
import '../assets/styles/utility-classes.css';
import './polls.css';

import { ProposalCard } from '../components/ProposalCard';

async function fetchPolls(datecomp: string = '') {
  let fetchUrl = `https://api.${process.env.REACT_APP_NETWORK}.tzkt.io/v1/bigmaps/${process.env.REACT_APP_BIGMAP_POLLS}/keys`
  let params: any = {}

  if (datecomp === 'gt' || datecomp === 'lt') {
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var utcdate = String(tomorrow.getUTCFullYear())
    utcdate += '-'+String((new Date().getUTCMonth()+1)).padStart(2,'0')
    utcdate += '-'+tomorrow.getUTCDate()
    params[`value.metadata.end_date.${datecomp}`] = utcdate
  }
  
  // params['value.metadata.start_date.gt'] = '2021-08-08' // hide past polls

  fetchUrl += '?' + Object.keys(params).map(k => `${k}=${params[k]}`).join('&')

  return await fetch(fetchUrl)
    .then(response => response.json())
    .then(polls => {
      return polls.filter((poll: any) => !['QmUk9b7icTECyUBzvCqUVtv5Y5fRZBA7KBmJrne7BEEyks','Qmeq6bAxpVyrhm4nb4RbPg8dFxWedZBrZun9nU9o5aTgRS',''].includes(poll.key))
    });
}

class Polls extends React.Component<{ view: string, myVotes: any[] }, { polls: any[] }> {  
  viewTitles: any = {
    'home': '',
    'my': 'My Votes',
    'past': 'Past Votes'
  };

  loadPolls(view: string) {
    let datecomp;
    if (view === 'home') {
      datecomp = 'gt';
    } else if (view === 'my') {
      datecomp = '';
    } else if (view === 'past') {
      datecomp = 'lt';
    }
    fetchPolls(datecomp).then(result => {
      this.setState({
        polls: result
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
        { this.viewTitles[this.props.view] && (
          <header className="pageHeader">
              <h1>{ this.viewTitles[this.props.view] }</h1>      
          </header>      
        )}
        <section className={"pageSection polls-cards " + (this.props.view === 'home'?'':"polls-cards-grid")}>
          { this.props.view === 'my' ? ('Vote history coming soon') : 
            this.state.polls.map((poll: any) => {
              let voted = 0;
              console.log(this.props.myVotes);
              if (this.props.myVotes.length > 0) {
                this.props.myVotes.forEach(vote => {
                  if (vote.key.string === poll.key)
                    voted = vote.value;
                });
              }
              return <ProposalCard key={poll.key } poll={poll} voted={voted}/>
            }) 
          }
        </section>
        { this.props.view !== 'past' && (
          <div className="pageSection polls-footer">
            { this.state.polls.length === 0 && (
              <h4>No active polls, check back soon</h4>
            )}
            <p>
              View past votes: <a href="/past-votes">here</a>
            </p>
          </div>
        )}
      </article>
    );
  }
}

export {Polls};